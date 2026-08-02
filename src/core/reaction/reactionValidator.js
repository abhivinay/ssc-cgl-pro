export function validateReaction({
signalShown=false,
clickedAt=0,
signalAt=0
}={}){
const clicked=Number(clickedAt)||0;
const signal=Number(signalAt)||0;

if(!signalShown||clicked<signal){
return{
valid:false,
tooEarly:true,
reactionTime:0
};
}

return{
valid:true,
tooEarly:false,
reactionTime:Math.max(0,clicked-signal)
};
}

export function getReactionRating(
reactionTime=0
){
const value=Math.max(
0,
Number(reactionTime)||0
);

if(value===0)return"invalid";
if(value<=200)return"excellent";
if(value<=300)return"good";
if(value<=450)return"average";
return"slow";
}

export default{
validateReaction,
getReactionRating
};