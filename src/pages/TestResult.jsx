import {useNavigate,useParams} from "react-router-dom";
import {useTest} from "../context/TestContext";
import {getTestById} from "../data/testData";
import {formatTestTime} from "../utils/testEngine";

export default function TestResult(){
const {testId}=useParams();
const navigate=useNavigate();
const {attempts,resetTest}=useTest();
const test=getTestById(testId);
const attempt=attempts[testId];

if(!test||!attempt?.submitted||!attempt.result){
return(
<div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
<p className="text-5xl">📊</p>
<h1 className="mt-4 text-2xl font-bold">Result not available</h1>
<p className="mt-2 text-zinc-400">Complete the test before opening its result.</p>
<button type="button" onClick={()=>navigate(`/test/${testId}`)} className="mt-5 rounded-xl bg-violet-600 px-5 py-3 font-semibold">Open Test</button>
</div>
);
}

const result=attempt.result;

const reattempt=()=>{
resetTest(testId);
navigate(`/test/${testId}`);
};

return(
<div className="mx-auto max-w-7xl pb-10">
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
<div className="flex flex-wrap items-start justify-between gap-6">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">Test Completed</p>
<h1 className="mt-2 text-3xl font-bold md:text-5xl">{test.title}</h1>
<p className="mt-3 text-zinc-400">Review your performance, mistakes and explanations below.</p>
</div>
<div className="text-right">
<p className="text-5xl font-bold text-emerald-400">{result.score}</p>
<p className="mt-1 text-sm text-zinc-500">out of {result.totalMarks}</p>
</div>
</div>
</div>

<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<p className="text-sm text-zinc-500">Accuracy</p>
<p className="mt-2 text-3xl font-bold text-violet-400">{result.accuracy}%</p>
</div>
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<p className="text-sm text-zinc-500">Correct</p>
<p className="mt-2 text-3xl font-bold text-emerald-400">{result.correct}</p>
</div>
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<p className="text-sm text-zinc-500">Incorrect</p>
<p className="mt-2 text-3xl font-bold text-red-400">{result.incorrect}</p>
</div>
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<p className="text-sm text-zinc-500">Unanswered</p>
<p className="mt-2 text-3xl font-bold text-amber-400">{result.unanswered}</p>
</div>
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<p className="text-sm text-zinc-500">Percentage</p>
<p className="mt-2 text-3xl font-bold">{result.percentage}%</p>
</div>
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<p className="text-sm text-zinc-500">Time Used</p>
<p className="mt-2 text-3xl font-bold">{formatTestTime(result.timeUsed)}</p>
</div>
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<p className="text-sm text-zinc-500">Average Time</p>
<p className="mt-2 text-3xl font-bold">{result.averageTimePerQuestion}s</p>
</div>
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<p className="text-sm text-zinc-500">Attempted</p>
<p className="mt-2 text-3xl font-bold">{result.attempted}/{test.questions.length}</p>
</div>
</div>

<div className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<div className="flex flex-wrap items-center justify-between gap-4">
<div>
<h2 className="text-xl font-bold">Performance Summary</h2>
<p className="mt-2 text-sm text-zinc-400">
{result.accuracy>=90
?"Excellent accuracy. You are ready for harder classification questions."
:result.accuracy>=75
?"Good performance. Review the incorrect questions before moving forward."
:result.accuracy>=50
?"Your basics are developing, but this topic needs another practice round."
:"Return to the lesson, revise the rules and attempt the test again."
}
</p>
</div>
<div className="flex gap-3">
<button type="button" onClick={()=>navigate("/syllabus")} className="rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 font-semibold hover:border-zinc-500">Syllabus</button>
<button type="button" onClick={reattempt} className="rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500">Reattempt Test</button>
</div>
</div>
</div>

<div className="mt-6">
<h2 className="text-2xl font-bold">Question Analysis</h2>
<div className="mt-4 space-y-5">
{result.questionAnalysis.map(item=>(
<div key={item.questionId} className={`rounded-3xl border p-6 ${
item.status==="correct"
?"border-emerald-500/20 bg-emerald-500/5"
:item.status==="incorrect"
?"border-red-500/20 bg-red-500/5"
:"border-amber-500/20 bg-amber-500/5"
}`}>
<div className="flex flex-wrap items-center justify-between gap-3">
<div className="flex items-center gap-3">
<span className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold ${
item.status==="correct"
?"bg-emerald-500/20 text-emerald-400"
:item.status==="incorrect"
?"bg-red-500/20 text-red-400"
:"bg-amber-500/20 text-amber-400"
}`}>{item.questionNumber}</span>
<span className="text-sm font-semibold capitalize">{item.status}</span>
</div>
<p className={`font-semibold ${item.marksAwarded>=0?"text-emerald-400":"text-red-400"}`}>
{item.marksAwarded>0?"+":""}{item.marksAwarded} marks
</p>
</div>

<h3 className="mt-5 text-lg font-semibold leading-7">{item.question}</h3>

<div className="mt-5 grid gap-3 sm:grid-cols-2">
{item.options.map(option=>{
const isCorrect=option.id===item.correctAnswer;
const isSelected=option.id===item.selectedAnswer;
return(
<div key={option.id} className={`rounded-2xl border p-4 ${
isCorrect
?"border-emerald-500 bg-emerald-500/10 text-emerald-300"
:isSelected
?"border-red-500 bg-red-500/10 text-red-300"
:"border-zinc-800 bg-zinc-950 text-zinc-400"
}`}>
<span className="mr-3 font-bold">{option.id}.</span>{option.text}
</div>
);
})}
</div>

<div className="mt-5 grid gap-4 lg:grid-cols-2">
<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs font-semibold uppercase tracking-wider text-violet-400">Explanation</p>
<p className="mt-2 text-sm leading-6 text-zinc-300">{item.explanation}</p>
</div>
<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Shortcut</p>
<p className="mt-2 text-sm leading-6 text-zinc-300">{item.shortcut}</p>
</div>
</div>
</div>
))}
</div>
</div>
</div>
);
}