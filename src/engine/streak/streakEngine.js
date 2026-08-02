const DAY_MS=24*60*60*1000;

function getDateKey(date=new Date()){
const year=date.getFullYear();
const month=String(date.getMonth()+1).padStart(2,"0");
const day=String(date.getDate()).padStart(2,"0");
return`${year}-${month}-${day}`;
}

function getDayDifference(previousDate,currentDate=new Date()){
if(!previousDate)return null;
const previous=new Date(`${previousDate}T00:00:00`);
const current=new Date(`${getDateKey(currentDate)}T00:00:00`);
return Math.round((current-previous)/DAY_MS);
}

function updateStreak(streakData={},currentDate=new Date()){
const today=getDateKey(currentDate);
const currentStreak=Number(streakData.currentStreak)||0;
const bestStreak=Number(streakData.bestStreak)||0;
const lastStudyDate=streakData.lastStudyDate||null;
const difference=getDayDifference(lastStudyDate,currentDate);

if(lastStudyDate===today){
return{
currentStreak,
bestStreak,
lastStudyDate,
updated:false,
status:"already-completed"
};
}

const nextStreak=difference===1?currentStreak+1:1;

return{
currentStreak:nextStreak,
bestStreak:Math.max(bestStreak,nextStreak),
lastStudyDate:today,
updated:true,
status:difference===1?"continued":"started"
};
}

function resetStreak(){
return{
currentStreak:0,
bestStreak:0,
lastStudyDate:null
};
}

function isStreakActive(streakData={},currentDate=new Date()){
const difference=getDayDifference(streakData.lastStudyDate,currentDate);
return difference===0||difference===1;
}

function getStreakStatus(streakData={},currentDate=new Date()){
const difference=getDayDifference(streakData.lastStudyDate,currentDate);

if(difference===null)return"not-started";
if(difference===0)return"completed-today";
if(difference===1)return"at-risk";
return"broken";
}

export{
getDateKey,
getDayDifference,
updateStreak,
resetStreak,
isStreakActive,
getStreakStatus
};