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

const SETS={
easy:[
["2","4","6","8","9"],
["10","20","30","40","45"],
["A","E","I","O","B"],
["▲","▲","▲","▲","■"],
["🔴","🔴","🔴","🔴","🔵"]
],
medium:[
["3","6","9","12","14"],
["16","25","36","49","50"],
["CAT","DOG","COW","LION","ROSE"],
["NORTH","SOUTH","EAST","WEST","UP"],
["2","3","5","7","9"]
],
hard:[
["8","27","64","125","144"],
["121","144","169","196","200"],
["AB","CD","EF","GH","GI"],
["1","4","9","16","24"],
["11","22","33","44","46"]
]
};

export function generateOddOneOutQuestion({
difficulty="easy"
}={}){
const safeDifficulty=
["easy","medium","hard"].includes(difficulty)
?difficulty
:"easy";

const source=randomItem(
SETS[safeDifficulty]
);

const items=shuffle(source);
const answer=source[source.length-1];

return{
id:
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
?crypto.randomUUID()
:`odd-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
difficulty:safeDifficulty,
items,
answer
};
}

export default{
generateOddOneOutQuestion
};