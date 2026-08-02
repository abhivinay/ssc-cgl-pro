import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const ROOT=path.resolve(__dirname,"..");
const PDF_DIR=path.join(ROOT,"public","original-pdfs");
const OUTPUT_DIR=path.join(__dirname,"output");
const OUTPUT_FILE=path.join(OUTPUT_DIR,"raw-pyqs.json");

const SECTION_NAMES=[
"General Intelligence and Reasoning",
"General Awareness",
"Quantitative Aptitude",
"English Comprehension"
];

const normalize=value=>String(value||"").replace(/\s+/g," ").trim();

const getPdfFiles=async directory=>{
const entries=await fs.readdir(directory,{withFileTypes:true});
const files=[];
for(const entry of entries){
const fullPath=path.join(directory,entry.name);
if(entry.isDirectory())files.push(...await getPdfFiles(fullPath));
else if(entry.isFile()&&entry.name.toLowerCase().endsWith(".pdf"))files.push(fullPath);
}
return files;
};

const detectSection=text=>{
const normalized=normalize(text).toLowerCase();
return SECTION_NAMES.find(section=>normalized.includes(section.toLowerCase()))||null;
};

const detectExamDate=text=>{
const match=text.match(/Exam Date\s*[:\-]?\s*(\d{1,2}\/\d{1,2}\/\d{4})/i);
return match?.[1]||null;
};

const detectExamTime=text=>{
const match=text.match(/Exam Time\s*[:\-]?\s*([0-9:]+\s*[AP]M\s*-\s*[0-9:]+\s*[AP]M)/i);
return match?.[1]||null;
};

const detectShift=time=>{
if(!time)return null;
const start=time.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
if(!start)return null;
let hour=Number(start[1]);
const period=start[3].toUpperCase();
if(period==="PM"&&hour!==12)hour+=12;
if(period==="AM"&&hour===12)hour=0;
if(hour<12)return 1;
if(hour<15)return 2;
return 3;
};

const detectExamYear=text=>{
const match=text.match(/Combined Graduate Level Examination[-\s]*(\d{4})/i);
return match?Number(match[1]):null;
};

const extractPageText=async page=>{
const content=await page.getTextContent();
return content.items.map(item=>item.str).join(" ");
};

const extractPdf=async pdfPath=>{
const data=new Uint8Array(await fs.readFile(pdfPath));
const document=await pdfjsLib.getDocument({data}).promise;
const pages=[];
let examDate=null;
let examTime=null;
let examYear=null;
let currentSection=null;

for(let pageNumber=1;pageNumber<=document.numPages;pageNumber++){
const page=await document.getPage(pageNumber);
const text=normalize(await extractPageText(page));
const detectedSection=detectSection(text);
if(detectedSection)currentSection=detectedSection;
examDate=examDate||detectExamDate(text);
examTime=examTime||detectExamTime(text);
examYear=examYear||detectExamYear(text);
pages.push({
pageNumber,
section:currentSection,
text
});
}

return{
fileName:path.basename(pdfPath),
relativePath:path.relative(PDF_DIR,pdfPath).replaceAll("\\","/"),
exam:"SSC CGL",
examYear,
examDate,
examTime,
shift:detectShift(examTime),
totalPages:document.numPages,
pages
};
};

const main=async()=>{
await fs.mkdir(OUTPUT_DIR,{recursive:true});
let pdfFiles=[];
try{
pdfFiles=await getPdfFiles(PDF_DIR);
}catch{
console.error(`Folder not found: ${PDF_DIR}`);
process.exit(1);
}

if(!pdfFiles.length){
console.error("No PDF files found inside public/original-pdfs.");
process.exit(1);
}

console.log(`Found ${pdfFiles.length} PDF files.`);
const results=[];

for(let index=0;index<pdfFiles.length;index++){
const pdfPath=pdfFiles[index];
console.log(`[${index+1}/${pdfFiles.length}] Extracting ${path.basename(pdfPath)}`);
try{
results.push(await extractPdf(pdfPath));
}catch(error){
results.push({
fileName:path.basename(pdfPath),
relativePath:path.relative(PDF_DIR,pdfPath).replaceAll("\\","/"),
error:error instanceof Error?error.message:String(error)
});
}
}

await fs.writeFile(OUTPUT_FILE,JSON.stringify(results,null,2),"utf8");
console.log(`Completed: ${OUTPUT_FILE}`);
};

main().catch(error=>{
console.error(error);
process.exit(1);
});