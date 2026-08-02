import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";
import Button from"../ui/Button";

const clamp=value=>{
const number=Number(value);

if(!Number.isFinite(number)){
return 0;
}

return Math.min(
100,
Math.max(0,Math.round(number))
);
};

export default function LessonFinish({
title="Lesson Complete",
message="You completed this interactive lesson.",
accuracy=0,
xpEarned=0,
timeSpentSeconds=0,
cardsCompleted=0,
totalCards=0,
onRestart,
onContinue
}){
const safeAccuracy=clamp(accuracy);
const safeXP=Math.max(0,Number(xpEarned)||0);
const safeCards=Math.max(0,Number(cardsCompleted)||0);
const safeTotal=Math.max(safeCards,Number(totalCards)||0);

const totalSeconds=Math.max(
0,
Math.round(Number(timeSpentSeconds)||0)
);

const minutes=Math.floor(totalSeconds/60);
const seconds=String(totalSeconds%60).padStart(2,"0");

const grade=
safeAccuracy>=90
?"Excellent"
:safeAccuracy>=75
?"Very Good"
:safeAccuracy>=60
?"Completed"
:"Needs Review";

return(
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"/>

<div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"/>

<div className="relative p-6 text-center md:p-10">
<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 text-5xl shadow-[0_24px_70px_rgba(16,185,129,0.2)]">
🏆
</div>

<div className="mt-6 flex justify-center">
<Badge variant="success" dot>
Lesson Completed
</Badge>
</div>

<h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
{title}
</h2>

<p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
{message}
</p>

<p className="mt-5 text-lg font-black text-emerald-300">
{grade}
</p>

<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<ResultCard
label="Accuracy"
value={`${safeAccuracy}%`}
icon="🎯"
accent="violet"
/>

<ResultCard
label="XP Earned"
value={`+${safeXP}`}
icon="⚡"
accent="amber"
/>

<ResultCard
label="Time Spent"
value={`${minutes}m ${seconds}s`}
icon="⏱️"
accent="sky"
/>

<ResultCard
label="Cards Completed"
value={`${safeCards}/${safeTotal}`}
icon="📚"
accent="emerald"
/>
</div>

<div className="mt-8 rounded-3xl border border-emerald-400/15 bg-emerald-500/[0.05] p-6">
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Next Step
</p>

<p className="mt-2 text-xl font-black text-emerald-300">
Continue to the next learning stage
</p>
</div>

<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
{onRestart&&(
<Button
type="button"
variant="secondary"
size="lg"
onClick={onRestart}
>
Restart Lesson
</Button>
)}

{onContinue&&(
<Button
type="button"
size="lg"
onClick={onContinue}
rightIcon="→"
>
Continue
</Button>
)}
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
amber:
"text-amber-300 border-amber-400/20 bg-amber-500/10",
sky:
"text-sky-300 border-sky-400/20 bg-sky-500/10",
emerald:
"text-emerald-300 border-emerald-400/20 bg-emerald-500/10"
};

return(
<div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left">
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