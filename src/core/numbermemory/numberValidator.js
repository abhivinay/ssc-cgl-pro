const normalizeValue=value=>
String(value??"")
.replace(/\s+/g,"")
.trim();

export function validateNumberAnswer(
expected,
submitted
){
const correctValue=normalizeValue(expected);
const submittedValue=normalizeValue(submitted);

const correct=
correctValue.length>0&&
submittedValue===correctValue;

return{
correct,
expected:correctValue,
submitted:submittedValue,
length:correctValue.length
};
}

export function getDigitAccuracy(
expected,
submitted
){
const correctValue=normalizeValue(expected);
const submittedValue=normalizeValue(submitted);

if(!correctValue.length)return 0;

let correctDigits=0;

for(
let index=0;
index<correctValue.length;
index+=1
){
if(
submittedValue[index]===
correctValue[index]
){
correctDigits+=1;
}
}

return Math.round(
correctDigits/
correctValue.length*
100
);
}

export function getMistakePositions(
expected,
submitted
){
const correctValue=normalizeValue(expected);
const submittedValue=normalizeValue(submitted);
const mistakes=[];

for(
let index=0;
index<correctValue.length;
index+=1
){
if(
submittedValue[index]!==
correctValue[index]
){
mistakes.push({
index,
position:index+1,
expected:correctValue[index],
submitted:submittedValue[index]??null
});
}
}

return mistakes;
}

export default{
validateNumberAnswer,
getDigitAccuracy,
getMistakePositions
};