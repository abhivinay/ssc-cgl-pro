import{
generateOddOneOutQuestion
}from"./oddGenerator";
import{
validateOddOneOut,
getOddAccuracy
}from"./oddValidator";

const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)
?Math.max(0,number)
:0;
};

export function createOddState({
difficulty="easy"
}={}){
return{
difficulty,
question:generateOddOneOutQuestion({
difficulty
}),
round:1,
correctAnswers:0,
wrongAnswers:0,
phase:"question",
startedAt:Date.now(),
completedAt:null,
lastResult:null
};
}

export function submitOddAnswer(
state,
answer
){
const validation=validateOddOneOut(
state.question.answer,
answer
);

const correctAnswers=
clamp(state.correctAnswers)+
(validation.correct?1:0);

const wrongAnswers=
clamp(state.wrongAnswers)+
(validation.correct?0:1);

return{
...state,
correctAnswers,
wrongAnswers,
phase:"result",
lastResult:{
...validation,
accuracy:getOddAccuracy(
correctAnswers,
wrongAnswers
)
}
};
}

export function createNextOddRound(
state
){
return{
...state,
question:generateOddOneOutQuestion({
difficulty:state.difficulty
}),
round:state.round+1,
phase:"question",
lastResult:null
};
}

export function completeOddGame(
state
){
return{
...state,
phase:"completed",
completedAt:Date.now()
};
}

export function getOddSummary(
state
){
const correctAnswers=clamp(
state.correctAnswers
);

const wrongAnswers=clamp(
state.wrongAnswers
);

const totalAttempts=
correctAnswers+
wrongAnswers;

const accuracy=totalAttempts
?Math.round(
(correctAnswers/totalAttempts)*100
)
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
duration:Math.max(
1,
Math.round(reactionTime/1000)
)
};
}

export default{
createOddState,
submitOddAnswer,
createNextOddRound,
completeOddGame,
getOddSummary
};