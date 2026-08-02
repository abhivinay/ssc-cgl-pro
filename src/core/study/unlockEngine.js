import {updateTopicProgress} from "./progressEngine";

export const unlockNextTopic=(topics=[],completedTopic)=>{
if(!Array.isArray(topics)||!completedTopic){
return topics;
}

const subjectTopics=topics
.filter(topic=>topic.subject===completedTopic.subject)
.sort(
(a,b)=>
(Number(a.priority)||0)-
(Number(b.priority)||0)
);

const currentIndex=subjectTopics.findIndex(
topic=>topic.id===completedTopic.id
);

if(currentIndex===-1){
return topics;
}

const nextTopic=subjectTopics[currentIndex+1];

if(!nextTopic){
return topics.map(updateTopicProgress);
}

return topics.map(topic=>{

if(topic.id===nextTopic.id){
return updateTopicProgress({
...topic,
unlocked:true
});
}

return updateTopicProgress(topic);

});
};

export const getUnlockedTopics=(topics=[])=>{
if(!Array.isArray(topics)){
return[];
}

return topics
.filter(topic=>topic.unlocked)
.map(updateTopicProgress);
};

export const getLockedTopics=(topics=[])=>{
if(!Array.isArray(topics)){
return[];
}

return topics
.filter(topic=>!topic.unlocked)
.map(updateTopicProgress);
};

export const getNextUnlockedTopic=(topics=[])=>{
if(!Array.isArray(topics)){
return null;
}

return topics
.filter(topic=>topic.unlocked&&!topic.completed)
.sort(
(a,b)=>
(Number(a.priority)||0)-
(Number(b.priority)||0)
)[0]||null;
};

export const isTopicUnlocked=(topics=[],topicId)=>{
return topics.some(
topic=>
topic.id===String(topicId)&&
topic.unlocked
);
};

export default{
unlockNextTopic,
getUnlockedTopics,
getLockedTopics,
getNextUnlockedTopic,
isTopicUnlocked
};