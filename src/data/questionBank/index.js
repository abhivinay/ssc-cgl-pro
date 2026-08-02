import classificationQuestions from "./reasoning/classificationQuestions.json";

const questionBank=[
...classificationQuestions
];

const normalize=value=>String(value||"").trim().toLowerCase();

export const getAllQuestions=()=>questionBank;

export const getQuestionById=id=>
questionBank.find(question=>question.id===id)||null;

export const getQuestionsByIds=ids=>{
const idSet=new Set(ids);
return questionBank
.filter(question=>idSet.has(question.id))
.sort((a,b)=>ids.indexOf(a.id)-ids.indexOf(b.id));
};

export const getQuestionsByTopic=topic=>
questionBank.filter(question=>normalize(question.topic)===normalize(topic));

export const getQuestionsBySubject=subject=>
questionBank.filter(question=>normalize(question.subject)===normalize(subject));

export const getQuestionsByLevel=level=>
questionBank.filter(question=>question.level===Number(level));

export const getVerifiedPyqs=()=>
questionBank.filter(question=>question.isVerifiedPyq);

export default questionBank;