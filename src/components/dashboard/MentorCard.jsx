import{useNavigate}from"react-router-dom";
import{useStudy}from"../../context/StudyContext";
import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";
import Button from"../ui/Button";

const subjectNames={
quant:"Quant",
reasoning:"Reasoning",
english:"English",
gk:"General Awareness"
};

const stageNames={
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

export default function MentorCard(){
const navigate=useNavigate();
const{studyState,dashboard}=useStudy();

const missionTopic=studyState.topics.find(
topic=>topic.id===studyState.mission?.topicId
);

const revisionDue=Array.isArray(dashboard.revisionDue)
?dashboard.revisionDue
:[];

const activeStage=
studyState.mission?.stage||
"learn";

const brainCompleted=Boolean(
studyState.brainTrainerCompleted
);

let eyebrow="Mission Brief";
let status="Action Required";
let statusVariant="warning";
let title="Complete your brain warm-up";
let instruction=
"Start the 10-minute Brain Trainer before beginning today’s study mission.";
let recommendation=
"Brain training prepares focus, memory and reaction speed for the study session.";
let actionLabel="Start Brain Training";
let actionRoute="/brain-trainer";
let actionIcon="🧠";

if(brainCompleted&&revisionDue.length){
eyebrow="Priority Alert";
status="Revision Due";
statusVariant="danger";
title=`${revisionDue.length} revision${revisionDue.length===1?"":"s"} require attention`;
instruction=
"Complete the pending revisions first, then continue today’s active mission.";
recommendation=
"Clearing revision backlog protects retention and keeps future missions manageable.";
actionLabel="Open Revision";
actionRoute="/revision";
actionIcon="🔄";
}else if(brainCompleted&&missionTopic){
eyebrow="Today’s Mission";
status="Mission Ready";
statusVariant="success";
title=`Continue ${missionTopic.name}`;
instruction=
`Proceed with ${subjectNames[missionTopic.subject]||missionTopic.subject} and complete the ${stageNames[activeStage]||activeStage} stage.`;
recommendation=
"Complete each stage in order and analyze mistakes before unlocking the next step.";
actionLabel="Continue Mission";
actionRoute=
`/topic/${missionTopic.id}/${routeStageIds[activeStage]||activeStage}`;
actionIcon="🎯";
}else if(brainCompleted){
eyebrow="Mission Complete";
status="All Clear";
statusVariant="success";
title="Today’s primary mission is complete";
instruction=
"Review mistakes, organize notes and protect your study streak before closing the day.";
recommendation=
"Use the remaining time for light revision instead of starting an unrelated new topic.";
actionLabel="Review Progress";
actionRoute="/analytics";
actionIcon="📊";
}

return(
<GlassCard
hover
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"/>

<div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
<div className="max-w-3xl">
<div className="flex flex-wrap items-center gap-3">
<Badge variant="primary" dot>
Sentinel Mentor
</Badge>

<Badge variant={statusVariant}>
{status}
</Badge>
</div>

<p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-violet-400">
{eyebrow}
</p>

<h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
{title}
</h2>

<p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
{instruction}
</p>
</div>

<div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-5xl shadow-[0_24px_70px_rgba(124,58,237,0.35)]">
🤖
</div>
</div>

<div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
<div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
<div className="flex items-start gap-4">
<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-2xl">
💡
</div>

<div>
<p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
Sentinel Recommendation
</p>

<p className="mt-2 text-sm leading-7 text-zinc-300">
{recommendation}
</p>
</div>
</div>
</div>

<Button
size="lg"
leftIcon={actionIcon}
rightIcon="→"
onClick={()=>navigate(actionRoute)}
className="min-w-[220px] self-stretch"
>
{actionLabel}
</Button>
</div>

<div className="mt-6 grid gap-3 sm:grid-cols-3">
<InsightItem
label="Brain Status"
value={brainCompleted?"Completed":"Pending"}
accent={brainCompleted?"emerald":"amber"}
/>

<InsightItem
label="Revision Queue"
value={revisionDue.length}
accent={revisionDue.length?"rose":"emerald"}
/>

<InsightItem
label="Active Stage"
value={
missionTopic
?stageNames[activeStage]||activeStage
:"None"
}
accent="violet"
/>
</div>

<div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
<p className="text-xs leading-6 text-zinc-500">
Required sequence: Learn → Concept Check → Level 1 → Level 2 → Level 3 → Topic Test → PYQ → Revision.
</p>
</div>
</div>
</GlassCard>
);
}

function InsightItem({
label,
value,
accent="violet"
}){
const accents={
violet:"text-violet-300",
emerald:"text-emerald-300",
amber:"text-amber-300",
rose:"text-rose-300"
};

return(
<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
<p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
{label}
</p>

<p className={`mt-2 text-lg font-black ${
accents[accent]||accents.violet
}`}>
{value}
</p>
</div>
);
}