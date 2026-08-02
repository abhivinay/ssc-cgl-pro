const STORAGE_KEY="ssc-achievements";

const safeArray=value=>
Array.isArray(value)?value:[];

export function readAchievements(){
try{
const data=JSON.parse(
localStorage.getItem(STORAGE_KEY)||"[]"
);

return safeArray(data);
}catch{
return[];
}
}

export function saveAchievements(achievementIds=[]){
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(
[...new Set(safeArray(achievementIds))]
)
);
}

export function unlockAchievement(id){
const achievements=readAchievements();

if(achievements.includes(id)){
return achievements;
}

const updated=[...achievements,id];

saveAchievements(updated);

return updated;
}

export function isAchievementUnlocked(id){
return readAchievements().includes(id);
}

export function clearAchievements(){
localStorage.removeItem(STORAGE_KEY);
}

export default{
readAchievements,
saveAchievements,
unlockAchievement,
isAchievementUnlocked,
clearAchievements
};
