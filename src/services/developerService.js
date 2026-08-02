import {
readBrainState,
writeBrainState,
clearBrainStorage
} from "./brainStorage";
import {
readAchievements,
saveAchievements,
clearAchievements
} from "./achievementStorage";
import achievements from "../data/achievements/achievements";

const STUDY_KEY="studyState";

const readJSON=(key,fallback)=>{
try{
const raw=localStorage.getItem(key);
return raw?JSON.parse(raw):fallback;
}catch{
return fallback;
}
};

const writeJSON=(key,value)=>{
localStorage.setItem(key,JSON.stringify(value));
return value;
};

export function getStorageSnapshot(){
const result={};

for(let index=0;index<localStorage.length;index+=1){
const key=localStorage.key(index);

if(!key)continue;

const raw=localStorage.getItem(key);

try{
result[key]=JSON.parse(raw);
}catch{
result[key]=raw;
}
}

return result;
}

export function exportStorage(){
const snapshot=getStorageSnapshot();
const blob=new Blob(
[JSON.stringify(snapshot,null,2)],
{type:"application/json"}
);

const url=URL.createObjectURL(blob);
const link=document.createElement("a");

link.href=url;
link.download=`ssc-sentinel-backup-${new Date()
.toISOString()
.slice(0,10)}.json`;

document.body.appendChild(link);
link.click();
link.remove();

URL.revokeObjectURL(url);
}

export function importStorage(snapshot){
if(
!snapshot||
typeof snapshot!=="object"||
Array.isArray(snapshot)
){
throw new Error("Invalid storage backup.");
}

Object.entries(snapshot).forEach(([key,value])=>{
localStorage.setItem(
key,
typeof value==="string"
?value
:JSON.stringify(value)
);
});

return getStorageSnapshot();
}

export function addDeveloperXP(amount=100){
const value=Math.max(0,Number(amount)||0);
const state=readJSON(STUDY_KEY,{});
const xp=(Number(state.xp)||0)+value;

return writeJSON(STUDY_KEY,{
...state,
xp,
level:Math.floor(xp/500)+1
});
}

export function resetDeveloperXP(){
const state=readJSON(STUDY_KEY,{});

return writeJSON(STUDY_KEY,{
...state,
xp:0,
level:1
});
}

export function unlockAllAchievements(){
const ids=achievements.map(item=>item.id);
saveAchievements(ids);
return ids;
}

export function resetAchievements(){
clearAchievements();
return[];
}

export function simulatePerfectBrainSession(){
const state=readBrainState();
const now=Date.now();

const session={
id:`dev-perfect-${now}`,
dateKey:new Date().toISOString().slice(0,10),
duration:300,
status:"completed",
startedAt:now-300000,
completedAt:now,
currentGameIndex:5,
games:[
"mental-math",
"number-memory",
"visual-memory",
"pattern-recognition",
"speed-reaction"
],
results:Array.from({length:5},(_,index)=>({
id:`dev-result-${index}-${now}`,
gameType:"mental-math",
status:"completed",
score:1000,
accuracy:100,
correctAnswers:10,
wrongAnswers:0,
totalAttempts:10,
reactionTime:900,
xp:100
})),
totalScore:5000,
averageAccuracy:100,
xpEarned:500,
rewarded:false
};

return writeBrainState({
...state,
dailySession:session,
history:[
session,
...(Array.isArray(state.history)?state.history:[])
].slice(0,365),
totalSessions:(Number(state.totalSessions)||0)+1,
bestScore:Math.max(
Number(state.bestScore)||0,
session.totalScore
),
totalXP:(Number(state.totalXP)||0)+session.xpEarned,
lastCompletedDate:session.dateKey
});
}

export function simulateFailedBrainSession(){
const state=readBrainState();
const now=Date.now();

const session={
id:`dev-failed-${now}`,
dateKey:new Date().toISOString().slice(0,10),
duration:180,
status:"completed",
startedAt:now-180000,
completedAt:now,
currentGameIndex:5,
games:[
"mental-math",
"number-memory",
"visual-memory",
"pattern-recognition",
"speed-reaction"
],
results:Array.from({length:5},(_,index)=>({
id:`dev-failed-result-${index}-${now}`,
gameType:"mental-math",
status:"completed",
score:100,
accuracy:30,
correctAnswers:3,
wrongAnswers:7,
totalAttempts:10,
reactionTime:3500,
xp:40
})),
totalScore:500,
averageAccuracy:30,
xpEarned:200,
rewarded:false
};

return writeBrainState({
...state,
dailySession:session,
history:[
session,
...(Array.isArray(state.history)?state.history:[])
].slice(0,365),
totalSessions:(Number(state.totalSessions)||0)+1,
bestScore:Math.max(
Number(state.bestScore)||0,
session.totalScore
),
totalXP:(Number(state.totalXP)||0)+session.xpEarned,
lastCompletedDate:session.dateKey
});
}

export function resetBrainTrainer(){
return clearBrainStorage();
}

export function clearAllDeveloperData(){
localStorage.clear();
return{};
}

export default{
getStorageSnapshot,
exportStorage,
importStorage,
addDeveloperXP,
resetDeveloperXP,
unlockAllAchievements,
resetAchievements,
simulatePerfectBrainSession,
simulateFailedBrainSession,
resetBrainTrainer,
clearAllDeveloperData
};