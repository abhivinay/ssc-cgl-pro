import{useMemo}from"react";
import{useStudy}from"../context/StudyContext";
import useXP from"../hooks/useXP";
import Page from"../components/ui/Page";
import GlassCard from"../components/ui/GlassCard";
import StatsCard from"../components/dashboard/StatsCard";
import AchievementCard from"../components/dashboard/AchievementCard";
import ProgressBar from"../components/ui/ProgressBar";
import Badge from"../components/ui/Badge";

const formatMinutes=minutes=>{
const value=Math.max(0,Number(minutes)||0);
const hours=Math.floor(value/60);
const remaining=value%60;

if(!hours)return`${remaining}m`;
if(!remaining)return`${hours}h`;

return`${hours}h ${remaining}m`;
};

const formatDate=value=>{
const date=new Date(value);

if(Number.isNaN(date.getTime())){
return"Unknown date";
}

return date.toLocaleDateString(undefined,{
day:"numeric",
month:"short",
year:"numeric"
});
};

export default function Progress(){
const{studyState,dashboard}=useStudy();

const{
totalXP,
level,
currentLevelXP,
xpToNextLevel,
history
}=useXP();

const topics=Array.isArray(studyState.topics)
?studyState.topics
:[];

const activities=Array.isArray(studyState.activity)
?studyState.activity
:[];

const completedTopics=topics.filter(
topic=>topic.completed
).length;

const totalTopics=topics.length;

const overallProgress=totalTopics
?Math.round(
topics.reduce(
(total,topic)=>
total+(Number(topic.progress)||0),
0
)/totalTopics
)
:0;

const currentStreak=Math.max(
0,
Number(dashboard.streak)||0
);

const bestStreak=Math.max(
currentStreak,
Number(studyState.bestStreak)||0
);

const totalStudyMinutes=Math.max(
0,
Number(
studyState.totalStudyTime??
dashboard.totalStudyMinutes
)||0
);

const achievements=useMemo(()=>{
const brainCompleted=Boolean(
studyState.brainTrainerCompleted
);

return[
{
title:"First Mission",
description:"Complete your first study topic.",
icon:"🎯",
progress:completedTopics>0?100:0,
unlocked:completedTopics>0,
color:"emerald"
},
{
title:"7 Day Streak",
description:"Study for seven consecutive days.",
icon:"🔥",
progress:Math.min(
100,
Math.round(currentStreak/7*100)
),
unlocked:currentStreak>=7,
color:"amber"
},
{
title:"1000 XP Club",
description:"Earn 1000 total XP.",
icon:"⚡",
progress:Math.min(
100,
Math.round(totalXP/1000*100)
),
unlocked:totalXP>=1000,
color:"violet"
},
{
title:"Brain Activated",
description:"Complete a Brain Trainer session.",
icon:"🧠",
progress:brainCompleted?100:0,
unlocked:brainCompleted,
color:"cyan"
},
{
title:"Syllabus Explorer",
description:"Complete 25% of the syllabus.",
icon:"📚",
progress:Math.min(
100,
Math.round(overallProgress/25*100)
),
unlocked:overallProgress>=25,
color:"emerald"
},
{
title:"Consistency Master",
description:"Reach a 30-day study streak.",
icon:"🏆",
progress:Math.min(
100,
Math.round(currentStreak/30*100)
),
unlocked:currentStreak>=30,
color:"amber"
}
];
},[
completedTopics,
currentStreak,
totalXP,
studyState.brainTrainerCompleted,
overallProgress
]);

const unlockedAchievements=achievements.filter(
item=>item.unlocked
).length;

const recentHistory=Array.isArray(history)
?history.slice(0,8)
:[];

const milestones=[
{
title:"Level 5",
description:"Build a strong preparation foundation.",
target:5,
current:level,
icon:"⭐"
},
{
title:"2500 XP",
description:"Maintain consistent daily execution.",
target:2500,
current:totalXP,
icon:"⚡"
},
{
title:"50% Syllabus",
description:"Complete half of the SSC syllabus.",
target:50,
current:overallProgress,
icon:"📚"
},
{
title:"30 Day Streak",
description:"Create an unstoppable study habit.",
target:30,
current:currentStreak,
icon:"🔥"
}
];

return(
<div className="relative min-h-full overflow-hidden">
<div className="pointer-events-none fixed inset-0 -z-20 bg-zinc-950"/>

<div
className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025]"
style={{
backgroundImage:
"linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",
backgroundSize:"42px 42px"
}}
/>

<div className="pointer-events-none fixed -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-violet-600/15 blur-[150px]"/>

<div className="pointer-events-none fixed right-[-180px] top-[22%] -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[150px]"/>

<Page className="relative py-2">
<header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_100px_rgba(0,0,0,.35)] backdrop-blur-xl md:p-8">
<div className="relative flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
<div className="max-w-3xl">
<div className="flex flex-wrap items-center gap-3">
<Badge variant="warning" dot>
Progress Center
</Badge>

<Badge variant="primary">
Sentinel Rank
</Badge>
</div>

<h1 className="mt-6 text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
Your Preparation{" "}
<span className="bg-gradient-to-r from-amber-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
Journey
</span>
</h1>

<p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
Track your XP, levels, milestones, achievements and long-term consistency.
</p>
</div>

<div className="flex w-full max-w-sm items-center gap-4 rounded-3xl border border-amber-400/15 bg-amber-500/[0.06] p-4">
<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-500/10 text-3xl">
🏆
</div>

<div>
<p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
Current Rank
</p>

<p className="mt-1 text-3xl font-black text-amber-300">
Level {level}
</p>

<p className="mt-1 text-xs text-zinc-500">
{xpToNextLevel} XP to next rank
</p>
</div>
</div>
</div>
</header>

<section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<StatsCard
title="Total XP"
value={totalXP}
subtitle="Lifetime XP earned"
icon="⚡"
accent="violet"
/>

<StatsCard
title="Current Level"
value={level}
subtitle={`${currentLevelXP}/100 XP progress`}
icon="🏆"
accent="amber"
/>

<StatsCard
title="Current Streak"
value={`${currentStreak} Days`}
subtitle={`Best streak: ${bestStreak} days`}
icon="🔥"
accent="amber"
/>

<StatsCard
title="Achievements"
value={`${unlockedAchievements}/${achievements.length}`}
subtitle="Milestones unlocked"
icon="🎖️"
accent="emerald"
/>
</section>

<section className="mt-6 grid items-start gap-6 xl:grid-cols-[.8fr_1.2fr]">
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl"/>

<div className="relative p-6 md:p-8">
<Badge variant="primary" dot>
XP Journey
</Badge>

<div className="mt-5 flex items-end justify-between gap-4">
<div>
<p className="text-sm font-medium text-zinc-400">
Current Level
</p>

<h2 className="mt-2 text-7xl font-black tracking-tight text-white">
{level}
</h2>
</div>

<div className="text-right">
<p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
Current XP
</p>

<p className="mt-2 text-3xl font-black text-violet-300">
{currentLevelXP}/100
</p>
</div>
</div>

<div className="mt-8">
<ProgressBar
value={currentLevelXP}
variant="primary"
size="lg"
showValue
label={`Progress to Level ${level+1}`}
/>
</div>

<div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-5">
<div className="flex items-center justify-between gap-4">
<div>
<p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
Lifetime XP
</p>

<p className="mt-2 text-3xl font-black text-white">
{totalXP}
</p>
</div>

<div className="text-5xl">
⚡
</div>
</div>
</div>
</div>
</GlassCard>

<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="relative p-6 md:p-8">
<div className="flex flex-wrap items-start justify-between gap-4">
<div>
<Badge variant="success" dot>
Preparation Growth
</Badge>

<h2 className="mt-4 text-3xl font-black tracking-tight">
Overall Completion
</h2>

<p className="mt-2 text-sm text-zinc-400">
Your progress across the complete SSC syllabus.
</p>
</div>

<p className="text-5xl font-black text-emerald-300">
{overallProgress}%
</p>
</div>

<div className="mt-8">
<ProgressBar
value={overallProgress}
variant="success"
size="lg"
showValue
label={`${completedTopics}/${totalTopics} topics completed`}
/>
</div>

<div className="mt-8 grid gap-4 sm:grid-cols-3">
<MiniStat
label="Completed Topics"
value={completedTopics}
icon="✅"
accent="emerald"
/>

<MiniStat
label="Total Topics"
value={totalTopics}
icon="📚"
accent="sky"
/>

<MiniStat
label="Total Study"
value={formatMinutes(totalStudyMinutes)}
icon="⏱️"
accent="violet"
/>
</div>
</div>
</GlassCard>
</section>

<section className="mt-6">
<AchievementCard items={achievements}/>
</section>

<section className="mt-6 grid items-start gap-6 xl:grid-cols-2">
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="relative p-6 md:p-8">
<Badge variant="warning" dot>
Milestones
</Badge>

<h2 className="mt-4 text-3xl font-black tracking-tight">
Next Targets
</h2>

<p className="mt-2 text-sm text-zinc-400">
Major checkpoints in your preparation journey.
</p>

<div className="mt-8 space-y-4">
{milestones.map(item=>{
const progress=Math.min(
100,
Math.round(item.current/item.target*100)
);

return(
<div
key={item.title}
className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
>
<div className="flex items-start justify-between gap-4">
<div className="flex items-center gap-4">
<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-500/10 text-2xl">
{item.icon}
</div>

<div>
<p className="font-black text-white">
{item.title}
</p>

<p className="mt-1 text-xs text-zinc-500">
{item.description}
</p>
</div>
</div>

<p className="text-lg font-black text-amber-300">
{progress}%
</p>
</div>

<div className="mt-4">
<ProgressBar
value={progress}
variant="warning"
size="sm"
/>
</div>
</div>
);
})}
</div>
</div>
</GlassCard>

<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="relative p-6 md:p-8">
<Badge variant="info" dot>
Recent Rewards
</Badge>

<h2 className="mt-4 text-3xl font-black tracking-tight">
XP History
</h2>

<p className="mt-2 text-sm text-zinc-400">
Your latest earned rewards and progress updates.
</p>

<div className="mt-8 space-y-3">
{recentHistory.length?(
recentHistory.map((item,index)=>(
<div
key={item.id||`${item.date}-${index}`}
className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
>
<div className="flex min-w-0 items-center gap-4">
<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-xl">
⚡
</div>

<div className="min-w-0">
<p className="truncate font-bold text-white">
{item.reason||
item.title||
item.label||
"XP Reward"}
</p>

<p className="mt-1 text-xs text-zinc-500">
{formatDate(
item.date||
item.createdAt||
item.timestamp
)}
</p>
</div>
</div>

<p className="shrink-0 font-black text-violet-300">
+{Number(
item.xp??
item.amount??
item.value
)||0} XP
</p>
</div>
))
):(
<div className="rounded-3xl border border-dashed border-zinc-700 p-10 text-center">
<p className="text-5xl">
🎁
</p>

<h3 className="mt-4 text-xl font-black">
No rewards yet
</h3>

<p className="mt-2 text-sm text-zinc-500">
Complete study activities to start earning XP.
</p>
</div>
)}
</div>
</div>
</GlassCard>
</section>

<section className="mt-6">
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="relative p-6 md:p-8">
<div className="flex flex-wrap items-start justify-between gap-4">
<div>
<Badge variant="primary" dot>
Activity Timeline
</Badge>

<h2 className="mt-4 text-3xl font-black tracking-tight">
Recent Progress
</h2>

<p className="mt-2 text-sm text-zinc-400">
Latest recorded actions across your preparation.
</p>
</div>

<p className="text-sm font-bold text-zinc-500">
{activities.length} total activities
</p>
</div>

<div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
{activities.slice(0,6).map((activity,index)=>(
<div
key={activity.id||`${activity.date}-${index}`}
className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
>
<div className="flex items-start justify-between gap-4">
<div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-xl">
📌
</div>

<span className="text-xs font-semibold text-zinc-600">
{formatDate(activity.date)}
</span>
</div>

<p className="mt-5 font-black text-white">
{activity.title||
activity.text||
activity.type||
"Study Activity"}
</p>

<p className="mt-2 text-sm text-zinc-500">
Progress recorded successfully.
</p>
</div>
))}

{!activities.length&&(
<div className="col-span-full rounded-3xl border border-dashed border-zinc-700 p-10 text-center">
<p className="text-5xl">
🛰️
</p>

<h3 className="mt-4 text-xl font-black">
No activity recorded
</h3>

<p className="mt-2 text-sm text-zinc-500">
Complete your first mission to begin the timeline.
</p>
</div>
)}
</div>
</div>
</GlassCard>
</section>
</Page>
</div>
);
}

function MiniStat({
label,
value,
icon,
accent
}){
const colors={
emerald:"text-emerald-300",
sky:"text-sky-300",
violet:"text-violet-300"
};

return(
<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
<div className="flex items-center justify-between gap-3">
<p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
{label}
</p>

<span className="text-xl">
{icon}
</span>
</div>

<p className={`mt-3 text-2xl font-black ${
colors[accent]||colors.violet
}`}>
{value}
</p>
</div>
);
}