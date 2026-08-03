import GeminiExtractor from "../components/contentstudio/GeminiExtractor";
import{useEffect,useMemo,useRef,useState}from"react";
import{UploadCloud,FolderOpen,FileText,Trash2,X,Database,FileSearch,Sparkles,Tags,CopyCheck,ClipboardCheck,Download,BarChart3}from"lucide-react";
const DB_NAME="ssc-content-studio";
const STORE_NAME="pdfs";
const sections=[
{id:"pdf-manager",label:"PDF Manager",icon:Database,active:true},
{id:"gemini-extractor",label:"Gemini Extractor",icon:Sparkles,active:true},
{id:"ai-parser",label:"AI Parser",icon:FileSearch},
{id:"topic-classifier",label:"Topic Classifier",icon:Tags},
{id:"duplicate-detector",label:"Duplicate Detector",icon:CopyCheck},
{id:"review",label:"Review",icon:ClipboardCheck},
{id:"export",label:"Export",icon:Download},
{id:"analytics",label:"Analytics",icon:BarChart3}
];
const openDatabase=()=>new Promise((resolve,reject)=>{
const request=indexedDB.open(DB_NAME,1);
request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains(STORE_NAME))db.createObjectStore(STORE_NAME,{keyPath:"id"});};
request.onsuccess=()=>resolve(request.result);
request.onerror=()=>reject(request.error);
});
const getAllPdfs=async()=>{
const db=await openDatabase();
return new Promise((resolve,reject)=>{
const transaction=db.transaction(STORE_NAME,"readonly");
const request=transaction.objectStore(STORE_NAME).getAll();
request.onsuccess=()=>resolve(request.result||[]);
request.onerror=()=>reject(request.error);
});
};
const savePdf=async pdf=>{
const db=await openDatabase();
return new Promise((resolve,reject)=>{
const transaction=db.transaction(STORE_NAME,"readwrite");
transaction.objectStore(STORE_NAME).put(pdf);
transaction.oncomplete=()=>resolve();
transaction.onerror=()=>reject(transaction.error);
});
};
const deletePdf=async id=>{
const db=await openDatabase();
return new Promise((resolve,reject)=>{
const transaction=db.transaction(STORE_NAME,"readwrite");
transaction.objectStore(STORE_NAME).delete(id);
transaction.oncomplete=()=>resolve();
transaction.onerror=()=>reject(transaction.error);
});
};
const clearPdfs=async()=>{
const db=await openDatabase();
return new Promise((resolve,reject)=>{
const transaction=db.transaction(STORE_NAME,"readwrite");
transaction.objectStore(STORE_NAME).clear();
transaction.oncomplete=()=>resolve();
transaction.onerror=()=>reject(transaction.error);
});
};
const formatBytes=bytes=>{
if(!bytes)return"0 B";
const units=["B","KB","MB","GB"];
const index=Math.min(Math.floor(Math.log(bytes)/Math.log(1024)),units.length-1);
return`${(bytes/1024**index).toFixed(index===0?0:2)} ${units[index]}`;
};
export default function ContentStudio(){
const fileInputRef=useRef(null);
const folderInputRef=useRef(null);
const[files,setFiles]=useState([]);
const[dragging,setDragging]=useState(false);
const[uploading,setUploading]=useState(false);
const[progress,setProgress]=useState(0);
const[error,setError]=useState("");
useEffect(()=>{getAllPdfs().then(items=>setFiles(items.sort((a,b)=>b.createdAt-a.createdAt))).catch(()=>setError("Saved PDFs load avvaledu."));},[]);
const totalSize=useMemo(()=>files.reduce((sum,file)=>sum+(file.size||0),0),[files]);
const processFiles=async selected=>{
const pdfFiles=Array.from(selected||[]).filter(file=>file.type==="application/pdf"||file.name.toLowerCase().endsWith(".pdf"));
if(!pdfFiles.length){setError("PDF files matrame upload cheyyandi.");return;}
setError("");
setUploading(true);
setProgress(0);
const created=[];
for(let index=0;index<pdfFiles.length;index+=1){
const file=pdfFiles[index];
const record={
id:`${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
name:file.name,
size:file.size,
type:file.type||"application/pdf",
path:file.webkitRelativePath||file.name,
lastModified:file.lastModified,
createdAt:Date.now()+index,
blob:file
};
await savePdf(record);
created.push(record);
setProgress(Math.round(((index+1)/pdfFiles.length)*100));
}
setFiles(current=>[...created,...current].sort((a,b)=>b.createdAt-a.createdAt));
setUploading(false);
setTimeout(()=>setProgress(0),600);
};
const handleDrop=event=>{
event.preventDefault();
setDragging(false);
processFiles(event.dataTransfer.files);
};
const handleDelete=async id=>{
await deletePdf(id);
setFiles(current=>current.filter(file=>file.id!==id));
};
const handleClear=async()=>{
if(!files.length)return;
await clearPdfs();
setFiles([]);
};
return(
<div className="mx-auto flex min-h-full max-w-[1600px] flex-col gap-6 xl:flex-row">
<aside className="w-full shrink-0 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-3 xl:w-72">
<div className="px-3 py-4">
<p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">Admin Workspace</p>
<h1 className="mt-2 text-2xl font-black text-white">Content Studio</h1>
<p className="mt-2 text-sm leading-6 text-zinc-500">SSC content extraction and management tools.</p>
</div>
<div className="space-y-1">
{sections.map(section=>{
const Icon=section.icon;
return(
<button key={section.id} type="button" disabled={!section.active} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${section.active?"bg-violet-600 text-white":"cursor-not-allowed text-zinc-600"}`}>
<Icon size={18}/>
<span>{section.label}</span>
{!section.active&&<span className="ml-auto text-[10px] uppercase tracking-wider">Soon</span>}
</button>
);
})}
</div>
</aside>
<main className="min-w-0 flex-1 space-y-6">
<section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 md:p-8">
<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
<div>
<p className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">PDF Manager</p>
<h2 className="mt-2 text-3xl font-black text-white">Upload SSC PDF Library</h2>
<p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">Multiple PDFs leda complete folder upload cheyyandi. Files browser IndexedDB lo locally persist avutayi.</p>
</div>
<div className="grid grid-cols-2 gap-3">
<div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-5 py-4">
<p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Files</p>
<p className="mt-1 text-2xl font-black text-white">{files.length}</p>
</div>
<div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-5 py-4">
<p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Storage</p>
<p className="mt-1 text-2xl font-black text-white">{formatBytes(totalSize)}</p>
</div>
</div>
</div>
</section>
<section onDragEnter={event=>{event.preventDefault();setDragging(true);}} onDragOver={event=>event.preventDefault()} onDragLeave={event=>{event.preventDefault();if(event.currentTarget===event.target)setDragging(false);}} onDrop={handleDrop} className={`rounded-3xl border-2 border-dashed p-8 text-center transition md:p-12 ${dragging?"border-violet-400 bg-violet-500/10":"border-zinc-700 bg-zinc-900/60"}`}>
<UploadCloud className="mx-auto text-violet-400" size={54}/>
<h3 className="mt-5 text-2xl font-black text-white">Drag & Drop PDFs Here</h3>
<p className="mt-2 text-sm text-zinc-500">Single PDF, multiple PDFs leda complete folder upload cheyyachu.</p>
<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
<button type="button" onClick={()=>fileInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-black text-white transition hover:bg-violet-500">
<FileText size={18}/>
Select PDFs
</button>
<button type="button" onClick={()=>folderInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-800 px-5 py-3 text-sm font-black text-white transition hover:border-zinc-600 hover:bg-zinc-700">
<FolderOpen size={18}/>
Select Folder
</button>
</div>
<input ref={fileInputRef} type="file" accept="application/pdf,.pdf" multiple className="hidden" onChange={event=>{processFiles(event.target.files);event.target.value="";}}/>
<input ref={folderInputRef} type="file" accept="application/pdf,.pdf" multiple webkitdirectory="" directory="" className="hidden" onChange={event=>{processFiles(event.target.files);event.target.value="";}}/>
{uploading&&(
<div className="mx-auto mt-7 max-w-xl">
<div className="mb-2 flex items-center justify-between text-xs font-bold text-zinc-400">
<span>Uploading PDFs</span>
<span>{progress}%</span>
</div>
<div className="h-3 overflow-hidden rounded-full bg-zinc-800">
<div className="h-full rounded-full bg-violet-500 transition-all duration-300" style={{width:`${progress}%`}}/>
</div>
</div>
)}
{error&&<p className="mt-5 text-sm font-bold text-rose-400">{error}</p>}
</section>
<section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 md:p-6">
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
<div>
<h3 className="text-xl font-black text-white">Uploaded PDFs</h3>
<p className="mt-1 text-sm text-zinc-500">{files.length} files • {formatBytes(totalSize)}</p>
</div>
<button type="button" onClick={handleClear} disabled={!files.length} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-black text-rose-300 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40">
<Trash2 size={17}/>
Clear All
</button>
</div>
{files.length===0?(
<div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950/40 p-10 text-center">
<FileText className="mx-auto text-zinc-700" size={48}/>
<p className="mt-4 font-black text-zinc-400">No PDFs uploaded yet</p>
<p className="mt-2 text-sm text-zinc-600">PDF files upload chesina tarvatha ikkada kanipistayi.</p>
</div>
):(
<div className="mt-6 space-y-3">
{files.map(file=>(
<div key={file.id} className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 sm:flex-row sm:items-center">
<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-300">
<FileText size={22}/>
</div>
<div className="min-w-0 flex-1">
<p className="truncate text-sm font-black text-white">{file.name}</p>
<p className="mt-1 truncate text-xs text-zinc-500">{file.path}</p>
</div>
<div className="flex items-center justify-between gap-4 sm:justify-end">
<span className="text-xs font-bold text-zinc-400">{formatBytes(file.size)}</span>
<button type="button" onClick={()=>handleDelete(file.id)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 text-zinc-500 transition hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300" aria-label={`Delete ${file.name}`}>
<X size={17}/>
</button>
</div>
</div>
))}
</div>
)}
</section>
<GeminiExtractor files={files}/>
</main>
</div>
);
}