import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import {createCanvas,ImageData,Path2D,DOMMatrix} from "@napi-rs/canvas";

globalThis.ImageData=ImageData;
globalThis.Path2D=Path2D;
globalThis.DOMMatrix=DOMMatrix;

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const ROOT=path.resolve(__dirname,"..");
const PDF_DIR=path.join(ROOT,"public","original-pdfs");
const OUTPUT_DIR=path.join(__dirname,"output","pages");
const SCALE=5;

const safeName=name=>name
.replace(/\.pdf$/i,"")
.replace(/[<>:"/\\|?*\x00-\x1F]/g,"_")
.replace(/\s+/g,"_");

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

const renderPdf=async pdfPath=>{
const data=new Uint8Array(await fs.readFile(pdfPath));
const pdf=await pdfjsLib.getDocument({
data,
disableFontFace:false,
useSystemFonts:true
}).promise;

const relativePath=path.relative(PDF_DIR,pdfPath);
const relativeDirectory=path.dirname(relativePath);
const pdfFolder=safeName(path.basename(pdfPath));
const outputFolder=path.join(OUTPUT_DIR,relativeDirectory,pdfFolder);

await fs.mkdir(outputFolder,{recursive:true});

for(let pageNumber=1;pageNumber<=pdf.numPages;pageNumber++){
const page=await pdf.getPage(pageNumber);
const viewport=page.getViewport({scale:SCALE});
const canvas=createCanvas(
Math.ceil(viewport.width),
Math.ceil(viewport.height)
);
const context=canvas.getContext("2d");

context.fillStyle="#ffffff";
context.fillRect(0,0,canvas.width,canvas.height);

await page.render({
canvasContext:context,
viewport
}).promise;

const outputFile=path.join(
outputFolder,
`page-${String(pageNumber).padStart(3,"0")}.png`
);

await fs.writeFile(outputFile,canvas.toBuffer("image/png"));
console.log(`Rendered ${path.basename(pdfPath)} page ${pageNumber}/${pdf.numPages}`);
}

await pdf.destroy();
};

const main=async()=>{
await fs.mkdir(OUTPUT_DIR,{recursive:true});
const pdfFiles=await getPdfFiles(PDF_DIR);

if(!pdfFiles.length){
console.error("No PDFs found inside public/original-pdfs.");
process.exit(1);
}

console.log(`Found ${pdfFiles.length} PDFs.`);

for(let index=0;index<pdfFiles.length;index++){
console.log(`\n[${index+1}/${pdfFiles.length}] ${pdfFiles[index]}`);
try{
await renderPdf(pdfFiles[index]);
}catch(error){
console.error(`Failed: ${pdfFiles[index]}`);
console.error(error);
}
}

console.log("\nRendering completed.");
};

main().catch(error=>{
console.error(error);
process.exit(1);
});