import{useMemo,useState}from"react";
import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";
import Button from"../ui/Button";
import ProgressBar from"../ui/ProgressBar";

const getSafeAnswerIndex=question=>{
const answer=Number(question?.answer);

return Number.isInteger(answer)
?answer
:null;
};

export default function QuestionStage({
title="Practice",
description="Answer every question carefully.",
questions=[],
passingPercentage=70,
onComplete
}){
const safeQuestions=Array.isArray(questions)
?questions
:[];

const[currentIndex,setCurrentIndex]=useState(0);
const[selectedAnswer,setSelectedAnswer]=useState(null);
const[answers,setAnswers]=useState([]);
const[showExplanation,setShowExplanation]=useState(false);
const[finished,setFinished]=useState(false);

const currentQuestion=safeQuestions[currentIndex]||null;

const correctAnswers=useMemo(
()=>answers.filter(item=>item.correct).length,
[answers]
);

const wrongAnswers=answers.length-correctAnswers;

const accuracy=answers.length
?Math.round(correctAnswers/answers.length*100)
:0;

const progress=safeQuestions.length
?Math.round(
answers.length/safeQuestions.length*100
)
:0;

const passed=accuracy>=passingPercentage;

const submitAnswer=()=>{
if(
selectedAnswer===null||
!currentQuestion
){
return;
}

const correctAnswer=
getSafeAnswerIndex(currentQuestion);

const correct=
selectedAnswer===correctAnswer;

setAnswers(previous=>[
...previous,
{
questionId:currentQuestion.id,
selectedAnswer,
correctAnswer,
correct
}
]);

setShowExplanation(true);
};

const nextQuestion=()=>{
const isLastQuestion=
currentIndex>=safeQuestions.length-1;

if(isLastQuestion){
const finalAnswersLength=answers.length;
const finalCorrect=answers.filter(
item=>item.correct
).length;

const finalAccuracy=finalAnswersLength
?Math.round(
finalCorrect/finalAnswersLength*100
)
:0;

setFinished(true);

onComplete?.({
correctAnswers:finalCorrect,
wrongAnswers:
finalAnswersLength-finalCorrect,
totalAttempts:finalAnswersLength,
accuracy:finalAccuracy,
passed:
finalAccuracy>=passingPercentage
});

return;
}

setCurrentIndex(previous=>previous+1);
setSelectedAnswer(null);
setShowExplanation(false);
};

const resetStage=()=>{
setCurrentIndex(0);
setSelectedAnswer(null);
setAnswers([]);
setShowExplanation(false);
setFinished(false);
};

if(!safeQuestions.length){
return(
<GlassCard className="p-10 text-center">
<p className="text-5xl">
📭
</p>

<h2 className="mt-4 text-2xl font-black text-white">
No questions available
</h2>

<p className="mt-2 text-sm text-zinc-500">
Questions for this stage have not been added yet.
</p>
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
{passed?"Stage Passed":"Retry Required"}
</Badge>

<h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
{title} Complete
</h2>

<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
{passed
?`Excellent. You cleared the required ${passingPercentage}% score.`
:`You need at least ${passingPercentage}% to complete this stage.`
}
</p>

<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<ResultCard
label="Correct"
value={correctAnswers}
accent="emerald"
/>

<ResultCard
label="Wrong"
value={wrongAnswers}
accent="rose"
/>

<ResultCard
label="Accuracy"
value={`${accuracy}%`}
accent="violet"
/>

<ResultCard
label="Questions"
value={safeQuestions.length}
accent="sky"
/>
</div>

<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
<Button
variant="secondary"
size="lg"
onClick={resetStage}
>
Retry Stage
</Button>

{passed&&(
<Button
size="lg"
onClick={()=>
onComplete?.({
correctAnswers,
wrongAnswers,
totalAttempts:answers.length,
accuracy,
passed:true,
confirmed:true
})
}
rightIcon="→"
>
Continue
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
<div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl"/>

<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
<div>
<div className="flex flex-wrap items-center gap-3">
<Badge variant="primary" dot>
{title}
</Badge>

<Badge variant="info">
Question {currentIndex+1} of {safeQuestions.length}
</Badge>
</div>

<h2 className="mt-5 text-3xl font-black text-white">
{description}
</h2>
</div>

<div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-right">
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Current Accuracy
</p>

<p className="mt-1 text-3xl font-black text-violet-300">
{accuracy}%
</p>
</div>
</div>

<div className="mt-8">
<ProgressBar
value={progress}
size="lg"
variant="primary"
label={`${answers.length}/${safeQuestions.length} answered`}
showValue
/>
</div>

<div className="mt-6 grid grid-cols-3 gap-3">
<MiniMetric
label="Correct"
value={correctAnswers}
accent="emerald"
/>

<MiniMetric
label="Wrong"
value={wrongAnswers}
accent="rose"
/>

<MiniMetric
label="Required"
value={`${passingPercentage}%`}
accent="amber"
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
{currentQuestion.subtopic||"SSC Practice"}
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
{currentQuestion.options.map(
(option,index)=>{
const selected=
selectedAnswer===index;

const correctIndex=
getSafeAnswerIndex(currentQuestion);

const revealCorrect=
showExplanation&&
index===correctIndex;

const revealWrong=
showExplanation&&
selected&&
index!==correctIndex;

return(
<button
key={`${option}-${index}`}
type="button"
disabled={showExplanation}
onClick={()=>
setSelectedAnswer(index)
}
className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
revealCorrect
?"border-emerald-400/30 bg-emerald-500/10"
:revealWrong
?"border-rose-400/30 bg-rose-500/10"
:selected
?"border-violet-400/30 bg-violet-500/10"
:"border-white/10 bg-white/[0.03] hover:border-white/20"
}`}
>
<div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-black ${
revealCorrect
?"border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
:revealWrong
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
}
)}
</div>

{showExplanation&&(
<div className="mt-6 space-y-4">
<div className="rounded-2xl border border-sky-400/20 bg-sky-500/[0.06] p-5">
<p className="text-xs font-black uppercase tracking-[0.16em] text-sky-300">
Explanation
</p>

<p className="mt-3 text-sm leading-7 text-zinc-300">
{currentQuestion.explanation}
</p>
</div>

{currentQuestion.shortcut&&(
<div className="rounded-2xl border border-violet-400/20 bg-violet-500/[0.06] p-5">
<p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">
Shortcut
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
{showExplanation?(
<Button
size="lg"
fullWidth
onClick={nextQuestion}
rightIcon="→"
>
{currentIndex===safeQuestions.length-1
?"Finish Stage"
:"Next Question"}
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

function MiniMetric({
label,
value,
accent
}){
const styles={
emerald:"text-emerald-300",
rose:"text-rose-300",
amber:"text-amber-300"
};

return(
<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
<p className="text-xs font-black uppercase tracking-[0.12em] text-zinc-500">
{label}
</p>

<p className={`mt-2 text-2xl font-black ${
styles[accent]||"text-white"
}`}>
{value}
</p>
</div>
);
}

function ResultCard({
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