import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {GoogleGenAI} from "@google/genai";

dotenv.config();

const app=express();
const PORT=5000;

app.use(cors());
app.use(express.json({limit:"20mb"}));

if(!process.env.GEMINI_API_KEY){
console.error("Missing GEMINI_API_KEY in .env");
process.exit(1);
}

const ai=new GoogleGenAI({
apiKey:process.env.GEMINI_API_KEY
});

app.get("/",(req,res)=>{
res.send("Gemini Server Running");
});

function parseGeminiError(error){
const rawMessage=String(error?.message||"Gemini extraction failed");
const status=Number(error?.status||error?.code||500);
const retryMatch=rawMessage.match(/retry(?:Delay| in)?["':\s]+(\d+(?:\.\d+)?)s/i);
const retryAfter=retryMatch?Math.ceil(Number(retryMatch[1])):null;

if(
status===429||
rawMessage.includes("429")||
rawMessage.includes("RESOURCE_EXHAUSTED")||
rawMessage.toLowerCase().includes("quota exceeded")
){
const dailyQuotaExceeded=
rawMessage.includes("GenerateRequestsPerDay")||
rawMessage.includes("requests per day")||
rawMessage.includes("free_tier_requests");

return{
status:429,
body:{
error:dailyQuotaExceeded
?"Gemini daily quota exceeded. Wait until the quota resets or enable billing."
:"Gemini rate limit reached. Please wait before retrying.",
code:"GEMINI_QUOTA_EXCEEDED",
retryable:!dailyQuotaExceeded,
quotaType:dailyQuotaExceeded?"daily":"temporary",
retryAfter
}
};
}

if(status===400||rawMessage.includes("INVALID_ARGUMENT")){
return{
status:400,
body:{
error:"Gemini rejected the image or request.",
code:"INVALID_REQUEST",
retryable:false,
retryAfter:null
}
};
}

if(status===401||status===403||rawMessage.includes("PERMISSION_DENIED")){
return{
status:403,
body:{
error:"Gemini API key is invalid or does not have permission.",
code:"GEMINI_PERMISSION_DENIED",
retryable:false,
retryAfter:null
}
};
}

if(status===404||rawMessage.includes("NOT_FOUND")){
return{
status:404,
body:{
error:"The selected Gemini model is unavailable.",
code:"GEMINI_MODEL_NOT_FOUND",
retryable:false,
retryAfter:null
}
};
}

if(status===503||rawMessage.includes("UNAVAILABLE")){
return{
status:503,
body:{
error:"Gemini is temporarily unavailable. Please try again later.",
code:"GEMINI_UNAVAILABLE",
retryable:true,
retryAfter:retryAfter||10
}
};
}

return{
status:500,
body:{
error:"Gemini extraction failed.",
code:"GEMINI_EXTRACTION_FAILED",
retryable:true,
retryAfter:null
}
};
}

app.post("/api/extract-question",async(req,res)=>{
try{
const{imageBase64,mimeType}=req.body;

if(!imageBase64){
return res.status(400).json({
error:"Question image is required",
code:"IMAGE_REQUIRED",
retryable:false,
retryAfter:null
});
}

const response=await ai.models.generateContent({
model:"gemini-3.6-flash",
contents:[
{
role:"user",
parts:[
{
text:`Analyze this SSC examination question image.

First classify the question into exactly one type:

"text" = the question and all options are readable text.
"mixed" = the question contains text and one or more important diagrams.
"diagram" = the question or answer options mainly consist of figures, shapes, symbols, patterns, mirror images, paper folding, embedded figures, cubes, dice or visual arrangements.

Return only valid JSON in this exact format:

{
  "questionType": "text",
  "diagramRequired": false,
  "optionsAreImages": false,
  "questionText": "",
  "options": ["", "", "", ""],
  "correctAnswer": "",
  "explanation": ""
}

Rules:
- Extract only clearly readable text.
- Never convert diagrams, shapes or visual options into random letters or symbols.
- For text questions, extract exactly four textual options.
- For mixed questions, extract the readable question text and textual options only.
- For diagram questions with visual options, return four empty option strings.
- Set diagramRequired to true when a diagram is necessary to solve the question.
- Set optionsAreImages to true when answer options are figures or diagrams.
- correctAnswer must be "1", "2", "3", "4" or an empty string.
- Use a visibly marked answer only when clearly identifiable.
- Do not guess unreadable content.
- Do not include markdown or code fences.
- Do not include anything outside the JSON.`
},
{
inlineData:{
mimeType:mimeType||"image/png",
data:imageBase64
}
}
]
}
]
});

const text=String(response.text||"").trim();

const cleanedText=text
.replace(/^```json\s*/i,"")
.replace(/^```\s*/,"")
.replace(/\s*```$/,"")
.trim();

let extracted;

try{
extracted=JSON.parse(cleanedText);
}catch{
return res.status(422).json({
error:"Gemini returned invalid JSON. Manual review is required.",
code:"INVALID_GEMINI_JSON",
retryable:true,
retryAfter:null
});
}

const allowedTypes=["text","mixed","diagram"];
const questionType=allowedTypes.includes(extracted.questionType)
?extracted.questionType
:"text";

const diagramRequired=
questionType!=="text"||
Boolean(extracted.diagramRequired);

const optionsAreImages=
questionType==="diagram"||
Boolean(extracted.optionsAreImages);

let options=Array.isArray(extracted.options)
?extracted.options.slice(0,4).map(option=>String(option||"").trim())
:["","","",""];

while(options.length<4){
options.push("");
}

if(optionsAreImages){
options=["","","",""];
}

return res.json({
questionType,
diagramRequired,
optionsAreImages,
questionText:String(extracted.questionText||"").trim(),
options,
correctAnswer:String(extracted.correctAnswer||"").trim(),
explanation:String(extracted.explanation||"").trim()
});
}catch(error){
const parsed=parseGeminiError(error);

console.error({
status:parsed.status,
code:parsed.body.code,
message:error?.message||"Unknown Gemini error"
});

if(parsed.body.retryAfter){
res.set("Retry-After",String(parsed.body.retryAfter));
}

return res.status(parsed.status).json(parsed.body);
}
});

app.use((error,req,res,next)=>{
console.error("Server error:",error);

if(error?.type==="entity.too.large"){
return res.status(413).json({
error:"Question image is too large.",
code:"IMAGE_TOO_LARGE",
retryable:false,
retryAfter:null
});
}

return res.status(500).json({
error:"Unexpected server error.",
code:"SERVER_ERROR",
retryable:true,
retryAfter:null
});
});

app.listen(PORT,()=>{
console.log(`Server running on http://localhost:${PORT}`);
});