const randomInteger=(minimum,maximum)=>
Math.floor(Math.random()*(maximum-minimum+1))+minimum;

const DIRECTIONS=[
"up",
"down",
"left",
"right"
];

const DIRECTION_SYMBOLS={
up:"↑",
down:"↓",
left:"←",
right:"→"
};

const LENGTHS={
easy:4,
medium:6,
hard:8
};

export function generateDirectionSequence({
difficulty="easy"
}={}){
const safeDifficulty=
["easy","medium","hard"].includes(difficulty)
?difficulty
:"easy";

const length=LENGTHS[safeDifficulty];

const sequence=Array.from(
{length},
()=>DIRECTIONS[
randomInteger(0,DIRECTIONS.length-1)
]
);

return{
id:
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
?crypto.randomUUID()
:`direction-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
difficulty:safeDifficulty,
sequence,
symbols:sequence.map(
direction=>DIRECTION_SYMBOLS[direction]
),
displayDuration:
safeDifficulty==="easy"
?3000
:safeDifficulty==="medium"
?4200
:5500
};
}

export{
DIRECTIONS,
DIRECTION_SYMBOLS
};

export default{
generateDirectionSequence,
DIRECTIONS,
DIRECTION_SYMBOLS
};