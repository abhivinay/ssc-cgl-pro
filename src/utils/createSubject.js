import createTopic from "./createTopic";

const createSubject=(subject,chapter,topics)=>topics.map((topic,index)=>createTopic({
id:index+1,
subject,
chapter,
...topic
}));

export default createSubject;