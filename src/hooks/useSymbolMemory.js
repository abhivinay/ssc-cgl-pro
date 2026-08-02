import{useCallback,useState}from"react";
import{
completeSymbolGame,
createNextSymbolRound,
createSymbolState,
getSymbolSummary,
submitSymbolAnswer
}from"../core/symbolmemory/symbolEngine";

export default function useSymbolMemory({
difficulty="easy"
}={}){

const[state,setState]=useState(
()=>createSymbolState({difficulty})
);

const submitAnswer=useCallback(sequence=>{

const updated=submitSymbolAnswer(
state,
sequence
);

setState(updated);

return updated;

},[state]);

const nextRound=useCallback(()=>{

setState(previous=>
createNextSymbolRound(previous)
);

},[]);

const finishGame=useCallback(()=>{

const completed=
completeSymbolGame(state);

const summary=
getSymbolSummary(completed);

setState(completed);

return summary;

},[state]);

const resetGame=useCallback(()=>{

setState(
createSymbolState({difficulty})
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