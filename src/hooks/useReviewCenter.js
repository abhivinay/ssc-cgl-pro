import{useCallback,useEffect,useRef,useState}from"react";
import{loadReviewQuestions,saveReviewQuestions}from"../services/reviewStorage";

export default function useReviewCenter(){
const[questions,setQuestions]=useState(loadReviewQuestions);
const[saveState,setSaveState]=useState("saved");
const hydrated=useRef(false);

useEffect(()=>{
if(!hydrated.current){
hydrated.current=true;
return;
}

setSaveState("saving");

const timer=window.setTimeout(()=>{
try{
saveReviewQuestions(questions);
setSaveState("saved");
}catch{
setSaveState("error");
}
},450);

return()=>window.clearTimeout(timer);
},[questions]);

const updateQuestion=useCallback((id,updates)=>{
setQuestions(current=>
current.map(question=>
question.id===id
?{...question,...updates,updatedAt:new Date().toISOString()}
:question
)
);
},[]);

const setBulkStatus=useCallback((ids,reviewStatus)=>{
const selected=new Set(ids);

setQuestions(current=>
current.map(question=>
selected.has(question.id)
?{...question,reviewStatus,updatedAt:new Date().toISOString()}
:question
)
);
},[]);

return{
questions,
updateQuestion,
setBulkStatus,
saveState
};
}