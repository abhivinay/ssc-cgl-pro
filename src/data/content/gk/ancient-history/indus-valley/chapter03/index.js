import storyCards from"./story";
import discoveryCards from"./discovery";
import timelineCards from"./timeline";
import archaeologistCards from"./archaeologists";
import visualCards from"./visuals";
import checkpointQuestions from"./checkpoint";
import revisionCards from"./revision";

const chapter03={
id:"chapter-03",
slug:"discovery-and-timeline",
order:3,
title:"Discovery & Timeline",
subtitle:"Indus Valley Civilization discovery, excavations and chronology.",
estimatedMinutes:26,
difficulty:"beginner",
importance:"very-high",
xpReward:40,
learningObjectives:[
"Indus Valley Civilization discovery history explain cheyyagalagadam.",
"Major archaeologists contributions gurthupettukovadam.",
"Important excavation chronology explain cheyyagalagadam.",
"Early, Mature mariyu Late Harappan phases identify cheyyagalagadam.",
"SSC chronology questions solve cheyyagalagadam."
],
cards:[
...storyCards,
...discoveryCards,
...timelineCards,
...archaeologistCards,
...visualCards
],
checkpoint:{
title:"Chapter 03 Concept Check",
passingPercentage:70,
questions:checkpointQuestions
},
revision:{
title:"Chapter 03 Revision",
cards:revisionCards
},
masteryChecklist:[
"Discovery story explain cheyyagalanu.",
"Cunningham contribution telusu.",
"Daya Ram Sahni contribution telusu.",
"Rakhaldas Banerji contribution telusu.",
"John Marshall contribution telusu.",
"Mortimer Wheeler contribution telusu.",
"Important chronology gurthu undi.",
"Harappan timeline gurthu undi.",
"SSC PYQ level questions solve cheyyagalanu."
]
};

export default chapter03;