import express from"express";
import cors from"cors";
import dotenv from"dotenv";
import{GoogleGenAI}from"@google/genai";
dotenv.config();
const app=express();
const PORT=5000;
const MODEL="gemini-3.6-flash";
const TOPICS={
"Reasoning":[
"Analogy","Classification","Coding-Decoding","Blood Relation","Direction & Distance","Ranking","Alphabet Series","Number Series","Missing Number","Mathematical Operations","Syllogism","Statement & Conclusion","Statement & Assumption","Seating Arrangement","Venn Diagram","Calendar","Clock","Dice","Cube","Mirror Image","Water Image","Paper Folding","Paper Cutting","Embedded Figure","Figure Completion","Counting Figures","Non-Verbal Reasoning"
],
"Quant":[
"Number System","Simplification","LCM & HCF","Percentage","Ratio & Proportion","Average","Profit & Loss","Discount","Simple Interest","Compound Interest","Partnership","Mixture & Alligation","Time & Work","Pipes & Cisterns","Time Speed Distance","Boats & Streams","Trains","Ages","Algebra","Geometry","Mensuration","Trigonometry","Height & Distance","Data Interpretation","Statistics"
],
"English":[
"Error Spotting","Fill in the Blanks","Sentence Improvement","Sentence Rearrangement","Active Passive Voice","Direct & Indirect Speech","One Word Substitution","Idioms & Phrases","Synonyms","Antonyms","Spelling Correction","Cloze Test","Reading Comprehension","Vocabulary","Grammar"
],
"General Awareness":[
"History","Geography","Polity","Economy","Biology","Physics","Chemistry","Environment","Computer","Current Affairs","Art & Culture","Sports","Books & Authors","Awards & Honours","Important Days","Government Schemes","Science & Technology","Static GK"
]
};
app.use(cors());
app.use(express.json({limit:"75mb"}));
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
error:"Gemini rejected the file or request.",
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
function cleanModelText(value){
return String(value||"")
.replace(/^```(?:json|text|markdown)?\s*/i,"")
.replace(/\s*```$/,"")
.trim();
}
function extractJson(value){
const cleaned=cleanModelText(value);
const firstBrace=cleaned.indexOf("{");
const lastBrace=cleaned.lastIndexOf("}");
if(firstBrace===-1||lastBrace===-1||lastBrace<=firstBrace){
throw new Error("Gemini response does not contain valid JSON");
}
return JSON.parse(cleaned.slice(firstBrace,lastBrace+1));
}
function sendParsedError(res,error){
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
function normalizeDate(value){
const text=String(value||"").trim();
if(!text)return"";
const match=text.match(/(\d{1,2})[\/\-. ](\d{1,2})[\/\-. ](\d{4})/);
if(!match)return text;
const day=match[1].padStart(2,"0");
const month=match[2].padStart(2,"0");
return`${match[3]}-${month}-${day}`;
}
function normalizeSubject(value,number){
const text=String(value||"").trim().toLowerCase();
if(text.includes("reason"))return"Reasoning";
if(text.includes("quant")||text.includes("math"))return"Quant";
if(text.includes("english"))return"English";
if(text.includes("general awareness")||text.includes("general knowledge")||text==="ga")return"General Awareness";
if(number>=1&&number<=25)return"Reasoning";
if(number>=26&&number<=50)return"General Awareness";
if(number>=51&&number<=75)return"Quant";
if(number>=76&&number<=100)return"English";
return"General Awareness";
}
function normalizeTopic(subject,value){
const requested=String(value||"").trim();
const allowed=TOPICS[subject]||[];
const exact=allowed.find(topic=>topic.toLowerCase()===requested.toLowerCase());
return exact||"";
}
function normalizeOptions(value){
const options=Array.isArray(value)
?value.slice(0,4).map(option=>String(option||"").trim())
:["","","",""];
while(options.length<4){
options.push("");
}
return options;
}
function normalizeCorrectOption(value){
const number=Number(value);
return[1,2,3,4].includes(number)?number:null;
}
function normalizeConfidence(value){
const number=Number(value);
if(!Number.isFinite(number))return 0;
return Math.max(0,Math.min(1,number));
}
function normalizePaperExtraction(data,fileName){
const paperData=data?.paper&&typeof data.paper==="object"?data.paper:{};
const rawQuestions=Array.isArray(data?.questions)?data.questions:[];
const paper={
exam:String(paperData.exam||"SSC CGL").trim(),
tier:String(paperData.tier||"Tier 1").trim(),
year:Number(paperData.year)||null,
date:normalizeDate(paperData.date),
shift:String(paperData.shift||"").trim(),
fileName
};
const questions=rawQuestions.map((item,index)=>{
const number=Number(item?.number)||index+1;
const subject=normalizeSubject(item?.subject,number);
const options=normalizeOptions(item?.options);
const correctOption=normalizeCorrectOption(item?.correctOption);
const confidence=normalizeConfidence(item?.confidence);
const diagramRequired=Boolean(item?.diagramRequired);
const question=String(item?.question||"").trim();
const topic=normalizeTopic(subject,item?.topic);
const missingQuestion=!question;
const missingOptions=options.some(option=>!option);
const missingAnswer=correctOption===null;
const lowConfidence=confidence<0.85;
const flagged=
missingQuestion||
missingOptions||
missingAnswer||
lowConfidence||
diagramRequired||
!topic;
return{
id:`${paper.year||"unknown"}-${paper.shift||"shift"}-${number}`,
number,
subject,
topic,
question,
options,
correctOption,
diagramRequired,
confidence,
reviewStatus:flagged?"pending":"approved",
flags:{
missingQuestion,
missingOptions,
missingAnswer,
lowConfidence,
topicUncertain:!topic,
diagramRequired
},
source:{
paper:fileName,
questionNumber:number,
page:Number(item?.page)||null
}
};
}).filter(question=>question.question||question.options.some(Boolean));
return{
paper,
questions,
stats:{
total:questions.length,
approved:questions.filter(question=>question.reviewStatus==="approved").length,
pending:questions.filter(question=>question.reviewStatus==="pending").length,
diagramQuestions:questions.filter(question=>question.diagramRequired).length,
missingAnswers:questions.filter(question=>question.flags.missingAnswer).length
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
model:MODEL,
contents:[
{
role:"user",
parts:[
{
text:`Analyze this SSC examination question image.
Return only valid JSON:
{
"questionType":"text",
"diagramRequired":false,
"optionsAreImages":false,
"questionText":"",
"options":["","","",""],
"correctAnswer":"",
"explanation":""
}
Rules:
- Extract only clearly readable English text.
- Ignore Hindi completely.
- Never translate Hindi.
- Never convert diagrams into random text.
- For diagram options return four empty strings.
- correctAnswer must be "1","2","3","4" or empty.
- Do not guess.
- Do not include markdown.`
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
let extracted;
try{
extracted=extractJson(response.text);
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
const diagramRequired=questionType!=="text"||Boolean(extracted.diagramRequired);
const optionsAreImages=questionType==="diagram"||Boolean(extracted.optionsAreImages);
let options=normalizeOptions(extracted.options);
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
return sendParsedError(res,error);
}
});
app.post("/api/extract-pdf",async(req,res)=>{
try{
const{
pdfBase64,
mimeType="application/pdf",
fileName="document.pdf"
}=req.body;
if(!pdfBase64){
return res.status(400).json({
error:"PDF file is required",
code:"PDF_REQUIRED",
retryable:false,
retryAfter:null
});
}
if(mimeType!=="application/pdf"){
return res.status(400).json({
error:"Only PDF files are supported",
code:"INVALID_PDF_TYPE",
retryable:false,
retryAfter:null
});
}
const estimatedBytes=Math.ceil((pdfBase64.length*3)/4);
if(estimatedBytes>50*1024*1024){
return res.status(413).json({
error:"PDF exceeds the 50 MB inline-file limit.",
code:"PDF_TOO_LARGE",
retryable:false,
retryAfter:null
});
}
const taxonomy=Object.entries(TOPICS)
.map(([subject,topics])=>`${subject}: ${topics.join(", ")}`)
.join("\n");
const prompt=`Analyze this SSC response-sheet PDF and return structured question data.
File name: ${fileName}
Extract only:
- Exam metadata
- English question text
- Four English options
- Correct option number
- Subject
- One topic from the locked taxonomy
- Source page
Ignore completely:
- Hindi text
- Hindi duplicates
- Candidate details
- Headers and footers
- Challenge buttons
- Grievance instructions
- Login or logout text
- Save or print text
- Candidate-selected wrong option
Rules:
- Process every question in original question-number order.
- If a question appears in Hindi and English, extract English once only.
- Never translate Hindi.
- correctOption means the officially correct option highlighted or marked by the response sheet.
- Do not use the candidate's selected option unless it is also officially correct.
- correctOption must be 1,2,3,4 or null.
- Preserve option order exactly.
- Do not solve questions.
- Do not invent missing text or answers.
- For visual questions set diagramRequired true.
- For visual answer options use "[DIAGRAM_REQUIRED]" for unavailable option text.
- confidence must be between 0 and 1.
- Choose topic only from the locked taxonomy.
- Never invent a new topic name.
Locked taxonomy:
${taxonomy}
Return only valid JSON in this exact structure:
{
"paper":{
"exam":"SSC CGL",
"tier":"Tier 1",
"year":2025,
"date":"2025-09-24",
"shift":"Shift 1"
},
"questions":[
{
"number":1,
"subject":"Reasoning",
"topic":"Analogy",
"question":"English question text",
"options":["Option 1","Option 2","Option 3","Option 4"],
"correctOption":1,
"diagramRequired":false,
"confidence":0.99,
"page":1
}
]
}
Do not include explanations.
Do not include markdown.
Do not include commentary outside JSON.`;
const response=await ai.models.generateContent({
model:MODEL,
contents:[
{
role:"user",
parts:[
{
text:prompt
},
{
inlineData:{
mimeType:"application/pdf",
data:pdfBase64
}
}
]
}
]
});
let extracted;
try{
extracted=extractJson(response.text);
}catch(error){
console.error("Invalid Gemini PDF JSON:",cleanModelText(response.text).slice(0,1000));
return res.status(422).json({
error:"Gemini returned invalid PDF JSON. Retry this paper.",
code:"INVALID_PDF_JSON",
retryable:true,
retryAfter:null
});
}
const normalized=normalizePaperExtraction(extracted,fileName);
if(!normalized.questions.length){
return res.status(422).json({
error:"No valid English questions were extracted.",
code:"NO_QUESTIONS_EXTRACTED",
retryable:true,
retryAfter:null
});
}
return res.json({
...normalized,
text:JSON.stringify(normalized,null,2),
pages:[],
metadata:{
fileName,
pageCount:Math.max(...normalized.questions.map(question=>question.source.page||0),0),
questionCount:normalized.questions.length,
model:MODEL,
extractedAt:new Date().toISOString()
}
});
}catch(error){
return sendParsedError(res,error);
}
});
app.use((error,req,res,next)=>{
console.error("Server error:",error);
if(error?.type==="entity.too.large"){
return res.status(413).json({
error:"Uploaded payload is too large.",
code:"PAYLOAD_TOO_LARGE",
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