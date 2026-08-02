import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";

const DEFAULT_ACHIEVEMENTS=[
{
title:"7 Day Streak",
description:"Study for 7 consecutive days.",
icon:"🔥",
progress:100,
unlocked:true,
color:"amber"
},
{
title:"1000 XP Club",
description:"Earn 1000 total XP.",
icon:"⚡",
progress:82,
unlocked:false,
color:"violet"
},
{
title:"Memory Master",
description:"Complete every Brain Trainer game.",
icon:"🧠",
progress:46,
unlocked:false,
color:"cyan"
},
{
title:"PYQ Crusher",
description:"Solve 500 Previous Year Questions.",
icon:"🎯",
progress:65,
unlocked:false,
color:"emerald"
}
];

export default function AchievementCard({
items=DEFAULT_ACHIEVEMENTS
}){

return(

<GlassCard
hover
padding="p-0"
className="relative overflow-hidden"
>

<div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"/>

<div className="relative p-6 md:p-8">

<div className="flex items-center justify-between">

<div>

<Badge
variant="warning"
dot
>
Achievements
</Badge>

<h2 className="mt-4 text-3xl font-black tracking-tight">
Your Journey
</h2>

<p className="mt-2 text-sm text-zinc-400">
Unlock achievements by staying consistent.
</p>

</div>

<div className="text-5xl">
🏆
</div>

</div>

<div className="mt-8 space-y-4">

{items.map((item,index)=>{

const progress=Math.max(
0,
Math.min(
100,
Number(item.progress)||0
)
);

const colors={
amber:"from-amber-500 to-orange-500",
violet:"from-violet-500 to-fuchsia-500",
cyan:"from-cyan-500 to-sky-500",
emerald:"from-emerald-500 to-lime-500"
};

return(

<div
key={index}
className={`group rounded-3xl border p-5 transition duration-300 ${
item.unlocked
?"border-amber-400/20 bg-amber-500/[0.05]"
:"border-white/10 bg-white/[0.03] hover:border-white/20"
}`}
>

<div className="flex items-start gap-4">

<div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${colors[item.color]} text-3xl shadow-lg`}>
{item.icon}
</div>

<div className="flex-1">

<div className="flex items-center justify-between gap-4">

<div>

<h3 className="text-lg font-black text-white">
{item.title}
</h3>

<p className="mt-1 text-sm text-zinc-400">
{item.description}
</p>

</div>

<div>

{item.unlocked?(
<span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
Unlocked
</span>
):(
<span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
Locked
</span>
)}

</div>

</div>

<div className="mt-5">

<div className="mb-2 flex items-center justify-between text-xs">

<span className="font-semibold uppercase tracking-wider text-zinc-500">
Progress
</span>

<span className="font-bold text-zinc-300">
{progress}%
</span>

</div>

<div className="h-2 overflow-hidden rounded-full bg-zinc-800">

<div
className={`h-full rounded-full bg-gradient-to-r ${colors[item.color]} transition-all duration-700`}
style={{
width:`${progress}%`
}}
/>

</div>

</div>

</div>

</div>

</div>

);

})}

</div>

</div>

</GlassCard>

);

}