import{
createTopicSchema,
SUBJECTS,
DIFFICULTIES
}from"../../types/contentSchema";

const topics=[
createTopicSchema({
id:"quant-percentage",
subject:SUBJECTS.QUANT,
chapter:"Arithmetic",
name:"Percentage",
slug:"percentage",
description:"Master percentage concepts, conversions, increase and decrease, reverse percentage, successive percentage and SSC exam applications.",
estimatedMinutes:270,
difficulty:DIFFICULTIES.SSC_LEVEL,
prerequisites:[
"Basic arithmetic",
"Fractions",
"Decimals",
"Ratio basics"
],
objectives:[
"Convert fractions and decimals into percentages quickly.",
"Solve percentage increase and decrease questions.",
"Handle successive percentage changes.",
"Solve reverse percentage problems.",
"Apply percentages in marks, salary, population, profit and data interpretation.",
"Use SSC calculation shortcuts with speed and accuracy."
],
subtopics:[
"Meaning of Percentage",
"Fraction to Percentage",
"Decimal to Percentage",
"Percentage to Fraction",
"Percentage Increase",
"Percentage Decrease",
"Percentage Change",
"Successive Percentage Change",
"Reverse Percentage",
"Population Change",
"Marks and Salary Problems",
"Percentage Comparison",
"Application in Profit and Loss",
"Application in Data Interpretation"
],
metadata:{
version:"1.0.0",
status:"draft",
author:"Sentinel",
sscAligned:true,
pyqVerified:false,
contentReviewed:false
}
})
];

export const getAllTopics=()=>topics;

export const getTopicById=topicId=>
topics.find(
topic=>topic.id===String(topicId)
)||null;

export const getTopicBySlug=slug=>
topics.find(
topic=>topic.slug===String(slug)
)||null;

export const getTopicsBySubject=subject=>
topics.filter(
topic=>topic.subject===subject
);

export default topics;