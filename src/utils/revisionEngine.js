import{
REVISION_DAYS,
MAX_REVISION_LEVEL
}from "../config/revisionConfig";

const createId=()=>
typeof crypto!=="undefined"&&crypto.randomUUID
?crypto.randomUUID()
:`revision-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

export function scheduleRevision(topic,level=0){
const revisionLevel=Math.max(
0,
Math.min(level,MAX_REVISION_LEVEL)
);
const now=new Date();
const dueAt=new Date(now);

dueAt.setDate(
dueAt.getDate()+REVISION_DAYS[revisionLevel]
);

return{
id:createId(),
topicId:topic.id,
topicName:topic.name,
subject:topic.subject,
level:revisionLevel,
dueAt:dueAt.toISOString(),
createdAt:now.toISOString(),
completed:false,
completedAt:null
};
}

export function getDueRevisions(revisions=[]){
const now=Date.now();

return revisions.filter(revision=>
!revision.completed &&
new Date(revision.dueAt).getTime()<=now
);
}

export function completeRevision(revisions=[],revisionId){
let nextRevision=null;

const updated=revisions.map(revision=>{
if(revision.id!==revisionId)return revision;

const completedRevision={
...revision,
completed:true,
completedAt:new Date().toISOString()
};

if(revision.level<MAX_REVISION_LEVEL){
nextRevision=scheduleRevision({
id:revision.topicId,
name:revision.topicName,
subject:revision.subject
},revision.level+1);
}

return completedRevision;
});

return{
revisions:nextRevision?[...updated,nextRevision]:updated,
nextRevision
};
}

export function getRevisionHistory(revisions=[],topicId){
return revisions
.filter(item=>item.topicId===topicId)
.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
}

export function getNextRevision(revisions=[],topicId){
return revisions
.filter(item=>
item.topicId===topicId &&
!item.completed
)
.sort(
(a,b)=>
new Date(a.dueAt)-new Date(b.dueAt)
)[0]||null;
}

export default{
scheduleRevision,
getDueRevisions,
completeRevision,
getRevisionHistory,
getNextRevision
};