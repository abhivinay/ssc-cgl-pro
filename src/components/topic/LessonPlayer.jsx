import{useMemo,useRef,useState}from"react";
import LessonHeader from"./LessonHeader";
import LessonCard from"./LessonCard";
import LessonNavigation from"./LessonNavigation";
import LessonFinish from"./LessonFinish";

const clamp=value=>{
const number=Number(value);
if(!Number.isFinite(number))return 0;
return Math.min(100,Math.max(0,Math.round(number)));
};

export default function LessonPlayer({
lesson,
onComplete,
onExit
}){
const cards=Array.isArray(lesson?.cards)
?lesson.cards
:[];

const[currentIndex,setCurrentIndex]=useState(0);
const[finished,setFinished]=useState(false);
const[selectedVisual,setSelectedVisual]=useState(null);

const startedAtRef=useRef(Date.now());

const currentCard=cards[currentIndex]||null;

const totalCards=Math.max(1,cards.length);

const progress=cards.length
?Math.round(
((currentIndex+1)/cards.length)*100
)
:0;

const lessonStats=useMemo(()=>({
accuracy:100,
xpEarned:Math.max(
0,
Number(lesson?.xpReward)||0
),
cardsCompleted:cards.length,
totalCards:cards.length,
timeSpentSeconds:Math.max(
1,
Math.round(
(Date.now()-startedAtRef.current)/1000
)
)
}),[
cards.length,
lesson?.xpReward,
finished
]);

const goPrevious=()=>{
setCurrentIndex(previous=>
Math.max(0,previous-1)
);
};

const goNext=()=>{
const isLast=
currentIndex>=cards.length-1;

if(isLast){
setFinished(true);
return;
}

setCurrentIndex(previous=>
Math.min(cards.length-1,previous+1)
);
};

const restartLesson=()=>{
setCurrentIndex(0);
setFinished(false);
setSelectedVisual(null);
startedAtRef.current=Date.now();
};

const continueLesson=()=>{
const result={
...lessonStats,
lessonId:lesson?.id||null,
completed:true
};

onComplete?.(result);
};

if(!lesson||!cards.length){
return(
<div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-10 text-center">
<p className="text-5xl">
📭
</p>

<h2 className="mt-4 text-2xl font-black text-white">
Lesson unavailable
</h2>

<p className="mt-2 text-sm text-zinc-500">
This lesson does not contain any cards yet.
</p>
</div>
);
}

if(finished){
return(
<LessonFinish
title={`${lesson.title||"Lesson"} Complete`}
message={
lesson.completionMessage||
"You completed every lesson card successfully."
}
accuracy={lessonStats.accuracy}
xpEarned={lessonStats.xpEarned}
timeSpentSeconds={lessonStats.timeSpentSeconds}
cardsCompleted={lessonStats.cardsCompleted}
totalCards={lessonStats.totalCards}
onRestart={restartLesson}
onContinue={continueLesson}
/>
);
}

return(
<>
<div className="space-y-6">
<LessonHeader
title={lesson.title}
subtitle={lesson.subtitle}
currentCard={currentIndex+1}
totalCards={cards.length}
progress={clamp(progress)}
estimatedMinutes={lesson.estimatedMinutes}
difficulty={lesson.difficulty}
importance={lesson.importance}
subject={lesson.subject}
icon={lesson.icon}
/>

<LessonCard
card={currentCard}
onOpenVisual={setSelectedVisual}
/>

<LessonNavigation
currentCard={currentIndex+1}
totalCards={cards.length}
canGoPrevious={currentIndex>0}
canGoNext
isLastCard={currentIndex===cards.length-1}
onPrevious={goPrevious}
onNext={goNext}
/>

{onExit&&(
<div className="text-center">
<button
type="button"
onClick={onExit}
className="text-sm font-semibold text-zinc-500 transition hover:text-white"
>
Exit Lesson
</button>
</div>
)}
</div>

{selectedVisual&&(
<div
role="dialog"
aria-modal="true"
className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 p-4 backdrop-blur-xl md:p-8"
onMouseDown={event=>{
if(event.target===event.currentTarget){
setSelectedVisual(null);
}
}}
>
<div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
<div className="flex items-center justify-between gap-4 border-b border-white/10 p-5">
<div>
<p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
Visual Explanation
</p>

<h3 className="mt-1 text-xl font-black text-white">
{selectedVisual.title}
</h3>
</div>

<button
type="button"
onClick={()=>setSelectedVisual(null)}
className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-white transition hover:bg-white/[0.08]"
>
Close ✕
</button>
</div>

<div className="bg-black p-4 md:p-8">
<img
src={selectedVisual.image}
alt={
selectedVisual.alt||
selectedVisual.title||
"Lesson visual"
}
className="mx-auto max-h-[72vh] w-auto max-w-full object-contain"
/>
</div>

{selectedVisual.caption&&(
<div className="p-5 md:p-8">
<p className="text-sm leading-7 text-zinc-300">
{selectedVisual.caption}
</p>
</div>
)}
</div>
</div>
)}
</>
);
}