const learn = {
  title: "Number System: Beginner to SSC",
  objectives: [
    "Classify numbers correctly",
    "Use divisibility rules without long division",
    "Find factors, HCF and LCM",
    "Solve remainder, unit-digit and factorial questions",
    "Convert and compare fractions and decimals"
  ],
  whyWhatWhenHow: {
    why: "Number System builds the calculation base used throughout Quant and directly produces SSC questions.",
    what: "It studies types of numbers, divisibility, factors, multiples, remainders, cyclicity, factorials, fractions and decimals.",
    when: "Use these ideas whenever a question contains divisibility, equal grouping, repeating powers, last digits or least/greatest values.",
    how: "Identify the question family first, select its rule, reduce the numbers, and verify the final condition."
  },
  sections: [
    {
      id: "types",
      title: "1. Types of Numbers",
      beginner: "Natural numbers are counting numbers: 1, 2, 3... Whole numbers include 0. Integers include negative numbers, 0 and positive numbers.",
      romanTelugu: "Natural numbers ante 1 nundi start ayye counting numbers. Whole numbers lo 0 kuda untundi. Integers lo negative numbers, zero, positive numbers anni untayi.",
      teacher: "Remember the nesting: Natural ⊂ Whole ⊂ Integers ⊂ Rational ⊂ Real.",
      points: [
        "Rational number: p/q where p and q are integers and q ≠ 0",
        "Irrational number: cannot be written as p/q; its decimal is non-terminating and non-repeating",
        "Real numbers contain rational and irrational numbers",
        "Even number is divisible by 2; odd number is not",
        "Prime number has exactly two positive factors: 1 and itself",
        "1 is neither prime nor composite; 2 is the only even prime"
      ],
      commonMistakes: [
        "Calling 0 a natural number under the SSC convention",
        "Calling 1 prime",
        "Assuming every non-terminating decimal is irrational; repeating decimals are rational"
      ]
    },
    {
      id: "place-value",
      title: "2. Face Value and Place Value",
      beginner: "Face value is the digit itself. Place value equals digit × value of its position.",
      romanTelugu: "Digit entha undo ade face value. Aa digit ye place lo undo dani batti place value vastundi.",
      teacher: "In 57,326, the face value of 7 is 7 and its place value is 7,000.",
      points: [
        "Two-digit number ab = 10a + b",
        "Three-digit number abc = 100a + 10b + c",
        "Reversing ab gives 10b + a; difference is 9(a − b)"
      ]
    },
    {
      id: "divisibility",
      title: "3. Divisibility Rules",
      beginner: "Divisibility rules decide whether division leaves remainder zero.",
      romanTelugu: "Long division cheyakunda number exact ga divide avutunda leda ani rules tho fast ga telusukovachu.",
      teacher: "For composite divisors, split only into coprime factors: divisibility by 12 requires both 3 and 4.",
      rules: [
        "2: last digit is even",
        "3: sum of digits is divisible by 3",
        "4: last two digits are divisible by 4",
        "5: last digit is 0 or 5",
        "6: divisible by both 2 and 3",
        "8: last three digits are divisible by 8",
        "9: sum of digits is divisible by 9",
        "10: last digit is 0",
        "11: alternating digit-sum difference is 0 or a multiple of 11",
        "12: divisible by both 3 and 4",
        "15: divisible by both 3 and 5",
        "25: last two digits are 00, 25, 50 or 75"
      ],
      commonMistakes: [
        "Checking only divisibility by 2 for 6",
        "Using the last two digits for divisibility by 8",
        "Forgetting that factors used in a combined test must be coprime"
      ]
    },
    {
      id: "prime-factorization",
      title: "4. Factors and Prime Factorization",
      beginner: "A factor divides a number exactly. Prime factorization writes a number as a product of primes.",
      romanTelugu: "Oka number ni remainder lekunda divide chesevi factors. Number ni prime numbers product ga rayadam prime factorization.",
      teacher: "If N = p^a q^b r^c, the number of positive factors is (a+1)(b+1)(c+1).",
      points: [
        "Sum of factors = [(p^(a+1)−1)/(p−1)] × [(q^(b+1)−1)/(q−1)] ...",
        "Number of odd factors: ignore the power of 2 and apply the factor-count formula",
        "A perfect square has an odd number of factors",
        "For a perfect square, every prime exponent is even; for a perfect cube, every exponent is a multiple of 3"
      ],
      derivation: "For p^a, a factor may contain p^0 through p^a: a+1 choices. Independent choices multiply."
    },
    {
      id: "hcf-lcm",
      title: "5. HCF and LCM",
      beginner: "HCF is the greatest common divisor. LCM is the smallest positive common multiple.",
      romanTelugu: "Andariki common ga divide chese biggest number HCF. Anni numbers tho divide ayye smallest number LCM.",
      teacher: "Use HCF for greatest equal size or grouping; use LCM for earliest repetition or least exactly divisible number.",
      points: [
        "Prime-factor method: HCF takes minimum common powers; LCM takes maximum powers",
        "For two positive integers: number 1 × number 2 = HCF × LCM",
        "For fractions: HCF = HCF of numerators / LCM of denominators",
        "For fractions: LCM = LCM of numerators / HCF of denominators"
      ],
      commonMistakes: [
        "Applying product = HCF × LCM directly to three numbers",
        "Choosing LCM when the wording asks for greatest equal measure"
      ]
    },
    {
      id: "remainders",
      title: "6. Remainders",
      beginner: "Dividend = Divisor × Quotient + Remainder, where 0 ≤ remainder < divisor.",
      romanTelugu: "Divide chesina taruvata migiledi remainder. Remainder eppudu divisor kanna chinnaga undali.",
      teacher: "Replace every large number by its remainder before adding, subtracting or multiplying.",
      points: [
        "(a+b) mod m = [(a mod m)+(b mod m)] mod m",
        "(ab) mod m = [(a mod m)(b mod m)] mod m",
        "If N leaves r on division by d, N = dq+r",
        "Greatest divisor leaving the same remainder from several numbers = HCF of their pairwise differences",
        "Least number to add for divisibility by d = d−r when r ≠ 0; least to subtract = r"
      ],
      commonMistakes: [
        "Reporting a remainder equal to or greater than the divisor",
        "Using d−r for subtraction"
      ]
    },
    {
      id: "unit-digit",
      title: "7. Unit Digit and Cyclicity",
      beginner: "Only the unit digit of the base controls the unit digit of its powers.",
      romanTelugu: "Power entha pedda unna base last digit ni matrame chuste unit digit dorukutundi.",
      teacher: "Reduce the exponent by the cycle length. If the remainder is 0, take the last position in the cycle.",
      cycles: [
        "0→0",
        "1→1",
        "2→2,4,8,6",
        "3→3,9,7,1",
        "4→4,6",
        "5→5",
        "6→6",
        "7→7,9,3,1",
        "8→8,4,2,6",
        "9→9,1"
      ],
      points: [
        "Cycle length is 4 for 2, 3, 7 and 8",
        "Cycle length is 2 for 4 and 9",
        "0, 1, 5 and 6 remain unchanged"
      ]
    },
    {
      id: "factorials-zeros",
      title: "8. Factorials and Trailing Zeros",
      beginner: "n! means 1×2×3×...×n. A trailing zero comes from a factor 10 = 2×5.",
      romanTelugu: "n factorial ante 1 nundi n varaku multiplication. Last lo zero ravadaniki 2×5 pair kavali; factorial lo 2 ekkuva kabatti 5s count chestam.",
      teacher: "Zeros in n! = floor(n/5)+floor(n/25)+floor(n/125)+...",
      derivation: "Every multiple of 5 supplies at least one 5; multiples of 25 supply one extra; multiples of 125 supply another.",
      points: [
        "Highest power of prime p in n! = floor(n/p)+floor(n/p²)+...",
        "0! = 1"
      ]
    },
    {
      id: "fractions-decimals",
      title: "9. Fractions and Decimals",
      beginner: "A fraction p/q terminates in decimal form only when its reduced denominator contains no prime other than 2 or 5.",
      romanTelugu: "Fraction ni lowest form ki techina tarvata denominator lo 2 mariyu 5 thappa vere prime unte decimal repeat avutundi.",
      teacher: "For p/q in lowest terms: q = 2^m5^n gives a terminating decimal with max(m,n) places.",
      points: [
        "Pure recurring decimal 0.(abc) = abc/999",
        "Mixed recurring decimal = (number formed through one repeat − non-repeating part)/number made of 9s then 0s",
        "To compare positive fractions a/b and c/d, compare ad and bc",
        "Between a/b and c/d, the mediant (a+c)/(b+d) lies between them when both are positive and a/b<c/d"
      ]
    }
  ],
  finalStrategy: [
    "Classify the problem",
    "Write the governing rule",
    "Reduce before calculating",
    "Check remainder, range and units",
    "Use options when faster"
  ]
};

export default learn;