import {useNavigate} from "react-router-dom";
import {useStudy} from "../../context/StudyContext";
import TaskItem from "./TaskItem";

const stageTitles={
learn:"📖 Learn",
conceptCheck:"🧠 Concept Check",
level1:"1️⃣ Level 1",
level2:"2️⃣ Level 2",
level3:"3️⃣ Level 3",
topicTest:"📝 Topic Test",
pyq:"📚 PYQ",
revision:"🔄 Revision"
};

export default function MissionList(){
const navigate=useNavigate();
const {studyState,stages,getTopicProgress}=useStudy();
const mission=studyState.mission||{};
const topic=studyState.topics.find(item=>item.id===mission.topicId);
const stageList=Array.isArray(stages)?stages:Object.keys(stageTitles);

if(!topic){
return(
<div className="card">
<h2>🎉 All Topics Completed</h2>
</div>
);
}

const activeStage=mission.stage||stageList.find(stage=>!topic.stages?.[stage])||"revision";
const progress=typeof getTopicProgress==="function"?getTopicProgress(topic.id):topic.progress||0;

return(
<div className="card">
<h2>{topic.name}</h2>
<p>{progress}% Completed</p>
<div className="progress">
<div className="progress-fill" style={{width:`${progress}%`}}></div>
</div>
{stageList.map((stage,index)=>{
const completed=Boolean(topic.stages?.[stage]);
const previousComplete=index===0||Boolean(topic.stages?.[stageList[index-1]]);
const active=!completed&&topic.unlocked&&previousComplete&&stage===activeStage;
const locked=!completed&&!active;

return(
<TaskItem
key={stage}
title={stageTitles[stage]||stage}
completed={completed}
locked={locked}
active={active}
onClick={()=>active&&navigate(`/topic/${topic.id}/${stage}`)}
/>
);
})}
</div>
);
}