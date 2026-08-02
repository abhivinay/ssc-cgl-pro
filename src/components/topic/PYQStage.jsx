import{useMemo,useState}from"react";
import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";
import Button from"../ui/Button";
import ProgressBar from"../ui/ProgressBar";

const getAnswerIndex=question=>{
const value=Number(question?.answer);
return Number.isInteger(value)?value:null;
};

export default function PYQStage({
questions=[],
onComplete
}){
const safeQuestions=Array.isArray(questions)
?questions
:[];

const[currentIndex,setCurrentIndex]=useState(0);
const[selectedAnswer,setSelectedAnswer]=useState(null);
const[answers,setAnswers]=useState([]);
const[showSolution,setShowSolution]=useState(false);
const[finished,setFinished]=useState(false);

const currentQuestion=safeQuestions[currentIndex]||null;

const correctAnswers=useMemo(
()=>answers.filter(item=>item.correct).length,
[answers]
);

const wrongAnswers=answers.length-correctAnswers;

const accuracy=answers.length
?Math.round(
correctAnswers/answers.length*100
)
:0;

const progress=safeQuestions.length
?Math.round(
answers.length/safeQuestions.length*100
)
:0;

const submitAnswer=()=>{
if(
selectedAnswer===null||
!currentQuestion
){
return;
}

const correctAnswer=
getAnswerIndex(currentQuestion);

setAnswers(previous=>[
...previous,
{
questionId:currentQuestion.id,
selectedAnswer,
correctAnswer,
correct:selectedAnswer===correctAnswer
}
]);

setShowSolution(true);
};

const nextQuestion=()=>{
const isLast=
currentIndex>=safeQuestions.length-1;

if(isLast){
setFinished(true);
return;
}

setCurrentIndex(previous=>previous+1);
setSelectedAnswer(null);
setShowSolution(false);
};

const resetStage=()=>{
setCurrentIndex(0);
setSelectedAnswer(null);
setAnswers([]);
setShowSolution(false);
setFinished(false);
};

if(!safeQuestions.length){
return(
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"/>

<div className="relative p-8 text-center md:p-12">
<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-amber-400/20 bg-amber-500/10 text-5xl">
📚
</div>

<div className="mt-6 flex justify-center">
<Badge variant="warning" dot>
Verified PYQ Bank
</Badge>
</div>

<h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
Percentage PYQs Not Added Yet
</h2>

<p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
This stage accepts only verified SSC previous-year questions with exam,
year, shift, answer and solution details. No fabricated PYQs will be
shown here.
</p>

<div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left">
<p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
Required PYQ Metadata
</p>

<div className="mt-4 grid gap-3 sm:grid-cols-2">
{[
"Official question text",
"SSC exam name",
"Year and shift",
"Correct option",
"Detailed solution",
"Shortcut method",
"Concept tag",
"Verification status"
].map(item=>(
<div
key={item}
className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
>
<span className="text-amber-300">
•
</span>

<p className="text-sm font-semibold text-zinc-300">
{item}
</p>
</div>
))}
</div>
</div>

<div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-500/[0.06] p-4">
<p className="text-sm font-semibold text-rose-300">
PYQ stage completion remains locked until verified questions are added.
</p>
</div>
</div>
</GlassCard>
);
}

if(finished){
return(
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl"/>

<div className="relative p-8 text-center md:p-10">
<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 text-5xl">
🏆
</div>

<div className="mt-6 flex justify-center">
<Badge variant="success" dot>
PYQ Practice Complete
</Badge>
</div>

<h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
Previous-Year Questions Completed
</h2>

<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
Review your performance before moving to the final revision stage.
</p>

<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<Metric
label="Correct"
value={correctAnswers}
accent="emerald"
/>

<Metric
label="Wrong"
value={wrongAnswers}
accent="rose"
/>

<Metric
label="Accuracy"
value={`${accuracy}%`}
accent="violet"
/>

<Metric
label="PYQs"
value={safeQuestions.length}
accent="sky"
/>
</div>

<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
<Button
variant="secondary"
size="lg"
onClick={resetStage}
>
Retry PYQs
</Button>

<Button
size="lg"
rightIcon="→"
onClick={()=>
onComplete?.({
completed:true,
correctAnswers,
wrongAnswers,
totalAttempts:answers.length,
accuracy
})
}
>
Continue to Revision
</Button>
</div>
</div>
</GlassCard>
);
}

return(
<div className="space-y-6">
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"/>

<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
<div>
<div className="flex flex-wrap items-center gap-3">
<Badge variant="warning" dot>
SSC PYQ Practice
</Badge>

<Badge variant="info">
Question {currentIndex+1} of {safeQuestions.length}
</Badge>
</div>

<h2 className="mt-5 text-3xl font-black text-white">
Previous-Year Questions
</h2>

<p className="mt-3 text-sm leading-7 text-zinc-400">
Solve verified SSC questions and study the detailed solution after every attempt.
</p>
</div>

<div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-right">
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Current Accuracy
</p>

<p className="mt-1 text-3xl font-black text-amber-300">
{accuracy}%
</p>
</div>
</div>

<div className="mt-8">
<ProgressBar
value={progress}
size="lg"
variant="warning"
showValue
label={`${answers.length}/${safeQuestions.length} PYQs completed`}
/>
</div>
</div>
</GlassCard>

<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="relative p-6 md:p-8">
<div className="flex flex-wrap items-center gap-3">
<Badge variant="info">
{currentQuestion.exam||"SSC"}
</Badge>

{currentQuestion.year&&(
<Badge variant="primary">
{currentQuestion.year}
</Badge>
)}

{currentQuestion.shift&&(
<Badge variant="default">
{currentQuestion.shift}
</Badge>
)}

<Badge
variant={
currentQuestion.difficulty==="hard"
?"danger"
:currentQuestion.difficulty==="medium"
?"warning"
:"success"
}
>
{currentQuestion.difficulty||"SSC Level"}
</Badge>
</div>

<h3 className="mt-6 text-xl font-black leading-8 text-white md:text-2xl">
{currentQuestion.question}
</h3>

<div className="mt-6 space-y-3">
{currentQuestion.options.map((option,index)=>{
const correctIndex=
getAnswerIndex(currentQuestion);

const selected=
selectedAnswer===index;

const correct=
showSolution&&
index===correctIndex;

const wrong=
showSolution&&
selected&&
index!==correctIndex;

return(
<button
key={`${option}-${index}`}
type="button"
disabled={showSolution}
onClick={()=>setSelectedAnswer(index)}
className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
correct
?"border-emerald-400/30 bg-emerald-500/10"
:wrong
?"border-rose-400/30 bg-rose-500/10"
:selected
?"border-violet-400/30 bg-violet-500/10"
:"border-white/10 bg-white/[0.03] hover:border-white/20"
}`}
>
<div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-black ${
correct
?"border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
:wrong
?"border-rose-400/20 bg-rose-500/10 text-rose-300"
:selected
?"border-violet-400/20 bg-violet-500/10 text-violet-300"
:"border-white/10 bg-white/[0.04] text-zinc-400"
}`}>
{String.fromCharCode(65+index)}
</div>

<p className="font-semibold text-zinc-200">
{option}
</p>
</button>
);
})}
</div>

{showSolution&&(
<div className="mt-6 space-y-4">
<div className="rounded-2xl border border-sky-400/20 bg-sky-500/[0.06] p-5">
<p className="text-xs font-black uppercase tracking-[0.16em] text-sky-300">
Detailed Solution
</p>

<p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-300">
{currentQuestion.explanation||
currentQuestion.solution||
"Solution unavailable."
}
</p>
</div>

{currentQuestion.shortcut&&(
<div className="rounded-2xl border border-violet-400/20 bg-violet-500/[0.06] p-5">
<p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">
SSC Shortcut
</p>

<p className="mt-3 text-sm leading-7 text-zinc-300">
{currentQuestion.shortcut}
</p>
</div>
)}

{currentQuestion.commonMistake&&(
<div className="rounded-2xl border border-rose-400/20 bg-rose-500/[0.06] p-5">
<p className="text-xs font-black uppercase tracking-[0.16em] text-rose-300">
Common Mistake
</p>

<p className="mt-3 text-sm leading-7 text-zinc-300">
{currentQuestion.commonMistake}
</p>
</div>
)}
</div>
)}

<div className="mt-8">
{showSolution?(
<Button
size="lg"
fullWidth
rightIcon="→"
onClick={nextQuestion}
>
{currentIndex===safeQuestions.length-1
?"Finish PYQ Stage"
:"Next PYQ"}
</Button>
):(
<Button
size="lg"
fullWidth
disabled={selectedAnswer===null}
onClick={submitAnswer}
>
Submit Answer
</Button>
)}
</div>
</div>
</GlassCard>
</div>
);
}

function Metric({
label,
value,
accent
}){
const styles={
emerald:"text-emerald-300",
rose:"text-rose-300",
violet:"text-violet-300",
sky:"text-sky-300"
};

return(
<div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
<p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-500">
{label}
</p>

<p className={`mt-3 text-3xl font-black ${
styles[accent]||"text-white"
}`}>
{value}
</p>
</div>
);
}