import {createContext,useContext,useEffect,useMemo,useState} from "react";
import studyData from "../data/studyData";
import missionGenerator from "../utils/missionGenerator";
import {getStageXP,getTopicCompletionXP,getDailyMissionXP,getStreakBonus} from "../utils/xpSystem";
import {getLevel} from "../utils/levelEngine";
import{scheduleRevision,completeRevision as advanceRevision}from"../utils/revisionEngine";
import {updateStreak,getCurrentStreak,getBestStreak} from "../utils/streak";
import studyEngine from "../core/study";
const StudyContext=createContext(null);
const getFirstIncompleteStage=topic=>
studyEngine.getFirstIncompleteStage(topic);
const STAGES=[
"learn",
"conceptCheck",
"level1",
"level2",
"level3",
"topicTest",
"pyq",
"revision"
];

const STAGE_XP={
learn:10,
conceptCheck:10,
level1:15,
level2:20,
level3:25,
topicTest:30,
pyq:25,
revision:15
};

const STAGE_ALIASES={
learn:"learn",
conceptcheck:"conceptCheck",
"concept-check":"conceptCheck",
conceptCheck:"conceptCheck",
level1:"level1",
"level-1":"level1",
level2:"level2",
"level-2":"level2",
level3:"level3",
"level-3":"level3",
topictest:"topicTest",
"topic-test":"topicTest",
topicTest:"topicTest",
pyq:"pyq",
revision:"revision"
};

const normalizeStage=stage=>{
const value=String(stage||"").trim();
return STAGE_ALIASES[value]||STAGE_ALIASES[value.toLowerCase()]||value;
};

const safeStageXP=stage=>{
try{
const reward=Number(getStageXP(stage));
if(Number.isFinite(reward)&&reward>0)return reward;
}catch{
return STAGE_XP[stage]||0;
}
return STAGE_XP[stage]||0;
};

const createEmptyStages=()=>STAGES.reduce((result,stage)=>{
result[stage]=false;
return result;
},{});

const migrateStages=(stages={},completed=false)=>{
const migrated=createEmptyStages();

Object.entries(stages||{}).forEach(([stage,value])=>{
const normalized=normalizeStage(stage);
if(STAGES.includes(normalized))migrated[normalized]=Boolean(value);
});

if(completed){
STAGES.forEach(stage=>{
migrated[stage]=true;
});
}

return migrated;
};



const createTopics=()=>{
const subjects=["quant","reasoning","english","gk"];

return subjects.flatMap(subject=>{
const subjectTopics=Array.isArray(studyData[subject])?studyData[subject]:[];

return subjectTopics.map((topic,index)=>{
const sourceId=String(topic.id??index+1);
const completed=Boolean(topic.completed);
const stages=migrateStages(topic.stages,completed);
const progress=completed?100:Math.round(STAGES.filter(stage=>stages[stage]).length/STAGES.length*100);

return{
...topic,
sourceId,
id:`${subject}-${sourceId}`,
name:topic.name||topic.topic||`Topic ${index+1}`,
subject,
weightage:Number(topic.weightage)||0,
trend:Number(topic.trend)||0,
priority:Number(topic.priority)||index+1,
difficulty:Number(topic.difficulty)||1,
accuracy:Number(topic.accuracy)||0,
estimatedHours:Number(topic.estimatedHours)||2,
revisionLevel:Number(topic.revisionLevel)||0,
progress,
completed,
unlocked:typeof topic.unlocked==="boolean"?topic.unlocked:index===0,
lastStudied:topic.lastStudied||null,
notes:Array.isArray(topic.notes)?topic.notes:[],
mistakes:Array.isArray(topic.mistakes)?topic.mistakes:[],
stages
};
});
});
};

const getTodayKey=()=>{
const today=new Date();
const year=today.getFullYear();
const month=String(today.getMonth()+1).padStart(2,"0");
const day=String(today.getDate()).padStart(2,"0");
return`${year}-${month}-${day}`;
};

const createDailyMissionPlan=(topics,date=getTodayKey())=>{
let generated=[];

try{
const result=missionGenerator(topics);
generated=Array.isArray(result)?result:[];
}catch{
generated=[];
}

return{
date,
topicIds:generated.map(item=>String(item?.topicId??item?.id??item?.topic?.id??"")).filter(Boolean),
completed:false,
rewardClaimed:false
};
};

const createDefaultState=()=>{
const topics=createTopics();

return{
name:"Abhi",
xp:0,
level:1,
streak:getCurrentStreak(),
bestStreak:getBestStreak(),
studyMinutes:0,
totalStudyMinutes:0,
topics,
revisions:[],
brainTrainerCompleted:false,
missionRewardClaimed:false,
dailyMissionPlan:createDailyMissionPlan(topics),
completedTopics:[],
progress:0,
activity:[]
};
};

const migrateState=saved=>{
const defaults=createDefaultState();
const source=saved&&typeof saved==="object"?saved:{};
const savedTopics=Array.isArray(source.topics)?source.topics:[];

const topics=defaults.topics.map(fresh=>{
const stored=savedTopics.find(topic=>
String(topic.id)===fresh.id||
(
topic.subject===fresh.subject&&
(
topic.name===fresh.name||
String(topic.sourceId||topic.id)===fresh.sourceId
)
)
);

if(!stored)return fresh;

const completed=Boolean(stored.completed);
const stages=migrateStages(stored.stages,completed);
const completedStages=STAGES.filter(stage=>stages[stage]).length;
const topicCompleted=completed||completedStages===STAGES.length;

return{
...fresh,
...stored,
id:fresh.id,
sourceId:fresh.sourceId,
subject:fresh.subject,
name:fresh.name,
completed:topicCompleted,
progress:topicCompleted?100:Math.round(completedStages/STAGES.length*100),
notes:Array.isArray(stored.notes)?stored.notes:[],
mistakes:Array.isArray(stored.mistakes)?stored.mistakes:[],
stages
};
});

const completedCount=topics.filter(topic=>topic.completed).length;
const progress=topics.length?Math.round(completedCount/topics.length*100):0;
const xp=Number(source.xp)||0;
const today=getTodayKey();
const storedPlan=source.dailyMissionPlan&&typeof source.dailyMissionPlan==="object"?source.dailyMissionPlan:null;
const storedTopicIds=Array.isArray(storedPlan?.topicIds)?storedPlan.topicIds.map(String):[];
const validTopicIds=storedTopicIds.filter(id=>topics.some(topic=>topic.id===id));
const isCurrentPlan=storedPlan?.date===today&&validTopicIds.length>0;
const dailyMissionPlan=isCurrentPlan
?{
...storedPlan,
date:today,
topicIds:validTopicIds,
completed:Boolean(storedPlan.completed),
rewardClaimed:Boolean(storedPlan.rewardClaimed||source.missionRewardClaimed)
}
:createDailyMissionPlan(topics,today);

return{
...defaults,
...source,
topics,
xp,
level:getLevel(xp),
progress,
revisions:Array.isArray(source.revisions)?source.revisions:[],
completedTopics:Array.isArray(source.completedTopics)
?source.completedTopics
:topics.filter(topic=>topic.completed).map(topic=>topic.id),
activity:Array.isArray(source.activity)?source.activity:[],
studyMinutes:isCurrentPlan?Number(source.studyMinutes)||0:0,
totalStudyMinutes:Number(source.totalStudyMinutes)||0,
brainTrainerCompleted:isCurrentPlan?Boolean(source.brainTrainerCompleted):false,
missionRewardClaimed:Boolean(dailyMissionPlan.rewardClaimed),
dailyMissionPlan,
streak:Number(source.streak)||getCurrentStreak(),
bestStreak:Number(source.bestStreak)||getBestStreak()
};
};

const addActivity=(activity,type,message)=>[
{
id: typeof crypto !== "undefined" && crypto.randomUUID
? crypto.randomUUID()
: `${Date.now()}-${Math.random()}`,
type,
message,
date:new Date().toISOString()
},
...(Array.isArray(activity)?activity:[])
].slice(0,30);



const getMissionItems=mission=>{
if(Array.isArray(mission))return mission;
if(mission&&Array.isArray(mission.missions))return mission.missions;
if(mission&&typeof mission==="object")return[mission];
return[];
};

const getMissionTopicId=item=>String(
item?.topicId??
item?.id??
item?.topic?.id??
""
);



export function StudyProvider({children}){
const [internalStudyState,setStudyState]=useState(()=>{
try{
const saved=JSON.parse(localStorage.getItem("studyState"));
return migrateState(saved);
}catch{
return createDefaultState();
}
});

useEffect(()=>{
localStorage.setItem("studyState",JSON.stringify(internalStudyState));
},[internalStudyState]);

useEffect(()=>{
const refreshDailyState=()=>{
const today=getTodayKey();

setStudyState(previous=>{
if(previous.dailyMissionPlan?.date===today)return previous;

return{
...previous,
studyMinutes:0,
brainTrainerCompleted:false,
missionRewardClaimed:false,
dailyMissionPlan:createDailyMissionPlan(previous.topics,today)
};
});
};

refreshDailyState();
const interval=setInterval(refreshDailyState,60000);
return()=>clearInterval(interval);
},[]);

const dailyMission=useMemo(()=>{
const topicIds=Array.isArray(internalStudyState.dailyMissionPlan?.topicIds)
?internalStudyState.dailyMissionPlan.topicIds
:[];

return topicIds.map(id=>internalStudyState.topics.find(topic=>topic.id===String(id)))
.filter(Boolean)
.map(topic=>({
id:topic.id,
topicId:topic.id,
title:topic.name,
name:topic.name,
subject:topic.subject,
xp:topic.xp||0,
progress:studyEngine.calculateTopicProgress(topic),
stages:{...topic.stages},
completed:Boolean(topic.completed)
}));
},[internalStudyState.dailyMissionPlan,internalStudyState.topics]);

const dueRevisions=useMemo(()=>{
try{
return studyEngine.getDueRevisions(
internalStudyState.revisions
);
}catch{
return internalStudyState.revisions.filter(
revision=>!revision.completed
);
}
},[internalStudyState.revisions]);

const mission=useMemo(()=>{
const generatedItems=getMissionItems(dailyMission);
const topic=generatedItems
.map(item=>internalStudyState.topics.find(topicItem=>topicItem.id===getMissionTopicId(item)))
.find(topicItem=>topicItem?.unlocked&&!topicItem.completed)||null;

return topic
?{
topicId:topic.id,
stage:getFirstIncompleteStage(topic)
}
:{
topicId:null,
stage:null
};
},[dailyMission,internalStudyState.topics]);

const studyState=useMemo(()=>({
...internalStudyState,
mission
}),[internalStudyState,mission]);

const dashboard=useMemo(()=>{
const topics=Array.isArray(internalStudyState.topics)?internalStudyState.topics:[];
const totalTopics=topics.length;
const completedTopics=topics.filter(topic=>topic.completed).length;
const totalNotes=topics.reduce((total,topic)=>total+(Array.isArray(topic.notes)?topic.notes.length:0),0);
const totalMistakes=topics.reduce((total,topic)=>total+(Array.isArray(topic.mistakes)?topic.mistakes.length:0),0);
const overallProgress=totalTopics?Math.round(completedTopics/totalTopics*100):0;

return{
xp:Number(internalStudyState.xp)||0,
level:Number(internalStudyState.level)||1,
streak:Number(internalStudyState.streak)||0,
bestStreak:Number(internalStudyState.bestStreak)||0,
studyMinutes:Number(internalStudyState.studyMinutes)||0,
totalStudyMinutes:Number(internalStudyState.totalStudyMinutes)||0,
totalTopics,
completedTopics,
remainingTopics:Math.max(0,totalTopics-completedTopics),
overallProgress,
progress:overallProgress,
revisionDue:dueRevisions,
revisionDueCount:dueRevisions.length,
notesCount:totalNotes,
mistakesCount:totalMistakes,
brainTrainerCompleted:Boolean(internalStudyState.brainTrainerCompleted),
missionCompleted:Boolean(internalStudyState.dailyMissionPlan?.completed)
};
},[internalStudyState,dueRevisions]);

const completeStage=(topicId,requestedStage)=>{
const stage=normalizeStage(requestedStage);

if(!STAGES.includes(stage))return;

setStudyState(previous=>{
const id=String(topicId);
const topic=previous.topics.find(item=>item.id===id);

if(!topic||!topic.unlocked||topic.stages?.[stage])return previous;

const stageIndex=STAGES.indexOf(stage);

if(stageIndex>0&&!topic.stages?.[STAGES[stageIndex-1]])return previous;

let stageReward=safeStageXP(stage);
let topicCompleted=false;
let completedTopic=null;

let topics=previous.topics.map(item=>{
if(item.id!==id)return item;

const stages={...migrateStages(item.stages,item.completed),[stage]:true};
const completedStages=STAGES.filter(stageName=>stages[stageName]).length;
topicCompleted=completedStages===STAGES.length;

const updatedTopic={
...item,
stages,
progress:Math.round(completedStages/STAGES.length*100),
completed:topicCompleted,
lastStudied:new Date().toISOString()
};

completedTopic=updatedTopic;
return updatedTopic;
});

let revisions=Array.isArray(previous.revisions)?previous.revisions:[];
let completedTopics=Array.isArray(previous.completedTopics)?previous.completedTopics:[];

if(topicCompleted&&completedTopic){
progress:studyEngine.calculateTtopics=studyEngine.unlockNextTopic(
topics,
completedTopic
);opicProgress(topic);
try{
stageReward+=Number(getTopicCompletionXP())||0;
}catch{
stageReward+=50;
}

if(!revisions.some(revision=>
String(revision.topicId)===completedTopic.id&&!revision.completed
)){
try{
revisions=[...revisions,scheduleRevision(completedTopic)];
}catch{
revisions=[
...revisions,
{
id:`revision-${completedTopic.id}-${Date.now()}`,
topicId:completedTopic.id,
topicName:completedTopic.name,
dueAt:new Date(Date.now()+24*60*60*1000).toISOString(),
completed:false
}
];
}
}

if(!completedTopics.includes(completedTopic.id)){
completedTopics=[...completedTopics,completedTopic.id];
}
}

let streakResult={
streak:Number(previous.streak)||0,
best:Number(previous.bestStreak)||0,
increased:false
};

try{
streakResult=updateStreak();
}catch{
streakResult={
streak:Number(previous.streak)||0,
best:Number(previous.bestStreak)||0,
increased:false
};
}

let streakReward=0;

if(streakResult.increased&&streakResult.streak>1){
try{
streakReward=Number(getStreakBonus())||0;
}catch{
streakReward=5;
}
}

const missionTopicIds=Array.isArray(previous.dailyMissionPlan?.topicIds)
?previous.dailyMissionPlan.topicIds.map(String)
:[];
const missionCompleted=missionTopicIds.length>0&&missionTopicIds.every(missionTopicId=>{
const updatedTopic=topics.find(topicItem=>topicItem.id===missionTopicId);
return Boolean(updatedTopic?.completed);
});

let missionReward=0;

if(missionCompleted&&!previous.dailyMissionPlan?.rewardClaimed){
try{
missionReward=Number(getDailyMissionXP())||0;
}catch{
missionReward=25;
}
}

const xp=(Number(previous.xp)||0)+stageReward+streakReward+missionReward;
const completedCount=topics.filter(item=>item.completed).length;
const progress=topics.length?Math.round(completedCount/topics.length*100):0;

return{
...previous,
topics,
revisions,
completedTopics,
xp,
level:getLevel(xp),
progress,
streak:Number(streakResult.streak)||Number(previous.streak)||0,
bestStreak:Number(streakResult.best)||Number(previous.bestStreak)||0,
missionRewardClaimed:Boolean(previous.dailyMissionPlan?.rewardClaimed||missionReward>0),
dailyMissionPlan:{
...(previous.dailyMissionPlan||createDailyMissionPlan(topics)),
completed:missionCompleted,
rewardClaimed:Boolean(previous.dailyMissionPlan?.rewardClaimed||missionReward>0)
},
activity:addActivity(
previous.activity,
topicCompleted?"topic-completed":"stage-completed",
topicCompleted
?`${topic.name} completed`
:`${topic.name}: ${stage.toUpperCase()} completed`
)
};
});
};

const addTopicNote=(topicId,text)=>{
const value=String(text||"").trim();
if(!value)return;

setStudyState(previous=>({
...previous,
topics:previous.topics.map(topic=>
topic.id===String(topicId)
?{
...topic,
notes:[
...(Array.isArray(topic.notes)?topic.notes:[]),
{
id:`note-${Date.now()}`,
text:value,
createdAt:new Date().toISOString()
}
]
}
:topic
),
activity:addActivity(previous.activity,"note-added","A topic note was added")
}));
};

const addTopicMistake=(topicId,text)=>{
const value=String(text||"").trim();
if(!value)return;

setStudyState(previous=>({
...previous,
topics:previous.topics.map(topic=>
topic.id===String(topicId)
?{
...topic,
mistakes:[
...(Array.isArray(topic.mistakes)?topic.mistakes:[]),
{
id:`mistake-${Date.now()}`,
text:value,
createdAt:new Date().toISOString()
}
]
}
:topic
),
activity:addActivity(previous.activity,"mistake-added","A mistake was added to the notebook")
}));
};

const addStudyMinutes=minutes=>{
const value=Math.max(0,Number(minutes)||0);
if(!value)return;

setStudyState(previous=>({
...previous,
studyMinutes:(Number(previous.studyMinutes)||0)+value,
totalStudyMinutes:(Number(previous.totalStudyMinutes)||0)+value,
activity:addActivity(previous.activity,"study-session",`${value} study minutes completed`)
}));
};

const completeBrainTrainer=()=>{
setStudyState(previous=>{
if(previous.brainTrainerCompleted)return previous;

return{
...previous,
brainTrainerCompleted:true,
activity:addActivity(previous.activity,"brain-trainer","Daily Brain Trainer completed")
};
});
};

const completeRevisionById=revisionId=>{
setStudyState(previous=>{
const id=String(revisionId);

const revision=previous.revisions.find(item=>
(String(item.id)===id||String(item.topicId)===id)&&!item.completed
);

if(!revision)return previous;

const result=advanceRevision(previous.revisions,revision.id);
const nextRevision=result.nextRevision;
const revisionReward=safeStageXP("revision");
const xp=(Number(previous.xp)||0)+revisionReward;

const topics=previous.topics.map(topic=>
topic.id===String(revision.topicId)
?{
...topic,
revisionLevel:nextRevision
?Number(nextRevision.level)
:5,
lastStudied:new Date().toISOString()
}
:topic
);

return{
...previous,
topics,
revisions:result.revisions,
xp,
level:getLevel(xp),
activity:addActivity(
previous.activity,
"revision-completed",
nextRevision
?`${revision.topicName||"Topic"} revision completed. Next revision scheduled.`
:`${revision.topicName||"Topic"} revision cycle completed.`
)
};
});
};

const getRevisionDue=()=>dueRevisions;

const resetDailyProgress=()=>{
setStudyState(previous=>({
...previous,
studyMinutes:0,
brainTrainerCompleted:false,
missionRewardClaimed:false,
dailyMissionPlan:createDailyMissionPlan(previous.topics)
}));
};

const resetSubjectProgress=subject=>{
setStudyState(previous=>{
const freshTopics=createTopics();

const topics=previous.topics.map(topic=>{
if(topic.subject!==subject)return topic;
return freshTopics.find(fresh=>fresh.id===topic.id)||topic;
});

const completedCount=topics.filter(topic=>topic.completed).length;
const progress=topics.length?Math.round(completedCount/topics.length*100):0;

return{
...previous,
topics,
progress,
completedTopics:previous.completedTopics.filter(id=>
!String(id).startsWith(`${subject}-`)
),
revisions:previous.revisions.filter(revision=>
!String(revision.topicId).startsWith(`${subject}-`)
),
activity:addActivity(
previous.activity,
"subject-reset",
`${String(subject).toUpperCase()} progress reset`
)
};
});
};

const resetAllProgress=()=>{
localStorage.removeItem("studyState");
localStorage.removeItem("studyStreak");
localStorage.removeItem("bestStreak");
localStorage.removeItem("lastStudyDate");
setStudyState(createDefaultState());
};

const contextValue=useMemo(()=>({
studyState,
dashboard,
stages:STAGES,
stageXP:STAGE_XP,
dailyMission,
dueRevisions,
getRevisionDue,
completeStage,
addTopicNote,
addTopicMistake,
addStudyMinutes,
completeBrainTrainer,
completeRevisionById,
resetDailyProgress,
resetSubjectProgress,
resetAllProgress,
setStudyState
}),[
studyState,
dashboard,
dailyMission,
dueRevisions
]);

return(
<StudyContext.Provider value={contextValue}>
{children}
</StudyContext.Provider>
);
}

export function useStudy(){
const context=useContext(StudyContext);

if(!context){
throw new Error("useStudy must be used inside StudyProvider");
}

return context;
}