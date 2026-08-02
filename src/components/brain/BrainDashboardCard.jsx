const safeNumber=value=>{
const number=Number(value);
return Number.isFinite(number)?Math.max(0,number):0;
};

export default function BrainDashboardCard({
completed=false,
score=0,
accuracy=0,
gamesCompleted=0,
totalGames=5,
xpEarned=0,
onOpen
}){
const safeCompletedGames=safeNumber(gamesCompleted);
const safeTotalGames=Math.max(1,safeNumber(totalGames)||5);
const progress=Math.min(
100,
Math.round(safeCompletedGames/safeTotalGames*100)
);

return(
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<div className="flex items-start justify-between gap-4">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
Today&apos;s Brain
</p>

<h2 className="mt-2 text-2xl font-bold">
{completed?"Completed":"Pending"}
</h2>

<p className="mt-2 text-sm text-zinc-400">
{completed
?"Daily cognitive warm-up finished."
:"Complete the Brain Trainer before starting your main study session."}
</p>
</div>

<div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
completed
?"bg-emerald-500/10"
:"bg-violet-500/10"
}`}>
{completed?"✅":"🧠"}
</div>
</div>

<div className="mt-6 grid grid-cols-2 gap-4">
<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs uppercase tracking-wider text-zinc-500">
Score
</p>

<p className="mt-2 text-2xl font-bold">
{safeNumber(score)}
</p>
</div>

<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs uppercase tracking-wider text-zinc-500">
Accuracy
</p>

<p className="mt-2 text-2xl font-bold text-violet-400">
{safeNumber(accuracy)}%
</p>
</div>

<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs uppercase tracking-wider text-zinc-500">
Games
</p>

<p className="mt-2 text-2xl font-bold">
{safeCompletedGames}/{safeTotalGames}
</p>
</div>

<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs uppercase tracking-wider text-zinc-500">
XP
</p>

<p className="mt-2 text-2xl font-bold text-emerald-400">
+{safeNumber(xpEarned)}
</p>
</div>
</div>

<div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800">
<div
className="h-full rounded-full bg-violet-500 transition-all duration-500"
style={{width:`${progress}%`}}
/>
</div>

<button
type="button"
onClick={()=>onOpen?.()}
className="mt-5 w-full rounded-2xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500"
>
{completed?"View Brain Results":"Start Brain Trainer"}
</button>
</div>
);
}