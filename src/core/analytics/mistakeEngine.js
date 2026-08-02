const ACCURACY_LEVEL={
EXCELLENT:"excellent",
GOOD:"good",
AVERAGE:"average",
POOR:"poor"
};

export function createMistake({
topicId,
subject,
questionId,
question,
correctAnswer,
selectedAnswer,
difficulty="medium",
timeTaken=0
}){
return{
id:crypto.randomUUID(),
topicId,
subject,
questionId,
question,
correctAnswer,
selectedAnswer,
difficulty,
timeTaken,
createdAt:Date.now()
};
}

export function getTopicMistakes(mistakes,topicId){
return mistakes.filter(
item=>item.topicId===topicId
);
}

export function getSubjectMistakes(mistakes,subject){
return mistakes.filter(
item=>item.subject===subject
);
}

export function getAccuracy(correct,total){
if(total===0)return 0;
return Math.round((correct/total)*100);
}

export function getAccuracyLevel(accuracy){
if(accuracy>=90)return ACCURACY_LEVEL.EXCELLENT;
if(accuracy>=75)return ACCURACY_LEVEL.GOOD;
if(accuracy>=60)return ACCURACY_LEVEL.AVERAGE;
return ACCURACY_LEVEL.POOR;
}

export function groupMistakesByTopic(mistakes){
return mistakes.reduce((acc,item)=>{
if(!acc[item.topicId]){
acc[item.topicId]=[];
}
acc[item.topicId].push(item);
return acc;
},{});
}

export default{
createMistake,
getTopicMistakes,
getSubjectMistakes,
getAccuracy,
getAccuracyLevel,
groupMistakesByTopic
};