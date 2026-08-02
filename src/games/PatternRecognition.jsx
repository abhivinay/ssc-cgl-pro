import{useState}from"react";
import usePatternRecognition from"../hooks/usePatternRecognition";

const TOTAL_ROUNDS=5;

export default function PatternRecognition({
difficulty="easy",
onComplete
}){

const{
state,
submitAnswer,
nextRound,
finishGame
}=usePatternRecognition({difficulty});

const[selected,setSelected]=useState("");

const handleSubmit=()=>{

if(selected==="")return;

const updated=submitAnswer(Number(selected));

setSelected("");

const finalRound=updated.round>=TOTAL_ROUNDS;

if(finalRound){

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
Pattern Recognition
</p>

<h2 className="mt-3 text-3xl font-bold">
Round {state.round} / {TOTAL_ROUNDS}
</h2>

</div>

<div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center">

<p className="text-sm text-zinc-500">
Find the next number
</p>

<p className="mt-5 text-5xl font-black tracking-[0.3em]">
{state.question.sequence.join("  ")} ?
</p>

</div>

<div className="mt-8 grid grid-cols-2 gap-4">

{state.question.options.map(option=>(
<button
key={option}
type="button"
onClick={()=>setSelected(option)}
className={`rounded-2xl border p-5 text-2xl font-bold transition ${
selected===option
?"border-violet-500 bg-violet-600"
:"border-zinc-700 bg-zinc-950 hover:bg-zinc-800"
}`}
>
{option}
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
Expected:
<strong className="ml-2">
{state.lastResult.expected}
</strong>
</p>

</div>
)}

</div>
);

}