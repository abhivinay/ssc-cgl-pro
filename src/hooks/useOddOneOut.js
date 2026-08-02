import{useCallback,useState}from"react";
import{
completeOddGame,
createNextOddRound,
createOddState,
getOddSummary,
submitOddAnswer
}from"../core/oddoneout/oddEngine";

export default function useOddOneOut({
difficulty="easy"
}={}){

const[state,setState]=useState(
()=>createOddState({difficulty})
);

const submitAnswer=useCallback(answer=>{

const updated=submitOddAnswer(
state,
answer
);

setState(updated);

return updated;

},[state]);

const nextRound=useCallback(()=>{

setState(previous=>
createNextOddRound(previous)
);

},[]);

const finishGame=useCallback(()=>{

const completed=
completeOddGame(state);

const summary=
getOddSummary(completed);

setState(completed);

return summary;

},[state]);

const resetGame=useCallback(()=>{

setState(
createOddState({difficulty})
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