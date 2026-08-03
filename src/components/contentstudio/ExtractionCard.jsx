import{FileText}from"lucide-react";
const STATUS_STYLES={
pending:"border-zinc-800 bg-zinc-950/50",
processing:"border-violet-500/30 bg-violet-500/[0.06]",
completed:"border-emerald-500/30 bg-emerald-500/[0.05]",
failed:"border-rose-500/30 bg-rose-500/[0.05]",
paused:"border-amber-500/30 bg-amber-500/[0.05]"
};
const STATUS_LABELS={
pending:"Pending",
processing:"Processing",
completed:"Completed",
failed:"Failed",
paused:"Paused"
};
const formatBytes=bytes=>{
if(!bytes)return"0 B";
const units=["B","KB","MB","GB"];
const index=Math.min(Math.floor(Math.log(bytes)/Math.log(1024)),units.length-1);
return`${(bytes/1024**index).toFixed(index===0?0:2)} ${units[index]}`;
};
export default function ExtractionCard({
item,
selected=false,
statusIcon,
actions
}){
return(
<div className={`rounded-2xl border p-4 transition ${STATUS_STYLES[item.status]||STATUS_STYLES.pending} ${selected?"ring-2 ring-violet-500/50":""}`}>
<div className="flex flex-col gap-4 md:flex-row md:items-center">
<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-300">
<FileText size={22}/>
</div>
<div className="min-w-0 flex-1">
<div className="flex flex-wrap items-center gap-2">
<p className="truncate text-sm font-black text-white">{item.name}</p>
<span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-400">
{statusIcon}
{STATUS_LABELS[item.status]||item.status}
</span>
</div>
<p className="mt-1 truncate text-xs text-zinc-500">{item.path}</p>
<div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
<span>{formatBytes(item.size)}</span>
{Array.isArray(item.pages)&&item.pages.length>0&&<span>{item.pages.length} pages</span>}
{item.completedAt&&<span>Completed {new Date(item.completedAt).toLocaleTimeString()}</span>}
</div>
</div>
<div className="flex shrink-0 items-center gap-3">
<div className="w-32">
<div className="mb-1 flex items-center justify-between text-[10px] font-bold text-zinc-500">
<span>Progress</span>
<span>{Number(item.progress)||0}%</span>
</div>
<div className="h-2 overflow-hidden rounded-full bg-zinc-800">
<div className={`h-full rounded-full transition-all ${item.status==="failed"?"bg-rose-500":item.status==="completed"?"bg-emerald-500":"bg-violet-500"}`} style={{width:`${Number(item.progress)||0}%`}}/>
</div>
</div>
{actions}
</div>
</div>
{item.error&&(
<div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs font-bold leading-5 text-rose-300">
{item.error}
</div>
)}
</div>
);
}