import ancientHistoryLearn from"./learn";
import ancientHistoryVisuals from"./visuals";
import indusValleyLesson from"./indus-valley-lesson";

const ancientHistoryContent={
id:"gk-ancient-history",
topicId:"gk-1",
subject:"gk",
chapter:"History",
name:"Ancient History",
slug:"ancient-history",
description:"Complete SSC-level Ancient History module with Roman Telugu explanations, visuals, practice, PYQs and revision.",
difficulty:"ssc-level",
estimatedMinutes:900,

learn:ancientHistoryLearn,
visuals:ancientHistoryVisuals,

lessons:{
"indus-valley-civilization":indusValleyLesson
},

conceptCheck:[],
practice:{
level1:[],
level2:[],
level3:[]
},
topicTest:{
config:null,
questions:[]
},
pyqs:[],
revision:null,

metadata:{
version:"1.0.0",
status:"in-progress",
sscAligned:true,
pyqVerified:false,
contentReviewed:false,
language:"roman-telugu",
lastUpdated:new Date().toISOString()
}
};

export const getAncientHistoryLesson=lessonId=>
ancientHistoryContent.lessons[String(lessonId)]||null;

export const getAncientHistoryContent=()=>ancientHistoryContent;

export default ancientHistoryContent;