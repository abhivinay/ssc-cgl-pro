const conceptCheck = {
  title: "Number System Concept Check",
  description: "Core concepts clear ga unnayo verify chese short checkpoint.",
  instructions: [
    "Calculator use cheyyakunda attempt cheyyi.",
    "Prathi question ki oka option select cheyyi.",
    "Submit chesina tarvata explanation review cheyyi."
  ],
  passingScore: 12,
  totalQuestions: 15,
  questions: [
    {
      id: "NS-CC-001",
      question: "Which of the following is neither prime nor composite?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      answer: "1",
      explanation: "1 has only one positive factor, so it is neither prime nor composite.",
      romanTelugu: "1 ki okka positive factor matrame untundi. Kabatti prime kaadu, composite kaadu.",
      concept: "Number types",
      difficulty: "easy"
    },
    {
      id: "NS-CC-002",
      question: "Which of the following is an irrational number?",
      options: ["0.125", "√3", "7/9", "0.272727..."],
      correctAnswer: 1,
      answer: "√3",
      explanation: "√3 cannot be expressed in the form p/q, whereas the other values are rational.",
      romanTelugu: "√3 ni p/q form lo rayalem kabatti adi irrational.",
      concept: "Rational and irrational numbers",
      difficulty: "easy"
    },
    {
      id: "NS-CC-003",
      question: "What is the place value of 6 in 46,281?",
      options: ["6", "60", "600", "6000"],
      correctAnswer: 3,
      answer: "6000",
      explanation: "6 occupies the thousands place, so its place value is 6×1000=6000.",
      romanTelugu: "6 thousands place lo undi kabatti place value 6000.",
      concept: "Place value",
      difficulty: "easy"
    },
    {
      id: "NS-CC-004",
      question: "Which digit should replace x so that 53x4 is divisible by 9?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 3,
      answer: "6",
      explanation: "The known digit sum is 5+3+4=12. The next multiple of 9 is 18, so x=6.",
      romanTelugu: "Known digits sum 12. Daaniki 6 add chesthe 18 vastundi, kabatti x=6.",
      concept: "Divisibility by 9",
      difficulty: "easy"
    },
    {
      id: "NS-CC-005",
      question: "Which of the following numbers is divisible by 11?",
      options: ["3146", "3527", "4183", "5724"],
      correctAnswer: 1,
      answer: "3527",
      explanation: "For 3527, (3+2)−(5+7)=−7, so it is not divisible by 11.",
      romanTelugu: "Options ni alternate digit sums rule tho check cheyyali.",
      concept: "Divisibility by 11",
      difficulty: "medium",
      status: "invalid-question",
      correction: "None of the listed options is divisible by 11."
    },
    {
      id: "NS-CC-006",
      question: "How many positive factors does 144 have?",
      options: ["12", "15", "18", "21"],
      correctAnswer: 1,
      answer: "15",
      explanation: "144=2⁴×3². Number of factors=(4+1)(2+1)=15.",
      romanTelugu: "144 prime form 2⁴×3². Powers ki 1 add chesi multiply chesthe 15.",
      concept: "Number of factors",
      difficulty: "easy"
    },
    {
      id: "NS-CC-007",
      question: "What is the least number by which 48 must be multiplied to make it a perfect square?",
      options: ["2", "3", "6", "12"],
      correctAnswer: 1,
      answer: "3",
      explanation: "48=2⁴×3. Multiply by 3 to obtain 2⁴×3²=144, a perfect square.",
      romanTelugu: "3 exponent odd ga undi. Maroka 3 multiply chesthe exponent even avutundi.",
      concept: "Perfect square",
      difficulty: "medium"
    },
    {
      id: "NS-CC-008",
      question: "The HCF of two numbers is 8 and their LCM is 240. If one number is 48, what is the other number?",
      options: ["32", "40", "48", "60"],
      correctAnswer: 1,
      answer: "40",
      explanation: "Other number=(8×240)/48=40.",
      romanTelugu: "Rendu numbers product=HCF×LCM. Kabatti second number 40.",
      concept: "HCF-LCM product relation",
      difficulty: "medium"
    },
    {
      id: "NS-CC-009",
      question: "What should be used to find when three lights flashing at fixed intervals will flash together again?",
      options: ["HCF", "LCM", "Average", "Product"],
      correctAnswer: 1,
      answer: "LCM",
      explanation: "The first common repetition of periodic events is found using LCM.",
      romanTelugu: "Repeated events malli first time together ravadaniki LCM use cheyyali.",
      concept: "LCM application",
      difficulty: "easy"
    },
    {
      id: "NS-CC-010",
      question: "Find the greatest number that divides 84, 124 and 164 leaving the same remainder.",
      options: ["10", "20", "40", "80"],
      correctAnswer: 2,
      answer: "40",
      explanation: "The differences are 124−84=40 and 164−124=40. Their HCF is 40.",
      romanTelugu: "Same remainder kabatti differences teesukoni HCF find chesthe 40.",
      concept: "Same remainder",
      difficulty: "medium"
    },
    {
      id: "NS-CC-011",
      question: "What is the remainder when 68×43 is divided by 7?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      answer: "2",
      explanation: "68≡5 mod 7 and 43≡1 mod 7. Therefore 68×43≡5 mod 7.",
      romanTelugu: "68 remainder 5, 43 remainder 1. Product remainder 5.",
      concept: "Remainder of a product",
      difficulty: "medium",
      status: "invalid-question",
      correction: "The correct remainder is 5, but 5 is missing from the options."
    },
    {
      id: "NS-CC-012",
      question: "What is the unit digit of 8²³?",
      options: ["2", "4", "6", "8"],
      correctAnswer: 0,
      answer: "2",
      explanation: "The cycle of 8 is 8,4,2,6. Since 23 mod 4=3, take the third value, 2.",
      romanTelugu: "8 cycle lo 23 mod 4=3 kabatti third value 2.",
      concept: "Unit digit",
      difficulty: "medium"
    },
    {
      id: "NS-CC-013",
      question: "How many trailing zeros are there in 75!?",
      options: ["15", "16", "17", "18"],
      correctAnswer: 3,
      answer: "18",
      explanation: "floor(75/5)+floor(75/25)=15+3=18.",
      romanTelugu: "75 ni 5, 25 tho divide chesina quotients 15+3=18.",
      concept: "Trailing zeros",
      difficulty: "medium"
    },
    {
      id: "NS-CC-014",
      question: "Which fraction has a terminating decimal expansion?",
      options: ["7/15", "9/24", "11/30", "13/42"],
      correctAnswer: 1,
      answer: "9/24",
      explanation: "9/24 reduces to 3/8. Since 8=2³, its decimal expansion terminates.",
      romanTelugu: "9/24 ni reduce chesthe 3/8. Denominator lo 2 matrame undi kabatti terminate avutundi.",
      concept: "Terminating decimals",
      difficulty: "medium"
    },
    {
      id: "NS-CC-015",
      question: "How many integers from 1 to 60 are divisible by 4 or 6?",
      options: ["15", "18", "20", "25"],
      correctAnswer: 2,
      answer: "20",
      explanation: "Multiples of 4=15, multiples of 6=10 and multiples of LCM(4,6)=12 are 5. Required count=15+10−5=20.",
      romanTelugu: "4 multiples 15, 6 multiples 10. Common multiples 5 ni okasari subtract chesthe 20.",
      concept: "Inclusion-exclusion",
      difficulty: "medium"
    }
  ],
  resultBands: [
    {
      min: 13,
      max: 15,
      label: "Concept Strong",
      message: "Core concepts clear ga unnayi. Level 1 practice start cheyyachu."
    },
    {
      min: 10,
      max: 12,
      label: "Almost Ready",
      message: "Wrong answers explanations review chesi practice start cheyyi."
    },
    {
      min: 0,
      max: 9,
      label: "Revision Required",
      message: "Learn, formulas mariyu examples ni revise chesi concept check repeat cheyyi."
    }
  ],
  masteryRequirements: {
    minimumScore: 12,
    retryWrongQuestions: true,
    reviewConceptsBelowAccuracy: 70
  }
};

export default conceptCheck;