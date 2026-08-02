const normalize=value=>{
if(!Array.isArray(value))return[];
return value.map(item=>String(item));
};

export function validateDirectionSequence(
expectedSequence=[],
submittedSequence=[]
){
const expected=normalize(expectedSequence);
const submitted=normalize(submittedSequence);

const correct=
expected.length>0&&
expected.length===submitted.length&&
expected.every(
(item,index)=>item===submitted[index]
);

const correctPositions=expected.reduce(
(total,item,index)=>
total+(submitted[index]===item?1:0),
0
);

return{
correct,
expected,
submitted,
correctPositions,
totalExpected:expected.length
};
}

export function getDirectionAccuracy(
expectedSequence=[],
submittedSequence=[]
){
const result=validateDirectionSequence(
expectedSequence,
submittedSequence
);

if(!result.totalExpected)return 0;

return Math.round(
result.correctPositions/
result.totalExpected*
100
);
}

export default{
validateDirectionSequence,
getDirectionAccuracy
};