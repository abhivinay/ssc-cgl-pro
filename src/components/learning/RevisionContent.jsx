const toArray=value=>Array.isArray(value)?value:[];

const getText=(value,fallback="")=>{
const text=String(value??"").trim();
return text||fallback;
};

export default function RevisionContent({content}){
const revisionPoints=toArray(content?.revision);

return(
<div className="space-y-5">
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
Quick revision sheet
</p>

<h2 className="mt-2 text-3xl font-bold">
Revise the topic in 2 minutes
</h2>

<p className="mt-3 text-sm leading-6 text-zinc-400">
Review the essential points, formulas, rules and common traps before
reattempting questions.
</p>
</div>

<div className="grid gap-4">
{revisionPoints.length?(
revisionPoints.map((item,index)=>(
<div
key={`${String(item)}-${index}`}
className="flex gap-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-5"
>
<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 font-bold text-emerald-400">
{index+1}
</span>

<p className="leading-7 text-zinc-300">
{getText(
item,
"Revision point is not available."
)}
</p>
</div>
))
):(
<div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-center">
<p className="text-4xl">
🔁
</p>

<h3 className="mt-3 text-lg font-bold">
Revision points are not available yet
</h3>

<p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-500">
Add quick revision notes to the topic content source and they will
appear here automatically.
</p>
</div>
)}
</div>

<div className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6">
<h3 className="font-bold text-violet-300">
Final revision rule
</h3>

<p className="mt-2 text-sm leading-6 text-zinc-300">
Reattempt every incorrect question without seeing its answer. Complete
revision only when you can explain the main concept in your own words.
</p>
</div>
</div>
);
}