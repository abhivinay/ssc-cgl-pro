const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)?Math.max(0,number):0;
};

export default function BrainXPCard({
xpEarned=0,
currentLevelXP=0,
xpToNextLevel=500,
level=1
}){
const earned=clamp(xpEarned);
const current=clamp(currentLevelXP);
const target=Math.max(1,clamp(xpToNextLevel)||500);

const progress=Math.min(
100,
Math.max(
0,
Math.round(current/target*100)
)
);

return(
<div className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6">
<div className="flex flex-wrap items-start justify-between gap-4">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">
Brain XP Reward
</p>

<h2 className="mt-2 text-3xl font-bold">
+{earned} XP
</h2>

<p className="mt-2 text-sm text-zinc-400">
Level {Math.max(1,Number(level)||1)} progress
</p>
</div>

<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-4xl">
⚡
</div>
</div>

<div className="mt-6 flex items-center justify-between text-sm">
<span className="text-zinc-500">
{current} XP
</span>

<span className="font-semibold text-zinc-300">
{target} XP
</span>
</div>

<div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
<div
className="h-full rounded-full bg-violet-500 transition-all duration-500"
style={{
width:`${progress}%`
}}
/>
</div>

<p className="mt-3 text-sm text-zinc-500">
{Math.max(0,target-current)} XP needed for the next level.
</p>
</div>
);
}