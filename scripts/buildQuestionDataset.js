import fs from "fs";
import path from "path";

const LAYOUT_FILE = "scripts/output/pdf-layout.json";

const CROP_DIR =
  "scripts/output/pdf-question-crops/2019/3-3/3_march_shift_1_copy";

const MANIFEST_FILE = path.join(CROP_DIR, "questions.json");
const OCR_FILE = path.join(CROP_DIR, "questions-ocr.json");
const OUTPUT_FILE = path.join(CROP_DIR, "question-dataset.json");

function getCleanText(value) {
  return String(value || "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function findQuestionMetadata(page, questionNo) {
  const items = page.items.filter(item => item.text?.trim());

  const markerIndex = items.findIndex(
    item => item.text.trim().toLowerCase() === `q.${questionNo}`
  );

  if (markerIndex === -1) {
    return {
      questionId: null,
      status: null,
      chosenOption: null
    };
  }

  const nextMarkerIndex = items.findIndex(
    (item, index) =>
      index > markerIndex && /^Q\.\d+$/i.test(item.text.trim())
  );

  const block = items.slice(
    markerIndex,
    nextMarkerIndex === -1 ? items.length : nextMarkerIndex
  );

  let questionId = null;
  let status = null;
  let chosenOption = null;

  for (let index = 0; index < block.length; index++) {
    const text = block[index].text.trim();

    if (text === "Question ID :" && block[index + 1]) {
      questionId = block[index + 1].text.trim();
    }

    if (text === "Status :" && block[index + 1]) {
      status = block[index + 1].text.trim();
    }

    if (text === "Chosen Option :" && block[index + 1]) {
      chosenOption = block[index + 1].text.trim();
    }
  }

  return {
    questionId,
    status,
    chosenOption
  };
}

function findSection(page, questionY) {
  const sections = page.items
    .filter(item => item.text?.trim())
    .filter(item =>
      [
        "General Intelligence and Reasoning",
        "General Awareness",
        "Quantitative Aptitude",
        "English Comprehension"
      ].includes(item.text.trim())
    )
    .filter(item => item.y > questionY)
    .sort((a, b) => a.y - b.y);

  return sections[0]?.text.trim() || null;
}

function subjectFromSection(section) {
  const map = {
    "General Intelligence and Reasoning": "Reasoning",
    "General Awareness": "General Awareness",
    "Quantitative Aptitude": "Quant",
    "English Comprehension": "English"
  };

  return map[section] || "Unknown";
}

function main() {
  if (!fs.existsSync(LAYOUT_FILE)) {
    throw new Error(`Missing: ${LAYOUT_FILE}`);
  }

  if (!fs.existsSync(MANIFEST_FILE)) {
    throw new Error(`Missing: ${MANIFEST_FILE}`);
  }

  if (!fs.existsSync(OCR_FILE)) {
    throw new Error(`Missing: ${OCR_FILE}`);
  }

  const pages = JSON.parse(
    fs.readFileSync(LAYOUT_FILE, "utf8")
  );

  const crops = JSON.parse(
    fs.readFileSync(MANIFEST_FILE, "utf8")
  );

  const ocrResults = JSON.parse(
    fs.readFileSync(OCR_FILE, "utf8")
  );

  const ocrMap = new Map(
    ocrResults.map(item => [
      `${item.page}-${item.questionNo}`,
      item
    ])
  );

  const pageMap = new Map(
    pages.map(page => [page.page, page])
  );

  const dataset = crops.map((crop, index) => {
    const key = `${crop.page}-${crop.questionNo}`;
    const ocrResult = ocrMap.get(key);
    const page = pageMap.get(crop.page);

    const metadata = page
      ? findQuestionMetadata(page, crop.questionNo)
      : {
          questionId: null,
          status: null,
          chosenOption: null
        };

    const section = page
      ? findSection(page, crop.pdfBounds?.top ?? 0)
      : null;

    const confidence = Number(
      ocrResult?.ocr?.confidence || 0
    );

    const ocrText = getCleanText(
      ocrResult?.ocr?.text || ""
    );

    const needsReview =
      confidence < 85 ||
      ocrText.length < 20 ||
      /0{4,}|o{5,}|m{5,}/i.test(ocrText);

    return {
      id: index + 1,
      questionNo: crop.questionNo,
      page: crop.page,
      subject: subjectFromSection(section),
      section,
      questionId: metadata.questionId,
      status: metadata.status,
      chosenOption: metadata.chosenOption,
      questionImage: crop.image.replaceAll("\\", "/"),
      ocrText,
      ocrConfidence: confidence,
      ocrMethod: ocrResult?.ocr?.preprocessing || null,
      pageSegMode: ocrResult?.ocr?.pageSegMode || null,
      needsReview,
      verified: false,
      correctAnswer: null,
      explanation: null
    };
  });

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(dataset, null, 2)
  );

  const reviewCount = dataset.filter(
    item => item.needsReview
  ).length;

  console.log(`Questions: ${dataset.length}`);
  console.log(`Needs review: ${reviewCount}`);
  console.log(`Saved: ${OUTPUT_FILE}`);
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}