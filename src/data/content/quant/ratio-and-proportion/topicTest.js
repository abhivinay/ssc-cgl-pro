import level1 from "./level1";
import level2 from "./level2";
import level3 from "./level3";
const topicTest={title:"Ratio and Proportion Topic Test",description:"Mixed SSC CGL test covering complete topic.",timeLimitMinutes:30,totalMarks:25,negativeMarking:0.5,passingPercentage:70,instructions:["25 questions attempt cheyyi.","Calculator use cheyyaku.","Wrong answer ki 0.5 negative.","Submit tarvata concept-wise mistakes analyze cheyyi."],questions:[...level1.questions.slice(0,8),...level2.questions.slice(0,9),...level3.questions.slice(0,8)].map((x,i)=>({...x,id:`RAP-TT-${String(i+1).padStart(3,"0")}`})),scoreBands:[{min:85,label:"Mastered",action:"PYQs start cheyyi."},{min:70,label:"Qualified",action:"Wrong concepts revise chesi PYQs start cheyyi."},{min:50,label:"Needs Revision",action:"Formulas, shortcuts, Level 2 repeat cheyyi."},{min:0,label:"Relearn",action:"Learn module nunchi restart cheyyi."}]};
export default topicTest;
