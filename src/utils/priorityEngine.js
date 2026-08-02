const priorityScore=(topic)=>{
return(
topic.weightage*5+
topic.trend*4+
(6-topic.priority)*3+
(topic.unlocked?20:0)+
(topic.completed?0:50)
);
};

export default priorityScore;