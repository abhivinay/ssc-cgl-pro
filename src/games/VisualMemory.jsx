import{useEffect,useMemo,useRef,useState}from"react";
import useVisualMemory from"../hooks/useVisualMemory";

const TOTAL_ROUNDS=5;

export default function VisualMemory({
difficulty="easy",
onComplete
}){
const{
state,
submitSelection,
nextRound,
finishGame
}=useVisualMemory({difficulty});

const[revealed,setRevealed]=useState(true);
const[selected,setSelected]=useState([]);
const[submitting,setSubmitting]=useState(false);
const completedRef=useRef(false);

useEffect(()=>{
setRevealed(true);
setSelected([]);
setSubmitting(false);

const timer=setTimeout(()=>{
setRevealed(false);
},state.displayDuration);

return()=>clearTimeout(timer);
},[
state.round,
state.displayDuration
]);

const highlighted=useMemo(
()=>new Set(state.board.highlightedIndexes),
[state.board.highlightedIndexes]
);

const selectedSet=useMemo(
()=>new Set(selected),
[selected]
);

const handleCellClick=index=>{
if(
revealed||
submitting||
state.phase==="completed"
){
return;
}

setSelected(previous=>{
if(previous.includes(index)){
return previous.filter(
item=>item!==index
);
}

return[
...previous,
index
];
});
};

const handleSubmit=()=>{

if(
revealed||
submitting||
completedRef.current||
selected.length===0
){
return;
}

setSubmitting(true);
const updatedState=submitSelection(selected);

const isFinalRound=
Number(updatedState.round)>=TOTAL_ROUNDS;

if(isFinalRound){

completedRef.current=true;

const summary=finishGame(updatedState);

const attempts=
summary.correctAnswers+
summary.wrongAnswers;

const accuracy=attempts
?Math.round(
(summary.correctAnswers/attempts)*100
)
:0;

onComplete?.({
correctAnswers:summary.correctAnswers,
wrongAnswers:summary.wrongAnswers,
totalAttempts:attempts,
accuracy,
score:
summary.correctAnswers*100-
summary.wrongAnswers*25,
reactionTime:summary.duration*1000
});

return;
}

const delay=updatedState.lastResult?.correct
?1000
:1200;

setTimeout(()=>{
nextRound();
},delay);

};

return(
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
<div className="text-center">
<p className="text-sm uppercase tracking-widest text-violet-400">
Visual Memory
</p>

<h2 className="mt-3 text-3xl font-bold">
Round {state.round} / {TOTAL_ROUNDS}
</h2>

<p className="mt-2 text-sm text-zinc-500">
{revealed
?"Remember the highlighted tiles."
:"Select every tile you remember."}
</p>
</div>

<div
className="mx-auto mt-10 grid gap-3"
style={{
gridTemplateColumns:
`repeat(${state.board.gridSize},1fr)`,
maxWidth:
`${state.board.gridSize*80}px`
}}
>
{Array.from({
length:state.board.totalCells
}).map((_,index)=>(
<button
key={index}
type="button"
disabled={
revealed||
submitting||
state.phase==="completed"
}
aria-label={`Visual memory tile ${index+1}`}
onClick={()=>
handleCellClick(index)
}
className={`aspect-square rounded-xl border transition-all duration-200 ${
revealed
?highlighted.has(index)
?"border-emerald-400 bg-emerald-500"
:"border-zinc-700 bg-zinc-800"
:selectedSet.has(index)
?"border-violet-400 bg-violet-500"
:"border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
}`}
 />
))}
</div>

{!revealed&&state.phase!=="completed"&&(
<button
type="button"
disabled={
submitting||
selected.length===0
}
onClick={handleSubmit}
className="mt-8 w-full rounded-2xl bg-violet-600 py-4 text-lg font-bold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
>
{submitting
?"Checking..."
:"Submit"}
</button>
)}

{state.lastResult&&(
<div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
<p className={`text-xl font-bold ${
state.lastResult.correct
?"text-emerald-400"
:"text-red-400"
}`}>
{state.lastResult.correct
?"✅ Correct!"
:"❌ Wrong!"}
</p>

<p className="mt-3 text-zinc-400">
Accuracy
<strong className="ml-2">
{state.lastResult.accuracy}%
</strong>
</p>
</div>
)}
</div>
);
}