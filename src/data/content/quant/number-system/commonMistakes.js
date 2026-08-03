const commonMistakes = {
  title: "Number System Common Mistakes",
  description: "SSC CGL Number System questions lo frequently jarige mistakes, correct rules mariyu prevention checks.",
  estimatedMinutes: 20,
  mistakes: [
    {
      id: "NS-CM-001",
      concept: "Prime Numbers",
      mistake: "1 ni prime number ani consider cheyyadam.",
      correctRule: "1 is neither prime nor composite. Prime number ki exactly two distinct positive factors undali.",
      example: "1 ki only one positive factor undi: 1.",
      prevention: "Prime list ni 2 nunchi start cheyyi."
    },
    {
      id: "NS-CM-002",
      concept: "Even Prime",
      mistake: "2 composite number ani assume cheyyadam because it is even.",
      correctRule: "2 is the only even prime number.",
      example: "2 factors: 1 and 2 only.",
      prevention: "Even-number rule apply chese mundu 2 special case ani remember cheyyi."
    },
    {
      id: "NS-CM-003",
      concept: "Co-prime Numbers",
      mistake: "Co-prime numbers rendu prime numbers ayi undali ani assume cheyyadam.",
      correctRule: "HCF 1 unna any two integers co-prime.",
      example: "8 and 15 composite numbers aina HCF 1 kabatti co-prime.",
      prevention: "Numbers prime aa kaada ani kaakunda HCF check cheyyi."
    },
    {
      id: "NS-CM-004",
      concept: "Divisibility by 6",
      mistake: "Number even ayithe 6 tho divisible ani conclude cheyyadam.",
      correctRule: "Divisibility by 6 kosam number 2 mariyu 3 rendu rules satisfy cheyyali.",
      example: "14 even, kaani digit sum 5 kabatti 6 tho divisible kaadu.",
      prevention: "6 = 2×3 ani split chesi rendu checks perform cheyyi."
    },
    {
      id: "NS-CM-005",
      concept: "Divisibility by 8",
      mistake: "Last two digits ni check cheyyadam.",
      correctRule: "Divisibility by 8 kosam last three digits check cheyyali.",
      example: "12,136 lo last three digits 136; 136÷8=17 kabatti divisible.",
      prevention: "4 ki two digits; 8 ki three digits ani remember cheyyi."
    },
    {
      id: "NS-CM-006",
      concept: "Divisibility by 11",
      mistake: "All digits sum 11 multiple undali ani check cheyyadam.",
      correctRule: "Alternate-position digit sums difference 0 or multiple of 11 undali.",
      example: "2728: (2+2)−(7+8)=−11, so divisible by 11.",
      prevention: "Digits ni alternating groups ga separate cheyyi."
    },
    {
      id: "NS-CM-007",
      concept: "Number of Factors",
      mistake: "Prime exponents ni direct-ga multiply cheyyadam.",
      correctRule: "Prathi exponent ki 1 add chesi values multiply cheyyali.",
      example: "72=2³×3²; factors=(3+1)(2+1)=12, not 6.",
      prevention: "Formula rayi: d(N)=(a+1)(b+1)..."
    },
    {
      id: "NS-CM-008",
      concept: "Odd Factors",
      mistake: "Total factors ni 2 tho divide chesi odd factors find cheyyadam.",
      correctRule: "Odd factors kosam prime factorisation lo power of 2 ni ignore cheyyali.",
      example: "72=2³×3²; odd factors=(2+1)=3.",
      prevention: "Odd factor lo 2 undakudadhu kabatti 2-power remove cheyyi."
    },
    {
      id: "NS-CM-009",
      concept: "Perfect Square",
      mistake: "Number of prime factors even unte perfect square ani assume cheyyadam.",
      correctRule: "Prime factorisation lo prathi prime exponent even ga undali.",
      example: "18=2¹×3²; total prime-factor count 3, but exponent of 2 odd kabatti square kaadu.",
      prevention: "Prathi exponent ni separately check cheyyi."
    },
    {
      id: "NS-CM-010",
      concept: "Perfect Cube",
      mistake: "Prime exponents even undali ani apply cheyyadam.",
      correctRule: "Perfect cube lo prathi prime exponent multiple of 3 undali.",
      example: "216=2³×3³, so it is a perfect cube.",
      prevention: "Square → multiples of 2; cube → multiples of 3."
    },
    {
      id: "NS-CM-011",
      concept: "HCF",
      mistake: "HCF kosam maximum prime powers teesukovadam.",
      correctRule: "HCF uses minimum common prime powers.",
      example: "12=2²×3 and 18=2×3²; HCF=2¹×3¹=6.",
      prevention: "HCF means common and minimum."
    },
    {
      id: "NS-CM-012",
      concept: "LCM",
      mistake: "LCM kosam common prime factors maatrame teesukovadam.",
      correctRule: "LCM lo given numbers cover avvadaniki all prime factors maximum powers teesukovali.",
      example: "12=2²×3 and 18=2×3²; LCM=2²×3²=36.",
      prevention: "LCM result prathi given number tho divisible undali."
    },
    {
      id: "NS-CM-013",
      concept: "HCF-LCM Relation",
      mistake: "HCF×LCM relation ni three or more numbers ki direct-ga apply cheyyadam.",
      correctRule: "a×b=HCF(a,b)×LCM(a,b) standard relation two positive integers ki.",
      example: "Three numbers product generally HCF×LCM ki equal kaadu.",
      prevention: "Question lo exactly two numbers unnayo verify cheyyi."
    },
    {
      id: "NS-CM-014",
      concept: "Same Remainder",
      mistake: "Given original numbers HCF teesukovadam.",
      correctRule: "Same remainder leave chese greatest divisor kosam pairwise differences HCF teesukovali.",
      example: "43, 91, 183 differences: 48, 92, 140; HCF=4.",
      prevention: "Same remainder kanipisthe first differences rayi."
    },
    {
      id: "NS-CM-015",
      concept: "Specified Remainders",
      mistake: "Different specified remainders unna numbers ni direct-ga subtract cheyyadam.",
      correctRule: "Prathi number nunchi daniki corresponding remainder subtract chesi adjusted values HCF teesukovali.",
      example: "Numbers 47 and 62 leave remainders 2 and 7: HCF(45,55)=5.",
      prevention: "Adjusted number = Number − Its remainder."
    },
    {
      id: "NS-CM-016",
      concept: "Least Number to Add",
      mistake: "Current remainder ni add cheyyadam.",
      correctRule: "Remainder non-zero ayithe least addition = Divisor − Remainder.",
      example: "1056÷23 remainder 21; addition=23−21=2.",
      prevention: "Add ante next multiple reach avvali."
    },
    {
      id: "NS-CM-017",
      concept: "Least Number to Subtract",
      mistake: "Divisor − remainder ni subtract cheyyadam.",
      correctRule: "Exact divisibility kosam least subtraction = Current remainder.",
      example: "1845÷19 remainder 2; subtract 2.",
      prevention: "Subtract ante previous multiple ki return avvali."
    },
    {
      id: "NS-CM-018",
      concept: "Remainder Range",
      mistake: "Remainder divisor ki equal or greater ga rayadam.",
      correctRule: "For positive divisor d, remainder r must satisfy 0≤r<d.",
      example: "Divisor 7 ayithe valid remainders 0 to 6.",
      prevention: "Final remainder ni divisor kante smaller ga reduce cheyyi."
    },
    {
      id: "NS-CM-019",
      concept: "Negative Remainder",
      mistake: "Modular subtraction tarvata negative value ni final remainder ga leave cheyyadam.",
      correctRule: "Standard non-negative remainder kosam divisor ni add chesi range lo teesukuravali.",
      example: "3−5≡−2≡5 (mod 7).",
      prevention: "Negative result vachina prathi sari modulus add cheyyi."
    },
    {
      id: "NS-CM-020",
      concept: "Unit Digit",
      mistake: "Full base powers calculate cheyyadaniki try cheyyadam.",
      correctRule: "Unit digit kosam base last digit maatrame required.",
      example: "1237²⁵ unit digit = 7²⁵ unit digit.",
      prevention: "First step lo base ni last digit ki reduce cheyyi."
    },
    {
      id: "NS-CM-021",
      concept: "Cyclicity",
      mistake: "Exponent cycle length tho divisible ayithe cycle first value select cheyyadam.",
      correctRule: "Exponent remainder 0 ayithe cycle last value select cheyyali.",
      example: "2⁸: 8 mod 4=0, so cycle fourth value 6.",
      prevention: "Remainder 0 means position=cycle length."
    },
    {
      id: "NS-CM-022",
      concept: "Zero Exponent",
      mistake: "a⁰=0 ani rayadam.",
      correctRule: "Any non-zero number a ki a⁰=1.",
      example: "7⁰=1.",
      prevention: "Non-zero base power zero always 1."
    },
    {
      id: "NS-CM-023",
      concept: "Trailing Zeros",
      mistake: "Only ⌊n/5⌋ calculate cheyyadam.",
      correctRule: "Powers of 5 anni count cheyyali: ⌊n/5⌋+⌊n/25⌋+⌊n/125⌋+...",
      example: "100! zeros=20+4=24.",
      prevention: "5 powers n kante ekkuva ayye varaku continue cheyyi."
    },
    {
      id: "NS-CM-024",
      concept: "Highest Prime Power in Factorial",
      mistake: "Only multiples of p count cheyyadam.",
      correctRule: "Multiples of p², p³ and higher powers extra factors contribute chestayi.",
      example: "v₃(50!)=⌊50/3⌋+⌊50/9⌋+⌊50/27⌋=22.",
      prevention: "p, p², p³... denominators list cheyyi."
    },
    {
      id: "NS-CM-025",
      concept: "Composite Power in Factorial",
      mistake: "Composite base ni prime laga direct formula lo use cheyyadam.",
      correctRule: "Composite base ni prime factors ga split chesi limiting prime exponent determine cheyyali.",
      example: "12=2²×3; highest power in n! = min(⌊v₂(n!)/2⌋,v₃(n!)).",
      prevention: "First composite base prime-factorise cheyyi."
    },
    {
      id: "NS-CM-026",
      concept: "Terminating Decimals",
      mistake: "Original denominator ni reduce cheyyakunda termination decide cheyyadam.",
      correctRule: "Fraction lowest form denominator lo only 2 and/or 5 prime factors undali.",
      example: "6/15=2/5, so decimal terminates.",
      prevention: "First fraction ni lowest form ki reduce cheyyi."
    },
    {
      id: "NS-CM-027",
      concept: "Recurring Decimals",
      mistake: "Non-terminating decimal anni irrational ani assume cheyyadam.",
      correctRule: "Non-terminating recurring decimals rational; non-terminating non-repeating decimals irrational.",
      example: "0.333...=1/3, so rational.",
      prevention: "Non-terminating tarvata repeating aa kaada check cheyyi."
    },
    {
      id: "NS-CM-028",
      concept: "Fraction Comparison",
      mistake: "Denominators different unna fractions numerators maatrame compare cheyyadam.",
      correctRule: "Positive fractions a/b and c/d kosam ad and bc cross-products compare cheyyali.",
      example: "5/8 vs 3/5: 5×5=25 and 3×8=24, so 5/8>3/5.",
      prevention: "Different denominators kanipisthe cross-multiply cheyyi."
    },
    {
      id: "NS-CM-029",
      concept: "Counting Multiples",
      mistake: "1 to N lo multiples count kosam N/k ni round cheyyadam.",
      correctRule: "Count=⌊N/k⌋, meaning quotient floor value.",
      example: "1 to 50 lo multiples of 6 =⌊50/6⌋=8.",
      prevention: "Decimal quotient ni always downward floor cheyyi."
    },
    {
      id: "NS-CM-030",
      concept: "Inclusion-Exclusion",
      mistake: "a or b tho divisible counts ni direct-ga add cheyyadam.",
      correctRule: "Common multiples twice count avutayi kabatti LCM multiples ni once subtract cheyyali.",
      example: "1 to N: ⌊N/a⌋+⌊N/b⌋−⌊N/LCM(a,b)⌋.",
      prevention: "OR question lo Add − Common rule use cheyyi."
    }
  ],
  finalChecklist: [
    "1 neither prime nor composite ani verify chesana?",
    "Divisibility combined rule lo all conditions check chesana?",
    "Factor formula lo exponents ki 1 add chesana?",
    "HCF ki minimum, LCM ki maximum powers teesukunnana?",
    "Same-remainder question lo differences use chesana?",
    "Least add and least subtract formulas correct-ga apply chesana?",
    "Final remainder divisor kante smaller ga unda?",
    "Power cycle remainder 0 ni last position ga treat chesana?",
    "Factorial formula lo higher prime powers include chesana?",
    "Fraction ni lowest form ki reduce chesana?",
    "OR counting lo common multiples subtract chesana?"
  ],
  masteryRequirements: {
    totalMistakes: 30,
    requiredChecklistReview: true,
    recommendedReviewMinutes: 20,
    repeatBeforeTopicTest: true,
    nextModule: "integration"
  }
};

export default commonMistakes;