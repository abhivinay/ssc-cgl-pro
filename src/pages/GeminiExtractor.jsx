import{useRef,useState}from"react";
import{FileText,LoaderCircle,UploadCloud,XCircle}from"lucide-react";
import{normalizeReviewQuestion,saveReviewQuestions}from"../services/reviewStorage";

const API_URL="http://localhost:5000/api/extract-pdf";
const MAX_SIZE=20*1024*1024;

export default function GeminiExtractor(){
const inputRef=useRef(null);
const[file,setFile]=useState(null);
const[state,setState]=useState("idle");
const[message,setMessage]=useState("");
const[result,setResult]=useState(null);

function chooseFile(selected){
if(!selected)return;
if(selected.type!=="application/pdf"){
setFile(null);
setState("error");
setMessage("Only PDF files are supported.");
return;
}
if(selected.size>MAX_SIZE){
setFile(null);
setState("error");
setMessage("PDF must be smaller than 20 MB.");
return;
}
setFile(selected);
setResult(null);
setState("ready");
setMessage("");
}

async function extractPDF(){
if(!file||state==="extracting")return;
setState("extracting");
setMessage("Gemini is reading the complete PDF...");

try{
const pdfBase64=await fileToBase64(file);
const response=await fetch(API_URL,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
pdfBase64,
mimeType:file.type||"application/pdf",
fileName:file.name
})
});

const data=await response.json().catch(()=>null);

if(!response.ok){
throw new Error(data?.error||`Extraction failed with status ${response.status}`);
}

const extractedQuestions=Array.isArray(data?.questions)
?data.questions
:Array.isArray(data?.data?.questions)
?data.data.questions
:[];

const reviewQuestions=extractedQuestions.map((question,index)=>
normalizeReviewQuestion({
...question,
questionText:
question.questionText??
question.englishQuestion??
question.question,
options:
question.options??
question.englishOptions??
question.answerOptions,
correctAnswer:
question.correctAnswer??
question.correctOption??
question.answer,
source:
question.source?.fileName??
question.source??
file.name,
reviewStatus:"pending",
paper:data.paper,
extractedAt:new Date().toISOString()
},index)
);

const existing=readExistingReviewQuestions();
const merged=mergeQuestions(existing,reviewQuestions);
saveReviewQuestions(merged);

localStorage.setItem(
"ssc-content-extraction-output",
JSON.stringify(data)
);

setResult({
paper:data.paper||{},
questionCount:reviewQuestions.length,
totalReviewQuestions:merged.length,
metadata:data.metadata||{}
});
setState("success");
setMessage(
reviewQuestions.length
?`${reviewQuestions.length} questions extracted and sent to Review Center.`
:"Extraction completed, but no readable questions were found."
);
}catch(error){
setState("error");
setMessage(error?.message||"PDF extraction failed.");
}
}

function reset(){
setFile(null);
setResult(null);
setState("idle");
setMessage("");
if(inputRef.current)inputRef.current.value="";
}

return(
<div className="mx-auto max-w-6xl space-y-6">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
Content Studio
</p>
<h1 className="mt-1 text-3xl font-bold text-white">Gemini PDF Extractor</h1>
<p className="mt-2 text-sm text-zinc-400">
Upload an SSC question-paper PDF. Extracted questions will automatically appear in Review Center.
</p>
</div>

<div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
<input
ref={inputRef}
type="file"
accept="application/pdf"
className="hidden"
onChange={event=>chooseFile(event.target.files?.[0])}
/>

{!file?(
<button
type="button"
onClick={()=>inputRef.current?.click()}
className="flex min-h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-950/60 px-6 transition hover:border-violet-500 hover:bg-violet-500/5"
>
<div className="rounded-2xl bg-violet-500/15 p-4 text-violet-300">
<UploadCloud size={36}/>
</div>
<p className="mt-4 text-lg font-semibold text-white">Choose SSC PDF</p>
<p className="mt-1 text-sm text-zinc-500">PDF only · Maximum 20 MB</p>
</button>
):(
<div className="space-y-5">
<div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:flex-row sm:items-center">
<div className="rounded-xl bg-red-500/15 p-3 text-red-300">
<FileText size={28}/>
</div>
<div className="min-w-0 flex-1">
<p className="truncate font-semibold text-white">{file.name}</p>
<p className="mt-1 text-sm text-zinc-500">{formatBytes(file.size)}</p>
</div>
<button
type="button"
onClick={reset}
disabled={state==="extracting"}
className="rounded-xl border border-zinc-700 p-2.5 text-zinc-400 transition hover:border-red-500 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
aria-label="Remove PDF"
>
<XCircle size={20}/>
</button>
</div>

<button
type="button"
onClick={extractPDF}
disabled={state==="extracting"}
className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-wait disabled:opacity-70"
>
{state==="extracting"&&<LoaderCircle className="animate-spin" size={20}/>}
{state==="extracting"?"Extracting PDF...":"Start Gemini Extraction"}
</button>
</div>
)}

{message&&(
<div className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
state==="success"
?"border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
:state==="error"
?"border-red-500/30 bg-red-500/10 text-red-300"
:"border-violet-500/30 bg-violet-500/10 text-violet-300"
}`}>
{message}
</div>
)}
</div>

{result&&(
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
<Stat label="Paper" value={result.paper?.title||file?.name||"SSC PDF"}/>
<Stat label="Extracted" value={result.questionCount}/>
<Stat label="Review Center Total" value={result.totalReviewQuestions}/>
<Stat label="Model" value={result.metadata?.model||"Gemini"}/>
</div>
)}
</div>
);
}

function Stat({label,value}){
return(
<div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
<p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
<p className="mt-2 truncate text-xl font-bold text-white">{value}</p>
</div>
);
}

function fileToBase64(file){
return new Promise((resolve,reject)=>{
const reader=new FileReader();
reader.onload=()=>{
const value=String(reader.result||"");
resolve(value.includes(",")?value.split(",")[1]:value);
};
reader.onerror=()=>reject(new Error("Unable to read the selected PDF."));
reader.readAsDataURL(file);
});
}

function readExistingReviewQuestions(){
try{
const saved=JSON.parse(
localStorage.getItem("ssc-content-review-data")||"[]"
);
return Array.isArray(saved)?saved:[];
}catch{
return[];
}
}

function mergeQuestions(existing,incoming){
const signatures=new Set(existing.map(question=>questionSignature(question)));
const unique=incoming.filter(question=>{
const signature=questionSignature(question);
if(signatures.has(signature))return false;
signatures.add(signature);
return true;
});
return[...existing,...unique];
}

function questionSignature(question){
return[
String(question.questionText||"").trim().toLowerCase(),
String(question.source||"").trim().toLowerCase()
].join("|");
}

function formatBytes(bytes){
if(bytes<1024)return`${bytes} B`;
if(bytes<1024*1024)return`${(bytes/1024).toFixed(1)} KB`;
return`${(bytes/(1024*1024)).toFixed(1)} MB`;
}