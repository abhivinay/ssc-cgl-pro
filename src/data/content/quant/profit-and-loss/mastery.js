const mastery = {
  title: "Profit and Loss Mastery",
  description: "Profit, Loss and Discount topic complete ani mark cheyyadaniki learning, accuracy, speed, revision and error-correction gates.",
  topicId: "profit-and-loss",
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
    { id: "PL-MO-001", objective: "CP, SP, MP, profit, loss and discount terms-ni error lekunda distinguish cheyyagalagali.", evidence: ["learn", "conceptCheck"] },
    { id: "PL-MO-002", objective: "Profit/loss percentages-ni correct CP base tho calculate cheyyagalagali.", evidence: ["conceptCheck", "level1"] },
    { id: "PL-MO-003", objective: "CP-SP-rate reverse questions-ni ratio and multiplier methods tho solve cheyyagalagali.", evidence: ["level1", "level2"] },
    { id: "PL-MO-004", objective: "Required SP change and loss-recovery reverse percentages solve cheyyagalagali.", evidence: ["level2", "topicTest"] },
    { id: "PL-MO-005", objective: "Equal CP, same SP and weighted multiple-article patterns distinguish cheyyagalagali.", evidence: ["level2", "level3"] },
    { id: "PL-MO-006", objective: "Marked price, markup and single discount questions solve cheyyagalagali.", evidence: ["level1", "level2"] },
    { id: "PL-MO-007", objective: "Successive discounts and target markup/discount questions factor method tho solve cheyyagalagali.", evidence: ["level2", "level3"] },
    { id: "PL-MO-008", objective: "False weight and combined price-weight dealer problems solve cheyyagalagali.", evidence: ["level2", "level3"] },
    { id: "PL-MO-009", objective: "Free-item, extra-quantity and article-count relations handle cheyyagalagali.", evidence: ["examples", "topicTest"] },
    { id: "PL-MO-010", objective: "Advanced multi-step questions-ni time limit lo accurate-ga solve cheyyagalagali.", evidence: ["level3", "topicTest"] },
    { id: "PL-MO-011", objective: "Common mistakes-ni identify chesi retry lo correct method apply cheyyagalagali.", evidence: ["commonMistakes", "errorLog"] }
  ],
  gates: [
    { id: "PL-MG-001", module: "learn", requirement: "All Learn sections complete", minimum: 100, unit: "percent-completion", blocksNext: true },
    { id: "PL-MG-002", module: "formulas", requirement: "Formula recall accuracy", minimum: 85, unit: "percent", blocksNext: true },
    { id: "PL-MG-003", module: "conceptCheck", requirement: "Concept Check score", minimum: 80, unit: "percent", blocksNext: true },
    { id: "PL-MG-004", module: "level1", requirement: "Level 1 score", minimum: 80, unit: "percent", blocksNext: true },
    { id: "PL-MG-005", module: "level2", requirement: "Level 2 score", minimum: 75, unit: "percent", blocksNext: true },
    { id: "PL-MG-006", module: "level3", requirement: "Level 3 score", minimum: 70, unit: "percent", blocksNext: true },
    { id: "PL-MG-007", module: "topicTest", requirement: "Topic Test score after negative marking", minimum: 70, unit: "percent", blocksNext: true },
    { id: "PL-MG-008", module: "flashcards", requirement: "Formula and rule recall", minimum: 85, unit: "percent", blocksNext: false },
    { id: "PL-MG-009", module: "commonMistakes", requirement: "Logged mistakes corrected in retry", minimum: 100, unit: "percent-resolved", blocksNext: true },
    { id: "PL-MG-010", module: "revision", requirement: "Day 1, Day 3 and Day 7 revisions complete", minimum: 3, unit: "sessions", blocksNext: true }
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
    { difficulty: "basic", targetSecondsPerQuestion: 42, minimumAccuracy: 90 },
    { difficulty: "moderate", targetSecondsPerQuestion: 58, minimumAccuracy: 80 },
    { difficulty: "advanced", targetSecondsPerQuestion: 85, minimumAccuracy: 70 },
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
    { weakness: "core-cp-sp-rate", modules: ["learn", "formulas", "level1"], retryQuestions: 10 },
    { weakness: "reverse-percentage", modules: ["shortcuts", "examples", "level2"], retryQuestions: 12 },
    { weakness: "multiple-articles", modules: ["learn", "examples", "level2", "level3"], retryQuestions: 15 },
    { weakness: "marked-price-discount", modules: ["formulas", "examples", "level2"], retryQuestions: 12 },
    { weakness: "successive-discount", modules: ["shortcuts", "commonMistakes", "level3"], retryQuestions: 12 },
    { weakness: "false-weight", modules: ["learn", "formulas", "level2", "level3"], retryQuestions: 15 },
    { weakness: "quantity-and-count-offers", modules: ["examples", "level3", "topicTest"], retryQuestions: 12 }
  ],
  completionChecklist: [
    "16 Learn sections complete.",
    "45 formulas minimum 85% recall.",
    "30 shortcuts conditions clear.",
    "24 solved examples without looking rework.",
    "Concept Check and all three levels pass.",
    "Topic Test negative marking tarvata 70%+.",
    "All personal error-log entries corrected.",
    "Day 1, Day 3 and Day 7 revision complete."
  ],
  unlock: {
    nextTopicEligibleWhen: "Overall mastery score at least 85 and every blocking gate passed.",
    nextTopic: "simple-and-compound-interest",
    allowManualOverride: false
  }
};

export default mastery;
