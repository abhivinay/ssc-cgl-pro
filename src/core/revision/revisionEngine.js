const DAY_IN_MS=24*60*60*1000;

export function createRevisionTask({
topicId,
subject,
title,
source="mistake",
priority="medium",
scheduledAt=Date.now()
}){
return{
id:crypto.randomUUID(),
topicId,
subject,
title,
source,
priority,
scheduledAt,
completed:false,
completedAt:null,
createdAt:Date.now(),
revisionCount:0
};
}

export function getRevisionInterval(revisionCount){
const intervals=[1,3,7,14,30];
return intervals[Math.min(revisionCount,intervals.length-1)];
}

export function scheduleNextRevision(task){
const nextCount=(task.revisionCount||0)+1;
const interval=getRevisionInterval(nextCount);

return{
...task,
completed:false,
completedAt:null,
revisionCount:nextCount,
scheduledAt:Date.now()+(interval*DAY_IN_MS)
};
}

export function completeRevisionTask(task){
return{
...task,
completed:true,
completedAt:Date.now()
};
}

export function getDueRevisions(tasks,currentTime=Date.now()){
return tasks
.filter(task=>!task.completed&&task.scheduledAt<=currentTime)
.sort((a,b)=>{
const priorityDifference=getPriorityWeight(b.priority)-getPriorityWeight(a.priority);

if(priorityDifference!==0)return priorityDifference;

return a.scheduledAt-b.scheduledAt;
});
}

export function getUpcomingRevisions(tasks,currentTime=Date.now()){
return tasks
.filter(task=>!task.completed&&task.scheduledAt>currentTime)
.sort((a,b)=>a.scheduledAt-b.scheduledAt);
}

export function getCompletedRevisions(tasks){
return tasks
.filter(task=>task.completed)
.sort((a,b)=>(b.completedAt||0)-(a.completedAt||0));
}

export function getTopicRevisionTasks(tasks,topicId){
return tasks.filter(task=>task.topicId===topicId);
}

export function createRevisionTasksFromMistakes(mistakes,existingTasks=[]){
const existingTopicIds=new Set(
existingTasks
.filter(task=>!task.completed)
.map(task=>task.topicId)
);

const grouped=mistakes.reduce((acc,item)=>{
const topicId=item.topicId||"unknown";

if(!acc[topicId]){
acc[topicId]={
topicId,
subject:item.subject||"Unknown",
count:0
};
}

acc[topicId].count+=1;
return acc;
},{});

return Object.values(grouped)
.filter(item=>!existingTopicIds.has(item.topicId))
.map(item=>createRevisionTask({
topicId:item.topicId,
subject:item.subject,
title:formatTopicTitle(item.topicId),
source:"mistake",
priority:getMistakePriority(item.count),
scheduledAt:Date.now()
}));
}

export function getRevisionStats(tasks){
return{
total:tasks.length,
due:getDueRevisions(tasks).length,
upcoming:getUpcomingRevisions(tasks).length,
completed:getCompletedRevisions(tasks).length
};
}

function getMistakePriority(count){
if(count>=5)return "high";
if(count>=3)return "medium";
return "low";
}

function getPriorityWeight(priority){
const weights={
high:3,
medium:2,
low:1
};

return weights[priority]||0;
}

function formatTopicTitle(topicId){
return String(topicId||"Unknown Topic")
.replaceAll("-"," ")
.replaceAll("_"," ")
.replace(/\b\w/g,letter=>letter.toUpperCase());
}

export default{
createRevisionTask,
getRevisionInterval,
scheduleNextRevision,
completeRevisionTask,
getDueRevisions,
getUpcomingRevisions,
getCompletedRevisions,
getTopicRevisionTasks,
createRevisionTasksFromMistakes,
getRevisionStats
};