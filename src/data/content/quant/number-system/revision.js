const revision = {
  title: "Number System Revision",
  description: "SSC CGL Number System concepts, formulas, rules and shortcuts kosam quick revision module.",
  estimatedMinutes: 30,
  sections: [
    {
      id: "NS-REV-01",
      title: "Types of Numbers",
      points: [
        "Natural numbers: 1, 2, 3, 4, ...",
        "Whole numbers: 0, 1, 2, 3, ...",
        "Integers: ..., −2, −1, 0, 1, 2, ...",
        "Rational number: p/q form lo rayagalige number, where q ≠ 0.",
        "Irrational number: p/q form lo rayaleni non-terminating, non-repeating decimal.",
        "Real numbers = Rational numbers + Irrational numbers.",
        "Prime number has exactly two positive factors: 1 and itself.",
        "Composite number has more than two positive factors.",
        "1 is neither prime nor composite.",
        "2 is the only even prime number."
      ],
      memoryTrick: "Natural starts from 1; Whole includes 0; Integer includes negatives."
    },
    {
      id: "NS-REV-02",
      title: "Even and Odd Numbers",
      formulas: [
        "Even ± Even = Even",
        "Odd ± Odd = Even",
        "Even ± Odd = Odd",
        "Even × any integer = Even",
        "Odd × Odd = Odd"
      ],
      points: [
        "Even number last digit: 0, 2, 4, 6 or 8.",
        "Odd number last digit: 1, 3, 5, 7 or 9.",
        "Sum of an even number of odd numbers is even.",
        "Sum of an odd number of odd numbers is odd."
      ]
    },
    {
      id: "NS-REV-03",
      title: "Divisibility Rules",
      rules: [
        {
          divisor: 2,
          rule: "Last digit 0, 2, 4, 6 or 8 ayithe divisible by 2."
        },
        {
          divisor: 3,
          rule: "Digit sum 3 tho divisible ayithe number divisible by 3."
        },
        {
          divisor: 4,
          rule: "Last two digits 4 tho divisible ayithe number divisible by 4."
        },
        {
          divisor: 5,
          rule: "Last digit 0 or 5 ayithe divisible by 5."
        },
        {
          divisor: 6,
          rule: "Number 2 mariyu 3 rendu rules satisfy cheyyali."
        },
        {
          divisor: 8,
          rule: "Last three digits 8 tho divisible ayithe number divisible by 8."
        },
        {
          divisor: 9,
          rule: "Digit sum 9 tho divisible ayithe number divisible by 9."
        },
        {
          divisor: 10,
          rule: "Last digit 0 ayithe divisible by 10."
        },
        {
          divisor: 11,
          rule: "Alternate digit sums difference 0 or multiple of 11 ayithe divisible by 11."
        },
        {
          divisor: 12,
          rule: "Number 3 mariyu 4 rendu rules satisfy cheyyali."
        }
      ],
      memoryTrick: "6 = 2×3 and 12 = 3×4; rendu component rules check cheyyi."
    },
    {
      id: "NS-REV-04",
      title: "Prime Factorisation and Factors",
      formulas: [
        "If N = pᵃ×qᵇ×rᶜ, total factors = (a+1)(b+1)(c+1).",
        "Product of all positive factors of N = N^(d/2), where d is the number of factors.",
        "For a perfect square, number of factors is odd.",
        "For every non-square positive integer, number of factors is even."
      ],
      points: [
        "Odd factors count kosam prime factorisation lo power of 2 ni ignore cheyyi.",
        "Even factors = Total factors − Odd factors.",
        "Perfect-square factor kosam selected prime exponents anni even undali.",
        "Perfect-cube factor kosam selected prime exponents anni multiples of 3 undali."
      ],
      shortcuts: [
        "Least multiplier for a perfect square: odd exponents unna prime factors ni multiply cheyyi.",
        "Least divisor for a perfect square: odd exponents unna prime factors ni divide cheyyi.",
        "Perfect cube kosam exponents ni nearest required multiple of 3 ki adjust cheyyi."
      ]
    },
    {
      id: "NS-REV-05",
      title: "HCF and LCM",
      formulas: [
        "For two positive integers: First number × Second number = HCF × LCM.",
        "HCF uses the minimum common prime powers.",
        "LCM uses the maximum prime powers."
      ],
      applications: [
        {
          type: "Same remainder",
          rule: "Numbers differences ki HCF teesukovali."
        },
        {
          type: "Greatest divisor with specified remainders",
          rule: "Prathi number nunchi corresponding remainder subtract chesi HCF teesukovali."
        },
        {
          type: "Events occurring together",
          rule: "Intervals ki LCM teesukovali."
        },
        {
          type: "Least number leaving same remainder",
          rule: "Divisors LCM ki common remainder add cheyyali."
        }
      ],
      caution: "HCF×LCM relation direct-ga two numbers ki maatrame use cheyyali."
    },
    {
      id: "NS-REV-06",
      title: "Remainders",
      formulas: [
        "Dividend = Divisor × Quotient + Remainder.",
        "0 ≤ Remainder < Divisor.",
        "(a+b) mod m = [(a mod m)+(b mod m)] mod m.",
        "(a−b) mod m = [(a mod m)−(b mod m)] mod m.",
        "(a×b) mod m = [(a mod m)×(b mod m)] mod m."
      ],
      shortcuts: [
        "Least number to subtract for exact divisibility = current remainder.",
        "Least number to add = divisor − remainder, when remainder is not zero.",
        "Large powers ki repeating remainder cycle identify cheyyi.",
        "Exponent cycle length tho exactly divisible ayithe cycle lo last value use cheyyi."
      ]
    },
    {
      id: "NS-REV-07",
      title: "Unit Digit and Cyclicity",
      cycles: [
        {
          digit: "0, 1, 5, 6",
          cycle: "Same digit always",
          length: 1
        },
        {
          digit: 4,
          cycle: "4, 6",
          length: 2
        },
        {
          digit: 9,
          cycle: "9, 1",
          length: 2
        },
        {
          digit: 2,
          cycle: "2, 4, 8, 6",
          length: 4
        },
        {
          digit: 3,
          cycle: "3, 9, 7, 1",
          length: 4
        },
        {
          digit: 7,
          cycle: "7, 9, 3, 1",
          length: 4
        },
        {
          digit: 8,
          cycle: "8, 4, 2, 6",
          length: 4
        }
      ],
      method: [
        "Base last digit maatrame teesuko.",
        "Exponent ni cycle length tho divide cheyyi.",
        "Remainder 0 ayithe cycle last value teesuko.",
        "Products or sums lo individual unit digits calculate chesi combine cheyyi."
      ]
    },
    {
      id: "NS-REV-08",
      title: "Factorials and Trailing Zeros",
      formulas: [
        "n! = n×(n−1)×(n−2)×...×2×1.",
        "Trailing zeros in n! = ⌊n/5⌋+⌊n/25⌋+⌊n/125⌋+...",
        "Highest power of prime p in n! = ⌊n/p⌋+⌊n/p²⌋+⌊n/p³⌋+..."
      ],
      compositePowerMethod: [
        "Composite base ni prime factors ga split cheyyi.",
        "n! lo each required prime exponent calculate cheyyi.",
        "Available exponent ni required exponent tho divide cheyyi.",
        "Vachina quotients lo minimum value final answer."
      ],
      example: "18=2×3². Highest power of 18 in n! = min(v₂(n!), ⌊v₃(n!)/2⌋)."
    },
    {
      id: "NS-REV-09",
      title: "Decimals and Fractions",
      rules: [
        "Lowest form denominator lo 2 and/or 5 maatrame unte decimal terminates.",
        "Denominator lo 2 or 5 kaakunda vere prime factor unte decimal non-terminating recurring.",
        "Terminating decimal and recurring decimal rendu rational numbers.",
        "Non-terminating, non-recurring decimal irrational number."
      ],
      conversions: [
        "0.333... = 1/3",
        "0.666... = 2/3",
        "0.1666... = 1/6",
        "0.125 = 1/8",
        "0.25 = 1/4",
        "0.5 = 1/2",
        "0.75 = 3/4"
      ],
      comparisonMethods: [
        "Fractions ni common denominator method tho compare cheyyachu.",
        "a/b and c/d compare cheyyadaniki ad and bc cross-multiply cheyyi.",
        "Positive fractions lo ad > bc ayithe a/b > c/d."
      ]
    },
    {
      id: "NS-REV-10",
      title: "Counting Multiples",
      formulas: [
        "1 to N lo k multiples count = ⌊N/k⌋.",
        "A to B lo k multiples count = ⌊B/k⌋−⌊(A−1)/k⌋.",
        "Divisible by a or b = ⌊N/a⌋+⌊N/b⌋−⌊N/LCM(a,b)⌋.",
        "Divisible by neither a nor b = N−count divisible by a or b."
      ],
      memoryTrick: "OR ante add chesi common multiples subtract cheyyi."
    }
  ],
  quickFacts: [
    "Smallest prime number = 2.",
    "Smallest composite number = 4.",
    "Two consecutive integers are always co-prime.",
    "Two distinct prime numbers are always co-prime.",
    "HCF of co-prime numbers = 1.",
    "LCM of co-prime numbers = their product.",
    "A number divisible by 6 must be divisible by both 2 and 3.",
    "Every perfect square has an odd number of positive factors.",
    "Remainder can never be equal to or greater than the divisor.",
    "For unit-digit problems, complete number badulu last digit maatrame important."
  ],
  commonTraps: [
    "1 ni prime number ani mark cheyyakudadhu.",
    "Divisibility by 6 ki only even check cheyyadam saripodu; divisibility by 3 kuda check cheyyali.",
    "Number of factors formula lo exponents ki 1 add cheyyadam marchipovaddu.",
    "Same-remainder questions lo original numbers HCF kaadu; differences HCF teesukovali.",
    "Power cycle remainder 0 vachinappudu first value kaadu; cycle last value teesukovali.",
    "Least number to add and least number to subtract formulas confuse cheyyakudadhu.",
    "Terminating decimal rule apply chese mundu fraction ni lowest form ki reduce cheyyali.",
    "HCF×LCM relation ni three or more numbers ki direct-ga apply cheyyakudadhu.",
    "Factorial trailing zeros lo powers of 5 anni count cheyyali.",
    "Inclusion-exclusion lo common multiples ni LCM dvara subtract cheyyali."
  ],
  revisionChecklist: [
    {
      id: "NS-RC-01",
      task: "Number types and prime-number facts revise cheyyi.",
      completed: false
    },
    {
      id: "NS-RC-02",
      task: "Divisibility rules 2 to 12 recall cheyyi.",
      completed: false
    },
    {
      id: "NS-RC-03",
      task: "Factors, perfect square and perfect cube formulas revise cheyyi.",
      completed: false
    },
    {
      id: "NS-RC-04",
      task: "HCF-LCM applications identify cheyyi.",
      completed: false
    },
    {
      id: "NS-RC-05",
      task: "Remainder and unit-digit cycles recall cheyyi.",
      completed: false
    },
    {
      id: "NS-RC-06",
      task: "Factorial and trailing-zero formulas revise cheyyi.",
      completed: false
    },
    {
      id: "NS-RC-07",
      task: "Decimal termination and fraction comparison rules revise cheyyi.",
      completed: false
    }
  ],
  masteryCheck: {
    requiredChecklistItems: 7,
    recommendedRevisionMinutes: 30,
    repeatAfterDays: [1, 3, 7, 15, 30],
    nextModule: "flashcards"
  }
};

export default revision;