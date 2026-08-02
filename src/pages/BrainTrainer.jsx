import BrainSession from"../components/brain/BrainSession";
import Page from"../components/ui/Page";
import Badge from"../components/ui/Badge";

export default function BrainTrainer(){
return(
<div className="relative min-h-full overflow-hidden">
<div className="pointer-events-none fixed inset-0 -z-20 bg-zinc-950"/>

<div
className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025]"
style={{
backgroundImage:
"linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",
backgroundSize:"42px 42px"
}}
/>

<div className="pointer-events-none fixed -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-violet-600/15 blur-[150px]"/>

<div className="pointer-events-none fixed right-[-180px] top-[24%] -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]"/>

<div className="pointer-events-none fixed bottom-[-220px] left-[30%] -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.07] blur-[160px]"/>

<Page className="relative py-2">
<header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_100px_rgba(0,0,0,.35)] backdrop-blur-xl md:p-8">
<div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl"/>

<div className="pointer-events-none absolute -bottom-28 left-[35%] h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
<div className="max-w-3xl">
<div className="flex flex-wrap items-center gap-3">
<Badge variant="primary" dot>
Daily Cognitive Warm-Up
</Badge>

<Badge variant="success">
Mission Preparation
</Badge>
</div>

<h1 className="mt-6 text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
Brain{" "}
<span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
Trainer
</span>
</h1>

<p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
Complete today&apos;s focused brain-training session to sharpen memory,
reaction speed, pattern recognition and concentration before beginning
your SSC study mission.
</p>

<div className="mt-6 flex flex-wrap gap-3">
<StatusPill
icon="🎮"
label="5 Daily Games"
/>

<StatusPill
icon="⏱️"
label="About 5 Minutes"
/>

<StatusPill
icon="⚡"
label="XP Reward"
/>

<StatusPill
icon="🔓"
label="Unlock Study Flow"
/>
</div>
</div>

<div className="flex w-full max-w-sm items-center gap-4 rounded-3xl border border-violet-400/15 bg-violet-500/[0.06] p-4">
<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-3xl shadow-[0_16px_50px_rgba(124,58,237,.2)]">
🧠
</div>

<div>
<p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
Training Status
</p>

<p className="mt-1 text-xl font-black text-violet-300">
Ready
</p>

<p className="mt-1 text-xs text-zinc-500">
Start once and complete all games continuously
</p>
</div>
</div>
</div>
</header>

<section className="mt-6">
<BrainSession/>
</section>

<footer className="mt-6 flex flex-col gap-3 rounded-3xl border border-white/[0.07] bg-white/[0.025] px-6 py-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
<p>
Complete the full session without leaving midway for accurate results.
</p>

<p className="font-semibold text-zinc-400">
Sentinel cognitive system:{" "}
<span className="text-emerald-300">
Online
</span>
</p>
</footer>
</Page>
</div>
);
}

function StatusPill({
icon,
label
}){
return(
<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-zinc-300 backdrop-blur-xl">
<span>{icon}</span>
<span>{label}</span>
</div>
);
}