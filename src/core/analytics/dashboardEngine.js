const toSafeArray=value=>Array.isArray(value)?value:[];

const toSafeNumber=(value,fallback=0)=>{
const number=Number(value);
return Number.isFinite(number)?number:fallback;
};

const getTimestamp=value=>{
const timestamp=new Date(value).getTime();
return Number.isFinite(timestamp)?timestamp:0;
};

export function getTotalMistakes(mistakes=[]){
return toSafeArray(mistakes).length;
}

export function getAccuracy(mistakes=[],totalAttempts=0){
const safeMistakes=toSafeArray(mistakes);
const attempts=Math.max(0,toSafeNumber(totalAttempts));

if(attempts===0){
return safeMistakes.length===0?100:null;
}

const incorrect=Math.min(safeMistakes.length,attempts);
const correct=Math.max(0,attempts-incorrect);

return Math.round((correct/attempts)*100);
}

export function getMistakeRate(mistakes=[],totalAttempts=0){
const safeMistakes=toSafeArray(mistakes);
const attempts=Math.max(0,toSafeNumber(totalAttempts));

if(attempts===0)return 0;

return Math.round(
(Math.min(safeMistakes.length,attempts)/attempts)*100
);
}

export function groupBySubject(mistakes=[]){
return toSafeArray(mistakes).reduce((result,item)=>{
const subject=String(item?.subject||"Unknown").trim()||"Unknown";

result[subject]=(result[subject]||0)+1;

return result;
},{});
}

export function groupByTopic(mistakes=[]){
return toSafeArray(mistakes).reduce((result,item)=>{
const topicId=String(item?.topicId||"Unknown").trim()||"Unknown";

result[topicId]=(result[topicId]||0)+1;

return result;
},{});
}

export function getRecentMistakes(mistakes=[],limit=10){
const safeLimit=Math.max(0,Math.floor(toSafeNumber(limit,10)));

return [...toSafeArray(mistakes)]
.sort((first,second)=>
getTimestamp(second?.createdAt)-
getTimestamp(first?.createdAt)
)
.slice(0,safeLimit);
}

export function getAverageTime(mistakes=[]){
const safeMistakes=toSafeArray(mistakes);

if(!safeMistakes.length)return 0;

const totalTime=safeMistakes.reduce(
(total,item)=>
total+Math.max(0,toSafeNumber(item?.timeTaken)),
0
);

return Math.round(totalTime/safeMistakes.length);
}

export function getWeakTopics(mistakes=[],limit=5){
const safeLimit=Math.max(0,Math.floor(toSafeNumber(limit,5)));
const grouped=groupByTopic(mistakes);

return Object.entries(grouped)
.sort((first,second)=>{
const countDifference=second[1]-first[1];

if(countDifference!==0)return countDifference;

return first[0].localeCompare(second[0]);
})
.slice(0,safeLimit)
.map(([topicId,count])=>({
topicId,
count
}));
}

export default{
getTotalMistakes,
getAccuracy,
getMistakeRate,
groupBySubject,
groupByTopic,
getRecentMistakes,
getAverageTime,
getWeakTopics
};