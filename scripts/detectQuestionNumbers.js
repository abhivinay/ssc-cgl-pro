import fs from "fs";
import path from "path";
import sharp from "sharp";
import { createWorker, PSM } from "tesseract.js";

const INPUT =
  "scripts/output/pages/PYQS/2019/3-3/3_march_shift_1_copy/page-001.png";

const OUTPUT_DIR =
  "scripts/output/question-number-analysis";

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const metadata = await sharp(INPUT, {
    limitInputPixels: false
  }).metadata();

  const originalWidth = metadata.width || 1;
  const originalHeight = metadata.height || 1;

  const left = Math.floor(originalWidth * 0.025);
  const cropWidth = Math.floor(originalWidth * 0.28);
  const scale = 3;

  const margin = await sharp(INPUT, {
    limitInputPixels: false
  })
    .extract({
      left,
      top: 0,
      width: Math.min(cropWidth, originalWidth - left),
      height: originalHeight
    })
    .resize({
      width: cropWidth * scale,
      kernel: sharp.kernel.lanczos3
    })
    .grayscale()
    .normalize()
    .sharpen()
    .png()
    .toBuffer();

  const marginPath = path.join(
    OUTPUT_DIR,
    "left-margin-upscaled.png"
  );

  fs.writeFileSync(marginPath, margin);

  const worker = await createWorker("eng");

  try {
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SPARSE_TEXT,
      tessedit_char_whitelist:
        "0123456789Qq.-()",
      preserve_interword_spaces: "1"
    });

    const result = await worker.recognize(
      margin,
      {},
      {
        text: true,
        tsv: true,
        blocks: true
      }
    );

    console.log("\nRecognized text:");
    console.log(result.data.text);

    fs.writeFileSync(
      path.join(OUTPUT_DIR, "ocr-text.txt"),
      result.data.text || ""
    );

    const tsv = result.data.tsv || "";
    const rows = tsv.trim().split("\n").slice(1);
    const candidates = [];

    for (const row of rows) {
      const columns = row.split("\t");

      if (columns.length < 12) {
        continue;
      }

      const level = Number(columns[0]);
      const confidence = Number(columns[10]);
      const text = columns.slice(11).join("\t").trim();

      if (level !== 5 || confidence < 15 || !text) {
        continue;
      }

      const cleaned = text
        .replace(/[Oo]/g, "0")
        .replace(/[Il|]/g, "1")
        .replace(/[^\d]/g, "");

      if (!/^\d{1,3}$/.test(cleaned)) {
        continue;
      }

      const scaledX = Number(columns[6]);
      const scaledY = Number(columns[7]);
      const scaledWidth = Number(columns[8]);
      const scaledHeight = Number(columns[9]);

      candidates.push({
        number: Number(cleaned),
        text,
        confidence,
        bbox: {
          left: Math.round(scaledX / scale) + left,
          top: Math.round(scaledY / scale),
          width: Math.round(scaledWidth / scale),
          height: Math.round(scaledHeight / scale)
        }
      });
    }

    const filtered = candidates
      .filter(candidate =>
        candidate.number >= 1 &&
        candidate.number <= 100
      )
      .sort((a, b) => a.bbox.top - b.bbox.top);

    console.log("\nDetected number candidates:");
    console.log(filtered);

    fs.writeFileSync(
      path.join(OUTPUT_DIR, "numbers.json"),
      JSON.stringify(filtered, null, 2)
    );
  } finally {
    await worker.terminate();
  }

  console.log(
    `\nCheck: ${OUTPUT_DIR}`
  );
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});