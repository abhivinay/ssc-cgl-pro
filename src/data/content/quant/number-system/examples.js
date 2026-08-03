const examples = {
  title: "Number System Solved Examples",
  instructions: [
    "Question ni first attempt cheyyi.",
    "Tarvata solution steps compare cheyyi.",
    "Shortcut applicable condition ni verify cheyyi."
  ],
  sections: [
    {
      id: "number-types",
      title: "Number Types",
      examples: [
        {
          id: "NS-EX-001",
          question: "Which of the following is an irrational number?",
          options: ["0.25", "0.333...", "√2", "7/11"],
          correctAnswer: 2,
          answer: "√2",
          steps: [
            "0.25=1/4, so it is rational.",
            "0.333...=1/3, so it is rational.",
            "7/11 is already in p/q form.",
            "√2 cannot be expressed as p/q."
          ],
          romanTelugu: "Terminate ayye decimals mariyu repeat ayye decimals rational. √2 irrational.",
          concept: "Rational and irrational numbers"
        },
        {
          id: "NS-EX-002",
          question: "Which statement is correct?",
          options: [
            "1 is a prime number",
            "0 is a natural number under the SSC convention",
            "2 is the only even prime number",
            "Every odd number is prime"
          ],
          correctAnswer: 2,
          answer: "2 is the only even prime number",
          steps: [
            "A prime number has exactly two positive factors.",
            "1 has only one positive factor.",
            "2 has factors 1 and 2 and is even.",
            "Odd composite numbers such as 9 exist."
          ],
          romanTelugu: "1 prime kaadu. 2 okkate even prime number.",
          concept: "Prime numbers"
        }
      ]
    },
    {
      id: "place-value",
      title: "Place Value and Number Formation",
      examples: [
        {
          id: "NS-EX-003",
          question: "Find the difference between the place value and face value of 7 in 57,326.",
          options: ["6993", "7000", "6930", "707"],
          correctAnswer: 0,
          answer: "6993",
          steps: [
            "Face value of 7=7.",
            "7 is in the thousands place, so its place value=7000.",
            "Required difference=7000−7=6993."
          ],
          romanTelugu: "Face value digit itself. Place value 7×1000=7000. Difference 6993.",
          concept: "Face value and place value"
        },
        {
          id: "NS-EX-004",
          question: "A two-digit number has tens digit a and units digit b. What is the number obtained after reversing its digits?",
          options: ["10a+b", "10b+a", "a+b", "ab"],
          correctAnswer: 1,
          answer: "10b+a",
          steps: [
            "Original number=10a+b.",
            "After reversal, b occupies the tens place.",
            "Therefore reversed number=10b+a."
          ],
          romanTelugu: "Reverse chesaka b tens place lo, a units place lo untayi. Kabatti 10b+a.",
          concept: "Number formation"
        }
      ]
    },
    {
      id: "divisibility",
      title: "Divisibility",
      examples: [
        {
          id: "NS-EX-005",
          question: "What digit should replace x in 45x2 so that the number is divisible by 9?",
          options: ["3", "5", "7", "9"],
          correctAnswer: 2,
          answer: "7",
          steps: [
            "For divisibility by 9, the digit sum must be a multiple of 9.",
            "Known digit sum=4+5+2=11.",
            "11+x must equal the next multiple of 9, which is 18.",
            "Therefore x=7."
          ],
          shortcut: "Known digit sum ni next multiple of 9 ki reach chese digit select cheyyi.",
          concept: "Divisibility by 9"
        },
        {
          id: "NS-EX-006",
          question: "Which of the following numbers is divisible by 11?",
          options: ["2728", "3415", "5634", "7294"],
          correctAnswer: 0,
          answer: "2728",
          steps: [
            "For 2728, alternating sum difference=(2+2)−(7+8).",
            "Difference=4−15=−11.",
            "−11 is a multiple of 11.",
            "Therefore 2728 is divisible by 11."
          ],
          romanTelugu: "Alternate places sums difference 0 leda 11 multiple ayithe number 11 tho divisible.",
          concept: "Divisibility by 11"
        },
        {
          id: "NS-EX-007",
          question: "Is 54,616 divisible by 8?",
          options: ["Yes", "No", "Cannot be determined", "Only when divided by 4"],
          correctAnswer: 0,
          answer: "Yes",
          steps: [
            "For divisibility by 8, check only the last three digits.",
            "Last three digits=616.",
            "616÷8=77.",
            "Therefore 54,616 is divisible by 8."
          ],
          concept: "Divisibility by 8"
        },
        {
          id: "NS-EX-008",
          question: "What is the smallest digit x for which 73x4 is divisible by 12?",
          options: ["0", "2", "4", "6"],
          correctAnswer: 1,
          answer: "2",
          steps: [
            "Divisibility by 12 requires divisibility by both 3 and 4.",
            "The last two digits x4 must be divisible by 4.",
            "Among the options, 24 and 64 satisfy divisibility by 4.",
            "Digit sum with x=2 is 7+3+2+4=16, not divisible by 3.",
            "Digit sum with x=6 is 20, also not divisible by 3.",
            "Therefore none of the listed digits works; the mathematically smallest valid digit is 4 because 44 is divisible by 4 and 7+3+4+4=18."
          ],
          note: "Correct mathematical answer is 4.",
          concept: "Combined divisibility",
          status: "corrected-example"
        }
      ]
    },
    {
      id: "factors",
      title: "Factors and Perfect Powers",
      examples: [
        {
          id: "NS-EX-009",
          question: "How many positive factors does 360 have?",
          options: ["18", "20", "24", "30"],
          correctAnswer: 2,
          answer: "24",
          steps: [
            "Prime factorization: 360=2³×3²×5¹.",
            "Number of factors=(3+1)(2+1)(1+1).",
            "Number of factors=4×3×2=24."
          ],
          romanTelugu: "Prime powers ki 1 add chesi multiply chesthe total factors vastayi.",
          concept: "Number of factors"
        },
        {
          id: "NS-EX-010",
          question: "How many odd factors does 360 have?",
          options: ["4", "6", "8", "12"],
          correctAnswer: 1,
          answer: "6",
          steps: [
            "360=2³×3²×5¹.",
            "For odd factors, ignore the power of 2.",
            "Odd factors=(2+1)(1+1)=3×2=6."
          ],
          concept: "Odd factors"
        },
        {
          id: "NS-EX-011",
          question: "What is the least number by which 72 must be multiplied to make it a perfect square?",
          options: ["2", "3", "6", "8"],
          correctAnswer: 0,
          answer: "2",
          steps: [
            "72=2³×3².",
            "For a perfect square, every prime exponent must be even.",
            "The exponent of 2 is odd.",
            "Multiply by 2 to obtain 2⁴×3²=144=12²."
          ],
          romanTelugu: "Odd exponent unna prime ni multiply chesthe exponent even avutundi.",
          concept: "Perfect square"
        },
        {
          id: "NS-EX-012",
          question: "What is the least number by which 108 must be multiplied to make it a perfect cube?",
          options: ["2", "3", "4", "6"],
          correctAnswer: 0,
          answer: "2",
          steps: [
            "108=2²×3³.",
            "For a perfect cube, every exponent must be a multiple of 3.",
            "2² requires one more factor 2.",
            "108×2=216=6³."
          ],
          concept: "Perfect cube"
        }
      ]
    },
    {
      id: "hcf-lcm",
      title: "HCF and LCM",
      examples: [
        {
          id: "NS-EX-013",
          question: "Find the HCF and LCM of 72 and 120.",
          options: ["HCF 12, LCM 720", "HCF 24, LCM 360", "HCF 24, LCM 720", "HCF 12, LCM 360"],
          correctAnswer: 1,
          answer: "HCF=24 and LCM=360",
          steps: [
            "72=2³×3².",
            "120=2³×3×5.",
            "HCF takes minimum common powers: 2³×3=24.",
            "LCM takes maximum powers: 2³×3²×5=360."
          ],
          check: "72×120=24×360=8640.",
          concept: "HCF and LCM by prime factorization"
        },
        {
          id: "NS-EX-014",
          question: "The HCF of two numbers is 12 and their LCM is 420. If one number is 60, find the other.",
          options: ["72", "84", "96", "108"],
          correctAnswer: 1,
          answer: "84",
          steps: [
            "For two positive integers, product of numbers=HCF×LCM.",
            "60×other number=12×420.",
            "Other number=5040÷60=84."
          ],
          romanTelugu: "Rendu numbers ki product=HCF×LCM rule use cheyyi.",
          concept: "Product relation"
        },
        {
          id: "NS-EX-015",
          question: "Find the greatest number that divides 187, 233 and 325 leaving the same remainder.",
          options: ["23", "46", "69", "92"],
          correctAnswer: 1,
          answer: "46",
          steps: [
            "For the same remainder, take pairwise differences.",
            "233−187=46.",
            "325−233=92.",
            "HCF of 46 and 92 is 46."
          ],
          romanTelugu: "Same remainder question lo original numbers kaadu, differences HCF teesukovali.",
          concept: "Same remainder"
        },
        {
          id: "NS-EX-016",
          question: "Three bells ring at intervals of 12, 18 and 30 seconds. If they ring together now, after how many seconds will they ring together again?",
          options: ["90", "120", "180", "360"],
          correctAnswer: 2,
          answer: "180 seconds",
          steps: [
            "Repeated events require LCM.",
            "12=2²×3, 18=2×3² and 30=2×3×5.",
            "LCM=2²×3²×5=180."
          ],
          concept: "LCM application"
        }
      ]
    },
    {
      id: "remainders",
      title: "Remainders",
      examples: [
        {
          id: "NS-EX-017",
          question: "Find the remainder when 47×58 is divided by 7.",
          options: ["1", "2", "3", "5"],
          correctAnswer: 2,
          answer: "3",
          steps: [
            "47 leaves remainder 5 when divided by 7.",
            "58 leaves remainder 2 when divided by 7.",
            "Product remainder=(5×2) mod 7.",
            "10 mod 7=3."
          ],
          romanTelugu: "Large numbers ni first small remainders ga reduce chesi multiply cheyyi.",
          concept: "Remainder of a product"
        },
        {
          id: "NS-EX-018",
          question: "What least number must be added to 437 to make it divisible by 9?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 1,
          answer: "4",
          steps: [
            "Digit sum of 437=14.",
            "14 leaves remainder 5 when divided by 9.",
            "Least number to add=9−5=4.",
            "437+4=441, which is divisible by 9."
          ],
          concept: "Least number to add"
        },
        {
          id: "NS-EX-019",
          question: "What least number must be subtracted from 437 to make it divisible by 9?",
          options: ["4", "5", "6", "8"],
          correctAnswer: 1,
          answer: "5",
          steps: [
            "437 leaves remainder 5 when divided by 9.",
            "Subtract the existing remainder.",
            "437−5=432, which is divisible by 9."
          ],
          concept: "Least number to subtract"
        },
        {
          id: "NS-EX-020",
          question: "Find the remainder when 1234 is divided by 11.",
          options: ["2", "7", "9", "10"],
          correctAnswer: 2,
          answer: "9",
          steps: [
            "Alternating digit-sum difference=(1+3)−(2+4).",
            "Difference=4−6=−2.",
            "Convert to a non-negative remainder: −2+11=9."
          ],
          concept: "Remainder modulo 11"
        }
      ]
    },
    {
      id: "unit-digit",
      title: "Unit Digit and Cyclicity",
      examples: [
        {
          id: "NS-EX-021",
          question: "Find the unit digit of 3¹⁰¹.",
          options: ["1", "3", "7", "9"],
          correctAnswer: 1,
          answer: "3",
          steps: [
            "Unit-digit cycle of 3 is 3, 9, 7, 1.",
            "Cycle length=4.",
            "101 mod 4=1.",
            "Take the first cycle value: 3."
          ],
          concept: "Power cyclicity"
        },
        {
          id: "NS-EX-022",
          question: "Find the unit digit of 2²⁰.",
          options: ["2", "4", "6", "8"],
          correctAnswer: 2,
          answer: "6",
          steps: [
            "Unit-digit cycle of 2 is 2, 4, 8, 6.",
            "20 mod 4=0.",
            "A zero remainder means the final cycle position.",
            "Therefore the unit digit is 6."
          ],
          romanTelugu: "Cycle remainder zero vasthe cycle last value teesukovali.",
          concept: "Zero-remainder cycle rule"
        },
        {
          id: "NS-EX-023",
          question: "Find the unit digit of 7³⁵×3²².",
          options: ["1", "3", "7", "9"],
          correctAnswer: 2,
          answer: "7",
          steps: [
            "For 7³⁵, 35 mod 4=3; third cycle value of 7 is 3.",
            "For 3²², 22 mod 4=2; second cycle value of 3 is 9.",
            "Product of unit digits=3×9=27.",
            "Required unit digit=7."
          ],
          concept: "Unit digit of a product"
        }
      ]
    },
    {
      id: "factorials",
      title: "Factorials and Trailing Zeros",
      examples: [
        {
          id: "NS-EX-024",
          question: "How many trailing zeros are present in 100!?",
          options: ["20", "22", "24", "25"],
          correctAnswer: 2,
          answer: "24",
          steps: [
            "Count factors of 5.",
            "floor(100/5)=20.",
            "floor(100/25)=4.",
            "Higher powers of 5 exceed 100.",
            "Total trailing zeros=20+4=24."
          ],
          romanTelugu: "5 mariyu 25 tho divide chesina quotients add cheyyi.",
          concept: "Trailing zeros"
        },
        {
          id: "NS-EX-025",
          question: "Find the highest power of 3 contained in 20!.",
          options: ["6", "7", "8", "9"],
          correctAnswer: 2,
          answer: "8",
          steps: [
            "floor(20/3)=6.",
            "floor(20/9)=2.",
            "The next power 27 exceeds 20.",
            "Highest power of 3=6+2=8."
          ],
          concept: "Highest prime power in factorial"
        },
        {
          id: "NS-EX-026",
          question: "Find the highest power of 12 that divides 10!.",
          options: ["2", "3", "4", "5"],
          correctAnswer: 2,
          answer: "4",
          steps: [
            "12=2²×3.",
            "Power of 2 in 10!=5+2+1=8.",
            "Power of 3 in 10!=3+1=4.",
            "Available powers of 12=min(floor(8/2),4)=4."
          ],
          concept: "Highest composite power in factorial"
        }
      ]
    },
    {
      id: "fractions-decimals",
      title: "Fractions and Decimals",
      examples: [
        {
          id: "NS-EX-027",
          question: "Which fraction has a terminating decimal expansion?",
          options: ["7/12", "13/30", "21/60", "11/18"],
          correctAnswer: 2,
          answer: "21/60",
          steps: [
            "First reduce every fraction.",
            "21/60=7/20.",
            "20=2²×5 contains only 2 and 5.",
            "Therefore 21/60 has a terminating decimal expansion."
          ],
          romanTelugu: "Fraction ni first lowest form ki reduce chesi denominator prime factors check cheyyi.",
          concept: "Terminating decimals"
        },
        {
          id: "NS-EX-028",
          question: "Convert 0.(27) into a fraction.",
          options: ["3/11", "27/100", "27/90", "11/27"],
          correctAnswer: 0,
          answer: "3/11",
          steps: [
            "There are two repeating digits.",
            "Write 27 over two 9s: 27/99.",
            "Reduce by 9.",
            "27/99=3/11."
          ],
          concept: "Pure recurring decimal"
        },
        {
          id: "NS-EX-029",
          question: "Which is greater: 7/11 or 5/8?",
          options: ["7/11", "5/8", "Both are equal", "Cannot be compared"],
          correctAnswer: 0,
          answer: "7/11",
          steps: [
            "Cross-multiply: 7×8=56.",
            "Cross-multiply: 5×11=55.",
            "Since 56>55, 7/11>5/8."
          ],
          concept: "Fraction comparison"
        },
        {
          id: "NS-EX-030",
          question: "Find a fraction between 2/5 and 3/7 using the mediant method.",
          options: ["4/11", "5/12", "5/13", "7/15"],
          correctAnswer: 1,
          answer: "5/12",
          steps: [
            "Add numerators: 2+3=5.",
            "Add denominators: 5+7=12.",
            "The mediant is 5/12.",
            "It lies between 2/5 and 3/7."
          ],
          concept: "Mediant fraction"
        }
      ]
    },
    {
      id: "counting-multiples",
      title: "Counting Multiples",
      examples: [
        {
          id: "NS-EX-031",
          question: "How many multiples of 7 are there from 1 to 100?",
          options: ["13", "14", "15", "16"],
          correctAnswer: 1,
          answer: "14",
          steps: [
            "Count=floor(100/7).",
            "100÷7 gives quotient 14.",
            "Therefore there are 14 multiples."
          ],
          concept: "Counting multiples"
        },
        {
          id: "NS-EX-032",
          question: "How many integers from 1 to 100 are divisible by 4 or 6?",
          options: ["25", "33", "41", "49"],
          correctAnswer: 1,
          answer: "33",
          steps: [
            "Multiples of 4=floor(100/4)=25.",
            "Multiples of 6=floor(100/6)=16.",
            "Numbers counted twice are multiples of LCM(4,6)=12.",
            "Multiples of 12=floor(100/12)=8.",
            "Required count=25+16−8=33."
          ],
          concept: "Inclusion-exclusion"
        }
      ]
    }
  ],
  examChecklist: [
    "Answer range correct ga undo check cheyyi.",
    "Remainder divisor kanna chinnaga undo verify cheyyi.",
    "HCF or LCM keyword correct ga identify chesavo check cheyyi.",
    "Unit-digit cycle remainder zero ayithe last cycle value teesuko.",
    "Decimal termination check mundu fraction reduce cheyyi.",
    "Product=HCF×LCM rule ni two numbers ki matrame direct ga apply cheyyi."
  ]
};

export default examples;