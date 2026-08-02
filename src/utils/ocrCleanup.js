export function cleanupQuestion(text=""){
return text
.replace(/\r/g," ")
.replace(/\n+/g,"\n")
.replace(/[ \t]+/g," ")
.replace(/\s+([,.;:!?])/g,"$1")
.replace(/([([{])\s+/g,"$1")
.replace(/\s+([)\]}])/g,"$1")
.replace(/_{2,}/g,"_____")
.replace(/\s{2,}/g," ")
.trim();
}

export function cleanupOptions(options=[]){
const cleaned=options
.map(option=>
(option||"")
.replace(/\r/g," ")
.replace(/\n+/g," ")
.replace(/[ \t]+/g," ")
.trim()
)
.slice(0,4);

while(cleaned.length<4){
cleaned.push("");
}

return cleaned;
}

export function validateAnswer(answer){
const value=String(answer||"").trim();
return["1","2","3","4"].includes(value)?value:"";
}

export function postProcessExtraction(extracted={}){
const questionType=["text","mixed","diagram"].includes(extracted.questionType)
?extracted.questionType
:"text";

const optionsAreImages=Boolean(extracted.optionsAreImages);
const diagramRequired=Boolean(extracted.diagramRequired)||questionType!=="text";

return{
questionType,
diagramRequired,
optionsAreImages,
questionText:cleanupQuestion(extracted.questionText),
options:optionsAreImages?["","","",""]:cleanupOptions(extracted.options),
correctAnswer:validateAnswer(extracted.correctAnswer),
explanation:cleanupQuestion(extracted.explanation)
};
}