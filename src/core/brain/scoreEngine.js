const SCORE_LEVELS=Object.freeze({
PERFECT:"perfect",
EXCELLENT:"excellent",
GOOD:"good",
COMPLETED:"completed"
});

const XP_REWARDS=Object.freeze({
perfect:100,
excellent:80,
good:60,
completed:40
});

const clamp=value=>{
const number=Number(value);

if(!Number.isFinite(number))return 0;

return Math.max(0,number);
};

export function calculateAccuracy(
correctAnswers=0,
totalAttempts=0
){
const correct=clamp(correctAnswers);
const total=clamp(totalAttempts);

if(total===0)return 0;

return Math.min(
100,
Math.round(correct/total*100)
);
}

export function calculateScore({
correctAnswers=0,
wrongAnswers=0,
reactionTime=0,
difficulty="easy"
}={}){
const correct=clamp(correctAnswers);
const wrong=clamp(wrongAnswers);
const speed=Math.max(0,Number(reactionTime)||0);

const difficultyMultiplier={
easy:1,
medium:1.25,
hard:1.5
}[difficulty]||1;

const baseScore=
correct*100-
wrong*25;

const speedBonus=
speed>0
?Math.max(0,5000-speed)/100
:0;

return Math.max(
0,
Math.round(
(baseScore+speedBonus)*
difficultyMultiplier
)
);
}

export function getPerformanceLevel(
accuracy=0
){
const safeAccuracy=Math.min(
100,
Math.max(0,Number(accuracy)||0)
);

if(safeAccuracy===100){
return SCORE_LEVELS.PERFECT;
}

if(safeAccuracy>=90){
return SCORE_LEVELS.EXCELLENT;
}

if(safeAccuracy>=75){
return SCORE_LEVELS.GOOD;
}

return SCORE_LEVELS.COMPLETED;
}

export function getBrainXP({
accuracy=0,
alreadyRewarded=false
}={}){
if(alreadyRewarded)return 0;

const level=getPerformanceLevel(
accuracy
);

return XP_REWARDS[level]||0;
}

export function buildScoreSummary({
correctAnswers=0,
wrongAnswers=0,
reactionTime=0,
difficulty="easy",
alreadyRewarded=false
}={}){
const totalAttempts=
clamp(correctAnswers)+
clamp(wrongAnswers);

const accuracy=calculateAccuracy(
correctAnswers,
totalAttempts
);

const score=calculateScore({
correctAnswers,
wrongAnswers,
reactionTime,
difficulty
});

const performance=
getPerformanceLevel(
accuracy
);

const xp=getBrainXP({
accuracy,
alreadyRewarded
});

return{
score,
accuracy,
performance,
xp,
correctAnswers:clamp(correctAnswers),
wrongAnswers:clamp(wrongAnswers),
totalAttempts,
reactionTime:clamp(reactionTime),
difficulty
};
}

export default{
calculateAccuracy,
calculateScore,
getPerformanceLevel,
getBrainXP,
buildScoreSummary
};