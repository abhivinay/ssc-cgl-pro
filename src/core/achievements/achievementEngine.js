import achievements from "../../data/achievements/achievements";

const getValue=(stats,type)=>{
switch(type){
case "level":
return Number(stats.level)||0;

case "xp":
return Number(stats.xp)||0;

case "topicsCompleted":
return Number(stats.topicsCompleted)||0;

case "streak":
return Number(stats.streak)||0;

case "revisionsCompleted":
return Number(stats.revisionsCompleted)||0;

case "mistakesReviewed":
return Number(stats.mistakesReviewed)||0;

case "brainGamesCompleted":
return Number(stats.brainGamesCompleted)||0;

case "mocksCompleted":
return Number(stats.mocksCompleted)||0;

default:
return 0;
}
};

export function getUnlockedAchievements(
stats={},
unlockedIds=[]
){
const unlocked=new Set(unlockedIds);

return achievements.map(achievement=>{
const progress=getValue(
stats,
achievement.type
);

const completed=progress>=achievement.target;

return{
...achievement,
progress:Math.min(progress,achievement.target),
completed,
newlyUnlocked:
completed&&!unlocked.has(achievement.id)
};
});
}

export function getAchievementProgress(
achievement,
stats={}
){
return Math.min(
getValue(stats,achievement.type),
achievement.target
);
}

export function getCompletionPercentage(
achievement,
stats={}
){
return Math.round(
(getAchievementProgress(
achievement,
stats
)/achievement.target)*100
);
}

export default{
getUnlockedAchievements,
getAchievementProgress,
getCompletionPercentage
};