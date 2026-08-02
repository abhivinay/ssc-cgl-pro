import{
generateUniqueVisualBoard,
getVisualDisplayDuration
}from"./visualGenerator";
import{
validateVisualSelection,
getVisualAccuracy
}from"./visualValidator";

const LEVELS={
easy:{
gridSize:3,
highlightCount:3,
correctToIncrease:3,
wrongToDecrease:2,
maxGrid:6
},
medium:{
gridSize:4,
highlightCount:5,
correctToIncrease:2,
wrongToDecrease:2,
maxGrid:7
},
hard:{
gridSize:5,
highlightCount:7,
correctToIncrease:2,
wrongToDecrease:1,
maxGrid:8
}
};

const getConfig=difficulty=>
LEVELS[difficulty]||LEVELS.easy;

const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)?Math.max(0,number):0;
};

export function createVisualMemoryState({
difficulty="easy"
}={}){
const config=getConfig(difficulty);

const board=generateUniqueVisualBoard({
gridSize:config.gridSize,
highlightCount:config.highlightCount
});

return{
difficulty,
board,
previousBoards:[board],
phase:"memorize",
round:1,
correctAnswers:0,
wrongAnswers:0,
correctStreak:0,
wrongStreak:0,
displayDuration:getVisualDisplayDuration({
gridSize:board.gridSize,
highlightCount:board.highlightCount,
difficulty
}),
lastResult:null,
startedAt:Date.now(),
completedAt:null
};
}

export function submitVisualSelection(
state,
selectedIndexes
){
const validation=validateVisualSelection(
state.board.highlightedIndexes,
selectedIndexes
);

const accuracy=getVisualAccuracy(
state.board.highlightedIndexes,
selectedIndexes
);

return{
...state,
correctAnswers:
state.correctAnswers+(validation.correct?1:0),
wrongAnswers:
state.wrongAnswers+(validation.correct?0:1),
lastResult:{
...validation,
accuracy
},
phase:"result"
};
}

export function createNextVisualRound(state){
const config=getConfig(state.difficulty);

const gridSize=Math.min(
config.maxGrid,
config.gridSize+
Math.floor(state.correctAnswers/3)
);

const highlightCount=Math.min(
gridSize*gridSize-1,
config.highlightCount+
Math.floor(state.correctAnswers/2)
);

const board=generateUniqueVisualBoard({
gridSize,
highlightCount,
previousBoards:state.previousBoards
});

return{
...state,
board,
previousBoards:[
...state.previousBoards,
board
].slice(-100),
round:state.round+1,
phase:"memorize",
displayDuration:getVisualDisplayDuration({
gridSize,
highlightCount,
difficulty:state.difficulty
}),
lastResult:null
};
}

export function completeVisualMemory(state){
return{
...state,
phase:"completed",
completedAt:Date.now()
};
}

export function getVisualSummary(state){
const correctAnswers=clamp(state.correctAnswers);
const wrongAnswers=clamp(state.wrongAnswers);
const totalAttempts=correctAnswers+wrongAnswers;

const accuracy=totalAttempts
?Math.round((correctAnswers/totalAttempts)*100)
:0;

const score=
correctAnswers*100-
wrongAnswers*25;

const reactionTime=Math.max(
1,
Math.round(
((state.completedAt||Date.now())-
state.startedAt)
)
);

return{
correctAnswers,
wrongAnswers,
totalAttempts,
accuracy,
score,
reactionTime,
duration:Math.max(
1,
Math.round(
((state.completedAt||Date.now())-
state.startedAt)/1000
)
)
};
}

export default{
createVisualMemoryState,
submitVisualSelection,
createNextVisualRound,
completeVisualMemory,
getVisualSummary
};