import{
generatePatternQuestion
}from"./patternGenerator";
import{
validatePatternAnswer,
getPatternAccuracy
}from"./patternValidator";

const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)
?Math.max(0,number)
:0;
};

export function createPatternState({
difficulty="easy"
}={}){
return{
difficulty,
question:generatePatternQuestion({
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

export function submitPatternAnswer(
state,
answer
){
const validation=
validatePatternAnswer(
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
accuracy:getPatternAccuracy(
correctAnswers,
wrongAnswers
)
}
};
}

export function createNextPatternRound(
state
){
return{
...state,
question:generatePatternQuestion({
difficulty:state.difficulty
}),
round:state.round+1,
phase:"question",
lastResult:null
};
}

export function completePatternGame(
state
){
return{
...state,
phase:"completed",
completedAt:Date.now()
};
}

export function getPatternSummary(
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
createPatternState,
submitPatternAnswer,
createNextPatternRound,
completePatternGame,
getPatternSummary
};