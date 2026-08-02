import{useEffect,useMemo,useState}from"react";
import GlassCard from"../ui/GlassCard";
import Badge from"../ui/Badge";
import Button from"../ui/Button";

const toArray=value=>Array.isArray(value)?value:[];

const getPeriodText=value=>{
if(!value)return"";
if(typeof value==="string")return value;
if(typeof value==="object"){
return value.label||value.period||value.name||"";
}
return String(value);
};

export default function LearnStage({content}){
const[selectedVisual,setSelectedVisual]=useState(null);

const activeUnit=useMemo(()=>{
const units=toArray(content?.units);

return(
units.find(unit=>unit.status==="active")||
units[0]||
null
);
},[content]);

const introduction=content?.introduction||{};
const baseObjectives=toArray(content?.objectives);
const unitObjectives=toArray(activeUnit?.learningGoals);

const objectives=baseObjectives.length
?baseObjectives
:unitObjectives;

const sections=useMemo(()=>{
const normalSections=toArray(content?.sections);

if(normalSections.length){
return normalSections;
}

return toArray(activeUnit?.concepts);
},[content,activeUnit]);

const standardConversions=toArray(
content?.standardConversions
);

const sscPatterns=[
...toArray(content?.sscPatterns),
...toArray(activeUnit?.sscPatterns)
];

const commonMistakes=toArray(
content?.commonMistakes
);

const masteryChecklist=[
...toArray(content?.masteryChecklist),
...toArray(activeUnit?.masteryChecklist)
];

useEffect(()=>{
if(!selectedVisual)return;

const closeOnEscape=event=>{
if(event.key==="Escape"){
setSelectedVisual(null);
}
};

document.addEventListener("keydown",closeOnEscape);
document.body.style.overflow="hidden";

return()=>{
document.removeEventListener("keydown",closeOnEscape);
document.body.style.overflow="";
};
},[selectedVisual]);

if(!content){
return(
<EmptyState
title="Learning content unavailable"
message="This topic does not have learning content connected yet."
/>
);
}

return(
<>
<div className="space-y-6">
<GlassCard
padding="p-0"
className="relative overflow-hidden"
>
<div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl"/>

<div className="relative p-6 md:p-8">
<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
<div className="max-w-3xl">
<div className="flex flex-wrap items-center gap-3">
<Badge variant="primary" dot>
Learn Stage
</Badge>

{activeUnit?.importance&&(
<Badge
variant={
activeUnit.importance==="high"||
activeUnit.importance==="very-high"
?"warning"
:"info"
}
>
{activeUnit.importance} importance
</Badge>
)}
</div>

<h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
{activeUnit?.title||
introduction?.title||
"Topic Overview"}
</h2>

<p className="mt-4 text-base leading-8 text-zinc-300">
{activeUnit?.what||
introduction?.definition}
</p>

{introduction?.coreIdea&&(
<InfoBox
label="Core Idea"
value={introduction.coreIdea}
accent="violet"
/>
)}

{activeUnit?.why&&(
<InfoBox
label="Why You Must Learn This"
value={activeUnit.why}
accent="amber"
/>
)}
</div>

<div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-5xl">
📖
</div>
</div>

{introduction?.examImportance&&(
<InfoBox
label="SSC Importance"
value={introduction.examImportance}
accent="amber"
/>
)}

{activeUnit&&(
<UnitOverview unit={activeUnit}/>
)}
</div>
</GlassCard>

{objectives.length>0&&(
<SectionCard
badge="Learning Objectives"
title="What You Will Master"
icon="🎯"
>
<div className="grid gap-3 md:grid-cols-2">
{objectives.map((item,index)=>(
<ListCard
key={`${item}-${index}`}
number={index+1}
text={item}
/>
))}
</div>
</SectionCard>
)}

{sections.map((section,index)=>(
<SectionCard
key={section.id||index}
badge={`Concept ${index+1}`}
title={section.title}
icon="📘"
>
<ConceptIntroduction section={section}/>

{section.rule&&(
<InfoBox
label="Rule"
value={section.rule}
accent="violet"
/>
)}

{section.formula&&(
<InfoBox
label="Formula"
value={section.formula}
accent="emerald"
/>
)}

{toArray(section.formulas).length>0&&(
<div className="space-y-3">
{section.formulas.map((formula,itemIndex)=>(
<InfoBox
key={`${formula}-${itemIndex}`}
label={`Formula ${itemIndex+1}`}
value={formula}
accent="emerald"
/>
))}
</div>
)}

<ExplanationList
items={
toArray(section.explanation).length
?section.explanation
:section.content
}
/>

{toArray(section.how).length>0&&(
<ContentList
title="How It Works"
items={section.how}
accent="cyan"
/>
)}

{toArray(section.visuals).length>0&&(
<div className="mt-7 space-y-5">
<p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
Visual Explanation
</p>

<div className="grid gap-5">
{section.visuals.map((visual,itemIndex)=>(
<VisualCard
key={visual.id||itemIndex}
visual={visual}
onOpen={()=>setSelectedVisual(visual)}
/>
))}
</div>
</div>
)}

{toArray(section.examples).length>0&&(
<SolvedExamples examples={section.examples}/>
)}

{toArray(section.examFocus).length>0&&(
<ContentList
title="SSC Examiner's View"
items={section.examFocus}
accent="amber"
icon="🎯"
/>
)}

{section.examNote&&(
<InfoBox
label="Exam Note"
value={section.examNote}
accent="sky"
/>
)}

{toArray(section.commonConfusions).length>0&&(
<ContentList
title="Common Confusions"
items={section.commonConfusions}
accent="rose"
icon="⚠️"
/>
)}

{section.commonMistake&&(
<InfoBox
label="Common Mistake"
value={section.commonMistake}
accent="rose"
/>
)}

{section.memoryStory&&(
<InfoBox
label="Memory Story"
value={section.memoryStory}
accent="violet"
/>
)}

{section.memoryTip&&(
<InfoBox
label="Memory Tip"
value={section.memoryTip}
accent="violet"
/>
)}

{section.quickSummary&&(
<InfoBox
label="Quick Summary"
value={section.quickSummary}
accent="emerald"
/>
)}
</SectionCard>
))}

{standardConversions.length>0&&(
<SectionCard
badge="Memory Table"
title="Standard Fraction–Percentage Conversions"
icon="🧠"
>
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
{standardConversions.map((item,index)=>(
<div
key={`${item.fraction}-${index}`}
className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
>
<p className="font-black text-white">
{item.fraction}
</p>

<p className="font-black text-violet-300">
{item.percentage}
</p>
</div>
))}
</div>
</SectionCard>
)}

{sscPatterns.length>0&&(
<SectionCard
badge="SSC Patterns"
title="Frequently Tested Question Types"
icon="🎯"
>
<div className="grid gap-3 md:grid-cols-2">
{sscPatterns.map((item,index)=>(
<div
key={`${item}-${index}`}
className="rounded-2xl border border-amber-400/15 bg-amber-500/[0.04] p-4"
>
<p className="text-sm leading-7 text-zinc-300">
{item}
</p>
</div>
))}
</div>
</SectionCard>
)}

{commonMistakes.length>0&&(
<SectionCard
badge="Mistake Prevention"
title="Common Errors to Avoid"
icon="⚠️"
>
<div className="space-y-3">
{commonMistakes.map((item,index)=>(
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
</SectionCard>
)}

{masteryChecklist.length>0&&(
<SectionCard
badge="Mastery Check"
title="Before You Complete This Stage"
icon="🏆"
>
<div className="space-y-3">
{masteryChecklist.map((item,index)=>(
<div
key={`${item}-${index}`}
className="flex items-start gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.04] p-4"
>
<span className="text-emerald-300">
□
</span>

<p className="text-sm leading-7 text-zinc-300">
{item}
</p>
</div>
))}
</div>
</SectionCard>
)}
</div>

{selectedVisual&&(
<VisualModal
visual={selectedVisual}
onClose={()=>setSelectedVisual(null)}
/>
)}
</>
);
}

function UnitOverview({unit}){
const phases=toArray(unit?.when?.phases);
const majorSites=toArray(unit?.where?.majorSites);
const how=toArray(unit?.how);

if(
!phases.length&&
!majorSites.length&&
!how.length
){
return null;
}

return(
<div className="mt-7 grid gap-4 lg:grid-cols-3">
{phases.length>0&&(
<OverviewCard
title={unit.when?.label||"When"}
icon="🗓️"
>
<div className="space-y-3">
{phases.map((phase,index)=>(
<div
key={`${phase.name}-${index}`}
className="rounded-xl border border-white/10 bg-black/20 p-3"
>
<p className="font-black text-white">
{phase.name}
</p>

<p className="mt-1 text-xs text-zinc-500">
{phase.period}
</p>
</div>
))}
</div>
</OverviewCard>
)}

{majorSites.length>0&&(
<OverviewCard
title="Where"
icon="🗺️"
>
<p className="mb-3 text-sm leading-6 text-zinc-400">
{unit.where?.summary}
</p>

<div className="flex flex-wrap gap-2">
{majorSites.map(site=>(
<span
key={site}
className="rounded-full border border-sky-400/15 bg-sky-500/[0.06] px-3 py-1 text-xs font-bold text-sky-300"
>
{site}
</span>
))}
</div>
</OverviewCard>
)}

{how.length>0&&(
<OverviewCard
title="How It Worked"
icon="⚙️"
>
<div className="space-y-2">
{how.map((item,index)=>(
<p
key={`${item}-${index}`}
className="text-sm leading-6 text-zinc-400"
>
• {item}
</p>
))}
</div>
</OverviewCard>
)}
</div>
);
}

function OverviewCard({title,icon,children}){
return(
<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
<div className="flex items-center gap-3">
<span className="text-2xl">
{icon}
</span>

<p className="font-black text-white">
{title}
</p>
</div>

<div className="mt-4">
{children}
</div>
</div>
);
}

function ConceptIntroduction({section}){
const items=[
{
label:"Why",
value:section.why,
accent:"amber"
},
{
label:"What",
value:section.what,
accent:"violet"
},
{
label:"When",
value:getPeriodText(section.when),
accent:"sky"
},
{
label:"Where",
value:getPeriodText(section.where),
accent:"emerald"
}
].filter(item=>item.value);

if(!items.length)return null;

return(
<div className="grid gap-3 md:grid-cols-2">
{items.map(item=>(
<div
key={item.label}
className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
>
<p className={`text-xs font-black uppercase tracking-[0.16em] ${
getAccentText(item.accent)
}`}>
{item.label}
</p>

<p className="mt-2 text-sm leading-7 text-zinc-300">
{item.value}
</p>
</div>
))}
</div>
);
}

function ExplanationList({items}){
const safeItems=toArray(items);

if(!safeItems.length)return null;

return(
<div className="mt-5 space-y-3">
{safeItems.map((point,index)=>(
<div
key={`${point}-${index}`}
className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
>
<span className="mt-1 text-emerald-300">
✓
</span>

<p className="text-sm leading-7 text-zinc-300">
{point}
</p>
</div>
))}
</div>
);
}

function ContentList({
title,
items,
accent="violet",
icon="✓"
}){
const safeItems=toArray(items);

if(!safeItems.length)return null;

const styles={
violet:
"border-violet-400/15 bg-violet-500/[0.04]",
cyan:
"border-cyan-400/15 bg-cyan-500/[0.04]",
amber:
"border-amber-400/15 bg-amber-500/[0.04]",
rose:
"border-rose-400/15 bg-rose-500/[0.04]"
};

return(
<div className="mt-6">
<p className={`text-xs font-black uppercase tracking-[0.18em] ${
getAccentText(accent)
}`}>
{title}
</p>

<div className="mt-3 space-y-3">
{safeItems.map((item,index)=>(
<div
key={`${item}-${index}`}
className={`flex items-start gap-3 rounded-2xl border p-4 ${
styles[accent]||styles.violet
}`}
>
<span className={getAccentText(accent)}>
{icon}
</span>

<p className="text-sm leading-7 text-zinc-300">
{item}
</p>
</div>
))}
</div>
</div>
);
}

function VisualCard({visual,onOpen}){
const labels=toArray(visual.labels);
const examFocus=toArray(
visual.examFocus||
visual.examImportancePoints
);

return(
<div className="overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-cyan-500/[0.035]">
<div className="relative min-h-56 bg-zinc-950">
<img
src={visual.image}
alt={visual.alt||visual.title||"Educational visual"}
loading="lazy"
className="h-auto min-h-56 w-full object-contain"
onError={event=>{
event.currentTarget.style.display="none";
event.currentTarget.nextElementSibling?.classList.remove("hidden");
}}
/>

<div className="hidden min-h-56 items-center justify-center p-8 text-center">
<div>
<p className="text-5xl">
🖼️
</p>

<p className="mt-4 font-black text-white">
Visual file not added yet
</p>

<p className="mt-2 break-all text-xs text-zinc-500">
{visual.image}
</p>
</div>
</div>

{visual.zoomable!==false&&(
<button
type="button"
onClick={onOpen}
className="absolute right-4 top-4 rounded-xl border border-white/10 bg-black/70 px-4 py-2 text-xs font-black text-white backdrop-blur-md transition hover:bg-black"
>
🔍 Full Screen
</button>
)}
</div>

<div className="p-5 md:p-6">
<div className="flex flex-wrap items-start justify-between gap-4">
<div>
<p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
{visual.type||"Educational Visual"}
</p>

<h4 className="mt-2 text-xl font-black text-white">
{visual.title}
</h4>
</div>

{visual.importance&&(
<Badge
variant={
visual.importance==="very-high"||
visual.importance==="high"
?"warning"
:"info"
}
>
{visual.importance}
</Badge>
)}
</div>

{visual.caption&&(
<p className="mt-3 text-sm leading-7 text-zinc-400">
{visual.caption}
</p>
)}

{labels.length>0&&(
<div className="mt-5 flex flex-wrap gap-2">
{labels.map(label=>(
<span
key={label}
className="rounded-full border border-cyan-400/15 bg-cyan-500/[0.07] px-3 py-1 text-xs font-bold text-cyan-200"
>
{label}
</span>
))}
</div>
)}

{examFocus.length>0&&(
<div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/[0.06] p-4">
<p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">
SSC Examiner's View
</p>

<div className="mt-3 space-y-2">
{examFocus.map((item,index)=>(
<p
key={`${item}-${index}`}
className="text-sm leading-6 text-zinc-300"
>
• {item}
</p>
))}
</div>
</div>
)}

{visual.memoryTip&&(
<div className="mt-4 rounded-2xl border border-violet-400/20 bg-violet-500/[0.06] p-4">
<p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">
Memory Tip
</p>

<p className="mt-2 text-sm leading-7 text-zinc-300">
{visual.memoryTip}
</p>
</div>
)}
</div>
</div>
);
}

function VisualModal({visual,onClose}){
const labels=toArray(visual.labels);

return(
<div
role="dialog"
aria-modal="true"
aria-label={visual.title}
className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 p-4 backdrop-blur-xl md:p-8"
onMouseDown={event=>{
if(event.target===event.currentTarget){
onClose();
}
}}
>
<div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl">
<div className="flex items-center justify-between gap-4 border-b border-white/10 p-5">
<div>
<p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
Visual Explanation
</p>

<h3 className="mt-1 text-xl font-black text-white">
{visual.title}
</h3>
</div>

<Button
variant="secondary"
onClick={onClose}
>
Close ✕
</Button>
</div>

<div className="bg-black p-4 md:p-8">
<img
src={visual.image}
alt={visual.alt||visual.title}
className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
/>
</div>

<div className="p-5 md:p-8">
{visual.caption&&(
<p className="text-sm leading-7 text-zinc-300">
{visual.caption}
</p>
)}

{labels.length>0&&(
<div className="mt-5 flex flex-wrap gap-2">
{labels.map(label=>(
<span
key={label}
className="rounded-full border border-cyan-400/15 bg-cyan-500/[0.07] px-3 py-1 text-xs font-bold text-cyan-200"
>
{label}
</span>
))}
</div>
)}
</div>
</div>
</div>
);
}

function SolvedExamples({examples}){
return(
<div className="mt-6 space-y-4">
<p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
Solved Examples
</p>

{examples.map((example,index)=>(
<div
key={`${example.question}-${index}`}
className="rounded-3xl border border-cyan-400/15 bg-cyan-500/[0.04] p-5"
>
<p className="text-sm font-black text-white">
{example.question}
</p>

<p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-300">
{Array.isArray(example.solution)
?example.solution.join("\n")
:example.solution}
</p>
</div>
))}
</div>
);
}

function ListCard({number,text}){
return(
<div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-sm font-black text-emerald-300">
{number}
</span>

<p className="text-sm leading-6 text-zinc-300">
{text}
</p>
</div>
);
}

function SectionCard({
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

function InfoBox({
label,
value,
accent="violet"
}){
const styles={
violet:
"border-violet-400/20 bg-violet-500/[0.06] text-violet-300",
emerald:
"border-emerald-400/20 bg-emerald-500/[0.06] text-emerald-300",
amber:
"border-amber-400/20 bg-amber-500/[0.06] text-amber-300",
sky:
"border-sky-400/20 bg-sky-500/[0.06] text-sky-300",
rose:
"border-rose-400/20 bg-rose-500/[0.06] text-rose-300"
};

if(!value)return null;

return(
<div className={`mt-4 rounded-2xl border p-4 ${
styles[accent]||styles.violet
}`}>
<p className="text-xs font-black uppercase tracking-[0.16em]">
{label}
</p>

<p className="mt-2 text-sm font-semibold leading-7 text-zinc-200">
{value}
</p>
</div>
);
}

function getAccentText(accent){
const styles={
violet:"text-violet-300",
emerald:"text-emerald-300",
amber:"text-amber-300",
sky:"text-sky-300",
cyan:"text-cyan-300",
rose:"text-rose-300"
};

return styles[accent]||styles.violet;
}

function EmptyState({title,message}){
return(
<GlassCard className="p-10 text-center">
<p className="text-5xl">
📭
</p>

<h2 className="mt-4 text-2xl font-black text-white">
{title}
</h2>

<p className="mt-2 text-sm text-zinc-500">
{message}
</p>
</GlassCard>
);
}