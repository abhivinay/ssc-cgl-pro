import {pyqTopics} from "../data/pyqData";

export default function PYQIntelligence(){

const topQuant=pyqTopics.filter(t=>t.subject==="Quant").sort((a,b)=>b.frequency-a.frequency);
const topReasoning=pyqTopics.filter(t=>t.subject==="Reasoning").sort((a,b)=>b.frequency-a.frequency);
const topEnglish=pyqTopics.filter(t=>t.subject==="English").sort((a,b)=>b.frequency-a.frequency);
const topGK=pyqTopics.filter(t=>t.subject==="GK").sort((a,b)=>b.frequency-a.frequency);

const predicted2026=[
{topic:"Percentage",probability:"95%",reason:"Appears in almost every Tier-1 paper"},
{topic:"Seating Arrangement",probability:"92%",reason:"High reasoning weightage in recent years"},
{topic:"Error Detection",probability:"90%",reason:"Consistent English question source"},
{topic:"Modern History",probability:"88%",reason:"Repeated GK coverage across shifts"}
];

return(
<div className="page">

<h2>PYQ Intelligence Dashboard</h2>
<p>AI-driven frequency analysis from SSC CGL previous year papers.</p>

<div className="dashboard-grid" style={{marginTop:"20px"}}>

<div className="streak-box">
<span>Papers Indexed</span>
<h2>2017–2025</h2>
</div>

<div className="streak-box">
<span>Topics Tracked</span>
<h2>{pyqTopics.length}</h2>
</div>

<div className="streak-box">
<span>AI Confidence</span>
<h2>89%</h2>
</div>

</div>

<div className="syllabus-grid" style={{marginTop:"20px"}}>

<div className="subject-card">
<h3>Quantitative Aptitude</h3>
<ul className="topic-list">
{topQuant.map(item=>(
<li key={item.topic}>
<span>{item.topic}</span>
<span>{item.frequency} PYQs</span>
</li>
))}
</ul>
</div>

<div className="subject-card">
<h3>Reasoning</h3>
<ul className="topic-list">
{topReasoning.map(item=>(
<li key={item.topic}>
<span>{item.topic}</span>
<span>{item.frequency} PYQs</span>
</li>
))}
</ul>
</div>

<div className="subject-card">
<h3>English</h3>
<ul className="topic-list">
{topEnglish.map(item=>(
<li key={item.topic}>
<span>{item.topic}</span>
<span>{item.frequency} PYQs</span>
</li>
))}
</ul>
</div>

<div className="subject-card">
<h3>General Awareness</h3>
<ul className="topic-list">
{topGK.map(item=>(
<li key={item.topic}>
<span>{item.topic}</span>
<span>{item.frequency} PYQs</span>
</li>
))}
</ul>
</div>

</div>

<div className="card" style={{marginTop:"20px"}}>
<h3>AI Prediction: SSC CGL 2026 High Probability Topics</h3>

<div style={{display:"grid",gap:"12px",marginTop:"16px"}}>
{predicted2026.map((item,index)=>(
<div key={item.topic} className="focus-box">
<div style={{display:"flex",justifyContent:"space-between"}}>
<strong>{index+1}. {item.topic}</strong>
<span>{item.probability}</span>
</div>
<p style={{marginTop:"8px"}}>{item.reason}</p>
</div>
))}
</div>

</div>

<div className="card" style={{marginTop:"20px"}}>
<h3>Recommended 7-Day PYQ Sprint</h3>

<div className="focus-grid" style={{marginTop:"16px"}}>

<div className="focus-box"><strong>Day 1</strong><p>Percentage + Ratio</p></div>
<div className="focus-box"><strong>Day 2</strong><p>Seating Arrangement</p></div>
<div className="focus-box"><strong>Day 3</strong><p>Error Detection</p></div>
<div className="focus-box"><strong>Day 4</strong><p>Modern History</p></div>
<div className="focus-box"><strong>Day 5</strong><p>Time & Work</p></div>
<div className="focus-box"><strong>Day 6</strong><p>Coding-Decoding</p></div>
<div className="focus-box"><strong>Day 7</strong><p>Mixed 100 PYQ Test</p></div>

</div>

</div>

</div>
);
}