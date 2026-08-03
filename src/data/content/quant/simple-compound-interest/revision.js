const revision = {
  "id": "sci-revision",
  "title": "Rapid Revision",
  "oneMinuteRecall": [
    "SI base always original principal",
    "CI base updates after every compounding period",
    "A=P+interest",
    "Half-yearly: R/2, periods×2",
    "Quarterly: R/4, periods×4",
    "2-year CI−SI=P(R/100)²",
    "Growth uses + factor; depreciation uses − factor",
    "Reverse compounding means divide by factor"
  ],
  "formulaSprint": [
    "Simple Interest: SI = PRT/100",
    "Amount under SI: A = P(1 + RT/100)",
    "Principal from SI: P = 100SI/(RT)",
    "Rate from SI: R = 100SI/(PT)",
    "Time from SI: T = 100SI/(PR)",
    "Annual CI Amount: A = P(1 + R/100)^T",
    "Compound Interest: CI = P[(1 + R/100)^T − 1]",
    "Half-yearly CI: A = P(1 + R/200)^(2T)",
    "Quarterly CI: A = P(1 + R/400)^(4T)",
    "Different annual rates: A = P∏(1 + rᵢ/100)",
    "2-year SI-CI difference: D = P(R/100)^2",
    "3-year SI-CI difference: D = P(R/100)^2(3 + R/100)",
    "Growth: Final = Initial(1 + R/100)^T",
    "Depreciation: Final = Initial(1 − R/100)^T",
    "Successive percentage factors: Final = Initial∏(1 ± rᵢ/100)",
    "Present value: PV = FV/(1 + R/100)^T",
    "Doubling under SI: T = 100/R",
    "n-times under SI: T = 100(n−1)/R"
  ],
  "examChecklist": [
    "Identify SI or CI",
    "Mark compounding frequency",
    "Convert time units",
    "Choose multiplier/fraction method",
    "Check amount vs interest",
    "Apply sanity check"
  ],
  "visuals": [
    {
      "src": "/images/quant/simple-compound-interest/formula-sheet.webp",
      "alt": "Formula revision sheet"
    },
    {
      "src": "/images/quant/simple-compound-interest/compounding-map.webp",
      "alt": "Compounding frequency map"
    }
  ],
  "revisionPlan": [
    {
      "when": "Same day",
      "task": "Recall 48 formulas and redo 5 wrong questions"
    },
    {
      "when": "After 2 days",
      "task": "Attempt 10 mixed questions in 10 minutes"
    },
    {
      "when": "After 7 days",
      "task": "Retake topic test"
    },
    {
      "when": "After 21 days",
      "task": "Flashcards plus PYQs when available"
    }
  ]
};

export default revision;
