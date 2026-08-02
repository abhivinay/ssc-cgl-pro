import QuestionStage from "./QuestionStage";

const PYQ_FEATURE_CARDS=[
{
title:"Topic-wise PYQs",
description:"Questions organised under this exact topic."
},
{
title:"Year-wise PYQs",
description:"Questions grouped by examination year."
},
{
title:"Timed PYQ Test",
description:"SSC-style timer, review palette and analysis."
}
];

const getSafeQuestions=(getStageQuestions,content)=>{
if(typeof getStageQuestions!=="function")return[];

try{
const result=getStageQuestions(content,"pyq");
return Array.isArray(result)?result:[];
}catch(error){
console.error("Failed to load PYQ questions:",error);
return[];
}
};

export default function PyqContent({
topic,
content,
onResult,
getStageQuestions
}){
const questions=getSafeQuestions(
getStageQuestions,
content
);

const topicName=
topic?.name||
topic?.topic||
"Selected Topic";

if(questions.length){
return(
<QuestionStage
title={`${topicName} PYQ`}
description="Solve verified previous-year questions and reach the pass mark to complete this stage."
questions={questions}
passPercentage={60}
onResult={onResult}
topicId={topic?.id}
subject={topic?.subject}
difficulty="pyq"
/>
);
}

return(
<div className="space-y-5">
<div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8">
<p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
Previous-year questions
</p>

<h2 className="mt-3 text-3xl font-bold">
{topicName} PYQ section
</h2>

<p className="mt-4 max-w-3xl leading-7 text-zinc-300">
Only verified questions from actual SSC papers should be placed here.
Each question can include its examination, year, date and shift when
that information is available.
</p>
</div>

<div className="grid gap-4 md:grid-cols-3">
{PYQ_FEATURE_CARDS.map(card=>(
<div
key={card.title}
className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
>
<p className="text-2xl">
📄
</p>

<h3 className="mt-4 font-bold">
{card.title}
</h3>

<p className="mt-2 text-sm leading-6 text-zinc-400">
{card.description}
</p>
</div>
))}
</div>

<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<p className="text-sm leading-7 text-zinc-300">
No verified PYQs are currently available for this topic. Add them to
the matching topic question source and they will appear here
automatically.
</p>
</div>
</div>
);
}