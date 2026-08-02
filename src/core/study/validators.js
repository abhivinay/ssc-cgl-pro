import{
STAGES,
STAGE_ALIASES
}from"./constants";

export const normalizeStage=stage=>{
const value=String(stage||"").trim();

return(
STAGE_ALIASES[value]||
STAGE_ALIASES[value.toLowerCase()]||
value
);
};

export const isValidStage=stage=>
STAGES.includes(
normalizeStage(stage)
);

export const createEmptyStages=()=>STAGES.reduce(
(result,stage)=>{
result[stage]=false;
return result;
},
{}
);

export const migrateStages=(
stages={},
completed=false
)=>{
const migrated=createEmptyStages();

Object.entries(stages||{}).forEach(
([stage,value])=>{
const normalized=normalizeStage(stage);

if(STAGES.includes(normalized)){
migrated[normalized]=Boolean(value);
}
}
);

if(completed){
STAGES.forEach(stage=>{
migrated[stage]=true;
});
}

return migrated;
};

export const getCompletedStageCount=topic=>{
if(!topic||typeof topic!=="object"){
return 0;
}

const stages=migrateStages(
topic.stages,
topic.completed
);

return STAGES.filter(
stage=>stages[stage]
).length;
};

export const getFirstIncompleteStage=topic=>{
if(!topic){
return STAGES[0];
}

const stages=migrateStages(
topic.stages,
topic.completed
);

return(
STAGES.find(stage=>!stages[stage])||
STAGES[STAGES.length-1]
);
};

export const canStartStage=(
topic,
requestedStage
)=>{
if(
!topic||
typeof topic!=="object"||
!topic.unlocked
){
return false;
}

const stage=normalizeStage(requestedStage);

if(!STAGES.includes(stage)){
return false;
}

const stages=migrateStages(
topic.stages,
topic.completed
);

if(stages[stage]){
return false;
}

const stageIndex=STAGES.indexOf(stage);

if(stageIndex===0){
return true;
}

return Boolean(
stages[STAGES[stageIndex-1]]
);
};

export const isTopicComplete=topic=>{
if(!topic||typeof topic!=="object"){
return false;
}

if(topic.completed){
return true;
}

return getCompletedStageCount(topic)===STAGES.length;
};

export default{
normalizeStage,
isValidStage,
createEmptyStages,
migrateStages,
getCompletedStageCount,
getFirstIncompleteStage,
canStartStage,
isTopicComplete
};