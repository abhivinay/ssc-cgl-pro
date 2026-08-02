import {analyticsManager} from "../../services";
import {addXP,getReward,normalize} from "../xp/xpEngine";
import {updateStreak} from "../streak/streakEngine";

const DEFAULT_ANALYTICS={
totalXP:0,
streak:{
currentStreak:0,
bestStreak:0,
lastStudyDate:null
},
revisionQueue:[],
mistakes:[],
activities:[],
stats:{
learned:0,
practiced:0,
tests:0,
pyqs:0,
mocks:0,
focusSessions:0,
revisions:0
}
};

const STAT_MAP={
learn:"learned",
practice:"practiced",
topicTest:"tests",
pyq:"pyqs",
mockTest:"mocks",
focusSession:"focusSessions",
revision:"revisions"
};

function getAnalytics(){
return{
...DEFAULT_ANALYTICS,
...analyticsManager.get()
};
}

function saveAnalytics(data){
analyticsManager.save(data);
return data;
}

function addActivity(data,activity){
const activities=[
{
id:crypto.randomUUID?.()??Date.now().toString(),
createdAt:new Date().toISOString(),
...activity
},
...(data.activities||[])
];
return activities.slice(0,200);
}

export function completeStudyActivity({
type,
title,
subject=null,
topic=null,
duration=0,
score=null,
mistakes=[],
revisionDate=null
}){
const analytics=getAnalytics();

const xpResult=addXP(analytics.totalXP||0,type);
const streakResult=updateStreak(analytics.streak||{});

const stats={
...(analytics.stats||DEFAULT_ANALYTICS.stats)
};

if(STAT_MAP[type]){
stats[STAT_MAP[type]]++;
}

const revisionQueue=[...(analytics.revisionQueue||[])];

if(revisionDate&&topic){
revisionQueue.push({
id:crypto.randomUUID?.()??Date.now().toString(),
topic,
subject,
date:revisionDate,
completed:false
});
}

const updatedMistakes=[
...(analytics.mistakes||[]),
...mistakes
];

const updated={
...analytics,
totalXP:xpResult.totalXP,
level:normalize(xpResult.totalXP).level,
streak:streakResult,
stats,
revisionQueue,
mistakes:updatedMistakes,
activities:addActivity(analytics,{
type,
title,
subject,
topic,
duration,
score,
xp:getReward(type)
})
};

saveAnalytics(updated);

return{
success:true,
xp:xpResult,
streak:streakResult,
analytics:updated
};
}

export function getStudyAnalytics(){
return getAnalytics();
}

export function resetStudyEngine(){
saveAnalytics(DEFAULT_ANALYTICS);
return DEFAULT_ANALYTICS;
}