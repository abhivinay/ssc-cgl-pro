import{useCallback,useState}from"react";
import{
completeNumberMemory,
createNextRound,
createNumberMemoryState,
getNumberMemorySummary,
submitNumberMemoryAnswer
}from"../core/numbermemory/numberEngine";

export default function useNumberMemory({
difficulty="easy"
}={}){
const[state,setState]=useState(
()=>createNumberMemoryState({difficulty})
);

const submitAnswer=useCallback(answer=>{
const updated=submitNumberMemoryAnswer(
state,
answer
);

setState(updated);

return updated;
},[state]);

const nextRound=useCallback(()=>{
setState(previous=>createNextRound(previous));
},[]);

const finishGame=useCallback(()=>{
const completed=completeNumberMemory(state);
const summary=getNumberMemorySummary(completed);

setState(completed);

return summary;
},[state]);

const resetGame=useCallback(()=>{
setState(
createNumberMemoryState({difficulty})
);
},[difficulty]);

return{
state,
submitAnswer,
nextRound,
finishGame,
resetGame
};
}