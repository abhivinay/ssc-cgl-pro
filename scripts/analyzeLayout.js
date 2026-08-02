import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = path.resolve("scripts/output/pages");
const OUTPUT_DIR = path.resolve("scripts/output/layout-analysis");
const EXTENSIONS = /\.(png|jpg|jpeg)$/i;
const SAMPLE_LIMIT = 30;
const ANALYSIS_WIDTH = 1400;
const DARK_THRESHOLD = 165;
const MIN_LINE_WIDTH_RATIO = 0.35;
const MAX_PIXEL_GAP = 12;
const MERGE_ROW_GAP = 5;
const MIN_REGION_HEIGHT = 100;
const MAX_REGION_HEIGHT_RATIO = 0.65;
const X_TOLERANCE = 45;

function getImageFiles(directory) {
  const files = [];

  function scan(currentDirectory) {
    for (const entry of fs.readdirSync(currentDirectory, {
      withFileTypes: true
    })) {
      const fullPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (EXTENSIONS.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  scan(directory);

  return files.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
}

function isDark(data, index) {
  const r = data[index];
  const g = data[index + 1];
  const b = data[index + 2];
  return (r + g + b) / 3 <= DARK_THRESHOLD;
}

function findLongestDarkRun(data, width, channels, y) {
  let bestStart = -1;
  let bestEnd = -1;
  let currentStart = -1;
  let lastDarkX = -1;

  for (let x = 0; x < width; x++) {
    const index = (y * width + x) * channels;

    if (isDark(data, index)) {
      if (
        currentStart === -1 ||
        x - lastDarkX > MAX_PIXEL_GAP
      ) {
        currentStart = x;
      }

      lastDarkX = x;

      if (
        bestStart === -1 ||
        lastDarkX - currentStart > bestEnd - bestStart
      ) {
        bestStart = currentStart;
        bestEnd = lastDarkX;
      }
    }
  }

  if (bestStart === -1) {
    return null;
  }

  return {
    start: bestStart,
    end: bestEnd,
    width: bestEnd - bestStart + 1
  };
}

function detectHorizontalLines(data, width, height, channels) {
  const candidates = [];
  const minimumWidth = width * MIN_LINE_WIDTH_RATIO;

  for (let y = 0; y < height; y++) {
    const run = findLongestDarkRun(
      data,
      width,
      channels,
      y
    );

    if (run && run.width >= minimumWidth) {
      candidates.push({
        y,
        xStart: run.start,
        xEnd: run.end,
        width: run.width
      });
    }
  }

  const groups = [];

  for (const candidate of candidates) {
    const last = groups[groups.length - 1];

    if (
      !last ||
      candidate.y > last.endY + MERGE_ROW_GAP ||
      Math.abs(candidate.xStart - last.xStart) > X_TOLERANCE ||
      Math.abs(candidate.xEnd - last.xEnd) > X_TOLERANCE
    ) {
      groups.push({
        startY: candidate.y,
        endY: candidate.y,
        xStart: candidate.xStart,
        xEnd: candidate.xEnd,
        samples: 1
      });
    } else {
      last.endY = candidate.y;
      last.xStart = Math.round(
        (last.xStart * last.samples + candidate.xStart) /
          (last.samples + 1)
      );
      last.xEnd = Math.round(
        (last.xEnd * last.samples + candidate.xEnd) /
          (last.samples + 1)
      );
      last.samples++;
    }
  }

  return groups.map(group => ({
    y: Math.round((group.startY + group.endY) / 2),
    startY: group.startY,
    endY: group.endY,
    thickness: group.endY - group.startY + 1,
    xStart: group.xStart,
    xEnd: group.xEnd,
    width: group.xEnd - group.xStart + 1
  }));
}

function detectQuestionRegions(lines, width, height) {
  const regions = [];

  for (let first = 0; first < lines.length - 1; first++) {
    for (let second = first + 1; second < lines.length; second++) {
      const topLine = lines[first];
      const bottomLine = lines[second];
      const regionHeight = bottomLine.y - topLine.y;

      if (regionHeight < MIN_REGION_HEIGHT) {
        continue;
      }

      if (regionHeight > height * MAX_REGION_HEIGHT_RATIO) {
        break;
      }

      const similarLeft =
        Math.abs(topLine.xStart - bottomLine.xStart) <=
        X_TOLERANCE;

      const similarRight =
        Math.abs(topLine.xEnd - bottomLine.xEnd) <=
        X_TOLERANCE;

      const sufficientWidth =
        Math.min(topLine.width, bottomLine.width) >=
        width * MIN_LINE_WIDTH_RATIO;

      if (!similarLeft || !similarRight || !sufficientWidth) {
        continue;
      }

      const left = Math.max(
        0,
        Math.min(topLine.xStart, bottomLine.xStart)
      );

      const right = Math.min(
        width,
        Math.max(topLine.xEnd, bottomLine.xEnd)
      );

      regions.push({
        top: topLine.y,
        bottom: bottomLine.y,
        left,
        right,
        width: right - left,
        height: regionHeight
      });

      break;
    }
  }

  return regions.filter((region, index, allRegions) => {
    return !allRegions.some((other, otherIndex) => {
      if (index === otherIndex) {
        return false;
      }

      return (
        other.top <= region.top &&
        other.bottom >= region.bottom &&
        other.height < region.height * 1.15
      );
    });
  });
}

function createOverlay(width, height, lines, regions) {
  const detectedLines = lines
    .map(
      line => `
      <line
        x1="${line.xStart}"
        y1="${line.y}"
        x2="${line.xEnd}"
        y2="${line.y}"
        stroke="red"
        stroke-width="4"
      />`
    )
    .join("");

  const detectedRegions = regions
    .map(
      (region, index) => `
      <rect
        x="${region.left}"
        y="${region.top}"
        width="${region.width}"
        height="${region.height}"
        fill="none"
        stroke="lime"
        stroke-width="5"
      />
      <text
        x="${region.left + 10}"
        y="${region.top + 30}"
        fill="blue"
        font-size="28"
        font-weight="bold"
      >${index + 1}</text>`
    )
    .join("");

  return Buffer.from(`
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${detectedLines}
      ${detectedRegions}
    </svg>
  `);
}

async function analyzeImage(inputPath) {
  const metadata = await sharp(inputPath, {
    limitInputPixels: false
  }).metadata();

  const targetWidth = Math.min(
    ANALYSIS_WIDTH,
    metadata.width || ANALYSIS_WIDTH
  );

  const { data, info } = await sharp(inputPath, {
    limitInputPixels: false
  })
    .resize({
      width: targetWidth,
      withoutEnlargement: true
    })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  const lines = detectHorizontalLines(
    data,
    width,
    height,
    channels
  );

  const regions = detectQuestionRegions(
    lines,
    width,
    height
  );

  const relativePath = path.relative(INPUT_DIR, inputPath);
  const relativeDirectory = path.dirname(relativePath);
  const outputDirectory = path.join(
    OUTPUT_DIR,
    relativeDirectory
  );

  fs.mkdirSync(outputDirectory, {
    recursive: true
  });

  const pageName = path.parse(inputPath).name;

  const previewPath = path.join(
    outputDirectory,
    `${pageName}-analysis.png`
  );

  const jsonPath = path.join(
    outputDirectory,
    `${pageName}-analysis.json`
  );

  const overlay = createOverlay(
    width,
    height,
    lines,
    regions
  );

  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
    .composite([{ input: overlay }])
    .png()
    .toFile(previewPath);

  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        source: relativePath,
        width,
        height,
        horizontalLines: lines,
        candidateRegions: regions
      },
      null,
      2
    )
  );

  console.log(
    `${relativePath}: ${lines.length} borders, ${regions.length} regions`
  );
}

async function main() {
  if (!fs.existsSync(INPUT_DIR)) {
    throw new Error(`Input folder not found: ${INPUT_DIR}`);
  }

  fs.rmSync(OUTPUT_DIR, {
    recursive: true,
    force: true
  });

  fs.mkdirSync(OUTPUT_DIR, {
    recursive: true
  });

  const files = getImageFiles(INPUT_DIR);

  if (files.length === 0) {
    throw new Error(`No images found in ${INPUT_DIR}`);
  }

  const samples = files.slice(0, SAMPLE_LIMIT);

  console.log(
    `Found ${files.length} images. Analyzing ${samples.length} samples.\n`
  );

  for (const file of samples) {
    try {
      await analyzeImage(file);
    } catch (error) {
      console.error(
        `Failed: ${path.relative(INPUT_DIR, file)}`
      );
      console.error(error.message);
    }
  }

  console.log("\nAnalysis completed.");
  console.log(`Check: ${OUTPUT_DIR}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});