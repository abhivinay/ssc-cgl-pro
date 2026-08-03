const conceptCheck = {
  "id": "sci-concept-check",
  "title": "Concept Check",
  "instructions": "Calculator lekunda concepts verify cheyyi.",
  "questions": [
    {
      "id": "CC01",
      "question": "In simple interest, yearly interest is calculated on:",
      "options": [
        "Current amount",
        "Original principal",
        "Previous interest",
        "Average amount"
      ],
      "answer": 1,
      "explanation": "SI base original principal-ga constant untundi.",
      "concept": "SI foundation",
      "difficulty": "Easy"
    },
    {
      "id": "CC02",
      "question": "18 months equals how many years?",
      "options": [
        "1.2",
        "1.5",
        "1.8",
        "2"
      ],
      "answer": 1,
      "explanation": "18/12 = 1.5 years.",
      "concept": "Time conversion",
      "difficulty": "Easy"
    },
    {
      "id": "CC03",
      "question": "For half-yearly compounding at 16% p.a., periodic rate is:",
      "options": [
        "16%",
        "8%",
        "4%",
        "32%"
      ],
      "answer": 1,
      "explanation": "Annual nominal rate-ni 2 tho divide chestham.",
      "concept": "Half-yearly CI",
      "difficulty": "Easy"
    },
    {
      "id": "CC04",
      "question": "For quarterly compounding over 2 years, number of periods is:",
      "options": [
        "2",
        "4",
        "6",
        "8"
      ],
      "answer": 3,
      "explanation": "4 quarters per year × 2 = 8.",
      "concept": "Quarterly CI",
      "difficulty": "Easy"
    },
    {
      "id": "CC05",
      "question": "For positive rate and 2 years:",
      "options": [
        "SI>CI",
        "SI=CI",
        "CI>SI",
        "Cannot compare"
      ],
      "answer": 2,
      "explanation": "CI includes interest on first-year interest.",
      "concept": "SI-CI relation",
      "difficulty": "Easy"
    },
    {
      "id": "CC06",
      "question": "A 20% depreciation means each year value is multiplied by:",
      "options": [
        "1.20",
        "0.80",
        "0.20",
        "1.80"
      ],
      "answer": 1,
      "explanation": "100%-20%=80%=0.8.",
      "concept": "Depreciation",
      "difficulty": "Easy"
    },
    {
      "id": "CC07",
      "question": "First-year compound interest equals:",
      "options": [
        "Zero",
        "One-year simple interest",
        "Two-year SI",
        "Amount"
      ],
      "answer": 1,
      "explanation": "First year start base principal only.",
      "concept": "CI foundation",
      "difficulty": "Easy"
    },
    {
      "id": "CC08",
      "question": "If second-year CI interest is 10% more than first-year interest, rate is:",
      "options": [
        "5%",
        "10%",
        "20%",
        "Cannot determine"
      ],
      "answer": 1,
      "explanation": "Consecutive yearly interests increase by rate.",
      "concept": "Interest ratio",
      "difficulty": "Medium"
    },
    {
      "id": "CC09",
      "question": "A sum doubles in 10 years under SI. Rate is:",
      "options": [
        "5%",
        "10%",
        "20%",
        "25%"
      ],
      "answer": 1,
      "explanation": "R=100/T=10%.",
      "concept": "SI doubling",
      "difficulty": "Medium"
    },
    {
      "id": "CC10",
      "question": "Same principal rises 10% and then falls 10%. Net result:",
      "options": [
        "No change",
        "1% gain",
        "1% loss",
        "2% loss"
      ],
      "answer": 2,
      "explanation": "Equal rise and fall gives x²/100=1% loss.",
      "concept": "Successive change",
      "difficulty": "Medium"
    },
    {
      "id": "CC11",
      "question": "CI amount factor for 25% annual rate for 2 years is:",
      "options": [
        "5/4",
        "25/16",
        "3/2",
        "9/16"
      ],
      "answer": 1,
      "explanation": "(5/4)²=25/16.",
      "concept": "Fraction multiplier",
      "difficulty": "Medium"
    },
    {
      "id": "CC12",
      "question": "Which operation finds a previous population from current population?",
      "options": [
        "Multiply by growth factor",
        "Divide by growth factor",
        "Subtract rate",
        "Add rate"
      ],
      "answer": 1,
      "explanation": "Reverse compounding uses division.",
      "concept": "Reverse growth",
      "difficulty": "Medium"
    }
  ],
  "passing": {
    "minimumCorrect": 10,
    "total": 12,
    "nextModule": "level1"
  }
};

export default conceptCheck;
