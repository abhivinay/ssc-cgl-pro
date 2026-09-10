import{useMemo,useState}from"react";
import{useStudy}from"../../context/StudyContext";
import useXP from"../../hooks/useXP";
import useAchievements from"../../hooks/useAchievements";
import AchievementPopup from"./AchievementPopup";
import{useLocation}from"react-router-dom";

export default function AchievementManager(){
const{pathname}=useLocation();
const{studyState}=useStudy();
const{totalXP,level}=useXP();
const[activeAchievement,setActiveAchievement]=useState(null);

const stats=useMemo(()=>{
const topics=Array.isArray(studyState.topics)
?studyState.topics
:[];

const revisions=Array.isArray(studyState.revisions)
?studyState.revisions
:[];

const mistakesReviewed=topics.reduce(
(total,topic)=>
total+(Array.isArray(topic.mistakes)?topic.mistakes.length:0),
0
);

return{
level,
xp:totalXP,
topicsCompleted:topics.filter(topic=>topic.completed).length,
streak:Number(studyState.streak)||0,
revisionsCompleted:revisions.filter(revision=>revision.completed).length,
mistakesReviewed,
brainGamesCompleted:studyState.brainTrainerCompleted?1:0,
mocksCompleted:Number(studyState.mocksCompleted)||0
};
},[
studyState.topics,
studyState.revisions,
studyState.streak,
studyState.brainTrainerCompleted,
studyState.mocksCompleted,
level,
totalXP
]);

const{achievements}=useAchievements(stats);

const[previousAchievements,setPreviousAchievements]=useState(null);
if(previousAchievements!==achievements){
setPreviousAchievements(achievements);
const newlyUnlocked=achievements.find(
achievement=>achievement.newlyUnlocked
);

if(newlyUnlocked){
setActiveAchievement(newlyUnlocked);
}
}

let entered=false;
try{entered=sessionStorage.getItem("ssc-sentinel-entered")==="1";}catch{/* Session storage is optional. */}
const canNotify=entered&&studyState.brainTrainerCompleted&&pathname!=="/brain-trainer"&&pathname!=="/settings";

return canNotify?(
<AchievementPopup
achievement={activeAchievement}
onClose={()=>setActiveAchievement(null)}
/>
):null;
}
