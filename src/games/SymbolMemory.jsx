import{useEffect,useMemo,useState}from"react";
import useSymbolMemory from"../hooks/useSymbolMemory";

const TOTAL_ROUNDS=5;

export default function SymbolMemory({
difficulty="easy",
onComplete
}){

const{
state,
submitAnswer,
nextRound,
finishGame
}=useSymbolMemory({difficulty});

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

const options=useMemo(
()=>state.challenge.options,
[state.challenge.options]
);

const toggle=symbol=>{

if(memorize)return;

setSelected(previous=>{

if(previous.includes(symbol)){
return previous.filter(
item=>item!==symbol
);
}

return[
...previous,
symbol
];

});

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
Symbol Memory
</p>

<h2 className="mt-3 text-3xl font-bold">
Round {state.round} / {TOTAL_ROUNDS}
</h2>

</div>

<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center">

{memorize?(
<p className="text-6xl tracking-[0.3em]">
{state.challenge.sequence.join(" ")}
</p>
):(
<p className="text-2xl text-zinc-500">
Select symbols in the same order.
</p>
)}

</div>

{!memorize&&(

<>

<div className="mt-8 grid grid-cols-4 gap-4">

{options.map(symbol=>(

<button
key={symbol}
type="button"
onClick={()=>toggle(symbol)}
className={`rounded-2xl border p-5 text-4xl transition ${
selected.includes(symbol)
?"border-violet-500 bg-violet-600"
:"border-zinc-700 bg-zinc-950 hover:bg-zinc-800"
}`}
>

{symbol}

</button>

))}

</div>

<p className="mt-6 text-center text-4xl tracking-[0.25em]">
{selected.join(" ")}
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