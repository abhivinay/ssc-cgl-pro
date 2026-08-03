const level2 = {
  title: "Number System Level 2 Practice",
  description: "Divisibility, factors, perfect powers, HCF-LCM, remainders, cyclicity, factorials and decimals meeda SSC-level practice.",
  level: 2,
  difficulty: "medium",
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
      id: "NS-L2-001",
      question: "What is the smallest digit x for which 47x2 is divisible by 9?",
      options: ["3", "5", "7", "9"],
      correctAnswer: 1,
      answer: "5",
      explanation: "The known digit sum is 4+7+2=13. The next multiple of 9 is 18, so x=5.",
      romanTelugu: "Known digits sum 13. Next 9 multiple 18 reach avvadaniki x=5.",
      concept: "Divisibility by 9"
    },
    {
      id: "NS-L2-002",
      question: "Which of the following numbers is divisible by 11?",
      options: ["4730", "5836", "6292", "7314"],
      correctAnswer: 0,
      answer: "4730",
      explanation: "For 4730, the difference between alternate digit sums is (4+3)−(7+0)=0. Therefore, 4730 is divisible by 11.",
      romanTelugu: "4730 lo alternate digit sums 4+3 mariyu 7+0. Difference zero kabatti 11 tho divisible.",
      concept: "Divisibility by 11"
    },
    {
      id: "NS-L2-003",
      question: "What is the greatest four-digit number divisible by 15?",
      options: ["9975", "9980", "9985", "9990"],
      correctAnswer: 3,
      answer: "9990",
      explanation: "A number divisible by 15 must be divisible by both 3 and 5. 9990 ends in 0 and its digit sum is 27.",
      romanTelugu: "15 divisibility kosam 3 mariyu 5 rules rendu satisfy avvali. 9990 correct.",
      concept: "Combined divisibility"
    },
    {
      id: "NS-L2-004",
      question: "How many positive factors does 756 have?",
      options: ["18", "20", "24", "30"],
      correctAnswer: 2,
      answer: "24",
      explanation: "756=2²×3³×7. Number of factors=(2+1)(3+1)(1+1)=24.",
      romanTelugu: "756=2²×3³×7. Powers ki 1 add chesi multiply chesthe 24.",
      concept: "Number of factors"
    },
    {
      id: "NS-L2-005",
      question: "How many even factors does 360 have?",
      options: ["12", "18", "20", "24"],
      correctAnswer: 1,
      answer: "18",
      explanation: "360=2³×3²×5. Total factors=24 and odd factors=(2+1)(1+1)=6. Even factors=24−6=18.",
      romanTelugu: "Even factors kosam total factors nunchi odd factors subtract cheyyi: 24−6=18.",
      concept: "Even factors"
    },
    {
      id: "NS-L2-006",
      question: "What least number must divide 864 to make the quotient a perfect square?",
      options: ["2", "3", "6", "12"],
      correctAnswer: 2,
      answer: "6",
      explanation: "864=2⁵×3³. Remove one factor each of 2 and 3. Then 864÷6=144=12².",
      romanTelugu: "Odd exponents unna 2 mariyu 3 ni remove cheyyali. Kabatti 6 tho divide cheyyi.",
      concept: "Perfect square"
    },
    {
      id: "NS-L2-007",
      question: "What least number must be multiplied by 675 to make it a perfect cube?",
      options: ["3", "5", "15", "25"],
      correctAnswer: 1,
      answer: "5",
      explanation: "675=3³×5². Multiply by 5 to obtain 3³×5³=3375=15³.",
      romanTelugu: "5 power 2 undi. Maroka 5 multiply chesthe anni powers 3 multiples avutayi.",
      concept: "Perfect cube"
    },
    {
      id: "NS-L2-008",
      question: "Find the HCF of 96, 144 and 240.",
      options: ["24", "32", "48", "72"],
      correctAnswer: 2,
      answer: "48",
      explanation: "96=2⁵×3, 144=2⁴×3² and 240=2⁴×3×5. Common minimum powers give 2⁴×3=48.",
      romanTelugu: "Moodu numbers lo common minimum prime powers teesukunte HCF 48.",
      concept: "HCF"
    },
    {
      id: "NS-L2-009",
      question: "Find the least number exactly divisible by 18, 24 and 30.",
      options: ["180", "240", "360", "720"],
      correctAnswer: 2,
      answer: "360",
      explanation: "18=2×3², 24=2³×3 and 30=2×3×5. LCM=2³×3²×5=360.",
      romanTelugu: "Exactly divisible by all ani unte LCM find cheyyali. Answer 360.",
      concept: "LCM"
    },
    {
      id: "NS-L2-010",
      question: "The HCF and LCM of two numbers are 16 and 480. If one number is 96, find the other.",
      options: ["64", "72", "80", "96"],
      correctAnswer: 2,
      answer: "80",
      explanation: "Other number=(16×480)÷96=80.",
      romanTelugu: "Rendu numbers product=HCF×LCM. Second number 80.",
      concept: "HCF-LCM product relation"
    },
    {
      id: "NS-L2-011",
      question: "Find the greatest number that divides 245, 325 and 445 leaving the same remainder.",
      options: ["20", "40", "60", "80"],
      correctAnswer: 1,
      answer: "40",
      explanation: "The differences are 325−245=80 and 445−325=120. HCF(80,120)=40.",
      romanTelugu: "Same remainder kabatti differences 80, 120 ki HCF teesukunte 40.",
      concept: "Same remainder"
    },
    {
      id: "NS-L2-012",
      question: "Three alarms ring every 24, 36 and 54 minutes. If they ring together at 8:00 AM, when will they ring together again?",
      options: ["10:36 AM", "11:00 AM", "11:36 AM", "12:30 PM"],
      correctAnswer: 2,
      answer: "11:36 AM",
      explanation: "LCM(24,36,54)=216 minutes=3 hours 36 minutes. Adding this to 8:00 AM gives 11:36 AM.",
      romanTelugu: "Intervals LCM 216 minutes. 8:00 AM ki 3 hours 36 minutes add chesthe 11:36 AM.",
      concept: "LCM application"
    },
    {
      id: "NS-L2-013",
      question: "What least number must be added to 1875 to make it exactly divisible by 23?",
      options: ["8", "11", "17", "19"],
      correctAnswer: 1,
      answer: "11",
      explanation: "1875=23×81+12. Required addition=23−12=11.",
      romanTelugu: "1875 ni 23 tho divide chesthe remainder 12. Next multiple reach avvadaniki 11 add cheyyali.",
      concept: "Least number to add"
    },
    {
      id: "NS-L2-014",
      question: "Find the remainder when 87×94×101 is divided by 7.",
      options: ["1", "3", "4", "6"],
      correctAnswer: 3,
      answer: "6",
      explanation: "87≡3, 94≡3 and 101≡3 (mod 7). Therefore, the product remainder is 3×3×3=27≡6 (mod 7).",
      romanTelugu: "Prathi number remainder 3. Kabatti 3×3×3=27; 27 ni 7 tho divide chesthe remainder 6.",
      concept: "Remainder of a product"
    },
    {
      id: "NS-L2-015",
      question: "Find the remainder when 2¹⁵ is divided by 7.",
      options: ["1", "2", "4", "6"],
      correctAnswer: 0,
      answer: "1",
      explanation: "Powers of 2 modulo 7 repeat as 2,4,1. Since 15 is divisible by 3, the remainder is 1.",
      romanTelugu: "2 powers modulo 7 cycle 2,4,1. 15 mod 3=0 kabatti last value 1.",
      concept: "Power remainder"
    },
    {
      id: "NS-L2-016",
      question: "Find the unit digit of 13⁵⁷.",
      options: ["1", "3", "7", "9"],
      correctAnswer: 1,
      answer: "3",
      explanation: "Only the unit digit 3 matters. Its cycle is 3,9,7,1. Since 57 mod 4=1, the unit digit is 3.",
      romanTelugu: "Base lo last digit 3 matrame teesuko. 57 mod 4=1 kabatti answer 3.",
      concept: "Unit digit"
    },
    {
      id: "NS-L2-017",
      question: "Find the unit digit of 7²⁶+3¹⁵.",
      options: ["0", "2", "4", "6"],
      correctAnswer: 3,
      answer: "6",
      explanation: "The unit digit of 7²⁶ is 9 and that of 3¹⁵ is 7. Their sum is 16, so the final unit digit is 6.",
      romanTelugu: "7²⁶ unit digit 9, 3¹⁵ unit digit 7. Sum 16 kabatti final unit digit 6.",
      concept: "Unit digit of a sum"
    },
    {
      id: "NS-L2-018",
      question: "How many trailing zeros are present in 125!?",
      options: ["28", "30", "31", "32"],
      correctAnswer: 2,
      answer: "31",
      explanation: "Trailing zeros=floor(125/5)+floor(125/25)+floor(125/125)=25+5+1=31.",
      romanTelugu: "125 ni 5, 25, 125 tho divide chesina quotients 25+5+1=31.",
      concept: "Trailing zeros"
    },
    {
      id: "NS-L2-019",
      question: "Find the highest power of 5 contained in 200!.",
      options: ["40", "47", "49", "50"],
      correctAnswer: 2,
      answer: "49",
      explanation: "The power of 5 is floor(200/5)+floor(200/25)+floor(200/125)=40+8+1=49.",
      romanTelugu: "200 ni 5, 25, 125 tho divide chesi quotients add chesthe 49.",
      concept: "Highest prime power in factorial"
    },
    {
      id: "NS-L2-020",
      question: "How many integers from 50 to 200, inclusive, are divisible by 6?",
      options: ["24", "25", "26", "27"],
      correctAnswer: 1,
      answer: "25",
      explanation: "Required count=floor(200/6)−floor(49/6)=33−8=25.",
      romanTelugu: "Inclusive range formula use cheyyi: floor(200/6)−floor(49/6)=25.",
      concept: "Counting multiples"
    }
  ],
  resultBands: [
    {
      min: 18,
      max: 20,
      label: "Excellent",
      message: "Level 2 concepts strong ga unnayi. Level 3 start cheyyi."
    },
    {
      min: 16,
      max: 17,
      label: "Passed",
      message: "Level 2 complete. Wrong answers revise chesi Level 3 ki move avvu."
    },
    {
      min: 12,
      max: 15,
      label: "Needs Practice",
      message: "Weak concepts identify chesi Level 2 repeat cheyyi."
    },
    {
      min: 0,
      max: 11,
      label: "Revision Required",
      message: "Learn, formulas, shortcuts mariyu solved examples revise cheyyi."
    }
  ],
  masteryRequirements: {
    minimumScore: 16,
    minimumAccuracy: 80,
    retryWrongQuestions: true,
    unlockNextLevel: true
  }
};

export default level2;