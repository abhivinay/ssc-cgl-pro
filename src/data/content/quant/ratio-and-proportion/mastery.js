const mastery = {
  title: "Ratio and Proportion Mastery",
  description: "Topic complete ani mark cheyyadaniki required learning, accuracy, speed, revision and error-correction gates.",
  topicId: "ratio-and-proportion",
  version: 1,
  masteryThreshold: 85,
  mandatoryModules: [
    "learn",
    "formulas",
    "shortcuts",
    "examples",
    "conceptCheck",
    "level1",
    "level2",
    "level3",
    "topicTest",
    "revision",
    "flashcards",
    "commonMistakes"
  ],
  learningObjectives: [
    {
      id: "RAP-MO-001",
      objective: "Same-unit quantities-ni simplest ratio lo express cheyyagalagali.",
      evidence: ["conceptCheck", "level1"]
    },
    {
      id: "RAP-MO-002",
      objective: "Proportion, mean, third and fourth proportional questions solve cheyyagalagali.",
      evidence: ["level1", "level2"]
    },
    {
      id: "RAP-MO-003",
      objective: "Total or difference nunchi actual shares fast-ga calculate cheyyagalagali.",
      evidence: ["level1", "topicTest"]
    },
    {
      id: "RAP-MO-004",
      objective: "Two or more linked ratios-ni common term equal chesi combine cheyyagalagali.",
      evidence: ["level2", "level3"]
    },
    {
      id: "RAP-MO-005",
      objective: "Direct and inverse proportion correct-ga distinguish cheyyagalagali.",
      evidence: ["conceptCheck", "level2"]
    },
    {
      id: "RAP-MO-006",
      objective: "Addition, subtraction and changing-ratio equations form cheyyagalagali.",
      evidence: ["level2", "level3"]
    },
    {
      id: "RAP-MO-007",
      objective: "Age, income-expenditure and partnership ratio applications solve cheyyagalagali.",
      evidence: ["level2", "level3", "topicTest"]
    },
    {
      id: "RAP-MO-008",
      objective: "Percentage comparisons-ni ratio form-loki and reverse-ga convert cheyyagalagali.",
      evidence: ["level2", "level3"]
    },
    {
      id: "RAP-MO-009",
      objective: "Componendo-dividendo and derived-ratio questions solve cheyyagalagali.",
      evidence: ["level3", "topicTest"]
    },
    {
      id: "RAP-MO-010",
      objective: "Common mistakes-ni identify chesi corrected method-ni repeat attempt lo apply cheyyagalagali.",
      evidence: ["commonMistakes", "errorLog"]
    }
  ],
  gates: [
    {
      id: "RAP-MG-001",
      module: "learn",
      requirement: "All concept sections complete",
      minimum: 100,
      unit: "percent-completion",
      blocksNext: true
    },
    {
      id: "RAP-MG-002",
      module: "formulas",
      requirement: "Formula recall accuracy",
      minimum: 85,
      unit: "percent",
      blocksNext: true
    },
    {
      id: "RAP-MG-003",
      module: "conceptCheck",
      requirement: "Concept Check score",
      minimum: 80,
      unit: "percent",
      blocksNext: true
    },
    {
      id: "RAP-MG-004",
      module: "level1",
      requirement: "Level 1 score",
      minimum: 80,
      unit: "percent",
      blocksNext: true
    },
    {
      id: "RAP-MG-005",
      module: "level2",
      requirement: "Level 2 score",
      minimum: 75,
      unit: "percent",
      blocksNext: true
    },
    {
      id: "RAP-MG-006",
      module: "level3",
      requirement: "Level 3 score",
      minimum: 70,
      unit: "percent",
      blocksNext: true
    },
    {
      id: "RAP-MG-007",
      module: "topicTest",
      requirement: "Topic Test score after negative marking",
      minimum: 70,
      unit: "percent",
      blocksNext: true
    },
    {
      id: "RAP-MG-008",
      module: "flashcards",
      requirement: "Formula and rule recall",
      minimum: 85,
      unit: "percent",
      blocksNext: false
    },
    {
      id: "RAP-MG-009",
      module: "commonMistakes",
      requirement: "All logged mistakes corrected in retry",
      minimum: 100,
      unit: "percent-resolved",
      blocksNext: true
    },
    {
      id: "RAP-MG-010",
      module: "revision",
      requirement: "Day 1, Day 3 and Day 7 revisions complete",
      minimum: 3,
      unit: "sessions",
      blocksNext: true
    }
  ],
  scoreWeights: {
    conceptCheck: 10,
    level1: 15,
    level2: 20,
    level3: 20,
    topicTest: 25,
    formulaRecall: 5,
    mistakeResolution: 5
  },
  calculation: {
    formula: "Sum of each normalized module score × its weight / 100",
    rounding: "nearest-whole-number",
    maximumScore: 100,
    masteryRequiresAllBlockingGates: true
  },
  speedTargets: [
    {
      difficulty: "basic",
      targetSecondsPerQuestion: 45,
      minimumAccuracy: 90
    },
    {
      difficulty: "moderate",
      targetSecondsPerQuestion: 60,
      minimumAccuracy: 80
    },
    {
      difficulty: "advanced",
      targetSecondsPerQuestion: 90,
      minimumAccuracy: 70
    },
    {
      difficulty: "mixed-topic-test",
      targetSecondsPerQuestion: 72,
      minimumAccuracy: 75
    }
  ],
  statusBands: [
    {
      min: 90,
      max: 100,
      status: "mastered",
      label: "Mastered",
      action: "Scheduled revision continue cheyyi; verified PYQs available ayyaka attempt cheyyi."
    },
    {
      min: 85,
      max: 89,
      status: "exam-ready",
      label: "Exam Ready",
      action: "Wrong questions reattempt chesi Day 7 revision complete cheyyi."
    },
    {
      min: 70,
      max: 84,
      status: "needs-practice",
      label: "Needs Practice",
      action: "Weak concepts identify chesi corresponding level repeat cheyyi."
    },
    {
      min: 50,
      max: 69,
      status: "needs-revision",
      label: "Needs Revision",
      action: "Learn, formulas, examples and Level 1 nunchi targeted revision cheyyi."
    },
    {
      min: 0,
      max: 49,
      status: "relearn",
      label: "Relearn",
      action: "Topic-ni fundamentals nunchi restart cheyyi."
    }
  ],
  remediationRoutes: [
    {
      weakness: "units-and-simplification",
      modules: ["learn", "formulas", "level1"],
      retryQuestions: 10
    },
    {
      weakness: "proportion-formulas",
      modules: ["formulas", "shortcuts", "level1"],
      retryQuestions: 10
    },
    {
      weakness: "linked-ratios",
      modules: ["examples", "shortcuts", "level2"],
      retryQuestions: 12
    },
    {
      weakness: "direct-inverse-proportion",
      modules: ["learn", "examples", "level2"],
      retryQuestions: 12
    },
    {
      weakness: "ratio-change-and-ages",
      modules: ["examples", "level2", "level3"],
      retryQuestions: 15
    },
    {
      weakness: "income-percentage-partnership",
      modules: ["formulas", "level2", "level3"],
      retryQuestions: 15
    },
    {
      weakness: "speed",
      modules: ["shortcuts", "topicTest"],
      retryQuestions: 20
    },
    {
      weakness: "careless-errors",
      modules: ["commonMistakes", "errorLog", "topicTest"],
      retryQuestions: 10
    }
  ],
  completionChecklist: [
    {
      id: "RAP-MC-001",
      label: "Learn module complete",
      required: true
    },
    {
      id: "RAP-MC-002",
      label: "55 formulas reviewed",
      required: true
    },
    {
      id: "RAP-MC-003",
      label: "30 shortcuts reviewed",
      required: true
    },
    {
      id: "RAP-MC-004",
      label: "All solved examples worked without copying",
      required: true
    },
    {
      id: "RAP-MC-005",
      label: "Concept Check passed",
      required: true
    },
    {
      id: "RAP-MC-006",
      label: "Level 1, Level 2 and Level 3 gates passed",
      required: true
    },
    {
      id: "RAP-MC-007",
      label: "Topic Test passed after negative marking",
      required: true
    },
    {
      id: "RAP-MC-008",
      label: "All common-mistake checklist items reviewed",
      required: true
    },
    {
      id: "RAP-MC-009",
      label: "Every wrong question corrected and reattempted",
      required: true
    },
    {
      id: "RAP-MC-010",
      label: "Day 1, Day 3 and Day 7 revisions complete",
      required: true
    }
  ],
  retryPolicy: {
    maximumAttemptsPerDay: 2,
    minimumGapMinutes: 30,
    retryOnlyWrongQuestionsFirst: true,
    fullRetestAfterWrongQuestionsResolved: true,
    resetProgressOnFailure: false
  },
  revisionSchedule: [
    {
      dayOffset: 0,
      task: "Formulas, shortcuts and today wrong questions revise cheyyi."
    },
    {
      dayOffset: 1,
      task: "Flashcards and 10-question rapid drill complete cheyyi."
    },
    {
      dayOffset: 3,
      task: "Weak concepts nunchi 15 mixed questions attempt cheyyi."
    },
    {
      dayOffset: 7,
      task: "Timed Topic Test repeat cheyyi."
    },
    {
      dayOffset: 15,
      task: "Full revision and unresolved error-log retry complete cheyyi."
    },
    {
      dayOffset: 30,
      task: "Verified PYQs available unte attempt cheyyi; lekapothe mixed revision test complete cheyyi."
    }
  ],
  pyqPolicy: {
    requiredForCurrentMastery: false,
    status: "pending-extraction",
    rule: "Question papers extract and verify chesina tarvata maatrame PYQs module populate cheyyali.",
    allowPatternBasedQuestions: false
  },
  unlock: {
    nextTopicWhen: "overallScore >= 85 and all blocking gates passed",
    onSuccess: "Mark ratio-and-proportion as mastered and schedule revisions.",
    onFailure: "Keep next topic locked and assign remediation route."
  },
  masteryRequirements: {
    minimumOverallScore: 85,
    requiredBlockingGates: 8,
    requiredRevisionSessions: 3,
    requiredMistakeResolution: 100,
    pyqsRequiredNow: false,
    nextModule: "integration"
  }
};

export default mastery;
