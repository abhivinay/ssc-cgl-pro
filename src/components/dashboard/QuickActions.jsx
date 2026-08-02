import{useNavigate}from"react-router-dom";
import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";

export default function QuickActions(){

const navigate=useNavigate();

const actions=[
{
title:"Continue Mission",
subtitle:"Resume today's active topic",
icon:"🎯",
path:"/missions",
accent:"violet"
},
{
title:"Brain Trainer",
subtitle:"10 minute warm-up",
icon:"🧠",
path:"/brain-trainer",
accent:"emerald"
},
{
title:"Revision",
subtitle:"Complete due revisions",
icon:"📖",
path:"/revision",
accent:"amber"
},
{
title:"Mock Tests",
subtitle:"Practice exam mode",
icon:"📝",
path:"/mock-tests",
accent:"sky"
},
{
title:"Analytics",
subtitle:"View detailed insights",
icon:"📊",
path:"/analytics",
accent:"rose"
},
{
title:"Progress",
subtitle:"XP, streak & achievements",
icon:"🏆",
path:"/progress",
accent:"orange"
}
];

const accentMap={
violet:"from-violet-500/15 to-transparent text-violet-300 border-violet-400/20",
emerald:"from-emerald-500/15 to-transparent text-emerald-300 border-emerald-400/20",
amber:"from-amber-500/15 to-transparent text-amber-300 border-amber-400/20",
sky:"from-sky-500/15 to-transparent text-sky-300 border-sky-400/20",
rose:"from-rose-500/15 to-transparent text-rose-300 border-rose-400/20",
orange:"from-orange-500/15 to-transparent text-orange-300 border-orange-400/20"
};

return(
<GlassCard
hover
padding="p-0"
className="overflow-hidden"
>

<div className="p-6 md:p-8">

<div className="flex items-center justify-between">

<div>

<Badge
variant="primary"
dot
>
Quick Actions
</Badge>

<h2 className="mt-4 text-3xl font-black tracking-tight">
Mission Control
</h2>

<p className="mt-2 text-sm text-zinc-400">
Jump anywhere in a single click.
</p>

</div>

<div className="text-5xl">
🚀
</div>

</div>

<div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

{actions.map(action=>{

const style=accentMap[action.accent];

return(

<button
key={action.title}
type="button"
onClick={()=>navigate(action.path)}
className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left transition duration-300 hover:-translate-y-2 hover:border-white/20"
>

<div className={`absolute inset-0 bg-gradient-to-br ${style.split(" text-")[0]}`}/>

<div className="relative">

<div className={`flex h-14 w-14 items-center justify-center rounded-2xl border bg-white/5 text-3xl ${style.split(" ").slice(-2).join(" ")}`}>
{action.icon}
</div>

<h3 className="mt-5 text-lg font-black text-white">
{action.title}
</h3>

<p className="mt-2 text-sm leading-6 text-zinc-400">
{action.subtitle}
</p>

<div className="mt-6 flex items-center gap-2 font-semibold text-violet-300 opacity-0 transition duration-300 group-hover:opacity-100">
<span>Open</span>
<span>→</span>
</div>

</div>

</button>

);

})}

</div>

</div>

</GlassCard>
);
}