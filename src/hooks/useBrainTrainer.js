import{useCallback,useEffect,useMemo,useState}from"react";
import{
createBrainSession,
completeCurrentGame,
getCurrentGameType,
isBrainSessionComplete,
markBrainSessionRewarded,
startGame
}from"../core/brain/sessionEngine";
import{
getDailyBrainPlan,
getDateKey
}from"../core/brain/dailyGenerator";
import{
completeDailyBrainSession,
isBrainCompletedForDate,
readBrainState,
saveDailyBrainSession
}from"../services/brainStorage";

export default function useBrainTrainer(){
const todayKey=getDateKey();

const [storageState,setStorageState]=useState(
()=>readBrainState()
);

const [session,setSession]=useState(()=>{
const saved=readBrainState().dailySession;

if(
saved&&
saved.dateKey===todayKey&&
!isBrainSessionComplete(saved)
){
return saved;
}

return null;
});

const dailyPlan=useMemo(
()=>getDailyBrainPlan({
date:new Date(),
count:5
}),
[todayKey]
);

const completedToday=useMemo(
()=>isBrainCompletedForDate(todayKey),
[todayKey,storageState.lastCompletedDate]
);

const currentGameType=useMemo(
()=>getCurrentGameType(session),
[session]
);

const refresh=useCallback(()=>{
const latest=readBrainState();

setStorageState(latest);

if(
latest.dailySession&&
latest.dailySession.dateKey===todayKey
){
setSession(latest.dailySession);
}
},[todayKey]);

const startDailySession=useCallback(()=>{
if(completedToday){
const completedSession=storageState.history.find(
item=>item.dateKey===todayKey
);

if(completedSession){
setSession(completedSession);
return completedSession;
}
}

const created=createBrainSession({
games:dailyPlan.games,
dateKey:dailyPlan.dateKey,
duration:dailyPlan.estimatedDuration
});

setSession(created);
saveDailyBrainSession(created);

return created;
},[
completedToday,
dailyPlan,
storageState.history,
todayKey
]);

const startCurrentGame=useCallback((
gameOptions={}
)=>{
setSession(previous=>{
if(!previous)return previous;

const gameType=
gameOptions.gameType||
getCurrentGameType(previous);

if(!gameType)return previous;

const updated=startGame(previous,{
gameType,
difficulty:gameOptions.difficulty,
duration:gameOptions.duration
});

saveDailyBrainSession(updated);

return updated;
});
},[]);

const finishCurrentGame=useCallback(result=>{
setSession(previous=>{
if(!previous)return previous;

const updated=completeCurrentGame(
previous,
result
);

saveDailyBrainSession(updated);

if(isBrainSessionComplete(updated)){
const savedState=
completeDailyBrainSession(updated);

setStorageState(savedState);
}

return updated;
});
},[]);

const markRewarded=useCallback(()=>{
setSession(previous=>{
if(!previous||previous.rewarded){
return previous;
}

const updated=markBrainSessionRewarded(
previous
);

saveDailyBrainSession(updated);

if(isBrainSessionComplete(updated)){
const savedState=
completeDailyBrainSession(updated);

setStorageState(savedState);
}

return updated;
});
},[]);

const resetCurrentSession=useCallback(()=>{
setSession(null);

const latest=readBrainState();

const updated={
...latest,
dailySession:null
};

setStorageState(
saveDailyBrainSession(null)
);

return updated;
},[]);

useEffect(()=>{
const sync=()=>refresh();

window.addEventListener("focus",sync);
document.addEventListener(
"visibilitychange",
sync
);

return()=>{
window.removeEventListener(
"focus",
sync
);

document.removeEventListener(
"visibilitychange",
sync
);
};
},[refresh]);

return{
dailyPlan,
session,
currentGameType,
completedToday,
isSessionActive:Boolean(
session&&session.status==="active"
),
isSessionComplete:isBrainSessionComplete(
session
),
totalSessions:storageState.totalSessions,
bestScore:storageState.bestScore,
brainXP:storageState.totalXP,
history:storageState.history,
startDailySession,
startCurrentGame,
finishCurrentGame,
markRewarded,
resetCurrentSession,
refresh
};
}