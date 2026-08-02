import planningCards from"./planning";
import architectureCards from"./architecture";
import drainageCards from"./drainage";
import visualCards from"./visuals";
import checkpointQuestions from"./checkpoint";
import revisionCards from"./revision";

const chapter05={
id:"chapter-05",
slug:"town-planning-and-architecture",
order:5,
title:"Town Planning, Architecture & Drainage",
subtitle:"Complete study of Harappan urban planning, buildings and sanitation.",
estimatedMinutes:35,
difficulty:"beginner",
importance:"very-high",
xpReward:50,
learningObjectives:[
"Harappan town planning explain cheyyagalagadam.",
"Grid pattern identify cheyyagalagadam.",
"Citadel mariyu Lower Town difference explain cheyyagalagadam.",
"Harappan architecture features gurthu pettukovadam.",
"Drainage system working ardham chesukovadam.",
"SSC PYQs confidently solve cheyyagalagadam."
],
cards:[
...planningCards,
...architectureCards,
...drainageCards,
...visualCards
],
checkpoint:{
title:"Chapter 05 Concept Check",
passingPercentage:70,
questions:checkpointQuestions
},
revision:{
title:"Chapter 05 Revision",
cards:revisionCards
},
masteryChecklist:[
"Town planning explain cheyyagalanu.",
"Grid pattern gurthu undi.",
"Brick ratio 1:2:4 gurthu undi.",
"Citadel & Lower Town difference telusu.",
"House architecture explain cheyyagalanu.",
"Drainage system explain cheyyagalanu.",
"Public buildings identify cheyyagalanu.",
"Dholavira reservoirs importance telusu.",
"SSC level questions solve cheyyagalanu."
]
};

export default chapter05;