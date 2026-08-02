export default function AIProgressCard({
stats,
isRunning,
current,
onStart,
onPause,
onResume,
onStop,
onRetryFailed
}){
const total=stats.total||0;
const completed=stats.completed||0;
const failed=stats.failed||0;
const pending=stats.pending||0;
const extracting=stats.extracting||0;
const processed=completed+failed;
const progress=total?Math.round((processed/total)*100):0;
const successRate=processed?Math.round((completed/processed)*100):0;

return(
<section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
<div>
<h2 className="text-xl font-bold text-white">AI Batch Extraction</h2>
<p className="mt-1 text-sm text-zinc-400">
Process remaining PYQ images with Gemini and track progress live.
</p>
</div>

<div className="flex flex-wrap gap-2">
{!isRunning&&pending>0&&processed===0&&(
<button
type="button"
onClick={onStart}
disabled={!total}
className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
>
Start
</button>
)}

{isRunning&&(
<button
type="button"
onClick={onPause}
className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500"
>
Pause
</button>
)}

{!isRunning&&pending>0&&processed>0&&(
<button
type="button"
onClick={onResume}
className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
>
Resume
</button>
)}

{!isRunning&&failed>0&&(
<button
type="button"
onClick={onRetryFailed}
className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
>
Retry Failed ({failed})
</button>
)}

<button
type="button"
onClick={onStop}
disabled={!isRunning&&!extracting}
className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
>
Stop
</button>
</div>
</div>

<div className="mt-5">
<div className="mb-2 flex items-center justify-between text-sm">
<span className="text-zinc-400">
Processed {processed} / {total}
</span>
<span className="font-semibold text-white">{progress}%</span>
</div>

<div className="h-3 overflow-hidden rounded-full bg-zinc-800">
<div
className="h-full rounded-full bg-violet-600 transition-all duration-300"
style={{width:`${progress}%`}}
/>
</div>
</div>

<div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-6">
<div className="rounded-xl bg-zinc-950 p-4">
<p className="text-xs text-zinc-500">Total</p>
<p className="mt-1 text-xl font-bold text-white">{total}</p>
</div>

<div className="rounded-xl bg-zinc-950 p-4">
<p className="text-xs text-zinc-500">Completed</p>
<p className="mt-1 text-xl font-bold text-emerald-300">{completed}</p>
</div>

<div className="rounded-xl bg-zinc-950 p-4">
<p className="text-xs text-zinc-500">Failed</p>
<p className="mt-1 text-xl font-bold text-red-300">{failed}</p>
</div>

<div className="rounded-xl bg-zinc-950 p-4">
<p className="text-xs text-zinc-500">Extracting</p>
<p className="mt-1 text-xl font-bold text-amber-300">{extracting}</p>
</div>

<div className="rounded-xl bg-zinc-950 p-4">
<p className="text-xs text-zinc-500">Pending</p>
<p className="mt-1 text-xl font-bold text-blue-300">{pending}</p>
</div>

<div className="rounded-xl bg-zinc-950 p-4">
<p className="text-xs text-zinc-500">Success Rate</p>
<p className="mt-1 text-xl font-bold text-white">{successRate}%</p>
</div>
</div>

<div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
<p className="text-xs text-zinc-500">Current question</p>
<p className="mt-1 text-sm font-semibold text-white">
{current
?`Question ${current.questionNo||current.id}`
:"No question is currently being processed"}
</p>
</div>
</section>
);
}