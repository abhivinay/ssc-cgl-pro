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

const randomItem=items=>
items[randomInteger(0,items.length-1)];

const COLORS=[
"🔴",
"🟢",
"🔵",
"🟡",
"🟣",
"🟠",
"⚫",
"⚪"
];

const SHAPES=[
"▲",
"■",
"●",
"◆",
"★",
"♥",
"⬢",
"⬟"
];

const LETTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const NUMBERS=[
1,2,3,4,5,6,7,8,9
];

const SYMBOLS=[
"☀",
"☂",
"☁",
"⚡",
"❄",
"🔥",
"🌙",
"⭐"
];

const POOLS={
colors:COLORS,
shapes:SHAPES,
letters:LETTERS,
numbers:NUMBERS,
symbols:SYMBOLS
};

const DIFFICULTY_LENGTH={
easy:4,
medium:6,
hard:8
};

export function generateSequence({
difficulty="easy"
}={}){

const safeDifficulty=
["easy","medium","hard"].includes(difficulty)
?difficulty
:"easy";

const categories=Object.keys(POOLS);

const category=randomItem(categories);

const pool=[...POOLS[category]];

const length=
DIFFICULTY_LENGTH[safeDifficulty];

const sequence=shuffle(pool)
.slice(0,length);

return{
id:
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
?crypto.randomUUID()
:`sequence-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
difficulty:safeDifficulty,
category,
sequence,
displayDuration:
safeDifficulty==="easy"
?3000
:safeDifficulty==="medium"
?4500
:6000
};

}

export default{
generateSequence
};