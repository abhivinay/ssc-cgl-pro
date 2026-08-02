import metadata from"./metadata";
import chapter01 from"./chapter01";
import chapter02 from"./chapter02";

const chapters=[
chapter01,
chapter02
].sort((first,second)=>first.order-second.order);

const indusValleyContent={
...metadata,
chapters,
learn:{
title:metadata.title,
description:"Indus Valley Civilization complete interactive SSC course.",
chapters,
estimatedMinutes:chapters.reduce(
(total,chapter)=>total+(Number(chapter.estimatedMinutes)||0),
0
)
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
mastery:null
};

export const getIndusValleyChapter=chapterId=>
chapters.find(
chapter=>
chapter.id===String(chapterId)||
chapter.slug===String(chapterId)
)||null;

export const getIndusValleyChapters=()=>chapters;

export default indusValleyContent;