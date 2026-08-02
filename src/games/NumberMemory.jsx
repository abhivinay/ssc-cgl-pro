import{useEffect,useRef,useState}from"react";
import useNumberMemory from"../hooks/useNumberMemory";

export default function NumberMemory({
difficulty="easy",
onComplete
}){

const{
state,
submitAnswer,
nextRound,
finishGame
}=useNumberMemory({difficulty});

const[answer,setAnswer]=useState("");
const[showNumber,setShowNumber]=useState(true);

const inputRef=useRef(null);

useEffect(()=>{

setShowNumber(true);

const timer=setTimeout(()=>{

setShowNumber(false);

inputRef.current?.focus();

},state.displayDuration);

return()=>clearTimeout(timer);

},[
state.round,
state.displayDuration
]);

const handleSubmit=e=>{

e.preventDefault();

const result=submitAnswer(answer);

setAnswer("");

if(result.lastResult.correct){

if(state.round>=5){

const summary=finishGame();

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
reactionTime:summary.reactionTime
});

return;

}

setTimeout(()=>{
nextRound();
},1000);

}else{

setTimeout(()=>{
nextRound();
},1200);

}

};

return(

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

<div className="text-center">

<p className="text-sm uppercase tracking-widest text-violet-400">

Number Memory

</p>

<h2 className="mt-3 text-3xl font-bold">

Round {state.round}

</h2>

</div>

<div className="mt-10 flex justify-center">

<div className="flex h-36 w-full max-w-md items-center justify-center rounded-3xl border border-zinc-800 bg-black text-6xl font-black tracking-[0.5em]">

{showNumber
?state.currentValue
:"••••••"}

</div>

</div>

<form
onSubmit={handleSubmit}
className="mt-10 space-y-5"
>

<input
ref={inputRef}
type="text"
value={answer}
onChange={e=>setAnswer(e.target.value)}
disabled={showNumber}
placeholder="Enter Number"
className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-center text-2xl outline-none focus:border-violet-500"
/>

<button
type="submit"
disabled={showNumber}
className="w-full rounded-2xl bg-violet-600 py-4 text-lg font-bold transition hover:bg-violet-500 disabled:opacity-50"
>

Submit

</button>

</form>

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

{" "}

<strong>

{state.lastResult.expected}

</strong>

</p>

<p className="mt-1 text-zinc-400">

Accuracy:

{" "}

<strong>

{state.lastResult.digitAccuracy}%

</strong>

</p>

</div>

)}

</div>

);

}