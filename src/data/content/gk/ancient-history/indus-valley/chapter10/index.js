import mindmapCards from"./mindmap";
import flashcardCards from"./flashcards";
import lastMinuteCards from"./lastminute";

const chapter10={
id:"chapter-10",
slug:"ultimate-revision",
order:10,
title:"Ultimate Revision & Memory Boost",
subtitle:"Complete one-shot revision of the Indus Valley Civilization.",
estimatedMinutes:25,
difficulty:"revision",
importance:"highest",
xpReward:40,
learningObjectives:[
"Complete chapter ni 20–25 minutes lo revise cheyyadam.",
"Important dates, sites and discoveries recall cheyyadam.",
"Art, script and economy revise cheyyadam.",
"Decline theories identify cheyyadam.",
"SSC exam ki final revision complete cheyyadam."
],
cards:[
...mindmapCards,
...flashcardCards,
...lastMinuteCards
],
checkpoint:null,
revision:{
title:"Final Revision",
cards:[
...mindmapCards,
...flashcardCards,
...lastMinuteCards
]
},
masteryChecklist:[
"Complete timeline gurthu undi.",
"All major sites gurthu unnayi.",
"All discoveries gurthu unnayi.",
"Town planning revise ayindi.",
"Economy revise ayindi.",
"Society & Religion revise ayindi.",
"Art & Script revise ayindi.",
"Decline theories revise ayyayi.",
"SSC One-liners complete.",
"Exam ki ready."
]
};

export default chapter10;