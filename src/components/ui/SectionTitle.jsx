export default function SectionTitle({
eyebrow,
title,
description,
action,
align="left",
className=""
}){
const centered=align==="center";

return(
<div className={`${centered?"text-center":"text-left"} ${className}`}>
{eyebrow&&(
<p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-400">
{eyebrow}
</p>
)}

<div className={`mt-2 flex gap-4 ${
centered
?"flex-col items-center"
:"items-start justify-between"
}`}>
<div className={centered?"max-w-2xl":""}>
<h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
{title}
</h2>

{description&&(
<p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
{description}
</p>
)}
</div>

{action&&(
<div className="shrink-0">
{action}
</div>
)}
</div>
</div>
);
}