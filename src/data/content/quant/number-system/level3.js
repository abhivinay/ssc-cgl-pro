const level3 = {
  title: "Number System Level 3 Practice",
  description: "Advanced divisibility, factors, HCF-LCM, remainders, cyclicity, factorials and number properties meeda SSC CGL-level practice.",
  level: 3,
  difficulty: "hard",
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
      id: "NS-L3-001",
      question: "What is the smallest digit x such that 583x4 is divisible by 11?",
      options: ["0", "2", "4", "6"],
      correctAnswer: 2,
      answer: "4",
      explanation: "For divisibility by 11, the difference between alternate digit sums must be 0 or a multiple of 11. Here, (5+3+4)−(8+x)=4−x. Therefore, x=4.",
      romanTelugu: "Alternate digit sums difference zero avvadaniki x=4 undali.",
      concept: "Divisibility by 11"
    },
    {
      id: "NS-L3-002",
      question: "What least number must be added to 7856 so that the result is divisible by both 9 and 11?",
      options: ["52", "55", "64", "65"],
      correctAnswer: 2,
      answer: "64",
      explanation: "A number divisible by both 9 and 11 must be divisible by LCM(9,11)=99. The next multiple of 99 after 7856 is 7920. Required addition=7920−7856=64.",
      romanTelugu: "9 mariyu 11 rendu tho divisible kavali kabatti LCM 99. Next multiple 7920; difference 64.",
      concept: "Combined divisibility"
    },
    {
      id: "NS-L3-003",
      question: "How many positive factors of 3600 are perfect squares?",
      options: ["6", "9", "12", "15"],
      correctAnswer: 2,
      answer: "12",
      explanation: "3600=2⁴×3²×5². For a square factor, every exponent must be even. The possible exponents are 0,2,4 for 2 and 0,2 for both 3 and 5. Count=3×2×2=12.",
      romanTelugu: "Square factor lo prime exponents even ga undali. Choices count 3×2×2=12.",
      concept: "Perfect-square factors"
    },
    {
      id: "NS-L3-004",
      question: "How many factors of 540 are divisible by 6?",
      options: ["8", "10", "12", "16"],
      correctAnswer: 2,
      answer: "12",
      explanation: "540=2²×3³×5. A factor divisible by 6 must contain at least 2¹ and 3¹. Valid exponent choices are 2 for the power of 2, 3 for the power of 3 and 2 for the power of 5. Count=2×3×2=12.",
      romanTelugu: "Factor lo minimum 2¹ mariyu 3¹ undali. Valid exponent choices multiply chesthe 12.",
      concept: "Restricted factors"
    },
    {
      id: "NS-L3-005",
      question: "What least number must divide 3888 so that the quotient becomes a perfect cube?",
      options: ["2", "6", "9", "18"],
      correctAnswer: 3,
      answer: "18",
      explanation: "3888=2⁴×3⁵. Divide it by 2¹×3²=18 to leave 2³×3³=216=6³.",
      romanTelugu: "Prime exponents ni 3 multiples ga marchadaniki 2¹×3² ante 18 divide cheyyali.",
      concept: "Perfect cube"
    },
    {
      id: "NS-L3-006",
      question: "Find the greatest number that divides 615, 963 and 1311 leaving the same remainder in each case.",
      options: ["87", "116", "174", "348"],
      correctAnswer: 3,
      answer: "348",
      explanation: "The required divisor is the HCF of the differences. 963−615=348 and 1311−963=348. Therefore, HCF(348,348)=348.",
      romanTelugu: "Same remainder kosam numbers differences ki HCF teesukovali. Rendu differences 348 kabatti answer 348.",
      concept: "Same remainder"
    },
    {
      id: "NS-L3-007",
      question: "Find the least number greater than 5 that leaves remainder 5 when divided by 12, 18 and 30.",
      options: ["175", "180", "185", "365"],
      correctAnswer: 2,
      answer: "185",
      explanation: "Subtracting the common remainder 5 leaves a number divisible by LCM(12,18,30)=180. Therefore, the least required number is 180+5=185.",
      romanTelugu: "Common remainder 5 ni subtract chesthe migilina number LCM 180 tho divisible avvali. Answer 185.",
      concept: "Common remainder"
    },
    {
      id: "NS-L3-008",
      question: "The product of two numbers is 20736 and their HCF is 24. If their LCM is 864, which pair represents the two numbers?",
      options: ["96 and 216", "72 and 288", "48 and 432", "144 and 144"],
      correctAnswer: 0,
      answer: "96 and 216",
      explanation: "96×216=20736 and HCF(96,216)=24. Their LCM is 20736÷24=864.",
      romanTelugu: "96 mariyu 216 product 20736. Vati HCF 24, LCM 864 kabatti ide correct pair.",
      concept: "HCF-LCM relation"
    },
    {
      id: "NS-L3-009",
      question: "What is the remainder when 7¹⁰³ is divided by 13?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      answer: "6",
      explanation: "The powers of 7 modulo 13 repeat after 12 terms. Since 103=12×8+7, evaluate 7⁷ modulo 13. The remainder is 6.",
      romanTelugu: "Power cycle 12. 103 ni 12 tho divide chesthe remainder 7. Kabatti 7⁷ remainder 6.",
      concept: "Power remainder"
    },
    {
      id: "NS-L3-010",
      question: "Find the remainder when 3⁵⁰+4⁵⁰ is divided by 5.",
      options: ["0", "1", "2", "4"],
      correctAnswer: 0,
      answer: "0",
      explanation: "3⁴ leaves remainder 1 when divided by 5, so 3⁵⁰ leaves remainder 4. Also, 4² leaves remainder 1, so 4⁵⁰ leaves remainder 1. Their sum leaves remainder 0.",
      romanTelugu: "Rendu powers remainders 4 mariyu 1. Sum 5 kabatti final remainder 0.",
      concept: "Remainder of a sum"
    },
    {
      id: "NS-L3-011",
      question: "Find the remainder when 1!+2!+3!+...+10! is divided by 10.",
      options: ["1", "3", "5", "7"],
      correctAnswer: 1,
      answer: "3",
      explanation: "For n≥5, n! is divisible by 10. Therefore, only 1!+2!+3!+4!=1+2+6+24=33 matters. The remainder is 3.",
      romanTelugu: "5! nunchi anni terms 10 tho divisible. First four factorials sum 33; remainder 3.",
      concept: "Factorial remainder"
    },
    {
      id: "NS-L3-012",
      question: "What is the unit digit of 17²³×23¹⁷?",
      options: ["1", "3", "7", "9"],
      correctAnswer: 3,
      answer: "9",
      explanation: "The unit digit of 17²³ is the same as that of 7²³, which is 3. The unit digit of 23¹⁷ is the same as that of 3¹⁷, which is also 3. Therefore, the product has unit digit 9.",
      romanTelugu: "7²³ unit digit 3, 3¹⁷ unit digit 3. Product 3×3=9 kabatti unit digit 9.",
      concept: "Unit digit of a product"
    },
    {
      id: "NS-L3-013",
      question: "Find the last two digits of 3²⁰.",
      options: ["01", "21", "41", "81"],
      correctAnswer: 0,
      answer: "01",
      explanation: "3¹⁰=59049, whose last two digits are 49. Squaring 49 gives 2401, so the last two digits of 3²⁰ are 01.",
      romanTelugu: "3¹⁰ last two digits 49. 49²=2401 kabatti final last two digits 01.",
      concept: "Last two digits"
    },
    {
      id: "NS-L3-014",
      question: "How many trailing zeros are present in 500!?",
      options: ["120", "122", "124", "125"],
      correctAnswer: 2,
      answer: "124",
      explanation: "Trailing zeros=floor(500/5)+floor(500/25)+floor(500/125)=100+20+4=124.",
      romanTelugu: "500 ni 5, 25, 125 tho divide chesina quotients add chesthe 124.",
      concept: "Trailing zeros"
    },
    {
      id: "NS-L3-015",
      question: "Find the highest power of 18 that exactly divides 100!.",
      options: ["22", "24", "25", "48"],
      correctAnswer: 1,
      answer: "24",
      explanation: "18=2×3². The exponent of 3 in 100! is 33+11+3+1=48. Since each factor of 18 requires two factors of 3, the highest power is 48÷2=24.",
      romanTelugu: "18=2×3². 100! lo 3 power 48. Prathi 18 ki rendu 3 factors kavali kabatti answer 24.",
      concept: "Highest composite power"
    },
    {
      id: "NS-L3-016",
      question: "How many integers from 1 to 500 are divisible by neither 6 nor 8?",
      options: ["375", "396", "417", "438"],
      correctAnswer: 0,
      answer: "375",
      explanation: "Multiples of 6=83, multiples of 8=62 and multiples of LCM(6,8)=24 are 20. Numbers divisible by either 6 or 8=83+62−20=125. Required count=500−125=375.",
      romanTelugu: "6 or 8 tho divisible numbers 125. Total 500 nunchi subtract chesthe 375.",
      concept: "Inclusion-exclusion"
    },
    {
      id: "NS-L3-017",
      question: "Which of the following fractions is the greatest?",
      options: ["17/23", "23/31", "29/39", "35/47"],
      correctAnswer: 3,
      answer: "35/47",
      explanation: "Comparing the fractions by cross multiplication gives 35/47 as the greatest.",
      romanTelugu: "Fractions ni cross multiplication tho compare chesthe 35/47 greatest.",
      concept: "Fraction comparison"
    },
    {
      id: "NS-L3-018",
      question: "Convert 0.1666..., where only 6 repeats, into a fraction.",
      options: ["1/5", "1/6", "5/24", "7/40"],
      correctAnswer: 1,
      answer: "1/6",
      explanation: "Let x=0.1666.... Then 10x=1.666... and 100x=16.666.... Subtracting gives 90x=15, so x=1/6.",
      romanTelugu: "x=0.1666... ani teesukoni subtraction method use chesthe 90x=15. Kabatti x=1/6.",
      concept: "Mixed recurring decimal"
    },
    {
      id: "NS-L3-019",
      question: "How many three-digit numbers are divisible by 7?",
      options: ["127", "128", "129", "130"],
      correctAnswer: 1,
      answer: "128",
      explanation: "Required count=floor(999/7)−floor(99/7)=142−14=128.",
      romanTelugu: "999 varaku 7 multiples nunchi 99 varaku multiples subtract chesthe 128.",
      concept: "Counting multiples"
    },
    {
      id: "NS-L3-020",
      question: "A number leaves remainder 4 when divided by 7. What remainder will its square leave when divided by 7?",
      options: ["1", "2", "4", "6"],
      correctAnswer: 1,
      answer: "2",
      explanation: "If the number leaves remainder 4, its square leaves the same remainder as 4²=16. Dividing 16 by 7 leaves remainder 2.",
      romanTelugu: "Number remainder 4 kabatti square remainder 4²=16. 16 ni 7 tho divide chesthe remainder 2.",
      concept: "Remainder transformation"
    }
  ],
  resultBands: [
    {
      min: 18,
      max: 20,
      label: "Advanced Mastery",
      message: "Number System meeda strong command undi. Topic Test start cheyyi."
    },
    {
      min: 16,
      max: 17,
      label: "Passed",
      message: "Level 3 complete. Wrong answers revise chesi Topic Test ki move avvu."
    },
    {
      min: 12,
      max: 15,
      label: "Needs Advanced Practice",
      message: "Weak concepts identify chesi Level 3 repeat cheyyi."
    },
    {
      min: 0,
      max: 11,
      label: "Revision Required",
      message: "Learn, formulas, shortcuts mariyu previous levels revise cheyyi."
    }
  ],
  masteryRequirements: {
    minimumScore: 16,
    minimumAccuracy: 80,
    retryWrongQuestions: true,
    unlockTopicTest: true
  }
};

export default level3;