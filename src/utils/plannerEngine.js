const plannerEngine=(missions,hours=9)=>{
const totalMinutes=hours*60;
const each=Math.floor(totalMinutes/Math.max(missions.length,1));
return missions.map(mission=>({
...mission,
allocatedMinutes:each
}));
};
export default plannerEngine;