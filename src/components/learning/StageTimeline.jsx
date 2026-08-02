const EMPTY_STATUS={
LOCKED:"locked",
ACTIVE:"active",
COMPLETED:"completed"
};

export default function StageTimeline({
stages=[],
topic,
currentStageId,
progress={},
statusEnum=EMPTY_STATUS,
getStageStatus,
onStageClick
}){
const safeStages=Array.isArray(stages)
?stages
:[];

if(!safeStages.length){
return(
<div className="mt-5 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50 p-6 text-center text-sm text-zinc-500">
No learning stages are available.
</div>
);
}

const getStatus=stageId=>{
if(typeof getStageStatus!=="function"){
return statusEnum.LOCKED;
}

try{
return getStageStatus(
topic,
stageId,
progress
);
}catch(error){
console.error(
`Failed to calculate status for stage: ${stageId}`,
error
);

return statusEnum.LOCKED;
}
};

const openStage=(item,index,itemStatus)=>{
if(
itemStatus===statusEnum.LOCKED||
typeof onStageClick!=="function"
){
return;
}

onStageClick(item,index);
};

return(
<div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
{safeStages.map((item,index)=>{
const stageId=String(
item?.id??`stage-${index}`
);

const itemStatus=getStatus(stageId);

const selected=
stageId===currentStageId;

const completed=
itemStatus===statusEnum.COMPLETED;

const active=
itemStatus===statusEnum.ACTIVE;

const locked=
itemStatus===statusEnum.LOCKED;

const stageName=
item?.name||
item?.shortName||
`Stage ${index+1}`;

const stageXP=Math.max(
0,
Number(item?.xp)||0
);

return(
<button
key={stageId}
type="button"
disabled={locked}
aria-current={selected?"step":undefined}
aria-label={`${stageName}: ${
completed
?"Completed"
:active
?"Available"
:"Locked"
}`}
onClick={()=>
openStage(
item,
index,
itemStatus
)
}
className={`rounded-2xl border p-4 text-left transition ${
locked
?"cursor-not-allowed border-zinc-800 bg-zinc-900/50 text-zinc-600"
:selected
?"border-violet-500 bg-violet-500/10"
:completed
?"border-emerald-500/30 bg-emerald-500/5"
:active
?"border-zinc-700 bg-zinc-900 hover:border-violet-500"
:"border-zinc-800 bg-zinc-900/50 text-zinc-600"
}`}
>
<div className="flex items-center justify-between gap-2">
<span className="text-xl">
{completed
?"✓"
:locked
?"🔒"
:item?.icon||"●"}
</span>

<span className="text-xs">
+{stageXP} XP
</span>
</div>

<p className="mt-3 text-sm font-semibold">
{stageName}
</p>

<p className="mt-1 text-xs text-zinc-500">
{completed
?"Completed"
:active
?"Available"
:"Locked"}
</p>
</button>
);
})}
</div>
);
}