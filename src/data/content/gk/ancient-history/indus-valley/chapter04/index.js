import siteCards from"./sites";
import mapCards from"./map";
import discoveryCards from"./discoveries";
import visualCards from"./visuals";
import checkpointQuestions from"./checkpoint";
import revisionCards from"./revision";

const chapter04={
id:"chapter-04",
slug:"major-sites-and-discoveries",
order:4,
title:"Major Sites & Discoveries",
subtitle:"Complete study of important Harappan sites, discoveries and geographical distribution.",
estimatedMinutes:30,
difficulty:"beginner",
importance:"very-high",
xpReward:45,
learningObjectives:[
"Major Harappan sites identify cheyyagalagadam.",
"Site-State-River matching cheyyagalagadam.",
"Important discoveries gurthu pettukovadam.",
"Geographical spread explain cheyyagalagadam.",
"SSC PYQs solve cheyyagalagadam."
],
cards:[
...siteCards,
...mapCards,
...discoveryCards,
...visualCards
],
checkpoint:{
title:"Chapter 04 Concept Check",
passingPercentage:70,
questions:checkpointQuestions
},
revision:{
title:"Chapter 04 Revision",
cards:revisionCards
},
masteryChecklist:[
"Harappa location gurthu undi.",
"Mohenjo-daro location gurthu undi.",
"Dholavira location gurthu undi.",
"Lothal location gurthu undi.",
"Kalibangan location gurthu undi.",
"Rakhigarhi location gurthu undi.",
"Great Bath location telusu.",
"Dockyard location telusu.",
"Granary location telusu.",
"Reservoir system telusu.",
"Extreme sites gurthu unnayi.",
"Site-River matching cheyyagalanu.",
"SSC level questions solve cheyyagalanu."
]
};

export default chapter04;