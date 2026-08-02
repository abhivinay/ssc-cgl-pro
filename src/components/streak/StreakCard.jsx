import {getStreakStatus,isStreakActive} from "../../engine/streak/streakEngine";

const statusText={
"not-started":"Start studying today",
"completed-today":"Completed today",
"at-risk":"Study today to continue",
broken:"Streak broken"
};

export default function StreakCard({streakData={}}){
const currentStreak=Number(streakData.currentStreak)||0;
const bestStreak=Number(streakData.bestStreak)||0;
const status=getStreakStatus(streakData);
const active=isStreakActive(streakData);

return(
<section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<div className="flex items-start justify-between gap-4">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-400">Study Streak</p>
<h2 className="mt-2 text-3xl font-bold text-white">{currentStreak} Days</h2>
<p className={`mt-2 text-sm font-semibold ${active?"text-emerald-400":"text-zinc-500"}`}>
{statusText[status]}
</p>
</div>
<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-3xl">
🔥
</div>
</div>

<div className="mt-6 grid grid-cols-2 gap-3">
<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs uppercase tracking-wide text-zinc-500">Current</p>
<p className="mt-2 text-2xl font-bold text-orange-400">{currentStreak}</p>
</div>
<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs uppercase tracking-wide text-zinc-500">Best</p>
<p className="mt-2 text-2xl font-bold text-amber-400">{bestStreak}</p>
</div>
</div>

<div className="mt-5">
<div className="mb-2 flex items-center justify-between text-sm">
<span className="text-zinc-400">Weekly progress</span>
<span className="font-semibold text-white">{Math.min(currentStreak,7)}/7</span>
</div>
<div className="h-3 overflow-hidden rounded-full bg-zinc-800">
<div
className="h-full rounded-full bg-orange-500 transition-all duration-500"
style={{width:`${Math.min((currentStreak/7)*100,100)}%`}}
/>
</div>
</div>
</section>
);
}