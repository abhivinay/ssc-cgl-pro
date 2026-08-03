const q=(id,question,options,answer,explanation,concept)=>({id,question,options,answer,explanation,concept});
const conceptCheck={title:"Ratio and Proportion Concept Check",description:"Core concepts clear unnayo verify chese quick diagnostic.",timeLimitMinutes:15,passingPercentage:80,questions:[
q("RAP-CC-001","Ratio 45:60 simplest form?",["3:4","4:3","9:10","5:6"],"3:4","HCF 15 tho divide cheyyali.","simplification"),
q("RAP-CC-002","2 kg:500 g equals?",["1:4","4:1","2:5","5:2"],"4:1","2 kg=2000 g; 2000:500=4:1.","units"),
q("RAP-CC-003","a:b::c:d lo correct identity?",["ab=cd","ac=bd","ad=bc","a+d=b+c"],"ad=bc","Extremes product=means product.","proportion"),
q("RAP-CC-004","Mean proportional between 4 and 25?",["10","14.5","20","100"],"10","√(4×25)=10.","mean proportional"),
q("RAP-CC-005","Total divide chesthe denominator enti?",["Ratio difference","Ratio product","Sum of ratio parts","HCF"],"Sum of ratio parts","One part=total/sum of parts.","division"),
q("RAP-CC-006","Workers increase, same work days decrease. Type?",["Direct","Inverse","Equal","Compound"],"Inverse","Workers×days constant.","inverse proportion"),
q("RAP-CC-007","A:B=3:5 ante actual values?",["3 and 5 only","3x and 5x","x+3 and x+5","15x each"],"3x and 5x","Ratio terms are proportional parts.","ratio values"),
q("RAP-CC-008","Same positive number add chesthe smaller:larger ratio?",["Moves toward 1","Moves away from 1","Never changes","Becomes 0"],"Moves toward 1","Relative difference reduces.","ratio change"),
q("RAP-CC-009","Age questions lo constant enti?",["Age ratio","Age sum","Age difference","Individual age"],"Age difference","Both ages same years increase.","ages"),
q("RAP-CC-010","I:E=8:5 ayithe savings parts?",["3","5","8","13"],"3","Savings=income−expenditure.","savings"),
q("RAP-CC-011","Different investment durations lo profit ratio?",["Capital only","Time only","Capital×time","Capital+time"],"Capital×time","Money and duration both matter.","partnership"),
q("RAP-CC-012","A 25% more than B. A:B?",["4:5","5:4","3:4","4:3"],"5:4","125:100=5:4.","percentage ratio")
],resultBands:[{min:80,label:"Ready",action:"Level 1 start cheyyi."},{min:60,label:"Revise",action:"Learn + formulas quick revision."},{min:0,label:"Relearn",action:"Core concepts examples tho malli complete cheyyi."}]};
export default conceptCheck;
