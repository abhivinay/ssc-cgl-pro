import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";
import ProgressBar from"../ui/ProgressBar";

const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)
?Math.max(0,number)
:0;
};

const formatDuration=seconds=>{
const total=Math.max(
0,
Math.round(Number(seconds)||0)
);

const minutes=Math.floor(total/60);
const remaining=String(total%60).padStart(2,"0");

return`${minutes}m ${remaining}s`;
};

const formatReaction=value=>{
const milliseconds=Math.max(
0,
Number(value)||0
);

if(!milliseconds)return"—";

return`${(milliseconds/1000).toFixed(2)}s`;
};

const getGrade=accuracy=>{
const value=Math.max(
0,
Math.min(100,Number(accuracy)||0)
);

if(value>=95){
return{
grade:"S",
label:"Outstanding",
stars:5,
accent:"violet",
message:"Elite cognitive performance. Your focus and accuracy were exceptional."
};
}

if(value>=90){
return{
grade:"A+",
label:"Excellent",
stars:5,
accent:"emerald",
message:"Excellent session. You maintained strong accuracy across the full training flow."
};
}

if(value>=80){
return{
grade:"A",
label:"Very Good",
stars:4,
accent:"sky",
message:"Strong performance. Your brain warm-up is complete and you are ready to study."
};
}

if(value>=70){
return{
grade:"B",
label:"Good",
stars:3,
accent:"amber",
message:"Good session. A little more consistency will improve your cognitive score."
};
}

if(value>=60){
return{
grade:"C",
label:"Completed",
stars:2,
accent:"orange",
message:"Session completed. Focus on accuracy and avoid rushing in the next attempt."
};
}

return{
grade:"D",
label:"Needs Practice",
stars:1,
accent:"rose",
message:"Training completed. Slow down and prioritize correct answers over speed."
};
};

export default function BrainResult({
session
}){
const results=Array.isArray(session?.results)
?session.results
:[];

const correctAnswers=results.reduce(
(total,item)=>
total+clamp(item?.correctAnswers),
0
);

const wrongAnswers=results.reduce(
(total,item)=>
total+clamp(item?.wrongAnswers),
0
);

const totalAttempts=
correctAnswers+
wrongAnswers;

const accuracy=totalAttempts
?Math.round(
correctAnswers/
totalAttempts*
100
)
:0;

const score=results.reduce(
(total,item)=>
total+clamp(item?.score),
0
);

const xp=results.reduce(
(total,item)=>
total+clamp(item?.xp),
0
);

const validReactionResults=results.filter(
item=>clamp(item?.reactionTime)>0
);

const totalReaction=validReactionResults.reduce(
(total,item)=>
total+clamp(item?.reactionTime),
0
);

const averageReaction=validReactionResults.length
?Math.round(
totalReaction/
validReactionResults.length
)
:0;

const startedAt=Number(session?.startedAt)||0;
const completedAt=Number(session?.completedAt)||0;

const duration=
startedAt&&completedAt
?Math.max(
0,
Math.round(
(completedAt-startedAt)/1000
)
)
:0;

const totalGames=Math.max(
results.length,
Array.isArray(session?.games)
?session.games.length
:0
);

const gradeInfo=getGrade(accuracy);

const accentStyles={
violet:{
text:"text-violet-300",
border:"border-violet-400/20",
background:"bg-violet-500/10",
glow:"bg-violet-500/20"
},
emerald:{
text:"text-emerald-300",
border:"border-emerald-400/20",
background:"bg-emerald-500/10",
glow:"bg-emerald-500/20"
},
sky:{
text:"text-sky-300",
border:"border-sky-400/20",
background:"bg-sky-500/10",
glow:"bg-sky-500/20"
},
amber:{
text:"text-amber-300",
border:"border-amber-400/20",
background:"bg-amber-500/10",
glow:"bg-amber-500/20"
},
orange:{
text:"text-orange-300",
border:"border-orange-400/20",
background:"bg-orange-500/10",
glow:"bg-orange-500/20"
},
rose:{
text:"text-rose-300",
border:"border-rose-400/20",
background:"bg-rose-500/10",
glow:"bg-rose-500/20"
}
};

const theme=
accentStyles[gradeInfo.accent]||
accentStyles.violet;

return(
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className={`absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl ${theme.glow}`}/>

<div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative p-6 md:p-10">
<div className="text-center">
<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 text-5xl shadow-[0_24px_70px_rgba(16,185,129,0.22)]">
🧠
</div>

<div className="mt-6 flex justify-center">
<Badge
variant="success"
dot
>
Session Complete
</Badge>
</div>

<h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
Brain Training Complete
</h2>

<p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
{gradeInfo.message}
</p>

<div className="mt-7 flex items-center justify-center gap-2 text-2xl">
{Array.from(
{length:5},
(_,index)=>(
<span
key={index}
className={
index<gradeInfo.stars
?"text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]"
:"text-zinc-800"
}
>
★
</span>
)
)}
</div>

<div className="mt-6 flex items-end justify-center gap-4">
<p className={`text-7xl font-black tracking-tight ${theme.text}`}>
{gradeInfo.grade}
</p>

<div className="mb-2 text-left">
<p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
Performance Grade
</p>

<p className="mt-1 text-lg font-black text-white">
{gradeInfo.label}
</p>
</div>
</div>
</div>

<div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-5 md:p-6">
<div className="flex flex-wrap items-center justify-between gap-4">
<div>
<p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
Session Accuracy
</p>

<p className={`mt-2 text-4xl font-black ${theme.text}`}>
{accuracy}%
</p>
</div>

<div className="text-right">
<p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
Total Attempts
</p>

<p className="mt-2 text-3xl font-black text-white">
{totalAttempts}
</p>
</div>
</div>

<div className="mt-5">
<ProgressBar
value={accuracy}
size="lg"
variant={
accuracy>=80
?"success"
:accuracy>=60
?"warning"
:"danger"
}
/>
</div>
</div>

<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<ResultCard
label="Games Completed"
value={`${results.length}/${totalGames}`}
icon="🎮"
accent="violet"
/>

<ResultCard
label="Total Score"
value={score}
icon="⭐"
accent="amber"
/>

<ResultCard
label="Accuracy"
value={`${accuracy}%`}
icon="🎯"
accent="emerald"
/>

<ResultCard
label="XP Earned"
value={`+${xp}`}
icon="⚡"
accent="sky"
/>
</div>

<div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<ResultCard
label="Correct Answers"
value={correctAnswers}
icon="✓"
accent="emerald"
/>

<ResultCard
label="Wrong Answers"
value={wrongAnswers}
icon="✕"
accent="rose"
/>

<ResultCard
label="Average Reaction"
value={formatReaction(averageReaction)}
icon="⏱️"
accent="sky"
/>

<ResultCard
label="Completed In"
value={formatDuration(duration)}
icon="🏁"
accent="violet"
/>
</div>

<div className="mt-6 flex flex-col gap-4 rounded-3xl border border-emerald-400/15 bg-emerald-500/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">
<div className="flex items-center gap-4">
<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-2xl">
🔓
</div>

<div>
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Study Flow
</p>

<p className="mt-1 font-black text-emerald-300">
Today&apos;s mission is unlocked
</p>
</div>
</div>

<p className="text-sm font-semibold text-zinc-400">
Cognitive warm-up completed successfully
</p>
</div>
</div>
</GlassCard>
);
}

function ResultCard({
label,
value,
icon,
accent="violet"
}){
const styles={
violet:
"text-violet-300 border-violet-400/20 bg-violet-500/10",
emerald:
"text-emerald-300 border-emerald-400/20 bg-emerald-500/10",
amber:
"text-amber-300 border-amber-400/20 bg-amber-500/10",
sky:
"text-sky-300 border-sky-400/20 bg-sky-500/10",
rose:
"text-rose-300 border-rose-400/20 bg-rose-500/10"
};

return(
<div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20">
<div className="flex items-center justify-between gap-3">
<p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
{label}
</p>

<div className={`flex h-11 w-11 items-center justify-center rounded-xl border text-xl ${
styles[accent]||styles.violet
}`}>
{icon}
</div>
</div>

<p className="mt-4 text-3xl font-black text-white">
{value}
</p>
</div>
);
}