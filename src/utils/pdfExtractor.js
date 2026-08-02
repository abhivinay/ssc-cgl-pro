import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc=pdfjsWorker;

export async function extractPDFText(url){
try{
const loadingTask=pdfjsLib.getDocument({url});
const pdf=await loadingTask.promise;

let fullText="";

for(let pageNum=1;pageNum<=pdf.numPages;pageNum++){
const page=await pdf.getPage(pageNum);
const textContent=await page.getTextContent();

const pageText=textContent.items
.map(item=>item.str)
.join(" ");

fullText+=pageText+"\n\n";
}

return{
success:true,
pages:pdf.numPages,
text:fullText
};

}catch(error){
console.error("PDF extraction failed:",error);

return{
success:false,
pages:0,
text:"",
error:error.message
};
}
}
export function extractQuestions(text){
const parts=text.split(/Q\.No:\s*\d+/i);

const questions=[];

for(const part of parts){
const clean=part
.replace(/\s+/g," ")
.replace(/Not Answered/gi,"")
.replace(/Correct Option selected/gi,"")
.replace(/Wrong Option selected/gi,"")
.replace(/Save \/ Print/gi,"")
.replace(/Undertaking by the candidate.*?(?=PART-|$)/gi,"")
.replace(/Exam Level.*?(?=PART-|$)/gi,"")
.trim();

const hasOptions=/A\.|B\.|C\.|D\./i.test(clean);
const hasMath=/\d+.*?[+\-×÷%]/.test(clean);
const hasSentence=/[a-zA-Z]{20,}/.test(clean);

if(clean.length>60 && (hasOptions || hasMath || hasSentence)){
questions.push(clean.slice(0,400));
}
}

return questions.slice(0,120);
}

export function detectSubject(text){
const lower=text.toLowerCase();

if(lower.includes("percentage")||lower.includes("profit")||lower.includes("ratio")) return "Quant";

if(lower.includes("seating")||lower.includes("coding")||lower.includes("blood relation")) return "Reasoning";

if(lower.includes("synonym")||lower.includes("error detection")||lower.includes("cloze")) return "English";

if(lower.includes("history")||lower.includes("polity")||lower.includes("geography")) return "GK";

return "Unknown";
}

export default{
extractPDFText,
extractQuestions,
detectSubject
};