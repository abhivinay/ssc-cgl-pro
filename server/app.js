import express from"express";
import cors from"cors";
import{getDocument}from"pdfjs-dist/legacy/build/pdf.mjs";
import{createCanvas}from"@napi-rs/canvas";
import{createWorker}from"tesseract.js";

const app=express();
const MAX_PDF_BYTES=20*1024*1024;
const MAX_OCR_PAGES=100;

app.use(cors({
origin:process.env.CLIENT_ORIGIN||"http://localhost:5173",
methods:["GET","POST"]
}));
app.use(express.json({limit:"30mb"}));

app.get("/api/health",(request,response)=>{
response.json({
ok:true,
service:"ssc-local-pdf-ocr-extractor",
model:"Local PDF.js + Tesseract OCR",
apiKeyConfigured:false
});
});

app.post("/api/extract-pdf",async(request,response)=>{
let worker=null;

try{
const{
pdfBase64,
mimeType="application/pdf",
fileName="document.pdf"
}=request.body||{};

if(typeof pdfBase64!=="string"||!pdfBase64.trim()){
return response.status(400).json({
error:"PDF data is required",
code:"PDF_DATA_MISSING",
retryable:false
});
}

if(mimeType!=="application/pdf"){
return response.status(400).json({
error:"Only PDF files are supported",
code:"INVALID_FILE_TYPE",
retryable:false
});
}

const pdfBuffer=Buffer.from(pdfBase64,"base64");

if(!pdfBuffer.length){
return response.status(400).json({
error:"Selected PDF is empty or invalid",
code:"INVALID_PDF_DATA",
retryable:false
});
}

if(pdfBuffer.length>MAX_PDF_BYTES){
return response.status(413).json({
error:"PDF is too large. Maximum supported size is 20 MB",
code:"PDF_TOO_LARGE",
retryable:false
});
}

const loadingTask=getDocument({
data:new Uint8Array(pdfBuffer),
useSystemFonts:true,
disableFontFace:true
});
const pdf=await loadingTask.promise;

if(pdf.numPages>MAX_OCR_PAGES){
return response.status(413).json({
error:`PDF has ${pdf.numPages} pages. Maximum supported length is ${MAX_OCR_PAGES} pages`,
code:"PDF_TOO_MANY_PAGES",
retryable:false
});
}

const pages=[];
let ocrPageCount=0;
let directTextPageCount=0;

for(let pageNumber=1;pageNumber<=pdf.numPages;pageNumber++){
const page=await pdf.getPage(pageNumber);
const directText=await extractDirectText(page);

if(isReadablePage(directText)){
pages.push({
pageNumber,
text:cleanExtractedText(directText),
method:"direct"
});
directTextPageCount++;
continue;
}

if(!worker){
worker=await createWorker("eng",1,{
logger:message=>{
if(message.status==="recognizing text"){
console.log(
`OCR progress: ${Math.round((message.progress||0)*100)}%`
);
}
}
});
}

const imageBuffer=await renderPage(page);
const result=await worker.recognize(imageBuffer);
const ocrText=cleanExtractedText(result?.data?.text||"");

pages.push({
pageNumber,
text:ocrText,
method:"ocr"
});
ocrPageCount++;
}

const questions=parseQuestions(pages,fileName);
const paper=inferPaper(fileName,pages);

return response.json({
paper,
questions,
text:formatQuestionText(questions),
pages:pages.map(page=>({
pageNumber:page.pageNumber,
text:page.text,
method:page.method
})),
metadata:{
fileName,
pageCount:pdf.numPages,
questionCount:questions.length,
directTextPageCount,
ocrPageCount,
model:"Local PDF.js + Tesseract OCR",
extractedAt:new Date().toISOString()
}
});
}catch(error){
console.error("Local PDF extraction failed:",error);

return response.status(getErrorStatus(error)).json({
error:getErrorMessage(error),
code:getErrorCode(error),
retryable:false,
retryAfter:0,
quotaType:null
});
}finally{
if(worker){
try{
await worker.terminate();
}catch{}
}
}
});

app.use((error,request,response,next)=>{
if(error?.type==="entity.too.large"){
return response.status(413).json({
error:"PDF request is too large. Maximum supported size is 20 MB",
code:"PDF_TOO_LARGE",
retryable:false
});
}
return next(error);
});

async function extractDirectText(page){
const content=await page.getTextContent();
const items=Array.isArray(content?.items)?content.items:[];

if(!items.length)return"";

const lines=[];
let currentLine=[];
let previousY=null;

for(const item of items){
const value=String(item?.str||"").trim();
if(!value)continue;

const y=Math.round(Number(item?.transform?.[5])||0);

if(previousY!==null&&Math.abs(y-previousY)>3){
if(currentLine.length)lines.push(currentLine.join(" "));
currentLine=[];
}

currentLine.push(value);
previousY=y;
}

if(currentLine.length)lines.push(currentLine.join(" "));
return lines.join("\n");
}

async function renderPage(page){
const viewport=page.getViewport({scale:2});
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

return canvas.toBuffer("image/png");
}

function isReadablePage(value){
const text=String(value||"").replace(/\s+/g," ").trim();
const letters=(text.match(/[A-Za-z]/g)||[]).length;
const words=text.split(/\s+/).filter(Boolean).length;
return text.length>=80&&letters>=40&&words>=12;
}

function cleanExtractedText(value){
return String(value||"")
.replace(/\r/g,"")
.replace(/[ \t]+/g," ")
.replace(/ *\n */g,"\n")
.replace(/\n{3,}/g,"\n\n")
.replace(/[|¦]/g,"I")
.trim();
}

function parseQuestions(pages,fileName){
const questions=[];

for(const page of pages){
const blocks=splitQuestionBlocks(page.text);

for(const block of blocks){
const parsed=parseQuestionBlock(block);

if(!parsed.questionText)continue;
if(!looksLikeQuestion(parsed.questionText,parsed.options))continue;

questions.push({
id:`q-${questions.length+1}`,
englishQuestion:parsed.questionText,
englishOptions:parsed.options,
correctOption:parsed.correctOption,
subject:inferSubject(parsed.questionText),
topic:"Unassigned",
confidence:calculateConfidence(parsed),
source:{
fileName,
pageNumber:page.pageNumber
}
});
}
}

return questions;
}

function splitQuestionBlocks(value){
const text=String(value||"")
.replace(
/(?:^|\n)\s*(?:Q(?:uestion)?\.?\s*)?(\d{1,3})\s*[.)\-:]\s*/gi,
"\n<<<QUESTION:$1>>> "
)
.trim();

const marked=text.split(/(?=<<<QUESTION:\d+>>>)/);

if(marked.length>1){
return marked
.map(block=>block.replace(/^<<<QUESTION:\d+>>>\s*/,"").trim())
.filter(Boolean);
}

return text
.split(/\n{2,}/)
.map(block=>block.trim())
.filter(block=>block.length>=20);
}

function parseQuestionBlock(block){
let text=String(block||"")
.replace(/\n+/g," ")
.replace(/\s+/g," ")
.trim();

const answerMatch=text.match(
/(?:answer|ans(?:wer)?|correct\s*(?:answer|option)?)\s*[:.\-]?\s*[\[(]?\s*([A-D1-4])\s*[\])]?\s*$/i
);

const correctOption=answerMatch
?normalizeCorrectOption(answerMatch[1])
:"";

if(answerMatch)text=text.slice(0,answerMatch.index).trim();

const optionPattern=/(?:^|\s)(?:\(?([A-D])\)?|(?:\(?([1-4])\)?))\s*[.)\-:]\s*/gi;
const matches=[...text.matchAll(optionPattern)];

if(matches.length>=2){
const questionText=text.slice(0,matches[0].index).trim();
const options=matches.slice(0,4).map((match,index)=>{
const start=(match.index||0)+match[0].length;
const next=matches[index+1];
const end=next?.index??text.length;
return cleanOption(text.slice(start,end));
});

while(options.length<4)options.push("");

return{
questionText:cleanQuestion(questionText),
options,
correctOption
};
}

const inlineOptions=parseInlineOptions(text);

if(inlineOptions){
return{
questionText:cleanQuestion(inlineOptions.questionText),
options:inlineOptions.options,
correctOption
};
}

return{
questionText:cleanQuestion(text),
options:["","","",""],
correctOption
};
}

function parseInlineOptions(text){
const patterns=[
/^(.*?)[ \n]+\(A\)\s*(.*?)[ \n]+\(B\)\s*(.*?)[ \n]+\(C\)\s*(.*?)[ \n]+\(D\)\s*(.*)$/i,
/^(.*?)[ \n]+A[.)]\s*(.*?)[ \n]+B[.)]\s*(.*?)[ \n]+C[.)]\s*(.*?)[ \n]+D[.)]\s*(.*)$/i,
/^(.*?)[ \n]+1[.)]\s*(.*?)[ \n]+2[.)]\s*(.*?)[ \n]+3[.)]\s*(.*?)[ \n]+4[.)]\s*(.*)$/i
];

for(const pattern of patterns){
const match=text.match(pattern);
if(!match)continue;

return{
questionText:match[1],
options:match.slice(2,6).map(cleanOption)
};
}

return null;
}

function cleanQuestion(value){
return String(value||"")
.replace(/^(?:Q(?:uestion)?\.?\s*)?\d{1,3}\s*[.)\-:]\s*/i,"")
.replace(/\s+/g," ")
.trim();
}

function cleanOption(value){
return String(value||"")
.replace(/\s+/g," ")
.replace(/(?:answer|ans(?:wer)?)\s*[:.\-].*$/i,"")
.trim();
}

function normalizeCorrectOption(value){
const answer=String(value||"").trim().toUpperCase();
if(["A","B","C","D"].includes(answer))return answer;
if(["1","2","3","4"].includes(answer)){
return String.fromCharCode(64+Number(answer));
}
return"";
}

function looksLikeQuestion(questionText,options){
const text=String(questionText||"").trim();

if(text.length<8||text.length>2000)return false;
if(/^(instructions?|directions?|section|part|page)\b/i.test(text)){
return false;
}

const readableCharacters=(text.match(/[A-Za-z0-9]/g)||[]).length;
if(readableCharacters<6)return false;

return options.some(Boolean)||
text.includes("?")||
/^(choose|select|find|which|what|who|where|when|why|how|if|the)\b/i.test(text);
}

function calculateConfidence(parsed){
let score=45;
if(parsed.questionText.includes("?"))score+=10;
if(parsed.options.filter(Boolean).length===4)score+=30;
if(parsed.correctOption)score+=10;
if(parsed.questionText.length>=25)score+=5;
return Math.min(95,score);
}

function inferSubject(value){
const text=String(value||"").toLowerCase();

if(/\b(synonym|antonym|idiom|phrase|grammar|sentence|spelling|passage|word)\b/.test(text)){
return"English";
}

if(/\b(series|analogy|coding|decoding|blood relation|syllogism|odd one|mirror|venn|dice|direction)\b/.test(text)){
return"Reasoning";
}

if(/\b(percent|ratio|average|profit|loss|interest|distance|speed|work|algebra|geometry|triangle|circle|number)\b/.test(text)||
/[\d%]+\s*[+\-×÷*/=]/.test(text)){
return"Quant";
}

if(/\b(history|geography|constitution|president|parliament|science|biology|physics|chemistry|india|world)\b/.test(text)){
return"General Awareness";
}

return"Unassigned";
}

function inferPaper(fileName,pages){
const title=String(fileName||"document.pdf")
.replace(/\.pdf$/i,"")
.replace(/[_-]+/g," ")
.trim();

const sample=pages
.map(page=>page.text)
.join(" ")
.slice(0,5000);

const yearMatch=sample.match(/\b(20\d{2}|19\d{2})\b/);
const shiftMatch=sample.match(/\bshift\s*[-:]?\s*(I{1,3}|[1-3])\b/i);
const dateMatch=sample.match(
/\b([0-3]?\d[\/.-][01]?\d[\/.-](?:20)?\d{2,4})\b/
);

return{
title:title||"SSC PDF",
exam:"SSC",
examType:/cgl/i.test(sample+title)
?"CGL"
:/chsl/i.test(sample+title)
?"CHSL"
:/mts/i.test(sample+title)
?"MTS"
:"",
year:yearMatch?Number(yearMatch[1]):null,
shift:shiftMatch?shiftMatch[1]:"",
date:dateMatch?dateMatch[1]:"",
language:"English",
sourceFile:fileName
};
}

function formatQuestionText(questions){
return questions.map((question,index)=>{
const options=question.englishOptions
.map((option,optionIndex)=>
`${String.fromCharCode(65+optionIndex)}. ${option}`
)
.join("\n");

return`${index+1}. ${question.englishQuestion}\n${options}`;
}).join("\n\n");
}

function getErrorStatus(error){
const message=String(error?.message||"").toLowerCase();

if(message.includes("password")||message.includes("encrypted")){
return 400;
}
if(message.includes("invalid pdf")||message.includes("pdf structure")){
return 400;
}
if(message.includes("too large"))return 413;
return 500;
}

function getErrorCode(error){
const status=getErrorStatus(error);
const message=String(error?.message||"").toLowerCase();

if(message.includes("password")||message.includes("encrypted")){
return"PASSWORD_PROTECTED_PDF";
}
if(status===400)return"INVALID_PDF";
if(status===413)return"PDF_TOO_LARGE";
return"LOCAL_OCR_EXTRACTION_FAILED";
}

function getErrorMessage(error){
const message=String(error?.message||"").toLowerCase();

if(message.includes("password")||message.includes("encrypted")){
return"Password-protected PDFs are not supported";
}
if(message.includes("invalid pdf")||message.includes("pdf structure")){
return"Selected file is not a valid readable PDF";
}

return error?.message||"Local PDF/OCR extraction failed";
}

export default app;