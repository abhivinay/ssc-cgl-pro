import{useEffect,useState}from"react";
import useDirectionMemory from"../hooks/useDirectionMemory";

const TOTAL_ROUNDS=5;

export default function DirectionMemory({
difficulty="easy",
onComplete
}){

const{
state,
submitAnswer,
nextRound,
finishGame
}=useDirectionMemory({difficulty});

const[memorize,setMemorize]=useState(true);
const[selected,setSelected]=useState([]);

useEffect(()=>{

setMemorize(true);
setSelected([]);

const timer=setTimeout(()=>{
setMemorize(false);
},state.challenge.displayDuration);

return()=>clearTimeout(timer);

},[
state.round,
state.challenge.displayDuration
]);

const handleDirection=direction=>{

if(memorize)return;

setSelected(previous=>[
...previous,
direction
]);

};

const handleSubmit=()=>{

const updated=
submitAnswer(selected);

if(updated.round>=TOTAL_ROUNDS){

const summary=
finishGame();

onComplete?.({
correctAnswers:summary.correctAnswers,
wrongAnswers:summary.wrongAnswers,
totalAttempts:summary.totalAttempts,
accuracy:summary.accuracy,
score:summary.score,
reactionTime:summary.reactionTime
});

return;

}

setTimeout(()=>{
nextRound();
},updated.lastResult.correct?900:1200);

};

return(

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

<div className="text-center">

<p className="text-sm uppercase tracking-widest text-violet-400">
Direction Memory
</p>

<h2 className="mt-3 text-3xl font-bold">
Round {state.round} / {TOTAL_ROUNDS}
</h2>

</div>

<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center">

{memorize?(
<p className="text-6xl tracking-[0.35em]">
{state.challenge.symbols.join(" ")}
</p>
):(
<p className="text-2xl text-zinc-500">
Repeat the directions in order.
</p>
)}

</div>

{!memorize&&(

<>

<div className="mt-8 grid grid-cols-2 gap-4">

<button
onClick={()=>handleDirection("up")}
className="rounded-2xl bg-zinc-800 p-5 text-3xl"
>
↑
</button>

<button
onClick={()=>handleDirection("down")}
className="rounded-2xl bg-zinc-800 p-5 text-3xl"
>
↓
</button>

<button
onClick={()=>handleDirection("left")}
className="rounded-2xl bg-zinc-800 p-5 text-3xl"
>
←
</button>

<button
onClick={()=>handleDirection("right")}
className="rounded-2xl bg-zinc-800 p-5 text-3xl"
>
→
</button>

</div>

<p className="mt-6 text-center text-lg font-bold text-violet-400">
{selected.map(direction=>{
if(direction==="up")return"↑";
if(direction==="down")return"↓";
if(direction==="left")return"←";
return"→";
}).join(" ")}
</p>

<button
type="button"
disabled={
selected.length!==
state.challenge.sequence.length
}
onClick={handleSubmit}
className="mt-8 w-full rounded-2xl bg-violet-600 py-4 text-lg font-bold transition hover:bg-violet-500 disabled:opacity-40"
>
Submit
</button>

</>

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