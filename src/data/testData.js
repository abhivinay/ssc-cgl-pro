import testCatalog from "./testCatalog";
import { getQuestionsByIds } from "./questionBank";

const testData=testCatalog.map(test=>({
...test,
questions:getQuestionsByIds(test.questionIds)
}));

export const getAllTests=()=>testData;

export const getTestById=id=>
testData.find(test=>test.id===id)||null;

export const getTestsByTopic=topic=>
testData.filter(test=>
String(test.topic||"").trim().toLowerCase()===
String(topic||"").trim().toLowerCase()
);

export const getTestsBySubject=subject=>
testData.filter(test=>
String(test.subject||"").trim().toLowerCase()===
String(subject||"").trim().toLowerCase()
);

export default testData;