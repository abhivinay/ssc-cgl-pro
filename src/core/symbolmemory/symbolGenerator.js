const randomInteger=(minimum,maximum)=>
Math.floor(Math.random()*(maximum-minimum+1))+minimum;

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

const SYMBOLS=[
"★",
"◆",
"●",
"▲",
"■",
"♥",
"☀",
"☂",
"☁",
"⚡",
"❄",
"☘",
"☯",
"♠",
"♣",
"♦"
];

const LENGTHS={
easy:4,
medium:6,
hard:8
};

export function generateSymbolSequence({
difficulty="easy"
}={}){
const safeDifficulty=
["easy","medium","hard"].includes(difficulty)
?difficulty
:"easy";

const length=LENGTHS[safeDifficulty];

const sequence=shuffle(SYMBOLS)
.slice(0,length);

return{
id:
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
?crypto.randomUUID()
:`symbol-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
difficulty:safeDifficulty,
sequence,
options:shuffle(sequence),
displayDuration:
safeDifficulty==="easy"
?3000
:safeDifficulty==="medium"
?4500
:6000
};
}

export default{
generateSymbolSequence
};