import level1 from "./level1";
import level2 from "./level2";
import level3 from "./level3";

const topicTest = {
  title: "Profit and Loss Topic Test",
  description: "Complete Profit, Loss and Discount topic covering basic, moderate and advanced SSC CGL patterns.",
  timeLimitMinutes: 30,
  totalQuestions: 25,
  totalMarks: 50,
  marksPerCorrect: 2,
  negativeMarking: 0.5,
  passingPercentage: 70,
  instructions: [
    "25 questions 30 minutes lo attempt cheyyi.",
    "Calculator use cheyyaku.",
    "Correct answer ki 2 marks; wrong answer ki 0.5 negative.",
    "Submit tarvata concept-wise mistakes analyze cheyyi."
  ],
  questions: [
    ...level1.questions.slice(0, 8),
    ...level2.questions.slice(0, 9),
    ...level3.questions.slice(0, 8)
  ].map((question, index) => ({ ...question, id: `PL-TT-${String(index + 1).padStart(3, "0")}` })),
  scoreBands: [
    { min: 85, label: "Mastered", action: "Revision schedule follow cheyyi; verified PYQs ready ayyaka attempt cheyyi." },
    { min: 70, label: "Qualified", action: "Wrong concepts revise chesi retry cheyyi." },
    { min: 50, label: "Needs Revision", action: "Formulas, shortcuts and Level 2 repeat cheyyi." },
    { min: 0, label: "Relearn", action: "Learn module nunchi restart cheyyi." }
  ]
};

export default topicTest;
