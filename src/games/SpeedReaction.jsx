import{useEffect,useState}from"react";
import useSpeedReaction from"../hooks/useSpeedReaction";

const TOTAL_ROUNDS=5;

export default function SpeedReaction({
difficulty="easy",
onComplete
}){

const{
state,
revealSignal,
submitClick,
nextRound,
finishGame
}=useSpeedReaction({difficulty});

const[canClick,setCanClick]=useState(false);

useEffect(()=>{

setCanClick(false);

const timer=setTimeout(()=>{

revealSignal();
setCanClick(true);

},state.challenge.delay);

return()=>clearTimeout(timer);

},[
state.round,
state.challenge.id,
state.challenge.delay,
revealSignal
]);

const handleClick=()=>{

const updated=
submitClick(Date.now());

setCanClick(false);

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
},updated.lastResult.valid?1000:1200);

};

return(

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

<div className="text-center">

<p className="text-sm uppercase tracking-widest text-violet-400">
Speed Reaction
</p>

<h2 className="mt-3 text-3xl font-bold">
Round {state.round} / {TOTAL_ROUNDS}
</h2>

</div>

<div
onClick={canClick?handleClick:undefined}
className={`mt-10 flex h-80 cursor-pointer items-center justify-center rounded-3xl border text-center transition ${
canClick
?"border-emerald-400 bg-emerald-500 text-black"
:"border-zinc-800 bg-zinc-950 text-zinc-500"
}`}
>

{canClick
?"CLICK NOW!"
:"Wait..."}

</div>

{state.lastResult&&(

<div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

<p className={`text-xl font-bold ${
state.lastResult.valid
?"text-emerald-400"
:"text-red-400"
}`}>

{state.lastResult.valid
?"✅ Good!"
:"❌ Too Early!"}

</p>

{state.lastResult.valid&&(

<p className="mt-3 text-zinc-400">

Reaction

<strong className="ml-2">

{state.lastResult.reactionTime} ms

</strong>

</p>

)}

<p className="mt-2 text-zinc-400">

Rating

<strong className="ml-2">

{state.lastResult.rating}

</strong>

</p>

</div>

)}

</div>

);

}