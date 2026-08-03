const formulas = {
  "id": "sci-formulas",
  "title": "Formula Bank — 48 Essential Results",
  "visual": {
    "src": "/images/quant/simple-compound-interest/formula-sheet.webp",
    "alt": "Simple and compound interest formula sheet"
  },
  "items": [
    {
      "id": "F01",
      "name": "Simple Interest",
      "formula": "SI = PRT/100",
      "note": "P principal, R annual rate %, T years"
    },
    {
      "id": "F02",
      "name": "Amount under SI",
      "formula": "A = P(1 + RT/100)",
      "note": "A = P + SI"
    },
    {
      "id": "F03",
      "name": "Principal from SI",
      "formula": "P = 100SI/(RT)",
      "note": "Use consistent time units"
    },
    {
      "id": "F04",
      "name": "Rate from SI",
      "formula": "R = 100SI/(PT)",
      "note": "Rate per annum"
    },
    {
      "id": "F05",
      "name": "Time from SI",
      "formula": "T = 100SI/(PR)",
      "note": "Answer in years"
    },
    {
      "id": "F06",
      "name": "Annual CI Amount",
      "formula": "A = P(1 + R/100)^T",
      "note": "T integral years unless fractional convention stated"
    },
    {
      "id": "F07",
      "name": "Compound Interest",
      "formula": "CI = P[(1 + R/100)^T − 1]",
      "note": "CI = A − P"
    },
    {
      "id": "F08",
      "name": "Half-yearly CI",
      "formula": "A = P(1 + R/200)^(2T)",
      "note": "Rate halved, periods doubled"
    },
    {
      "id": "F09",
      "name": "Quarterly CI",
      "formula": "A = P(1 + R/400)^(4T)",
      "note": "Rate quartered, periods quadrupled"
    },
    {
      "id": "F10",
      "name": "Different annual rates",
      "formula": "A = P∏(1 + rᵢ/100)",
      "note": "Multiply yearly growth factors"
    },
    {
      "id": "F11",
      "name": "2-year SI-CI difference",
      "formula": "D = P(R/100)^2",
      "note": "Same P and R"
    },
    {
      "id": "F12",
      "name": "3-year SI-CI difference",
      "formula": "D = P(R/100)^2(3 + R/100)",
      "note": "Same P and R"
    },
    {
      "id": "F13",
      "name": "Growth",
      "formula": "Final = Initial(1 + R/100)^T",
      "note": "Population/value growth"
    },
    {
      "id": "F14",
      "name": "Depreciation",
      "formula": "Final = Initial(1 − R/100)^T",
      "note": "Value decreases each period"
    },
    {
      "id": "F15",
      "name": "Successive percentage factors",
      "formula": "Final = Initial∏(1 ± rᵢ/100)",
      "note": "Use + for rise, − for fall"
    },
    {
      "id": "F16",
      "name": "Present value",
      "formula": "PV = FV/(1 + R/100)^T",
      "note": "Compound discounting"
    },
    {
      "id": "F17",
      "name": "Doubling under SI",
      "formula": "T = 100/R",
      "note": "Because SI = P"
    },
    {
      "id": "F18",
      "name": "n-times under SI",
      "formula": "T = 100(n−1)/R",
      "note": "Amount becomes nP"
    },
    {
      "id": "F19",
      "name": "Doubling relation",
      "formula": "If amount doubles in x years under SI, it becomes n times in (n−1)x years",
      "note": "Linear growth"
    },
    {
      "id": "F20",
      "name": "Effective annual rate, half-yearly",
      "formula": "EAR = (1 + R/200)^2 − 1",
      "note": "Convert decimal result to %"
    },
    {
      "id": "F21",
      "name": "Effective annual rate, quarterly",
      "formula": "EAR = (1 + R/400)^4 − 1",
      "note": "Convert decimal result to %"
    },
    {
      "id": "F22",
      "name": "2-year amount ratio",
      "formula": "A/P = (100+R)^2/10000",
      "note": "Annual CI"
    },
    {
      "id": "F23",
      "name": "One-year SI equals CI",
      "formula": "SI = CI = PR/100",
      "note": "No prior interest exists"
    },
    {
      "id": "F24",
      "name": "CI interest in nth year",
      "formula": "Iₙ = P(1+r)^(n−1)r",
      "note": "r = R/100"
    },
    {
      "id": "F25",
      "name": "Ratio of consecutive CI interests",
      "formula": "Iₙ₊₁/Iₙ = 1+r",
      "note": "Constant rate"
    },
    {
      "id": "F26",
      "name": "Rate from 2-year difference",
      "formula": "R = 100√(D/P)",
      "note": "D = CI−SI"
    },
    {
      "id": "F27",
      "name": "Principal from 2-year difference",
      "formula": "P = D(100/R)^2",
      "note": "Same rate"
    },
    {
      "id": "F28",
      "name": "Mixed SI periods",
      "formula": "SI total = P/100 × Σ(RᵢTᵢ)",
      "note": "Principal unchanged"
    },
    {
      "id": "F29",
      "name": "CI with fractional final year, annual compounding",
      "formula": "A = P(1+r)^n[1+r×fraction]",
      "note": "Use only when convention specifies SI for incomplete year"
    },
    {
      "id": "F30",
      "name": "Population previous value",
      "formula": "Previous = Current/(1+r)^T",
      "note": "Reverse growth"
    },
    {
      "id": "F31",
      "name": "Original value before depreciation",
      "formula": "Original = Current/(1−r)^T",
      "note": "Reverse depreciation"
    },
    {
      "id": "F32",
      "name": "Net successive change",
      "formula": "a + b + ab/100",
      "note": "Use signs"
    },
    {
      "id": "F33",
      "name": "Equal rise and fall x%",
      "formula": "Net loss = x²/100 %",
      "note": "Base changes"
    },
    {
      "id": "F34",
      "name": "CI at 100%",
      "formula": "A = P·2^T",
      "note": "Annual doubling"
    },
    {
      "id": "F35",
      "name": "CI at 50%",
      "formula": "A = P(3/2)^T",
      "note": "Fraction multiplier"
    },
    {
      "id": "F36",
      "name": "CI at 25%",
      "formula": "A = P(5/4)^T",
      "note": "Fraction multiplier"
    },
    {
      "id": "F37",
      "name": "CI at 20%",
      "formula": "A = P(6/5)^T",
      "note": "Fraction multiplier"
    },
    {
      "id": "F38",
      "name": "CI at 10%",
      "formula": "A = P(11/10)^T",
      "note": "Fraction multiplier"
    },
    {
      "id": "F39",
      "name": "Interest ratio in successive years",
      "formula": "I1:I2:I3 = 1:(1+r):(1+r)^2",
      "note": "Common scale Pr"
    },
    {
      "id": "F40",
      "name": "Amount difference for two principals",
      "formula": "ΔA = ΔP(1+r)^T",
      "note": "Same rate/time"
    },
    {
      "id": "F41",
      "name": "SI yearly interest",
      "formula": "Annual interest = PR/100",
      "note": "Constant every year"
    },
    {
      "id": "F42",
      "name": "Amount ratio under same CI terms",
      "formula": "A1:A2 = P1:P2",
      "note": "Same rate/time"
    },
    {
      "id": "F43",
      "name": "Time conversion",
      "formula": "months/12; days/365",
      "note": "Follow question convention"
    },
    {
      "id": "F44",
      "name": "Nominal rate conversion",
      "formula": "periodic rate = annual nominal rate / periods per year",
      "note": "For equal compounding periods"
    },
    {
      "id": "F45",
      "name": "Number of periods",
      "formula": "n = years × periods per year",
      "note": "Half-yearly 2T, quarterly 4T"
    },
    {
      "id": "F46",
      "name": "CI from yearly interests",
      "formula": "CI = I1 + I2 + ... + IT",
      "note": "Sum period interests"
    },
    {
      "id": "F47",
      "name": "Principal from first-year CI interest",
      "formula": "P = 100I1/R",
      "note": "First-year CI equals SI"
    },
    {
      "id": "F48",
      "name": "Rate from consecutive interests",
      "formula": "R = 100(I2−I1)/I1",
      "note": "Since I2=I1(1+r)"
    }
  ],
  "masteryRequirements": {
    "totalFormulas": 48,
    "minimumRecallAccuracy": 85,
    "recommendedRevisionMinutes": 35,
    "nextModule": "shortcuts"
  }
};

export default formulas;
