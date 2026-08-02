export const XP={
LEARN:20,
PRACTICE:30,
PYQ:40,
REVISION:25,
MOCK:100,
STREAK:10,
PERFECT_SCORE:25
};

export function calculateLevel(totalXP){
return Math.floor(totalXP/100)+1;
}

export function getCurrentLevelXP(totalXP){
return totalXP%100;
}

export function getXPToNextLevel(totalXP){
return 100-getCurrentLevelXP(totalXP);
}

export function awardXP(currentXP,amount){
const totalXP=currentXP+amount;

return{
totalXP,
level:calculateLevel(totalXP),
currentLevelXP:getCurrentLevelXP(totalXP),
nextLevelXP:getXPToNextLevel(totalXP)
};
}

export function getRewardForStage(stage){
switch(stage){
case"learn":
return XP.LEARN;

case"practice":
return XP.PRACTICE;

case"pyq":
return XP.PYQ;

case"revision":
return XP.REVISION;

case"mock":
return XP.MOCK;

default:
return 0;
}
}

export default{
XP,
awardXP,
calculateLevel,
getCurrentLevelXP,
getXPToNextLevel,
getRewardForStage
};