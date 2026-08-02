import societyCards from"./society";
import religionCards from"./religion";
import dailyLifeCards from"./dailylife";
import visualCards from"./visuals";
import checkpointQuestions from"./checkpoint";
import revisionCards from"./revision";

const chapter07={
id:"chapter-07",
slug:"society-religion-and-daily-life",
order:7,
title:"Society, Religion & Daily Life",
subtitle:"Complete study of Harappan social life, religious beliefs and everyday lifestyle.",
estimatedMinutes:35,
difficulty:"beginner",
importance:"very-high",
xpReward:50,
learningObjectives:[
"Harappan society explain cheyyagalagadam.",
"Major occupations identify cheyyagalagadam.",
"Dress, food and entertainment gurthu pettukovadam.",
"Mother Goddess and Pashupati Seal concepts ardham chesukovadam.",
"Daily life and sanitation importance explain cheyyagalagadam.",
"SSC PYQs confidently solve cheyyagalagadam."
],
cards:[
...societyCards,
...religionCards,
...dailyLifeCards,
...visualCards
],
checkpoint:{
title:"Chapter 07 Concept Check",
passingPercentage:70,
questions:checkpointQuestions
},
revision:{
title:"Chapter 07 Revision",
cards:revisionCards
},
masteryChecklist:[
"Harappan society explain cheyyagalanu.",
"Major occupations gurthu unnayi.",
"Dress & ornaments telusu.",
"Food habits gurthu unnayi.",
"Mother Goddess concept telusu.",
"Pashupati Seal explain cheyyagalanu.",
"Fire Altars location gurthu undi.",
"Daily life explain cheyyagalanu.",
"SSC level questions solve cheyyagalanu."
]
};

export default chapter07;