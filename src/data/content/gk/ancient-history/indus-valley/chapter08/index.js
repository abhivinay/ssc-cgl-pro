import artCards from"./art";
import scriptCards from"./script";
import artifactCards from"./artifacts";
import visualCards from"./visuals";
import checkpointQuestions from"./checkpoint";
import revisionCards from"./revision";

const chapter08={
id:"chapter-08",
slug:"art-script-and-artifacts",
order:8,
title:"Art, Script & Artifacts",
subtitle:"Complete study of Harappan art, writing system and archaeological objects.",
estimatedMinutes:35,
difficulty:"beginner",
importance:"very-high",
xpReward:50,
learningObjectives:[
"Harappan art explain cheyyagalagadam.",
"Dancing Girl and Priest-King identify cheyyagalagadam.",
"Harappan Script features gurthu pettukovadam.",
"Important artifacts identify cheyyagalagadam.",
"SSC PYQs confidently solve cheyyagalagadam."
],
cards:[
...artCards,
...scriptCards,
...artifactCards,
...visualCards
],
checkpoint:{
title:"Chapter 08 Concept Check",
passingPercentage:70,
questions:checkpointQuestions
},
revision:{
title:"Chapter 08 Revision",
cards:revisionCards
},
masteryChecklist:[
"Dancing Girl gurthu undi.",
"Priest-King gurthu undi.",
"Harappan Script features telusu.",
"Seal material gurthu undi.",
"Unicorn importance telusu.",
"Pottery characteristics telusu.",
"Bead industry telusu.",
"Bronze Age concept gurthu undi.",
"SSC level questions solve cheyyagalanu."
]
};

export default chapter08;