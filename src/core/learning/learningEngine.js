import {
ASSESSMENT_STAGE_IDS,
LEARNING_STAGE_IDS,
LEARNING_STAGE_ORDER,
LEARNING_STAGES,
getLearningStage,
getLearningStageIndex,
getNextLearningStage,
getPreviousLearningStage,
isAssessmentStage,
isValidLearningStage
} from "../../config/learningStages";

export const LEARNING_STATUS={
LOCKED:"locked",
ACTIVE:"active",
COMPLETED:"completed"
};

const normalizeObject=value=>
value&&typeof value==="object"&&!Array.isArray(value)?value:{};

export const getLegacyStageCompletion=(topic,stageId)=>{
if(!topic)return false;
if(topic.completed)return true;
if(stageId===LEARNING_STAGE_IDS.LEARN)return Boolean(topic.stages?.learn);
if(stageId===LEARNING_STAGE_IDS.PYQ)return Boolean(topic.stages?.pyq);
if(stageId===LEARNING_STAGE_IDS.REVISION)return Boolean(topic.stages?.revision);
return false;
};

export const getCompletedStages=(topic,extendedProgress={})=>{
if(!topic)return {};
const savedProgress=normalizeObject(extendedProgress?.[topic.id]);
return LEARNING_STAGES.reduce((result,stage)=>{
result[stage.id]=Boolean(
savedProgress[stage.id]||
getLegacyStageCompletion(topic,stage.id)
);
return result;
},{});
};

export const isStageCompleted=(topic,stageId,extendedProgress={})=>{
if(!isValidLearningStage(stageId))return false;
const completedStages=getCompletedStages(topic,extendedProgress);
return Boolean(completedStages[stageId]);
};

export const getStageStatus=(
topic,
stageId,
extendedProgress={}
)=>{
if(!topic||!isValidLearningStage(stageId)){
return LEARNING_STATUS.LOCKED;
}

const completedStages=getCompletedStages(topic,extendedProgress);

if(completedStages[stageId]){
return LEARNING_STATUS.COMPLETED;
}

if(!topic.unlocked){
return LEARNING_STATUS.LOCKED;
}

const stageIndex=getLearningStageIndex(stageId);

if(stageIndex===0){
return LEARNING_STATUS.ACTIVE;
}

const previousStageId=LEARNING_STAGE_ORDER[stageIndex-1];

return completedStages[previousStageId]
?LEARNING_STATUS.ACTIVE
:LEARNING_STATUS.LOCKED;
};

export const canOpenStage=(topic,stageId,extendedProgress={})=>
getStageStatus(topic,stageId,extendedProgress)!==LEARNING_STATUS.LOCKED;

export const getCurrentStage=(topic,extendedProgress={})=>{
if(!topic)return null;

const completedStages=getCompletedStages(topic,extendedProgress);

const activeStage=LEARNING_STAGES.find(stage=>
getStageStatus(topic,stage.id,extendedProgress)===LEARNING_STATUS.ACTIVE
);

if(activeStage)return activeStage;

const allCompleted=LEARNING_STAGES.every(stage=>
completedStages[stage.id]
);

return allCompleted
?LEARNING_STAGES[LEARNING_STAGES.length-1]
:LEARNING_STAGES[0];
};

export const getFirstIncompleteStage=(topic,extendedProgress={})=>{
if(!topic)return null;
const completedStages=getCompletedStages(topic,extendedProgress);

return LEARNING_STAGES.find(stage=>
!completedStages[stage.id]
)||null;
};

export const getCompletedStageCount=(topic,extendedProgress={})=>{
const completedStages=getCompletedStages(topic,extendedProgress);

return LEARNING_STAGE_ORDER.reduce(
(total,stageId)=>total+(completedStages[stageId]?1:0),
0
);
};

export const calculateTopicProgress=(topic,extendedProgress={})=>{
if(!topic)return 0;

const completedCount=getCompletedStageCount(topic,extendedProgress);

return Math.round(
(completedCount/LEARNING_STAGES.length)*100
);
};

export const isTopicMastered=(topic,extendedProgress={})=>{
if(!topic)return false;

return LEARNING_STAGE_ORDER.every(stageId=>
isStageCompleted(topic,stageId,extendedProgress)
);
};

export const calculateEarnedXP=(topic,extendedProgress={})=>{
if(!topic)return 0;

const completedStages=getCompletedStages(topic,extendedProgress);

return LEARNING_STAGES.reduce(
(total,stage)=>total+(completedStages[stage.id]?stage.xp:0),
0
);
};

export const canCompleteStage=({
topic,
stageId,
extendedProgress={},
assessmentResult=null,
hasQuestions=true
})=>{
const status=getStageStatus(topic,stageId,extendedProgress);

if(status!==LEARNING_STATUS.ACTIVE){
return false;
}

if(!isAssessmentStage(stageId)){
return true;
}

if(
stageId===LEARNING_STAGE_IDS.PYQ&&
!hasQuestions
){
return true;
}

return Boolean(assessmentResult?.passed);
};

export const markStageComplete=(
topicId,
stageId,
extendedProgress={}
)=>{
if(!topicId||!isValidLearningStage(stageId)){
return extendedProgress;
}

return {
...extendedProgress,
[topicId]:{
...normalizeObject(extendedProgress[topicId]),
[stageId]:true
}
};
};

export const markStageIncomplete=(
topicId,
stageId,
extendedProgress={}
)=>{
if(!topicId||!isValidLearningStage(stageId)){
return extendedProgress;
}

return {
...extendedProgress,
[topicId]:{
...normalizeObject(extendedProgress[topicId]),
[stageId]:false
}
};
};

export const resetTopicProgress=(topicId,extendedProgress={})=>{
if(!topicId)return extendedProgress;

const nextProgress={...extendedProgress};
delete nextProgress[topicId];

return nextProgress;
};

export const getNextAvailableStage=(
topic,
currentStageId,
extendedProgress={}
)=>{
if(!topic||!isValidLearningStage(currentStageId)){
return null;
}

const nextStage=getNextLearningStage(currentStageId);

if(!nextStage)return null;

return canOpenStage(topic,nextStage.id,extendedProgress)
?nextStage
:null;
};

export const getStageSummary=(
topic,
stageId,
extendedProgress={}
)=>{
const stage=getLearningStage(stageId);

if(!stage)return null;

return {
...stage,
status:getStageStatus(topic,stageId,extendedProgress),
completed:isStageCompleted(topic,stageId,extendedProgress),
isAssessment:ASSESSMENT_STAGE_IDS.includes(stageId),
previousStage:getPreviousLearningStage(stageId),
nextStage:getNextLearningStage(stageId)
};
};

export const getTopicLearningSummary=(
topic,
extendedProgress={}
)=>{
if(!topic)return null;

const completedStages=getCompletedStages(topic,extendedProgress);

return {
topicId:topic.id,
currentStage:getCurrentStage(topic,extendedProgress),
firstIncompleteStage:getFirstIncompleteStage(topic,extendedProgress),
completedStages,
completedCount:getCompletedStageCount(topic,extendedProgress),
totalStages:LEARNING_STAGES.length,
progress:calculateTopicProgress(topic,extendedProgress),
earnedXP:calculateEarnedXP(topic,extendedProgress),
mastered:isTopicMastered(topic,extendedProgress)
};
};

export {
getLearningStage,
getLearningStageIndex,
getNextLearningStage,
getPreviousLearningStage,
isAssessmentStage,
isValidLearningStage
};