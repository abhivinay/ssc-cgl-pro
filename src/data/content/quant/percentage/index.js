import percentageLearn from"./learn";
import percentageFormulas from"./formulas";
import percentageShortcuts from"./shortcuts";
import percentageExamples from"./examples";
import percentageConceptCheck from"./conceptCheck";
import percentageLevel1 from"./level1";
import percentageLevel2 from"./level2";
import percentageLevel3 from"./level3";
import percentageTopicTest,{
percentageTopicTestConfig
}from"./topicTest";
import percentagePYQs from"./pyqs";
import percentageRevision from"./revision";

const percentageContent={
id:"quant-percentage",
subject:"quant",
chapter:"Arithmetic",
name:"Percentage",
slug:"percentage",
description:"Complete SSC-level Percentage learning module from basics to advanced practice.",
estimatedMinutes:270,
difficulty:"ssc-level",

learn:percentageLearn,
formulas:percentageFormulas,
shortcuts:percentageShortcuts,
examples:percentageExamples,
conceptCheck:percentageConceptCheck,

practice:{
level1:percentageLevel1,
level2:percentageLevel2,
level3:percentageLevel3
},

topicTest:{
config:percentageTopicTestConfig,
questions:percentageTopicTest
},

pyqs:percentagePYQs,
revision:percentageRevision,

metadata:{
version:"1.0.0",
status:"in-progress",
sscAligned:true,
pyqVerified:false,
contentReviewed:false,
lastUpdated:new Date().toISOString()
}
};

export const getPercentageContent=()=>percentageContent;

export default percentageContent;