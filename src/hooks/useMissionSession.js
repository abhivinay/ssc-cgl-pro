import{useCallback,useEffect,useRef,useState}from"react";
import{useStudy}from"../context/StudyContext";
import createController from"../engine/mission/missionController";

export default function useMissionSession(preset="pomodoro"){
const{studyState,completeStage}=useStudy();
const controllerRef=useRef(null);
const[session,setSession]=useState(null);
const[timer,setTimer]=useState(null);

useEffect(()=>{
const controller=createController({studyState,completeStage,preset});
controllerRef.current=controller;
setSession(controller?.getSession()||null);
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
available:Boolean(controllerRef.current)
};
}