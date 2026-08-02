import GlassCard from "../ui/GlassCard";
import {formatTime,getProgress,TIMER_PRESETS} from "../../engine/timer/timerEngine";

export default function TimerCard({
timer,
selectedPreset,
onPresetChange,
onStart,
onPause,
onReset
}){
const progress=getProgress(timer);

return(
<GlassCard glow className="p-6">
<div className="flex flex-wrap items-start justify-between gap-4">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">Focus Timer</p>
<h2 className="mt-2 text-2xl font-bold text-white">
{TIMER_PRESETS[selectedPreset]?.label||"Study Session"}
</h2>
</div>
<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)]">
⏱️
</div>
</div>

<div className="mt-8 flex flex-col items-center">
<div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-zinc-950 shadow-[0_0_60px_rgba(6,182,212,0.12)]">
<div
className={`absolute inset-0 rounded-full transition-all duration-700 ${
timer.running?"animate-pulse":""
}`}
style={{
background:`conic-gradient(rgb(6 182 212) ${progress}%,rgb(39 39 42) ${progress}%)`
}}
/>
<div className="absolute inset-3 rounded-full border border-white/5 bg-zinc-950"/>
<div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08),transparent_65%)]"/>
<div className="relative text-center">
<p className="text-5xl font-bold tracking-tight text-white">
{formatTime(timer.remaining)}
</p>
<p className="mt-2 text-sm font-semibold text-zinc-500">
{timer.completed?"Session Complete":timer.running?"Stay Focused":"Ready"}
</p>
<p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
{Math.round(progress)}% Complete
</p>
</div>
</div>

<div className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
{Object.entries(TIMER_PRESETS).map(([key,preset])=>(
<button
key={key}
type="button"
onClick={()=>onPresetChange(key)}
className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
selectedPreset===key
?"border-cyan-400 bg-cyan-500/15 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.18)]"
:"border-zinc-800 bg-zinc-950/70 text-zinc-400 hover:-translate-y-0.5 hover:border-zinc-600 hover:text-white"
}`}
>
<span className="block">{preset.label}</span>
<span className="mt-1 block text-xs font-medium opacity-60">
{preset.minutes} min
</span>
</button>
))}
</div>

<div className="mt-6 flex flex-wrap justify-center gap-3">
{timer.running?(
<button
type="button"
onClick={onPause}
className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(245,158,11,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(245,158,11,0.35)] active:scale-95"
>
Pause Session
</button>
):(
<button
type="button"
onClick={onStart}
disabled={timer.completed}
className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(6,182,212,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(6,182,212,0.35)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
>
Start Focus Session
</button>
)}

<button
type="button"
onClick={onReset}
className="rounded-2xl border border-zinc-700 bg-zinc-950/60 px-7 py-3 font-semibold text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-900 hover:text-white active:scale-95"
>
Reset
</button>
</div>
</div>
</GlassCard>
);
}