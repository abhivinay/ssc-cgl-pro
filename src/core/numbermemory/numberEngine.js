import{
generateUniqueNumberSequence,
getDisplayDuration
}from"./numberGenerator";
import{
getDigitAccuracy,
getMistakePositions,
validateNumberAnswer
}from"./numberValidator";

const DIFFICULTY_LEVELS=Object.freeze({
easy:{
startDigits:3,
minDigits:3,
maxDigits:8,
correctToIncrease:3,
wrongToDecrease:2
},
medium:{
startDigits:5,
minDigits:4,
maxDigits:12,
correctToIncrease:2,
wrongToDecrease:2
},
hard:{
startDigits:7,
minDigits:5,
maxDigits:18,
correctToIncrease:2,
wrongToDecrease:1
}
});

const getConfig=difficulty=>
DIFFICULTY_LEVELS[difficulty]||
DIFFICULTY_LEVELS.easy;

const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)?Math.max(0,number):0;
};

export function createNumberMemoryState({
difficulty="easy"
}={}){
const config=getConfig(difficulty);
const currentValue=generateUniqueNumberSequence({
length:config.startDigits
});

return{
difficulty,
digits:config.startDigits,
currentValue,
previousValues:[currentValue],
phase:"memorize",
round:1,
correctAnswers:0,
wrongAnswers:0,
correctStreak:0,
wrongStreak:0,
bestDigits:config.startDigits,
displayDuration:getDisplayDuration({
length:config.startDigits,
difficulty
}),
lastResult:null,
startedAt:Date.now(),
completedAt:null
};
}

export function createNextRound(state){
const config=getConfig(state?.difficulty);
const digits=Math.min(
config.maxDigits,
Math.max(
config.minDigits,
Number(state?.digits)||config.startDigits
)
);

const nextValue=generateUniqueNumberSequence({
length:digits,
previousValues:state?.previousValues
});

return{
...state,
currentValue:nextValue,
previousValues:[
...(Array.isArray(state?.previousValues)
?state.previousValues
:[]),
nextValue
].slice(-100),
phase:"memorize",
round:(Number(state?.round)||0)+1,
displayDuration:getDisplayDuration({
length:digits,
difficulty:state?.difficulty
}),
lastResult:null
};
}

export function submitNumberMemoryAnswer(
state,
submitted
){
const config=getConfig(state?.difficulty);

const validation=validateNumberAnswer(
state?.currentValue,
submitted
);

const digitAccuracy=getDigitAccuracy(
state?.currentValue,
submitted
);

const mistakes=getMistakePositions(
state?.currentValue,
submitted
);

const correctAnswers=
clamp(state?.correctAnswers)+
(validation.correct?1:0);

const wrongAnswers=
clamp(state?.wrongAnswers)+
(validation.correct?0:1);

const correctStreak=validation.correct
?clamp(state?.correctStreak)+1
:0;

const wrongStreak=validation.correct
?0
:clamp(state?.wrongStreak)+1;

let digits=Math.max(
config.minDigits,
Number(state?.digits)||config.startDigits
);

if(correctStreak>=config.correctToIncrease){
digits=Math.min(
config.maxDigits,
digits+1
);
}

if(wrongStreak>=config.wrongToDecrease){
digits=Math.max(
config.minDigits,
digits-1
);
}

return{
...state,
digits,
phase:"result",
correctAnswers,
wrongAnswers,
correctStreak:
correctStreak>=config.correctToIncrease
?0
:correctStreak,
wrongStreak:
wrongStreak>=config.wrongToDecrease
?0
:wrongStreak,
bestDigits:Math.max(
clamp(state?.bestDigits),
validation.correct
?String(state?.currentValue||"").length
:0
),
lastResult:{
...validation,
digitAccuracy,
mistakes
}
};
}

export function getNumberMemorySummary(state){
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
(state.completedAt||Date.now())-
state.startedAt
);

return{
correctAnswers,
wrongAnswers,
totalAttempts,
accuracy,
score,
reactionTime,
bestDigits:clamp(state.bestDigits),
round:clamp(state.round),
duration:Math.max(
1,
Math.round(reactionTime/1000)
)
};
}

export function completeNumberMemory(state){
return{
...state,
phase:"completed",
completedAt:Date.now()
};
}

export default{
createNumberMemoryState,
createNextRound,
submitNumberMemoryAnswer,
getNumberMemorySummary,
completeNumberMemory
};