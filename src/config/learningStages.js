export const LEARNING_STAGE_IDS={
LEARN:"learn",
CONCEPT_CHECK:"conceptCheck",
LEVEL_1:"level-1",
LEVEL_2:"level-2",
LEVEL_3:"level-3",
TOPIC_TEST:"topic-test",
PYQ:"pyq",
REVISION:"revision"
};

export const LEARNING_STAGES=[
{
id:LEARNING_STAGE_IDS.LEARN,
name:"Learn",
shortName:"Learn",
icon:"📖",
xp:20,
type:"content",
passPercentage:0,
description:"Understand the topic, formulas, rules, methods, shortcuts and solved examples."
},
{
id:LEARNING_STAGE_IDS.CONCEPT_CHECK,
name:"Concept Check",
shortName:"Concept",
icon:"🧠",
xp:30,
type:"assessment",
passPercentage:60,
description:"Check whether the core concepts are clear before starting practice levels."
},
{
id:LEARNING_STAGE_IDS.LEVEL_1,
name:"Level 1",
shortName:"Level 1",
icon:"1️⃣",
xp:35,
type:"assessment",
passPercentage:60,
description:"Build basic understanding and accuracy with foundation-level questions."
},
{
id:LEARNING_STAGE_IDS.LEVEL_2,
name:"Level 2",
shortName:"Level 2",
icon:"2️⃣",
xp:45,
type:"assessment",
passPercentage:60,
description:"Solve mixed and moderately difficult questions using the learned concepts."
},
{
id:LEARNING_STAGE_IDS.LEVEL_3,
name:"Level 3",
shortName:"Level 3",
icon:"3️⃣",
xp:60,
type:"assessment",
passPercentage:60,
description:"Solve advanced SSC-level variations and improve speed and accuracy."
},
{
id:LEARNING_STAGE_IDS.TOPIC_TEST,
name:"Topic Test",
shortName:"Test",
icon:"🎯",
xp:80,
type:"assessment",
passPercentage:70,
description:"Attempt a complete topic test under exam-style conditions."
},
{
id:LEARNING_STAGE_IDS.PYQ,
name:"PYQ",
shortName:"PYQ",
icon:"📄",
xp:70,
type:"assessment",
passPercentage:60,
description:"Solve verified previous-year SSC questions from this topic."
},
{
id:LEARNING_STAGE_IDS.REVISION,
name:"Revision",
shortName:"Revision",
icon:"🔁",
xp:40,
type:"revision",
passPercentage:0,
description:"Revise important rules, formulas, shortcuts, mistakes and weak areas."
}
];

export const LEARNING_STAGE_ORDER=LEARNING_STAGES.map(stage=>stage.id);

export const ASSESSMENT_STAGE_IDS=LEARNING_STAGES
.filter(stage=>stage.type==="assessment")
.map(stage=>stage.id);

export const SUBJECT_NAMES={
quant:"Quantitative Aptitude",
reasoning:"General Intelligence & Reasoning",
english:"English Comprehension",
gk:"General Awareness"
};

export const TOTAL_TOPIC_XP=LEARNING_STAGES.reduce(
(total,stage)=>total+stage.xp,
0
);

export const getLearningStage=stageId=>
LEARNING_STAGES.find(stage=>stage.id===stageId)||null;

export const getLearningStageIndex=stageId=>
LEARNING_STAGE_ORDER.indexOf(stageId);

export const getNextLearningStage=stageId=>{
const index=getLearningStageIndex(stageId);
return index>=0?LEARNING_STAGES[index+1]||null:null;
};

export const getPreviousLearningStage=stageId=>{
const index=getLearningStageIndex(stageId);
return index>0?LEARNING_STAGES[index-1]:null;
};

export const isAssessmentStage=stageId=>
ASSESSMENT_STAGE_IDS.includes(stageId);

export const isValidLearningStage=stageId=>
LEARNING_STAGE_ORDER.includes(stageId);

export default LEARNING_STAGES;