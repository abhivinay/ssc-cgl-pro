import{
STAGES
}from"./constants";
import{
getCompletedStageCount,
isTopicComplete,
migrateStages
}from"./validators";

const clampPercentage=value=>{
const number=Number(value);

if(!Number.isFinite(number)){
return 0;
}

return Math.min(
100,
Math.max(0,Math.round(number))
);
};

export const calculateTopicProgress=topic=>{
if(!topic||typeof topic!=="object"){
return 0;
}

if(isTopicComplete(topic)){
return 100;
}

return clampPercentage(
getCompletedStageCount(topic)/
STAGES.length*
100
);
};

export const updateTopicProgress=topic=>{
if(!topic||typeof topic!=="object"){
return topic;
}

const completed=isTopicComplete(topic);

return{
...topic,
stages:migrateStages(
topic.stages,
completed
),
completed,
progress:completed
?100
:calculateTopicProgress(topic)
};
};

export const calculateSubjectProgress=(
topics=[],
subject
)=>{
const subjectTopics=Array.isArray(topics)
?topics.filter(
topic=>topic.subject===subject
)
:[];

if(!subjectTopics.length){
return{
subject,
totalTopics:0,
completedTopics:0,
progress:0
};
}

const completedTopics=subjectTopics.filter(
topic=>isTopicComplete(topic)
).length;

const progress=Math.round(
subjectTopics.reduce(
(total,topic)=>
total+calculateTopicProgress(topic),
0
)/
subjectTopics.length
);

return{
subject,
totalTopics:subjectTopics.length,
completedTopics,
progress
};
};

export const calculateOverallProgress=(
topics=[]
)=>{
const safeTopics=Array.isArray(topics)
?topics
:[];

if(!safeTopics.length){
return{
totalTopics:0,
completedTopics:0,
remainingTopics:0,
progress:0
};
}

const completedTopics=safeTopics.filter(
topic=>isTopicComplete(topic)
).length;

const progress=Math.round(
safeTopics.reduce(
(total,topic)=>
total+calculateTopicProgress(topic),
0
)/
safeTopics.length
);

return{
totalTopics:safeTopics.length,
completedTopics,
remainingTopics:Math.max(
0,
safeTopics.length-completedTopics
),
progress
};
};

export const getStageProgress=topic=>{
const stages=migrateStages(
topic?.stages,
topic?.completed
);

return STAGES.map((stage,index)=>({
stage,
index,
completed:Boolean(stages[stage]),
progress:Boolean(stages[stage])
?100
:0
}));
};

export default{
calculateTopicProgress,
updateTopicProgress,
calculateSubjectProgress,
calculateOverallProgress,
getStageProgress
};