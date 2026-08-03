const flashcards = {
  "id": "sci-flashcards",
  "title": "48 Formula and Trap Flashcards",
  "cards": [
    {
      "id": "FC01",
      "front": "Simple Interest",
      "back": "SI = PRT/100",
      "hint": "P principal, R annual rate %, T years"
    },
    {
      "id": "FC02",
      "front": "Amount under SI",
      "back": "A = P(1 + RT/100)",
      "hint": "A = P + SI"
    },
    {
      "id": "FC03",
      "front": "Principal from SI",
      "back": "P = 100SI/(RT)",
      "hint": "Use consistent time units"
    },
    {
      "id": "FC04",
      "front": "Rate from SI",
      "back": "R = 100SI/(PT)",
      "hint": "Rate per annum"
    },
    {
      "id": "FC05",
      "front": "Time from SI",
      "back": "T = 100SI/(PR)",
      "hint": "Answer in years"
    },
    {
      "id": "FC06",
      "front": "Annual CI Amount",
      "back": "A = P(1 + R/100)^T",
      "hint": "T integral years unless fractional convention stated"
    },
    {
      "id": "FC07",
      "front": "Compound Interest",
      "back": "CI = P[(1 + R/100)^T − 1]",
      "hint": "CI = A − P"
    },
    {
      "id": "FC08",
      "front": "Half-yearly CI",
      "back": "A = P(1 + R/200)^(2T)",
      "hint": "Rate halved, periods doubled"
    },
    {
      "id": "FC09",
      "front": "Quarterly CI",
      "back": "A = P(1 + R/400)^(4T)",
      "hint": "Rate quartered, periods quadrupled"
    },
    {
      "id": "FC10",
      "front": "Different annual rates",
      "back": "A = P∏(1 + rᵢ/100)",
      "hint": "Multiply yearly growth factors"
    },
    {
      "id": "FC11",
      "front": "2-year SI-CI difference",
      "back": "D = P(R/100)^2",
      "hint": "Same P and R"
    },
    {
      "id": "FC12",
      "front": "3-year SI-CI difference",
      "back": "D = P(R/100)^2(3 + R/100)",
      "hint": "Same P and R"
    },
    {
      "id": "FC13",
      "front": "Growth",
      "back": "Final = Initial(1 + R/100)^T",
      "hint": "Population/value growth"
    },
    {
      "id": "FC14",
      "front": "Depreciation",
      "back": "Final = Initial(1 − R/100)^T",
      "hint": "Value decreases each period"
    },
    {
      "id": "FC15",
      "front": "Successive percentage factors",
      "back": "Final = Initial∏(1 ± rᵢ/100)",
      "hint": "Use + for rise, − for fall"
    },
    {
      "id": "FC16",
      "front": "Present value",
      "back": "PV = FV/(1 + R/100)^T",
      "hint": "Compound discounting"
    },
    {
      "id": "FC17",
      "front": "Doubling under SI",
      "back": "T = 100/R",
      "hint": "Because SI = P"
    },
    {
      "id": "FC18",
      "front": "n-times under SI",
      "back": "T = 100(n−1)/R",
      "hint": "Amount becomes nP"
    },
    {
      "id": "FC19",
      "front": "Doubling relation",
      "back": "If amount doubles in x years under SI, it becomes n times in (n−1)x years",
      "hint": "Linear growth"
    },
    {
      "id": "FC20",
      "front": "Effective annual rate, half-yearly",
      "back": "EAR = (1 + R/200)^2 − 1",
      "hint": "Convert decimal result to %"
    },
    {
      "id": "FC21",
      "front": "Effective annual rate, quarterly",
      "back": "EAR = (1 + R/400)^4 − 1",
      "hint": "Convert decimal result to %"
    },
    {
      "id": "FC22",
      "front": "2-year amount ratio",
      "back": "A/P = (100+R)^2/10000",
      "hint": "Annual CI"
    },
    {
      "id": "FC23",
      "front": "One-year SI equals CI",
      "back": "SI = CI = PR/100",
      "hint": "No prior interest exists"
    },
    {
      "id": "FC24",
      "front": "CI interest in nth year",
      "back": "Iₙ = P(1+r)^(n−1)r",
      "hint": "r = R/100"
    },
    {
      "id": "FC25",
      "front": "Ratio of consecutive CI interests",
      "back": "Iₙ₊₁/Iₙ = 1+r",
      "hint": "Constant rate"
    },
    {
      "id": "FC26",
      "front": "Rate from 2-year difference",
      "back": "R = 100√(D/P)",
      "hint": "D = CI−SI"
    },
    {
      "id": "FC27",
      "front": "Principal from 2-year difference",
      "back": "P = D(100/R)^2",
      "hint": "Same rate"
    },
    {
      "id": "FC28",
      "front": "Mixed SI periods",
      "back": "SI total = P/100 × Σ(RᵢTᵢ)",
      "hint": "Principal unchanged"
    },
    {
      "id": "FC29",
      "front": "CI with fractional final year, annual compounding",
      "back": "A = P(1+r)^n[1+r×fraction]",
      "hint": "Use only when convention specifies SI for incomplete year"
    },
    {
      "id": "FC30",
      "front": "Population previous value",
      "back": "Previous = Current/(1+r)^T",
      "hint": "Reverse growth"
    },
    {
      "id": "FC31",
      "front": "Original value before depreciation",
      "back": "Original = Current/(1−r)^T",
      "hint": "Reverse depreciation"
    },
    {
      "id": "FC32",
      "front": "Net successive change",
      "back": "a + b + ab/100",
      "hint": "Use signs"
    },
    {
      "id": "FC33",
      "front": "Equal rise and fall x%",
      "back": "Net loss = x²/100 %",
      "hint": "Base changes"
    },
    {
      "id": "FC34",
      "front": "CI at 100%",
      "back": "A = P·2^T",
      "hint": "Annual doubling"
    },
    {
      "id": "FC35",
      "front": "CI at 50%",
      "back": "A = P(3/2)^T",
      "hint": "Fraction multiplier"
    },
    {
      "id": "FC36",
      "front": "CI at 25%",
      "back": "A = P(5/4)^T",
      "hint": "Fraction multiplier"
    },
    {
      "id": "FC37",
      "front": "CI at 20%",
      "back": "A = P(6/5)^T",
      "hint": "Fraction multiplier"
    },
    {
      "id": "FC38",
      "front": "CI at 10%",
      "back": "A = P(11/10)^T",
      "hint": "Fraction multiplier"
    },
    {
      "id": "FC39",
      "front": "Interest ratio in successive years",
      "back": "I1:I2:I3 = 1:(1+r):(1+r)^2",
      "hint": "Common scale Pr"
    },
    {
      "id": "FC40",
      "front": "Amount difference for two principals",
      "back": "ΔA = ΔP(1+r)^T",
      "hint": "Same rate/time"
    },
    {
      "id": "FC41",
      "front": "SI yearly interest",
      "back": "Annual interest = PR/100",
      "hint": "Constant every year"
    },
    {
      "id": "FC42",
      "front": "Amount ratio under same CI terms",
      "back": "A1:A2 = P1:P2",
      "hint": "Same rate/time"
    },
    {
      "id": "FC43",
      "front": "Time conversion",
      "back": "months/12; days/365",
      "hint": "Follow question convention"
    },
    {
      "id": "FC44",
      "front": "Nominal rate conversion",
      "back": "periodic rate = annual nominal rate / periods per year",
      "hint": "For equal compounding periods"
    },
    {
      "id": "FC45",
      "front": "Number of periods",
      "back": "n = years × periods per year",
      "hint": "Half-yearly 2T, quarterly 4T"
    },
    {
      "id": "FC46",
      "front": "CI from yearly interests",
      "back": "CI = I1 + I2 + ... + IT",
      "hint": "Sum period interests"
    },
    {
      "id": "FC47",
      "front": "Principal from first-year CI interest",
      "back": "P = 100I1/R",
      "hint": "First-year CI equals SI"
    },
    {
      "id": "FC48",
      "front": "Rate from consecutive interests",
      "back": "R = 100(I2−I1)/I1",
      "hint": "Since I2=I1(1+r)"
    }
  ],
  "mastery": {
    "minimumKnown": 41,
    "spacedRepetition": true
  }
};

export default flashcards;
