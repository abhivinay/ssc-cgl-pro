const mastery = {
  title: "Percentage Mastery",
  description: "Percentage topic mastery unlock requirements.",
  requirements: {
    conceptCheck: {
      minimumAccuracy: 80,
      required: true
    },
    level1: {
      minimumAccuracy: 80,
      required: true
    },
    level2: {
      minimumAccuracy: 75,
      required: true
    },
    level3: {
      minimumAccuracy: 70,
      required: true
    },
    topicTest: {
      minimumAccuracy: 80,
      required: true
    },
    revision: {
      required: true
    },
    flashcards: {
      minimumAccuracy: 80,
      required: true
    },
    commonMistakes: {
      required: true
    }
  },
  scoring: {
    conceptCheck: 10,
    level1: 15,
    level2: 20,
    level3: 20,
    topicTest: 25,
    revision: 5,
    flashcards: 5,
    total: 100
  },
  ranks: [
    {
      name: "Beginner",
      minimumScore: 0,
      maximumScore: 39
    },
    {
      name: "Developing",
      minimumScore: 40,
      maximumScore: 59
    },
    {
      name: "Exam Ready",
      minimumScore: 60,
      maximumScore: 79
    },
    {
      name: "Mastered",
      minimumScore: 80,
      maximumScore: 100
    }
  ],
  completionRule: {
    minimumScore: 80,
    allRequiredModulesComplete: true,
    topicTestMinimumAccuracy: 80,
    statusOnSuccess: "mastered",
    nextTopicUnlock: true
  },
  pyqRequirement: {
    requiredNow: false,
    status: "pending-verified-extraction"
  }
};

export default mastery;