import {useEffect,useRef,useState} from "react";
import ExtractionQueue from "../services/extractionQueue";

export default function useExtractionQueue(initialItems=[]){
const queueRef=useRef(new ExtractionQueue([]));
const [,setVersion]=useState(0);

function refresh(){
setVersion(version=>version+1);
}

useEffect(()=>{
queueRef.current.syncItems(initialItems);
refresh();
},[initialItems]);

const queue=queueRef.current;

function start(){
queue.start();
refresh();
}

function pause(){
queue.pause();
refresh();
}

function resume(){
queue.resume();
refresh();
}

function stop(){
queue.stop();
refresh();
}

function getNextPending(){
const item=queue.getNextPending();
refresh();
return item;
}

function markExtracting(id){
queue.markExtracting(id);
refresh();
}

function markCompleted(id){
queue.markCompleted(id);
refresh();
}

function markFailed(id){
queue.markFailed(id);
refresh();
}

function retryFailed(){
queue.retryFailed();
refresh();
}

return{
queue,
stats:queue.getStats(),
current:queue.getCurrent(),
isRunning:queue.isRunning(),
hasPending:queue.hasPending(),
start,
pause,
resume,
stop,
getNextPending,
markExtracting,
markCompleted,
markFailed,
retryFailed
};
}