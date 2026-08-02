const STORAGE_KEY="ssc-sentinel-mistakes";

export function readMistakes(){
try{
const data=localStorage.getItem(STORAGE_KEY);

if(!data)return[];

const parsed=JSON.parse(data);

if(!Array.isArray(parsed)){
console.warn("Invalid mistake storage. Resetting...");
localStorage.removeItem(STORAGE_KEY);
return[];
}

return parsed.filter(item=>
item&&
typeof item==="object"&&
typeof item.id==="string"
);
}catch(error){
console.error("Failed to read mistake storage:",error);
localStorage.removeItem(STORAGE_KEY);
return[];
}
}

export function writeMistakes(mistakes){
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(mistakes)
);
}

export function addMistake(mistake){
const mistakes=readMistakes();

const exists=mistakes.some(item=>
item.topicId===mistake.topicId&&
item.questionId===mistake.questionId&&
item.selectedAnswer===mistake.selectedAnswer
);

if(exists){
return mistakes;
}

const updated=[mistake,...mistakes];

writeMistakes(updated);

return updated;
}

export function clearMistakes(){
localStorage.removeItem(STORAGE_KEY);
}

export function getMistakesByTopic(topicId){
return readMistakes().filter(
item=>item.topicId===topicId
);
}

export function getMistakesBySubject(subject){
return readMistakes().filter(
item=>item.subject===subject
);
}

export default{
readMistakes,
writeMistakes,
addMistake,
clearMistakes,
getMistakesByTopic,
getMistakesBySubject
};