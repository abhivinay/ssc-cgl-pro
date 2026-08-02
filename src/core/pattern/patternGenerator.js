const randomInteger=(minimum,maximum)=>
Math.floor(Math.random()*(maximum-minimum+1))+minimum;

const randomItem=items=>
items[randomInteger(0,items.length-1)];

const shuffle=items=>{
const result=[...items];

for(let index=result.length-1;index>0;index-=1){
const randomIndex=randomInteger(0,index);

[result[index],result[randomIndex]]=[
result[randomIndex],
result[index]
];
}

return result;
};

const createArithmeticPattern=difficulty=>{
const start=randomInteger(1,difficulty==="hard"?40:20);
const difference=randomInteger(
difficulty==="easy"?1:2,
difficulty==="hard"?15:8
);

const sequence=Array.from(
{length:5},
(_,index)=>start+difference*index
);

return{
type:"arithmetic",
sequence,
answer:start+difference*5,
explanation:`Add ${difference} each time.`
};
};

const createGeometricPattern=difficulty=>{
const multiplier=randomInteger(
2,
difficulty==="hard"?5:3
);

const start=randomInteger(
1,
difficulty==="hard"?6:4
);

const sequence=Array.from(
{length:5},
(_,index)=>start*(multiplier**index)
);

return{
type:"geometric",
sequence,
answer:start*(multiplier**5),
explanation:`Multiply by ${multiplier} each time.`
};
};

const createSquarePattern=()=>{
const start=randomInteger(1,6);

const sequence=Array.from(
{length:5},
(_,index)=>(start+index)**2
);

return{
type:"squares",
sequence,
answer:(start+5)**2,
explanation:"These are consecutive square numbers."
};
};

const createCubePattern=()=>{
const start=randomInteger(1,4);

const sequence=Array.from(
{length:5},
(_,index)=>(start+index)**3
);

return{
type:"cubes",
sequence,
answer:(start+5)**3,
explanation:"These are consecutive cube numbers."
};
};

const createAlternatingPattern=difficulty=>{
const start=randomInteger(5,30);
const add=randomInteger(2,difficulty==="hard"?12:7);
const subtract=randomInteger(1,difficulty==="hard"?8:5);

const sequence=[start];

for(let index=1;index<5;index+=1){
const previous=sequence[index-1];

sequence.push(
index%2===1
?previous+add
:previous-subtract
);
}

const answer=sequence[4]+add;

return{
type:"alternating",
sequence,
answer,
explanation:`Alternate +${add} and -${subtract}.`
};
};

const createDoublingPlusPattern=difficulty=>{
const start=randomInteger(1,8);
const extra=randomInteger(
1,
difficulty==="hard"?10:5
);

const sequence=[start];

for(let index=1;index<5;index+=1){
sequence.push(
sequence[index-1]*2+extra
);
}

return{
type:"double-plus",
sequence,
answer:sequence[4]*2+extra,
explanation:`Multiply by 2 and add ${extra}.`
};
};

const GENERATORS={
easy:[
createArithmeticPattern,
createGeometricPattern,
createSquarePattern
],
medium:[
createArithmeticPattern,
createGeometricPattern,
createSquarePattern,
createCubePattern,
createAlternatingPattern
],
hard:[
createArithmeticPattern,
createGeometricPattern,
createCubePattern,
createAlternatingPattern,
createDoublingPlusPattern
]
};

const createOptions=(answer,difficulty)=>{
const spread=difficulty==="hard"?20:10;
const values=new Set([answer]);

while(values.size<4){
const offset=randomInteger(1,spread);
const candidate=Math.max(
0,
answer+(Math.random()>0.5?offset:-offset)
);

values.add(candidate);
}

return shuffle([...values]);
};

export function generatePatternQuestion({
difficulty="easy"
}={}){
const safeDifficulty=
["easy","medium","hard"].includes(difficulty)
?difficulty
:"easy";

const generator=randomItem(
GENERATORS[safeDifficulty]
);

const pattern=generator(safeDifficulty);

return{
id:
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
?crypto.randomUUID()
:`pattern-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
difficulty:safeDifficulty,
type:pattern.type,
sequence:pattern.sequence,
answer:pattern.answer,
options:createOptions(
pattern.answer,
safeDifficulty
),
explanation:pattern.explanation
};
}

export function generatePatternSet({
count=5,
difficulty="easy"
}={}){
const safeCount=Math.max(
1,
Math.min(20,Number(count)||5)
);

return Array.from(
{length:safeCount},
()=>generatePatternQuestion({difficulty})
);
}

export default{
generatePatternQuestion,
generatePatternSet
};