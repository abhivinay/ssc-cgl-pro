const statisticsEngine=topics=>{

const total=topics.length;

const completed=topics.filter(t=>t.completed).length;

const unlocked=topics.filter(t=>t.unlocked).length;

const revision=topics.filter(t=>t.revisionLevel>0).length;

const accuracy=Math.round(
topics.reduce((a,b)=>a+b.accuracy,0)/Math.max(total,1)
);

return{
total,
completed,
unlocked,
revision,
accuracy
};

};

export default statisticsEngine;