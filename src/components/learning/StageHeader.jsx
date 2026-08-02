const clampProgress=value=>{
const number=Number(value);

if(!Number.isFinite(number))return 0;

return Math.min(100,Math.max(0,Math.round(number)));
};

const getText=(value,fallback)=>{
const text=String(value??"").trim();
return text||fallback;
};

export default function StageHeader({
topic={},
progress=0
}){
const safeProgress=clampProgress(progress);

const subject=getText(
topic.subject,
"Unknown Subject"
);

const topicName=getText(
topic.name,
"Untitled Topic"
);

return(
<div className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
<div className="flex flex-wrap items-start justify-between gap-5">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
{subject}
</p>

<h1 className="mt-2 text-3xl font-bold md:text-5xl">
{topicName}
</h1>

<p className="mt-3 text-zinc-400">
Complete all eight stages in order to master the topic and unlock the next one.
</p>
</div>

<div className="text-right">
<p className="text-4xl font-bold text-emerald-400">
{safeProgress}%
</p>

<p className="text-xs text-zinc-500">
Topic progress
</p>
</div>
</div>

<div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
<div
className="h-full rounded-full bg-emerald-500 transition-all duration-500"
style={{
width:`${safeProgress}%`
}}
/>
</div>
</div>
);
}