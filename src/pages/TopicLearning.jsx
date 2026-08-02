import {useEffect,useMemo,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import {useStudy} from "../context/StudyContext";
import {getTopicContent} from "../data/topicContent";
import LearnContent from "../components/learning/LearnContent";
import QuestionStage from "../components/learning/QuestionStage";
import PyqContent from "../components/learning/PyqContent";
import RevisionContent from "../components/learning/RevisionContent";
import TopicNotebook from "../components/learning/TopicNotebook";
import StageHeader from "../components/learning/StageHeader";
import StageTimeline from "../components/learning/StageTimeline";
import StageFooter from "../components/learning/StageFooter";
import {
LEARNING_STAGES,
SUBJECT_NAMES,
isAssessmentStage
} from "../config/learningStages";
import {
LEARNING_STATUS,
calculateTopicProgress,
canCompleteStage,
getCompletedStages,
getStageStatus,
markStageComplete
} from "../core/learning/learningEngine";
import {
readLearningProgress,
writeLearningProgress
} from "../services/learningProgressStorage";
import {XP} from "../core/xp/xpEngine";
import {addXP} from "../services/xpStorage";

const normalizeQuestions=(items=[])=>items.map((item,index)=>({
id:item.id??index+1,
question:item.question??item.text??`Question ${index+1}`,
options:Array.isArray(item.options)?item.options:[],
answer:item.answer??item.correctAnswer??"",
explanation:
item.explanation??
item.solution??
"Review the concept and solve the question again."
})).filter(item=>
item.question&&
item.options.length>=2&&
item.answer
);
const getStageXP=stageId=>{
if(stageId==="learn")return XP.LEARN;
if(stageId==="pyq")return XP.PYQ;

if([
"conceptCheck",
"level-1",
"level-2",
"level-3",
"topic-test"
].includes(stageId)){
return XP.PRACTICE;
}

return 0;
};

const buildFallbackQuestions=content=>
normalizeQuestions(content?.practiceExamples||[]);

const getStageQuestions=(content,stageId)=>{
const map={
conceptCheck:[
"conceptCheck",
"conceptQuestions",
"conceptCheckQuestions"
],
"level-1":[
"level1",
"level1Questions",
"basicQuestions"
],
"level-2":[
"level2",
"level2Questions",
"intermediateQuestions"
],
"level-3":[
"level3",
"level3Questions",
"advancedQuestions"
],
"topic-test":[
"topicTest",
"topicTestQuestions",
"testQuestions"
],
pyq:[
"pyq",
"pyqQuestions",
"previousYearQuestions"
]
};

for(const key of map[stageId]||[]){
const value=content?.[key];

const questions=normalizeQuestions(
Array.isArray(value)
?value
:value?.questions||[]
);

if(questions.length){
return questions;
}
}

const fallback=buildFallbackQuestions(content);

if(!fallback.length){
return [];
}

if(stageId==="conceptCheck"){
return fallback.slice(
0,
Math.min(5,fallback.length)
);
}

if(stageId==="level-1"){
return fallback;
}

if(stageId==="level-2"){
return [...fallback].reverse();
}

if(stageId==="level-3"){
return fallback.map((item,index)=>({
...item,
id:`advanced-${index}`
}));
}

if(stageId==="topic-test"){
return fallback.slice(
0,
Math.min(10,fallback.length)
);
}

return [];
};

export default function TopicLearning(){
const {topicId,stage}=useParams();
const navigate=useNavigate();

const {
studyState,
completeStage,
addTopicNote,
addTopicMistake
}=useStudy();

const [extendedProgress,setExtendedProgress]=useState(
readLearningProgress
);

const [assessmentResult,setAssessmentResult]=useState(null);

const topic=studyState.topics.find(
item=>item.id===topicId
);

const stageIndex=LEARNING_STAGES.findIndex(
item=>item.id===stage
);

const currentStage=LEARNING_STAGES[stageIndex];

const content=useMemo(
()=>topic?getTopicContent(topic):null,
[topic]
);
const stageQuestions=useMemo(
()=>getStageQuestions(content,stage),
[content,stage]
);

const progress=useMemo(
()=>topic
?calculateTopicProgress(topic,extendedProgress)
:0,
[topic,extendedProgress]
);

useEffect(()=>{
setAssessmentResult(null);
},[stage,topicId]);

if(!topic){
return(
<div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
<h1 className="text-2xl font-bold">
Topic not found
</h1>

<button
type="button"
onClick={()=>navigate("/syllabus")}
className="mt-5 rounded-xl bg-violet-600 px-5 py-3"
>
Return to Syllabus
</button>
</div>
);
}

if(!currentStage){
return(
<div className="p-10 text-white">
Invalid stage: {stage}
</div>
);
}

const status=getStageStatus(
topic,
stage,
extendedProgress
);

const isCompleted=
status===LEARNING_STATUS.COMPLETED;

const requiresPass=isAssessmentStage(stage);

const canComplete=canCompleteStage({
topic,
stageId:stage,
extendedProgress,
assessmentResult,
hasQuestions:stageQuestions.length>0
});

const openStage=(stageItem,index)=>{
const nextStatus=getStageStatus(
topic,
stageItem.id,
extendedProgress
);

if(nextStatus!==LEARNING_STATUS.LOCKED){
navigate(
`/topic/${topic.id}/${LEARNING_STAGES[index].id}`
);
}
};

const finishStage=()=>{
if(!canComplete||isCompleted)return;

const nextProgress=markStageComplete(
topic.id,
stage,
extendedProgress
);

setExtendedProgress(nextProgress);
writeLearningProgress(nextProgress);

if(typeof completeStage==="function"){
completeStage(topic.id,stage);
}

const reward=getStageXP(stage);

if(reward>0){
addXP({
amount:reward,
reason:`${currentStage.name} completed: ${topic.name||topic.title||topic.topic||topic.id}`,
sourceId:`topic-stage-${topic.id}-${stage}`
});
}

const nextStage=LEARNING_STAGES[stageIndex+1];

if(nextStage){
navigate(
`/topic/${topic.id}/${nextStage.id}`
);
}else{
navigate("/syllabus");
}
};

const stageDescriptions={
conceptCheck:
"Check whether you understood the core concepts before moving to practice levels.",
"level-1":
"Build accuracy with straightforward foundation questions.",
"level-2":
"Apply the concept to mixed and moderately difficult questions.",
"level-3":
"Solve advanced SSC-level variations and strengthen speed.",
"topic-test":
"Attempt the complete topic test under exam-style conditions."
};

return(
<div className="mx-auto max-w-7xl pb-12">
<button
type="button"
onClick={()=>navigate("/syllabus")}
className="text-sm text-zinc-400 transition hover:text-white"
>
← Back to syllabus
</button>
<StageHeader
topic={{
...topic,
subject:SUBJECT_NAMES[topic.subject]
}}
progress={progress}
/>
<StageTimeline
stages={LEARNING_STAGES}
topic={topic}
currentStageId={stage}
progress={extendedProgress}
statusEnum={LEARNING_STATUS}
getStageStatus={getStageStatus}
onStageClick={openStage}
/>

{status===LEARNING_STATUS.LOCKED?(
<div className="mt-6 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-10 text-center">
<p className="text-5xl">
🔒
</p>

<h2 className="mt-4 text-2xl font-bold">
Stage locked
</h2>

<p className="mt-2 text-zinc-400">
Complete the previous stage to unlock {currentStage.name}.
</p>
</div>
):(
<div className="mt-6 grid gap-6 xl:grid-cols-[1fr_330px]">
<main>
{stage==="learn"&&(
<LearnContent content={content}/>
)}

{[
"conceptCheck",
"level-1",
"level-2",
"level-3",
"topic-test"
].includes(stage)&&(
<QuestionStage
title={currentStage.name}
description={stageDescriptions[stage]}
questions={stageQuestions}
passPercentage={currentStage.passPercentage}
onResult={setAssessmentResult}
topicId={topic.id}
subject={topic.subject}
difficulty={stage}
/>
)}

{stage==="pyq"&&(
<PyqContent
topic={topic}
content={content}
onResult={setAssessmentResult}
getStageQuestions={getStageQuestions}
/>
)}

{stage==="revision"&&(
<RevisionContent content={content}/>
)}
<StageFooter
currentStage={currentStage}
isCompleted={isCompleted}
requiresPass={requiresPass}
canComplete={canComplete}
onComplete={finishStage}
/>
</main>

<aside>
<TopicNotebook
topic={topic}
addTopicNote={addTopicNote}
addTopicMistake={addTopicMistake}
/>
</aside>
</div>
)}
</div>
);
}