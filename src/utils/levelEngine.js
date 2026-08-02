const LEVEL_XP=500;

const normalizeXP=xp=>{
const value=Number(xp);
return Number.isFinite(value)&&value>=0?value:0;
};

export const getLevel=xp=>{
const value=normalizeXP(xp);
return Math.floor(value/LEVEL_XP)+1;
};

export const getCurrentLevelXP=xp=>{
const value=normalizeXP(xp);
return value%LEVEL_XP;
};

export const getNextLevelXP=()=>LEVEL_XP;

export const getLevelProgress=xp=>{
const current=getCurrentLevelXP(xp);
return Math.min(100,Math.max(0,Math.round((current/LEVEL_XP)*100)));
};

export default{
getLevel,
getCurrentLevelXP,
getNextLevelXP,
getLevelProgress
};