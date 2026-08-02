export default function DebugCard({
title,
description,
icon="🛠️",
children
}){
return(
<section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<div className="flex items-start gap-4">
<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
{icon}
</div>

<div>
<h2 className="text-xl font-bold">
{title}
</h2>

{description&&(
<p className="mt-2 text-sm leading-6 text-zinc-400">
{description}
</p>
)}
</div>
</div>

<div className="mt-6">
{children}
</div>
</section>
);
}