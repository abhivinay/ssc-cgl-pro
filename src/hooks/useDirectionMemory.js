import{useCallback,useState}from"react";
import{
completeDirectionGame,
createDirectionState,
createNextDirectionRound,
getDirectionSummary,
submitDirectionAnswer
}from"../core/directionmemory/directionEngine";

export default function useDirectionMemory({
difficulty="easy"
}={}){

const[state,setState]=useState(
()=>createDirectionState({difficulty})
);

const submitAnswer=useCallback(sequence=>{

const updated=submitDirectionAnswer(
state,
sequence
);

setState(updated);

return updated;

},[state]);

const nextRound=useCallback(()=>{

setState(previous=>
createNextDirectionRound(previous)
);

},[]);

const finishGame=useCallback(()=>{

const completed=
completeDirectionGame(state);

const summary=
getDirectionSummary(completed);

setState(completed);

return summary;

},[state]);

const resetGame=useCallback(()=>{

setState(
createDirectionState({difficulty})
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