import {postProcessExtraction} from "../utils/ocrCleanup";
import {retry} from "../utils/retry";

export async function extractQuestionWithGemini(imageUrl){
return retry(
()=>sendExtractionRequest(imageUrl),
{
maxAttempts:3,
initialDelay:5000,
factor:2,
shouldRetry:error=>error.retryable!==false,
getDelay:error=>{
const retryAfter=Number(error.retryAfter||0);
return retryAfter>0?retryAfter*1000:null;
}
}
);
}

async function sendExtractionRequest(imageUrl){
const response=await fetch(imageUrl);

if(!response.ok){
const error=new Error("Unable to load question image");
error.status=response.status;
error.code="IMAGE_LOAD_FAILED";
error.retryable=false;
error.retryAfter=null;
throw error;
}

const blob=await response.blob();
const base64=await blobToBase64(blob);

let apiResponse;

try{
apiResponse=await fetch("http://localhost:5000/api/extract-question",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
imageBase64:base64,
mimeType:blob.type||"image/png"
})
});
}catch{
const error=new Error("Unable to connect to the Gemini server");
error.status=0;
error.code="SERVER_UNREACHABLE";
error.retryable=true;
error.retryAfter=5;
throw error;
}

let data={};

try{
data=await apiResponse.json();
}catch{
data={};
}

if(!apiResponse.ok){
const retryAfterHeader=Number(apiResponse.headers.get("Retry-After")||0);
const error=new Error(data.error||"Gemini extraction failed");

error.status=apiResponse.status;
error.code=data.code||"GEMINI_EXTRACTION_FAILED";
error.retryable=data.retryable!==false;
error.retryAfter=Number(data.retryAfter||retryAfterHeader||0);
error.quotaType=data.quotaType||null;

throw error;
}

return postProcessExtraction(data);
}

function blobToBase64(blob){
return new Promise((resolve,reject)=>{
const reader=new FileReader();

reader.onloadend=()=>{
const result=String(reader.result||"");
const base64=result.includes(",")?result.split(",")[1]:"";

if(!base64){
const error=new Error("Unable to convert question image");
error.code="IMAGE_CONVERSION_FAILED";
error.retryable=false;
reject(error);
return;
}

resolve(base64);
};

reader.onerror=()=>{
const error=new Error("Unable to convert question image");
error.code="IMAGE_CONVERSION_FAILED";
error.retryable=false;
reject(error);
};

reader.readAsDataURL(blob);
});
}