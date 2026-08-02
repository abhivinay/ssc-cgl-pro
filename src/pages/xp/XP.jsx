import {useMemo,useState} from "react";
import XPCard from "../../components/xp/XPCard";
import {addXP,getReward,removeXP} from "../../engine/xp/xpEngine";
import {analyticsManager} from "../../services";

const actions=[
{key:"learn",label:"Complete Learning",icon:"📘"},
{key:"practice",label:"Complete Practice",icon:"✍️"},
{key:"analysis",label:"Analyze Mistakes",icon:"🔍"},
{key:"revision",label:"Complete Revision",icon:"🔁"},
{key:"brainTrainer",label:"Brain Trainer",icon:"🧠"},
{key:"topicTest",label:"Topic Test",icon:"📝"},
{key:"mockTest",label:"Mock Test",icon:"🏆"},
{key:"dailyMission",label:"Daily Mission",icon:"🎯"}
];

export default function XP(){
const initialAnalytics=useMemo(()=>analyticsManager.get(),[]);
const [xp,setXP]=useState(initialAnalytics.totalXP||0);
const [message,setMessage]=useState("");

const saveXP=value=>{
setXP(value);
analyticsManager.update({totalXP:value});
};

const earnXP=action=>{
const result=addXP(xp,action);
const reward=getReward(action);
saveXP(result.totalXP);
analyticsManager.addActivity({
type:"xp",
title:`Earned ${reward} XP`,
description:actions.find(item=>item.key===action)?.label||action,
createdAt:new Date().toISOString()
});
setMessage(`+${reward} XP earned`);
setTimeout(()=>setMessage(""),2000);
};

const deductXP=()=>{
const result=removeXP(xp,50);
saveXP(result.totalXP);
setMessage("-50 XP removed");
setTimeout(()=>setMessage(""),2000);
};

return(
<div className="mx-auto max-w-7xl pb-10">
<div className="mb-8">
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">Progress System</p>
<h1 className="mt-2 text-3xl font-bold text-white">XP & Level</h1>
<p className="mt-2 text-zinc-400">Earn experience by completing study activities and daily missions.</p>
</div>

<div className="grid gap-6 lg:grid-cols-[380px_1fr]">
<XPCard xp={xp}/>

<section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<div className="flex items-center justify-between gap-4">
<div>
<h2 className="text-xl font-bold text-white">XP Rewards</h2>
<p className="mt-1 text-sm text-zinc-400">Test the XP system using study actions.</p>
</div>
{message&&(
<span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-400">
{message}
</span>
)}
</div>

<div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
{actions.map(action=>(
<button
key={action.key}
type="button"
onClick={()=>earnXP(action.key)}
className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-left transition hover:border-violet-500 hover:bg-violet-500/5"
>
<div className="flex items-center gap-3">
<span className="text-2xl">{action.icon}</span>
<div>
<p className="font-semibold text-white">{action.label}</p>
<p className="mt-1 text-sm text-zinc-500">+{getReward(action.key)} XP</p>
</div>
</div>
<span className="text-violet-400">+</span>
</button>
))}
</div>

<div className="mt-6 border-t border-zinc-800 pt-6">
<button
type="button"
onClick={deductXP}
disabled={xp===0}
className="rounded-2xl border border-red-500/30 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
>
Remove 50 XP
</button>
</div>
</section>
</div>
</div>
);
}