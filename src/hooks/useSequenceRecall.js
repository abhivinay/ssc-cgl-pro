import{useCallback,useState}from"react";
import{
completeSequenceGame,
createNextSequenceRound,
createSequenceState,
getSequenceSummary,
submitSequenceAnswer
}from"../core/sequence/sequenceEngine";

export default function useSequenceRecall({
difficulty="easy"
}={}){

const[state,setState]=useState(
()=>createSequenceState({difficulty})
);

const submitAnswer=useCallback(sequence=>{

const updated=submitSequenceAnswer(
state,
sequence
);

setState(updated);

return updated;

},[state]);

const nextRound=useCallback(()=>{

setState(previous=>
createNextSequenceRound(previous)
);

},[]);

const finishGame=useCallback(()=>{

const completed=
completeSequenceGame(state);

const summary=
getSequenceSummary(completed);

setState(completed);

return summary;

},[state]);

const resetGame=useCallback(()=>{

setState(
createSequenceState({difficulty})
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