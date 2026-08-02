import{useState}from"react";
import{
addDeveloperXP,
resetDeveloperXP,
unlockAllAchievements,
resetAchievements,
simulatePerfectBrainSession,
simulateFailedBrainSession,
resetBrainTrainer,
clearAllDeveloperData
}from"../../services/developerService";

const ACTION_GROUPS=[
{
title:"Brain Trainer",
actions:[
{
label:"Perfect Session",
action:simulatePerfectBrainSession,
message:"Perfect Brain Trainer session created."
},
{
label:"Failed Session",
action:simulateFailedBrainSession,
message:"Failed Brain Trainer session created."
},
{
label:"Reset Brain Trainer",
action:resetBrainTrainer,
message:"Brain Trainer data reset.",
danger:true
}
]
},
{
title:"XP",
actions:[
{
label:"+100 XP",
action:()=>addDeveloperXP(100),
message:"100 XP added."
},
{
label:"+1000 XP",
action:()=>addDeveloperXP(1000),
message:"1000 XP added."
},
{
label:"+10000 XP",
action:()=>addDeveloperXP(10000),
message:"10000 XP added."
},
{
label:"Reset XP",
action:resetDeveloperXP,
message:"XP reset.",
danger:true
}
]
},
{
title:"Achievements",
actions:[
{
label:"Unlock All",
action:unlockAllAchievements,
message:"All achievements unlocked."
},
{
label:"Reset Achievements",
action:resetAchievements,
message:"Achievements reset.",
danger:true
}
]
},
{
title:"Danger Zone",
actions:[
{
label:"Clear All Local Data",
action:clearAllDeveloperData,
message:"All local data cleared.",
danger:true,
confirm:true
}
]
}
];

export default function TestActions({
onChange
}){
const[message,setMessage]=useState("");

const runAction=item=>{
if(
item.confirm&&
!window.confirm(
"This will clear all SSC Sentinel local data. Continue?"
)
){
return;
}

try{
item.action();
setMessage(item.message);
onChange?.();

if(item.label==="Clear All Local Data"){
setTimeout(()=>{
location.reload();
},500);
}
}catch(error){
console.error(error);
setMessage(
error?.message||
"Developer action failed."
);
}
};

return(
<div className="space-y-6">
{ACTION_GROUPS.map(group=>(
<div key={group.title}>
<h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
{group.title}
</h3>

<div className="mt-3 flex flex-wrap gap-3">
{group.actions.map(item=>(
<button
key={item.label}
type="button"
onClick={()=>runAction(item)}
className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
item.danger
?"border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20"
:"bg-violet-600 text-white hover:bg-violet-500"
}`}
>
{item.label}
</button>
))}
</div>
</div>
))}

{message&&(
<div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-300">
{message}
</div>
)}
</div>
);
}