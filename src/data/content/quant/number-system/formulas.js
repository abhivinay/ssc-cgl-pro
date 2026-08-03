const formulas = {
  title: "Number System Formula Sheet",
  sections: [
    {
      id: "number-formation",
      title: "Number Formation",
      formulas: [
        {
          name: "Two-digit number",
          formula: "10a + b",
          explanation: "a is the tens digit and b is the units digit.",
          romanTelugu: "Tens digit a, units digit b ayithe number 10a+b."
        },
        {
          name: "Reversed two-digit number",
          formula: "10b + a",
          explanation: "Interchange the tens and units digits.",
          romanTelugu: "Digits reverse chesthe number 10b+a."
        },
        {
          name: "Difference after reversal",
          formula: "|(10a+b)−(10b+a)| = 9|a−b|",
          explanation: "The difference is always divisible by 9.",
          romanTelugu: "Two-digit number mariyu reverse madhya difference eppudu 9 tho divisible."
        },
        {
          name: "Three-digit number",
          formula: "100a + 10b + c",
          explanation: "a, b and c are the hundreds, tens and units digits."
        }
      ]
    },
    {
      id: "consecutive-numbers",
      title: "Consecutive Numbers",
      formulas: [
        {
          name: "Sum of first n natural numbers",
          formula: "n(n+1)/2",
          derivation: "Pair the first and last terms: (1+n), (2+n−1), and so on.",
          romanTelugu: "1 nundi n varaku natural numbers sum kosam n(n+1)/2."
        },
        {
          name: "Sum of first n even numbers",
          formula: "n(n+1)",
          derivation: "2+4+...+2n = 2[1+2+...+n] = n(n+1)."
        },
        {
          name: "Sum of first n odd numbers",
          formula: "n²",
          derivation: "1+3+5+...+(2n−1) = n²."
        },
        {
          name: "Sum of squares",
          formula: "1²+2²+...+n² = n(n+1)(2n+1)/6"
        },
        {
          name: "Sum of cubes",
          formula: "1³+2³+...+n³ = [n(n+1)/2]²"
        },
        {
          name: "Number of integers from a to b",
          formula: "b−a+1",
          condition: "a and b are included."
        },
        {
          name: "Number of multiples of k up to n",
          formula: "⌊n/k⌋"
        },
        {
          name: "Multiples of k from a to b",
          formula: "⌊b/k⌋−⌊(a−1)/k⌋"
        }
      ]
    },
    {
      id: "factors",
      title: "Factors",
      formulas: [
        {
          name: "Number of factors",
          formula: "If N=p^a q^b r^c, d(N)=(a+1)(b+1)(c+1)",
          derivation: "A factor independently selects exponents 0 to a, 0 to b and 0 to c.",
          romanTelugu: "Prime powers ki okkokati add chesi multiply chesthe total factors vastayi."
        },
        {
          name: "Sum of factors",
          formula:
            "σ(N)=[(p^(a+1)−1)/(p−1)]×[(q^(b+1)−1)/(q−1)]×..."
        },
        {
          name: "Product of factors",
          formula: "N^[d(N)/2]",
          explanation: "Factors pair to produce N."
        },
        {
          name: "Number of odd factors",
          formula: "Ignore the power of 2 and apply the factor-count formula."
        },
        {
          name: "Number of even factors",
          formula: "Total factors − odd factors"
        },
        {
          name: "Perfect square condition",
          formula: "Every exponent in prime factorization must be even."
        },
        {
          name: "Perfect cube condition",
          formula: "Every exponent in prime factorization must be divisible by 3."
        }
      ]
    },
    {
      id: "hcf-lcm",
      title: "HCF and LCM",
      formulas: [
        {
          name: "Product relation",
          formula: "For two positive integers: a×b=HCF(a,b)×LCM(a,b)",
          warning: "Do not apply this directly to three or more numbers.",
          romanTelugu: "Rendu numbers ki matrame product = HCF×LCM direct ga use cheyyali."
        },
        {
          name: "HCF by prime factorization",
          formula: "Take the minimum powers of common prime factors."
        },
        {
          name: "LCM by prime factorization",
          formula: "Take the maximum powers of all prime factors."
        },
        {
          name: "HCF of fractions",
          formula: "HCF of numerators / LCM of denominators"
        },
        {
          name: "LCM of fractions",
          formula: "LCM of numerators / HCF of denominators"
        },
        {
          name: "Co-prime numbers",
          formula: "If HCF(a,b)=1, then LCM(a,b)=a×b"
        },
        {
          name: "Greatest divisor leaving equal remainder",
          formula: "HCF of the pairwise differences of the given numbers"
        },
        {
          name: "Greatest divisor leaving specified remainders",
          formula: "HCF of (number−corresponding remainder) values"
        },
        {
          name: "Least number exactly divisible by given numbers",
          formula: "LCM of the given numbers"
        }
      ]
    },
    {
      id: "remainders",
      title: "Remainders and Modular Arithmetic",
      formulas: [
        {
          name: "Division algorithm",
          formula: "Dividend = Divisor×Quotient + Remainder",
          condition: "0≤Remainder<Divisor",
          romanTelugu: "Remainder divisor kanna eppudu chinnaga undali."
        },
        {
          name: "Addition rule",
          formula: "(a+b) mod m = [(a mod m)+(b mod m)] mod m"
        },
        {
          name: "Subtraction rule",
          formula: "(a−b) mod m = [(a mod m)−(b mod m)] mod m",
          note: "Add m if the result is negative."
        },
        {
          name: "Multiplication rule",
          formula: "(ab) mod m = [(a mod m)(b mod m)] mod m"
        },
        {
          name: "Power rule",
          formula: "a^n mod m = (a mod m)^n mod m"
        },
        {
          name: "Least number to subtract",
          formula: "Remainder r"
        },
        {
          name: "Least number to add",
          formula: "Divisor−r",
          condition: "Use 0 when r=0."
        },
        {
          name: "Negative remainder conversion",
          formula: "−r mod m = m−r",
          condition: "0<r<m"
        }
      ]
    },
    {
      id: "unit-digit",
      title: "Unit Digit Cycles",
      formulas: [
        { baseDigit: 0, cycle: [0], cycleLength: 1 },
        { baseDigit: 1, cycle: [1], cycleLength: 1 },
        { baseDigit: 2, cycle: [2, 4, 8, 6], cycleLength: 4 },
        { baseDigit: 3, cycle: [3, 9, 7, 1], cycleLength: 4 },
        { baseDigit: 4, cycle: [4, 6], cycleLength: 2 },
        { baseDigit: 5, cycle: [5], cycleLength: 1 },
        { baseDigit: 6, cycle: [6], cycleLength: 1 },
        { baseDigit: 7, cycle: [7, 9, 3, 1], cycleLength: 4 },
        { baseDigit: 8, cycle: [8, 4, 2, 6], cycleLength: 4 },
        { baseDigit: 9, cycle: [9, 1], cycleLength: 2 }
      ],
      method: [
        "Take only the unit digit of the base.",
        "Find exponent mod cycle length.",
        "If the remainder is 0, use the last element of the cycle."
      ],
      romanTelugu:
        "Exponent ni cycle length tho divide cheyyi. Remainder 0 vasthe cycle lo last value teesukovali."
    },
    {
      id: "factorials",
      title: "Factorials and Highest Powers",
      formulas: [
        {
          name: "Factorial",
          formula: "n!=1×2×3×...×n",
          note: "0!=1"
        },
        {
          name: "Trailing zeros in n!",
          formula: "⌊n/5⌋+⌊n/25⌋+⌊n/125⌋+...",
          derivation: "Count all factors of 5 because factors of 2 are more abundant.",
          romanTelugu: "Trailing zeros kosam 5, 25, 125... tho divisions quotients add cheyyali."
        },
        {
          name: "Highest power of prime p in n!",
          formula: "⌊n/p⌋+⌊n/p²⌋+⌊n/p³⌋+..."
        },
        {
          name: "Highest power of composite k in n!",
          formula:
            "Factorize k. For k=p^a q^b..., answer=min(⌊vₚ(n!)/a⌋,⌊v_q(n!)/b⌋,...)"
        }
      ]
    },
    {
      id: "fractions-decimals",
      title: "Fractions and Decimals",
      formulas: [
        {
          name: "Terminating decimal condition",
          formula: "In lowest form, denominator must be 2^m5^n.",
          romanTelugu: "Lowest form denominator lo 2, 5 thappa vere prime undakudadhu."
        },
        {
          name: "Decimal places in terminating fraction",
          formula: "max(m,n), when denominator=2^m5^n"
        },
        {
          name: "Pure recurring decimal",
          formula: "0.(abc)=abc/999",
          explanation: "Use as many 9s as repeating digits."
        },
        {
          name: "Mixed recurring decimal",
          formula:
            "(Number through one complete repeat−non-repeating part)/(9s for repeating digits followed by 0s for non-repeating digits)"
        },
        {
          name: "Fraction comparison",
          formula: "For positive a/b and c/d, compare ad and bc."
        },
        {
          name: "Fraction between two positive fractions",
          formula: "(a+c)/(b+d)",
          condition: "If a/b<c/d, their mediant lies between them."
        }
      ]
    },
    {
      id: "base-system",
      title: "Base Representation",
      formulas: [
        {
          name: "Positional value in base b",
          formula: "(aₙ...a₂a₁a₀)ᵦ=Σaᵢbⁱ",
          condition: "Each digit satisfies 0≤aᵢ<b."
        },
        {
          name: "Decimal to base b",
          formula: "Repeatedly divide by b and read the remainders from bottom to top."
        }
      ]
    }
  ],
  quickRevision: [
    "1 is neither prime nor composite.",
    "2 is the only even prime.",
    "Every prime greater than 3 is of the form 6k±1, but every 6k±1 number need not be prime.",
    "A perfect square has an odd number of positive factors.",
    "For two numbers, product=HCF×LCM.",
    "Remainder must be smaller than divisor.",
    "Unit-digit cycles usually have length 1, 2 or 4.",
    "Trailing zeros in factorials come from counting factors of 5.",
    "A reduced fraction terminates only when its denominator has prime factors 2 and/or 5."
  ]
};

export default formulas;