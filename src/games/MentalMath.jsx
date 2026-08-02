import{useCallback,useEffect,useRef,useState}from"react";
import GlassCard from"../components/ui/GlassCard";
import Badge from"../components/ui/Badge";
import ProgressBar from"../components/ui/ProgressBar";
import Button from"../components/ui/Button";

const DIFFICULTY_SETTINGS={
easy:{
operations:["add","subtract"],
min:5,
max:50
},
medium:{
operations:["add","subtract","multiply","divide"],
min:10,
max:100
},
hard:{
operations:[
"add",
"subtract",
"multiply",
"divide",
"percentage"
],
min:20,
max:250
}
};

const randomInteger=(minimum,maximum)=>
Math.floor(
Math.random()*(maximum-minimum+1)
)+minimum;

const randomItem=items=>
items[randomInteger(0,items.length-1)];

const createQuestion=difficulty=>{
const settings=
DIFFICULTY_SETTINGS[difficulty]||
DIFFICULTY_SETTINGS.easy;

const operation=randomItem(
settings.operations
);

let first;
let second;
let answer;
let text;

switch(operation){
case"subtract":{
first=randomInteger(
settings.min,
settings.max
);

second=randomInteger(
settings.min,
first
);

answer=first-second;
text=`${first} − ${second}`;
break;
}

case"multiply":{
const multiplierMax=
difficulty==="hard"
?25
:12;

first=randomInteger(
2,
multiplierMax
);

second=randomInteger(
2,
multiplierMax
);

answer=first*second;
text=`${first} × ${second}`;
break;
}

case"divide":{
second=randomInteger(
2,
difficulty==="hard"
?20
:12
);

answer=randomInteger(
2,
difficulty==="hard"
?30
:15
);

first=second*answer;
text=`${first} ÷ ${second}`;
break;
}

case"percentage":{
const percentage=randomItem([
10,
20,
25,
40,
50,
75
]);

const baseMultiplier=randomInteger(
2,
20
);

first=baseMultiplier*20;
answer=first*percentage/100;
text=`${percentage}% of ${first}`;
break;
}

case"add":
default:{
first=randomInteger(
settings.min,
settings.max
);

second=randomInteger(
settings.min,
settings.max
);

answer=first+second;
text=`${first} + ${second}`;
break;
}
}

return{
id:
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
?crypto.randomUUID()
:`mental-${Date.now()}-${Math.random()}`,
text,
answer
};
};

export default function MentalMath({
difficulty="easy",
duration=60,
onComplete,
onProgress
}){
const safeDuration=Math.max(
10,
Math.min(
300,
Number(duration)||60
)
);

const[question,setQuestion]=useState(
()=>createQuestion(difficulty)
);

const[answer,setAnswer]=useState("");
const[timeLeft,setTimeLeft]=useState(
safeDuration
);

const[correctAnswers,setCorrectAnswers]=useState(0);
const[wrongAnswers,setWrongAnswers]=useState(0);
const[feedback,setFeedback]=useState(null);
const[finished,setFinished]=useState(false);

const startedAtRef=useRef(Date.now());
const questionStartedAtRef=useRef(Date.now());
const reactionTimesRef=useRef([]);
const completedRef=useRef(false);
const inputRef=useRef(null);

useEffect(()=>{
const attempts=
correctAnswers+
wrongAnswers;

const accuracy=attempts
?Math.round(
correctAnswers/
attempts*
100
)
:0;

onProgress?.({
score:
correctAnswers*100-
wrongAnswers*25,
correctAnswers,
wrongAnswers,
totalAttempts:attempts,
accuracy
});
},[
correctAnswers,
wrongAnswers,
onProgress
]);

const finishGame=useCallback(()=>{
if(completedRef.current)return;

completedRef.current=true;
setFinished(true);

const reactionTimes=
reactionTimesRef.current;

const averageReactionTime=
reactionTimes.length
?Math.round(
reactionTimes.reduce(
(total,value)=>total+value,
0
)/
reactionTimes.length
)
:0;

const attempts=
correctAnswers+
wrongAnswers;

const accuracy=attempts
?Math.round(
correctAnswers/
attempts*
100
)
:0;

onComplete?.({
correctAnswers,
wrongAnswers,
totalAttempts:attempts,
accuracy,
score:
correctAnswers*100-
wrongAnswers*25,
reactionTime:averageReactionTime,
duration:Math.max(
1,
Math.round(
(
Date.now()-
startedAtRef.current
)/1000
)
)
});
},[
correctAnswers,
wrongAnswers,
onComplete
]);

useEffect(()=>{
if(finished)return;

if(timeLeft<=0){
finishGame();
return;
}

const timer=setTimeout(()=>{
setTimeLeft(previous=>
Math.max(0,previous-1)
);
},1000);

return()=>clearTimeout(timer);
},[
timeLeft,
finished,
finishGame
]);

useEffect(()=>{
inputRef.current?.focus();
},[question]);

const nextQuestion=()=>{
setQuestion(
createQuestion(difficulty)
);

setAnswer("");
setFeedback(null);
questionStartedAtRef.current=Date.now();
};

const submitAnswer=event=>{
event.preventDefault();

if(
finished||
answer.trim()===""
){
return;
}

const numericAnswer=Number(answer);

if(!Number.isFinite(numericAnswer)){
setFeedback({
correct:false,
message:"Enter a valid number."
});
return;
}

reactionTimesRef.current.push(
Date.now()-
questionStartedAtRef.current
);

if(numericAnswer===question.answer){
setCorrectAnswers(
previous=>previous+1
);

setFeedback({
correct:true,
message:"Correct answer"
});
}else{
setWrongAnswers(
previous=>previous+1
);

setFeedback({
correct:false,
message:`Correct answer: ${question.answer}`
});
}

setTimeout(()=>{
nextQuestion();
inputRef.current?.focus();
},300);
};

const attempts=
correctAnswers+
wrongAnswers;

const accuracy=attempts
?Math.round(
correctAnswers/
attempts*
100
)
:0;

const score=
correctAnswers*100-
wrongAnswers*25;

const timeProgress=Math.max(
0,
Math.min(
100,
Math.round(
timeLeft/
safeDuration*
100
)
)
);

const urgent=timeLeft<=10;

return(
<div className="mx-auto max-w-4xl">
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl"/>

<div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
<div>
<div className="flex flex-wrap items-center gap-3">
<Badge
variant="primary"
dot
>
Brain Trainer
</Badge>

<Badge variant="info">
{difficulty.charAt(0).toUpperCase()+difficulty.slice(1)}
</Badge>
</div>

<p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
Current Game
</p>

<h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
⚡ Mental Math
</h1>

<p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
Solve as many calculations as possible before the timer reaches zero.
</p>
</div>

<div className={`flex items-center gap-4 rounded-3xl border p-4 ${
urgent
?"border-rose-400/20 bg-rose-500/[0.06]"
:"border-emerald-400/20 bg-emerald-500/[0.06]"
}`}>
<div className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl ${
urgent
?"border-rose-400/20 bg-rose-500/10"
:"border-emerald-400/20 bg-emerald-500/10"
}`}>
⏱️
</div>

<div>
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Time Remaining
</p>

<p className={`mt-1 text-3xl font-black ${
urgent
?"text-rose-300"
:"text-emerald-300"
}`}>
{timeLeft}s
</p>
</div>
</div>
</div>

<div className="mt-8">
<ProgressBar
value={timeProgress}
size="lg"
variant={
urgent
?"danger"
:"success"
}
showValue
label="Time remaining"
/>
</div>

<div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
<MetricCard
label="Score"
value={Math.max(0,score)}
icon="⭐"
accent="violet"
/>

<MetricCard
label="Correct"
value={correctAnswers}
icon="✓"
accent="emerald"
/>

<MetricCard
label="Wrong"
value={wrongAnswers}
icon="✕"
accent="rose"
/>

<MetricCard
label="Accuracy"
value={`${accuracy}%`}
icon="🎯"
accent="sky"
/>
</div>

{finished?(
<div className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-500/[0.06] p-8 text-center">
<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-emerald-400/20 bg-emerald-500/10 text-4xl">
🏁
</div>

<h2 className="mt-5 text-3xl font-black text-white">
Mental Math Complete
</h2>

<p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">
You answered{" "}
<span className="font-black text-emerald-300">
{correctAnswers}
</span>{" "}
correctly from{" "}
<span className="font-black text-white">
{attempts}
</span>{" "}
attempts.
</p>
</div>
):(
<form
onSubmit={submitAnswer}
className="mt-8"
>
<div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-8 text-center md:p-12">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12),transparent_55%)]"/>

<div className="relative">
<p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
Solve
</p>

<p className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">
{question.text}
</p>
</div>
</div>

<div className="mt-5">
<input
ref={inputRef}
type="number"
step="any"
value={answer}
onChange={event=>
setAnswer(event.target.value)
}
placeholder="Type your answer"
className="min-h-16 w-full rounded-2xl border border-zinc-700 bg-zinc-950/80 px-5 py-4 text-center text-2xl font-black text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
/>
</div>

{feedback&&(
<div className={`mt-4 rounded-2xl border px-4 py-3 text-center text-sm font-black ${
feedback.correct
?"border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
:"border-rose-400/20 bg-rose-500/10 text-rose-300"
}`}>
{feedback.message}
</div>
)}

<Button
type="submit"
disabled={answer.trim()===""}
size="xl"
fullWidth
className="mt-5"
rightIcon="→"
>
Submit Answer
</Button>
</form>
)}
</div>
</GlassCard>
</div>
);
}

function MetricCard({
label,
value,
icon,
accent
}){
const styles={
violet:
"text-violet-300 border-violet-400/20 bg-violet-500/10",
emerald:
"text-emerald-300 border-emerald-400/20 bg-emerald-500/10",
rose:
"text-rose-300 border-rose-400/20 bg-rose-500/10",
sky:
"text-sky-300 border-sky-400/20 bg-sky-500/10"
};

return(
<div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
<div className="flex items-center justify-between gap-3">
<p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
{label}
</p>

<div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
styles[accent]||styles.violet
}`}>
{icon}
</div>
</div>

<p className="mt-4 text-3xl font-black text-white">
{value}
</p>
</div>
);
}