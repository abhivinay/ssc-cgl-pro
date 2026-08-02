import{useCallback,useState}from"react";
import{
completeReactionGame,
createNextReactionRound,
createReactionState,
getReactionSummary,
showReactionSignal,
submitReaction
}from"../core/reaction/reactionEngine";

export default function useSpeedReaction({
difficulty="easy"
}={}){

const[state,setState]=useState(
()=>createReactionState({difficulty})
);

const revealSignal=useCallback(()=>{

setState(previous=>
showReactionSignal(previous)
);

},[]);

const submitClick=useCallback(clickedAt=>{

const updated=submitReaction(
state,
clickedAt
);

setState(updated);

return updated;

},[state]);

const nextRound=useCallback(()=>{

setState(previous=>
createNextReactionRound(previous)
);

},[]);

const finishGame=useCallback(()=>{

const completed=
completeReactionGame(state);

const summary=
getReactionSummary(completed);

setState(completed);

return summary;

},[state]);

const resetGame=useCallback(()=>{

setState(
createReactionState({difficulty})
);

},[difficulty]);

return{
state,
revealSignal,
submitClick,
nextRound,
finishGame,
resetGame
};

}