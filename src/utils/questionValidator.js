export function validateQuestion(question={}){
const errors=[];
const questionText=String(question.questionText||"").trim();
const options=Array.isArray(question.options)?question.options:[];
const correctAnswer=String(question.correctAnswer||"").trim();
const explanation=String(question.explanation||"").trim();

if(!questionText){
errors.push("Question text is missing");
}

if(questionText.length<10){
errors.push("Question text is too short");
}

if(options.length!==4){
errors.push("Question must contain exactly 4 options");
}

options.forEach((option,index)=>{
if(!String(option||"").trim()){
errors.push(`Option ${index+1} is empty`);
}
});

const normalizedOptions=options.map(option=>
String(option||"").trim().toLowerCase()
);

if(new Set(normalizedOptions.filter(Boolean)).size!==normalizedOptions.filter(Boolean).length){
errors.push("Duplicate options detected");
}

if(!["1","2","3","4"].includes(correctAnswer)){
errors.push("Correct answer is invalid");
}

return{
isValid:errors.length===0,
needsReview:errors.length>0,
errors,
question:{
...question,
questionText,
options:options.map(option=>String(option||"").trim()).slice(0,4),
correctAnswer,
explanation
}
};
}