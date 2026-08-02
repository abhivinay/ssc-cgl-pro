const clampInteger=(value,min,max,fallback)=>{
const number=Math.floor(Number(value));
if(!Number.isFinite(number))return fallback;
return Math.min(max,Math.max(min,number));
};

const createId=()=>{
if(
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
){
return crypto.randomUUID();
}

return`visual-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
};

const shuffle=items=>{
const result=[...items];

for(let index=result.length-1;index>0;index-=1){
const randomIndex=Math.floor(Math.random()*(index+1));

[result[index],result[randomIndex]]=[
result[randomIndex],
result[index]
];
}

return result;
};

export function generateVisualBoard({
gridSize=3,
highlightCount=3
}={}){
const safeGridSize=clampInteger(
gridSize,
2,
8,
3
);

const totalCells=safeGridSize*safeGridSize;

const safeHighlightCount=clampInteger(
highlightCount,
1,
Math.max(1,totalCells-1),
3
);

const indexes=Array.from(
{length:totalCells},
(_,index)=>index
);

const highlightedIndexes=shuffle(indexes)
.slice(0,safeHighlightCount)
.sort((first,second)=>first-second);

return{
id:createId(),
gridSize:safeGridSize,
totalCells,
highlightCount:safeHighlightCount,
highlightedIndexes
};
}

export function generateUniqueVisualBoard({
gridSize=3,
highlightCount=3,
previousBoards=[],
maxAttempts=50
}={}){
const blocked=new Set(
Array.isArray(previousBoards)
?previousBoards.map(board=>
Array.isArray(board?.highlightedIndexes)
?board.highlightedIndexes.join(",")
:String(board)
)
:[]
);

const attempts=clampInteger(
maxAttempts,
1,
500,
50
);

for(let attempt=0;attempt<attempts;attempt+=1){
const board=generateVisualBoard({
gridSize,
highlightCount
});

const signature=board.highlightedIndexes.join(",");

if(!blocked.has(signature)){
return board;
}
}

return generateVisualBoard({
gridSize,
highlightCount
});
}

export function getVisualDisplayDuration({
gridSize=3,
highlightCount=3,
difficulty="easy"
}={}){
const safeGridSize=clampInteger(gridSize,2,8,3);
const safeHighlightCount=clampInteger(
highlightCount,
1,
safeGridSize*safeGridSize,
3
);

const baseDuration={
easy:2600,
medium:2200,
hard:1800
}[difficulty]||2600;

const complexityBonus=
Math.max(0,safeGridSize-3)*200+
Math.max(0,safeHighlightCount-3)*120;

return Math.min(
8000,
baseDuration+complexityBonus
);
}

export default{
generateVisualBoard,
generateUniqueVisualBoard,
getVisualDisplayDuration
};