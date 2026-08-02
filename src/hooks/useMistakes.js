import {useCallback,useEffect,useState} from "react";
import {
addMistake,
clearMistakes,
readMistakes
} from "../services/mistakeStorage";

export default function useMistakes(){
const [mistakes,setMistakes]=useState(()=>readMistakes());

const refresh=useCallback(()=>{
setMistakes(readMistakes());
},[]);

const saveMistake=useCallback(mistake=>{
addMistake(mistake);
refresh();
},[refresh]);

const clearAllMistakes=useCallback(()=>{
clearMistakes();
refresh();
},[refresh]);

useEffect(()=>{
const sync=()=>refresh();

window.addEventListener("focus",sync);
document.addEventListener("visibilitychange",sync);

return()=>{
window.removeEventListener("focus",sync);
document.removeEventListener("visibilitychange",sync);
};
},[refresh]);

return{
mistakes,
refresh,
saveMistake,
clearAllMistakes
};
}