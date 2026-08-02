const STORAGE_KEY="ssc-brain-trainer";

const DEFAULT_STATE={
dailySession:null,
history:[],
totalSessions:0,
bestScore:0,
totalXP:0,
lastCompletedDate:null
};

const createDefaultState=()=>({
...DEFAULT_STATE,
history:[]
});

const isValidObject=value=>
value&&typeof value==="object"&&!Array.isArray(value);

const normalizeState=value=>{
if(!isValidObject(value)){
return createDefaultState();
}

const history=Array.isArray(value.history)
?value.history.filter(item=>isValidObject(item))
:[];

return{
dailySession:isValidObject(value.dailySession)
?value.dailySession
:null,
history,
totalSessions:Math.max(
0,
Number(value.totalSessions)||history.length
),
bestScore:Math.max(
0,
Number(value.bestScore)||0
),
totalXP:Math.max(
0,
Number(value.totalXP)||0
),
lastCompletedDate:value.lastCompletedDate
?String(value.lastCompletedDate)
:null
};
};

export function readBrainState(){
try{
const raw=localStorage.getItem(STORAGE_KEY);

if(!raw){
return createDefaultState();
}

return normalizeState(JSON.parse(raw));
}catch(error){
console.error(
"Failed to read Brain Trainer storage:",
error
);

localStorage.removeItem(STORAGE_KEY);

return createDefaultState();
}
}

export function writeBrainState(state){
const normalized=normalizeState(state);

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(normalized)
);

return normalized;
}

export function saveDailyBrainSession(session){
const state=readBrainState();

return writeBrainState({
...state,
dailySession:isValidObject(session)
?session
:null
});
}

export function readDailyBrainSession(){
return readBrainState().dailySession;
}

export function completeDailyBrainSession(session){
if(!isValidObject(session)){
return readBrainState();
}

const state=readBrainState();

const alreadySaved=state.history.some(
item=>item.id===session.id
);

if(alreadySaved){
return state;
}

const score=Math.max(
0,
Number(session.totalScore)||0
);

const xp=Math.max(
0,
Number(session.xpEarned)||0
);

const completedDate=
session.dateKey||
session.completedAt||
new Date().toISOString();

const historyEntry={
...session,
completedAt:
session.completedAt||
Date.now()
};

return writeBrainState({
...state,
dailySession:historyEntry,
history:[
historyEntry,
...state.history
].slice(0,365),
totalSessions:state.totalSessions+1,
bestScore:Math.max(
state.bestScore,
score
),
totalXP:state.totalXP+xp,
lastCompletedDate:String(completedDate)
});
}

export function getBrainHistory(limit){
const history=readBrainState().history;

if(typeof limit!=="number"){
return history;
}

return history.slice(
0,
Math.max(0,Math.floor(limit))
);
}

export function isBrainCompletedForDate(dateKey){
const state=readBrainState();

return state.lastCompletedDate===String(dateKey);
}

export function clearBrainStorage(){
localStorage.removeItem(STORAGE_KEY);

return createDefaultState();
}

export default{
readBrainState,
writeBrainState,
saveDailyBrainSession,
readDailyBrainSession,
completeDailyBrainSession,
getBrainHistory,
isBrainCompletedForDate,
clearBrainStorage
};