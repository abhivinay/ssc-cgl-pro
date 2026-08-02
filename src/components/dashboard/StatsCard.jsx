import GlassCard from"../ui/GlassCard";

export default function StatsCard({
title,
value,
subtitle,
icon,
accent="violet",
trend,
className=""
}){

const accents={
violet:{
bg:"from-violet-500/15 via-violet-500/5 to-transparent",
glow:"bg-violet-500/20",
text:"text-violet-300"
},
emerald:{
bg:"from-emerald-500/15 via-emerald-500/5 to-transparent",
glow:"bg-emerald-500/20",
text:"text-emerald-300"
},
amber:{
bg:"from-amber-500/15 via-amber-500/5 to-transparent",
glow:"bg-amber-500/20",
text:"text-amber-300"
},
sky:{
bg:"from-sky-500/15 via-sky-500/5 to-transparent",
glow:"bg-sky-500/20",
text:"text-sky-300"
}
};

const theme=accents[accent]||accents.violet;

return(
<GlassCard
hover
className={`relative overflow-hidden ${className}`}
>

<div className={`absolute inset-0 bg-gradient-to-br ${theme.bg}`}/>

<div className={`absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl ${theme.glow}`}/>

<div className="relative flex items-start justify-between">

<div>

<p className="text-sm font-medium text-zinc-400">
{title}
</p>

<h2 className="mt-4 text-4xl font-black tracking-tight text-white">
{value}
</h2>

{subtitle&&(
<p className="mt-3 text-sm text-zinc-500">
{subtitle}
</p>
)}

{trend&&(
<div className={`mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold ${theme.text}`}>
<span>▲</span>
<span>{trend}</span>
</div>
)}

</div>

{icon&&(
<div className={`relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-3xl backdrop-blur-xl`}>

<div className={`absolute inset-0 rounded-3xl blur-xl ${theme.glow}`}/>

<div className="relative">
{icon}
</div>

</div>
)}

</div>

</GlassCard>
);
}