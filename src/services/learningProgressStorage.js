const LEARNING_PROGRESS_STORAGE_KEY="sscExtendedTopicStages";

const isRecord=value=>
Boolean(value)&&typeof value==="object"&&!Array.isArray(value);

export const readLearningProgress=()=>{
try{
const storedValue=localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY);
if(!storedValue)return {};
const parsedValue=JSON.parse(storedValue);
return isRecord(parsedValue)?parsedValue:{};
}catch(error){
console.error("Failed to read learning progress:",error);
return {};
}
};

export const writeLearningProgress=progress=>{
try{
const safeProgress=isRecord(progress)?progress:{};
localStorage.setItem(
LEARNING_PROGRESS_STORAGE_KEY,
JSON.stringify(safeProgress)
);
return true;
}catch(error){
console.error("Failed to save learning progress:",error);
return false;
}
};

export const clearLearningProgress=()=>{
try{
localStorage.removeItem(LEARNING_PROGRESS_STORAGE_KEY);
return true;
}catch(error){
console.error("Failed to clear learning progress:",error);
return false;
}
};

export const getTopicStoredProgress=(topicId,progress={})=>{
if(!topicId||!isRecord(progress))return {};
const topicProgress=progress[topicId];
return isRecord(topicProgress)?topicProgress:{};
};

export const removeTopicStoredProgress=(topicId,progress={})=>{
if(!topicId||!isRecord(progress))return progress;
const nextProgress={...progress};
delete nextProgress[topicId];
return nextProgress;
};

export {LEARNING_PROGRESS_STORAGE_KEY};