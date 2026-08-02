const clampInteger=(value,min,max,fallback)=>{
const number=Math.floor(Number(value));
if(!Number.isFinite(number))return fallback;
return Math.min(max,Math.max(min,number));
};

const createRandomDigit=(allowLeadingZero=false)=>{
const minimum=allowLeadingZero?0:1;
return Math.floor(Math.random()*(10-minimum))+minimum;
};

export function generateNumberSequence({
length=3,
allowLeadingZero=false
}={}){
const safeLength=clampInteger(length,1,30,3);

let result=String(
createRandomDigit(allowLeadingZero)
);

for(let index=1;index<safeLength;index+=1){
result+=String(
Math.floor(Math.random()*10)
);
}

return result;
}

export function generateUniqueNumberSequence({
length=3,
previousValues=[],
allowLeadingZero=false,
maxAttempts=50
}={}){
const blocked=new Set(
Array.isArray(previousValues)
?previousValues.map(String)
:[]
);

const safeAttempts=clampInteger(
maxAttempts,
1,
500,
50
);

for(let attempt=0;attempt<safeAttempts;attempt+=1){
const value=generateNumberSequence({
length,
allowLeadingZero
});

if(!blocked.has(value)){
return value;
}
}

return generateNumberSequence({
length,
allowLeadingZero
});
}

export function getDisplayDuration({
length=3,
difficulty="easy"
}={}){
const safeLength=clampInteger(length,1,30,3);

const baseDuration={
easy:3200,
medium:2600,
hard:2100
}[difficulty]||3200;

const extraPerDigit={
easy:300,
medium:240,
hard:180
}[difficulty]||300;

return Math.min(
10000,
baseDuration+
Math.max(0,safeLength-3)*extraPerDigit
);
}

export default{
generateNumberSequence,
generateUniqueNumberSequence,
getDisplayDuration
};