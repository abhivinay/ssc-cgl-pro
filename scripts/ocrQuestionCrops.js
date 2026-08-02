import fs from "fs";
import path from "path";
import sharp from "sharp";
import { createWorker } from "tesseract.js";

const CROP_DIR =
  "scripts/output/pdf-question-crops/2019/3-3/3_march_shift_1_copy";

const MANIFEST_FILE = path.join(CROP_DIR, "questions.json");
const OUTPUT_FILE = path.join(CROP_DIR, "questions-ocr.json");
const TEMP_DIR = path.join(CROP_DIR, "ocr-temp");

async function createVariants(inputPath, prefix) {
  const variants = [
    {
      name: "grayscale",
      path: `${prefix}-grayscale.png`,
      process: image =>
        image
          .resize({ width: 4000, withoutEnlargement: false })
          .grayscale()
          .normalize()
          .sharpen()
    },
    {
      name: "threshold-150",
      path: `${prefix}-threshold-150.png`,
      process: image =>
        image
          .resize({ width: 4000, withoutEnlargement: false })
          .grayscale()
          .normalize()
          .sharpen()
          .threshold(150)
    },
    {
      name: "threshold-175",
      path: `${prefix}-threshold-175.png`,
      process: image =>
        image
          .resize({ width: 4000, withoutEnlargement: false })
          .grayscale()
          .normalize()
          .sharpen()
          .threshold(175)
    },
    {
      name: "threshold-200",
      path: `${prefix}-threshold-200.png`,
      process: image =>
        image
          .resize({ width: 4000, withoutEnlargement: false })
          .grayscale()
          .normalize()
          .sharpen()
          .threshold(200)
    }
  ];

  for (const variant of variants) {
    const image = sharp(inputPath);
    await variant.process(image).png().toFile(variant.path);
  }

  return variants;
}

function cleanText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function calculateTextScore(text, confidence) {
  const cleaned = cleanText(text);

  const letters = (cleaned.match(/[A-Za-z]/g) || []).length;
  const words = (cleaned.match(/[A-Za-z]{2,}/g) || []).length;
  const garbage = (cleaned.match(/[^\x20-\x7E\n]/g) || []).length;
  const repeatedZeros = (cleaned.match(/0{3,}/g) || []).length;

  return (
    confidence +
    Math.min(words, 80) * 0.4 +
    Math.min(letters, 400) * 0.02 -
    garbage * 2 -
    repeatedZeros * 5
  );
}

async function recognizeVariant(worker, variant) {
  const modes = ["6", "11"];
  const attempts = [];

  for (const mode of modes) {
    await worker.setParameters({
      tessedit_pageseg_mode: mode,
      preserve_interword_spaces: "1",
      user_defined_dpi: "300"
    });

    const {
      data: { text, confidence }
    } = await worker.recognize(variant.path);

    const cleanedText = cleanText(text);

    attempts.push({
      preprocessing: variant.name,
      pageSegMode: Number(mode),
      text: cleanedText,
      confidence: Number(confidence.toFixed(2)),
      score: Number(
        calculateTextScore(cleanedText, confidence).toFixed(2)
      )
    });
  }

  return attempts;
}

async function main() {
  if (!fs.existsSync(MANIFEST_FILE)) {
    throw new Error(`Manifest not found: ${MANIFEST_FILE}`);
  }

  const questions = JSON.parse(
    fs.readFileSync(MANIFEST_FILE, "utf8")
  );

  fs.mkdirSync(TEMP_DIR, { recursive: true });

  const worker = await createWorker("eng");
  const results = [];

  try {
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];

      if (!fs.existsSync(question.image)) {
        console.log(`Missing: ${question.image}`);
        continue;
      }

      const prefix = path.join(
        TEMP_DIR,
        `question-${String(index + 1).padStart(3, "0")}`
      );

      const variants = await createVariants(
        question.image,
        prefix
      );

      const attempts = [];

      for (const variant of variants) {
        const variantAttempts = await recognizeVariant(
          worker,
          variant
        );

        attempts.push(...variantAttempts);
      }

      attempts.sort((a, b) => b.score - a.score);

      const best = attempts[0];

      results.push({
        ...question,
        ocr: {
          text: best.text,
          confidence: best.confidence,
          score: best.score,
          preprocessing: best.preprocessing,
          pageSegMode: best.pageSegMode
        },
        ocrAttempts: attempts.map(attempt => ({
          preprocessing: attempt.preprocessing,
          pageSegMode: attempt.pageSegMode,
          confidence: attempt.confidence,
          score: attempt.score
        }))
      });

      console.log(
        `[${index + 1}/${questions.length}] ` +
          `Page ${question.page} Q.${question.questionNo} | ` +
          `${best.preprocessing} | PSM ${best.pageSegMode} | ` +
          `${best.confidence}%`
      );
    }
  } finally {
    await worker.terminate();

    fs.rmSync(TEMP_DIR, {
      recursive: true,
      force: true
    });
  }

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(results, null, 2)
  );

  console.log(`\nOCR completed: ${results.length}`);
  console.log(`Saved: ${OUTPUT_FILE}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});