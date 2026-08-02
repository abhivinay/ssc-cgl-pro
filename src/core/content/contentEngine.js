import topics,{
getAllTopics,
getTopicById,
getTopicBySlug,
getTopicsBySubject
}from"../../data/content/topics";

const createLookup=indexKey=>{
const map=new Map();

topics.forEach(topic=>{
const value=topic[indexKey];

if(value){
map.set(String(value),topic);
}
});

return map;
};

const idLookup=createLookup("id");
const slugLookup=createLookup("slug");

export const contentEngine={

getTopics(){
return getAllTopics();
},

getTopic(id){
return idLookup.get(String(id))||null;
},

getTopicBySlug(slug){
return slugLookup.get(String(slug))||null;
},

getSubject(subject){
return getTopicsBySubject(subject);
},

exists(id){
return idLookup.has(String(id));
},

search(keyword=""){
const query=String(keyword).trim().toLowerCase();

if(!query){
return topics;
}

return topics.filter(topic=>
topic.name.toLowerCase().includes(query)||
topic.chapter.toLowerCase().includes(query)||
topic.description.toLowerCase().includes(query)||
topic.subtopics.some(item=>
item.toLowerCase().includes(query)
)
);
},

getTopicStats(){
return{
totalTopics:topics.length,
subjects:[
...new Set(
topics.map(topic=>topic.subject)
)
],
totalSubtopics:topics.reduce(
(total,topic)=>
total+topic.subtopics.length,
0
)
};
}

};

export default contentEngine;