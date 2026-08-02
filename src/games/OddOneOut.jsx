import{useState}from"react";
import useOddOneOut from"../hooks/useOddOneOut";

const TOTAL_ROUNDS=5;

export default function OddOneOut({
difficulty="easy",
onComplete
}){

const{
state,
submitAnswer,
nextRound,
finishGame
}=useOddOneOut({difficulty});

const[selected,setSelected]=useState("");

const handleSubmit=()=>{

if(selected==="")return;

const updated=submitAnswer(selected);

setSelected("");

if(updated.round>=TOTAL_ROUNDS){

const summary=finishGame();

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
Odd One Out
</p>

<h2 className="mt-3 text-3xl font-bold">
Round {state.round} / {TOTAL_ROUNDS}
</h2>

<p className="mt-2 text-zinc-500">
Select the odd one out.
</p>

</div>

<div className="mt-8 grid grid-cols-2 gap-4">

{state.question.items.map(item=>(
<button
key={item}
type="button"
onClick={()=>setSelected(item)}
className={`rounded-2xl border p-6 text-3xl font-bold transition ${
selected===item
?"border-violet-500 bg-violet-600"
:"border-zinc-700 bg-zinc-950 hover:bg-zinc-800"
}`}
>
{item}
</button>
))}

</div>

<button
type="button"
disabled={selected===""}
onClick={handleSubmit}
className="mt-8 w-full rounded-2xl bg-violet-600 py-4 text-lg font-bold transition hover:bg-violet-500 disabled:opacity-40"
>
Submit
</button>

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

Correct Answer

<strong className="ml-2">
{state.lastResult.expected}
</strong>

</p>

<p className="mt-2 text-zinc-400">

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