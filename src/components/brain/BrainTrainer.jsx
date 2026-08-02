import{useCallback,useEffect,useMemo,useState}from"react";
import{useStudy}from"../../context/StudyContext";

const PUZZLES=[
{q:"2, 6, 12, 20, 30, ?",a:"42"},
{q:"AZ, BY, CX, DW, ?",a:"EV"},
{q:"If SOUTH becomes TVPUI, EAST becomes ?",a:"FBTU"},
{q:"A is brother of B. B is mother of C. A is C's ?",a:"Uncle"},
{q:"3, 9, 27, 81, ?",a:"243"},
{q:"Mirror of 2:35 is ?",a:"9:25"},
{q:"Find odd one: Circle, Square, Triangle, Cube",a:"Cube"},
{q:"If 5+3=28 and 9+1=82, then 7+2=?",a:"47"},
{q:"North, East, South, West, North, ?",a:"East"},
{q:"16, 25, 36, 49, ?",a:"64"}
];

const getToday=()=>new Date().toISOString().slice(0,10);

export default function BrainTrainer(){
const{studyState,completeBrainTrainer}=useStudy();
const[daily,setDaily]=useState([]);
const[index,setIndex]=useState(0);
const[answer,setAnswer]=useState("");
const[score,setScore]=useState(0);
const[timeLeft,setTimeLeft]=useState(600);
const[finished,setFinished]=useState(Boolean(studyState.brainTrainerCompleted));

useEffect(()=>{
const today=getToday();

try{
const saved=JSON.parse(localStorage.getItem("brainDaily"));

if(saved?.date===today&&Array.isArray(saved.puzzles)){
setDaily(saved.puzzles);
setIndex(Number(saved.index)||0);
setScore(Number(saved.score)||0);
setTimeLeft(Math.max(0,Number(saved.timeLeft) || 600));
setFinished(Boolean(saved.finished)||Boolean(studyState.brainTrainerCompleted));
return;
}
}catch{
localStorage.removeItem("brainDaily");
}

const puzzles=[...PUZZLES].sort(()=>Math.random()-0.5).slice(0,5);

setDaily(puzzles);
setIndex(0);
setScore(0);
setTimeLeft(600);
setFinished(Boolean(studyState.brainTrainerCompleted));

localStorage.setItem("brainDaily",JSON.stringify({
date:today,
puzzles,
index:0,
score:0,
timeLeft:600,
finished:Boolean(studyState.brainTrainerCompleted)
}));
},[studyState.brainTrainerCompleted]);

const finishSession=useCallback(finalScore=>{
const safeScore=Math.max(0,Number(finalScore)||0);
const best=Number(localStorage.getItem("brainBest"))||0;

if(safeScore>best)localStorage.setItem("brainBest",String(safeScore));

setScore(safeScore);
setFinished(true);
completeBrainTrainer();

localStorage.setItem("brainDaily",JSON.stringify({
date:getToday(),
puzzles:daily,
index,
score:safeScore,
timeLeft,
finished:true
}));
},[completeBrainTrainer,daily,index,timeLeft]);

useEffect(()=>{
if(finished||daily.length===0)return;

const timer=setInterval(()=>{
setTimeLeft(previous=>{
if(previous<=1){
clearInterval(timer);
finishSession(score);
return 0;
}

const next=previous-1;

localStorage.setItem("brainDaily",JSON.stringify({
date:getToday(),
puzzles:daily,
index,
score,
timeLeft:next,
finished:false
}));

return next;
});
},1000);

return()=>clearInterval(timer);
},[daily,finished,finishSession,index,score]);

const submit=()=>{
if(!daily[index]||finished)return;

const correct=daily[index].a.toLowerCase().trim();
const user=answer.toLowerCase().trim();
const nextScore=score+(user===correct?1:0);
const nextIndex=index+1;

setScore(nextScore);
setAnswer("");

if(nextIndex>=daily.length){
finishSession(nextScore);
return;
}

setIndex(nextIndex);

localStorage.setItem("brainDaily",JSON.stringify({
date:getToday(),
puzzles:daily,
index:nextIndex,
score:nextScore,
timeLeft,
finished:false
}));
};

const minutes=Math.floor(timeLeft/60);
const seconds=String(timeLeft%60).padStart(2,"0");
const best=useMemo(()=>Number(localStorage.getItem("brainBest"))||score,[finished,score]);

if(daily.length===0)return<div className="card">Loading Brain Trainer...</div>;

return(
<div className="card">
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<h3>🧠 Brain Trainer</h3>
<span>⏱ {minutes}:{seconds}</span>
</div>
{finished?(
<div style={{textAlign:"center",padding:"20px 0"}}>
<h2>Session Complete</h2>
<h1>{score}/{daily.length}</h1>
<p>Best: {best}/{daily.length}</p>
<p>Today&apos;s missions are unlocked.</p>
</div>
):(
<>
<p>Puzzle {index+1} / {daily.length}</p>
<div style={{fontSize:"1.1rem",fontWeight:600,margin:"16px 0"}}>
{daily[index].q}
</div>
<input
value={answer}
onChange={event=>setAnswer(event.target.value)}
onKeyDown={event=>{
if(event.key==="Enter")submit();
}}
placeholder="Type your answer"
style={{width:"100%",padding:"12px",borderRadius:"12px",border:"1px solid #334155",marginBottom:"12px"}}
/>
<button className="primary-btn" onClick={submit} disabled={!answer.trim()}>
Submit
</button>
<div style={{marginTop:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<span>Score</span>
<span>{score}/{daily.length}</span>
</div>
<progress value={index} max={daily.length} style={{width:"100%"}}/>
</div>
</>
)}
</div>
);
}