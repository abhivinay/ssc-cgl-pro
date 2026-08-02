import questionBank from "../data/questionBank";

const normalize=value=>String(value||"").trim().toLowerCase();

const shuffle=array=>{
const items=[...array];
for(let i=items.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[items[i],items[j]]=[items[j],items[i]];
}
return items;
};

export const filterQuestions=(filters={})=>{
return questionBank.filter(question=>{
if(filters.subject&&normalize(question.subject)!==normalize(filters.subject))return false;
if(filters.topic&&normalize(question.topic)!==normalize(filters.topic))return false;
if(filters.subtopic&&normalize(question.subtopic)!==normalize(filters.subtopic))return false;
if(filters.level&&question.level!==Number(filters.level))return false;
if(filters.difficulty&&normalize(question.difficulty)!==normalize(filters.difficulty))return false;
if(filters.sourceType&&normalize(question.sourceType)!==normalize(filters.sourceType))return false;
if(filters.year&&question.year!==filters.year)return false;
if(filters.exam&&normalize(question.exam)!==normalize(filters.exam))return false;
return true;
});
};

export const buildTest=(filters={},count=10,random=true)=>{
const questions=filterQuestions(filters);
const selected=random?shuffle(questions).slice(0,count):questions.slice(0,count);
return{
id:`generated-${Date.now()}`,
title:filters.topic||"Generated Test",
questions:selected,
totalQuestions:selected.length,
duration:selected.length,
generated:true
};
};

export const buildTopicTest=(topic,level,count=10)=>
buildTest({topic,level},count);

export const buildPyqTest=(topic,year,count=10)=>
buildTest({topic,year,sourceType:"verified-pyq"},count);

export const buildSubjectTest=(subject,count=25)=>
buildTest({subject},count);

export default buildTest;