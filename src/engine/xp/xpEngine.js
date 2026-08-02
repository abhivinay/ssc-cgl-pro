const XP_PER_LEVEL=1000;

const XP_REWARDS={
learn:20,
practice:40,
analysis:30,
revision:25,
brainTrainer:15,
topicTest:50,
mockTest:200,
dailyMission:100,
focusSession:100,
studyHour:10,
streakBonus:25
};

function normalize(xp=0){
const totalXP=Math.max(0,Number(xp)||0);
const level=Math.floor(totalXP/XP_PER_LEVEL)+1;
const currentLevelXP=totalXP%XP_PER_LEVEL;
const nextLevelXP=XP_PER_LEVEL;
const progress=(currentLevelXP/nextLevelXP)*100;

return{
totalXP,
level,
currentLevelXP,
nextLevelXP,
progress:Number(progress.toFixed(2))
};
}

function addXP(currentXP,reward){
const gained=typeof reward==="number"?reward:(XP_REWARDS[reward]||0);
return normalize((Number(currentXP)||0)+gained);
}

function removeXP(currentXP,amount){
return normalize(Math.max(0,(Number(currentXP)||0)-(Number(amount)||0)));
}

function getReward(action){
return XP_REWARDS[action]||0;
}

function getLevelTitle(level){
if(level>=50)return"Legend";
if(level>=40)return"Grand Master";
if(level>=30)return"Master";
if(level>=20)return"Expert";
if(level>=10)return"Advanced";
if(level>=5)return"Intermediate";
return"Beginner";
}

export{
XP_PER_LEVEL,
XP_REWARDS,
normalize,
addXP,
removeXP,
getReward,
getLevelTitle
};