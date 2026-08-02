import{useMemo}from"react";
import{useNavigate}from"react-router-dom";
import{useStudy}from"../context/StudyContext";

const SUBJECT_NAMES={
quant:"Quant",
reasoning:"Reasoning",
english:"English",
gk:"General Awareness"
};

export default function Planner(){
const navigate=useNavigate();
const{studyState,dueRevisions}=useStudy();

const topics=Array.isArray(studyState.topics)
?studyState.topics
:[];

const revisions=Array.isArray(studyState.revisions)
?studyState.revisions
:[];

const planner=useMemo(()=>{
const incompleteTopics=topics.filter(
topic=>!topic.completed
);

const unlockedTopics=incompleteTopics.filter(
topic=>topic.unlocked
);

const candidates=unlockedTopics.length
?unlockedTopics
:incompleteTopics;

const sortedCandidates=[...candidates].sort((a,b)=>{
const priorityDifference=
(Number(a.priority)||999)-
(Number(b.priority)||999);

if(priorityDifference!==0){
return priorityDifference;
}

const progressDifference=
(Number(a.progress)||0)-
(Number(b.progress)||0);

if(progressDifference!==0){
return progressDifference;
}

return(
(Number(b.weightage)||0)-
(Number(a.weightage)||0)
);
});

const topic=sortedCandidates[0]||null;

const revisionCount=Array.isArray(dueRevisions)
?dueRevisions.length
:revisions.filter(revision=>!revision.completed).length;

let priority="Medium";
let reason="Continue your current learning sequence.";

if(revisionCount>=3){
priority="High";
reason="Multiple revisions are due and should be completed first.";
}else if(Number(topic?.difficulty)>=3){
priority="High";
reason="Your current focus topic has high difficulty.";
}else if(Number(topic?.weightage)>=3){
priority="High";
reason="This topic has strong SSC examination weightage.";
}else if(!topic){
priority="Completed";
reason="No incomplete topic is currently available.";
}

return{
topic,
revisionCount,
priority,
reason
};
},[topics,revisions,dueRevisions]);

const topicName=
planner.topic?.name||
planner.topic?.topic||
"All Topics Completed";

const subjectName=planner.topic
?SUBJECT_NAMES[planner.topic.subject]||planner.topic.subject
:"-";

const openTopic=()=>{
if(!planner.topic)return;

const nextStageOrder=[
"learn",
"conceptCheck",
"level-1",
"level-2",
"level-3",
"topic-test",
"pyq",
"revision"
];

const completedStages=planner.topic.stages||{};

const aliases={
"level-1":"level1",
"level-2":"level2",
"level-3":"level3",
"topic-test":"topicTest"
};

const nextStage=nextStageOrder.find(stage=>{
const storedStage=aliases[stage]||stage;
return !completedStages[storedStage];
})||"learn";

navigate(
`/topic/${planner.topic.id}/${nextStage}`
);
};

return(
<div className="mx-auto max-w-7xl pb-10">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
Smart Study Plan
</p>

<h1 className="mt-2 text-4xl font-bold">
AI Daily Planner
</h1>

<p className="mt-2 text-zinc-400">
Your next learning task based on progress, priority and revisions.
</p>
</div>

<div className="mt-8 grid gap-6 xl:grid-cols-3">
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm text-zinc-500">
Current Focus
</p>

<h2 className="mt-3 text-2xl font-bold">
{topicName}
</h2>

<div className="mt-5 space-y-2 text-sm text-zinc-400">
<p>
Subject:{" "}
<span className="text-white">
{subjectName}
</span>
</p>

<p>
Progress:{" "}
<span className="text-white">
{planner.topic?.progress||0}%
</span>
</p>

<p>
Estimated time:{" "}
<span className="text-white">
{planner.topic
?`${planner.topic.estimatedHours||2} hours`
:"-"}
</span>
</p>

<p>
Difficulty:{" "}
<span className="text-white">
{planner.topic?.difficulty||"-"}
</span>
</p>
</div>

<button
type="button"
disabled={!planner.topic}
onClick={openTopic}
className="mt-6 rounded-2xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
>
Continue Topic
</button>
</div>

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm text-zinc-500">
Today's Priority
</p>

<h2 className={`mt-3 text-3xl font-bold ${
planner.priority==="High"
?"text-red-400"
:planner.priority==="Completed"
?"text-emerald-400"
:"text-amber-400"
}`}>
{planner.priority}
</h2>

<p className="mt-4 text-sm leading-6 text-zinc-400">
{planner.reason}
</p>

<div className="mt-6 rounded-2xl bg-zinc-950 p-4">
<p className="text-sm text-zinc-500">
Revision Due
</p>

<p className="mt-1 text-3xl font-bold">
{planner.revisionCount}
</p>
</div>
</div>

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm text-zinc-500">
Recommended Test
</p>

<h2 className="mt-3 text-2xl font-bold">
{planner.topic
?`${topicName} Drill Test`
:"Full SSC CGL Mock"}
</h2>

<p className="mt-4 text-sm leading-6 text-zinc-400">
Complete the current learning stages first, then attempt a topic test and PYQs.
</p>

<button
type="button"
onClick={()=>navigate("/mock-tests")}
className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-3 font-semibold transition hover:border-zinc-500"
>
Open Mock Tests
</button>
</div>
</div>

<div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<h2 className="text-xl font-bold">
Today's Schedule
</h2>

<div className="mt-5 grid gap-4 md:grid-cols-3">
<div className="rounded-2xl bg-zinc-950 p-5">
<h3 className="font-bold">
🌅 Morning
</h3>

<p className="mt-2 text-sm text-zinc-400">
Learn concepts and revise formulas.
</p>
</div>

<div className="rounded-2xl bg-zinc-950 p-5">
<h3 className="font-bold">
☀️ Afternoon
</h3>

<p className="mt-2 text-sm text-zinc-400">
Complete practice levels and PYQs.
</p>
</div>

<div className="rounded-2xl bg-zinc-950 p-5">
<h3 className="font-bold">
🌙 Evening
</h3>

<p className="mt-2 text-sm text-zinc-400">
Attempt tests and analyse mistakes.
</p>
</div>
</div>
</div>
</div>
);
}