import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = path.resolve("scripts/output/pages");
const OUTPUT_DIR = path.resolve("scripts/output/questions");

const BLUE_MIN_B = 150;
const BLUE_MIN_G = 70;
const BLUE_MAX_G = 190;
const BLUE_MAX_R = 80;
const MIN_BLUE_PIXELS = 80;
const MIN_BLUE_BAND_HEIGHT = 8;
const TOP_PADDING = 10;
const SIDE_PADDING = 8;
const MIN_CROP_HEIGHT = 100;
const BLANK_ROW_LIMIT = 40;

function isBlue(r, g, b) {
  return r <= BLUE_MAX_R && g >= BLUE_MIN_G && g <= BLUE_MAX_G && b >= BLUE_MIN_B;
}

function getImageFiles(directory) {
  const results = [];

  function scan(currentDirectory) {
    const entries = fs.readdirSync(currentDirectory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
        results.push(fullPath);
      }
    }
  }

  scan(directory);

  return results.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
}

function detectBlueBands(data, width, height, channels) {
  const blueRows = [];

  for (let y = 0; y < height; y++) {
    let bluePixels = 0;

    for (let x = Math.floor(width * 0.55); x < width; x++) {
      const index = (y * width + x) * channels;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      if (isBlue(r, g, b)) {
        bluePixels++;
      }
    }

    if (bluePixels >= MIN_BLUE_PIXELS) {
      blueRows.push(y);
    }
  }

  const bands = [];

  for (const row of blueRows) {
    const lastBand = bands[bands.length - 1];

    if (!lastBand || row > lastBand.end + 1) {
      bands.push({ start: row, end: row });
    } else {
      lastBand.end = row;
    }
  }

  return bands.filter(
    band => band.end - band.start + 1 >= MIN_BLUE_BAND_HEIGHT
  );
}

function rowIsBlank(data, width, channels, y) {
  let nonWhitePixels = 0;

  for (let x = 20; x < width - 20; x += 3) {
    const index = (y * width + x) * channels;
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];

    if (r < 242 || g < 242 || b < 242) {
      nonWhitePixels++;
    }
  }

  return nonWhitePixels < 8;
}

function findLastQuestionBottom(data, width, height, channels, startY) {
  let blankCount = 0;

  for (let y = startY + MIN_CROP_HEIGHT; y < height - 50; y++) {
    if (rowIsBlank(data, width, channels, y)) {
      blankCount++;

      if (blankCount >= BLANK_ROW_LIMIT) {
        return y - blankCount;
      }
    } else {
      blankCount = 0;
    }
  }

  return height - 50;
}

async function cropPage(inputPath) {
  const image = sharp(inputPath);

  const { data, info } = await image
    .clone()
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const blueBands = detectBlueBands(data, width, height, channels);

  const relativePath = path.relative(INPUT_DIR, inputPath);
  const relativeDirectory = path.dirname(relativePath);
  const pageName = path.parse(inputPath).name;

  const outputDirectory = path.join(OUTPUT_DIR, relativeDirectory);
  fs.mkdirSync(outputDirectory, { recursive: true });

  if (blueBands.length === 0) {
    console.log(`No question blocks detected: ${relativePath}`);
    return 0;
  }

  let savedCount = 0;

  for (let i = 0; i < blueBands.length; i++) {
    const currentBand = blueBands[i];
    const nextBand = blueBands[i + 1];

    const top = Math.max(0, currentBand.start - TOP_PADDING);

    let bottom;

    if (nextBand) {
      bottom = Math.max(
        top + MIN_CROP_HEIGHT,
        nextBand.start - TOP_PADDING - 4
      );
    } else {
      bottom = findLastQuestionBottom(
        data,
        width,
        height,
        channels,
        currentBand.end
      );
    }

    const cropHeight = bottom - top;

    if (cropHeight < MIN_CROP_HEIGHT) {
      continue;
    }

    const outputName =
      `${pageName}_q${String(savedCount + 1).padStart(2, "0")}.png`;

    const outputPath = path.join(outputDirectory, outputName);

    await sharp(inputPath)
      .extract({
        left: SIDE_PADDING,
        top,
        width: width - SIDE_PADDING * 2,
        height: Math.min(cropHeight, height - top)
      })
      .png()
      .toFile(outputPath);

    savedCount++;
  }

  console.log(`${relativePath}: ${savedCount} questions cropped`);
  return savedCount;
}

async function main() {
  if (!fs.existsSync(INPUT_DIR)) {
    throw new Error(`Input folder not found: ${INPUT_DIR}`);
  }

  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = getImageFiles(INPUT_DIR);

  if (files.length === 0) {
    throw new Error(`No image files found inside ${INPUT_DIR}`);
  }

  console.log(`Found ${files.length} rendered page images\n`);

  let totalQuestions = 0;

  for (const file of files) {
    totalQuestions += await cropPage(file);
  }

  console.log(`\nCompleted: ${totalQuestions} question images created`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});