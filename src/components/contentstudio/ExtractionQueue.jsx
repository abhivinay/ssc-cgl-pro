import{Eye,RefreshCw,Trash2,Loader2,CheckCircle2,XCircle,PauseCircle,Clock3}from"lucide-react";
import ExtractionCard from"./ExtractionCard";

const STATUS_ICONS={
pending:<Clock3 size={16} className="text-zinc-400"/>,
processing:<Loader2 size={16} className="animate-spin text-violet-400"/>,
completed:<CheckCircle2 size={16} className="text-emerald-400"/>,
failed:<XCircle size={16} className="text-rose-400"/>,
paused:<PauseCircle size={16} className="text-amber-400"/>
};

export default function ExtractionQueue({
items=[],
selectedId,
onPreview,
onRetry,
onRemove
}){

if(!items.length){
return(
<div className="rounded-3xl border border-zinc-800 bg-zinc-950/40 p-12 text-center">
<p className="text-lg font-bold text-zinc-400">
Extraction queue is empty
</p>
<p className="mt-2 text-sm text-zinc-600">
Add PDFs from the PDF Manager section.
</p>
</div>
);
}

return(
<div className="space-y-3">
{items.map(item=>(
<ExtractionCard
key={item.id}
item={item}
selected={selectedId===item.id}
statusIcon={STATUS_ICONS[item.status]}
actions={
<div className="flex items-center gap-2">

<button
type="button"
onClick={()=>onPreview(item.id)}
className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition hover:border-violet-500 hover:text-violet-300"
title="Preview"
>
<Eye size={16}/>
</button>

{item.status==="failed"&&(
<button
type="button"
onClick={()=>onRetry(item.id)}
className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition hover:border-amber-500 hover:text-amber-300"
title="Retry"
>
<RefreshCw size={16}/>
</button>
)}

{item.status!=="processing"&&(
<button
type="button"
onClick={()=>onRemove(item.id)}
className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition hover:border-rose-500 hover:text-rose-300"
title="Remove"
>
<Trash2 size={16}/>
</button>
)}

</div>
}
/>
))}
</div>
);
}