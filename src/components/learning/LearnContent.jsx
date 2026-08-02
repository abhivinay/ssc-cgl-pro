const toArray=value=>Array.isArray(value)?value:[];

const getText=(value,fallback="")=>{
const text=String(value??"").trim();
return text||fallback;
};

function EmptyMessage({text}){
return(
<p className="text-sm leading-6 text-zinc-500">
{text}
</p>
);
}

export default function LearnContent({content}){
const overview=getText(
content?.overview,
"Topic introduction is not available yet."
);

const objectives=toArray(content?.objectives);
const concepts=toArray(content?.concepts);
const method=toArray(content?.method);
const commonRules=toArray(content?.commonRules);
const shortcuts=toArray(content?.shortcuts);
const mistakes=toArray(content?.mistakes);

return(
<div className="space-y-6">
<section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm font-semibold uppercase tracking-wider text-violet-400">
Introduction
</p>

<p className="mt-3 leading-7 text-zinc-300">
{overview}
</p>
</section>

<section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<h2 className="text-xl font-bold">
Learning objectives
</h2>

<div className="mt-4 grid gap-3 md:grid-cols-2">
{objectives.length?(
objectives.map((item,index)=>(
<div
key={`${String(item)}-${index}`}
className="flex gap-3 rounded-2xl bg-zinc-950 p-4"
>
<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm text-emerald-400">
{index+1}
</span>

<p className="text-sm leading-6 text-zinc-300">
{getText(item,"Objective not available")}
</p>
</div>
))
):(
<EmptyMessage text="Learning objectives are not available yet."/>
)}
</div>
</section>

<section className="space-y-4">
<h2 className="text-2xl font-bold">
Core concepts
</h2>

{concepts.length?(
concepts.map((concept,index)=>{
const example=concept?.example;

return(
<div
key={`${getText(concept?.title,"concept")}-${index}`}
className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
>
<div className="flex items-center gap-3">
<span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 font-bold text-violet-400">
{index+1}
</span>

<h3 className="text-lg font-bold">
{getText(concept?.title,`Concept ${index+1}`)}
</h3>
</div>

<p className="mt-4 leading-7 text-zinc-300">
{getText(
concept?.description,
"Concept explanation is not available yet."
)}
</p>

{example&&(
<div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
<p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
Solved example
</p>

<p className="mt-3 font-semibold">
{getText(
example.question,
"Example question is not available."
)}
</p>

<p className="mt-3 text-sm text-emerald-400">
Answer: {getText(example.answer,"Not available")}
</p>

<p className="mt-2 text-sm leading-6 text-zinc-400">
{getText(
example.explanation,
"Example explanation is not available."
)}
</p>
</div>
)}
</div>
);
})
):(
<div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/50 p-6">
<EmptyMessage text="Core concepts are not available yet."/>
</div>
)}
</section>

<section className="grid gap-5 lg:grid-cols-2">
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<h2 className="text-xl font-bold">
Step-by-step method
</h2>

<div className="mt-5 space-y-3">
{method.length?(
method.map((item,index)=>(
<div
key={`${String(item)}-${index}`}
className="flex gap-3"
>
<span className="font-bold text-violet-400">
{index+1}.
</span>

<p className="text-sm leading-6 text-zinc-300">
{getText(item,"Step not available")}
</p>
</div>
))
):(
<EmptyMessage text="Step-by-step method is not available yet."/>
)}
</div>
</div>

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<h2 className="text-xl font-bold">
Common patterns
</h2>

<div className="mt-5 flex flex-wrap gap-2">
{commonRules.length?(
commonRules.map((item,index)=>(
<span
key={`${String(item)}-${index}`}
className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-300"
>
{getText(item,"Pattern not available")}
</span>
))
):(
<EmptyMessage text="Common patterns are not available yet."/>
)}
</div>
</div>
</section>

<section className="grid gap-5 lg:grid-cols-2">
<div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
<h2 className="text-xl font-bold text-emerald-400">
SSC shortcuts
</h2>

<div className="mt-4 space-y-3">
{shortcuts.length?(
shortcuts.map((item,index)=>(
<p
key={`${String(item)}-${index}`}
className="text-sm leading-6 text-zinc-300"
>
✓ {getText(item,"Shortcut not available")}
</p>
))
):(
<EmptyMessage text="SSC shortcuts are not available yet."/>
)}
</div>
</div>

<div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
<h2 className="text-xl font-bold text-red-400">
Common mistakes
</h2>

<div className="mt-4 space-y-3">
{mistakes.length?(
mistakes.map((item,index)=>(
<p
key={`${String(item)}-${index}`}
className="text-sm leading-6 text-zinc-300"
>
✕ {getText(item,"Mistake information not available")}
</p>
))
):(
<EmptyMessage text="Common mistakes are not available yet."/>
)}
</div>
</div>
</section>
</div>
);
}