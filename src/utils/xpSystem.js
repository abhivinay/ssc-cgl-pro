const XP=Object.freeze({
learn:20,
practice:40,
pyq:60,
revision:30,
topicComplete:100,
dailyMission:150,
mockComplete:300,
streakBonus:50
});

const getValue=key=>{
const value=Number(XP[key]);
return Number.isFinite(value)&&value>=0?value:0;
};

export const getStageXP=stage=>getValue(stage);

export const getTopicCompletionXP=()=>getValue("topicComplete");

export const getDailyMissionXP=()=>getValue("dailyMission");

export const getMockXP=()=>getValue("mockComplete");

export const getStreakBonus=()=>getValue("streakBonus");

export default XP;