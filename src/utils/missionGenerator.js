import createMission from "./createMission";

const toNumber=(value,fallback=0)=>{
const number=Number(value);
return Number.isFinite(number)?number:fallback;
};

const getPriorityScore=topic=>{
const weightage=Math.max(0,toNumber(topic?.weightage));
const trend=Math.max(0,toNumber(topic?.trend));
const priority=Math.max(1,toNumber(topic?.priority,5));
const accuracy=Math.min(100,Math.max(0,toNumber(topic?.accuracy)));
const weaknessBonus=accuracy>0?(100-accuracy)/20:0;
return weightage+trend+Math.max(0,6-priority)+weaknessBonus;
};

const missionGenerator=(topics=[])=>{
if(!Array.isArray(topics))return[];

const available=topics
.filter(topic=>topic&&topic.id&&topic.unlocked&&!topic.completed)
.sort((a,b)=>{
const scoreDifference=getPriorityScore(b)-getPriorityScore(a);
if(scoreDifference!==0)return scoreDifference;

const priorityDifference=toNumber(a.priority,999)-toNumber(b.priority,999);
if(priorityDifference!==0)return priorityDifference;

return String(a.id).localeCompare(String(b.id));
});

return createMission(available);
};

export default missionGenerator;