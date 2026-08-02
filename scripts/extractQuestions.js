import fs from "fs";

const INPUT = "scripts/output/pdf-layout.json";
const OUTPUT = "scripts/output/questions.json";

const pages = JSON.parse(fs.readFileSync(INPUT, "utf8"));

const QUESTIONS = [];

for (const page of pages) {
  const items = page.items.filter(i => i.text && i.text.trim());

  const questionStarts = [];

  items.forEach((item, index) => {
    if (/^Q\.\d+$/i.test(item.text.trim())) {
      questionStarts.push({
        index,
        number: Number(item.text.replace(/[^\d]/g, "")),
        y: item.y
      });
    }
  });

  for (let i = 0; i < questionStarts.length; i++) {
    const start = questionStarts[i];
    const end =
      i === questionStarts.length - 1
        ? items.length
        : questionStarts[i + 1].index;

    const block = items.slice(start.index, end);

    QUESTIONS.push({
      questionNo: start.number,
      page: page.page,
      y: start.y,
      items: block
    });
  }
}

fs.writeFileSync(
  OUTPUT,
  JSON.stringify(QUESTIONS, null, 2)
);

console.log(`Extracted ${QUESTIONS.length} questions`);
console.log(`Saved -> ${OUTPUT}`);