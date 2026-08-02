import {useEffect,useState} from "react";
export default function useProgress(subjectData=[]){
const [topics,setTopics]=useState(()=>{
const saved=localStorage.getItem("studyProgress");
return saved?JSON.parse(saved):subjectData;
});
useEffect(()=>{
localStorage.setItem("studyProgress",JSON.stringify(topics));
},[topics]);
const completeStage=(topicId,stage)=>{
setTopics(prev=>{
const updated=[...prev];
const index=updated.findIndex(t=>t.id===topicId);
if(index===-1)return prev;
updated[index]={
...updated[index],
stages:{
...updated[index].stages,
[stage]:true
}
};
const s=updated[index].stages;
if(s.learn&&s.practice&&s.pyq&&s.revision){
updated[index].completed=true;
if(updated[index+1]){
updated[index+1].unlocked=true;
}
}
return updated;
});
};
return{
topics,
setTopics,
completeStage
};
}