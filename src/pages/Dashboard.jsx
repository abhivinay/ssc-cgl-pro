import{useStudy}from"../context/StudyContext";
import useXP from"../hooks/useXP";
import MentorCard from"../components/dashboard/MentorCard";
import MissionCard from"../components/dashboard/MissionCard";
import ProgressCard from"../components/dashboard/ProgressCard";
import LevelCard from"../components/dashboard/LevelCard";
import StreakCard from"../components/dashboard/StreakCard";
import StatsCard from"../components/dashboard/StatsCard";
import QuickActions from"../components/dashboard/QuickActions";
import FocusCard from"../components/dashboard/FocusCard";
import Page from"../components/ui/Page";
import Badge from"../components/ui/Badge";

const formatMinutes=minutes=>{
const value=Math.max(0,Number(minutes)||0);
const hours=Math.floor(value/60);
const remaining=value%60;

if(!hours)return`${remaining}m`;
if(!remaining)return`${hours}h`;

return`${hours}h ${remaining}m`;
};

const getGreeting=()=>{
const hour=new Date().getHours();

if(hour<12)return"Good morning";
if(hour<17)return"Good afternoon";
if(hour<21)return"Good evening";

return"Welcome back";
};

const getFormattedDate=()=>new Date().toLocaleDateString(
undefined,
{
weekday:"long",
day:"numeric",
month:"long"
}
);

export default function Dashboard(){
const{
studyState,
dashboard,
dailyMission,
dueRevisions
}=useStudy();

const{
totalXP,
level,
xpToNextLevel
}=useXP();

const userName=studyState.name||"Abhi";

const brainTrainerCompleted=Boolean(
studyState.brainTrainerCompleted
);

const missionItems=Array.isArray(dailyMission)
?dailyMission
:[];

const completedMissionTopics=missionItems.filter(
mission=>mission.completed
).length;

const missionProgress=missionItems.length
?Math.round(
completedMissionTopics/
missionItems.length*
100
)
:0;

return(
<div className="relative min-h-full overflow-hidden">
<div className="pointer-events-none fixed inset-0 -z-20 bg-zinc-950"/>

<div
className="pointer-events-none fixed inset-0 -z-10 opacity-[0.035]"
style={{
backgroundImage:
"linear-gradient(rgba(255,255,255,.16) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.16) 1px,transparent 1px)",
backgroundSize:"42px 42px"
}}
/>

<div className="pointer-events-none fixed -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-violet-600/15 blur-[150px]"/>

<div className="pointer-events-none fixed right-[-180px] top-[18%] -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]"/>

<div className="pointer-events-none fixed bottom-[-220px] left-[32%] -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.07] blur-[160px]"/>

<Page className="relative py-2">
<header className="mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_100px_rgba(0,0,0,.35)] backdrop-blur-xl md:p-8">
<div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"/>

<div className="relative flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
<div className="max-w-3xl">
<div className="flex flex-wrap items-center gap-3">
<Badge variant="primary" dot>
Project Sentinel
</Badge>

<span className="text-sm font-medium text-zinc-500">
{getFormattedDate()}
</span>
</div>

<p className="mt-6 text-xs font-black uppercase tracking-[0.26em] text-violet-400">
SSC Command Center
</p>

<h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
{getGreeting()},{" "}
<span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
{userName}
</span>
</h1>

<p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
Complete today&apos;s priority mission, protect your streak and keep your SSC preparation moving forward.
</p>
</div>

<div className="flex w-full max-w-sm items-center gap-4 rounded-3xl border border-emerald-400/15 bg-emerald-500/[0.06] p-4">
<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-2xl shadow-[0_12px_40px_rgba(16,185,129,.18)]">
🛰️
</div>

<div>
<p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
Sentinel Status
</p>

<p className="mt-1 font-bold text-emerald-300">
Online and mission-ready
</p>

<p className="mt-1 text-xs text-zinc-500">
Systems synchronized
</p>
</div>
</div>
</div>
</header>

<section>
<MentorCard/>
</section>

<section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<StatsCard
title="Total XP"
value={totalXP}
subtitle={`${xpToNextLevel} XP to next level`}
icon="⚡"
accent="violet"
/>

<StatsCard
title="Current Level"
value={level}
subtitle="Sentinel progression rank"
icon="🏆"
accent="amber"
/>

<StatsCard
title="Study Today"
value={formatMinutes(dashboard.studyMinutes)}
subtitle="Focused study recorded"
icon="⏱️"
accent="sky"
/>

<StatsCard
title="Brain Trainer"
value={brainTrainerCompleted?"Complete":"Pending"}
subtitle={
brainTrainerCompleted
?"Study flow unlocked"
:"Complete before studying"
}
icon="🧠"
accent={brainTrainerCompleted?"emerald":"violet"}
/>
</section>

<section className="mt-6 grid items-start gap-6 xl:grid-cols-[1.35fr_.65fr]">
<MissionCard/>
<ProgressCard/>
</section>

<section className="mt-6 grid items-start gap-6 xl:grid-cols-2">
<FocusCard/>
<QuickActions/>
</section>

<section className="mt-6 grid items-start gap-6 xl:grid-cols-2">
<LevelCard/>
<StreakCard/>
</section>

<section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<StatsCard
title="Daily Mission"
value={`${completedMissionTopics}/${missionItems.length}`}
subtitle={`${missionProgress}% completed today`}
icon="🎯"
accent="emerald"
/>

<StatsCard
title="Revision Due"
value={dueRevisions?.length||0}
subtitle="Scheduled revisions waiting"
icon="🔄"
accent={dueRevisions?.length?"amber":"emerald"}
/>

<StatsCard
title="Overall Progress"
value={`${dashboard.overallProgress||0}%`}
subtitle={`${dashboard.completedTopics||0}/${dashboard.totalTopics||0} topics completed`}
icon="📈"
accent="sky"
/>

<StatsCard
title="Study Streak"
value={`${dashboard.streak||0} Days`}
subtitle="Consistency maintained"
icon="🔥"
accent="amber"
/>
</section>

<footer className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/[0.07] bg-white/[0.025] px-6 py-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
<p>
Sentinel is monitoring today&apos;s mission and study progress.
</p>

<p className="font-semibold text-zinc-400">
Mission status:{" "}
<span className="text-emerald-300">
{missionProgress===100?"Complete":"Active"}
</span>
</p>
</footer>
</Page>
</div>
);
}