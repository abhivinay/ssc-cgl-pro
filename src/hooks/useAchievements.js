import {useEffect,useMemo,useState} from "react";
import achievements from "../data/achievements/achievements";
import {
getUnlockedAchievements
} from "../core/achievements/achievementEngine";
import {
readAchievements,
unlockAchievement
} from "../services/achievementStorage";

export default function useAchievements(stats={}){

const [unlockedIds,setUnlockedIds]=useState([]);

const achievementList=useMemo(
()=>getUnlockedAchievements(
stats,
unlockedIds
),
[stats,unlockedIds]
);

useEffect(()=>{
setUnlockedIds(readAchievements());
},[]);

useEffect(()=>{
const newlyUnlocked=achievementList.filter(
item=>
item.completed&&
item.newlyUnlocked
);

if(!newlyUnlocked.length){
return;
}

const updated=[...unlockedIds];

newlyUnlocked.forEach(item=>{
unlockAchievement(item.id);

if(!updated.includes(item.id)){
updated.push(item.id);
}
});

setUnlockedIds(updated);

},[achievementList]);

return{
achievements:achievementList,
unlocked:achievementList.filter(
item=>item.completed
),
locked:achievementList.filter(
item=>!item.completed
),
total:achievements.length,
unlockedCount:achievementList.filter(
item=>item.completed
).length,
completion:Math.round(
achievementList.filter(
item=>item.completed
).length/
achievements.length*
100
)
};
}