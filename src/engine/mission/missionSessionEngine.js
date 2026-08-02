const createTimestamp=()=>new Date().toISOString();

export function createMissionSession({topic,stage,preset="pomodoro"}){
return{
id:`mission-session-${topic.id}-${stage}`,
topicId:topic.id,
topicName:topic.name,
subject:topic.subject,
stage,
preset,
status:"idle",
startedAt:null,
pausedAt:null,
stoppedAt:null,
completedAt:null,
completed:false
};
}

export function startMissionSession(session){
if(!session||session.completed)return session;
return{
...session,
status:"running",
startedAt:session.startedAt||createTimestamp(),
pausedAt:null,
stoppedAt:null
};
}

export function pauseMissionSession(session){
if(!session||session.status!=="running")return session;
return{
...session,
status:"paused",
pausedAt:createTimestamp()
};
}

export function resumeMissionSession(session){
if(!session||session.completed)return session;
return{
...session,
status:"running",
pausedAt:null,
stoppedAt:null
};
}

export function stopMissionSession(session){
if(!session||session.completed)return session;
return{
...session,
status:"stopped",
stoppedAt:createTimestamp()
};
}

export function completeMissionStage(session){
if(!session||session.completed)return{session,completed:false};
const completedSession={
...session,
status:"completed",
completed:true,
completedAt:createTimestamp(),
pausedAt:null,
stoppedAt:null
};
return{
session:completedSession,
completed:true,
topicId:completedSession.topicId,
stage:completedSession.stage
};
}

export default{
createMissionSession,
startMissionSession,
pauseMissionSession,
resumeMissionSession,
stopMissionSession,
completeMissionStage
};