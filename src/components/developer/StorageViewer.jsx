import{useMemo,useState}from"react";
import{
exportStorage,
getStorageSnapshot,
importStorage
}from"../../services/developerService";

export default function StorageViewer({
refreshKey=0,
onChange
}){
const[fileError,setFileError]=useState("");
const snapshot=useMemo(
()=>getStorageSnapshot(),
[refreshKey]
);

const entries=Object.entries(snapshot);

const handleImport=event=>{
const file=event.target.files?.[0];

if(!file)return;

const reader=new FileReader();

reader.onload=()=>{
try{
const parsed=JSON.parse(
String(reader.result||"{}")
);

importStorage(parsed);
setFileError("");
onChange?.();
}catch(error){
console.error(error);
setFileError(
error?.message||
"Invalid backup file."
);
}
};

reader.onerror=()=>{
setFileError(
"Failed to read the selected file."
);
};

reader.readAsText(file);
event.target.value="";
};

return(
<div className="space-y-5">
<div className="flex flex-wrap gap-3">
<button
type="button"
onClick={exportStorage}
className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-emerald-500"
>
Export JSON
</button>

<label className="cursor-pointer rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-violet-500">
Import JSON

<input
type="file"
accept="application/json,.json"
onChange={handleImport}
className="hidden"
/>
</label>
</div>

{fileError&&(
<div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
{fileError}
</div>
)}

<div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
<div className="flex items-center justify-between gap-4">
<div>
<p className="font-semibold">
Local Storage Snapshot
</p>

<p className="mt-1 text-xs text-zinc-500">
{entries.length} keys detected
</p>
</div>

<span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
Developer only
</span>
</div>

<div className="mt-4 max-h-[520px] overflow-auto rounded-xl border border-zinc-800 bg-black/20 p-4">
<pre className="whitespace-pre-wrap break-words text-xs leading-6 text-zinc-300">
{entries.length
?JSON.stringify(snapshot,null,2)
:"No local storage data found."}
</pre>
</div>
</div>
</div>
);
}