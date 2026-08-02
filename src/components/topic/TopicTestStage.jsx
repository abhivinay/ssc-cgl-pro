import{useMemo,useState}from"react";
import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";
import Button from"../ui/Button";
import ProgressBar from"../ui/ProgressBar";

const getAnswerIndex=question=>{
const value=Number(question?.answer);
return Number.isInteger(value)?value:null;
};

const formatTime=seconds=>{
const safe=Math.max(0,Number(seconds)||0);
const minutes=Math.floor(safe/60);
const remaining=String(safe%60).padStart(2,"0");
return`${minutes}:${remaining}`;
};

export default function TopicTestStage({
config={},
questions=[],
onComplete
}){
const safeQuestions=Array.isArray(questions)?questions:[];

const durationMinutes=Math.max(
1,
Number(config.durationMinutes)||25
);

const[started,setStarted]=useState(false);
const[currentIndex,setCurrentIndex]=useState(0);
const[selectedAnswer,setSelectedAnswer]=useState(null);
const[answers,setAnswers]=useState([]);
const[finished,setFinished]=useState(false);
const[timeLeft,setTimeLeft]=useState(durationMinutes*60);

const currentQuestion=safeQuestions[currentIndex]||null;

const correctAnswers=useMemo(
()=>answers.filter(item=>item.correct).length,
[answers]
);

const wrongAnswers=answers.length-correctAnswers;

const score=
correctAnswers*(Number(config.marksPerCorrect)||2)-
wrongAnswers*(Number(config.negativeMarksPerWrong)||0.5);

const totalMarks=
safeQuestions.length*(Number(config.marksPerCorrect)||2);

const percentage=totalMarks
?Math.max(
0,
Math.round(score/totalMarks*100)
)
:0;

const passingPercentage=Math.max(
0,
Number(config.passingPercentage)||70
);

const passed=percentage>=passingPercentage;

const progress=safeQuestions.length
?Math.round(
answers.length/safeQuestions.length*100
)
:0;

const startTest=()=>{
setStarted(true);
setTimeLeft(durationMinutes*60);
};

const submitAnswer=()=>{
if(
selectedAnswer===null||
!currentQuestion
){
return;
}

const correctAnswer=getAnswerIndex(currentQuestion);

setAnswers(previous=>[
...previous,
{
questionId:currentQuestion.id,
selectedAnswer,
correctAnswer,
correct:selectedAnswer===correctAnswer
}
]);

const isLast=
currentIndex>=safeQuestions.length-1;

if(isLast){
setFinished(true);
return;
}

setCurrentIndex(previous=>previous+1);
setSelectedAnswer(null);
};

const retryTest=()=>{
setStarted(false);
setCurrentIndex(0);
setSelectedAnswer(null);
setAnswers([]);
setFinished(false);
setTimeLeft(durationMinutes*60);
};

if(!safeQuestions.length){
return(
<GlassCard className="p-10 text-center">
<p className="text-5xl">📭</p>

<h2 className="mt-4 text-2xl font-black text-white">
Topic test unavailable
</h2>

<p className="mt-2 text-sm text-zinc-500">
Questions for this topic test have not been added yet.
</p>
</GlassCard>
);
}

if(!started){
return(
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl"/>

<div className="relative p-6 md:p-10">
<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
<div className="max-w-3xl">
<Badge variant="warning" dot>
Topic Test
</Badge>

<h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
{config.title||"Topic Test"}
</h2>

<p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">
{config.description||
"Complete the full test to evaluate your topic readiness."
}
</p>
</div>

<div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-amber-400/20 bg-amber-500/10 text-5xl">
🎯
</div>
</div>

<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<Metric
label="Questions"
value={safeQuestions.length}
accent="violet"
/>

<Metric
label="Duration"
value={`${durationMinutes} min`}
accent="sky"
/>

<Metric
label="Pass Mark"
value={`${passingPercentage}%`}
accent="amber"
/>

<Metric
label="Negative Mark"
value={Number(config.negativeMarksPerWrong)||0.5}
accent="rose"
/>
</div>

{Array.isArray(config.instructions)&&config.instructions.length>0&&(
<div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
<p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
Instructions
</p>

<div className="mt-4 space-y-3">
{config.instructions.map((item,index)=>(
<div
key={`${item}-${index}`}
className="flex items-start gap-3"
>
<span className="text-emerald-300">
✓
</span>

<p className="text-sm leading-7 text-zinc-300">
{item}
</p>
</div>
))}
</div>
</div>
)}

<Button
size="xl"
fullWidth
className="mt-8"
onClick={startTest}
rightIcon="→"
>
Start Topic Test
</Button>
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
<div className={`absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl ${
passed
?"bg-emerald-500/20"
:"bg-rose-500/20"
}`}/>

<div className="relative p-6 text-center md:p-10">
<div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border text-5xl ${
passed
?"border-emerald-400/20 bg-emerald-500/10"
:"border-rose-400/20 bg-rose-500/10"
}`}>
{passed?"🏆":"📘"}
</div>

<Badge
variant={passed?"success":"danger"}
className="mt-6"
>
{passed?"Test Passed":"Test Failed"}
</Badge>

<h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
Topic Test Complete
</h2>

<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
{passed
?`You cleared the required ${passingPercentage}% score.`
:`You need at least ${passingPercentage}% to unlock the next stage.`
}
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
label="Score"
value={`${score}/${totalMarks}`}
accent="violet"
/>

<Metric
label="Percentage"
value={`${percentage}%`}
accent="sky"
/>
</div>

<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
<Button
variant="secondary"
size="lg"
onClick={retryTest}
>
Retry Test
</Button>

{passed&&(
<Button
size="lg"
rightIcon="→"
onClick={()=>
onComplete?.({
passed:true,
correctAnswers,
wrongAnswers,
score,
totalMarks,
percentage
})
}
>
Continue to PYQs
</Button>
)}
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
<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
<div>
<Badge variant="warning" dot>
Topic Test Running
</Badge>

<h2 className="mt-4 text-3xl font-black text-white">
{config.title||"Topic Test"}
</h2>

<p className="mt-2 text-sm text-zinc-400">
Question {currentIndex+1} of {safeQuestions.length}
</p>
</div>

<div className="rounded-3xl border border-amber-400/20 bg-amber-500/[0.06] p-4 text-right">
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Time Remaining
</p>

<p className="mt-1 text-3xl font-black text-amber-300">
{formatTime(timeLeft)}
</p>
</div>
</div>

<div className="mt-6">
<ProgressBar
value={progress}
size="lg"
variant="warning"
label={`${answers.length}/${safeQuestions.length} completed`}
showValue
/>
</div>
</div>
</GlassCard>

<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="relative p-6 md:p-8">
<div className="flex flex-wrap items-center justify-between gap-3">
<Badge variant="info">
{currentQuestion.subtopic||"Percentage"}
</Badge>

<Badge
variant={
currentQuestion.difficulty==="hard"
?"danger"
:currentQuestion.difficulty==="medium"
?"warning"
:"success"
}
>
{currentQuestion.difficulty||"easy"}
</Badge>
</div>

<h3 className="mt-6 text-xl font-black leading-8 text-white md:text-2xl">
{currentQuestion.question}
</h3>

<div className="mt-6 space-y-3">
{currentQuestion.options.map((option,index)=>(
<button
key={`${option}-${index}`}
type="button"
onClick={()=>setSelectedAnswer(index)}
className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
selectedAnswer===index
?"border-violet-400/30 bg-violet-500/10"
:"border-white/10 bg-white/[0.03] hover:border-white/20"
}`}
>
<div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-black ${
selectedAnswer===index
?"border-violet-400/20 bg-violet-500/10 text-violet-300"
:"border-white/10 bg-white/[0.04] text-zinc-400"
}`}>
{String.fromCharCode(65+index)}
</div>

<p className="font-semibold text-zinc-200">
{option}
</p>
</button>
))}
</div>

<Button
size="lg"
fullWidth
className="mt-8"
disabled={selectedAnswer===null}
onClick={submitAnswer}
rightIcon="→"
>
{currentIndex===safeQuestions.length-1
?"Submit Test"
:"Save and Next"}
</Button>
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
violet:"text-violet-300",
sky:"text-sky-300",
amber:"text-amber-300",
rose:"text-rose-300",
emerald:"text-emerald-300"
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