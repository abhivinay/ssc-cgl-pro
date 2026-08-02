const STORAGE_KEY="ssc-sentinel-xp";

const DEFAULT_XP_STATE={
totalXP:0,
history:[]
};

export function readXP(){
try{
const data=localStorage.getItem(STORAGE_KEY);

if(!data)return DEFAULT_XP_STATE;

const parsed=JSON.parse(data);

if(
!parsed||
typeof parsed!=="object"||
typeof parsed.totalXP!=="number"||
!Array.isArray(parsed.history)
){
localStorage.removeItem(STORAGE_KEY);
return DEFAULT_XP_STATE;
}

return parsed;
}catch(error){
console.error("Failed to read XP storage:",error);
localStorage.removeItem(STORAGE_KEY);
return DEFAULT_XP_STATE;
}
}

export function writeXP(state){
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(state)
);

return state;
}

export function addXP({
amount,
reason,
sourceId=null
}){
const state=readXP();

const duplicate=sourceId&&state.history.some(
item=>item.sourceId===sourceId
);

if(duplicate)return state;

const entry={
id:crypto.randomUUID(),
amount,
reason,
sourceId,
createdAt:Date.now()
};

const updated={
totalXP:state.totalXP+amount,
history:[entry,...state.history]
};

writeXP(updated);
return updated;
}

export function clearXP(){
localStorage.removeItem(STORAGE_KEY);
return DEFAULT_XP_STATE;
}

export function getXPHistory(limit){
const history=readXP().history;

return typeof limit==="number"
?history.slice(0,limit)
:history;
}

export default{
readXP,
writeXP,
addXP,
clearXP,
getXPHistory
};