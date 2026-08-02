import{
getFirstIncompleteStage
}from"./validators";

import{
getDueRevisions
}from"./revisionScheduler";

import{
getNextUnlockedTopic
}from"./unlockEngine";

export const getCurrentMission=({
brainTrainerCompleted=false,
topics=[],
revisions=[]
}={})=>{

if(!brainTrainerCompleted){
return{
type:"brain",
title:"Complete Brain Trainer",
description:"Finish today's Brain Trainer session before studying."
};
}

const due=getDueRevisions(revisions);

if(due.length){
return{
type:"revision",
revision:due[0],
title:`Revise ${due[0].topicName}`,
description:"Complete your scheduled revision."
};
}

const topic=getNextUnlockedTopic(topics);

if(topic){
return{
type:"study",
topicId:topic.id,
title:topic.name,
subject:topic.subject,
stage:getFirstIncompleteStage(topic),
description:"Continue your next study stage."
};
}

return{
type:"completed",
title:"Congratulations!",
description:"All available topics are completed."
};
};

export const getTodayMission=getCurrentMission;

export default{
getCurrentMission,
getTodayMission
};