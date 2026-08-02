import{useCallback,useState}from"react";
import{
completePatternGame,
createNextPatternRound,
createPatternState,
getPatternSummary,
submitPatternAnswer
}from"../core/pattern/patternEngine";

export default function usePatternRecognition({
difficulty="easy"
}={}){

const[state,setState]=useState(
()=>createPatternState({difficulty})
);

const submitAnswer=useCallback(answer=>{

const updated=submitPatternAnswer(
state,
answer
);

setState(updated);

return updated;

},[state]);

const nextRound=useCallback(()=>{

setState(previous=>
createNextPatternRound(previous)
);

},[]);

const finishGame=useCallback(()=>{

const completed=
completePatternGame(state);

const summary=
getPatternSummary(completed);

setState(completed);

return summary;

},[state]);

const resetGame=useCallback(()=>{

setState(
createPatternState({difficulty})
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