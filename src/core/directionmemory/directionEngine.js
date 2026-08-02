import{
generateDirectionSequence
}from"./directionGenerator";
import{
validateDirectionSequence,
getDirectionAccuracy
}from"./directionValidator";

const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)
?Math.max(0,number)
:0;
};

export function createDirectionState({
difficulty="easy"
}={}){
return{
difficulty,
challenge:generateDirectionSequence({
difficulty
}),
phase:"memorize",
round:1,
correctAnswers:0,
wrongAnswers:0,
startedAt:Date.now(),
completedAt:null,
lastResult:null
};
}

export function submitDirectionAnswer(
state,
submittedSequence
){
const validation=validateDirectionSequence(
state.challenge.sequence,
submittedSequence
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
accuracy:getDirectionAccuracy(
state.challenge.sequence,
submittedSequence
)
}
};
}

export function createNextDirectionRound(
state
){
return{
...state,
challenge:generateDirectionSequence({
difficulty:state.difficulty
}),
phase:"memorize",
round:state.round+1,
lastResult:null
};
}

export function completeDirectionGame(
state
){
return{
...state,
phase:"completed",
completedAt:Date.now()
};
}

export function getDirectionSummary(
state
){
const correctAnswers=clamp(state.correctAnswers);
const wrongAnswers=clamp(state.wrongAnswers);

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
createDirectionState,
submitDirectionAnswer,
createNextDirectionRound,
completeDirectionGame,
getDirectionSummary
};