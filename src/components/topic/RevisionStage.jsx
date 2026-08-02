import{useMemo,useState}from"react";
import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";
import Button from"../ui/Button";
import ProgressBar from"../ui/ProgressBar";

export default function RevisionStage({
content,
onComplete
}){
const summary=Array.isArray(content?.summary)
?content.summary
:[];

const formulaRecap=Array.isArray(content?.formulaRecap)
?content.formulaRecap
:[];

const conversionRecap=Array.isArray(content?.conversionRecap)
?content.conversionRecap
:[];

const mistakeRecap=Array.isArray(content?.mistakeRecap)
?content.mistakeRecap
:[];

const flashcards=Array.isArray(content?.flashcards)
?content.flashcards
:[];

const rapidQuestions=Array.isArray(content?.rapidQuestions)
?content.rapidQuestions
:[];

const masteryCheck=Array.isArray(content?.masteryCheck)
?content.masteryCheck
:[];

const[checkedItems,setCheckedItems]=useState([]);
const[flashcardIndex,setFlashcardIndex]=useState(0);
const[showFlashcardAnswer,setShowFlashcardAnswer]=useState(false);
const[rapidAnswers,setRapidAnswers]=useState({});
const[showRapidAnswers,setShowRapidAnswers]=useState(false);
const[finished,setFinished]=useState(false);

const totalChecklist=masteryCheck.length;

const completedChecklist=checkedItems.length;

const checklistProgress=totalChecklist
?Math.round(
completedChecklist/
totalChecklist*
100
)
:100;

const answeredRapid=Object.keys(rapidAnswers).filter(
key=>String(rapidAnswers[key]||"").trim()
).length;

const rapidProgress=rapidQuestions.length
?Math.round(
answeredRapid/
rapidQuestions.length*
100
)
:100;

const overallProgress=Math.round(
(checklistProgress+rapidProgress)/2
);

const canComplete=
checklistProgress===100&&
rapidProgress===100;

const currentFlashcard=
flashcards[flashcardIndex]||null;

const toggleChecklist=index=>{
setCheckedItems(previous=>
previous.includes(index)
?previous.filter(item=>item!==index)
:[...previous,index]
);
};

const nextFlashcard=()=>{
if(!flashcards.length)return;

setFlashcardIndex(previous=>
(previous+1)%flashcards.length
);

setShowFlashcardAnswer(false);
};

const previousFlashcard=()=>{
if(!flashcards.length)return;

setFlashcardIndex(previous=>
(previous-1+flashcards.length)%
flashcards.length
);

setShowFlashcardAnswer(false);
};

const finishRevision=()=>{
if(!canComplete)return;

setFinished(true);

onComplete?.({
completed:true,
checklistProgress,
rapidProgress,
overallProgress
});
};

if(!content){
return(
<GlassCard className="p-10 text-center">
<p className="text-5xl">
📭
</p>

<h2 className="mt-4 text-2xl font-black text-white">
Revision content unavailable
</h2>

<p className="mt-2 text-sm text-zinc-500">
This topic does not have a revision pack connected yet.
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
<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"/>

<div className="relative p-8 text-center md:p-12">
<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 text-5xl">
🏆
</div>

<div className="mt-6 flex justify-center">
<Badge variant="success" dot>
Revision Complete
</Badge>
</div>

<h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
Percentage Mastered
</h2>

<p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
You completed the formula recap, mistake review, flashcards, rapid
questions and final mastery checklist.
</p>

<div className="mt-8 grid gap-4 sm:grid-cols-3">
<ResultCard
label="Checklist"
value={`${checklistProgress}%`}
accent="emerald"
/>

<ResultCard
label="Rapid Review"
value={`${rapidProgress}%`}
accent="violet"
/>

<ResultCard
label="Overall"
value={`${overallProgress}%`}
accent="sky"
/>
</div>

<div className="mt-8 rounded-3xl border border-emerald-400/15 bg-emerald-500/[0.05] p-6">
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Topic Status
</p>

<p className="mt-2 text-2xl font-black text-emerald-300">
Ready for spaced revision
</p>
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
<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl"/>

<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
<div>
<Badge variant="success" dot>
Final Revision
</Badge>

<h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
{content.title||"Revision Pack"}
</h2>

<p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
Revise every important concept and confirm that you can recall it
without external help.
</p>
</div>

<div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-right">
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Estimated Time
</p>

<p className="mt-2 text-3xl font-black text-emerald-300">
{Math.max(
1,
Number(content.estimatedMinutes)||20
)} min
</p>
</div>
</div>

<div className="mt-8">
<ProgressBar
value={overallProgress}
size="lg"
variant="success"
showValue
label="Revision completion"
/>
</div>
</div>
</GlassCard>

{summary.length>0&&(
<RevisionSection
badge="Rapid Summary"
title="Core Concepts"
icon="📘"
>
<div className="space-y-3">
{summary.map((item,index)=>(
<div
key={`${item}-${index}`}
className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
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
</RevisionSection>
)}

{formulaRecap.length>0&&(
<RevisionSection
badge="Formula Recap"
title="Must-Remember Formulas"
icon="🧮"
>
<div className="grid gap-4 md:grid-cols-2">
{formulaRecap.map((item,index)=>(
<div
key={`${item.label}-${index}`}
className="rounded-3xl border border-violet-400/15 bg-violet-500/[0.05] p-5"
>
<p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">
{item.label}
</p>

<p className="mt-3 text-base font-black leading-7 text-white">
{item.formula}
</p>
</div>
))}
</div>
</RevisionSection>
)}

{conversionRecap.length>0&&(
<RevisionSection
badge="Memory Table"
title="Fraction–Percentage Conversions"
icon="🧠"
>
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
{conversionRecap.map((item,index)=>(
<div
key={`${item}-${index}`}
className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center font-black text-violet-300"
>
{item}
</div>
))}
</div>
</RevisionSection>
)}

{mistakeRecap.length>0&&(
<RevisionSection
badge="Mistake Review"
title="Errors You Must Avoid"
icon="⚠️"
>
<div className="space-y-3">
{mistakeRecap.map((item,index)=>(
<div
key={`${item}-${index}`}
className="flex items-start gap-3 rounded-2xl border border-rose-400/15 bg-rose-500/[0.04] p-4"
>
<span className="text-rose-300">
✕
</span>

<p className="text-sm leading-7 text-zinc-300">
{item}
</p>
</div>
))}
</div>
</RevisionSection>
)}

{currentFlashcard&&(
<RevisionSection
badge="Flashcards"
title="Active Recall"
icon="🃏"
>
<div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-500/[0.05] p-8 text-center">
<p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
Card {flashcardIndex+1} of {flashcards.length}
</p>

<h3 className="mt-6 text-2xl font-black leading-9 text-white">
{showFlashcardAnswer
?currentFlashcard.back
:currentFlashcard.front}
</h3>

<p className="mt-3 text-sm text-zinc-500">
{showFlashcardAnswer
?"Answer"
:"Question"}
</p>

<Button
variant="secondary"
size="lg"
className="mt-6"
onClick={()=>
setShowFlashcardAnswer(
previous=>!previous
)
}
>
{showFlashcardAnswer
?"Show Question"
:"Reveal Answer"}
</Button>

<div className="mt-6 flex justify-center gap-3">
<Button
variant="secondary"
onClick={previousFlashcard}
>
← Previous
</Button>

<Button
onClick={nextFlashcard}
>
Next →
</Button>
</div>
</div>
</RevisionSection>
)}

{rapidQuestions.length>0&&(
<RevisionSection
badge="Rapid Fire"
title="Final Recall Questions"
icon="⚡"
>
<div className="space-y-4">
{rapidQuestions.map((item,index)=>(
<div
key={item.id||index}
className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
>
<p className="font-black text-white">
{index+1}. {item.question}
</p>

<input
type="text"
value={rapidAnswers[item.id]||""}
onChange={event=>
setRapidAnswers(previous=>({
...previous,
[item.id]:event.target.value
}))
}
placeholder="Type your answer"
className="mt-4 w-full rounded-2xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
/>

{showRapidAnswers&&(
<div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.06] p-4">
<p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
Correct Answer
</p>

<p className="mt-2 font-black text-white">
{item.answer}
</p>
</div>
)}
</div>
))}
</div>

<Button
variant="secondary"
size="lg"
fullWidth
className="mt-6"
onClick={()=>
setShowRapidAnswers(
previous=>!previous
)
}
>
{showRapidAnswers
?"Hide Answers"
:"Check Answers"}
</Button>
</RevisionSection>
)}

{masteryCheck.length>0&&(
<RevisionSection
badge="Mastery Checklist"
title="Confirm Topic Readiness"
icon="🏆"
>
<div className="space-y-3">
{masteryCheck.map((item,index)=>{
const checked=checkedItems.includes(index);

return(
<button
key={`${item}-${index}`}
type="button"
onClick={()=>toggleChecklist(index)}
className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
checked
?"border-emerald-400/20 bg-emerald-500/[0.07]"
:"border-white/10 bg-white/[0.03] hover:border-white/20"
}`}
>
<div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border font-black ${
checked
?"border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
:"border-white/10 bg-white/[0.04] text-zinc-500"
}`}>
{checked?"✓":index+1}
</div>

<p className="pt-1 text-sm leading-7 text-zinc-300">
{item}
</p>
</button>
);
})}
</div>

<div className="mt-6">
<ProgressBar
value={checklistProgress}
size="md"
variant="success"
showValue
label={`${completedChecklist}/${totalChecklist} confirmed`}
/>
</div>
</RevisionSection>
)}

<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
<div>
<p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
Completion Requirement
</p>

<p className="mt-2 text-lg font-black text-white">
Complete rapid questions and confirm every mastery item.
</p>
</div>

<p className={`text-3xl font-black ${
canComplete
?"text-emerald-300"
:"text-amber-300"
}`}>
{overallProgress}%
</p>
</div>

<Button
size="xl"
fullWidth
className="mt-6"
disabled={!canComplete}
onClick={finishRevision}
rightIcon="→"
>
Complete Percentage Topic
</Button>
</div>
</GlassCard>
</div>
);
}

function RevisionSection({
badge,
title,
icon,
children
}){
return(
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="relative p-6 md:p-8">
<div className="flex items-start justify-between gap-4">
<div>
<Badge variant="info" dot>
{badge}
</Badge>

<h3 className="mt-4 text-2xl font-black text-white md:text-3xl">
{title}
</h3>
</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl">
{icon}
</div>
</div>

<div className="mt-6">
{children}
</div>
</div>
</GlassCard>
);
}

function ResultCard({
label,
value,
accent
}){
const styles={
emerald:"text-emerald-300",
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