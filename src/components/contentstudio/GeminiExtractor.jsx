import{useEffect,useMemo,useRef,useState}from"react";
import{AlertCircle,CheckCircle2,FileText,Pause,Play,RefreshCw,Sparkles,Square,Trash2}from"lucide-react";
import{extractPdfWithGemini}from"../../services/geminiExtractor";
import ExtractionQueue from"./ExtractionQueue";
import ExtractionPreview from"./ExtractionPreview";
const STORAGE_KEY="ssc-content-studio-extractions";
const createItem=file=>({
id:file.id,
name:file.name,
path:file.path||file.name,
size:file.size||0,
blob:file.blob||null,
status:"pending",
progress:0,
text:"",
pages:[],
error:"",
startedAt:null,
completedAt:null
});
const readSaved=()=>{
try{
const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
return Array.isArray(data)?data:[];
}catch{
return[];
}
};
const writeSaved=items=>{
const serializable=items.map(({blob,...item})=>item);
localStorage.setItem(STORAGE_KEY,JSON.stringify(serializable));
};
export default function GeminiExtractor({files=[]}){
const abortRef=useRef(null);
const runningRef=useRef(false);
const queueRef=useRef([]);
const[queue,setQueue]=useState([]);
const[selectedIds,setSelectedIds]=useState([]);
const[previewId,setPreviewId]=useState(null);
const[processing,setProcessing]=useState(false);
const[paused,setPaused]=useState(false);
const[error,setError]=useState("");
useEffect(()=>{
const saved=readSaved();
setQueue(saved.map(item=>({...item,blob:files.find(file=>file.id===item.id)?.blob||null})));
},[]);
useEffect(()=>{
setQueue(current=>current.map(item=>({...item,blob:item.blob||files.find(file=>file.id===item.id)?.blob||null})));
},[files]);
useEffect(()=>{
queueRef.current=queue;
writeSaved(queue);
},[queue]);
useEffect(()=>()=>abortRef.current?.abort(),[]);
const queuedIds=useMemo(()=>new Set(queue.map(item=>item.id)),[queue]);
const availableFiles=useMemo(()=>files.filter(file=>!queuedIds.has(file.id)),[files,queuedIds]);
const previewItem=useMemo(()=>queue.find(item=>item.id===previewId)||null,[queue,previewId]);
const completedCount=useMemo(()=>queue.filter(item=>item.status==="completed").length,[queue]);
const failedCount=useMemo(()=>queue.filter(item=>item.status==="failed").length,[queue]);
const overallProgress=useMemo(()=>{
if(!queue.length)return 0;
return Math.round(queue.reduce((total,item)=>total+(Number(item.progress)||0),0)/queue.length);
},[queue]);
const updateItem=(id,updates)=>setQueue(current=>current.map(item=>item.id===id?{...item,...updates}:item));
const toggleSelection=id=>setSelectedIds(current=>current.includes(id)?current.filter(value=>value!==id):[...current,id]);
const addSelected=()=>{
const selected=availableFiles.filter(file=>selectedIds.includes(file.id));
if(!selected.length)return;
setQueue(current=>[...current,...selected.map(createItem)]);
setSelectedIds([]);
setError("");
};
const addAll=()=>{
if(!availableFiles.length)return;
setQueue(current=>[...current,...availableFiles.map(createItem)]);
setSelectedIds([]);
setError("");
};
const removeItem=id=>{
if(queue.find(item=>item.id===id)?.status==="processing")return;
setQueue(current=>current.filter(item=>item.id!==id));
if(previewId===id)setPreviewId(null);
};
const clearCompleted=()=>{
setQueue(current=>current.filter(item=>item.status!=="completed"));
if(previewItem?.status==="completed")setPreviewId(null);
};
const retryItem=id=>updateItem(id,{status:"pending",progress:0,text:"",pages:[],error:"",startedAt:null,completedAt:null});
const retryFailed=()=>setQueue(current=>current.map(item=>item.status==="failed"?{...item,status:"pending",progress:0,text:"",pages:[],error:"",startedAt:null,completedAt:null}:item));
const stop=()=>{
runningRef.current=false;
abortRef.current?.abort();
abortRef.current=null;
setProcessing(false);
setPaused(false);
setQueue(current=>current.map(item=>item.status==="processing"?{...item,status:"pending",progress:0}:item));
};
const pause=()=>{
runningRef.current=false;
abortRef.current?.abort();
abortRef.current=null;
setProcessing(false);
setPaused(true);
setQueue(current=>current.map(item=>item.status==="processing"?{...item,status:"paused"}:item));
};
const processQueue=async()=>{
if(runningRef.current)return;
runningRef.current=true;
setProcessing(true);
setPaused(false);
setError("");
while(runningRef.current){
const item=queueRef.current.find(entry=>["pending","paused"].includes(entry.status));
if(!item)break;
if(!item.blob){
updateItem(item.id,{status:"failed",progress:0,error:"PDF data unavailable. PDF Manager nundi file malli upload cheyyandi."});
await new Promise(resolve=>setTimeout(resolve,0));
continue;
}
const controller=new AbortController();
abortRef.current=controller;
updateItem(item.id,{status:"processing",progress:5,error:"",startedAt:Date.now()});
try{
const result=await extractPdfWithGemini(item.blob,{
signal:controller.signal,
fileName:item.name,
onProgress:value=>updateItem(item.id,{progress:value})
});
updateItem(item.id,{
status:"completed",
progress:100,
text:result.text||"",
pages:Array.isArray(result.pages)?result.pages:[],
completedAt:Date.now(),
error:""
});
if(!previewId)setPreviewId(item.id);
}catch(extractionError){
if(extractionError?.name==="AbortError")break;
updateItem(item.id,{
status:"failed",
progress:0,
error:extractionError?.message||"PDF extraction failed.",
completedAt:Date.now()
});
}
await new Promise(resolve=>setTimeout(resolve,0));
}
runningRef.current=false;
abortRef.current=null;
setProcessing(false);
};
return(
<div className="space-y-6">
<section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 md:p-8">
<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
<div>
<div className="flex items-center gap-2 text-violet-400">
<Sparkles size={18}/>
<p className="text-xs font-black uppercase tracking-[0.2em]">Gemini Extractor</p>
</div>
<h2 className="mt-3 text-3xl font-black text-white">Extract Text From SSC PDFs</h2>
<p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">PDF Manager lo save chesina files ni queue ki add chesi Gemini extraction run cheyyandi.</p>
</div>
<div className="grid grid-cols-3 gap-3">
<Stat label="Queue" value={queue.length}/>
<Stat label="Done" value={completedCount}/>
<Stat label="Failed" value={failedCount}/>
</div>
</div>
{queue.length>0&&(
<div className="mt-6">
<div className="mb-2 flex items-center justify-between text-xs font-bold text-zinc-400">
<span>Overall Progress</span>
<span>{overallProgress}%</span>
</div>
<div className="h-3 overflow-hidden rounded-full bg-zinc-800">
<div className="h-full rounded-full bg-violet-500 transition-all" style={{width:`${overallProgress}%`}}/>
</div>
</div>
)}
</section>
<section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 md:p-6">
<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
<div>
<h3 className="text-xl font-black text-white">Available PDFs</h3>
<p className="mt-1 text-sm text-zinc-500">{availableFiles.length} files ready</p>
</div>
<div className="flex flex-wrap gap-2">
<button type="button" onClick={addSelected} disabled={!selectedIds.length} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white disabled:opacity-40">Add Selected</button>
<button type="button" onClick={addAll} disabled={!availableFiles.length} className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-black text-white disabled:opacity-40">Add All</button>
</div>
</div>
<div className="mt-5 grid gap-3 md:grid-cols-2">
{availableFiles.map(file=>(
<label key={file.id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${selectedIds.includes(file.id)?"border-violet-500 bg-violet-500/10":"border-zinc-800 bg-zinc-950/40"}`}>
<input type="checkbox" checked={selectedIds.includes(file.id)} onChange={()=>toggleSelection(file.id)} className="h-4 w-4 accent-violet-600"/>
<FileText size={20} className="shrink-0 text-rose-300"/>
<span className="min-w-0 flex-1 truncate text-sm font-bold text-white">{file.name}</span>
</label>
))}
{!availableFiles.length&&<p className="col-span-full py-6 text-center text-sm text-zinc-600">Queue ki add cheyyadaniki new PDFs levu.</p>}
</div>
</section>
<section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 md:p-6">
<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
<div>
<h3 className="text-xl font-black text-white">Extraction Queue</h3>
<p className="mt-1 text-sm text-zinc-500">{processing?"Extraction running":paused?"Extraction paused":"Ready"}</p>
</div>
<div className="flex flex-wrap gap-2">
{processing?(
<>
<button type="button" onClick={pause} className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm font-black text-amber-300"><Pause size={16}/>Pause</button>
<button type="button" onClick={stop} className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-black text-rose-300"><Square size={16}/>Stop</button>
</>
):(
<button type="button" onClick={processQueue} disabled={!queue.some(item=>["pending","paused"].includes(item.status))} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white disabled:opacity-40"><Play size={16}/>{paused?"Resume":"Start Extraction"}</button>
)}
<button type="button" onClick={retryFailed} disabled={!failedCount} className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-black text-white disabled:opacity-40"><RefreshCw size={16}/>Retry Failed</button>
<button type="button" onClick={clearCompleted} disabled={!completedCount} className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-black text-zinc-300 disabled:opacity-40"><Trash2 size={16}/>Clear Done</button>
</div>
</div>
{error&&<div className="mt-4 flex items-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm font-bold text-rose-300"><AlertCircle size={18}/>{error}</div>}
<div className="mt-5">
<ExtractionQueue items={queue} onPreview={setPreviewId} onRetry={retryItem} onRemove={removeItem} selectedId={previewId}/>
</div>
</section>
{previewItem&&<ExtractionPreview item={previewItem} onClose={()=>setPreviewId(null)}/>}
</div>
);
}
function Stat({label,value}){
return(
<div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-center">
<p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">{label}</p>
<p className="mt-1 text-xl font-black text-white">{value}</p>
</div>
);
}