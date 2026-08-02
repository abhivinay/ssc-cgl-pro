export const SUBJECTS=Object.freeze({
QUANT:"quant",
REASONING:"reasoning",
ENGLISH:"english",
GK:"gk"
});

export const DIFFICULTIES=Object.freeze({
BEGINNER:"beginner",
EASY:"easy",
MEDIUM:"medium",
HARD:"hard",
SSC_LEVEL:"ssc-level"
});

export const QUESTION_TYPES=Object.freeze({
MCQ:"mcq",
NUMERIC:"numeric",
TRUE_FALSE:"true-false",
MATCH:"match",
SEQUENCE:"sequence"
});

export const PRACTICE_LEVELS=Object.freeze({
LEVEL_1:"level1",
LEVEL_2:"level2",
LEVEL_3:"level3"
});

export const CONTENT_SECTIONS=Object.freeze({
LEARN:"learn",
FORMULAS:"formulas",
SHORTCUTS:"shortcuts",
EXAMPLES:"examples",
CONCEPT_CHECK:"conceptCheck",
PRACTICE:"practice",
TOPIC_TEST:"topicTest",
PYQS:"pyqs",
REVISION:"revision",
FLASHCARDS:"flashcards",
AI_TIPS:"aiTips"
});

export const createQuestionSchema=({
id="",
topicId="",
subtopic="",
difficulty=DIFFICULTIES.EASY,
type=QUESTION_TYPES.MCQ,
question="",
options=[],
answer=null,
explanation="",
shortcut="",
commonMistake="",
source=null,
year=null,
exam=null,
timeLimit=60,
tags=[]
}={})=>({
id:String(id),
topicId:String(topicId),
subtopic:String(subtopic),
difficulty,
type,
question:String(question),
options:Array.isArray(options)?options:[],
answer,
explanation:String(explanation),
shortcut:String(shortcut),
commonMistake:String(commonMistake),
source,
year,
exam,
timeLimit:Math.max(1,Number(timeLimit)||60),
tags:Array.isArray(tags)?tags:[]
});

export const createTopicSchema=({
id="",
subject=SUBJECTS.QUANT,
chapter="",
name="",
slug="",
description="",
estimatedMinutes=0,
difficulty=DIFFICULTIES.BEGINNER,
prerequisites=[],
objectives=[],
subtopics=[],
learn={},
formulas=[],
shortcuts=[],
examples=[],
conceptChecks=[],
practice={},
topicTest=[],
pyqs=[],
revision={},
flashcards=[],
aiTips=[],
metadata={}
}={})=>({
id:String(id),
subject,
chapter:String(chapter),
name:String(name),
slug:String(slug),
description:String(description),
estimatedMinutes:Math.max(0,Number(estimatedMinutes)||0),
difficulty,
prerequisites:Array.isArray(prerequisites)?prerequisites:[],
objectives:Array.isArray(objectives)?objectives:[],
subtopics:Array.isArray(subtopics)?subtopics:[],

learn:{
introduction:String(learn?.introduction||""),
explanation:Array.isArray(learn?.explanation)
?learn.explanation
:[],
visualConcept:Array.isArray(learn?.visualConcept)
?learn.visualConcept
:[],
keyPoints:Array.isArray(learn?.keyPoints)
?learn.keyPoints
:[],
commonMistakes:Array.isArray(learn?.commonMistakes)
?learn.commonMistakes
:[]
},

formulas:Array.isArray(formulas)?formulas:[],
shortcuts:Array.isArray(shortcuts)?shortcuts:[],
examples:Array.isArray(examples)?examples:[],
conceptChecks:Array.isArray(conceptChecks)?conceptChecks:[],

practice:{
level1:Array.isArray(practice?.level1)
?practice.level1
:[],
level2:Array.isArray(practice?.level2)
?practice.level2
:[],
level3:Array.isArray(practice?.level3)
?practice.level3
:[]
},

topicTest:Array.isArray(topicTest)?topicTest:[],
pyqs:Array.isArray(pyqs)?pyqs:[],

revision:{
summary:Array.isArray(revision?.summary)
?revision.summary
:[],
formulaRecap:Array.isArray(revision?.formulaRecap)
?revision.formulaRecap
:[],
mistakeRecap:Array.isArray(revision?.mistakeRecap)
?revision.mistakeRecap
:[],
rapidQuestions:Array.isArray(revision?.rapidQuestions)
?revision.rapidQuestions
:[]
},

flashcards:Array.isArray(flashcards)?flashcards:[],
aiTips:Array.isArray(aiTips)?aiTips:[],

metadata:{
version:String(metadata?.version||"1.0.0"),
status:String(metadata?.status||"draft"),
author:String(metadata?.author||"Sentinel"),
updatedAt:String(
metadata?.updatedAt||
new Date().toISOString()
),
sscAligned:Boolean(metadata?.sscAligned),
pyqVerified:Boolean(metadata?.pyqVerified),
contentReviewed:Boolean(metadata?.contentReviewed)
}
});

export const validateTopicSchema=topic=>{
const errors=[];

if(!topic||typeof topic!=="object"){
return{
valid:false,
errors:["Topic must be an object."]
};
}

if(!topic.id){
errors.push("Topic id is required.");
}

if(!topic.name){
errors.push("Topic name is required.");
}

if(!Object.values(SUBJECTS).includes(topic.subject)){
errors.push("Invalid topic subject.");
}

if(!Object.values(DIFFICULTIES).includes(topic.difficulty)){
errors.push("Invalid topic difficulty.");
}

if(!Array.isArray(topic.subtopics)){
errors.push("Subtopics must be an array.");
}

if(!topic.learn||typeof topic.learn!=="object"){
errors.push("Learn section is required.");
}

if(!topic.practice||typeof topic.practice!=="object"){
errors.push("Practice section is required.");
}

return{
valid:errors.length===0,
errors
};
};

export default{
SUBJECTS,
DIFFICULTIES,
QUESTION_TYPES,
PRACTICE_LEVELS,
CONTENT_SECTIONS,
createQuestionSchema,
createTopicSchema,
validateTopicSchema
};