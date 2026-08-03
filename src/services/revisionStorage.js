const STORAGE_KEY="ssc-sentinel-revisions";

export function readRevisions(){
try{
const data=localStorage.getItem(STORAGE_KEY);
if(!data)return[];
const parsed=JSON.parse(data);
if(!Array.isArray(parsed)){
console.warn("Invalid revision storage. Resetting...");
localStorage.removeItem(STORAGE_KEY);
return[];
}
return parsed.filter(item=>
item&&
typeof item==="object"&&
typeof item.id==="string"
);
}catch(error){
console.error("Failed to read revision storage:",error);
localStorage.removeItem(STORAGE_KEY);
return[];
}
}

export function writeRevisions(tasks){
localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));
return tasks;
}

export function addRevisionTask(task){
const tasks=readRevisions();
const updated=[task,...tasks];
writeRevisions(updated);
return updated;
}

export function addRevisionTasks(newTasks){
if(!Array.isArray(newTasks)||!newTasks.length)return readRevisions();
const tasks=readRevisions();
const uniqueTasks=newTasks.filter(newTask=>
!tasks.some(existingTask=>
existingTask.topicId===newTask.topicId&&
existingTask.source===newTask.source&&
!existingTask.completed
)
);
if(!uniqueTasks.length)return tasks;
const updated=[...uniqueTasks,...tasks];
writeRevisions(updated);
return updated;
}

export function updateRevisionTask(updatedTask){
const tasks=readRevisions();
const updated=tasks.map(task=>
task.id===updatedTask.id?updatedTask:task
);
writeRevisions(updated);
return updated;
}

export function removeRevisionTask(taskId){
const tasks=readRevisions().filter(task=>task.id!==taskId);
writeRevisions(tasks);
return tasks;
}

export function clearRevisions(){
localStorage.removeItem(STORAGE_KEY);
}

export function getRevisionTaskById(taskId){
return readRevisions().find(task=>task.id===taskId)||null;
}

export default{
readRevisions,
writeRevisions,
addRevisionTask,
addRevisionTasks,
updateRevisionTask,
removeRevisionTask,
clearRevisions,
getRevisionTaskById
};