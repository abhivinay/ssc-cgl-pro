const STREAK_KEY="studyStreak";
const BEST_STREAK_KEY="bestStreak";
const LAST_STUDY_KEY="lastStudyDate";
const getDateKey=date=>{
const value=new Date(date);
return `${value.getFullYear()}-${String(value.getMonth()+1).padStart(2,"0")}-${String(value.getDate()).padStart(2,"0")}`;
};
const getDayDifference=(from,to)=>{
const start=new Date(`${from}T00:00:00`);
const end=new Date(`${to}T00:00:00`);
return Math.round((end-start)/86400000);
};
export const getCurrentStreak=()=>Number(localStorage.getItem(STREAK_KEY))||0;
export const getBestStreak=()=>Number(localStorage.getItem(BEST_STREAK_KEY))||0;
export const getLastStudyDate=()=>localStorage.getItem(LAST_STUDY_KEY)||"";
export const updateStreak=()=>{
const today=getDateKey(new Date());
const lastStudyDate=getLastStudyDate();
let streak=getCurrentStreak();
if(lastStudyDate===today){
return{
streak,
best:getBestStreak(),
increased:false
};
}
if(!lastStudyDate){
streak=1;
}else{
const difference=getDayDifference(lastStudyDate,today);
streak=difference===1?streak+1:1;
}
const best=Math.max(streak,getBestStreak());
localStorage.setItem(STREAK_KEY,String(streak));
localStorage.setItem(BEST_STREAK_KEY,String(best));
localStorage.setItem(LAST_STUDY_KEY,today);
return{
streak,
best,
increased:true
};
};
export const resetStreak=()=>{
localStorage.setItem(STREAK_KEY,"0");
localStorage.removeItem(LAST_STUDY_KEY);
};
export default{
getCurrentStreak,
getBestStreak,
getLastStudyDate,
updateStreak,
resetStreak
};