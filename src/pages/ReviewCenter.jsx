import{useEffect,useMemo,useState}from"react";
import{CheckCircle2,ChevronLeft,ChevronRight,Clock3,Download,Search,ShieldCheck,ThumbsDown,Trash2}from"lucide-react";
import useReviewCenter from"../hooks/useReviewCenter";

const SUBJECT_TOPICS={
Quant:["Number System","Percentage","Ratio and Proportion","Average","Profit and Loss","Simple Interest","Compound Interest","Time and Work","Speed Time and Distance","Algebra","Geometry","Mensuration","Trigonometry","Data Interpretation"],
Reasoning:["Analogy","Classification","Series","Coding-Decoding","Blood Relation","Direction Sense","Syllogism","Venn Diagram","Seating Arrangement","Non-Verbal Reasoning"],
English:["Vocabulary","Grammar","Error Spotting","Sentence Improvement","Fill in the Blanks","Cloze Test","Reading Comprehension","Active and Passive Voice","Direct and Indirect Speech"],
"General Awareness":["History","Geography","Polity","Economy","Physics","Chemistry","Biology","Static GK","Current Affairs"]
};

const STATUS_STYLES={
approved:"bg-emerald-500/15 text-emerald-300",
rejected:"bg-red-500/15 text-red-300",
pending:"bg-amber-500/15 text-amber-300"
};

const fieldClass="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500";

export default function ReviewCenter(){
const{questions,updateQuestion,setBulkStatus,saveState}=useReviewCenter();
const[activeId,setActiveId]=useState(questions[0]?.id||null);
const[selected,setSelected]=useState([]);
const[search,setSearch]=useState("");
const[status,setStatus]=useState("all");
const[subject,setSubject]=useState("all");

const stats=useMemo(()=>({
total:questions.length,
approved:questions.filter(item=>item.reviewStatus==="approved").length,
pending:questions.filter(item=>item.reviewStatus==="pending").length,
rejected:questions.filter(item=>item.reviewStatus==="rejected").length
}),[questions]);

const filtered=useMemo(()=>questions.filter(item=>{
const query=search.trim().toLowerCase();
return(
(status==="all"||item.reviewStatus===status)&&
(subject==="all"||item.subject===subject)&&
(!query||
item.questionText.toLowerCase().includes(query)||
item.topic.toLowerCase().includes(query)||
item.source.toLowerCase().includes(query))
);
}),[questions,search,status,subject]);

const currentIndex=filtered.findIndex(item=>item.id===activeId);
const current=filtered[currentIndex]||filtered[0]||null;

useEffect(()=>{
if(filtered.length&&!filtered.some(item=>item.id===activeId)){
setActiveId(filtered[0].id);
}
},[activeId,filtered]);

useEffect(()=>{
setSelected(ids=>ids.filter(id=>questions.some(item=>item.id===id)));
},[questions]);

function patch(updates){
if(current)updateQuestion(current.id,updates);
}

function toggleSelected(id){
setSelected(ids=>
ids.includes(id)
?ids.filter(item=>item!==id)
:[...ids,id]
);
}

function runBulk(nextStatus){
if(!selected.length)return;
setBulkStatus(selected,nextStatus);
setSelected([]);
}

function navigate(step){
const next=Math.max(
0,
Math.min(filtered.length-1,currentIndex+step)
);
if(filtered[next])setActiveId(filtered[next].id);
}

function exportJson(){
if(!questions.length)return;

const payload={
exportedAt:new Date().toISOString(),
questionCount:questions.length,
questions
};
const blob=new Blob([JSON.stringify(payload,null,2)],{
type:"application/json"
});
const url=URL.createObjectURL(blob);
const link=document.createElement("a");
const date=new Date().toISOString().slice(0,10);

link.href=url;
link.download=`ssc-extracted-questions-${date}.json`;
document.body.appendChild(link);
link.click();
link.remove();
setTimeout(()=>URL.revokeObjectURL(url),0);
}

const topicOptions=current
?(SUBJECT_TOPICS[current.subject]||[])
:[];

return(
<div className="mx-auto flex min-h-full max-w-[1800px] flex-col gap-5">
<header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-400">
Content Studio
</p>
<h1 className="mt-1 text-3xl font-bold text-white">
Review Center
</h1>
<p className="mt-1 text-sm text-zinc-400">
Validate and approve AI-extracted SSC questions.
</p>
</div>
<div className="flex flex-wrap items-center gap-3">
<div className="flex items-center gap-2 text-xs text-zinc-400">
<span className={`h-2 w-2 rounded-full ${
saveState==="error"
?"bg-red-400"
:saveState==="saving"
?"animate-pulse bg-amber-400"
:"bg-emerald-400"
}`}/>
{saveState==="saving"
?"Saving changes…"
:saveState==="error"
?"Autosave failed"
:"All changes saved"}
</div>
<button
type="button"
onClick={exportJson}
disabled={!questions.length}
className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
>
<Download size={17}/>
Export JSON
</button>
</div>
</header>

<section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
{[
["Total",stats.total,"text-white"],
["Approved",stats.approved,"text-emerald-300"],
["Pending",stats.pending,"text-amber-300"],
["Rejected",stats.rejected,"text-red-300"]
].map(([label,value,color])=>(
<div
key={label}
className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4"
>
<p className="text-xs uppercase tracking-wider text-zinc-500">
{label}
</p>
<p className={`mt-2 text-2xl font-bold ${color}`}>
{value}
</p>
</div>
))}
</section>

<section className="grid min-h-[680px] flex-1 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 xl:grid-cols-[390px_minmax(0,1fr)]">
<aside className="flex min-h-[520px] flex-col border-b border-zinc-800 xl:border-b-0 xl:border-r">
<div className="space-y-3 border-b border-zinc-800 p-4">
<div className="relative">
<Search
className="absolute left-3 top-3 text-zinc-500"
size={17}
/>
<input
value={search}
onChange={event=>setSearch(event.target.value)}
placeholder="Search questions, topics, sources"
className={`${fieldClass} pl-10`}
/>
</div>

<div className="grid grid-cols-2 gap-2">
<select
value={status}
onChange={event=>setStatus(event.target.value)}
className={fieldClass}
>
<option value="all">All statuses</option>
<option value="pending">Pending</option>
<option value="approved">Approved</option>
<option value="rejected">Rejected</option>
</select>

<select
value={subject}
onChange={event=>setSubject(event.target.value)}
className={fieldClass}
>
<option value="all">All subjects</option>
{Object.keys(SUBJECT_TOPICS).map(item=>(
<option key={item}>{item}</option>
))}
</select>
</div>

<div className="flex flex-wrap gap-2">
<button
onClick={()=>runBulk("approved")}
disabled={!selected.length}
className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold disabled:opacity-40"
>
Approve
</button>
<button
onClick={()=>runBulk("rejected")}
disabled={!selected.length}
className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold disabled:opacity-40"
>
Reject
</button>
<button
onClick={()=>runBulk("pending")}
disabled={!selected.length}
className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold disabled:opacity-40"
>
Mark Pending
</button>
</div>
</div>

<div className="flex-1 space-y-2 overflow-y-auto p-3">
{filtered.length?filtered.map((item,index)=>(
<button
type="button"
key={item.id}
onClick={()=>setActiveId(item.id)}
className={`flex w-full gap-3 rounded-2xl border p-3 text-left transition ${
current?.id===item.id
?"border-violet-500 bg-violet-500/10"
:"border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
}`}
>
<input
type="checkbox"
checked={selected.includes(item.id)}
onClick={event=>event.stopPropagation()}
onChange={()=>toggleSelected(item.id)}
className="mt-1 h-4 w-4 accent-violet-500"
/>
<span className="min-w-0 flex-1">
<span className="flex items-center justify-between gap-2">
<span className="text-xs font-semibold text-zinc-500">
Q{index+1} · {item.subject}
</span>
<span className={`rounded-full px-2 py-1 text-[10px] font-bold capitalize ${STATUS_STYLES[item.reviewStatus]}`}>
{item.reviewStatus}
</span>
</span>
<span className="mt-2 line-clamp-2 block text-sm text-zinc-200">
{item.questionText||"Question text missing"}
</span>
<span className="mt-2 block truncate text-xs text-zinc-500">
{item.topic} · {item.confidence}%
</span>
</span>
</button>
)):(
<div className="flex h-full flex-col items-center justify-center p-8 text-center">
<ShieldCheck size={38} className="text-zinc-700"/>
<p className="mt-3 font-semibold text-zinc-300">
No questions found
</p>
<p className="mt-1 text-sm text-zinc-500">
Run Gemini extraction or change the active filters.
</p>
</div>
)}
</div>
</aside>

<main className="min-w-0 p-5 md:p-7">
{current?(
<div className="mx-auto max-w-4xl space-y-6">
<div className="flex flex-col gap-3 border-b border-zinc-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
<div>
<p className="text-sm font-semibold text-white">
Question {currentIndex+1} of {filtered.length}
</p>
<p className="mt-1 max-w-xl truncate text-xs text-zinc-500">
Source: {current.source}
</p>
</div>

<div className="flex gap-2">
<button
onClick={()=>navigate(-1)}
disabled={currentIndex<=0}
className="rounded-xl border border-zinc-700 p-2.5 disabled:opacity-30"
>
<ChevronLeft size={18}/>
</button>
<button
onClick={()=>navigate(1)}
disabled={currentIndex>=filtered.length-1}
className="rounded-xl border border-zinc-700 p-2.5 disabled:opacity-30"
>
<ChevronRight size={18}/>
</button>
</div>
</div>

<label className="block">
<span className="mb-2 block text-sm font-semibold text-zinc-300">
English Question
</span>
<textarea
value={current.questionText}
onChange={event=>patch({
questionText:event.target.value,
reviewStatus:"pending"
})}
rows={5}
className={`${fieldClass} resize-y leading-6`}
/>
</label>

<div>
<p className="mb-3 text-sm font-semibold text-zinc-300">
Answer Options
</p>
<div className="grid gap-3 md:grid-cols-2">
{current.options.map((option,index)=>(
<label
key={index}
className={`flex items-center gap-3 rounded-2xl border p-3 ${
current.correctAnswer===String.fromCharCode(65+index)
?"border-emerald-500/70 bg-emerald-500/5"
:"border-zinc-800 bg-zinc-950/50"
}`}
>
<input
type="radio"
name="correctAnswer"
checked={current.correctAnswer===String.fromCharCode(65+index)}
onChange={()=>patch({
correctAnswer:String.fromCharCode(65+index),
reviewStatus:"pending"
})}
className="h-4 w-4 accent-emerald-500"
/>
<span className="font-bold text-zinc-500">
{String.fromCharCode(65+index)}
</span>
<input
value={option}
onChange={event=>{
const options=[...current.options];
options[index]=event.target.value;
patch({options,reviewStatus:"pending"});
}}
className="min-w-0 flex-1 bg-transparent text-sm outline-none"
placeholder={`Option ${index+1}`}
/>
</label>
))}
</div>
</div>

<div className="grid gap-4 sm:grid-cols-2">
<label>
<span className="mb-2 block text-sm font-semibold text-zinc-300">
Subject
</span>
<select
value={current.subject}
onChange={event=>patch({
subject:event.target.value,
topic:"Unassigned",
reviewStatus:"pending"
})}
className={fieldClass}
>
<option value="Unassigned">Unassigned</option>
{Object.keys(SUBJECT_TOPICS).map(item=>(
<option key={item}>{item}</option>
))}
</select>
</label>

<label>
<span className="mb-2 block text-sm font-semibold text-zinc-300">
Topic
</span>
<select
value={current.topic}
onChange={event=>patch({
topic:event.target.value,
reviewStatus:"pending"
})}
className={fieldClass}
>
<option value="Unassigned">Unassigned</option>
{!topicOptions.includes(current.topic)&&
current.topic!=="Unassigned"&&(
<option value={current.topic}>{current.topic}</option>
)}
{topicOptions.map(item=>(
<option key={item}>{item}</option>
))}
</select>
</label>
</div>

<div className="grid gap-4 sm:grid-cols-2">
<label>
<span className="mb-2 flex justify-between text-sm font-semibold text-zinc-300">
<span>AI Confidence</span>
<span className="text-violet-300">
{current.confidence}%
</span>
</span>
<input
type="range"
min="0"
max="100"
value={current.confidence}
onChange={event=>patch({
confidence:Number(event.target.value)
})}
className="w-full accent-violet-500"
/>
</label>

<label>
<span className="mb-2 block text-sm font-semibold text-zinc-300">
Review Status
</span>
<select
value={current.reviewStatus}
onChange={event=>patch({
reviewStatus:event.target.value
})}
className={fieldClass}
>
<option value="pending">Pending</option>
<option value="approved">Approved</option>
<option value="rejected">Rejected</option>
</select>
</label>
</div>

<div className="flex flex-wrap justify-end gap-3 border-t border-zinc-800 pt-5">
<button
onClick={()=>patch({reviewStatus:"pending"})}
className="flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold"
>
<Clock3 size={17}/>
Pending
</button>
<button
onClick={()=>patch({reviewStatus:"rejected"})}
className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold"
>
<ThumbsDown size={17}/>
Reject
</button>
<button
onClick={()=>patch({reviewStatus:"approved"})}
className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold"
>
<CheckCircle2 size={17}/>
Approve
</button>
</div>
</div>
):(
<div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
<Trash2 size={44} className="text-zinc-700"/>
<h2 className="mt-4 text-xl font-bold">
Nothing to review
</h2>
<p className="mt-2 max-w-sm text-sm text-zinc-500">
Extracted questions will appear here automatically after the Gemini Extractor saves its JSON output.
</p>
</div>
)}
</main>
</section>
</div>
);
}