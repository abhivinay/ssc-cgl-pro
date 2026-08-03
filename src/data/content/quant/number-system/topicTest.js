const topicTest = {
  title: "Number System Topic Test",
  description: "Number types, divisibility, factors, HCF-LCM, remainders, unit digits, factorials and decimals meeda complete SSC CGL-level test.",
  testType: "topic-test",
  difficulty: "mixed",
  durationMinutes: 25,
  passingScore: 16,
  totalQuestions: 20,
  instructions: [
    "25 minutes timer petti test attempt cheyyi.",
    "Calculator use cheyyakudadhu.",
    "Prathi question ki oka option select cheyyi.",
    "Minimum 16 correct answers score cheyyali.",
    "Submit chesina tarvata wrong answers explanations review cheyyi."
  ],
  questions: [
    {
      id: "NS-TT-001",
      question: "Which of the following is an irrational number?",
      options: ["0.625", "√49", "√11", "0.272727..."],
      correctAnswer: 2,
      answer: "√11",
      explanation: "√11 cannot be expressed in the form p/q, whereas the other values are rational.",
      romanTelugu: "√11 ni p/q form lo rayalem kabatti adi irrational number.",
      concept: "Rational and irrational numbers",
      difficulty: "easy"
    },
    {
      id: "NS-TT-002",
      question: "What is the smallest digit x such that 63x5 is divisible by 9?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 3,
      answer: "4",
      explanation: "The known digit sum is 6+3+5=14. The next multiple of 9 is 18, so x=4.",
      romanTelugu: "Known digits sum 14. Next 9 multiple 18 reach avvadaniki x=4.",
      concept: "Divisibility by 9",
      difficulty: "easy"
    },
    {
      id: "NS-TT-003",
      question: "Which of the following numbers is divisible by 11?",
      options: ["3456", "4752", "5831", "6248"],
      correctAnswer: 1,
      answer: "4752",
      explanation: "For 4752, the difference between alternate digit sums is (4+5)−(7+2)=0. Therefore, it is divisible by 11.",
      romanTelugu: "4752 alternate digit sums difference zero kabatti 11 tho divisible.",
      concept: "Divisibility by 11",
      difficulty: "medium"
    },
    {
      id: "NS-TT-004",
      question: "How many positive factors does 720 have?",
      options: ["24", "30", "36", "40"],
      correctAnswer: 1,
      answer: "30",
      explanation: "720=2⁴×3²×5. Number of factors=(4+1)(2+1)(1+1)=30.",
      romanTelugu: "720=2⁴×3²×5. Powers ki 1 add chesi multiply chesthe 30.",
      concept: "Number of factors",
      difficulty: "medium"
    },
    {
      id: "NS-TT-005",
      question: "How many odd factors does 900 have?",
      options: ["6", "9", "12", "18"],
      correctAnswer: 1,
      answer: "9",
      explanation: "900=2²×3²×5². Ignoring the power of 2, the number of odd factors is (2+1)(2+1)=9.",
      romanTelugu: "Odd factors kosam 2 power ignore cheyyali. Migilina exponent choices 3×3=9.",
      concept: "Odd factors",
      difficulty: "medium"
    },
    {
      id: "NS-TT-006",
      question: "What least number must be multiplied by 588 to make it a perfect square?",
      options: ["2", "3", "6", "21"],
      correctAnswer: 1,
      answer: "3",
      explanation: "588=2²×3×7². Multiplying by 3 makes every prime exponent even.",
      romanTelugu: "588=2²×3¹×7². 3 power odd ga undi kabatti maroka 3 multiply cheyyali.",
      concept: "Perfect square",
      difficulty: "medium"
    },
    {
      id: "NS-TT-007",
      question: "What least number must divide 432 to make the quotient a perfect cube?",
      options: ["2", "4", "6", "9"],
      correctAnswer: 0,
      answer: "2",
      explanation: "432=2⁴×3³. Dividing by 2 leaves 2³×3³=216=6³.",
      romanTelugu: "432=2⁴×3³. Oka 2 remove chesthe rendu prime powers 3 avutayi.",
      concept: "Perfect cube",
      difficulty: "medium"
    },
    {
      id: "NS-TT-008",
      question: "Find the HCF of 126, 210 and 294.",
      options: ["21", "28", "42", "84"],
      correctAnswer: 2,
      answer: "42",
      explanation: "126=2×3²×7, 210=2×3×5×7 and 294=2×3×7². Their HCF is 2×3×7=42.",
      romanTelugu: "Moodu numbers lo common minimum prime powers multiply chesthe HCF 42.",
      concept: "HCF",
      difficulty: "medium"
    },
    {
      id: "NS-TT-009",
      question: "Find the LCM of 24, 40 and 60.",
      options: ["120", "180", "240", "360"],
      correctAnswer: 0,
      answer: "120",
      explanation: "24=2³×3, 40=2³×5 and 60=2²×3×5. Their LCM is 2³×3×5=120.",
      romanTelugu: "Maximum prime powers teesukunte LCM 120.",
      concept: "LCM",
      difficulty: "medium"
    },
    {
      id: "NS-TT-010",
      question: "The HCF and LCM of two numbers are 12 and 420. If one number is 60, find the other.",
      options: ["72", "84", "96", "105"],
      correctAnswer: 1,
      answer: "84",
      explanation: "The product of the two numbers equals HCF×LCM. Therefore, the other number=(12×420)÷60=84.",
      romanTelugu: "Rendu numbers product=HCF×LCM. Kabatti second number 84.",
      concept: "HCF-LCM product relation",
      difficulty: "medium"
    },
    {
      id: "NS-TT-011",
      question: "Find the greatest number that divides 187, 233 and 325 leaving the same remainder.",
      options: ["23", "46", "69", "92"],
      correctAnswer: 1,
      answer: "46",
      explanation: "The differences are 233−187=46, 325−233=92 and 325−187=138. Their HCF is 46.",
      romanTelugu: "Same remainder kabatti differences 46, 92, 138 ki HCF teesukunte 46.",
      concept: "Same remainder",
      difficulty: "medium"
    },
    {
      id: "NS-TT-012",
      question: "Three bells ring at intervals of 18, 24 and 30 seconds. After how many seconds will they ring together again?",
      options: ["180", "240", "300", "360"],
      correctAnswer: 3,
      answer: "360 seconds",
      explanation: "They will ring together again after LCM(18,24,30)=360 seconds.",
      romanTelugu: "Repeated events together ravadaniki intervals LCM teesukovali. Answer 360 seconds.",
      concept: "LCM application",
      difficulty: "medium"
    },
    {
      id: "NS-TT-013",
      question: "What least number must be added to 1458 to make it exactly divisible by 17?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      answer: "4",
      explanation: "1458=17×85+13. Therefore, the required addition is 17−13=4.",
      romanTelugu: "1458 ni 17 tho divide chesthe remainder 13. Next multiple reach avvadaniki 4 add cheyyali.",
      concept: "Least number to add",
      difficulty: "medium"
    },
    {
      id: "NS-TT-014",
      question: "Find the remainder when 86×93 is divided by 7.",
      options: ["1", "2", "3", "4"],
      correctAnswer: 3,
      answer: "4",
      explanation: "86 leaves remainder 2 and 93 also leaves remainder 2 when divided by 7. Therefore, the product leaves remainder 2×2=4.",
      romanTelugu: "86 mariyu 93 remainders rendu 2. Product remainder 2×2=4.",
      concept: "Remainder of a product",
      difficulty: "medium"
    },
    {
      id: "NS-TT-015",
      question: "Find the remainder when 3²⁵ is divided by 7.",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
      answer: "3",
      explanation: "Powers of 3 modulo 7 repeat every 6 terms. Since 25 leaves remainder 1 when divided by 6, the required remainder is 3.",
      romanTelugu: "3 powers modulo 7 cycle length 6. 25 mod 6=1 kabatti remainder 3.",
      concept: "Power remainder",
      difficulty: "hard"
    },
    {
      id: "NS-TT-016",
      question: "What is the unit digit of 7³⁵?",
      options: ["1", "3", "7", "9"],
      correctAnswer: 1,
      answer: "3",
      explanation: "The unit-digit cycle of 7 is 7,9,3,1. Since 35 leaves remainder 3 when divided by 4, the third value is 3.",
      romanTelugu: "7 unit-digit cycle lo 35 mod 4=3 kabatti third value 3.",
      concept: "Unit digit",
      difficulty: "medium"
    },
    {
      id: "NS-TT-017",
      question: "What is the unit digit of 3²⁷+8¹⁸?",
      options: ["1", "3", "5", "7"],
      correctAnswer: 0,
      answer: "1",
      explanation: "The unit digit of 3²⁷ is 7 and that of 8¹⁸ is 4. Their sum is 11, so the final unit digit is 1.",
      romanTelugu: "3²⁷ unit digit 7, 8¹⁸ unit digit 4. Sum 11 kabatti final unit digit 1.",
      concept: "Unit digit of a sum",
      difficulty: "hard"
    },
    {
      id: "NS-TT-018",
      question: "How many trailing zeros are present in 250!?",
      options: ["60", "61", "62", "64"],
      correctAnswer: 2,
      answer: "62",
      explanation: "Trailing zeros=floor(250/5)+floor(250/25)+floor(250/125)=50+10+2=62.",
      romanTelugu: "250 ni 5, 25, 125 tho divide chesina quotients add chesthe 62.",
      concept: "Trailing zeros",
      difficulty: "medium"
    },
    {
      id: "NS-TT-019",
      question: "Which fraction has a terminating decimal expansion?",
      options: ["7/18", "11/24", "13/40", "17/45"],
      correctAnswer: 2,
      answer: "13/40",
      explanation: "40=2³×5. Since the denominator in lowest form contains only the prime factors 2 and 5, 13/40 has a terminating decimal expansion.",
      romanTelugu: "40 denominator lo 2 mariyu 5 matrame unnayi kabatti decimal terminate avutundi.",
      concept: "Terminating decimals",
      difficulty: "medium"
    },
    {
      id: "NS-TT-020",
      question: "How many integers from 1 to 300 are divisible by 5 or 8?",
      options: ["88", "90", "92", "98"],
      correctAnswer: 1,
      answer: "90",
      explanation: "Multiples of 5=60, multiples of 8=37 and common multiples of LCM(5,8)=40 are 7. Required count=60+37−7=90.",
      romanTelugu: "5 multiples 60, 8 multiples 37. Common multiples 7 subtract chesthe answer 90.",
      concept: "Inclusion-exclusion",
      difficulty: "hard"
    }
  ],
  resultBands: [
    {
      min: 18,
      max: 20,
      label: "Topic Mastered",
      message: "Number System meeda excellent command undi. PYQs start cheyyi."
    },
    {
      min: 16,
      max: 17,
      label: "Test Passed",
      message: "Topic Test complete. Wrong answers revise chesi PYQs ki move avvu."
    },
    {
      min: 12,
      max: 15,
      label: "More Practice Required",
      message: "Weak concepts revise chesi Topic Test repeat cheyyi."
    },
    {
      min: 0,
      max: 11,
      label: "Topic Not Mastered",
      message: "Learn mariyu Level 1–3 practice malli complete cheyyi."
    }
  ],
  masteryRequirements: {
    minimumScore: 16,
    minimumAccuracy: 80,
    retryWrongQuestions: true,
    unlockPYQs: true
  }
};

export default topicTest;