const mastery = {
  "id": "sci-mastery",
  "title": "Topic Mastery",
  "requirements": {
    "learnReadPercentage": 90,
    "formulaRecallAccuracy": 85,
    "shortcutsPractised": 24,
    "examplesSolved": 20,
    "conceptCheckCorrect": 10,
    "level1Accuracy": 80,
    "level2Accuracy": 75,
    "level3Accuracy": 70,
    "topicTestMinimumScore": 35,
    "verifiedPyqs": "required after extraction"
  },
  "badges": [
    {
      "id": "interest-foundation",
      "name": "Interest Foundation",
      "condition": "Complete learn and formulas"
    },
    {
      "id": "compound-speed",
      "name": "Compound Speed",
      "condition": "Complete shortcuts and examples"
    },
    {
      "id": "ssc-interest-master",
      "name": "SSC Interest Master",
      "condition": "Pass all levels and topic test"
    }
  ],
  "unlockRule": "All non-PYQ requirements must pass; final verified mastery activates after PYQ set is available."
};

export default mastery;
