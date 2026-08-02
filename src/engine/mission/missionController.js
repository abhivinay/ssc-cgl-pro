import{
createMissionSession,
startMissionSession,
pauseMissionSession,
resumeMissionSession,
stopMissionSession,
completeMissionStage
}from"./missionSessionEngine";
import{
TIMER_PRESETS,
createTimer,
startTimer,
pauseTimer,
tick as tickTimer
}from"../timer/timerEngine";

export function createController({studyState,completeStage,preset="pomodoro"}){
const mission=studyState.mission;
if(!mission?.topicId)return null;
const topic=studyState.topics.find(item=>item.id===mission.topicId);
if(!topic)return null;
const minutes=TIMER_PRESETS[preset]?.minutes||TIMER_PRESETS.pomodoro.minutes;
let session=createMissionSession({topic,stage:mission.stage,preset});
let timer=createTimer(minutes);

return{
getSession:()=>session,
getTimer:()=>timer,
start(){
session=startMissionSession(session);
timer=startTimer(timer);
return{session,timer};
},
pause(){
session=pauseMissionSession(session);
timer=pauseTimer(timer);
return{session,timer};
},
resume(){
session=resumeMissionSession(session);
timer=startTimer(timer);
return{session,timer};
},
stop(){
session=stopMissionSession(session);
timer=pauseTimer(timer);
return{session,timer};
},
tick(){
timer=tickTimer(timer);
return{session,timer};
},
complete(){
if(session.completed)return{session,timer,alreadyCompleted:true};
const completed=completeMissionStage(session);
session=completed.session;
timer=pauseTimer(timer);
completeStage(topic.id,mission.stage);
return{...completed,timer};
}
};
}

export default createController;