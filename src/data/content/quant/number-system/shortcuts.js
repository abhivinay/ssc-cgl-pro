const shortcuts = {
  title: "Number System Shortcuts",
  instructions: [
    "Shortcut use chese mundu applicable condition verify cheyyi.",
    "Large calculations ni small remainders or prime powers ga reduce cheyyi.",
    "Final answer range and divisibility ni quick-ga check cheyyi."
  ],
  sections: [
    {
      id: "divisibility",
      title: "1. Fast Divisibility Checks",
      shortcuts: [
        {
          name: "Divisibility by 3 or 9",
          method: "Add the digits. Check whether the sum is divisible by 3 or 9.",
          example: "57,438 → digit sum 27; therefore divisible by both 3 and 9.",
          romanTelugu: "Digits sum teesukoni 3 leda 9 tho divide avutunda chudu."
        },
        {
          name: "Divisibility by 4",
          method: "Check only the last two digits.",
          example: "18,724 → 24 is divisible by 4, so the complete number is divisible by 4."
        },
        {
          name: "Divisibility by 8",
          method: "Check only the last three digits.",
          example: "54,616 → 616÷8=77, so the number is divisible by 8."
        },
        {
          name: "Divisibility by 11",
          method: "Find the difference between sums of alternate digits. It must be 0 or a multiple of 11.",
          example: "2728 → (2+2)−(7+8)=−11; therefore divisible by 11."
        },
        {
          name: "Composite divisor",
          method: "Split the divisor into coprime factors and test each factor.",
          example: "For 18, test divisibility by 2 and 9.",
          warning: "Do not use non-coprime factors such as 4 and 6 to establish divisibility by 24."
        }
      ]
    },
    {
      id: "missing-digit",
      title: "2. Missing-Digit Questions",
      shortcuts: [
        {
          name: "Missing digit for divisibility by 3 or 9",
          method: "Add known digits and choose the missing digit that makes the total a required multiple.",
          example: "45x2 divisible by 9: known sum=11. Therefore x=7 because 11+7=18.",
          romanTelugu: "Known digits sum ki required multiple reach ayye digit select cheyyi."
        },
        {
          name: "Missing digit for divisibility by 11",
          method: "Place the unknown digit in its alternating group and form a simple equation.",
          example: "3x52 divisible by 11: (3+5)−(x+2)=6−x. Hence x=6."
        },
        {
          name: "Options shortcut",
          method: "When options are digits, test them directly instead of solving a long equation."
        }
      ]
    },
    {
      id: "factors",
      title: "3. Factor Shortcuts",
      shortcuts: [
        {
          name: "Count factors immediately",
          method: "Prime-factorize N, add 1 to every exponent, then multiply.",
          example: "360=2³×3²×5¹ → factors=(3+1)(2+1)(1+1)=24.",
          romanTelugu: "Prime powers ki 1 add chesi multiply chesthe factors count vastundi."
        },
        {
          name: "Check a perfect square",
          method: "All prime exponents must be even.",
          example: "1764=2²×3²×7², so it is a perfect square."
        },
        {
          name: "Least multiplier for a perfect square",
          method: "Multiply the primes having odd exponents.",
          example: "72=2³×3². Multiply by 2 to obtain 144=12²."
        },
        {
          name: "Least divisor for a perfect square",
          method: "Divide by the product of primes having odd exponents.",
          example: "540=2²×3³×5. Divide by 15 to obtain 36."
        },
        {
          name: "Least multiplier for a perfect cube",
          method: "Raise each exponent to the next multiple of 3.",
          example: "108=2²×3³. Multiply by 2 to obtain 216=6³."
        },
        {
          name: "Odd and even factors",
          method: "Ignore 2's exponent to count odd factors; subtract from total factors for even factors.",
          example: "360=2³×3²×5. Odd factors=(2+1)(1+1)=6; even factors=24−6=18."
        }
      ]
    },
    {
      id: "hcf-lcm",
      title: "4. HCF and LCM Selection",
      shortcuts: [
        {
          clue: "Greatest, largest, maximum equal size or exact grouping",
          choose: "HCF",
          example: "Largest tile that exactly covers given dimensions."
        },
        {
          clue: "Least, smallest, first common occurrence or exactly divisible by all",
          choose: "LCM",
          example: "Three bells ring together again after the LCM of their intervals."
        },
        {
          name: "Find LCM when HCF and two numbers are known",
          method: "LCM=(first number×second number)/HCF.",
          condition: "Use only for two positive integers."
        },
        {
          name: "Co-prime shortcut",
          method: "If HCF is 1, LCM equals the product.",
          example: "LCM of 8 and 15=120."
        },
        {
          name: "Same remainder shortcut",
          method: "Subtract the numbers pairwise and find the HCF of the differences.",
          example: "Greatest divisor leaving the same remainder from 187, 233 and 325: HCF(46,92)=46.",
          romanTelugu: "Same remainder ante numbers differences teesukoni HCF find cheyyi."
        },
        {
          name: "Specified remainders shortcut",
          method: "Subtract each stated remainder from its number, then find their HCF."
        }
      ]
    },
    {
      id: "remainders",
      title: "5. Fast Remainder Methods",
      shortcuts: [
        {
          name: "Reduce before calculation",
          method: "Replace every number by its remainder before addition or multiplication.",
          example: "Find remainder of 47×58 by 7: 47≡5 and 58≡2, so product≡10≡3."
        },
        {
          name: "Least number to subtract",
          method: "Subtract the existing remainder.",
          example: "437÷9 leaves 5; subtract 5."
        },
        {
          name: "Least number to add",
          method: "Add divisor−remainder.",
          example: "437÷9 leaves 5; add 4."
        },
        {
          name: "Remainder of digit-sum divisors",
          method: "For division by 3 or 9, use the digit sum.",
          example: "Remainder of 87,654 by 9 equals remainder of 30 by 9, which is 3."
        },
        {
          name: "Remainder by 11",
          method: "Use the alternating digit-sum difference and convert it to a non-negative remainder.",
          example: "For 1234, (1+3)−(2+4)=−2≡9 mod 11."
        },
        {
          name: "Negative remainder",
          method: "Add the divisor until the remainder becomes non-negative.",
          example: "−3 mod 7=4."
        }
      ]
    },
    {
      id: "unit-digit",
      title: "6. Unit-Digit Shortcuts",
      shortcuts: [
        {
          name: "Ignore all but the last digit",
          method: "The unit digit of a power depends only on the base's unit digit.",
          example: "Unit digit of 127³ is the same as that of 7³, which is 3."
        },
        {
          name: "Cycle-four rule",
          method: "For bases ending in 2, 3, 7 or 8, reduce the exponent modulo 4.",
          example: "Unit digit of 3¹⁰¹: 101 mod 4=1, so answer is the first cycle value, 3."
        },
        {
          name: "Zero-remainder rule",
          method: "If exponent mod cycle length is 0, use the final cycle value.",
          example: "Unit digit of 2²⁰: 20 mod 4=0, so answer is 6.",
          romanTelugu: "Cycle remainder zero vasthe first value kaadu, cycle last value teesukovali."
        },
        {
          name: "Product unit digit",
          method: "Find each factor's unit digit and multiply only those digits.",
          example: "Unit digit of 3⁵×7⁴ is 3×1=3."
        },
        {
          name: "Sum unit digit",
          method: "Find individual unit digits, add them, and retain the last digit."
        }
      ]
    },
    {
      id: "factorials",
      title: "7. Factorial Shortcuts",
      shortcuts: [
        {
          name: "Trailing zeros",
          method: "Divide successively by 5, 25, 125 and so on; add the integer quotients.",
          example: "Zeros in 100!=20+4=24.",
          romanTelugu: "5 powers tho divide chesi quotients anni add cheyyi."
        },
        {
          name: "Highest power of a prime in n!",
          method: "Divide n by p, p², p³... and add the integer quotients.",
          example: "Power of 3 in 20!=6+2=8."
        },
        {
          name: "Highest power of a composite",
          method: "Prime-factorize the composite and compare available prime powers after division by required exponents.",
          example: "Highest power of 12 in 10!: v₂=8, v₃=4; min(8/2,4)=4."
        },
        {
          name: "Guaranteed final zero",
          method: "For n≥5, n! ends in 0; therefore its unit digit is 0."
        }
      ]
    },
    {
      id: "fractions-decimals",
      title: "8. Fractions and Decimal Shortcuts",
      shortcuts: [
        {
          name: "Compare two fractions",
          method: "Cross-multiply instead of converting to decimals.",
          example: "Compare 7/11 and 5/8: 7×8=56 and 5×11=55, so 7/11 is larger."
        },
        {
          name: "Check decimal termination",
          method: "Reduce the fraction first. The denominator must contain only 2 and/or 5.",
          example: "21/60=7/20; denominator 20=2²×5, so it terminates."
        },
        {
          name: "Pure recurring decimal",
          method: "Place the repeating digits over the same number of 9s.",
          example: "0.(27)=27/99=3/11."
        },
        {
          name: "Quick fraction between two fractions",
          method: "Use the mediant (sum of numerators)/(sum of denominators).",
          example: "Between 2/5 and 3/7: 5/12.",
          condition: "Both fractions must be positive and correctly ordered."
        }
      ]
    },
    {
      id: "counting",
      title: "9. Counting Multiples",
      shortcuts: [
        {
          name: "Multiples up to n",
          method: "Use floor(n/k).",
          example: "Multiples of 7 up to 100=floor(100/7)=14."
        },
        {
          name: "Multiples in an inclusive range",
          method: "Use floor(b/k)−floor((a−1)/k).",
          example: "Multiples of 6 from 20 to 80: 13−3=10."
        },
        {
          name: "Divisible by either of two numbers",
          method: "Use inclusion-exclusion: count(A)+count(B)−count(LCM).",
          example: "From 1 to 100, divisible by 4 or 6: 25+16−8=33."
        }
      ]
    }
  ],
  examStrategy: [
    "Question lo keyword chusi family identify cheyyi: HCF, LCM, remainder, factors or cyclicity.",
    "Options small ga unte direct substitution or elimination use cheyyi.",
    "Prime factorization ni powers form lo rayi; repeated multiplication avoid cheyyi.",
    "Unit-digit question lo complete base calculate cheyyaku.",
    "Factorial trailing-zero question lo factors of 10 count cheyyaku; factors of 5 count cheyyi.",
    "Final remainder divisor kanna chinnaga undo verify cheyyi."
  ],
  traps: [
    "1 is neither prime nor composite.",
    "2 is the only even prime.",
    "Every 6k±1 number is not necessarily prime.",
    "Product=HCF×LCM applies directly only to two numbers.",
    "A zero cycle remainder means the last cycle position.",
    "A fraction must be reduced before checking whether its decimal terminates.",
    "Same-remainder questions use differences, not the original numbers."
  ]
};

export default shortcuts;