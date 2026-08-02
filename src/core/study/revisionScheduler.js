import{REVISION_DAYS}from"./constants";

const DAY=24*60*60*1000;

export const createRevisionSchedule=(topic,date=new Date())=>{
const base=new Date(date);

return REVISION_DAYS.map((day,index)=>({
id:`${topic.id}-${day}`,
topicId:topic.id,
topicName:topic.name,
level:index+1,
day,
dueAt:new Date(base.getTime()+day*DAY).toISOString(),
completed:false
}));
};

export const getDueRevisions=(
revisions=[],
date=new Date()
)=>{
const now=new Date(date).getTime();

return revisions.filter(revision=>
!revision.completed&&
new Date(revision.dueAt).getTime()<=now
);
};

export const completeRevision=(
revisions=[],
revisionId
)=>{
let nextRevision=null;

const updated=revisions.map(revision=>{

if(
String(revision.id)!==String(revisionId)
){
return revision;
}

const completed={
...revision,
completed:true,
completedAt:new Date().toISOString()
};

nextRevision=revisions.find(item=>
item.topicId===revision.topicId&&
item.level===revision.level+1
);

return completed;

});

return{
revisions:updated,
nextRevision
};
};

export default{
createRevisionSchedule,
getDueRevisions,
completeRevision
};