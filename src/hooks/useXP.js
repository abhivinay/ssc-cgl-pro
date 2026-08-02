import {useCallback,useEffect,useMemo,useState} from "react";
import {
addXP,
clearXP,
readXP
} from "../services/xpStorage";
import {
calculateLevel,
getCurrentLevelXP,
getXPToNextLevel
} from "../core/xp/xpEngine";

export default function useXP(){
const [xpState,setXPState]=useState(()=>readXP());

const refresh=useCallback(()=>{
setXPState(readXP());
},[]);

const award=useCallback(({
amount,
reason,
sourceId=null
})=>{
const updated=addXP({
amount,
reason,
sourceId
});

setXPState(updated);
return updated;
},[]);

const resetXP=useCallback(()=>{
setXPState(clearXP());
},[]);

useEffect(()=>{
const sync=()=>refresh();

window.addEventListener("focus",sync);
document.addEventListener("visibilitychange",sync);

return()=>{
window.removeEventListener("focus",sync);
document.removeEventListener("visibilitychange",sync);
};
},[refresh]);

const level=useMemo(
()=>calculateLevel(xpState.totalXP),
[xpState.totalXP]
);

const currentLevelXP=useMemo(
()=>getCurrentLevelXP(xpState.totalXP),
[xpState.totalXP]
);

const xpToNextLevel=useMemo(
()=>getXPToNextLevel(xpState.totalXP),
[xpState.totalXP]
);

return{
totalXP:xpState.totalXP,
history:xpState.history,
level,
currentLevelXP,
xpToNextLevel,
award,
refresh,
resetXP
};
}