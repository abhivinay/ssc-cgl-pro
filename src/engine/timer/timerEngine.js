export const TIMER_PRESETS={
pomodoro:{label:"Pomodoro",minutes:25},
focus:{label:"Deep Focus",minutes:50},
marathon:{label:"Marathon",minutes:90},
shortBreak:{label:"Short Break",minutes:5},
longBreak:{label:"Long Break",minutes:15}
};

export function createTimer(minutes=TIMER_PRESETS.pomodoro.minutes){
return{
duration:minutes*60,
remaining:minutes*60,
running:false,
completed:false
};
}

export function formatTime(seconds){
const mins=Math.floor(seconds/60);
const secs=seconds%60;
return`${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}

export function tick(timer){
if(!timer.running||timer.completed)return timer;

if(timer.remaining<=1){
return{
...timer,
remaining:0,
running:false,
completed:true
};
}

return{
...timer,
remaining:timer.remaining-1
};
}

export function startTimer(timer){
return{...timer,running:true};
}

export function pauseTimer(timer){
return{...timer,running:false};
}

export function resetTimer(timer){
return{
...timer,
remaining:timer.duration,
running:false,
completed:false
};
}

export function changePreset(minutes){
return createTimer(minutes);
}

export function getProgress(timer){
if(!timer.duration)return 0;
return Number((((timer.duration-timer.remaining)/timer.duration)*100).toFixed(2));
}