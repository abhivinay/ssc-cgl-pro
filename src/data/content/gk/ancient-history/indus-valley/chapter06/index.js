import agricultureCards from"./agriculture";
import tradeCards from"./trade";
import economyCards from"./economy";
import visualCards from"./visuals";
import checkpointQuestions from"./checkpoint";
import revisionCards from"./revision";

const chapter06={
id:"chapter-06",
slug:"agriculture-trade-and-economy",
order:6,
title:"Agriculture, Trade & Economy",
subtitle:"Complete study of Harappan agriculture, trade, industries and economy.",
estimatedMinutes:35,
difficulty:"beginner",
importance:"very-high",
xpReward:50,
learningObjectives:[
"Harappan agriculture explain cheyyagalagadam.",
"Major crops gurthu pettukovadam.",
"Internal mariyu external trade ardham chesukovadam.",
"Craft industries importance telusukovadam.",
"Bronze Age economy explain cheyyagalagadam.",
"SSC PYQs confidently solve cheyyagalagadam."
],
cards:[
...agricultureCards,
...tradeCards,
...economyCards,
...visualCards
],
checkpoint:{
title:"Chapter 06 Concept Check",
passingPercentage:70,
questions:checkpointQuestions
},
revision:{
title:"Chapter 06 Revision",
cards:revisionCards
},
masteryChecklist:[
"Agriculture explain cheyyagalanu.",
"Major crops gurthu unnayi.",
"Kalibangan importance telusu.",
"Lothal importance telusu.",
"Mesopotamia trade gurthu undi.",
"Craft industries explain cheyyagalanu.",
"Bronze Age concept telusu.",
"Standard weights purpose telusu.",
"No coin evidence gurthu undi.",
"SSC level questions solve cheyyagalanu."
]
};

export default chapter06;