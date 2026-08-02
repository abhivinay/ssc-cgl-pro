import {useState} from "react";
import {useStudy} from "../context/StudyContext";
import mentorEngine from "../utils/mentorEngine";

export default function MockImport(){
const {studyState,setStudyState}=useStudy();

const [form,setForm]=useState({
name:"Oliveboard Mock",
score:"",
accuracy:"",
timeTaken:"",
weakTopics:"",
strongTopics:""
});

const saveMock=()=>{
if(!form.score||!form.accuracy)return;

const mock={
id:Date.now(),
...form,
score:Number(form.score),
accuracy:Number(form.accuracy),
date:new Date().toISOString()
};

setStudyState({
...studyState,
mocks:[mock,...studyState.mocks]
});

setForm({
name:"Oliveboard Mock",
score:"",
accuracy:"",
timeTaken:"",
weakTopics:"",
strongTopics:""
});
};

const deleteMock=id=>{
setStudyState({
...studyState,
mocks:studyState.mocks.filter(m=>m.id!==id)
});
};

const getAIReport=mock=>mentorEngine({
progress:studyState.topics.length
?(studyState.topics.filter(t=>t.completed).length/studyState.topics.length)*100
:0,
revisions:studyState.revisions.filter(r=>!r.completed).length,
latestMock:mock
});

return(
<div className="page">
<h2>Mock Import Center</h2>

<div className="card">
<h3>Import Oliveboard Result</h3>

<input
value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}
placeholder="Mock Name"
style={{width:"100%",padding:"12px",marginBottom:"12px",borderRadius:"12px"}}
/>

<div className="focus-grid">
<input
type="number"
value={form.score}
onChange={e=>setForm({...form,score:e.target.value})}
placeholder="Score"
style={{padding:"12px",borderRadius:"12px"}}
/>

<input
type="number"
value={form.accuracy}
onChange={e=>setForm({...form,accuracy:e.target.value})}
placeholder="Accuracy %"
style={{padding:"12px",borderRadius:"12px"}}
/>
</div>

<input
value={form.timeTaken}
onChange={e=>setForm({...form,timeTaken:e.target.value})}
placeholder="Time Taken (e.g. 56m 20s)"
style={{width:"100%",padding:"12px",margin:"12px 0",borderRadius:"12px"}}
/>

<textarea
value={form.weakTopics}
onChange={e=>setForm({...form,weakTopics:e.target.value})}
placeholder="Weak Topics (comma separated)"
rows="3"
style={{width:"100%",padding:"12px",marginBottom:"12px",borderRadius:"12px"}}
/>

<textarea
value={form.strongTopics}
onChange={e=>setForm({...form,strongTopics:e.target.value})}
placeholder="Strong Topics (comma separated)"
rows="2"
style={{width:"100%",padding:"12px",marginBottom:"12px",borderRadius:"12px"}}
/>

<button className="primary-btn" onClick={saveMock}>
Import Mock
</button>
</div>

<div className="card">
<h3>Mock History ({studyState.mocks.length})</h3>

{studyState.mocks.length===0?(
<p>No mock results imported yet.</p>
):(
<div style={{display:"grid",gap:"12px"}}>
{studyState.mocks.map(mock=>{
const ai=getAIReport(mock);

return(
<div key={mock.id} className="focus-box">
<div style={{display:"flex",justifyContent:"space-between",alignItems:"start"}}>
<div>
<h4>{mock.name}</h4>
<p>📅 {new Date(mock.date).toLocaleDateString()}</p>
</div>

<button
onClick={()=>deleteMock(mock.id)}
style={{background:"#ef4444",color:"white",border:"none",padding:"6px 10px",borderRadius:"8px"}}
>
Delete
</button>
</div>

<div className="focus-grid" style={{marginTop:"12px"}}>
<div className="streak-box">
<span>Score</span>
<h2>{mock.score}</h2>
</div>

<div className="streak-box">
<span>Accuracy</span>
<h2>{mock.accuracy}%</h2>
</div>

<div className="streak-box">
<span>Time</span>
<h2>{mock.timeTaken||"-"}</h2>
</div>
</div>

{mock.weakTopics&&(
<p style={{marginTop:"12px"}}>
<strong>Weak:</strong> {mock.weakTopics}
</p>
)}

{mock.strongTopics&&(
<p>
<strong>Strong:</strong> {mock.strongTopics}
</p>
)}

<div style={{marginTop:"12px",padding:"12px",borderRadius:"12px",background:"rgba(59,130,246,0.08)"}}>
<p><strong>Mode:</strong> {ai.mode}</p>
<p><strong>Priority:</strong> {ai.priority}</p>
<p><strong>Risk:</strong> {ai.risk}</p>
<p style={{marginTop:"8px"}}>
<strong>Sentinel AI:</strong> {ai.recommendation}
</p>
</div>
</div>
);
})}
</div>
)}
</div>
</div>
);
}