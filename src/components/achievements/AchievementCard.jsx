const clampPercentage=value=>{
const number=Number(value);

if(!Number.isFinite(number))return 0;

return Math.min(100,Math.max(0,Math.round(number)));
};

export default function AchievementCard({
achievement
}){
const unlocked=Boolean(achievement?.completed);
const progress=Number(achievement?.progress)||0;
const target=Math.max(1,Number(achievement?.target)||1);
const percentage=clampPercentage(progress/target*100);

return(
<div className={`rounded-3xl border p-5 transition ${
unlocked
?"border-amber-400/30 bg-amber-500/5"
:"border-zinc-800 bg-zinc-900"
}`}>
<div className="flex items-start justify-between gap-4">
<div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
unlocked
?"bg-amber-500/10"
:"bg-zinc-950 grayscale"
}`}>
{achievement?.icon||"🏆"}
</div>

<span className={`rounded-full px-3 py-1 text-xs font-semibold ${
unlocked
?"bg-emerald-500/10 text-emerald-400"
:"bg-zinc-800 text-zinc-500"
}`}>
{unlocked?"Unlocked":"Locked"}
</span>
</div>

<h3 className="mt-4 text-lg font-bold">
{achievement?.title||"Achievement"}
</h3>

<p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">
{achievement?.description||"Complete the required milestone to unlock this achievement."}
</p>

<div className="mt-5">
<div className="mb-2 flex items-center justify-between text-xs">
<span className="text-zinc-500">
Progress
</span>

<span className="font-semibold text-zinc-300">
{Math.min(progress,target)}/{target}
</span>
</div>

<div className="h-2 overflow-hidden rounded-full bg-zinc-800">
<div
className={`h-full rounded-full transition-all duration-500 ${
unlocked
?"bg-amber-400"
:"bg-violet-600"
}`}
style={{
width:`${percentage}%`
}}
/>
</div>
</div>
</div>
);
}