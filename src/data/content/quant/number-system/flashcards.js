const flashcards = {
  title: "Number System Flashcards",
  description: "SSC CGL Number System formulas, rules, shortcuts and common traps kosam rapid-recall flashcards.",
  estimatedMinutes: 15,
  cards: [
    {
      id: "NS-FC-001",
      front: "Natural numbers ekkada start avutayi?",
      back: "1 nunchi: 1, 2, 3, 4, ...",
      category: "Number Types"
    },
    {
      id: "NS-FC-002",
      front: "Whole numbers ante enti?",
      back: "Zero tho saha natural numbers: 0, 1, 2, 3, ...",
      category: "Number Types"
    },
    {
      id: "NS-FC-003",
      front: "1 prime aa, composite aa?",
      back: "Renduu kaadu. 1 is neither prime nor composite.",
      category: "Prime Numbers"
    },
    {
      id: "NS-FC-004",
      front: "Only even prime number enti?",
      back: "2",
      category: "Prime Numbers"
    },
    {
      id: "NS-FC-005",
      front: "Rational number definition enti?",
      back: "p/q form lo rayagalige number, where p and q are integers and q ≠ 0.",
      category: "Number Types"
    },
    {
      id: "NS-FC-006",
      front: "Irrational number decimal form ela untundi?",
      back: "Non-terminating and non-repeating.",
      category: "Number Types"
    },
    {
      id: "NS-FC-007",
      front: "Divisibility rule for 3 enti?",
      back: "Digits sum 3 tho divisible ayithe number kuda 3 tho divisible.",
      category: "Divisibility"
    },
    {
      id: "NS-FC-008",
      front: "Divisibility rule for 4 enti?",
      back: "Last two digits form chesina number 4 tho divisible undali.",
      category: "Divisibility"
    },
    {
      id: "NS-FC-009",
      front: "Divisibility rule for 8 enti?",
      back: "Last three digits form chesina number 8 tho divisible undali.",
      category: "Divisibility"
    },
    {
      id: "NS-FC-010",
      front: "Divisibility rule for 9 enti?",
      back: "Digits sum 9 tho divisible ayithe number kuda 9 tho divisible.",
      category: "Divisibility"
    },
    {
      id: "NS-FC-011",
      front: "Divisibility rule for 11 enti?",
      back: "Alternate digit sums difference 0 or multiple of 11 undali.",
      category: "Divisibility"
    },
    {
      id: "NS-FC-012",
      front: "Divisibility by 6 kosam em check cheyyali?",
      back: "Number 2 mariyu 3 rendu rules satisfy cheyyali.",
      category: "Divisibility"
    },
    {
      id: "NS-FC-013",
      front: "N=pᵃ×qᵇ×rᶜ ayithe total factors formula enti?",
      back: "(a+1)(b+1)(c+1)",
      category: "Factors"
    },
    {
      id: "NS-FC-014",
      front: "Perfect square ki factors count odd aa, even aa?",
      back: "Odd",
      category: "Factors"
    },
    {
      id: "NS-FC-015",
      front: "Odd factors count ela calculate cheyyali?",
      back: "Prime factorisation lo power of 2 ni ignore chesi, migilina exponents ki 1 add chesi multiply cheyyali.",
      category: "Factors"
    },
    {
      id: "NS-FC-016",
      front: "Even factors count formula enti?",
      back: "Total factors − Odd factors",
      category: "Factors"
    },
    {
      id: "NS-FC-017",
      front: "Perfect square prime exponents ela undali?",
      back: "Anni even ga undali.",
      category: "Perfect Powers"
    },
    {
      id: "NS-FC-018",
      front: "Perfect cube prime exponents ela undali?",
      back: "Anni multiples of 3 ga undali.",
      category: "Perfect Powers"
    },
    {
      id: "NS-FC-019",
      front: "HCF lo ye prime powers teesukovali?",
      back: "Common prime factors yokka minimum powers.",
      category: "HCF and LCM"
    },
    {
      id: "NS-FC-020",
      front: "LCM lo ye prime powers teesukovali?",
      back: "Anni required prime factors yokka maximum powers.",
      category: "HCF and LCM"
    },
    {
      id: "NS-FC-021",
      front: "Two numbers product relation enti?",
      back: "First number × Second number = HCF × LCM",
      category: "HCF and LCM"
    },
    {
      id: "NS-FC-022",
      front: "HCF×LCM relation three numbers ki direct-ga apply cheyyacha?",
      back: "Ledu. Standard relation direct-ga two positive integers ki maatrame.",
      category: "HCF and LCM"
    },
    {
      id: "NS-FC-023",
      front: "Same remainder question lo greatest divisor ela find cheyyali?",
      back: "Given numbers madhya differences calculate chesi vaati HCF teesukovali.",
      category: "HCF Applications"
    },
    {
      id: "NS-FC-024",
      front: "Repeated events malli kalisi jarige time ela find cheyyali?",
      back: "Given intervals ki LCM teesukovali.",
      category: "LCM Applications"
    },
    {
      id: "NS-FC-025",
      front: "Division algorithm enti?",
      back: "Dividend = Divisor × Quotient + Remainder",
      category: "Remainders"
    },
    {
      id: "NS-FC-026",
      front: "Remainder permissible range enti?",
      back: "0 ≤ Remainder < Divisor",
      category: "Remainders"
    },
    {
      id: "NS-FC-027",
      front: "Exact divisibility kosam least number to subtract enti?",
      back: "Current remainder",
      category: "Remainders"
    },
    {
      id: "NS-FC-028",
      front: "Exact divisibility kosam least number to add enti?",
      back: "Divisor − Remainder, provided remainder is not zero.",
      category: "Remainders"
    },
    {
      id: "NS-FC-029",
      front: "2 powers unit-digit cycle enti?",
      back: "2, 4, 8, 6",
      category: "Unit Digit"
    },
    {
      id: "NS-FC-030",
      front: "3 powers unit-digit cycle enti?",
      back: "3, 9, 7, 1",
      category: "Unit Digit"
    },
    {
      id: "NS-FC-031",
      front: "7 powers unit-digit cycle enti?",
      back: "7, 9, 3, 1",
      category: "Unit Digit"
    },
    {
      id: "NS-FC-032",
      front: "8 powers unit-digit cycle enti?",
      back: "8, 4, 2, 6",
      category: "Unit Digit"
    },
    {
      id: "NS-FC-033",
      front: "Exponent ÷ cycle length remainder 0 ayithe em cheyyali?",
      back: "Cycle lo last value teesukovali.",
      category: "Unit Digit"
    },
    {
      id: "NS-FC-034",
      front: "Trailing zeros in n! formula enti?",
      back: "⌊n/5⌋+⌊n/25⌋+⌊n/125⌋+...",
      category: "Factorials"
    },
    {
      id: "NS-FC-035",
      front: "Highest power of prime p in n! formula enti?",
      back: "⌊n/p⌋+⌊n/p²⌋+⌊n/p³⌋+...",
      category: "Factorials"
    },
    {
      id: "NS-FC-036",
      front: "Fraction decimal terminate avvadaniki condition enti?",
      back: "Fraction ni lowest form ki reduce chesaka denominator lo 2 and/or 5 maatrame prime factors ga undali.",
      category: "Fractions and Decimals"
    },
    {
      id: "NS-FC-037",
      front: "Recurring decimal rational aa irrational aa?",
      back: "Rational",
      category: "Fractions and Decimals"
    },
    {
      id: "NS-FC-038",
      front: "a/b and c/d ni fast-ga ela compare cheyyali?",
      back: "Cross-multiply cheyyi: ad and bc compare cheyyali.",
      category: "Fractions and Decimals"
    },
    {
      id: "NS-FC-039",
      front: "1 nunchi N varaku k multiples enni?",
      back: "⌊N/k⌋",
      category: "Counting Multiples"
    },
    {
      id: "NS-FC-040",
      front: "A nunchi B varaku k multiples count formula enti?",
      back: "⌊B/k⌋−⌊(A−1)/k⌋",
      category: "Counting Multiples"
    },
    {
      id: "NS-FC-041",
      front: "1 to N lo a or b tho divisible numbers formula enti?",
      back: "⌊N/a⌋+⌊N/b⌋−⌊N/LCM(a,b)⌋",
      category: "Counting Multiples"
    },
    {
      id: "NS-FC-042",
      front: "Consecutive integers HCF entha?",
      back: "1; consecutive integers are always co-prime.",
      category: "Co-primes"
    },
    {
      id: "NS-FC-043",
      front: "Co-prime numbers LCM enti?",
      back: "Vaati product",
      category: "Co-primes"
    },
    {
      id: "NS-FC-044",
      front: "0.125 fraction form enti?",
      back: "1/8",
      category: "Fractions and Decimals"
    },
    {
      id: "NS-FC-045",
      front: "0.1666... fraction form enti?",
      back: "1/6",
      category: "Fractions and Decimals"
    }
  ],
  studyModes: [
    {
      id: "all",
      label: "All Cards",
      description: "Anni flashcards revise cheyyi."
    },
    {
      id: "category",
      label: "By Category",
      description: "Selected concept category cards maatrame revise cheyyi."
    },
    {
      id: "shuffle",
      label: "Shuffle",
      description: "Cards ni random order lo attempt cheyyi."
    },
    {
      id: "wrong-only",
      label: "Wrong Only",
      description: "Previous attempt lo wrong aina cards repeat cheyyi."
    }
  ],
  masteryRequirements: {
    totalCards: 45,
    minimumCorrect: 36,
    minimumAccuracy: 80,
    shuffleRecommended: true,
    repeatWrongCards: true,
    nextModule: "commonMistakes"
  }
};

export default flashcards;