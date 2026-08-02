const randomInteger=(minimum,maximum)=>
Math.floor(Math.random()*(maximum-minimum+1))+minimum;

const COLORS=[
"red",
"green",
"blue",
"yellow",
"purple",
"orange"
];

const SHAPES=[
"circle",
"square",
"triangle"
];

export function generateReactionChallenge({
difficulty="easy"
}={}){

const safeDifficulty=
["easy","medium","hard"].includes(difficulty)
?difficulty
:"easy";

const delay=
safeDifficulty==="easy"
?randomInteger(1500,3000)
:safeDifficulty==="medium"
?randomInteger(2000,4000)
:randomInteger(2500,5000);

const color=
COLORS[randomInteger(0,COLORS.length-1)];

const shape=
SHAPES[randomInteger(0,SHAPES.length-1)];

return{
id:
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
?crypto.randomUUID()
:`reaction-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
difficulty:safeDifficulty,
delay,
color,
shape
};

}

export default{
generateReactionChallenge
};