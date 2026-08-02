export default function StatCard({
label,
value,
icon="✨",
trend,
trendLabel,
accent="violet",
className=""
}){
const accents={
violet:"from-violet-500/15 to-fuchsia-500/5 text-violet-300 border-violet-500/20",
emerald:"from-emerald-500/15 to-cyan-500/5 text-emerald-300 border-emerald-500/20",
amber:"from-amber-500/15 to-orange-500/5 text-amber-300 border-amber-500/20",
sky:"from-sky-500/15 to-indigo-500/5 text-sky-300 border-sky-500/20",
rose:"from-rose-500/15 to-pink-500/5 text-rose-300 border-rose-500/20"
};

return(
<div className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)] ${
accents[accent]||accents.violet
} ${className}`}>
<div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl"/>

<div className="relative flex items-start justify-between gap-4">
<div>
<p className="text-sm font-medium text-zinc-400">
{label}
</p>

<p className="mt-3 text-3xl font-black text-white">
{value}
</p>

{trendLabel&&(
<div className="mt-3 flex items-center gap-2 text-xs font-semibold">
<span className={
Number(trend)>=0
?"text-emerald-400"
:"text-red-400"
}>
{Number(trend)>=0?"↗":"↘"} {Math.abs(Number(trend)||0)}%
</span>

<span className="text-zinc-500">
{trendLabel}
</span>
</div>
)}
</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl shadow-inner">
{icon}
</div>
</div>
</div>
);
}