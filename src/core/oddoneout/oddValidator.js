export function validateOddOneOut(
expected,
selected
){
const correct=
String(expected)===
String(selected);

return{
correct,
expected:String(expected),
selected:String(selected)
};
}

export function getOddAccuracy(
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

const totalAttempts=
correct+
wrong;

return totalAttempts
?Math.round(
correct/
totalAttempts*
100
)
:0;
}

export default{
validateOddOneOut,
getOddAccuracy
};