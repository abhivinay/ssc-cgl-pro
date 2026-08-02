const clamp=value=>Math.max(0,Math.min(100,Number(value)||0));

const normalizeSubject=subject=>{
const value=String(subject||"").toLowerCase();
if(value==="gk"||value==="ga")return"General Awareness";
if(value==="quant")return"Quant";
if(value==="reasoning")return"Reasoning";
if(value==="english")return"English";
return value||"Unknown";
};

const getTopics=report=>Array.isArray(report?.topics)?report.topics:[];

const getRevisions=report=>{
if(Array.isArray(report?.dueRevisions))return report.dueRevisions;
if(Array.isArray(report?.revisions)){
return report.revisions.filter(item=>!item.completed);
}
return Array.from({length:Number(report?.revisions)||0});
};

const getMistakes=report=>{
const direct=Array.isArray(report?.mistakes)?report.mistakes:[];

const topicMistakes=getTopics(report).flatMap(topic=>
(topic.mistakes||[]).map(mistake=>({
...mistake,
topicId:topic.id,
topicName:topic.name,
subject:topic.subject
}))
);

return direct.length?direct:topicMistakes;
};

const getWeakSubject=report=>{
const topics=getTopics(report);
if(!topics.length)return null;

const grouped=topics.reduce((result,topic)=>{
const subject=normalizeSubject(topic.subject);

if(!result[subject]){
result[subject]={
subject,
total:0,
progress:0,
mistakes:0,
frequent:0,
accuracy:0,
accuracyCount:0
};
}

result[subject].total+=1;
result[subject].progress+=Number(topic.progress)||0;
result[subject].mistakes+=(topic.mistakes||[]).length;
result[subject].frequent+=(topic.mistakes||[]).filter(item=>item.frequent).length;

if(Number.isFinite(Number(topic.accuracy))&&Number(topic.accuracy)>0){
result[subject].accuracy+=Number(topic.accuracy);
result[subject].accuracyCount+=1;
}

return result;
},{});

return Object.values(grouped).map(item=>{
const averageProgress=item.total?item.progress/item.total:0;
const averageAccuracy=item.accuracyCount
?item.accuracy/item.accuracyCount
:100;

const weaknessScore=
(100-averageProgress)*0.45+
(100-averageAccuracy)*0.25+
item.mistakes*4+
item.frequent*8;

return{
...item,
averageProgress:Math.round(averageProgress),
averageAccuracy:Math.round(averageAccuracy),
weaknessScore
};
}).sort((a,b)=>b.weaknessScore-a.weaknessScore)[0]||null;
};

const getTopMistakeReason=report=>{
const mistakes=getMistakes(report);
if(!mistakes.length)return null;

const counts=mistakes.reduce((result,mistake)=>{
const reason=mistake.reason||"Concept";
result[reason]=(result[reason]||0)+1;
return result;
},{});

const [reason,count]=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];

return{reason,count};
};

const getPriority=report=>{
const revisions=getRevisions(report);
const latestMock=report?.latestMock;
const progress=clamp(report?.progress??report?.overallProgress);
const mistakes=getMistakes(report);
const frequentMistakes=mistakes.filter(item=>item.frequent).length;
const missionCompleted=Boolean(
report?.missionCompleted||
report?.dailyMissionPlan?.completed
);
const brainTrainerCompleted=Boolean(report?.brainTrainerCompleted);

if(revisions.length>=5)return"Revision Crisis";
if(latestMock&&Number(latestMock.accuracy)<60)return"Mock Recovery";
if(frequentMistakes>=3)return"Mistake Recovery";
if(!brainTrainerCompleted)return"Brain Activation";
if(!missionCompleted)return"Daily Mission";
if(progress<30)return"Syllabus Building";
if(progress<70)return"PYQ Expansion";
return"Exam Simulation";
};

const getRisk=report=>{
const revisions=getRevisions(report);
const latestMock=report?.latestMock;
const progress=clamp(report?.progress??report?.overallProgress);
const mistakes=getMistakes(report);
const frequentMistakes=mistakes.filter(item=>item.frequent).length;
const studyMinutes=Number(report?.studyMinutes)||0;

if(revisions.length>=7)return"High";
if(latestMock&&Number(latestMock.accuracy)<60)return"High";
if(frequentMistakes>=5)return"High";
if(revisions.length>=3)return"Medium";
if(progress<20)return"Medium";
if(studyMinutes<30&&!report?.missionCompleted)return"Medium";
return"Low";
};

const getRecommendation=(report,priority)=>{
const latestMock=report?.latestMock;
const weakSubject=getWeakSubject(report);
const mistakeReason=getTopMistakeReason(report);
const revisions=getRevisions(report);
const studyMinutes=Number(report?.studyMinutes)||0;

if(priority==="Revision Crisis"){
return `${revisions.length} pending revisions unnayi. New topic start cheyakunda first oldest revisions complete cheyyi.`;
}

if(priority==="Mock Recovery"){
return `${normalizeSubject(latestMock?.weakestSubject||weakSubject?.subject)} weak ga undi. 48 hours full mocks stop chesi concepts, mistakes and 25 targeted PYQs practice cheyyi.`;
}

if(priority==="Mistake Recovery"){
return `${weakSubject?.subject||"Weak subject"} lo ${mistakeReason?.reason||"repeated"} mistakes ekkuva unnayi. Frequently Wrong items revise chesi 20 timed questions solve cheyyi.`;
}

if(priority==="Brain Activation"){
return "First 10-minute Brain Trainer complete cheyyi. Appudu today missions start cheyyi.";
}

if(priority==="Daily Mission"){
if(studyMinutes<30){
return "Today mission start cheyyi. First unlocked topic Learn stage ni focus timer tho complete cheyyi.";
}
return "Current mission continue cheyyi. Next incomplete stage complete chesi mistakes record cheyyi.";
}

if(priority==="Syllabus Building"){
return `${weakSubject?.subject||"Core subject"} foundation strengthen cheyyi. One topic ni Learn → Practice → PYQ sequence lo complete cheyyi.`;
}

if(priority==="PYQ Expansion"){
return `${weakSubject?.subject||"Weak subject"} lo PYQ volume increase cheyyi. Daily minimum 25 timed PYQs and mistake analysis maintain cheyyi.`;
}

if(latestMock&&Number(latestMock.accuracy)<85){
return "Sectional mocks continue cheyyi. Wrong answers analyze chesi speed kante accuracy ni first 85% varaku improve cheyyi.";
}

return "Full SSC CGL mocks increase cheyyi. Revision retention, question selection and time management meeda focus cheyyi.";
};

const getMessage=(priority,report)=>{
const revisions=getRevisions(report);
const weakSubject=getWeakSubject(report);

if(priority==="Revision Crisis"){
return `${revisions.length} revisions pending unnayi. Backlog clear ayye varaku new chapters lock cheyyadam better.`;
}

if(priority==="Mock Recovery"){
return "Mock accuracy safe zone kanna takkuva undi. Speed reduce chesi concepts and error analysis meeda focus cheyyi.";
}

if(priority==="Mistake Recovery"){
return `${weakSubject?.subject||"One subject"} lo repeated errors detect ayyayi. Same mistake malli repeat kakunda correction drill cheyyi.`;
}

if(priority==="Brain Activation"){
return "Brain Trainer ఇంకా complete kaaledu. Study missions unlock cheyyadaniki warm-up session finish cheyyi.";
}

if(priority==="Daily Mission"){
return "Today mission ఇంకా complete kaaledu. Current unlocked stage meeda full concentration pettu.";
}

if(priority==="Syllabus Building"){
return "Foundation phase lo unnavu. Sequence break cheyakunda core chapters complete cheyyi.";
}

if(priority==="PYQ Expansion"){
return "Syllabus progress bagundi. Ippudu PYQ accuracy and revision discipline increase cheyyali.";
}

return "Exam phase active. Full mocks, revision and strict time management maintain cheyyi.";
};

const mentorEngine=report=>{
const safeReport=report&&typeof report==="object"?report:{};
const priority=getPriority(safeReport);
const risk=getRisk(safeReport);
const weakSubject=getWeakSubject(safeReport);
const topMistakeReason=getTopMistakeReason(safeReport);
const revisions=getRevisions(safeReport);

const modeMap={
"Revision Crisis":"Sentinel Alert",
"Mock Recovery":"Recovery Protocol",
"Mistake Recovery":"Error Control",
"Brain Activation":"Activation Mode",
"Daily Mission":"Mission Mode",
"Syllabus Building":"Foundation Mode",
"PYQ Expansion":"Mentor Mode",
"Exam Simulation":"Exam Mode"
};

return{
mode:modeMap[priority]||"Sentinel",
message:getMessage(priority,safeReport),
priority,
risk,
recommendation:getRecommendation(safeReport,priority),
weakSubject:weakSubject?.subject||null,
weakSubjectProgress:weakSubject?.averageProgress??null,
topMistakeReason:topMistakeReason?.reason||null,
pendingRevisions:revisions.length,
generatedAt:new Date().toISOString()
};
};

export default mentorEngine;