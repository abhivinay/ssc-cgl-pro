import {createContext,useContext,useEffect,useState} from "react";
import {calculateTestResult,createTestAttempt} from "../utils/testEngine";

const TestContext=createContext(null);
const STORAGE_KEY="sscTestAttemptsV1";

const loadAttempts=()=>{
try{
const stored=localStorage.getItem(STORAGE_KEY);
return stored?JSON.parse(stored):{};
}catch{
return{};
}
};

export function TestProvider({children}){
const [attempts,setAttempts]=useState(loadAttempts);

useEffect(()=>{
localStorage.setItem(STORAGE_KEY,JSON.stringify(attempts));
},[attempts]);

const startTest=test=>{
setAttempts(previous=>{
if(previous[test.id]&&!previous[test.id].submitted)return previous;
return{
...previous,
[test.id]:createTestAttempt(test)
};
});
};

const setCurrentQuestion=(testId,index,questionId)=>{
setAttempts(previous=>{
const attempt=previous[testId];
if(!attempt||attempt.submitted)return previous;
const visited=attempt.visited.includes(questionId)?attempt.visited:[...attempt.visited,questionId];
return{
...previous,
[testId]:{
...attempt,
currentIndex:index,
visited
}
};
});
};

const selectAnswer=(testId,questionId,optionId)=>{
setAttempts(previous=>{
const attempt=previous[testId];
if(!attempt||attempt.submitted)return previous;
return{
...previous,
[testId]:{
...attempt,
answers:{
...attempt.answers,
[questionId]:optionId
}
}
};
});
};

const clearAnswer=(testId,questionId)=>{
setAttempts(previous=>{
const attempt=previous[testId];
if(!attempt||attempt.submitted)return previous;
const answers={...attempt.answers};
delete answers[questionId];
return{
...previous,
[testId]:{
...attempt,
answers
}
};
});
};

const toggleMarkForReview=(testId,questionId)=>{
setAttempts(previous=>{
const attempt=previous[testId];
if(!attempt||attempt.submitted)return previous;
const marked=attempt.markedForReview.includes(questionId);
return{
...previous,
[testId]:{
...attempt,
markedForReview:marked
?attempt.markedForReview.filter(id=>id!==questionId)
:[...attempt.markedForReview,questionId]
}
};
});
};

const decrementTime=testId=>{
setAttempts(previous=>{
const attempt=previous[testId];
if(!attempt||attempt.submitted||attempt.remainingSeconds<=0)return previous;
return{
...previous,
[testId]:{
...attempt,
remainingSeconds:attempt.remainingSeconds-1
}
};
});
};

const submitTest=(testId,test)=>{
setAttempts(previous=>{
const attempt=previous[testId];
if(!attempt||attempt.submitted)return previous;
const completedAttempt={
...attempt,
submitted:true,
submittedAt:new Date().toISOString()
};
const result=calculateTestResult(test,completedAttempt);
return{
...previous,
[testId]:{
...completedAttempt,
result
}
};
});
};

const resetTest=testId=>{
setAttempts(previous=>{
const updated={...previous};
delete updated[testId];
return updated;
});
};

return(
<TestContext.Provider value={{
attempts,
startTest,
setCurrentQuestion,
selectAnswer,
clearAnswer,
toggleMarkForReview,
decrementTime,
submitTest,
resetTest
}}>
{children}
</TestContext.Provider>
);
}

export const useTest=()=>{
const context=useContext(TestContext);
if(!context)throw new Error("useTest must be used inside TestProvider");
return context;
};