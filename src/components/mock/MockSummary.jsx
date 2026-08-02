export default function MockSummary({mock}){
if(!mock)return null;

return(
<div className="card">
<h2>{mock.subject}</h2>
<p>Questions : {mock.questions}</p>
<p>Score : {mock.score}</p>
<p>Accuracy : {mock.accuracy}%</p>
<p>Status : {mock.completed?"Completed":"Pending"}</p>
</div>
);
}