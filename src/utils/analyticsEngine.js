const analytics=(topics)=>{
const total=topics.length;
const completed=topics.filter(t=>t.completed).length;
const progress=Math.round((completed/total)*100);
const xp=topics.reduce((sum,t)=>sum+t.xp,0);
return{
total,
completed,
progress,
xp
};
};
export default analytics;