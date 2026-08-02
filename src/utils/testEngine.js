export const formatTestTime=seconds=>{
const safeSeconds=Math.max(0,seconds||0);
const minutes=Math.floor(safeSeconds/60);
const remainingSeconds=safeSeconds%60;
return `${String(minutes).padStart(2,"0")}:${String(remainingSeconds).padStart(2,"0")}`;
};

export const createTestAttempt=test=>({
testId:test.id,
startedAt:new Date().toISOString(),
submittedAt:null,
currentIndex:0,
remainingSeconds:test.durationMinutes*60,
answers:{},
markedForReview:[],
visited:[test.questions[0]?.id].filter(Boolean),
submitted:false,
result:null
});

export const getQuestionStatus=(attempt,questionId,isCurrent=false)=>{
if(isCurrent)return "current";
const answered=Boolean(attempt?.answers?.[questionId]);
const marked=attempt?.markedForReview?.includes(questionId);
if(answered&&marked)return "answered-review";
if(marked)return "review";
if(answered)return "answered";
if(attempt?.visited?.includes(questionId))return "unanswered";
return "not-visited";
};

export const calculateTestResult=(test,attempt)=>{
let correct=0;
let incorrect=0;
let unanswered=0;
let marksObtained=0;

const questionAnalysis=test.questions.map((question,index)=>{
const selectedAnswer=attempt.answers[question.id]||null;
const isCorrect=selectedAnswer===question.correctAnswer;
let marksAwarded=0;
let status="unanswered";

if(!selectedAnswer){
unanswered+=1;
}else if(isCorrect){
correct+=1;
marksAwarded=question.marks;
marksObtained+=question.marks;
status="correct";
}else{
incorrect+=1;
marksAwarded=-question.negativeMarks;
marksObtained-=question.negativeMarks;
status="incorrect";
}

return{
questionNumber:index+1,
questionId:question.id,
question:question.question,
options:question.options,
selectedAnswer,
correctAnswer:question.correctAnswer,
explanation:question.explanation,
shortcut:question.shortcut,
difficulty:question.difficulty,
topic:question.topic,
status,
marksAwarded
};
});

const attempted=correct+incorrect;
const accuracy=attempted?Math.round((correct/attempted)*100):0;
const percentage=test.totalMarks?Math.max(0,Math.round((marksObtained/test.totalMarks)*100)):0;
const totalSeconds=test.durationMinutes*60;
const timeUsed=Math.max(0,totalSeconds-attempt.remainingSeconds);
const averageTimePerQuestion=attempted?Math.round(timeUsed/attempted):0;

const topicMap={};

questionAnalysis.forEach(item=>{
if(!topicMap[item.topic]){
topicMap[item.topic]={
topic:item.topic,
correct:0,
incorrect:0,
unanswered:0,
total:0
};
}
topicMap[item.topic].total+=1;
topicMap[item.topic][item.status]+=1;
});

const topicAnalysis=Object.values(topicMap).map(item=>({
...item,
accuracy:item.correct+item.incorrect?Math.round((item.correct/(item.correct+item.incorrect))*100):0
}));

return{
score:Number(marksObtained.toFixed(2)),
totalMarks:test.totalMarks,
correct,
incorrect,
unanswered,
attempted,
accuracy,
percentage,
timeUsed,
averageTimePerQuestion,
questionAnalysis,
topicAnalysis
};
};