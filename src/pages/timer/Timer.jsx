import {useEffect,useRef,useState} from "react";
import TimerCard from "../../components/timer/TimerCard";
import {
TIMER_PRESETS,
createTimer,
changePreset,
startTimer,
pauseTimer,
resetTimer,
tick
} from "../../engine/timer/timerEngine";
import {completeStudyActivity} from "../../engine/study/studyEngine";
import FocusOverlay from "../../components/focus/FocusOverlay";

export default function Timer(){
const [selectedPreset,setSelectedPreset]=useState("pomodoro");
const [timer,setTimer]=useState(()=>createTimer());
const [message,setMessage]=useState("");
const [focusMode,setFocusMode]=useState(false);
const completionHandledRef=useRef(false);
const messageTimeoutRef=useRef(null);

useEffect(()=>{
if(!timer.running)return;
const interval=setInterval(()=>{
setTimer(previous=>tick(previous));
},1000);
return()=>clearInterval(interval);
},[timer.running]);

useEffect(()=>{
if(!timer.completed||completionHandledRef.current)return;
completionHandledRef.current=true;
completeStudyActivity({
type:"focusSession",
title:`${TIMER_PRESETS[selectedPreset].label} Completed`,
duration:TIMER_PRESETS[selectedPreset].minutes
});
setFocusMode(false);
setMessage("🎉 Session completed! XP awarded.");
if(messageTimeoutRef.current)clearTimeout(messageTimeoutRef.current);
messageTimeoutRef.current=setTimeout(()=>{
setMessage("");
messageTimeoutRef.current=null;
},3000);
},[timer.completed,selectedPreset]);

useEffect(()=>{
return()=>{
if(messageTimeoutRef.current)clearTimeout(messageTimeoutRef.current);
};
},[]);

const handlePresetChange=preset=>{
completionHandledRef.current=false;
setMessage("");
setFocusMode(false);
setSelectedPreset(preset);
setTimer(changePreset(TIMER_PRESETS[preset].minutes));
};

const handleStart=()=>{
if(timer.completed){
completionHandledRef.current=false;
setTimer(startTimer(resetTimer(timer)));
}else{
setTimer(previous=>startTimer(previous));
}
setFocusMode(true);
setMessage("");
};

const handlePause=()=>{
setTimer(previous=>pauseTimer(previous));
};

const handleReset=()=>{
completionHandledRef.current=false;
setFocusMode(false);
setMessage("");
setTimer(previous=>resetTimer(previous));
};

const handleStop=()=>{
completionHandledRef.current=false;
setFocusMode(false);
setMessage("");
setTimer(previous=>resetTimer(previous));
};

return(
<>
<div className="mx-auto max-w-7xl pb-10">
<div className="mb-8">
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">Focus Mode</p>
<h1 className="mt-2 text-3xl font-bold text-white">Study Timer</h1>
<p className="mt-2 text-zinc-400">Stay focused with Pomodoro and Deep Focus sessions.</p>
</div>
<div className="grid gap-6 lg:grid-cols-[420px_1fr]">
<TimerCard
timer={timer}
selectedPreset={selectedPreset}
onPresetChange={handlePresetChange}
onStart={handleStart}
onPause={handlePause}
onReset={handleReset}
/>
<section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<h2 className="text-xl font-bold text-white">Session Information</h2>
<p className="mt-2 text-zinc-400">Complete focus sessions to gain XP and maintain your streak.</p>
<div className="mt-8 grid gap-4 sm:grid-cols-2">
<div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
<p className="text-sm text-zinc-500">Current Mode</p>
<p className="mt-2 text-2xl font-bold text-cyan-400">{TIMER_PRESETS[selectedPreset].label}</p>
</div>
<div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
<p className="text-sm text-zinc-500">Duration</p>
<p className="mt-2 text-2xl font-bold text-white">{TIMER_PRESETS[selectedPreset].minutes} Minutes</p>
</div>
<div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
<p className="text-sm text-zinc-500">Status</p>
<p className={`mt-2 text-xl font-bold ${timer.completed?"text-emerald-400":timer.running?"text-cyan-400":"text-zinc-300"}`}>
{timer.completed?"Completed":timer.running?"Running":"Idle"}
</p>
</div>
<div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
<p className="text-sm text-zinc-500">Today's Goal</p>
<p className="mt-2 text-xl font-bold text-white">4 Focus Sessions</p>
</div>
</div>
{message&&(
<div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center font-semibold text-emerald-400">
{message}
</div>
)}
</section>
</div>
</div>
<FocusOverlay
open={focusMode}
timer={timer}
task={`${TIMER_PRESETS[selectedPreset].label} Session`}
subject="SSC CGL"
onPause={handlePause}
onResume={()=>setTimer(previous=>startTimer(previous))}
onStop={handleStop}
/>
</>
);
}