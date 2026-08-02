import {useState} from "react";
import {pyqPapers,pyqTopics,years} from "../data/pyqData";

export default function PYQBank(){
const [selectedYear,setSelectedYear]=useState("All");

const filteredPapers=selectedYear==="All"
?pyqPapers
:pyqPapers.filter(p=>p.year===Number(selectedYear));

const topTopics=[...pyqTopics]
.sort((a,b)=>b.frequency-a.frequency)
.slice(0,8);

return(
<div className="page">
<h2>PYQ Bank (2017–2025)</h2>

<div className="card">
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
<div>
<h3>Previous Year Papers</h3>
<p>Real SSC CGL Tier-1 papers from your local PDF database.</p>
</div>

<select
value={selectedYear}
onChange={e=>setSelectedYear(e.target.value)}
style={{padding:"10px 14px",borderRadius:"12px"}}
>
<option value="All">All Years</option>
{years.map(year=>(
<option key={year} value={year}>{year}</option>
))}
</select>
</div>
</div>

<div className="syllabus-grid">
{filteredPapers.map(paper=>(
<div key={paper.id} className="subject-card">
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span className="status active">{paper.year}</span>
<span style={{fontSize:"0.85rem",opacity:0.8}}>{paper.shift}</span>
</div>

<h3 style={{marginTop:"12px"}}>{paper.title}</h3>
<p>Full Tier-1 PYQ paper</p>

<div style={{display:"flex",gap:"10px",marginTop:"16px"}}>
<a
href={paper.pdf}
target="_blank"
rel="noreferrer"
className="primary-btn"
style={{textDecoration:"none",display:"inline-flex",alignItems:"center",justifyContent:"center"}}
>
Open PDF
</a>

<button className="primary-btn" style={{background:"#475569"}}>
Analyze
</button>
</div>
</div>
))}
</div>

<div className="card" style={{marginTop:"20px"}}>
<h3>Most Repeated SSC Topics</h3>
<div className="focus-grid" style={{marginTop:"16px"}}>
{topTopics.map(topic=>(
<div key={topic.topic} className="focus-box">
<p style={{fontSize:"0.85rem",opacity:0.8}}>{topic.subject}</p>
<h4>{topic.topic}</h4>
<p style={{fontWeight:600,marginTop:"8px"}}>{topic.frequency} PYQs</p>
</div>
))}
</div>
</div>
</div>
);
}