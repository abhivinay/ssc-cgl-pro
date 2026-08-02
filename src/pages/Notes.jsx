import{useMemo,useState}from"react";
import{useStudy}from"../context/StudyContext";

const SUBJECTS=["all","quant","reasoning","english","gk"];

export default function Notes(){
const{studyState,addTopicNote,setStudyState}=useStudy();
const[selectedTopic,setSelectedTopic]=useState("");
const[text,setText]=useState("");
const[search,setSearch]=useState("");
const[subject,setSubject]=useState("all");
const[editingId,setEditingId]=useState(null);
const[editingText,setEditingText]=useState("");

const topics=useMemo(
()=>[...(studyState.topics||[])].sort((a,b)=>
a.subject.localeCompare(b.subject)||a.name.localeCompare(b.name)
),
[studyState.topics]
);

const notes=useMemo(()=>{
return topics.flatMap(topic=>
(topic.notes||[]).map(note=>({
...note,
topicId:topic.id,
topicName:topic.name,
subject:topic.subject,
pinned:Boolean(note.pinned)
}))
).filter(note=>{
const query=search.trim().toLowerCase();
const matchesSubject=subject==="all"||note.subject===subject;
const matchesSearch=!query||
note.text.toLowerCase().includes(query)||
note.topicName.toLowerCase().includes(query)||
note.subject.toLowerCase().includes(query);

return matchesSubject&&matchesSearch;
}).sort((a,b)=>{
if(a.pinned!==b.pinned)return Number(b.pinned)-Number(a.pinned);
return new Date(b.createdAt)-new Date(a.createdAt);
});
},[topics,search,subject]);

const saveNote=()=>{
const value=text.trim();
if(!selectedTopic||!value)return;
addTopicNote(selectedTopic,value);
setText("");
};

const updateNote=(topicId,noteId,changes)=>{
setStudyState(previous=>({
...previous,
topics:previous.topics.map(topic=>
topic.id===topicId
?{
...topic,
notes:(topic.notes||[]).map(note=>
note.id===noteId?{...note,...changes}:note
)
}
:topic
)
}));
};

const deleteNote=(topicId,noteId)=>{
setStudyState(previous=>({
...previous,
topics:previous.topics.map(topic=>
topic.id===topicId
?{
...topic,
notes:(topic.notes||[]).filter(note=>note.id!==noteId)
}
:topic
)
}));
};

const startEditing=note=>{
setEditingId(note.id);
setEditingText(note.text);
};

const saveEditing=note=>{
const value=editingText.trim();
if(!value)return;
updateNote(note.topicId,note.id,{
text:value,
updatedAt:new Date().toISOString()
});
setEditingId(null);
setEditingText("");
};

return(
<div className="page">
<div className="flex flex-wrap items-center justify-between gap-4">
<div>
<h1 className="text-4xl font-bold">Notes Vault</h1>
<p className="mt-2 text-zinc-400">
Store and revise important points from every topic.
</p>
</div>
<div className="card min-w-36 text-center">
<p className="text-sm text-zinc-400">Total Notes</p>
<h2 className="mt-1 text-3xl font-bold">{notes.length}</h2>
</div>
</div>

<div className="card mt-6">
<h2 className="text-xl font-semibold">Add New Note</h2>

<div className="mt-4 grid gap-4 md:grid-cols-[240px_1fr_auto]">
<select
value={selectedTopic}
onChange={event=>setSelectedTopic(event.target.value)}
className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
>
<option value="">Select topic</option>
{topics.map(topic=>(
<option key={topic.id} value={topic.id}>
{topic.subject.toUpperCase()} — {topic.name}
</option>
))}
</select>

<textarea
value={text}
onChange={event=>setText(event.target.value)}
placeholder="Write an important point, shortcut or formula..."
rows={3}
className="resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
 />

<button
className="primary-btn self-end"
onClick={saveNote}
disabled={!selectedTopic||!text.trim()}
>
Save Note
</button>
</div>
</div>

<div className="mt-6 flex flex-wrap gap-3">
<input
value={search}
onChange={event=>setSearch(event.target.value)}
placeholder="Search notes or topics..."
className="min-w-64 flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
/>

<select
value={subject}
onChange={event=>setSubject(event.target.value)}
className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
>
{SUBJECTS.map(item=>(
<option key={item} value={item}>
{item==="all"?"All Subjects":item.toUpperCase()}
</option>
))}
</select>
</div>

{notes.length===0?(
<div className="card mt-6 text-center">
<h3 className="text-xl font-semibold">No notes found</h3>
<p className="mt-2 text-zinc-400">
Add your first topic note or change the current filters.
</p>
</div>
):(
<div className="mt-6 grid gap-4 lg:grid-cols-2">
{notes.map(note=>(
<div key={`${note.topicId}-${note.id}`} className="card">
<div className="flex items-start justify-between gap-3">
<div>
<div className="flex flex-wrap items-center gap-2">
<span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold uppercase">
{note.subject}
</span>
{note.pinned&&(
<span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
📌 Pinned
</span>
)}
</div>
<h3 className="mt-3 text-lg font-semibold">{note.topicName}</h3>
</div>

<button
onClick={()=>updateNote(note.topicId,note.id,{pinned:!note.pinned})}
className="rounded-lg border border-zinc-700 px-3 py-2 text-sm"
title={note.pinned?"Unpin note":"Pin note"}
>
{note.pinned?"Unpin":"Pin"}
</button>
</div>

{editingId===note.id?(
<div className="mt-4">
<textarea
value={editingText}
onChange={event=>setEditingText(event.target.value)}
rows={4}
className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
/>

<div className="mt-3 flex gap-2">
<button
className="primary-btn"
onClick={()=>saveEditing(note)}
>
Save
</button>

<button
className="rounded-xl border border-zinc-700 px-4 py-2"
onClick={()=>{
setEditingId(null);
setEditingText("");
}}
>
Cancel
</button>
</div>
</div>
):(
<p className="mt-4 whitespace-pre-wrap text-zinc-300">{note.text}</p>
)}

<div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4">
<span className="text-xs text-zinc-500">
{new Date(note.updatedAt||note.createdAt).toLocaleString()}
</span>

<div className="flex gap-2">
<button
onClick={()=>startEditing(note)}
className="rounded-lg border border-zinc-700 px-3 py-2 text-sm"
>
Edit
</button>

<button
onClick={()=>deleteNote(note.topicId,note.id)}
className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400"
>
Delete
</button>
</div>
</div>
</div>
))}
</div>
)}
</div>
);
}