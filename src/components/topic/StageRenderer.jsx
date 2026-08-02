import LearnStage from"./LearnStage";
import LessonPlayer from"./LessonPlayer";
import QuestionStage from"./QuestionStage";
import TopicTestStage from"./TopicTestStage";
import PYQStage from"./PYQStage";
import RevisionStage from"./RevisionStage";

const STAGE_LABELS={
learn:"Learn",
conceptCheck:"Concept Check",
level1:"Level 1",
level2:"Level 2",
level3:"Level 3",
topicTest:"Topic Test",
pyq:"PYQ Practice",
revision:"Revision"
};

const getPrimaryLesson=content=>{
const lessons=content?.lessons;

if(!lessons||typeof lessons!=="object"){
return null;
}

const lessonList=Object.values(lessons).filter(Boolean);

return lessonList[0]||null;
};

const getTopicName=content=>
content?.name||
content?.learn?.introduction?.title||
"Topic";

export default function StageRenderer({
stage,
content,
onStageComplete
}){
if(!content){
return(
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
<p className="text-5xl">📭</p>

<h2 className="mt-4 text-2xl font-black text-white">
Content unavailable
</h2>

<p className="mt-2 text-sm text-zinc-500">
This topic does not have content connected yet.
</p>
</div>
);
}

const topicName=getTopicName(content);
const primaryLesson=getPrimaryLesson(content);

switch(stage){
case"learn":
if(primaryLesson){
return(
<LessonPlayer
lesson={primaryLesson}
onComplete={result=>{
if(result?.completed){
onStageComplete?.({
...result,
stage:"learn",
topicId:content.id,
lessonId:primaryLesson.id
});
}
}}
/>
);
}

return(
<LearnStage
content={content.learn}
/>
);

case"conceptCheck":
return(
<QuestionStage
title={`${topicName} Concept Check`}
description={`Test whether the core ${topicName} concepts are clear.`}
questions={content.conceptCheck}
passingPercentage={70}
onComplete={result=>{
if(result?.confirmed){
onStageComplete?.({
...result,
stage:"conceptCheck",
topicId:content.id
});
}
}}
/>
);

case"level1":
return(
<QuestionStage
title={`${topicName} Level 1 Practice`}
description={`Build confidence with basic SSC-pattern ${topicName} questions.`}
questions={content.practice?.level1}
passingPercentage={70}
onComplete={result=>{
if(result?.confirmed){
onStageComplete?.({
...result,
stage:"level1",
topicId:content.id
});
}
}}
/>
);

case"level2":
return(
<QuestionStage
title={`${topicName} Level 2 Practice`}
description={`Solve standard SSC-level ${topicName} questions with accuracy.`}
questions={content.practice?.level2}
passingPercentage={75}
onComplete={result=>{
if(result?.confirmed){
onStageComplete?.({
...result,
stage:"level2",
topicId:content.id
});
}
}}
/>
);

case"level3":
return(
<QuestionStage
title={`${topicName} Level 3 Practice`}
description={`Attempt advanced SSC ${topicName} questions and mixed applications.`}
questions={content.practice?.level3}
passingPercentage={80}
onComplete={result=>{
if(result?.confirmed){
onStageComplete?.({
...result,
stage:"level3",
topicId:content.id
});
}
}}
/>
);

case"topicTest":
return(
<TopicTestStage
config={content.topicTest?.config}
questions={content.topicTest?.questions}
onComplete={result=>{
if(result?.passed){
onStageComplete?.({
...result,
stage:"topicTest",
topicId:content.id
});
}
}}
/>
);

case"pyq":
return(
<PYQStage
questions={content.pyqs}
onComplete={result=>{
if(result?.completed){
onStageComplete?.({
...result,
stage:"pyq",
topicId:content.id
});
}
}}
/>
);

case"revision":
return(
<RevisionStage
content={content.revision}
onComplete={result=>{
if(result?.completed){
onStageComplete?.({
...result,
stage:"revision",
topicId:content.id
});
}
}}
/>
);

default:
return(
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
<p className="text-5xl">⚠️</p>

<h2 className="mt-4 text-2xl font-black text-white">
Invalid stage
</h2>

<p className="mt-2 text-sm text-zinc-500">
{STAGE_LABELS[stage]||stage} is not supported.
</p>
</div>
);
}
}