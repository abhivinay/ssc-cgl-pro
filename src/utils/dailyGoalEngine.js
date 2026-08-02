const dailyGoalEngine=({
studyMinutes=0,
goalMinutes=540,
missionsCompleted=0,
targetMissions=4
})=>{
const study=Math.min(100,Math.round((studyMinutes/goalMinutes)*100));
const mission=Math.min(100,Math.round((missionsCompleted/targetMissions)*100));
return{
studyProgress:study,
missionProgress:mission,
completed:study===100&&mission===100
};
};
export default dailyGoalEngine;