import{useCallback,useEffect,useEffectEvent,useRef,useState}from"react";
import{useStudy}from"../context/StudyContext";
import createController from"../engine/mission/missionController";

export default function useMissionSession(preset="pomodoro"){
const{studyState,completeStage}=useStudy();
const controllerRef=useRef(null);
const[session,setSession]=useState(null);
const[timer,setTimer]=useState(null);
const[available,setAvailable]=useState(false);

// Read current progress when the mission identity changes, without resetting
// an active timer for unrelated notes, XP or activity updates.
const createCurrentController=useEffectEvent(()=>createController({studyState,completeStage,preset}));

useEffect(()=>{
const controller=createCurrentController();
controllerRef.current=controller;
// eslint-disable-next-line react-hooks/set-state-in-effect -- Publish the newly created external controller snapshot.
setSession(controller?.getSession()||null);
setAvailable(Boolean(controller));
setTimer(controller?.getTimer()||null);
return()=>{
controllerRef.current=null;
};
},[studyState.mission?.topicId,studyState.mission?.stage,preset]);

useEffect(()=>{
if(!timer?.running)return;
const interval=setInterval(()=>{
const result=controllerRef.current?.tick();
if(!result)return;
setSession(result.session);
setTimer(result.timer);
},1000);
return()=>clearInterval(interval);
},[timer?.running]);

const runAction=useCallback(action=>{
const result=controllerRef.current?.[action]?.();
if(!result)return null;
setSession(result.session||controllerRef.current.getSession());
setTimer(result.timer||controllerRef.current.getTimer());
return result;
},[]);

const start=useCallback(()=>runAction("start"),[runAction]);
const pause=useCallback(()=>runAction("pause"),[runAction]);
const resume=useCallback(()=>runAction("resume"),[runAction]);
const stop=useCallback(()=>runAction("stop"),[runAction]);
const complete=useCallback(()=>runAction("complete"),[runAction]);

return{
session,
timer,
start,
pause,
resume,
stop,
complete,
available
};
}