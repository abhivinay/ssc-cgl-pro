const normalizeNumber=value=>{
const number=Number(value);
return Number.isFinite(number)?number:null;
};

export function validatePatternAnswer(
expected,
submitted
){
const expectedValue=normalizeNumber(expected);
const submittedValue=normalizeNumber(submitted);

const correct=
expectedValue!==null&&
submittedValue!==null&&
submittedValue===expectedValue;

return{
correct,
expected:expectedValue,
submitted:submittedValue
};
}

export function getPatternAccuracy(
correctAnswers=0,
wrongAnswers=0
){
const correct=Math.max(
0,
Number(correctAnswers)||0
);

const wrong=Math.max(
0,
Number(wrongAnswers)||0
);

const attempts=correct+wrong;

return attempts
?Math.round(correct/attempts*100)
:0;
}

export default{
validatePatternAnswer,
getPatternAccuracy
};