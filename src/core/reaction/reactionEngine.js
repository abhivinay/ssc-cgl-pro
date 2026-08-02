import{
generateReactionChallenge
}from"./reactionGenerator";
import{
validateReaction,
getReactionRating
}from"./reactionValidator";

const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)
?Math.max(0,number)
:0;
};

export function createReactionState({
difficulty="easy"
}={}){
return{
difficulty,
challenge:generateReactionChallenge({
difficulty
}),
round:1,
correctAnswers:0,
wrongAnswers:0,
phase:"waiting",
startedAt:Date.now(),
completedAt:null,
signalAt:null,
lastResult:null
};
}

export function showReactionSignal(state){
return{
...state,
phase:"ready",
signalAt:Date.now()
};
}

export function submitReaction(
state,
clickedAt=Date.now()
){
const result=validateReaction({
signalShown:state.phase==="ready",
clickedAt,
signalAt:state.signalAt
});

const correctAnswers=
clamp(state.correctAnswers)+
(result.valid?1:0);

const wrongAnswers=
clamp(state.wrongAnswers)+
(result.valid?0:1);

return{
...state,
correctAnswers,
wrongAnswers,
phase:"result",
lastResult:{
...result,
rating:getReactionRating(
result.reactionTime
)
}
};
}

export function createNextReactionRound(
state
){
return{
...state,
challenge:generateReactionChallenge({
difficulty:state.difficulty
}),
round:state.round+1,
phase:"waiting",
signalAt:null,
lastResult:null
};
}

export function completeReactionGame(
state
){
return{
...state,
phase:"completed",
completedAt:Date.now()
};
}

export function getReactionSummary(
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

const averageReaction=
state.lastResult?.reactionTime||0;

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
averageReaction,
reactionTime,
duration:Math.max(
1,
Math.round(reactionTime/1000)
)
};
}

export default{
createReactionState,
showReactionSignal,
submitReaction,
createNextReactionRound,
completeReactionGame,
getReactionSummary
};