export const createMock=(subject,questions,time)=>{
return{
id:Date.now(),
subject,
questions,
time,
attempted:0,
correct:0,
wrong:0,
score:0,
accuracy:0,
completed:false,
startedAt:null,
endedAt:null
};
};

export const submitMock=(mock)=>{
const score=mock.correct*2;
const accuracy=mock.attempted?Math.round((mock.correct/mock.attempted)*100):0;

return{
...mock,
score,
accuracy,
completed:true,
endedAt:new Date().toISOString()
};
};

export const estimatePerformance=(accuracy)=>{
if(accuracy>=90)return"Excellent";
if(accuracy>=75)return"Very Good";
if(accuracy>=60)return"Good";
if(accuracy>=40)return"Average";
return"Needs Improvement";
};