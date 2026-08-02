import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";
import ProgressBar from"../ui/ProgressBar";

const clampPercentage=value=>{
const number=Number(value);

if(!Number.isFinite(number))return 0;

return Math.min(
100,
Math.max(0,Math.round(number))
);
};

export default function BrainProgress({
currentGame=1,
totalGames=5,
gameTitle="Brain Game",
score=0,
correctAnswers=0,
wrongAnswers=0
}){
const safeTotal=Math.max(
1,
Number(totalGames)||1
);

const safeCurrent=Math.min(
safeTotal,
Math.max(1,Number(currentGame)||1)
);

const safeCorrect=Math.max(
0,
Number(correctAnswers)||0
);

const safeWrong=Math.max(
0,
Number(wrongAnswers)||0
);

const safeScore=Math.max(
0,
Number(score)||0
);

const attempts=
safeCorrect+
safeWrong;

const accuracy=attempts
?Math.round(
safeCorrect/
attempts*
100
)
:0;

const completedGames=Math.max(
0,
safeCurrent-1
);

const progress=clampPercentage(
completedGames/
safeTotal*
100
);

return(
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl"/>

<div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
<div>
<div className="flex flex-wrap items-center gap-3">
<Badge
variant="primary"
dot
>
Brain Session
</Badge>

<Badge variant="info">
Game {safeCurrent} of {safeTotal}
</Badge>
</div>

<p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
Current Challenge
</p>

<h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
{gameTitle}
</h2>

<p className="mt-3 text-sm text-zinc-400">
Complete every game to finish today&apos;s cognitive warm-up.
</p>
</div>

<div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-2xl">
🧠
</div>

<div>
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Session Progress
</p>

<p className="mt-1 text-3xl font-black text-violet-300">
{progress}%
</p>
</div>
</div>
</div>

<div className="mt-8">
<ProgressBar
value={progress}
size="lg"
variant="primary"
showValue
label={`${completedGames} of ${safeTotal} games completed`}
/>
</div>

<div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
<MetricCard
label="Session Score"
value={safeScore}
icon="⭐"
accent="violet"
/>

<MetricCard
label="Correct"
value={safeCorrect}
icon="✓"
accent="emerald"
/>

<MetricCard
label="Wrong"
value={safeWrong}
icon="✕"
accent="rose"
/>

<MetricCard
label="Accuracy"
value={`${accuracy}%`}
icon="🎯"
accent="sky"
/>
</div>
</div>
</GlassCard>
);
}

function MetricCard({
label,
value,
icon,
accent
}){
const styles={
violet:{
text:"text-violet-300",
border:"border-violet-400/20",
background:"bg-violet-500/10"
},
emerald:{
text:"text-emerald-300",
border:"border-emerald-400/20",
background:"bg-emerald-500/10"
},
rose:{
text:"text-rose-300",
border:"border-rose-400/20",
background:"bg-rose-500/10"
},
sky:{
text:"text-sky-300",
border:"border-sky-400/20",
background:"bg-sky-500/10"
}
};

const theme=
styles[accent]||
styles.violet;

return(
<div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
<div className="flex items-center justify-between gap-3">
<p className="text-xs font-black uppercase tracking-[0.15em] text-zinc-500">
{label}
</p>

<div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
theme.border
} ${
theme.background
} ${
theme.text
}`}>
{icon}
</div>
</div>

<p className={`mt-4 text-3xl font-black ${
theme.text
}`}>
{value}
</p>
</div>
);
}