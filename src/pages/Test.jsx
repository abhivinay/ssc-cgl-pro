import {useCallback,useEffect,useMemo,useRef,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import {useStudy} from "../context/StudyContext";
import classificationQuestions from "../data/questionBank/reasoning/classificationQuestions";

const formatTime=seconds=>{
const value=Math.max(0,Number(seconds)||0);
const minutes=Math.floor(value/60);
const remaining=value%60;
return `${String(minutes).padStart(2,"0")}:${String(remaining).padStart(2,"0")}`;
};

const normalize=value=>String(value||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"");

export default function Test(){
const {topicId}=useParams();
const navigate=useNavigate();
const {studyState,completeStage,recordTestResult}=useStudy();
const topic=studyState.topics.find(item=>item.id===String(topicId));
const questions=useMemo(()=>{
const topicName=normalize(topic?.name||topicId);
return classificationQuestions.filter(question=>normalize(question.topic)===topicName);
},[topic?.name,topicId]);
const totalSeconds=useMemo(()=>Math.max(300,questions.reduce((sum,question)=>sum+(Number(question.estimatedTime)||60),0)),[questions]);
const [currentIndex,setCurrentIndex]=useState(0);
const [answers,setAnswers]=useState({});
const [remainingSeconds,setRemainingSeconds]=useState(totalSeconds);
const [submitted,setSubmitted]=useState(false);
const [result,setResult]=useState(null);
const startedAtRef=useRef(Date.now());
const submittingRef=useRef(false);
const attemptIdRef=useRef(`topic-test-${topicId}-${Date.now()}`);

useEffect(()=>{
setCurrentIndex(0);
setAnswers({});
setRemainingSeconds(totalSeconds);
setSubmitted(false);
setResult(null);
startedAtRef.current=Date.now();
submittingRef.current=false;
attemptIdRef.current=`topic-test-${topicId}-${Date.now()}`;
},[topicId,totalSeconds]);

const submitTest=useCallback(()=>{
if(submittingRef.current||submitted||!questions.length)return;
submittingRef.current=true;
const correct=questions.filter(question=>answers[question.id]===question.correctAnswer).length;
const answered=questions.filter(question=>answers[question.id]!==undefined).length;
const wrong=answered-correct;
const unanswered=questions.length-answered;
const score=questions.reduce((sum,question)=>{
const selected=answers[question.id];
if(selected===question.correctAnswer)return sum+(Number(question.marks)||1);
if(selected!==undefined)return sum-(Number(question.negativeMarks)||0);
return sum;
},0);
const maximumScore=questions.reduce((sum,question)=>sum+(Number(question.marks)||1),0);
const percentage=maximumScore?Math.max(0,Math.round(score/maximumScore*100)):0;
const accuracy=answered?Math.round(correct/answered*100):0;
const timeTaken=Math.max(0,totalSeconds-remainingSeconds);
const mistakes=questions
.filter(question=>answers[question.id]!==question.correctAnswer)
.map(question=>{
const selected=question.options.find(option=>option.id===answers[question.id])?.text||"Not answered";
const correctOption=question.options.find(option=>option.id===question.correctAnswer)?.text||question.correctAnswer;
return `${question.question} | Your answer: ${selected} | Correct answer: ${correctOption}`;
});
const testResult={attemptId:attemptIdRef.current,topicId:String(topicId),topicName:topic?.name||questions[0]?.topic||"Topic",stage:"topicTest",score:Number(score.toFixed(2)),total:maximumScore,correct,wrong,unanswered,percentage,accuracy,timeTaken,answers,questionIds:questions.map(question=>question.id),mistakes,submittedAt:new Date().toISOString()};
recordTestResult(testResult);
if(!topic?.stages?.topicTest)completeStage(topicId,"topicTest",{score:testResult.score,total:testResult.total,percentage});
setResult(testResult);
setSubmitted(true);
},[answers,completeStage,questions,recordTestResult,remainingSeconds,submitted,topic?.name,topic?.stages?.topicTest,topicId,totalSeconds]);

useEffect(()=>{
if(submitted||!questions.length)return;
const timer=window.setInterval(()=>setRemainingSeconds(previous=>{
if(previous<=1){
window.clearInterval(timer);
setTimeout(submitTest,0);
return 0;
}
return previous-1;
}),1000);
return()=>window.clearInterval(timer);
},[questions.length,submitTest,submitted]);

if(!topic){
return(
<div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
<p className="text-5xl">⚠️</p>
<h1 className="mt-4 text-2xl font-bold">Topic not found</h1>
<button type="button" onClick={()=>navigate("/syllabus")} className="mt-5 rounded-xl bg-violet-600 px-5 py-3 font-semibold">Return to Syllabus</button>
</div>
);
}

if(!questions.length){
return(
<div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
<p className="text-5xl">📝</p>
<h1 className="mt-4 text-2xl font-bold">No questions available</h1>
<p className="mt-2 text-zinc-400">Add questions for {topic.name} to the question bank.</p>
<button type="button" onClick={()=>navigate("/syllabus")} className="mt-5 rounded-xl bg-violet-600 px-5 py-3 font-semibold">Return to Syllabus</button>
</div>
);
}

if(submitted&&result){
return(
<div className="mx-auto max-w-5xl pb-10">
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">Topic Test Complete</p>
<h1 className="mt-2 text-3xl font-bold">{topic.name}</h1>
<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
<div className="rounded-2xl bg-zinc-950 p-5"><p className="text-sm text-zinc-500">Score</p><p className="mt-2 text-3xl font-bold">{result.score}/{result.total}</p></div>
<div className="rounded-2xl bg-zinc-950 p-5"><p className="text-sm text-zinc-500">Percentage</p><p className="mt-2 text-3xl font-bold text-emerald-400">{result.percentage}%</p></div>
<div className="rounded-2xl bg-zinc-950 p-5"><p className="text-sm text-zinc-500">Accuracy</p><p className="mt-2 text-3xl font-bold text-violet-400">{result.accuracy}%</p></div>
<div className="rounded-2xl bg-zinc-950 p-5"><p className="text-sm text-zinc-500">Time Taken</p><p className="mt-2 text-3xl font-bold">{formatTime(result.timeTaken)}</p></div>
</div>
<div className="mt-8 space-y-5">
{questions.map((question,index)=>{
const selected=answers[question.id];
const correct=selected===question.correctAnswer;
return(
<div key={question.id} className={`rounded-3xl border p-5 ${correct?"border-emerald-500/30 bg-emerald-500/5":"border-red-500/30 bg-red-500/5"}`}>
<div className="flex flex-wrap items-start justify-between gap-3">
<h2 className="font-semibold">{index+1}. {question.question}</h2>
<span className={correct?"text-emerald-400":"text-red-400"}>{correct?"✓ Correct":"✕ Incorrect"}</span>
</div>
<div className="mt-4 grid gap-2">
{question.options.map(option=>(
<div key={option.id} className={`rounded-xl border px-4 py-3 ${
option.id===question.correctAnswer?"border-emerald-500/40 bg-emerald-500/10 text-emerald-300":
option.id===selected?"border-red-500/40 bg-red-500/10 text-red-300":
"border-zinc-800 bg-zinc-950 text-zinc-400"
}`}>{option.id}. {option.text}</div>
))}
</div>
<div className="mt-4 rounded-2xl bg-zinc-950 p-4">
<p className="text-sm font-semibold text-violet-300">Explanation</p>
<p className="mt-2 text-sm leading-6 text-zinc-300">{question.explanation||"Explanation not available."}</p>
{question.isVerifiedPyq&&<p className="mt-3 text-xs text-amber-300">Previous Year Question {question.exam?`• ${question.exam}`:""} {question.year?`• ${question.year}`:""}</p>}
</div>
</div>
);
})}
</div>
<div className="mt-8 flex flex-wrap gap-3">
<button type="button" onClick={()=>navigate(`/topic/${topic.id}/pyq`)} className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold hover:bg-emerald-500">Continue to PYQ</button>
<button type="button" onClick={()=>navigate("/syllabus")} className="rounded-2xl border border-zinc-700 px-6 py-3 font-semibold hover:bg-zinc-800">Back to Syllabus</button>
</div>
</div>
</div>
);
}

const question=questions[currentIndex];
const selectedAnswer=answers[question.id];
const answeredCount=Object.keys(answers).length;
const progress=Math.round((currentIndex+1)/questions.length*100);
const sourceLabel=question.isVerifiedPyq?"Previous Year Question":question.sourceLabel||"Single-choice MCQ";

return(
<div className="mx-auto max-w-6xl pb-10">
<header className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<div className="flex flex-wrap items-center justify-between gap-4">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">SSC CGL Topic Test</p>
<h1 className="mt-1 text-xl font-bold md:text-2xl">{topic.name}</h1>
<p className="mt-1 text-sm text-zinc-500">{sourceLabel}</p>
</div>
<div className="flex items-center gap-3">
<div className="rounded-2xl bg-zinc-950 px-4 py-3 text-center"><p className="text-xs text-zinc-500">Question</p><p className="font-bold">{currentIndex+1}/{questions.length}</p></div>
<div className="rounded-2xl bg-zinc-950 px-5 py-3 text-center"><p className="text-xs text-zinc-500">Timer</p><p className={`text-xl font-bold tabular-nums ${remainingSeconds<=60?"text-red-400":remainingSeconds<=300?"text-amber-400":"text-emerald-400"}`}>{formatTime(remainingSeconds)}</p></div>
<button type="button" onClick={()=>{if(window.confirm(`You answered ${answeredCount} of ${questions.length} questions. Submit now?`))submitTest();}} className="rounded-2xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-500">Submit</button>
</div>
</div>
<div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-violet-500 transition-all" style={{width:`${progress}%`}}/></div>
</header>

<main className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900">
<div className="border-b border-zinc-800 p-5">
<div className="flex flex-wrap items-center justify-between gap-3">
<span className="rounded-xl bg-violet-500/10 px-3 py-2 text-sm font-semibold text-violet-300">Question {currentIndex+1} of {questions.length}</span>
<div className="text-sm text-zinc-500">+{question.marks||1} · −{question.negativeMarks||0}</div>
</div>
</div>
<div className="min-h-[420px] p-5 md:p-8">
<h2 className="text-xl font-semibold leading-8 md:text-2xl">{question.question}</h2>
{question.image&&<img src={question.image} alt="Question visual" className="mt-6 max-h-80 rounded-2xl border border-zinc-800 object-contain"/>}
<div className="mt-8 grid gap-4">
{question.options.map(option=>{
const selected=selectedAnswer===option.id;
return(
<button key={option.id} type="button" onClick={()=>setAnswers(previous=>({...previous,[question.id]:option.id}))} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${selected?"border-violet-500 bg-violet-500/10 text-violet-200":"border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"}`}>
<span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-bold ${selected?"border-violet-400 bg-violet-500 text-white":"border-zinc-700 bg-zinc-900"}`}>{option.id}</span>
<span>{option.text}</span>
</button>
);
})}
</div>
</div>
<div className="border-t border-zinc-800 p-5">
<div className="flex flex-wrap items-center justify-between gap-3">
<button type="button" disabled={currentIndex===0} onClick={()=>setCurrentIndex(index=>Math.max(0,index-1))} className="rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 font-semibold hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-40">← Previous</button>
<div className="flex gap-3">
<button type="button" disabled={!selectedAnswer} onClick={()=>setAnswers(previous=>{const next={...previous};delete next[question.id];return next;})} className="rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 font-semibold hover:border-red-500 disabled:cursor-not-allowed disabled:opacity-40">Clear</button>
<button type="button" disabled={currentIndex===questions.length-1} onClick={()=>setCurrentIndex(index=>Math.min(questions.length-1,index+1))} className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40">Next →</button>
</div>
</div>
</div>
</main>

<div className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
<div className="flex flex-wrap gap-3">
{questions.map((item,index)=>{
const answered=answers[item.id]!==undefined;
return <button key={item.id} type="button" onClick={()=>setCurrentIndex(index)} className={`h-11 w-11 rounded-xl border font-bold ${index===currentIndex?"border-blue-500 bg-blue-500 text-white":answered?"border-emerald-500 bg-emerald-500/20 text-emerald-300":"border-zinc-700 bg-zinc-950 text-zinc-400"}`}>{index+1}</button>;
})}
</div>
</div>
</div>
);
}