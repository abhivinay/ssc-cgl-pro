import{useNavigate}from"react-router-dom";
import{useStudy}from"../../context/StudyContext";
import GlassCard from"../ui/GlassCard";
import ProgressBar from"../ui/ProgressBar";
import Badge from"../ui/Badge";
import Button from"../ui/Button";

const subjectNames={
quant:"Quant",
reasoning:"Reasoning",
english:"English",
gk:"General Awareness"
};

const stageLabels={
learn:"Learn",
conceptCheck:"Concept Check",
level1:"Level 1",
level2:"Level 2",
level3:"Level 3",
topicTest:"Topic Test",
pyq:"PYQ",
revision:"Revision"
};

const routeStageIds={
learn:"learn",
conceptCheck:"conceptCheck",
level1:"level-1",
level2:"level-2",
level3:"level-3",
topicTest:"topic-test",
pyq:"pyq",
revision:"revision"
};

export default function MissionCard(){
const navigate=useNavigate();
const{studyState,stages}=useStudy();

const mission=studyState.mission||{};

const topic=studyState.topics.find(
item=>item.id===mission.topicId
);

const stageList=Array.isArray(stages)
?stages
:Object.keys(stageLabels);

const completedStages=topic
?stageList.filter(
stage=>topic.stages?.[stage]
).length
:0;

const progress=topic&&stageList.length
?Math.round(
completedStages/stageList.length*100
)
:0;

const activeStage=
mission.stage||
stageList.find(
stage=>!topic?.stages?.[stage]
)||
"learn";

const openStage=stageId=>{
if(!topic)return;

const routeStage=
routeStageIds[stageId]||
stageId;

navigate(
`/topic/${topic.id}/${routeStage}`
);
};

return(
<GlassCard
hover
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"/>

<div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"/>

<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
<div>
<div className="flex flex-wrap items-center gap-3">
<Badge
variant="success"
dot
>
Today&apos;s Mission
</Badge>

{topic&&(
<Badge variant="primary">
{subjectNames[topic.subject]||topic.subject}
</Badge>
)}
</div>

<h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
{topic
?topic.name
:"No Active Topic"}
</h2>

{topic&&(
<p className="mt-3 text-sm font-medium text-zinc-400">
Current Stage
<span className="mx-2 text-zinc-700">
•
</span>
<span className="text-emerald-300">
{stageLabels[activeStage]||activeStage}
</span>
</p>
)}
</div>

<div className="flex shrink-0 items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-2xl">
🎯
</div>

<div>
<p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
Mission Progress
</p>

<p className="mt-1 text-3xl font-black text-emerald-300">
{progress}%
</p>
</div>
</div>
</div>

<div className="mt-8">
<ProgressBar
value={progress}
label={`${completedStages} of ${stageList.length} stages completed`}
showValue
size="lg"
variant="success"
/>
</div>

<div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
{topic&&stageList.map((stage,index)=>{
const completed=Boolean(
topic.stages?.[stage]
);

const previousComplete=
index===0||
Boolean(
topic.stages?.[
stageList[index-1]
]
);

const active=
!completed&&
topic.unlocked&&
previousComplete&&
stage===activeStage;

const locked=
!completed&&!active;

return(
<button
key={stage}
type="button"
disabled={locked}
onClick={()=>
active&&openStage(stage)
}
className={`group relative overflow-hidden rounded-2xl border p-4 text-left outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-violet-400/70 ${
completed
?"border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
:active
?"border-violet-500/35 bg-violet-500/10 text-violet-200 shadow-[0_15px_40px_rgba(124,58,237,0.18)] hover:-translate-y-1 hover:bg-violet-500/15"
:"cursor-not-allowed border-zinc-800 bg-zinc-950/70 text-zinc-600"
}`}
>
{active&&(
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_45%)]"/>
)}

<div className="relative">
<div className="flex items-center justify-between gap-3">
<div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
completed
?"border-emerald-400/20 bg-emerald-500/10"
:active
?"border-violet-400/20 bg-violet-500/15"
:"border-zinc-800 bg-zinc-900"
}`}>
{completed
?"✓"
:active
?"●"
:"🔒"}
</div>

<span className="text-xs font-semibold text-zinc-500">
{index+1}/{stageList.length}
</span>
</div>

<p className="mt-4 text-sm font-bold">
{stageLabels[stage]||stage}
</p>

<p className="mt-1 text-xs text-zinc-500">
{completed
?"Completed"
:active
?"Ready to continue"
:"Locked"}
</p>
</div>
</button>
);
})}

{!topic&&(
<div className="col-span-full rounded-3xl border border-dashed border-zinc-700 bg-zinc-950/60 p-8 text-center">
<p className="text-4xl">
🛰️
</p>

<h3 className="mt-4 text-xl font-bold text-white">
No mission available
</h3>

<p className="mt-2 text-sm text-zinc-500">
Check the syllabus or reset your study progress.
</p>
</div>
)}
</div>

<div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:flex-row sm:items-center sm:justify-between">
<div>
<p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
Mission Reward
</p>

<div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-semibold">
<span className="text-violet-300">
⚡ +120 XP
</span>

<span className="text-amber-300">
🔥 Maintain Streak
</span>

<span className="text-emerald-300">
🏆 Mission Progress
</span>
</div>
</div>

<Button
disabled={!topic}
onClick={()=>
openStage(activeStage)
}
size="lg"
rightIcon="→"
className="shrink-0"
>
Continue Mission
</Button>
</div>
</div>
</GlassCard>
);
}