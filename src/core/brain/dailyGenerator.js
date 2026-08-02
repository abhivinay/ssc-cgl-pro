import{
getAvailableGames
}from"./gameEngine";

const DAILY_GAME_COUNT=5;

const hashText=value=>{
const text=String(value||"");
let hash=0;

for(let index=0;index<text.length;index+=1){
hash=(hash*31+text.charCodeAt(index))>>>0;
}

return hash;
};

const seededRandom=seed=>{
let value=seed>>>0;

return()=>{
value=(value*1664525+1013904223)>>>0;
return value/4294967296;
};
};

const shuffleWithSeed=(items,seed)=>{
const random=seededRandom(seed);
const result=[...items];

for(let index=result.length-1;index>0;index-=1){
const randomIndex=Math.floor(random()*(index+1));

[result[index],result[randomIndex]]=[
result[randomIndex],
result[index]
];
}

return result;
};

export function getDateKey(date=new Date()){
const value=new Date(date);

if(Number.isNaN(value.getTime())){
return getDateKey(new Date());
}

const year=value.getFullYear();
const month=String(value.getMonth()+1).padStart(2,"0");
const day=String(value.getDate()).padStart(2,"0");

return`${year}-${month}-${day}`;
}

export function generateDailyGames({
dateKey=getDateKey(),
count=DAILY_GAME_COUNT,
excludedGames=[]
}={}){
const available=getAvailableGames();

const excluded=new Set(
Array.isArray(excludedGames)
?excludedGames.map(String)
:[]
);

const filtered=available.filter(
game=>!excluded.has(game.type)
);

if(!filtered.length){
return[];
}

const safeCount=Math.max(
1,
Math.min(
Number(count)||DAILY_GAME_COUNT,
filtered.length
)
);

return shuffleWithSeed(
filtered,
hashText(dateKey)
)
.slice(0,safeCount)
.map(game=>game.type);
}

export function getDailyBrainPlan({
date=new Date(),
count=DAILY_GAME_COUNT
}={}){
const dateKey=getDateKey(date);

const games=generateDailyGames({
dateKey,
count
});

return{
dateKey,
games,
count:games.length,
estimatedDuration:games.length*60,
completed:false
};
}

export function includesGame(
plan,
gameType
){
return Boolean(
plan&&
Array.isArray(plan.games)&&
plan.games.includes(gameType)
);
}

export function getDefaultBrainPlan(){
return getDailyBrainPlan({
date:new Date(),
count:DAILY_GAME_COUNT
});
}

export{
DAILY_GAME_COUNT
};

export default{
getDateKey,
generateDailyGames,
getDailyBrainPlan,
includesGame,
getDefaultBrainPlan,
DAILY_GAME_COUNT
};