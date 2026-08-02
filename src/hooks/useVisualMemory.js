import{useCallback,useState}from"react";
import{
completeVisualMemory,
createNextVisualRound,
createVisualMemoryState,
getVisualSummary,
submitVisualSelection
}from"../core/visualmemory/visualEngine";

export default function useVisualMemory({
difficulty="easy"
}={}){
const[state,setState]=useState(
()=>createVisualMemoryState({difficulty})
);

const submitSelection=useCallback(selection=>{
const updated=submitVisualSelection(
state,
selection
);

setState(updated);

return updated;
},[state]);

const nextRound=useCallback(()=>{
setState(previous=>
createNextVisualRound(previous)
);
},[]);

const finishGame=useCallback(sourceState=>{
const baseState=sourceState||state;

const completed=completeVisualMemory(
baseState
);

const summary=getVisualSummary(
completed
);

setState(completed);

return summary;
},[state]);

const resetGame=useCallback(()=>{
setState(
createVisualMemoryState({difficulty})
);
},[difficulty]);

return{
state,
submitSelection,
nextRound,
finishGame,
resetGame
};
}