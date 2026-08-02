import Button from"./Button";

export default function EmptyState({
icon="✨",
title="Nothing here yet",
description,
actionLabel,
onAction,
className=""
}){
return(
<div className={`rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/60 p-10 text-center ${className}`}>
<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl">
{icon}
</div>

<h3 className="mt-5 text-2xl font-black text-white">
{title}
</h3>

{description&&(
<p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-400">
{description}
</p>
)}

{actionLabel&&(
<div className="mt-6">
<Button
onClick={onAction}
size="lg"
>
{actionLabel}
</Button>
</div>
)}
</div>
);
}