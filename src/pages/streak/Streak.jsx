import {useMemo,useState} from "react";
import StreakCard from "../../components/streak/StreakCard";
import {analyticsManager} from "../../services";
import {resetStreak,updateStreak} from "../../engine/streak/streakEngine";

export default function Streak(){
const initialAnalytics=useMemo(()=>analyticsManager.get(),[]);
const [streakData,setStreakData]=useState(initialAnalytics.streak||{
currentStreak:0,
bestStreak:0,
lastStudyDate:null
});
const [message,setMessage]=useState("");

const saveStreak=value=>{
setStreakData(value);
analyticsManager.update({streak:value});
};

const completeToday=()=>{
const result=updateStreak(streakData);
saveStreak(result);

if(result.updated){
analyticsManager.addActivity({
type:"streak",
title:`${result.currentStreak}-day streak`,
description:"Daily study streak updated",
createdAt:new Date().toISOString()
});
setMessage("Today's study streak completed");
}else{
setMessage("Today's streak is already completed");
}

setTimeout(()=>setMessage(""),2500);
};

const resetCurrentStreak=()=>{
const restored=resetStreak();
saveStreak(restored);
setMessage("Streak reset");
setTimeout(()=>setMessage(""),2500);
};

return(
<div className="mx-auto max-w-7xl pb-10">
<div className="mb-8">
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
Consistency
</p>
<h1 className="mt-2 text-3xl font-bold text-white">Study Streak</h1>
<p className="mt-2 text-zinc-400">
Build consistency by completing at least one study activity every day.
</p>
</div>

<div className="grid gap-6 lg:grid-cols-[380px_1fr]">
<StreakCard streakData={streakData}/>

<section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<div className="flex flex-wrap items-start justify-between gap-4">
<div>
<h2 className="text-xl font-bold text-white">Daily Check-In</h2>
<p className="mt-1 text-sm text-zinc-400">
Complete today's study session to maintain your streak.
</p>
</div>

{message&&(
<span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-400">
{message}
</span>
)}
</div>

<div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
<div className="flex flex-col items-center text-center">
<div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-orange-500/30 bg-orange-500/10 text-4xl">
🔥
</div>
<h3 className="mt-5 text-2xl font-bold text-white">Complete Today's Study</h3>
<p className="mt-2 max-w-lg text-sm leading-6 text-zinc-400">
Your streak updates only once per day. Missing more than one day starts a new streak.
</p>

<button
type="button"
onClick={completeToday}
className="mt-6 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400"
>
Complete Today
</button>
</div>
</div>

<div className="mt-6 grid gap-4 sm:grid-cols-3">
<div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
<p className="text-sm text-zinc-500">Current Streak</p>
<p className="mt-2 text-3xl font-bold text-orange-400">
{streakData.currentStreak||0}
</p>
</div>

<div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
<p className="text-sm text-zinc-500">Best Streak</p>
<p className="mt-2 text-3xl font-bold text-amber-400">
{streakData.bestStreak||0}
</p>
</div>

<div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
<p className="text-sm text-zinc-500">Last Study Date</p>
<p className="mt-2 text-lg font-bold text-white">
{streakData.lastStudyDate||"Not started"}
</p>
</div>
</div>

<div className="mt-6 border-t border-zinc-800 pt-6">
<button
type="button"
onClick={resetCurrentStreak}
className="rounded-2xl border border-red-500/30 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
>
Reset Streak
</button>
</div>
</section>
</div>
</div>
);
}