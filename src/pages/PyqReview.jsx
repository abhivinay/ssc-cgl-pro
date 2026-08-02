import {validateQuestion} from "../utils/questionValidator";
import ExtractionLog from "../components/ai/ExtractionLog";
import {useEffect,useMemo,useRef,useState} from "react";
import AIProgressCard from "../components/ai/AIProgressCard";
import useExtractionQueue from "../hooks/useExtractionQueue";
import {extractQuestionWithGemini} from "../services/gemini";

const DATA_URL="/pyq-data/question-dataset.json";
const STORAGE_KEY="ssc-pyq-review-data";
const LOG_STORAGE_KEY="ssc-pyq-extraction-logs";
const REQUEST_DELAY=2500;

function getImageUrl(questionImage=""){
const filename=questionImage.replaceAll("\\","/").split("/").pop();
return `/pyq-data/images/${filename}`;
}

function normalizeQuestion(question){
return{
...question,
questionText:question.questionText||question.ocrText||"",
options:normalizeOptions(question.options),
correctAnswer:String(question.correctAnswer||""),
explanation:question.explanation||"",
verified:Boolean(question.verified),
needsReview:question.needsReview!==undefined?Boolean(question.needsReview):!question.verified,
validationErrors:Array.isArray(question.validationErrors)?question.validationErrors:[],
extractionStatus:question.extractionStatus||"pending"
};
}

function normalizeOptions(options){
const normalized=Array.isArray(options)?options.slice(0,4):[];
while(normalized.length<4)normalized.push("");
return normalized.map(option=>String(option||""));
}

function delay(milliseconds){
return new Promise(resolve=>window.setTimeout(resolve,milliseconds));
}

export default function PyqReview(){
const [questions,setQuestions]=useState([]);
const [currentIndex,setCurrentIndex]=useState(0);
const [filter,setFilter]=useState("review");
const [loading,setLoading]=useState(true);
const [message,setMessage]=useState("");
const [imageZoomed,setImageZoomed]=useState(false);
const [extracting,setExtracting]=useState(false);
const workerRunningRef=useRef(false);
const [logs,setLogs]=useState(()=>{
try{
const saved=localStorage.getItem(LOG_STORAGE_KEY);
return saved?JSON.parse(saved):[];
}catch{
return[];
}
});

useEffect(()=>{
async function loadQuestions(){
try{
const saved=localStorage.getItem(STORAGE_KEY);
if(saved){
const parsed=JSON.parse(saved);
setQuestions(parsed.map(normalizeQuestion));
return;
}
const response=await fetch(DATA_URL);
if(!response.ok)throw new Error(`Unable to load ${DATA_URL}`);
const data=await response.json();
setQuestions(data.map(normalizeQuestion));
}catch(error){
setMessage(error.message);
}finally{
setLoading(false);
}
}
loadQuestions();
},[]);

const extractionItems=useMemo(()=>{
return questions
.filter(question=>!question.verified)
.map(question=>({
...question,
status:question.extractionStatus||"pending"
}));
},[questions]);

const{
queue:extractionQueue,
stats:extractionStats,
current:extractionCurrent,
isRunning:extractionRunning,
start:startExtractionQueue,
pause:pauseExtractionQueue,
resume:resumeExtractionQueue,
stop:stopExtractionQueue,
getNextPending,
markExtracting,
markCompleted,
markFailed,
retryFailed
}=useExtractionQueue(extractionItems);

const filteredQuestions=useMemo(()=>{
if(filter==="review")return questions.filter(question=>question.needsReview);
if(filter==="verified")return questions.filter(question=>question.verified);
if(filter==="unverified")return questions.filter(question=>!question.verified);
return questions;
},[questions,filter]);

const currentQuestion=filteredQuestions[currentIndex]||null;


useEffect(()=>{
if(currentIndex>=filteredQuestions.length)setCurrentIndex(0);
},[filteredQuestions.length,currentIndex]);

useEffect(()=>{
setImageZoomed(false);
},[currentIndex]);

useEffect(()=>{
if(!questions.length)return;
const timeout=window.setTimeout(()=>{
localStorage.setItem(STORAGE_KEY,JSON.stringify(questions));
},500);
return()=>window.clearTimeout(timeout);
},[questions]);

useEffect(()=>{
localStorage.setItem(LOG_STORAGE_KEY,JSON.stringify(logs));
},[logs]);

function showMessage(text){
setMessage(text);
window.setTimeout(()=>setMessage(""),3000);
}

function addLog(message,type="info"){
setLogs(previous=>[
{
id:`${Date.now()}-${Math.random()}`,
message,
type,
time:new Date().toLocaleTimeString()
},
...previous
].slice(0,200));
}

function updateQuestionsAndSave(updater){
setQuestions(previous=>{
const updated=typeof updater==="function"?updater(previous):updater;
localStorage.setItem(STORAGE_KEY,JSON.stringify(updated));
return updated;
});
}

function updateCurrentQuestion(field,value){
if(!currentQuestion)return;
setQuestions(previous=>previous.map(question=>
question.id===currentQuestion.id
?{
...question,
[field]:value,
verified:false,
needsReview:true
}
:question
));
}

function updateOption(index,value){
if(!currentQuestion)return;
const options=[...currentQuestion.options];
options[index]=value;
updateCurrentQuestion("options",options);
}

function applyExtraction(questionId,extracted){
const candidate={
questionType:extracted.questionType||"text",
diagramRequired:Boolean(extracted.diagramRequired),
optionsAreImages:Boolean(extracted.optionsAreImages),
questionText:extracted.questionText||"",
options:normalizeOptions(extracted.options),
correctAnswer:String(extracted.correctAnswer||""),
explanation:extracted.explanation||""
};

const validation=validateQuestion(candidate);

updateQuestionsAndSave(previous=>previous.map(question=>
question.id===questionId
?{
...question,
...validation.question,
options:normalizeOptions(validation.question.options),
questionType:candidate.questionType,
diagramRequired:candidate.diagramRequired,
optionsAreImages:candidate.optionsAreImages,
verified:false,
needsReview:true,
validationErrors:validation.errors,
extractionStatus:"completed"
}
:question
));

if(validation.needsReview){
addLog(
`Question ${questions.find(question=>question.id===questionId)?.questionNo||questionId} extracted with validation issues: ${validation.errors.join(", ")}`,
"warning"
);
}
}

function applyExtractionFailure(questionId){
updateQuestionsAndSave(previous=>previous.map(question=>
question.id===questionId
?{
...question,
verified:false,
needsReview:true,
extractionStatus:"failed"
}
:question
));
}

async function runBatchExtraction(){
if(workerRunningRef.current)return;
workerRunningRef.current=true;

try{
while(extractionQueue.isRunning()){
const item=getNextPending();

if(item){
addLog(`Starting Question ${item.questionNo||item.id}`,"info");
}

if(!item){
pauseExtractionQueue();
showMessage("Batch extraction completed");
break;
}

markExtracting(item.id);
setMessage(`Extracting Question ${item.questionNo||item.id}...`);

try{
const imageUrl=getImageUrl(item.questionImage);
const extracted=await extractQuestionWithGemini(imageUrl);
applyExtraction(item.id,extracted);
markCompleted(item.id);
addLog(`Question ${item.questionNo||item.id} extracted successfully`,"success");
setMessage(`Question ${item.questionNo||item.id} completed`);
}catch(error){
applyExtractionFailure(item.id);
markFailed(item.id);
addLog(
`Question ${item.questionNo||item.id} failed: ${error.message||"Unknown error"}`,
"error"
);
setMessage(`Question ${item.questionNo||item.id} failed`);
console.error(`Question ${item.questionNo||item.id}:`,error);
}

if(extractionQueue.isRunning()&&extractionQueue.hasPending()){
await delay(REQUEST_DELAY);
}
}
}finally{
workerRunningRef.current=false;
}
}

function startBatchExtraction(){
startExtractionQueue();
window.setTimeout(runBatchExtraction,0);
}

function resumeBatchExtraction(){
resumeExtractionQueue();
window.setTimeout(runBatchExtraction,0);
}

function retryFailedQuestions(){
retryFailed();
resumeExtractionQueue();
addLog("Retrying failed questions","info");
window.setTimeout(runBatchExtraction,0);
}

function pauseBatchExtraction(){
pauseExtractionQueue();
showMessage("Batch extraction paused");
}

function stopBatchExtraction(){
stopExtractionQueue();
showMessage("Batch extraction stopped");
}

async function extractWithGemini(){
if(!currentQuestion||extracting)return;

try{
setExtracting(true);
setMessage("Gemini is reading the question...");
const imageUrl=getImageUrl(currentQuestion.questionImage);
const extracted=await extractQuestionWithGemini(imageUrl);
applyExtraction(currentQuestion.id,extracted);
markCompleted(currentQuestion.id);
addLog(`Question ${currentQuestion.questionNo||currentQuestion.id} extracted manually`,"success");
showMessage(`Question ${currentQuestion.questionNo||currentQuestion.id} extracted successfully`);
}catch(error){
applyExtractionFailure(currentQuestion.id);
markFailed(currentQuestion.id);
showMessage(error.message||"Gemini extraction failed");
addLog(
`Question ${currentQuestion.questionNo||currentQuestion.id} failed: ${error.message||"Unknown error"}`,
"error"
);
}finally{
setExtracting(false);
}
}

function saveProgress(){
if(!currentQuestion)return;

const validation=validateQuestion(currentQuestion);
const questionNumber=currentQuestion.questionNo||currentQuestion.id;

updateQuestionsAndSave(previous=>previous.map(question=>
question.id===currentQuestion.id
?{
...question,
...validation.question,
options:normalizeOptions(validation.question.options),
verified:false,
needsReview:validation.needsReview,
validationErrors:validation.errors
}
:question
));

if(validation.needsReview){
addLog(
`Question ${questionNumber} saved for manual review: ${validation.errors.join(", ")}`,
"warning"
);
showMessage(`Saved with ${validation.errors.length} validation issue${validation.errors.length===1?"":"s"}`);
}else{
addLog(`Question ${questionNumber} validated and saved`,"success");
showMessage(`Question ${questionNumber} validated and saved`);
}
}

function markVerified(){
if(!currentQuestion)return;

const validation=validateQuestion(currentQuestion);
const questionNumber=currentQuestion.questionNo||currentQuestion.id;

if(validation.needsReview){
updateQuestionsAndSave(previous=>previous.map(question=>
question.id===currentQuestion.id
?{
...question,
...validation.question,
options:normalizeOptions(validation.question.options),
verified:false,
needsReview:true,
validationErrors:validation.errors
}
:question
));

addLog(
`Question ${questionNumber} could not be verified: ${validation.errors.join(", ")}`,
"error"
);
showMessage(`Fix validation issues before verifying`);
return;
}

updateQuestionsAndSave(previous=>previous.map(question=>
question.id===currentQuestion.id
?{
...question,
...validation.question,
options:normalizeOptions(validation.question.options),
verified:true,
needsReview:false,
validationErrors:[],
extractionStatus:"completed"
}
:question
));

markCompleted(currentQuestion.id);
addLog(`Question ${questionNumber} verified successfully`,"success");
showMessage(`Question ${questionNumber} verified`);
}

function previousQuestion(){
setCurrentIndex(index=>Math.max(0,index-1));
}

function nextQuestion(){
setCurrentIndex(index=>Math.min(filteredQuestions.length-1,index+1));
}

function downloadDataset(){
const blob=new Blob([JSON.stringify(questions,null,2)],{
type:"application/json"
});
const url=URL.createObjectURL(blob);
const link=document.createElement("a");
link.href=url;
link.download="verified-question-dataset.json";
document.body.appendChild(link);
link.click();
link.remove();
URL.revokeObjectURL(url);
}

useEffect(()=>{
function handleKeyDown(event){
const tagName=event.target.tagName;

if(
tagName==="INPUT"||
tagName==="TEXTAREA"||
tagName==="SELECT"
)return;

switch(event.key){
case "ArrowLeft":
event.preventDefault();
previousQuestion();
break;
case "ArrowRight":
event.preventDefault();
nextQuestion();
break;
case "v":
case "V":
markVerified();
break;
case "s":
case "S":
event.preventDefault();
saveProgress();
break;
default:
break;
}
}

window.addEventListener("keydown",handleKeyDown);
return()=>window.removeEventListener("keydown",handleKeyDown);
},[currentIndex,filteredQuestions,questions,currentQuestion]);

if(loading){
return(
<div className="flex min-h-[70vh] items-center justify-center text-zinc-300">
Loading PYQ dataset...
</div>
);
}

if(!questions.length){
return(
<div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
<h1 className="text-xl font-semibold">PYQ dataset could not be loaded</h1>
<p className="mt-2 text-sm">
{message||`Missing file: ${DATA_URL}`}
</p>
</div>
);
}

return(
<div className="space-y-5">
<div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 xl:flex-row xl:items-center xl:justify-between">
<div>
<h1 className="text-2xl font-bold text-white">PYQ AI Review</h1>
<p className="mt-1 text-sm text-zinc-400">
Extract with Gemini, validate the result and verify every question.
</p>
<p className="mt-1 text-xs text-zinc-500">
Shortcuts: ← Previous · → Next · V Verify · S Save
</p>
</div>

<div className="flex flex-wrap gap-2">
<select
value={filter}
onChange={event=>{
setFilter(event.target.value);
setCurrentIndex(0);
}}
className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
>
<option value="review">Needs review</option>
<option value="unverified">Unverified</option>
<option value="verified">Verified</option>
<option value="all">All questions</option>
</select>

<button
type="button"
onClick={downloadDataset}
className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
>
Download JSON
</button>
</div>
</div>

<AIProgressCard
stats={extractionStats}
isRunning={extractionRunning}
current={extractionCurrent}
onStart={startBatchExtraction}
onPause={pauseBatchExtraction}
onResume={resumeBatchExtraction}
onStop={stopBatchExtraction}
onRetryFailed={retryFailedQuestions}
/>

<ExtractionLog logs={logs}/>

<div className="grid gap-5 xl:grid-cols-[1.15fr_1fr]">
<section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
{currentQuestion?(
<>
<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
<div>
<h2 className="font-semibold text-white">
Question {currentQuestion.questionNo||currentQuestion.id}
</h2>
<p className="text-sm text-zinc-400">
Page {currentQuestion.page||"—"} · {currentQuestion.subject||"Unknown subject"}
</p>
</div>

<span className={`rounded-full px-3 py-1 text-xs font-semibold ${
currentQuestion.verified
?"bg-emerald-500/15 text-emerald-300"
:currentQuestion.validationErrors?.length
?"bg-red-500/15 text-red-300"
:"bg-amber-500/15 text-amber-300"
}`}>
{currentQuestion.verified
?"Verified"
:currentQuestion.validationErrors?.length
?`${currentQuestion.validationErrors.length} validation issue${currentQuestion.validationErrors.length===1?"":"s"}`
:"Needs review"}
</span>
</div>

<div className="overflow-auto rounded-xl bg-white p-2">
<img
src={getImageUrl(currentQuestion.questionImage)}
alt={`Question ${currentQuestion.questionNo||currentQuestion.id}`}
onClick={()=>setImageZoomed(value=>!value)}
className="mx-auto h-auto max-w-none transition-all duration-200"
style={{
width:imageZoomed?"220%":"170%",
cursor:imageZoomed?"zoom-out":"zoom-in"
}}
/>
</div>

<div className="mt-4 grid grid-cols-2 gap-3 text-sm">
<div className="rounded-lg bg-zinc-950 p-3">
<p className="text-zinc-500">Question ID</p>
<p className="mt-1 text-white">
{currentQuestion.questionId||currentQuestion.id||"Not found"}
</p>
</div>

<div className="rounded-lg bg-zinc-950 p-3">
<p className="text-zinc-500">Chosen option</p>
<p className="mt-1 text-white">
{currentQuestion.chosenOption||"Not answered"}
</p>
</div>

<div className="rounded-lg bg-zinc-950 p-3">
<p className="text-zinc-500">OCR confidence</p>
<p className="mt-1 text-white">
{currentQuestion.ocrConfidence??0}%
</p>
</div>

<div className="rounded-lg bg-zinc-950 p-3">
<p className="text-zinc-500">Position</p>
<p className="mt-1 text-white">
{currentIndex+1} / {filteredQuestions.length}
</p>
</div>
</div>
</>
):(
<div className="flex min-h-96 items-center justify-center text-zinc-400">
No questions match this filter.
</div>
)}
</section>

<section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
{currentQuestion&&(
<div className="space-y-4">
<button
type="button"
onClick={extractWithGemini}
disabled={extracting||extractionRunning}
className="w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
>
{extracting?"Extracting with Gemini...":"Extract with Gemini"}
</button>

{currentQuestion.validationErrors?.length>0&&(
<div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
<p className="text-sm font-semibold text-red-300">
Validation issues
</p>
<ul className="mt-2 space-y-1 text-sm text-red-200">
{currentQuestion.validationErrors.map((error,index)=>(
<li key={`${error}-${index}`}>• {error}</li>
))}
</ul>
</div>
)}

<div>
<label className="mb-2 block text-sm font-medium text-zinc-300">
Question text
</label>
<textarea
value={currentQuestion.questionText}
onChange={event=>updateCurrentQuestion("questionText",event.target.value)}
rows={7}
className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm text-white outline-none focus:border-blue-500"
/>
</div>

<div className="space-y-3">
<p className="text-sm font-medium text-zinc-300">Options</p>

{currentQuestion.options.map((option,index)=>(
<div key={index} className="flex items-center gap-3">
<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm font-semibold text-white">
{index+1}
</span>
<input
value={option}
onChange={event=>updateOption(index,event.target.value)}
className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
/>
</div>
))}
</div>

<div>
<label className="mb-2 block text-sm font-medium text-zinc-300">
Correct answer
</label>
<select
value={currentQuestion.correctAnswer}
onChange={event=>updateCurrentQuestion("correctAnswer",event.target.value)}
className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none"
>
<option value="">Select correct option</option>
<option value="1">Option 1</option>
<option value="2">Option 2</option>
<option value="3">Option 3</option>
<option value="4">Option 4</option>
</select>
</div>

<div>
<label className="mb-2 block text-sm font-medium text-zinc-300">
Explanation
</label>
<textarea
value={currentQuestion.explanation}
onChange={event=>updateCurrentQuestion("explanation",event.target.value)}
rows={4}
className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm text-white outline-none focus:border-blue-500"
/>
</div>

<div className="grid grid-cols-2 gap-3">
<button
type="button"
onClick={saveProgress}
className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
>
Save Progress
</button>

<button
type="button"
onClick={markVerified}
disabled={currentQuestion.verified}
className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
>
{currentQuestion.verified?"Verified":"Validate & Verify"}
</button>
</div>
</div>
)}
</section>
</div>

<div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
<button
type="button"
onClick={previousQuestion}
disabled={!filteredQuestions.length||currentIndex===0}
className="rounded-lg bg-zinc-800 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
>
Previous
</button>

<p className="text-sm text-zinc-400">
{message||`${questions.filter(question=>question.verified).length} of ${questions.length} verified`}
</p>

<button
type="button"
onClick={nextQuestion}
disabled={!filteredQuestions.length||currentIndex===filteredQuestions.length-1}
className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
>
Next
</button>
</div>
</div>
);
}