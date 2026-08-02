export const STAGES=Object.freeze([
"learn",
"conceptCheck",
"level1",
"level2",
"level3",
"topicTest",
"pyq",
"revision"
]);

export const STAGE_LABELS=Object.freeze({
learn:"Learn",
conceptCheck:"Concept Check",
level1:"Level 1",
level2:"Level 2",
level3:"Level 3",
topicTest:"Topic Test",
pyq:"PYQ",
revision:"Revision"
});

export const STAGE_ALIASES=Object.freeze({
learn:"learn",
conceptcheck:"conceptCheck",
"concept-check":"conceptCheck",
conceptCheck:"conceptCheck",
level1:"level1",
"level-1":"level1",
level2:"level2",
"level-2":"level2",
level3:"level3",
"level-3":"level3",
topictest:"topicTest",
"topic-test":"topicTest",
topicTest:"topicTest",
pyq:"pyq",
revision:"revision"
});

export const STAGE_XP=Object.freeze({
learn:10,
conceptCheck:10,
level1:15,
level2:20,
level3:25,
topicTest:30,
pyq:25,
revision:15
});

export const REVISION_DAYS=Object.freeze([
1,
3,
7,
15,
30
]);

export const MIN_TOPIC_TEST_SCORE=70;