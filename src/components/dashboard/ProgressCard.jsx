import{useStudy}from"../../context/StudyContext";
import useXP from"../../hooks/useXP";
import GlassCard from"../ui/GlassCard";
import ProgressBar from"../ui/ProgressBar";
import Badge from"../ui/Badge";

export default function ProgressCard(){

const{dashboard}=useStudy();

const{
totalXP,
level,
currentLevelXP,
xpToNextLevel
}=useXP();

const revisionDue=Array.isArray(dashboard.revisionDue)
?dashboard.revisionDue
:[];

const progress=Math.max(
0,
Math.min(
100,
Number(dashboard.overallProgress)||0
)
);

const cards=[
{
title:"Overall Progress",
value:`${progress}%`,
subtitle:`${dashboard.completedTopics}/${dashboard.totalTopics} Topics`,
icon:"📚",
accent:"emerald"
},
{
title:"Current Level",
value:level,
subtitle:`${xpToNextLevel} XP Left`,
icon:"🏆",
accent:"amber"
},
{
title:"Total XP",
value:totalXP,
subtitle:`${currentLevelXP}/100 XP`,
icon:"⚡",
accent:"violet"
},
{
title:"Revision Due",
value:revisionDue.length,
subtitle:"Pending Tasks",
icon:"🔄",
accent:"sky"
}
];

const accentMap={
violet:"from-violet-500/15 to-transparent text-violet-300",
emerald:"from-emerald-500/15 to-transparent text-emerald-300",
amber:"from-amber-500/15 to-transparent text-amber-300",
sky:"from-sky-500/15 to-transparent text-sky-300"
};

return(
<GlassCard
hover
padding="p-0"
className="relative overflow-hidden"
>

<div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"/>

<div className="relative p-6 md:p-8">

<div className="flex items-center justify-between">

<div>

<Badge
variant="primary"
dot
>
Mission Progress
</Badge>

<h2 className="mt-4 text-3xl font-black tracking-tight">
Progress Overview
</h2>

<p className="mt-2 text-sm text-zinc-400">
Your overall SSC preparation status.
</p>

</div>

<div className="text-right">

<p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
Completion
</p>

<p className="mt-2 text-5xl font-black text-emerald-300">
{progress}%
</p>

</div>

</div>

<div className="mt-8">

<ProgressBar
value={progress}
variant="success"
size="lg"
showValue
label={`${dashboard.completedTopics}/${dashboard.totalTopics} Topics Completed`}
/>

</div>

<div className="mt-8 grid grid-cols-2 gap-4">

{cards.map(card=>(

<div
key={card.title}
className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20"
>

<div className={`absolute inset-0 bg-gradient-to-br ${accentMap[card.accent].split(" text-")[0]}`}/>

<div className="relative">

<div className="flex items-center justify-between">

<div>

<p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
{card.title}
</p>

<h3 className="mt-3 text-3xl font-black text-white">
{card.value}
</h3>

<p className="mt-2 text-sm text-zinc-400">
{card.subtitle}
</p>

</div>

<div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl ${accentMap[card.accent].split(" ").pop()}`}>
{card.icon}
</div>

</div>

</div>

</div>

))}

</div>

</div>

</GlassCard>
);
}