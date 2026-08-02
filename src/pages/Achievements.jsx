import{useMemo,useState}from"react";
import{useStudy}from"../context/StudyContext";
import useXP from"../hooks/useXP";
import useAchievements from"../hooks/useAchievements";
import AchievementGrid from"../components/achievements/AchievementGrid";

const CATEGORIES=[
{value:"all",label:"All"},
{value:"study",label:"Study"},
{value:"xp",label:"XP"},
{value:"level",label:"Level"},
{value:"streak",label:"Streak"},
{value:"revision",label:"Revision"},
{value:"mistakes",label:"Mistakes"},
{value:"brain",label:"Brain Trainer"},
{value:"mock",label:"Mock Tests"}
];

export default function Achievements(){
const{studyState}=useStudy();
const{totalXP,level}=useXP();
const[activeCategory,setActiveCategory]=useState("all");

const stats=useMemo(()=>{
const topics=Array.isArray(studyState.topics)
?studyState.topics
:[];

const revisions=Array.isArray(studyState.revisions)
?studyState.revisions
:[];

const mistakes=topics.reduce(
(total,topic)=>
total+(Array.isArray(topic.mistakes)?topic.mistakes.length:0),
0
);

return{
level,
xp:totalXP,
topicsCompleted:topics.filter(topic=>topic.completed).length,
streak:Number(studyState.streak)||0,
revisionsCompleted:revisions.filter(revision=>revision.completed).length,
mistakesReviewed:mistakes,
brainGamesCompleted:studyState.brainTrainerCompleted?1:0,
mocksCompleted:Number(studyState.mocksCompleted)||0
};
},[
studyState.topics,
studyState.revisions,
studyState.streak,
studyState.brainTrainerCompleted,
studyState.mocksCompleted,
level,
totalXP
]);

const{
achievements,
unlockedCount,
total,
completion
}=useAchievements(stats);

return(
<div className="mx-auto max-w-7xl pb-10">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
Gamification Center
</p>

<h1 className="mt-2 text-4xl font-bold">
Achievements
</h1>

<p className="mt-2 text-zinc-400">
Complete milestones, unlock badges and track your SSC Sentinel journey.
</p>
</div>

<div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm text-zinc-500">
Unlocked
</p>

<p className="mt-3 text-3xl font-bold text-emerald-400">
{unlockedCount}
</p>

<p className="mt-2 text-sm text-zinc-500">
Achievements completed
</p>
</div>

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm text-zinc-500">
Locked
</p>

<p className="mt-3 text-3xl font-bold">
{Math.max(0,total-unlockedCount)}
</p>

<p className="mt-2 text-sm text-zinc-500">
Achievements remaining
</p>
</div>

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm text-zinc-500">
Completion
</p>

<p className="mt-3 text-3xl font-bold text-amber-400">
{completion}%
</p>

<p className="mt-2 text-sm text-zinc-500">
Overall badge progress
</p>
</div>

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm text-zinc-500">
Current Level
</p>

<p className="mt-3 text-3xl font-bold text-violet-400">
{level}
</p>

<p className="mt-2 text-sm text-zinc-500">
{totalXP} total XP earned
</p>
</div>
</div>

<div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<div className="flex flex-wrap gap-2">
{CATEGORIES.map(category=>(
<button
key={category.value}
type="button"
onClick={()=>setActiveCategory(category.value)}
className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
activeCategory===category.value
?"bg-violet-600 text-white"
:"bg-zinc-950 text-zinc-400 hover:text-white"
}`}
>
{category.label}
</button>
))}
</div>
</div>

<div className="mt-8">
<AchievementGrid
achievements={achievements}
activeCategory={activeCategory}
/>
</div>
</div>
);
}