const revisionDays=[1,3,7,15,30];

const createRevision=(topic,level=0)=>{
const next=new Date();
next.setDate(next.getDate()+revisionDays[Math.min(level,revisionDays.length-1)]);
return{
topicId:topic.id,
topic:topic.name,
subject:topic.subject,
level,
date:next.toISOString()
};
};

export default createRevision;