import {useCallback,useEffect,useMemo,useState} from "react";
import {
completeRevisionTask,
getCompletedRevisions,
getDueRevisions,
getUpcomingRevisions,
scheduleNextRevision
} from "../core/revision/revisionEngine";
import {
addRevisionTask,
readRevisions,
updateRevisionTask
} from "../services/revisionStorage";
import {XP} from "../core/xp/xpEngine";
import {addXP} from "../services/xpStorage";

export default function useRevisions(){
const [tasks,setTasks]=useState(()=>readRevisions());

const refresh=useCallback(()=>{
setTasks(readRevisions());
},[]);

const completeTask=useCallback(task=>{
if(task.completed)return;

const latestTasks=readRevisions();
const latestTask=latestTasks.find(item=>item.id===task.id);

if(!latestTask||latestTask.completed)return;

const completedTask=completeRevisionTask(latestTask);
const nextTask=scheduleNextRevision(completedTask);

updateRevisionTask(completedTask);
addXP({
amount:XP.REVISION,
reason:`Revision completed: ${completedTask.title}`,
sourceId:`revision-${completedTask.id}`
});

const exists=readRevisions().some(item=>
item.topicId===nextTask.topicId&&
item.source===nextTask.source&&
!item.completed
);

if(!exists){
addRevisionTask(nextTask);
}

refresh();
},[refresh]);

useEffect(()=>{
const sync=()=>refresh();

window.addEventListener("focus",sync);
document.addEventListener("visibilitychange",sync);

return()=>{
window.removeEventListener("focus",sync);
document.removeEventListener("visibilitychange",sync);
};
},[refresh]);

const due=useMemo(()=>getDueRevisions(tasks),[tasks]);
const upcoming=useMemo(()=>getUpcomingRevisions(tasks),[tasks]);
const completed=useMemo(()=>getCompletedRevisions(tasks),[tasks]);

return{
tasks,
due,
upcoming,
completed,
refresh,
completeTask
};
}