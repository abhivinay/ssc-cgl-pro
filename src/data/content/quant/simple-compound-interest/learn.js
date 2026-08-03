const learn = {
  "id": "sci-learn",
  "title": "Simple and Compound Interest — Complete Learn Module",
  "romanTeluguTeacherNote": "Interest chapter easy ani anipistundi, kaani SSC traps mostly time unit, compounding frequency, amount-vs-interest, and successive rate changes lo untayi. Formula memorize cheyyadam kanna base eppudu update avutundo ardham chesuko.",
  "visuals": {
    "formulaSheet": "/images/quant/simple-compound-interest/formula-sheet.webp",
    "compoundingMap": "/images/quant/simple-compound-interest/compounding-map.webp",
    "siCiDifference": "/images/quant/simple-compound-interest/si-ci-difference-derivation.webp",
    "installmentTimeline": "/images/quant/simple-compound-interest/installment-timeline.webp"
  },
  "sections": [
    {
      "id": "foundation",
      "title": "Interest Foundation",
      "concepts": [
        {
          "term": "Principal (P)",
          "explanation": "Appu teesukunna leda invest chesina original money.",
          "example": "₹8,000 deposit chesthe P = ₹8,000."
        },
        {
          "term": "Rate (R)",
          "explanation": "Prati year principal meeda interest percentage.",
          "example": "12% per annum ante R = 12."
        },
        {
          "term": "Time (T)",
          "explanation": "Interest calculate ayye duration; SI formula lo years-ga convert cheyyali.",
          "example": "18 months = 1.5 years."
        },
        {
          "term": "Interest (I)",
          "explanation": "Principal use chesinanduku extra amount.",
          "example": "₹8,000 meeda ₹1,600 extra vasthe interest ₹1,600."
        },
        {
          "term": "Amount (A)",
          "explanation": "Final total = Principal + Interest.",
          "example": "₹8,000 + ₹1,600 = ₹9,600."
        }
      ]
    },
    {
      "id": "simple-interest",
      "title": "Simple Interest",
      "teacherExplanation": "SI lo prati year interest original principal meedane calculate avutundi. Interest base change avvadu; kabatti yearly interest equal-ga untundi.",
      "rules": [
        "SI = P × R × T / 100",
        "A = P + SI",
        "Months-ni T = months/12 ga convert cheyyali",
        "Days question lo stated convention follow cheyyali; normally 365 days unless otherwise specified"
      ],
      "traps": [
        "Amount-ni interest ani confuse cheyyadam",
        "Rate per annum unna time months-ga direct substitute cheyyadam",
        "Principal unknown question lo amount formula miss cheyyadam"
      ]
    },
    {
      "id": "compound-interest",
      "title": "Compound Interest",
      "teacherExplanation": "CI lo prati period interest amount ki add avutundi; next period interest updated amount meeda vastundi. Interest meeda interest vastundi.",
      "rules": [
        "Annual: A = P(1 + R/100)^T",
        "CI = A − P",
        "Half-yearly: rate = R/2 and periods = 2T",
        "Quarterly: rate = R/4 and periods = 4T",
        "Different yearly rates: A = P∏(1 + rᵢ/100)"
      ],
      "traps": [
        "Nominal annual rate-ni half-yearly question lo unchanged ga use cheyyadam",
        "Periods count miss cheyyadam",
        "Depreciation lo plus sign use cheyyadam"
      ]
    },
    {
      "id": "si-ci-difference",
      "title": "Difference Between SI and CI",
      "teacherExplanation": "Same P, R, T lo CI ekkuva untundi because previous interest kuda next period interest earn chestundi.",
      "rules": [
        "2 years: CI − SI = P(R/100)^2",
        "3 years: CI − SI = P(R/100)^2(3 + R/100)",
        "2-year difference teliste P or R fast-ga find cheyyachu"
      ],
      "visual": {
        "src": "/images/quant/simple-compound-interest/si-ci-difference-derivation.webp",
        "alt": "Derivation of difference between compound and simple interest"
      }
    },
    {
      "id": "growth-depreciation",
      "title": "Growth and Depreciation",
      "teacherExplanation": "Population/value increase CI model; depreciation decrease model. Base prati period update avutundi.",
      "rules": [
        "Growth: Final = Initial(1 + R/100)^T",
        "Depreciation: Final = Initial(1 − R/100)^T",
        "Successive unequal changes-ni factors multiply cheyyali"
      ]
    },
    {
      "id": "installments",
      "title": "Present Value and Installments",
      "teacherExplanation": "Installment question lo different dates lo payments ni same date ki bring cheyyali. Future value/present value concept use chestham.",
      "rules": [
        "Present value of future payment X after n periods = X/(1+r)^n",
        "Due dates ni timeline meeda mark cheyyali",
        "Simple-interest installment questions lo each unpaid balance duration separate ga consider cheyyali"
      ],
      "visual": {
        "src": "/images/quant/simple-compound-interest/installment-timeline.webp",
        "alt": "Installment payment timeline"
      }
    },
    {
      "id": "exam-strategy",
      "title": "SSC Exam Strategy",
      "points": [
        "First compounding frequency identify cheyyi",
        "P, R, T, A units note cheyyi",
        "10%, 20%, 25% rates ki multiplier method prefer cheyyi",
        "Options far apart unte approximation verify cheyyi",
        "Answer vachaka A > P and CI ≥ SI sanity check cheyyi"
      ]
    }
  ],
  "completion": {
    "minimumReadPercentage": 90,
    "nextModule": "formulas"
  }
};

export default learn;
