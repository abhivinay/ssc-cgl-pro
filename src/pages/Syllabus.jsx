import {useMemo,useState} from "react";
import {useNavigate} from "react-router-dom";
import {useStudy} from "../context/StudyContext";

const SUBJECTS=[
{id:"quant",name:"Quantitative Aptitude",short:"Quant",icon:"➗"},
{id:"reasoning",name:"General Intelligence & Reasoning",short:"Reasoning",icon:"🧩"},
{id:"english",name:"English Comprehension",short:"English",icon:"📝"},
{id:"gk",name:"General Awareness",short:"General Awareness",icon:"🌍"}
];

const STAGE_META={
learn:{name:"Learn",short:"Learn"},
conceptCheck:{name:"Concept Check",short:"Concept"},
level1:{name:"Level 1",short:"L1"},
level2:{name:"Level 2",short:"L2"},
level3:{name:"Level 3",short:"L3"},
topicTest:{name:"Topic Test",short:"Test"},
pyq:{name:"PYQ",short:"PYQ"},
revision:{name:"Revision",short:"Revise"}
};

const difficultyNames={1:"Easy",2:"Moderate",3:"Hard",4:"Advanced",5:"Expert"};

const getWeightageLabel=weightage=>{
const value=Number(weightage)||0;
if(value>=5)return "Very High";
if(value>=4)return "High";
if(value>=3)return "Medium";
return "Low";
};

const getTopicProgress=(topic,stages)=>{
if(topic.completed)return 100;
const completed=stages.filter(stage=>Boolean(topic.stages?.[stage])).length;
return Math.round(completed/stages.length*100);
};

const getEarnedXP=(topic,stages,stageXP)=>stages.reduce((total,stage)=>total+(topic.stages?.[stage]?(Number(stageXP?.[stage])||0):0),0);

const getStageStatus=(topic,stage,index,stages)=>{
if(topic.stages?.[stage]||topic.completed)return "completed";
if(!topic.unlocked)return "locked";
if(index===0)return "active";
return topic.stages?.[stages[index-1]]?"active":"locked";
};

const formatDueDate=value=>{
const date=new Date(value);
if(Number.isNaN(date.getTime()))return "Due";
return date.toLocaleDateString("en-IN",{day:"numeric",month:"short"});
};

function StatCard({label,value,subtext,icon}){
return(
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<div className="flex items-start justify-between gap-4">
<div>
<p className="text-sm text-zinc-500">{label}</p>
<p className="mt-2 text-3xl font-bold text-white">{value}</p>
{subtext&&<p className="mt-1 text-xs text-zinc-500">{subtext}</p>}
</div>
<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-800 text-xl">{icon}</div>
</div>
</div>
);
}

function SubjectSummary({subject,topics,stages,isActive,onClick}){
const progress=topics.length?Math.round(topics.reduce((sum,topic)=>sum+getTopicProgress(topic,stages),0)/topics.length):0;
const completed=topics.filter(topic=>topic.completed).length;

return(
<button type="button" onClick={onClick} className={`w-full rounded-3xl border p-5 text-left transition ${isActive?"border-emerald-500/40 bg-emerald-500/10":"border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/70"}`}>
<div className="flex items-center justify-between gap-4">
<div className="flex min-w-0 items-center gap-3">
<div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl ${isActive?"bg-emerald-500/15":"bg-zinc-800"}`}>{subject.icon}</div>
<div className="min-w-0">
<p className="truncate font-semibold text-white">{subject.short}</p>
<p className="text-xs text-zinc-500">{completed}/{topics.length} completed</p>
</div>
</div>
<p className={`text-2xl font-bold ${isActive?"text-emerald-400":"text-white"}`}>{progress}%</p>
</div>
<div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
<div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{width:`${progress}%`}}/>
</div>
</button>
);
}

function RevisionBadge({revision}){
if(!revision)return null;
return(
<span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
<span>⏰</span>
Revision due {formatDueDate(revision.dueAt)}
</span>
);
}

function TopicCard({topic,revision,stages,stageXP}){
const navigate=useNavigate();
const progress=getTopicProgress(topic,stages);
const earnedXP=getEarnedXP(topic,stages,stageXP);
const completedStages=stages.filter(stage=>topic.stages?.[stage]).length;
const notesCount=Array.isArray(topic.notes)?topic.notes.length:0;
const mistakesCount=Array.isArray(topic.mistakes)?topic.mistakes.length:0;

return(
<article className={`rounded-3xl border p-5 transition sm:p-6 ${topic.completed?"border-emerald-500/30 bg-emerald-500/5":topic.unlocked?"border-zinc-700 bg-zinc-900":"border-zinc-800 bg-zinc-900/50 opacity-60"}`}>
<div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
<div className="min-w-0 flex-1">
<div className="flex flex-wrap items-center gap-2">
<span className={`rounded-full px-3 py-1 text-xs font-semibold ${topic.completed?"bg-emerald-500/15 text-emerald-400":topic.unlocked?"bg-violet-500/15 text-violet-300":"bg-zinc-800 text-zinc-500"}`}>
{topic.completed?"✓ Completed":topic.unlocked?"● Active":"🔒 Locked"}
</span>
{topic.completed&&<span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">Topic Mastered</span>}
<RevisionBadge revision={revision}/>
</div>

<h2 className="mt-4 break-words text-xl font-bold text-white sm:text-2xl">{topic.name}</h2>

<div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:flex sm:flex-wrap">
<span className="rounded-xl bg-zinc-800 px-3 py-2 text-zinc-300">Difficulty: {difficultyNames[Number(topic.difficulty)]||"Moderate"}</span>
<span className="rounded-xl bg-zinc-800 px-3 py-2 text-zinc-300">Weightage: {getWeightageLabel(topic.weightage)}</span>
<span className="rounded-xl bg-zinc-800 px-3 py-2 text-zinc-300">Estimated: {Number(topic.estimatedHours)||0}h</span>
<span className="rounded-xl bg-zinc-800 px-3 py-2 text-zinc-300">XP earned: {earnedXP}</span>
<span className="rounded-xl bg-zinc-800 px-3 py-2 text-zinc-300">Notes: {notesCount}</span>
<span className={`rounded-xl px-3 py-2 ${mistakesCount?"bg-red-500/10 text-red-300":"bg-zinc-800 text-zinc-300"}`}>Mistakes: {mistakesCount}</span>
</div>
</div>

<div className="min-w-[150px] rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 xl:text-right">
<p className="text-3xl font-bold text-white">{progress}%</p>
<p className="mt-1 text-xs text-zinc-500">Topic progress</p>
<p className="mt-3 text-xs text-zinc-400">{completedStages}/{stages.length} stages</p>
</div>
</div>

<div className="mt-5 h-2.5 overflow-hidden rounded-full bg-zinc-800">
<div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{width:`${progress}%`}}/>
</div>

<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
{stages.map((stage,index)=>{
const status=getStageStatus(topic,stage,index,stages);
const completed=status==="completed";
const active=status==="active";
const locked=status==="locked";
const meta=STAGE_META[stage]||{name:stage,short:stage};

return(
<button key={stage} type="button" disabled={locked} onClick={()=>!locked&&navigate(`/topic/${topic.id}/${stage}`)} aria-label={`${meta.name} - ${status}`} className={`min-h-28 rounded-2xl border p-3 text-left transition ${completed?"border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15":active?"border-violet-500/40 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20":"cursor-not-allowed border-zinc-800 bg-zinc-950 text-zinc-600"}`}>
<div className="flex items-center justify-between gap-2">
<span className="text-base">{completed?"✓":active?"●":"🔒"}</span>
<span className="text-[11px]">+{Number(stageXP?.[stage])||0} XP</span>
</div>
<p className="mt-3 text-sm font-semibold leading-tight">{meta.name}</p>
<p className="mt-1 text-[11px] opacity-70">{completed?"Review":active?"Start":"Locked"}</p>
</button>
);
})}
</div>

{topic.completed&&<div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-300">Topic completed. The next topic is unlocked automatically and spaced revisions are scheduled.</div>}
{!topic.unlocked&&<div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-500">Complete the previous topic to unlock this topic.</div>}
</article>
);
}

export default function Syllabus(){
const {studyState,dashboard,stages,stageXP,getRevisionDue}=useStudy();
const [activeSubject,setActiveSubject]=useState("quant");
const [search,setSearch]=useState("");
const [statusFilter,setStatusFilter]=useState("all");

const allTopics=Array.isArray(studyState.topics)?studyState.topics:[];
const stageList=Array.isArray(stages)&&stages.length?stages:Object.keys(STAGE_META);
const revisionsDue=typeof getRevisionDue==="function"?getRevisionDue():dashboard.revisionDue||[];

const revisionMap=useMemo(()=>{
const map=new Map();
revisionsDue.forEach(revision=>{
const key=String(revision.topicId);
if(!map.has(key))map.set(key,revision);
});
return map;
},[revisionsDue]);

const topicsBySubject=useMemo(()=>SUBJECTS.reduce((groups,subject)=>{
groups[subject.id]=allTopics.filter(topic=>topic.subject===subject.id).sort((a,b)=>(Number(a.priority??a.order)||0)-(Number(b.priority??b.order)||0));
return groups;
},{}),[allTopics]);

const subject=SUBJECTS.find(item=>item.id===activeSubject)||SUBJECTS[0];
const subjectTopics=topicsBySubject[activeSubject]||[];

const filteredTopics=useMemo(()=>{
const query=search.trim().toLowerCase();
return subjectTopics.filter(topic=>{
const matchesSearch=!query||String(topic.name||"").toLowerCase().includes(query);
const matchesStatus=statusFilter==="all"||(statusFilter==="active"&&topic.unlocked&&!topic.completed)||(statusFilter==="completed"&&topic.completed)||(statusFilter==="locked"&&!topic.unlocked)||(statusFilter==="revision"&&revisionMap.has(String(topic.id)));
return matchesSearch&&matchesStatus;
});
},[subjectTopics,search,statusFilter,revisionMap]);

const subjectProgress=subjectTopics.length?Math.round(subjectTopics.reduce((sum,topic)=>sum+getTopicProgress(topic,stageList),0)/subjectTopics.length):0;
const subjectCompleted=subjectTopics.filter(topic=>topic.completed).length;
const completedTopics=dashboard.completedTopics;
const remainingTopics=Math.max(0,dashboard.totalTopics-completedTopics);

return(
<div className="mx-auto max-w-7xl pb-12">
<header>
<p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">SSC CGL Syllabus Engine</p>
<h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">Master the complete syllabus</h1>
<p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400 sm:text-base">Complete every topic through eight progressive stages. Each stage unlocks automatically after the previous stage is completed.</p>
</header>

<section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
<StatCard label="Overall Completion" value={`${dashboard.overallProgress}%`} subtext={`${completedTopics}/${dashboard.totalTopics} topics`} icon="📈"/>
<StatCard label="Total XP" value={dashboard.xp} subtext="Earned across all stages" icon="⚡"/>
<StatCard label="Current Level" value={dashboard.level} subtext="Preparation level" icon="🏆"/>
<StatCard label="Current Streak" value={`${dashboard.streak} days`} subtext="Keep studying daily" icon="🔥"/>
<StatCard label="Completed Topics" value={completedTopics} subtext="Topics mastered" icon="✅"/>
<StatCard label="Remaining Topics" value={remainingTopics} subtext="Topics left" icon="📚"/>
</section>

<section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
{SUBJECTS.map(item=>(
<SubjectSummary key={item.id} subject={item} topics={topicsBySubject[item.id]||[]} stages={stageList} isActive={activeSubject===item.id} onClick={()=>setActiveSubject(item.id)}/>
))}
</section>

<section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
<div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
<div>
<p className="text-sm text-zinc-500">{subject.name}</p>
<h2 className="mt-1 text-2xl font-bold text-white">{subjectCompleted}/{subjectTopics.length} topics completed</h2>
</div>
<div className="md:text-right">
<p className="text-3xl font-bold text-emerald-400">{subjectProgress}%</p>
<p className="text-xs text-zinc-500">Subject completion</p>
</div>
</div>
<div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
<div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{width:`${subjectProgress}%`}}/>
</div>
</section>

<section className="mt-6 flex flex-col gap-3 md:flex-row">
<input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder={`Search ${subject.short} topics...`} className="min-w-0 flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"/>
<select value={statusFilter} onChange={event=>setStatusFilter(event.target.value)} className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-white outline-none focus:border-violet-500">
<option value="all">All Topics</option>
<option value="active">Active</option>
<option value="completed">Completed</option>
<option value="locked">Locked</option>
<option value="revision">Revision Due</option>
</select>
</section>

<section className="mt-6 space-y-5">
{filteredTopics.map(topic=><TopicCard key={topic.id} topic={topic} revision={revisionMap.get(String(topic.id))} stages={stageList} stageXP={stageXP}/>)}
{!filteredTopics.length&&(
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">
<p className="text-4xl">🔍</p>
<h2 className="mt-4 text-xl font-semibold text-white">No topics found</h2>
<p className="mt-2 text-zinc-500">Change the search text, subject, or selected filter.</p>
</div>
)}
</section>
</div>
);
}