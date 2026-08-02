import fs from "fs";
import path from "path";
import sharp from "sharp";

const LAYOUT_FILE = "scripts/output/pdf-layout.json";

const PAGE_IMAGES_DIR =
  "scripts/output/pages/PYQS/2019/3-3/3_march_shift_1_copy";

const OUTPUT_DIR =
  "scripts/output/pdf-question-crops/2019/3-3/3_march_shift_1_copy";

const SCALE = 5;
const LEFT_MARGIN = 35;
const RIGHT_MARGIN = 25;
const TOP_PADDING = 8;
const BOTTOM_PADDING = 6;
const PAGE_BOTTOM_LIMIT = 25;

function findQuestionMarkers(page) {
  return page.items
    .filter(item => /^Q\.\d+$/i.test(item.text.trim()))
    .map(item => ({
      questionNo: Number(item.text.replace(/\D/g, "")),
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height
    }))
    .sort((a, b) => b.y - a.y);
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(value, maximum));
}

async function main() {
  if (!fs.existsSync(LAYOUT_FILE)) {
    throw new Error(`Layout file not found: ${LAYOUT_FILE}`);
  }

  if (!fs.existsSync(PAGE_IMAGES_DIR)) {
    throw new Error(`Page-image folder not found: ${PAGE_IMAGES_DIR}`);
  }

  const pages = JSON.parse(fs.readFileSync(LAYOUT_FILE, "utf8"));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const results = [];

  for (const page of pages) {
    const markers = findQuestionMarkers(page);

    if (!markers.length) {
      console.log(`Page ${page.page}: no questions`);
      continue;
    }

    const pageFilename = `page-${String(page.page).padStart(3, "0")}.png`;
    const pageImagePath = path.join(PAGE_IMAGES_DIR, pageFilename);

    if (!fs.existsSync(pageImagePath)) {
      console.log(`Missing page image: ${pageImagePath}`);
      continue;
    }

    const image = sharp(pageImagePath);
    const metadata = await image.metadata();

    const imageWidth = metadata.width;
    const imageHeight = metadata.height;

    for (let index = 0; index < markers.length; index++) {
      const current = markers[index];
      const next = markers[index + 1];

      const pdfTop =
        page.height - (current.y + current.height) - TOP_PADDING;

      const pdfBottom = next
        ? page.height - (next.y + next.height) - BOTTOM_PADDING
        : page.height - PAGE_BOTTOM_LIMIT;

      const left = clamp(
        Math.round(LEFT_MARGIN * SCALE),
        0,
        imageWidth - 1
      );

      const top = clamp(
        Math.round(pdfTop * SCALE),
        0,
        imageHeight - 1
      );

      const right = clamp(
        Math.round((page.width - RIGHT_MARGIN) * SCALE),
        left + 1,
        imageWidth
      );

      const bottom = clamp(
        Math.round(pdfBottom * SCALE),
        top + 1,
        imageHeight
      );

      const width = right - left;
      const height = bottom - top;

      if (width < 100 || height < 40) {
        console.log(
          `Skipped Q.${current.questionNo} on page ${page.page}: invalid crop`
        );
        continue;
      }

      const outputFilename =
        `page-${String(page.page).padStart(3, "0")}` +
        `-q-${String(current.questionNo).padStart(2, "0")}.png`;

      const outputPath = path.join(OUTPUT_DIR, outputFilename);

      await sharp(pageImagePath)
        .extract({
          left,
          top,
          width,
          height
        })
        .png()
        .toFile(outputPath);

      results.push({
        questionNo: current.questionNo,
        page: page.page,
        image: outputPath.replaceAll("\\", "/"),
        pdfBounds: {
          left: LEFT_MARGIN,
          top: Number(pdfTop.toFixed(2)),
          right: Number((page.width - RIGHT_MARGIN).toFixed(2)),
          bottom: Number(pdfBottom.toFixed(2))
        },
        pixelBounds: {
          left,
          top,
          width,
          height
        }
      });

      console.log(
        `Page ${page.page} Q.${current.questionNo}: ${width}×${height}`
      );
    }
  }

  const manifestPath = path.join(OUTPUT_DIR, "questions.json");

  fs.writeFileSync(
    manifestPath,
    JSON.stringify(results, null, 2)
  );

  console.log(`\nCropped ${results.length} question regions`);
  console.log(`Saved crops: ${OUTPUT_DIR}`);
  console.log(`Saved manifest: ${manifestPath}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});