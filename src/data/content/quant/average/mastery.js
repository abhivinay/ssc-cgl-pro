const mastery = {
  title: "Average Mastery",
  description: "Average topic complete ani mark cheyyadaniki learning, accuracy, speed, revision and error-correction gates.",
  topicId: "average",
  version: 1,
  masteryThreshold: 85,
  mandatoryModules: [
    "learn", "formulas", "shortcuts", "examples", "conceptCheck", "level1", "level2",
    "level3", "topicTest", "revision", "flashcards", "commonMistakes"
  ],
  pyqPolicy: {
    requiredForCurrentContentMastery: false,
    status: "pending verified paper extraction",
    activationRule: "Verified SSC CGL PYQs add ayyaka PYQ gate separately enable cheyyali."
  },
  learningObjectives: [
    { id: "AVG-MO-001", objective: "Average, sum and count relation-ni error lekunda use cheyyagalagali.", evidence: ["conceptCheck", "level1"] },
    { id: "AVG-MO-002", objective: "Missing observation and target total questions solve cheyyagalagali.", evidence: ["level1", "level2"] },
    { id: "AVG-MO-003", objective: "AP and consecutive-number average shortcuts conditions tho apply cheyyagalagali.", evidence: ["level1", "level2"] },
    { id: "AVG-MO-004", objective: "Addition, removal and replacement total changes track cheyyagalagali.", evidence: ["level1", "level2", "topicTest"] },
    { id: "AVG-MO-005", objective: "Wrong entries correct sign tho repair cheyyagalagali.", evidence: ["level2", "level3"] },
    { id: "AVG-MO-006", objective: "Combined and weighted averages unequal group sizes tho calculate cheyyagalagali.", evidence: ["level2", "level3"] },
    { id: "AVG-MO-007", objective: "Group-size ratio-ni opposite deviations method tho find cheyyagalagali.", evidence: ["conceptCheck", "level3"] },
    { id: "AVG-MO-008", objective: "Overlapping averages and subgroup totals solve cheyyagalagali.", evidence: ["level2", "level3"] },
    { id: "AVG-MO-009", objective: "Equal-distance, equal-time and general average speed-ni distinguish cheyyagalagali.", evidence: ["conceptCheck", "level2", "level3"] },
    { id: "AVG-MO-010", objective: "Ages, marks, runs, salary and expenditure applications-ni timed conditions lo solve cheyyagalagali.", evidence: ["examples", "topicTest"] },
    { id: "AVG-MO-011", objective: "Common mistakes-ni identify chesi retry lo correct method apply cheyyagalagali.", evidence: ["commonMistakes", "errorLog"] }
  ],
  gates: [
    { id: "AVG-MG-001", module: "learn", requirement: "All Learn sections complete", minimum: 100, unit: "percent-completion", blocksNext: true },
    { id: "AVG-MG-002", module: "formulas", requirement: "Formula recall accuracy", minimum: 85, unit: "percent", blocksNext: true },
    { id: "AVG-MG-003", module: "conceptCheck", requirement: "Concept Check score", minimum: 80, unit: "percent", blocksNext: true },
    { id: "AVG-MG-004", module: "level1", requirement: "Level 1 score", minimum: 80, unit: "percent", blocksNext: true },
    { id: "AVG-MG-005", module: "level2", requirement: "Level 2 score", minimum: 75, unit: "percent", blocksNext: true },
    { id: "AVG-MG-006", module: "level3", requirement: "Level 3 score", minimum: 70, unit: "percent", blocksNext: true },
    { id: "AVG-MG-007", module: "topicTest", requirement: "Topic Test score after negative marking", minimum: 70, unit: "percent", blocksNext: true },
    { id: "AVG-MG-008", module: "flashcards", requirement: "Formula and rule recall", minimum: 85, unit: "percent", blocksNext: false },
    { id: "AVG-MG-009", module: "commonMistakes", requirement: "Logged mistakes corrected in retry", minimum: 100, unit: "percent-resolved", blocksNext: true },
    { id: "AVG-MG-010", module: "revision", requirement: "Day 1, Day 3 and Day 7 revisions complete", minimum: 3, unit: "sessions", blocksNext: true }
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
    { difficulty: "basic", targetSecondsPerQuestion: 40, minimumAccuracy: 90 },
    { difficulty: "moderate", targetSecondsPerQuestion: 55, minimumAccuracy: 80 },
    { difficulty: "advanced", targetSecondsPerQuestion: 80, minimumAccuracy: 70 },
    { difficulty: "mixed-topic-test", targetSecondsPerQuestion: 72, minimumAccuracy: 75 }
  ],
  statusBands: [
    { min: 90, max: 100, status: "mastered", label: "Mastered", action: "Scheduled revision continue cheyyi; verified PYQs add ayyaka attempt cheyyi." },
    { min: 85, max: 89, status: "exam-ready", label: "Exam Ready", action: "Wrong questions reattempt chesi Day 7 revision complete cheyyi." },
    { min: 70, max: 84, status: "needs-practice", label: "Needs Practice", action: "Weak patterns identify chesi corresponding level repeat cheyyi." },
    { min: 50, max: 69, status: "needs-revision", label: "Needs Revision", action: "Learn, formulas, examples and Level 1 targeted revision cheyyi." },
    { min: 0, max: 49, status: "relearn", label: "Relearn", action: "Topic-ni fundamentals nunchi restart cheyyi." }
  ],
  remediationRoutes: [
    { weakness: "basic-total-count", modules: ["learn", "formulas", "level1"], retryQuestions: 10 },
    { weakness: "series-and-deviations", modules: ["shortcuts", "examples", "level2"], retryQuestions: 10 },
    { weakness: "addition-removal", modules: ["formulas", "examples", "level2"], retryQuestions: 12 },
    { weakness: "replacement-correction", modules: ["formulas", "commonMistakes", "level2"], retryQuestions: 12 },
    { weakness: "combined-weighted-average", modules: ["learn", "examples", "level3"], retryQuestions: 15 },
    { weakness: "overlapping-and-applications", modules: ["examples", "level3", "topicTest"], retryQuestions: 15 },
    { weakness: "average-speed", modules: ["learn", "formulas", "level2", "level3"], retryQuestions: 15 }
  ],
  completionChecklist: [
    "14 Learn sections complete.",
    "40 formulas minimum 85% recall.",
    "30 shortcuts conditions clear.",
    "22 solved examples without looking rework.",
    "Concept Check and all three levels pass.",
    "Topic Test negative marking tarvata 70%+.",
    "All personal error-log entries corrected.",
    "Day 1, Day 3 and Day 7 revision complete."
  ],
  unlock: {
    nextTopicEligibleWhen: "Overall mastery score at least 85 and every blocking gate passed.",
    allowManualOverride: false
  }
};

export default mastery;
