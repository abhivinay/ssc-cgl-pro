const SUBJECT_ORDER=["quant","reasoning","english","gk"];
const MAX_MISSIONS=4;

const createMissionItem=topic=>({
id:String(topic.id),
topicId:String(topic.id),
title:topic.name||topic.topic||"Untitled Topic",
name:topic.name||topic.topic||"Untitled Topic",
subject:topic.subject,
xp:Number(topic.xp)||0,
progress:Math.min(100,Math.max(0,Number(topic.progress)||0)),
stages:{...(topic.stages||{})},
completed:Boolean(topic.completed)
});

const createMission=(topics=[])=>{
if(!Array.isArray(topics))return[];

const seenIds=new Set();

const available=topics.filter(topic=>{
if(!topic||!topic.id||!topic.subject||!topic.unlocked||topic.completed)return false;

const id=String(topic.id);
if(seenIds.has(id))return false;

seenIds.add(id);
return true;
});

const selected=[];
const selectedIds=new Set();

SUBJECT_ORDER.forEach(subject=>{
const topic=available.find(item=>
item.subject===subject&&!selectedIds.has(String(item.id))
);

if(topic){
selected.push(topic);
selectedIds.add(String(topic.id));
}
});

if(selected.length<MAX_MISSIONS){
const remaining=available.filter(topic=>!selectedIds.has(String(topic.id)));
selected.push(...remaining.slice(0,MAX_MISSIONS-selected.length));
}

return selected.slice(0,MAX_MISSIONS).map(createMissionItem);
};

export default createMission;