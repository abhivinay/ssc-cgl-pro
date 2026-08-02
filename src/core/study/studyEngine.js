import{
calculateTopicProgress,
calculateSubjectProgress,
calculateOverallProgress,
updateTopicProgress
}from"./progressEngine";

import{
unlockNextTopic,
getUnlockedTopics,
getLockedTopics,
getNextUnlockedTopic,
isTopicUnlocked
}from"./unlockEngine";

import{
createRevisionSchedule,
getDueRevisions,
completeRevision
}from"./revisionScheduler";

import{
getCurrentMission,
getTodayMission
}from"./missionEngine";

import{
normalizeStage,
canStartStage,
isTopicComplete,
getFirstIncompleteStage,
getCompletedStageCount
}from"./validators";

const studyEngine={
calculateTopicProgress,
calculateSubjectProgress,
calculateOverallProgress,
updateTopicProgress,

unlockNextTopic,
getUnlockedTopics,
getLockedTopics,
getNextUnlockedTopic,
isTopicUnlocked,

createRevisionSchedule,
getDueRevisions,
completeRevision,

getCurrentMission,
getTodayMission,

normalizeStage,
canStartStage,
isTopicComplete,
getFirstIncompleteStage,
getCompletedStageCount
};

export default studyEngine;