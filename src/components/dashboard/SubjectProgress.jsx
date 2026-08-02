import {useStudy} from "../../context/StudyContext";

export default function SubjectProgress(){
const {studyState}=useStudy();
const subjects=[
{name:"Quant",topics:studyState.topics.filter(t=>t.id>=1&&t.id<=34)},
{name:"Reasoning",topics:studyState.topics.filter(t=>t.id>=1&&t.id<=31&&!t.estimatedHours)},
{name:"English",topics:studyState.topics.filter(t=>t.id>=1&&t.id<=32&&t.notes)},
{name:"GK",topics:studyState.topics.filter(t=>t.id>=1&&t.id<=36&&t.mistakes)}
];

return(
<div className="card">
<h3>Subject Progress</h3>
{subjects.map(subject=>{
const total=subject.topics.length;
const completed=subject.topics.filter(t=>t.completed).length;
const progress=total?Math.round((completed/total)*100):0;

return(
<div key={subject.name} style={{marginBottom:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<span>{subject.name}</span>
<span>{progress}%</span>
</div>
<progress value={progress} max="100" style={{width:"100%"}}/>
</div>
);
})}
</div>
);
}