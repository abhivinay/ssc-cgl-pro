import{retry}from"../utils/retry";
const ENDPOINT="http://localhost:5000/api/extract-pdf";
export async function extractPdfWithGemini(file,{signal,fileName,onProgress}={}){
if(!(file instanceof Blob)){
const error=new Error("Valid PDF file required");
error.code="INVALID_PDF";
error.retryable=false;
throw error;
}
if(signal?.aborted)throw createAbortError();
onProgress?.(10);
const base64=await blobToBase64(file,signal);
onProgress?.(25);
const result=await retry(
()=>sendPdfRequest({
base64,
mimeType:file.type||"application/pdf",
fileName:fileName||file.name||"document.pdf",
signal,
onProgress
}),
{
maxAttempts:3,
initialDelay:5000,
factor:2,
shouldRetry:error=>error.name!=="AbortError"&&error.retryable!==false,
getDelay:error=>{
const retryAfter=Number(error.retryAfter||0);
return retryAfter>0?retryAfter*1000:null;
}
}
);
onProgress?.(100);
return normalizeResult(result);
}
export async function extractPdfBatch(files,{signal,onProgress,onFileProgress}={}){
const source=Array.from(files||[]);
const results=[];
for(let index=0;index<source.length;index+=1){
if(signal?.aborted)throw createAbortError();
const file=source[index];
try{
const result=await extractPdfWithGemini(file,{
signal,
fileName:file.name,
onProgress:value=>onFileProgress?.({
file,
index,
progress:value
})
});
results.push({
fileName:file.name,
success:true,
...result
});
}catch(error){
if(error.name==="AbortError")throw error;
results.push({
fileName:file.name,
success:false,
text:"",
pages:[],
error:error.message
});
}
onProgress?.(Math.round(((index+1)/source.length)*100));
}
return results;
}
async function sendPdfRequest({
base64,
mimeType,
fileName,
signal,
onProgress
}){
let response;
try{
onProgress?.(40);
response=await fetch(ENDPOINT,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
pdfBase64:base64,
mimeType,
fileName
}),
signal
});
}catch(error){
if(error.name==="AbortError")throw error;
const connectionError=new Error("Unable to connect to the Gemini PDF extraction server");
connectionError.status=0;
connectionError.code="SERVER_UNREACHABLE";
connectionError.retryable=true;
connectionError.retryAfter=5;
throw connectionError;
}
onProgress?.(75);
let data={};
try{
data=await response.json();
}catch{
data={};
}
if(!response.ok){
const retryAfterHeader=Number(response.headers.get("Retry-After")||0);
const error=new Error(data.error||"Gemini PDF extraction failed");
error.status=response.status;
error.code=data.code||"GEMINI_PDF_EXTRACTION_FAILED";
error.retryable=data.retryable!==false;
error.retryAfter=Number(data.retryAfter||retryAfterHeader||0);
error.quotaType=data.quotaType||null;
throw error;
}
onProgress?.(90);
return data;
}
function normalizeResult(data){
const pages=Array.isArray(data?.pages)?data.pages.map((page,index)=>({
pageNumber:Number(page.pageNumber)||index+1,
text:String(page.text||"").trim()
})):[];
const text=String(data?.text||pages.map(page=>page.text).join("\n\n")).trim();
return{
text,
pages,
metadata:{
fileName:data?.metadata?.fileName||null,
pageCount:Number(data?.metadata?.pageCount)||pages.length,
model:data?.metadata?.model||null,
extractedAt:data?.metadata?.extractedAt||new Date().toISOString()
}
};
}
function blobToBase64(blob,signal){
return new Promise((resolve,reject)=>{
if(signal?.aborted){
reject(createAbortError());
return;
}
const reader=new FileReader();
const abortHandler=()=>{
reader.abort();
reject(createAbortError());
};
signal?.addEventListener("abort",abortHandler,{once:true});
reader.onloadend=()=>{
signal?.removeEventListener("abort",abortHandler);
const result=String(reader.result||"");
const base64=result.includes(",")?result.split(",")[1]:"";
if(!base64){
const error=new Error("Unable to convert PDF");
error.code="PDF_CONVERSION_FAILED";
error.retryable=false;
reject(error);
return;
}
resolve(base64);
};
reader.onerror=()=>{
signal?.removeEventListener("abort",abortHandler);
const error=new Error("Unable to read PDF");
error.code="PDF_READ_FAILED";
error.retryable=false;
reject(error);
};
reader.onabort=()=>{
signal?.removeEventListener("abort",abortHandler);
reject(createAbortError());
};
reader.readAsDataURL(blob);
});
}
function createAbortError(){
const error=new Error("Extraction cancelled");
error.name="AbortError";
error.code="EXTRACTION_CANCELLED";
error.retryable=false;
return error;
}