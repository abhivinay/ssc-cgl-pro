export default function ExtractionLog({logs=[]}){
return(
<section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
<h2 className="text-lg font-bold text-white">Extraction Log</h2>

<div className="mt-4 h-64 overflow-y-auto rounded-xl bg-zinc-950 p-3">
{logs.length===0?(
<p className="text-sm text-zinc-500">
No extraction activity yet.
</p>
):(
<div className="space-y-2">
{logs.map(log=>(
<div
key={log.id}
className="flex items-start justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2"
>
<div>
<p className="text-sm font-medium text-white">
{log.message}
</p>

<p className="mt-1 text-xs text-zinc-500">
{log.time}
</p>
</div>

<span
className={`rounded-full px-2 py-1 text-xs font-semibold ${
log.type==="success"
?"bg-emerald-500/15 text-emerald-300"
:log.type==="error"
?"bg-red-500/15 text-red-300"
:"bg-blue-500/15 text-blue-300"
}`}
>
{log.type}
</span>
</div>
))}
</div>
)}
</div>
</section>
);
}