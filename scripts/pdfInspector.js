import fs from "fs";
import path from "path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const PDF =
  "public/original-pdfs/PYQS/2019/3-3/3_march_shift_1_copy.pdf";

async function main() {
  if (!fs.existsSync(PDF)) {
    throw new Error(`PDF not found:\n${PDF}`);
  }

  const data = new Uint8Array(fs.readFileSync(PDF));

  const pdf = await pdfjsLib.getDocument({
    data,
    useSystemFonts: true
  }).promise;

  console.log(`Pages: ${pdf.numPages}\n`);

  const output = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);

    const viewport = page.getViewport({ scale: 1 });

    const text = await page.getTextContent();

    const items = text.items.map(item => {
      const [, , , , x, y] = item.transform;

      return {
        text: item.str,
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        width: Number(item.width.toFixed(2)),
        height: Number(item.height.toFixed(2)),
        font: item.fontName
      };
    });

    output.push({
      page: pageNumber,
      width: viewport.width,
      height: viewport.height,
      items
    });

    console.log(
      `Page ${pageNumber}: ${items.length} text items`
    );
  }

  fs.mkdirSync("scripts/output", {
    recursive: true
  });

  fs.writeFileSync(
    "scripts/output/pdf-layout.json",
    JSON.stringify(output, null, 2)
  );

  console.log("\nSaved:");
  console.log("scripts/output/pdf-layout.json");
}

main().catch(console.error);