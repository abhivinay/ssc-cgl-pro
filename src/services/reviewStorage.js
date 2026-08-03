const REVIEW_KEY="ssc-content-review-data";
const EXTRACTION_KEYS=["ssc-content-extraction-output","ssc-gemini-extraction-output","ssc-pdf-json-extraction","ssc-pyq-review-data"];

function readJSON(key){
try{return JSON.parse(localStorage.getItem(key)||"null");}catch{return null;}
}

function text(value){
return String(value??"").trim();
}

function normalizeOptions(value){
const raw=Array.isArray(value)?value:Object.values(value&&typeof value==="object"?value:{});
const options=raw.slice(0,4).map(option=>text(option?.text??option?.value??option));
while(options.length<4)options.push("");
return options;
}

function normalizeAnswer(value,options){
const raw=text(value).toUpperCase();
if(["A","B","C","D"].includes(raw))return raw;
if(["1","2","3","4"].includes(raw))return String.fromCharCode(64+Number(raw));
const index=options.findIndex(option=>option&&option.toLowerCase()===raw.toLowerCase());
return index>=0?String.fromCharCode(65+index):"";
}

export function normalizeReviewQuestion(question,index=0){
const options=normalizeOptions(
question?.options??question?.englishOptions??question?.answerOptions
);
const status=text(question?.reviewStatus??question?.status).toLowerCase();

return{
...question,
id:text(question?.id??question?.questionId)||`review-${Date.now()}-${index}`,
questionText:text(
question?.questionText??
question?.englishQuestion??
question?.question??
question?.ocrText
),
options,
correctAnswer:normalizeAnswer(
question?.correctAnswer??
question?.correctOption??
question?.answer,
options
),
subject:text(question?.subject)||"Unassigned",
topic:text(question?.topic)||"Unassigned",
confidence:Math.max(
0,
Math.min(100,Number(question?.confidence??0)||0)
),
source:text(
question?.source??
question?.fileName??
question?.paper?.title
)||"Unknown source",
reviewStatus:["approved","rejected","pending"].includes(status)
?status
:question?.verified
?"approved"
:"pending",
updatedAt:question?.updatedAt||null
};
}

export function loadReviewQuestions(){
const saved=readJSON(REVIEW_KEY);

if(Array.isArray(saved)){
return saved.map(normalizeReviewQuestion);
}

for(const key of EXTRACTION_KEYS){
const data=readJSON(key);
const questions=Array.isArray(data)
?data
:Array.isArray(data?.questions)
?data.questions
:null;

if(questions){
return questions.map(normalizeReviewQuestion);
}
}

return[];
}

export function saveReviewQuestions(questions){
localStorage.setItem(REVIEW_KEY,JSON.stringify(questions));

window.dispatchEvent(
new CustomEvent("ssc-review-data-updated",{
detail:{count:questions.length}
})
);
}

export const REVIEW_STORAGE_KEY=REVIEW_KEY;