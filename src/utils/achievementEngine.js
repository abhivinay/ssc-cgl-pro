const achievementEngine=({xp,streak,completedTopics,mocks})=>{
const achievements=[];

if(xp>=500)achievements.push("Bronze Scholar");
if(xp>=2000)achievements.push("Silver Scholar");
if(xp>=5000)achievements.push("Gold Scholar");

if(streak>=7)achievements.push("7 Day Streak");
if(streak>=30)achievements.push("30 Day Streak");

if(completedTopics>=10)achievements.push("10 Topics Mastered");
if(completedTopics>=50)achievements.push("50 Topics Mastered");

if(mocks>=10)achievements.push("Mock Warrior");

return achievements;
};

export default achievementEngine;