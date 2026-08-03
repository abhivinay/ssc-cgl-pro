const level1 = {
  title: "Number System Level 1 Practice",
  description: "Basic concepts, divisibility, factors, HCF-LCM, remainders and unit digits meeda foundation practice.",
  level: 1,
  difficulty: "easy",
  passingScore: 16,
  totalQuestions: 20,
  instructions: [
    "Calculator use cheyyakunda attempt cheyyi.",
    "Prathi question ki oka option select cheyyi.",
    "Minimum 16 correct answers target cheyyi.",
    "Wrong answers explanations compulsory ga review cheyyi."
  ],
  questions: [
    {
      id: "NS-L1-001",
      question: "Which of the following is a prime number?",
      options: ["21", "29", "39", "51"],
      correctAnswer: 1,
      answer: "29",
      explanation: "29 has exactly two positive factors: 1 and 29.",
      romanTelugu: "29 ki 1 mariyu 29 ane rendu factors matrame unnayi kabatti prime.",
      concept: "Prime numbers"
    },
    {
      id: "NS-L1-002",
      question: "Which of the following is an irrational number?",
      options: ["3/8", "0.75", "√5", "0.444..."],
      correctAnswer: 2,
      answer: "√5",
      explanation: "√5 cannot be expressed as a ratio of two integers.",
      romanTelugu: "√5 ni p/q form lo rayalem kabatti irrational.",
      concept: "Rational and irrational numbers"
    },
    {
      id: "NS-L1-003",
      question: "What is the place value of 8 in 48,625?",
      options: ["8", "80", "800", "8000"],
      correctAnswer: 3,
      answer: "8000",
      explanation: "8 is in the thousands place, so its place value is 8×1000=8000.",
      romanTelugu: "8 thousands place lo undi kabatti place value 8000.",
      concept: "Place value"
    },
    {
      id: "NS-L1-004",
      question: "Which of the following numbers is divisible by 3?",
      options: ["124", "235", "417", "502"],
      correctAnswer: 2,
      answer: "417",
      explanation: "The digit sum of 417 is 4+1+7=12, which is divisible by 3.",
      romanTelugu: "417 digits sum 12. Adi 3 tho divisible kabatti 417 correct.",
      concept: "Divisibility by 3"
    },
    {
      id: "NS-L1-005",
      question: "What digit should replace x in 62x1 so that the number is divisible by 9?",
      options: ["0", "3", "6", "9"],
      correctAnswer: 0,
      answer: "0",
      explanation: "Known digit sum=6+2+1=9. Therefore x=0 keeps the total divisible by 9.",
      romanTelugu: "Known digits sum already 9 kabatti x=0 pedithe number 9 tho divisible.",
      concept: "Divisibility by 9"
    },
    {
      id: "NS-L1-006",
      question: "Which of the following numbers is divisible by 4?",
      options: ["2318", "4526", "6732", "8914"],
      correctAnswer: 2,
      answer: "6732",
      explanation: "The last two digits are 32, and 32 is divisible by 4.",
      romanTelugu: "Last two digits 32 anevi 4 tho divisible kabatti 6732 correct.",
      concept: "Divisibility by 4"
    },
    {
      id: "NS-L1-007",
      question: "Which of the following numbers is divisible by 11?",
      options: ["1331", "2456", "3725", "4812"],
      correctAnswer: 0,
      answer: "1331",
      explanation: "For 1331, (1+3)−(3+1)=0. Therefore it is divisible by 11.",
      romanTelugu: "Alternate digit sums difference 0 kabatti 1331 number 11 tho divisible.",
      concept: "Divisibility by 11"
    },
    {
      id: "NS-L1-008",
      question: "How many positive factors does 36 have?",
      options: ["6", "8", "9", "12"],
      correctAnswer: 2,
      answer: "9",
      explanation: "36=2²×3². Number of factors=(2+1)(2+1)=9.",
      romanTelugu: "36=2²×3². Powers ki 1 add chesi multiply chesthe 9.",
      concept: "Number of factors"
    },
    {
      id: "NS-L1-009",
      question: "How many odd factors does 72 have?",
      options: ["2", "3", "4", "6"],
      correctAnswer: 1,
      answer: "3",
      explanation: "72=2³×3². Ignore the power of 2. Odd factors=(2+1)=3.",
      romanTelugu: "Odd factors kosam 2 power ignore cheyyali. 3² nunchi 3 odd factors vastayi.",
      concept: "Odd factors"
    },
    {
      id: "NS-L1-010",
      question: "What is the least number by which 50 must be multiplied to make it a perfect square?",
      options: ["2", "3", "5", "10"],
      correctAnswer: 0,
      answer: "2",
      explanation: "50=2×5². Multiply by 2 to obtain 2²×5²=100, a perfect square.",
      romanTelugu: "2 exponent odd ga undi. Maroka 2 multiply chesthe 100 perfect square avutundi.",
      concept: "Perfect square"
    },
    {
      id: "NS-L1-011",
      question: "What is the least number by which 54 must be multiplied to make it a perfect cube?",
      options: ["2", "3", "4", "6"],
      correctAnswer: 2,
      answer: "4",
      explanation: "54=2×3³. The exponent of 2 must become 3, so multiply by 2²=4.",
      romanTelugu: "54=2¹×3³. 2 power ni 3 cheyyadaniki 2² ante 4 multiply cheyyali.",
      concept: "Perfect cube"
    },
    {
      id: "NS-L1-012",
      question: "Find the HCF of 24 and 36.",
      options: ["6", "8", "12", "18"],
      correctAnswer: 2,
      answer: "12",
      explanation: "24=2³×3 and 36=2²×3². HCF=2²×3=12.",
      romanTelugu: "Common prime powers lo minimum powers teesukunte HCF 12.",
      concept: "HCF"
    },
    {
      id: "NS-L1-013",
      question: "Find the LCM of 12 and 18.",
      options: ["24", "30", "36", "72"],
      correctAnswer: 2,
      answer: "36",
      explanation: "12=2²×3 and 18=2×3². LCM=2²×3²=36.",
      romanTelugu: "Prime powers lo maximum powers teesukunte LCM 36.",
      concept: "LCM"
    },
    {
      id: "NS-L1-014",
      question: "Two bells ring at intervals of 8 seconds and 12 seconds. After how many seconds will they ring together again?",
      options: ["16", "20", "24", "48"],
      correctAnswer: 2,
      answer: "24 seconds",
      explanation: "The first common repetition is LCM(8,12)=24.",
      romanTelugu: "Events malli together ravadaniki intervals LCM teesukovali. Answer 24 seconds.",
      concept: "LCM application"
    },
    {
      id: "NS-L1-015",
      question: "Find the greatest number that divides 45, 65 and 85 leaving the same remainder.",
      options: ["5", "10", "20", "40"],
      correctAnswer: 2,
      answer: "20",
      explanation: "Differences are 65−45=20 and 85−65=20. Their HCF is 20.",
      romanTelugu: "Same remainder kabatti differences HCF teesukovali. HCF 20.",
      concept: "Same remainder"
    },
    {
      id: "NS-L1-016",
      question: "What is the remainder when 53 is divided by 7?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      answer: "4",
      explanation: "53=7×7+4. Therefore the remainder is 4.",
      romanTelugu: "53 nunchi 49 subtract chesthe 4 migulutundi. Remainder 4.",
      concept: "Basic remainder"
    },
    {
      id: "NS-L1-017",
      question: "What least number must be added to 218 to make it divisible by 5?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      answer: "2",
      explanation: "218 leaves remainder 3 when divided by 5. Required addition=5−3=2.",
      romanTelugu: "218 remainder 3. Next multiple reach avvadaniki 2 add cheyyali.",
      concept: "Least number to add"
    },
    {
      id: "NS-L1-018",
      question: "Find the unit digit of 7¹³.",
      options: ["1", "3", "7", "9"],
      correctAnswer: 2,
      answer: "7",
      explanation: "The cycle of 7 is 7,9,3,1. Since 13 mod 4=1, take the first value, 7.",
      romanTelugu: "7 cycle lo 13 mod 4=1 kabatti first value 7.",
      concept: "Unit digit"
    },
    {
      id: "NS-L1-019",
      question: "How many trailing zeros are there in 50!?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      answer: "12",
      explanation: "Trailing zeros=floor(50/5)+floor(50/25)=10+2=12.",
      romanTelugu: "50 ni 5, 25 tho divide chesina quotients 10+2=12.",
      concept: "Trailing zeros"
    },
    {
      id: "NS-L1-020",
      question: "Which of the following fractions has a terminating decimal expansion?",
      options: ["3/14", "7/20", "11/24", "13/30"],
      correctAnswer: 1,
      answer: "7/20",
      explanation: "20=2²×5. Its prime factors are only 2 and 5, so 7/20 terminates.",
      romanTelugu: "7/20 lowest form denominator lo 2 mariyu 5 matrame unnayi kabatti decimal terminate avutundi.",
      concept: "Terminating decimals"
    }
  ],
  resultBands: [
    {
      min: 18,
      max: 20,
      label: "Excellent",
      message: "Foundation strong ga undi. Level 2 start cheyyi."
    },
    {
      min: 16,
      max: 17,
      label: "Passed",
      message: "Level 1 complete. Wrong answers revise chesi Level 2 ki move avvu."
    },
    {
      min: 12,
      max: 15,
      label: "Needs Practice",
      message: "Weak concepts revise chesi Level 1 repeat cheyyi."
    },
    {
      min: 0,
      max: 11,
      label: "Foundation Weak",
      message: "Learn, formulas, shortcuts mariyu examples complete ga revise cheyyi."
    }
  ],
  masteryRequirements: {
    minimumScore: 16,
    minimumAccuracy: 80,
    retryWrongQuestions: true,
    unlockNextLevel: true
  }
};

export default level1;