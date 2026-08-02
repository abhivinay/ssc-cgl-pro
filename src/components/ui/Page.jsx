export default function Page({
children,
title,
description,
eyebrow,
actions,
className=""
}){
return(
<main className={`mx-auto w-full max-w-7xl pb-12 ${className}`}>
{(title||description||eyebrow||actions)&&(
<header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
<div>
{eyebrow&&(
<p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-400">
{eyebrow}
</p>
)}

{title&&(
<h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
{title}
</h1>
)}

{description&&(
<p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400 md:text-base">
{description}
</p>
)}
</div>

{actions&&(
<div className="flex flex-wrap items-center gap-3">
{actions}
</div>
)}
</header>
)}

{children}
</main>
);
}