const safeNumber=value=>{
const number=Number(value);
return Number.isFinite(number)?Math.max(0,number):0;
};

export default function BrainStats({
score=0,
correctAnswers=0,
wrongAnswers=0,
reactionTime=0
}){
const safeCorrect=safeNumber(correctAnswers);
const safeWrong=safeNumber(wrongAnswers);
const totalAttempts=safeCorrect+safeWrong;

const accuracy=totalAttempts
?Math.round(safeCorrect/totalAttempts*100)
:0;

const reactionText=reactionTime
?`${(safeNumber(reactionTime)/1000).toFixed(2)}s`
:"—";

const stats=[
{
label:"Score",
value:safeNumber(score),
icon:"⭐"
},
{
label:"Correct",
value:safeCorrect,
icon:"✅"
},
{
label:"Wrong",
value:safeWrong,
icon:"❌"
},
{
label:"Accuracy",
value:`${accuracy}%`,
icon:"🎯"
},
{
label:"Attempts",
value:totalAttempts,
icon:"📝"
},
{
label:"Reaction",
value:reactionText,
icon:"⏱️"
}
];

return(
<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
{stats.map(item=>(
<div
key={item.label}
className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
>
<div className="flex items-center justify-between gap-3">
<p className="text-sm text-zinc-500">
{item.label}
</p>

<span className="text-2xl">
{item.icon}
</span>
</div>

<p className="mt-3 text-3xl font-bold">
{item.value}
</p>
</div>
))}
</div>
);
}