import {useMemo,useState} from "react";
import {useStudy} from "../context/StudyContext";
import mentorEngine from "../utils/mentorEngine";

const SUBJECTS=["Quant","Reasoning","English","General Awareness"];

export default function MockTests(){
const{studyState,setStudyState}=useStudy();

const[form,setForm]=useState({
name:"",
score:"",
total:"100",
accuracy:"",
attempted:"",
time:"",
weakestSubject:"Quant"
});

const mocks=studyState.mockHistory||[];

const mentor=useMemo(()=>{
const latest=mocks[mocks.length-1];
return mentorEngine({
...studyState,
latestMock:latest,
progress:studyState.progress,
missionCompleted:studyState.dailyMissionPlan?.completed
});
},[studyState,mocks]);

const saveMock=()=>{
if(!form.name.trim())return;

const mock={
id:Date.now(),
name:form.name,
score:Number(form.score)||0,
total:Number(form.total)||100,
accuracy:Number(form.accuracy)||0,
attempted:Number(form.attempted)||0,
time:Number(form.time)||0,
weakestSubject:form.weakestSubject,
date:new Date().toISOString()
};

setStudyState(prev=>({
...prev,
mockHistory:[...(prev.mockHistory||[]),mock]
}));

setForm({
name:"",
score:"",
total:"100",
accuracy:"",
attempted:"",
time:"",
weakestSubject:"Quant"
});
};

return(
<div className="mx-auto max-w-7xl pb-10">
<div className="mb-8">
<h1 className="text-4xl font-bold">Mock Analysis Center</h1>
<p className="mt-2 text-zinc-400">
Record Oliveboard mock results and get AI analysis.
</p>
</div>

<div className="grid gap-6 xl:grid-cols-2">

<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
<h2 className="text-2xl font-semibold">Add Mock</h2>

<div className="mt-5 space-y-4">

<input
placeholder="Mock Name"
value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}
className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
/>

<div className="grid grid-cols-2 gap-3">

<input
placeholder="Score"
value={form.score}
onChange={e=>setForm({...form,score:e.target.value})}
className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
/>

<input
placeholder="Total"
value={form.total}
onChange={e=>setForm({...form,total:e.target.value})}
className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
/>

<input
placeholder="Accuracy %"
value={form.accuracy}
onChange={e=>setForm({...form,accuracy:e.target.value})}
className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
/>

<input
placeholder="Attempts"
value={form.attempted}
onChange={e=>setForm({...form,attempted:e.target.value})}
className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
/>

<input
placeholder="Time (minutes)"
value={form.time}
onChange={e=>setForm({...form,time:e.target.value})}
className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
/>

<select
value={form.weakestSubject}
onChange={e=>setForm({...form,weakestSubject:e.target.value})}
className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
>
{SUBJECTS.map(subject=>(
<option key={subject}>{subject}</option>
))}
</select>

</div>

<button
onClick={saveMock}
className="primary-btn w-full"
>
Save Mock
</button>

</div>
</div>

<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

<h2 className="text-2xl font-semibold">
AI Mock Review
</h2>

<div className="mt-6 space-y-5">

<div>
<p className="text-zinc-400 text-sm">Mode</p>
<h3 className="text-xl font-bold">{mentor.mode}</h3>
</div>

<div>
<p className="text-zinc-400 text-sm">Priority</p>
<h3>{mentor.priority}</h3>
</div>

<div>
<p className="text-zinc-400 text-sm">Risk</p>
<h3>{mentor.risk}</h3>
</div>

<div>
<p className="text-zinc-400 text-sm">Recommendation</p>
<p>{mentor.recommendation}</p>
</div>

</div>

</div>

</div>

<div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

<h2 className="text-2xl font-semibold">
Mock History
</h2>

{mocks.length===0?(
<p className="mt-6 text-zinc-400">
No mock results saved yet.
</p>
):(
<div className="mt-6 space-y-4">

{[...mocks].reverse().map(mock=>(

<div
key={mock.id}
className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
>

<div className="flex flex-wrap justify-between gap-3">

<div>
<h3 className="font-bold">{mock.name}</h3>
<p className="text-sm text-zinc-500">
{new Date(mock.date).toLocaleDateString()}
</p>
</div>

<div className="text-right">
<p>
<b>{mock.score}</b> / {mock.total}
</p>
<p>{mock.accuracy}% Accuracy</p>
</div>

</div>

<div className="mt-4 grid grid-cols-3 gap-4 text-sm">

<div>
<p className="text-zinc-500">Attempts</p>
<p>{mock.attempted}</p>
</div>

<div>
<p className="text-zinc-500">Time</p>
<p>{mock.time} min</p>
</div>

<div>
<p className="text-zinc-500">Weakest</p>
<p>{mock.weakestSubject}</p>
</div>

</div>

</div>

))}

</div>
)}

</div>

</div>
);
}