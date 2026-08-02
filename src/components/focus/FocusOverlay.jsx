import {X,Pause,Play,Square,Shield,Target,Clock3} from "lucide-react";
import {formatTime,getProgress} from "../../engine/timer/timerEngine";

export default function FocusOverlay({
open,
timer,
task="Focus Session",
subject="SSC CGL",
onPause,
onResume,
onStop
}){
if(!open)return null;

const progress=getProgress(timer);
const remainingMinutes=Math.ceil(timer.remaining/60);

return(
<div className="fixed inset-0 z-[9999] overflow-hidden bg-zinc-950 text-white">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_32%),linear-gradient(to_bottom,#09090b,#020617)]"/>
<div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]"/>
<div className="absolute bottom-[-14rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-blue-600/10 blur-[120px]"/>

<div className="absolute inset-0 opacity-30">
<div className="absolute left-[8%] top-[18%] h-1 w-1 animate-pulse rounded-full bg-cyan-300"/>
<div className="absolute left-[20%] top-[72%] h-1.5 w-1.5 animate-pulse rounded-full bg-blue-300"/>
<div className="absolute right-[18%] top-[28%] h-1 w-1 animate-pulse rounded-full bg-cyan-200"/>
<div className="absolute right-[9%] bottom-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-blue-200"/>
<div className="absolute left-[42%] top-[10%] h-1 w-1 animate-pulse rounded-full bg-white"/>
</div>

<div className="relative z-10 flex min-h-screen flex-col p-5 sm:p-8">
<header className="flex items-start justify-between gap-4">
<div>
<div className="flex items-center gap-3">
<div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.16)]">
<Shield size={22}/>
</div>
<div>
<h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">SSC Sentinel</h1>
<p className="text-sm text-zinc-500">Deep Focus Protocol Active</p>
</div>
</div>
</div>

<button
type="button"
onClick={onStop}
className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 transition-all duration-300 hover:scale-105 hover:border-red-400/40 hover:bg-red-500/20 active:scale-95"
aria-label="Close focus mode"
>
<X size={21}/>
</button>
</header>

<main className="flex flex-1 items-center justify-center py-10">
<div className="w-full max-w-5xl">
<div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
<div className="flex flex-col items-center">
<div className="relative flex h-[290px] w-[290px] items-center justify-center sm:h-[390px] sm:w-[390px]">
<div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl"/>
<div
className={`absolute inset-0 rounded-full transition-all duration-700 ${
timer.running?"animate-pulse":""
}`}
style={{
background:`conic-gradient(rgb(34 211 238) ${progress}%,rgb(39 39 42) ${progress}%)`
}}
/>
<div className="absolute inset-[10px] rounded-full bg-zinc-950"/>
<div className="absolute inset-[22px] rounded-full border border-white/5 bg-[radial-gradient(circle,rgba(6,182,212,0.10),rgba(9,9,11,0.98)_68%)]"/>
<div className="absolute inset-[34px] rounded-full border border-cyan-400/10"/>
<div className="relative text-center">
<p className="text-6xl font-black tracking-[-0.05em] text-white sm:text-8xl">
{formatTime(timer.remaining)}
</p>
<p className="mt-4 text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">
{timer.completed?"Session Complete":timer.running?"Focus Locked":"Session Paused"}
</p>
<p className="mt-3 text-sm text-zinc-500">
{Math.round(progress)}% completed
</p>
</div>
</div>

<div className="mt-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-zinc-800/80">
<div
className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
style={{width:`${progress}%`}}
/>
</div>

<div className="mt-8 flex flex-wrap justify-center gap-4">
{timer.running?(
<button
type="button"
onClick={onPause}
className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-4 text-base font-bold text-white shadow-[0_14px_38px_rgba(245,158,11,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(245,158,11,0.34)] active:scale-95"
>
<Pause size={20}/>
Pause Session
</button>
):(
<button
type="button"
onClick={onResume}
className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-4 text-base font-bold text-white shadow-[0_14px_38px_rgba(16,185,129,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(16,185,129,0.34)] active:scale-95"
>
<Play size={20}/>
Resume Session
</button>
)}

<button
type="button"
onClick={onStop}
className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-7 py-4 text-base font-bold text-red-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/40 hover:bg-red-500/20 active:scale-95"
>
<Square size={19}/>
End Session
</button>
</div>
</div>

<aside className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.42)]">
<p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
Current Mission
</p>
<h2 className="mt-3 text-2xl font-bold text-white">
{task}
</h2>
<p className="mt-2 text-zinc-500">
{subject}
</p>

<div className="mt-8 space-y-3">
<div className="flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-950/70 p-4">
<div className="flex items-center gap-3">
<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
<Target size={19}/>
</div>
<div>
<p className="text-xs text-zinc-500">Progress</p>
<p className="font-bold text-white">{Math.round(progress)}%</p>
</div>
</div>
</div>

<div className="flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-950/70 p-4">
<div className="flex items-center gap-3">
<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
<Clock3 size={19}/>
</div>
<div>
<p className="text-xs text-zinc-500">Time Remaining</p>
<p className="font-bold text-white">{remainingMinutes} min</p>
</div>
</div>
</div>
</div>

<div className="mt-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06] p-4">
<p className="text-sm leading-6 text-zinc-300">
Stay on this session. Ignore distractions. Every completed focus block moves you closer to your SSC goal.
</p>
</div>

<div className="mt-6 flex items-center justify-between text-xs text-zinc-600">
<span>Sentinel Focus Engine</span>
<span>Do not disturb</span>
</div>
</aside>
</div>
</div>
</main>
</div>
</div>
);
}