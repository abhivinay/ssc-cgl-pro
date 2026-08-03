const formulas = {
  title: "Ratio and Proportion Formulas",
  description: "SSC CGL Ratio and Proportion formulas with quick usage rules.",
  estimatedMinutes: 35,
  sections: [
    {
      id: "ratio-basics",
      title: "Basic Ratio Formulas",
      formulas: [
        {
          id: "RAP-F-001",
          name: "Ratio",
          formula: "a:b = a/b",
          usage: "a quantity-ni b quantity tho compare cheyyadaniki.",
          condition: "Both quantities same units lo undali; b ≠ 0."
        },
        {
          id: "RAP-F-002",
          name: "Equivalent Ratio",
          formula: "a:b = ka:kb",
          usage: "Ratio-ni required scale-loki convert cheyyadaniki.",
          condition: "k ≠ 0."
        },
        {
          id: "RAP-F-003",
          name: "Ratio Equality",
          formula: "a:b = c:d ⇔ ad = bc",
          usage: "Two ratios equal aa kaada verify cheyyadaniki.",
          condition: "b,d ≠ 0."
        },
        {
          id: "RAP-F-004",
          name: "Simplest Ratio",
          formula: "a:b = (a÷HCF):(b÷HCF)",
          usage: "Ratio-ni lowest terms-loki simplify cheyyadaniki.",
          condition: "HCF of all ratio terms use cheyyali."
        }
      ]
    },
    {
      id: "proportion",
      title: "Proportion Formulas",
      formulas: [
        {
          id: "RAP-F-005",
          name: "Basic Proportion",
          formula: "a:b::c:d ⇒ ad = bc",
          usage: "Missing proportional term find cheyyadaniki.",
          condition: "a and d extremes; b and c means."
        },
        {
          id: "RAP-F-006",
          name: "Missing Fourth Term",
          formula: "d = bc/a",
          usage: "a:b = c:d lo d find cheyyadaniki.",
          condition: "a ≠ 0."
        },
        {
          id: "RAP-F-007",
          name: "Missing Third Term",
          formula: "c = ad/b",
          usage: "a:b = c:d lo c find cheyyadaniki.",
          condition: "b ≠ 0."
        },
        {
          id: "RAP-F-008",
          name: "Missing Second Term",
          formula: "b = ad/c",
          usage: "a:b = c:d lo b find cheyyadaniki.",
          condition: "c ≠ 0."
        },
        {
          id: "RAP-F-009",
          name: "Missing First Term",
          formula: "a = bc/d",
          usage: "a:b = c:d lo a find cheyyadaniki.",
          condition: "d ≠ 0."
        }
      ]
    },
    {
      id: "continued-proportion",
      title: "Continued Proportion Formulas",
      formulas: [
        {
          id: "RAP-F-010",
          name: "Continued Proportion",
          formula: "a:b = b:c ⇒ b² = ac",
          usage: "Three quantities continued proportion lo unnappudu.",
          condition: "Middle term repeated undali."
        },
        {
          id: "RAP-F-011",
          name: "Mean Proportional",
          formula: "b = √(ac)",
          usage: "a and c madhya mean proportional find cheyyadaniki.",
          condition: "Usually positive quantities."
        },
        {
          id: "RAP-F-012",
          name: "Third Proportional",
          formula: "c = b²/a",
          usage: "a:b = b:c lo third proportional find cheyyadaniki.",
          condition: "a ≠ 0."
        },
        {
          id: "RAP-F-013",
          name: "Fourth Proportional",
          formula: "d = bc/a",
          usage: "a, b and c ki fourth proportional find cheyyadaniki.",
          condition: "a:b = c:d."
        }
      ]
    },
    {
      id: "compound-ratios",
      title: "Compound and Derived Ratios",
      formulas: [
        {
          id: "RAP-F-014",
          name: "Compound Ratio",
          formula: "(a:b) × (c:d) = ac:bd",
          usage: "Two ratios compound ratio find cheyyadaniki.",
          condition: "Corresponding terms multiply cheyyali."
        },
        {
          id: "RAP-F-015",
          name: "Multiple Compound Ratio",
          formula: "(a:b) × (c:d) × (e:f) = ace:bdf",
          usage: "Three or more ratios combine cheyyadaniki.",
          condition: "Left terms and right terms separately multiply cheyyali."
        },
        {
          id: "RAP-F-016",
          name: "Duplicate Ratio",
          formula: "a²:b²",
          usage: "a:b duplicate ratio find cheyyadaniki.",
          condition: "Both terms square cheyyali."
        },
        {
          id: "RAP-F-017",
          name: "Triplicate Ratio",
          formula: "a³:b³",
          usage: "a:b triplicate ratio find cheyyadaniki.",
          condition: "Both terms cube cheyyali."
        },
        {
          id: "RAP-F-018",
          name: "Sub-Duplicate Ratio",
          formula: "√a:√b",
          usage: "a:b sub-duplicate ratio find cheyyadaniki.",
          condition: "Square roots real values undali."
        },
        {
          id: "RAP-F-019",
          name: "Sub-Triplicate Ratio",
          formula: "∛a:∛b",
          usage: "a:b sub-triplicate ratio find cheyyadaniki.",
          condition: "Cube roots use cheyyali."
        },
        {
          id: "RAP-F-020",
          name: "Inverse Ratio",
          formula: "a:b → b:a",
          usage: "Given ratio reverse cheyyadaniki.",
          condition: "a,b ≠ 0."
        }
      ]
    },
    {
      id: "division",
      title: "Division in a Given Ratio",
      formulas: [
        {
          id: "RAP-F-021",
          name: "First Share in a:b",
          formula: "First share = Total × a/(a+b)",
          usage: "Total-ni a:b ratio lo divide chesinappudu first share.",
          condition: "a+b ≠ 0."
        },
        {
          id: "RAP-F-022",
          name: "Second Share in a:b",
          formula: "Second share = Total × b/(a+b)",
          usage: "Total-ni a:b ratio lo divide chesinappudu second share.",
          condition: "a+b ≠ 0."
        },
        {
          id: "RAP-F-023",
          name: "Share in Multiple Ratio",
          formula: "Share = Total × required part/sum of all parts",
          usage: "Total-ni a:b:c లేదా multiple ratio lo divide cheyyadaniki.",
          condition: "All ratio parts sum use cheyyali."
        },
        {
          id: "RAP-F-024",
          name: "One-Part Value from Total",
          formula: "One part = Total/sum of ratio terms",
          usage: "Actual quantities find cheyyadaniki.",
          condition: "Total quantity given undali."
        },
        {
          id: "RAP-F-025",
          name: "One-Part Value from Difference",
          formula: "One part = Given difference/absolute difference of ratio terms",
          usage: "Ratio and actual difference given unnappudu.",
          condition: "Ratio terms unequal undali."
        }
      ]
    },
    {
      id: "combining-ratios",
      title: "Combining Ratios",
      formulas: [
        {
          id: "RAP-F-026",
          name: "Combine A:B and B:C",
          formula: "If A:B=a:b and B:C=c:d, then A:B:C=ac:bc:bd",
          usage: "Common middle quantity unna two ratios combine cheyyadaniki.",
          condition: "Common B terms equal scale lo undali."
        },
        {
          id: "RAP-F-027",
          name: "Combine A:B and A:C",
          formula: "If A:B=a:b and A:C=c:d, then A:B:C=ac:bc:ad",
          usage: "Common first quantity A unna ratios combine cheyyadaniki.",
          condition: "Common A terms equal cheyyali."
        },
        {
          id: "RAP-F-028",
          name: "Combine A:C and B:C",
          formula: "If A:C=a:b and B:C=c:d, then A:B:C=ad:bc:bd",
          usage: "Common last quantity C unna ratios combine cheyyadaniki.",
          condition: "Common C terms equal cheyyali."
        }
      ]
    },
    {
      id: "direct-inverse",
      title: "Direct and Inverse Proportion",
      formulas: [
        {
          id: "RAP-F-029",
          name: "Direct Proportion",
          formula: "x ∝ y ⇒ x/y = k",
          usage: "One quantity increase ayithe another same direction lo change ayinappudu.",
          condition: "Rate constant undali."
        },
        {
          id: "RAP-F-030",
          name: "Direct Proportion Comparison",
          formula: "x₁/y₁ = x₂/y₂",
          usage: "Two direct-proportion situations compare cheyyadaniki.",
          condition: "Same relationship and units."
        },
        {
          id: "RAP-F-031",
          name: "Inverse Proportion",
          formula: "x ∝ 1/y ⇒ xy = k",
          usage: "One quantity increase ayithe another decrease ayinappudu.",
          condition: "Product-related total constant undali."
        },
        {
          id: "RAP-F-032",
          name: "Inverse Proportion Comparison",
          formula: "x₁y₁ = x₂y₂",
          usage: "Workers-days, speed-time lanti questions solve cheyyadaniki.",
          condition: "Total work or distance constant undali."
        }
      ]
    },
    {
      id: "ratio-change",
      title: "Ratio Change Formulas",
      formulas: [
        {
          id: "RAP-F-033",
          name: "Original Quantities",
          formula: "If A:B=a:b, then A=ax and B=bx",
          usage: "Actual values unknown unna ratio questions start cheyyadaniki.",
          condition: "x common multiplier."
        },
        {
          id: "RAP-F-034",
          name: "Same Addition",
          formula: "(ax+k)/(bx+k) = new ratio",
          usage: "Both quantities ki same number add chesinappudu.",
          condition: "Addition both quantities ki equal undali."
        },
        {
          id: "RAP-F-035",
          name: "Same Subtraction",
          formula: "(ax−k)/(bx−k) = new ratio",
          usage: "Both quantities nunchi same number subtract chesinappudu.",
          condition: "Resulting quantities valid undali."
        },
        {
          id: "RAP-F-036",
          name: "Different Changes",
          formula: "(ax+p)/(bx+q) = new ratio",
          usage: "Quantities ki different amounts add or subtract chesinappudu.",
          condition: "Subtraction-ni negative value-ga represent cheyyachu."
        }
      ]
    },
    {
      id: "sum-difference",
      title: "Sum and Difference Formulas",
      formulas: [
        {
          id: "RAP-F-037",
          name: "Quantities from Sum",
          formula: "A = S×a/(a+b), B = S×b/(a+b)",
          usage: "A:B=a:b and A+B=S given unnappudu.",
          condition: "a+b ≠ 0."
        },
        {
          id: "RAP-F-038",
          name: "Quantities from Difference",
          formula: "A = D×a/|a−b|, B = D×b/|a−b|",
          usage: "A:B=a:b and absolute difference D given unnappudu.",
          condition: "a ≠ b."
        },
        {
          id: "RAP-F-039",
          name: "Sum-to-Difference Ratio",
          formula: "(A+B):(A−B) = (a+b):(a−b)",
          usage: "A:B=a:b given unnappudu sum and difference compare cheyyadaniki.",
          condition: "A>B and a>b convention."
        }
      ]
    },
    {
      id: "ages",
      title: "Age Ratio Formulas",
      formulas: [
        {
          id: "RAP-F-040",
          name: "Present Ages",
          formula: "Present ages = ax and bx",
          usage: "Present age ratio a:b given unnappudu.",
          condition: "x common age multiplier."
        },
        {
          id: "RAP-F-041",
          name: "Future Age Ratio",
          formula: "(ax+n)/(bx+n) = future ratio",
          usage: "n years later age ratio questions.",
          condition: "Both persons ki n years add cheyyali."
        },
        {
          id: "RAP-F-042",
          name: "Past Age Ratio",
          formula: "(ax−n)/(bx−n) = past ratio",
          usage: "n years ago age ratio questions.",
          condition: "Both ages n kante greater undali."
        },
        {
          id: "RAP-F-043",
          name: "Age Difference",
          formula: "Age difference = |a−b|x",
          usage: "Ratio and age difference nunchi present ages find cheyyadaniki.",
          condition: "Age difference time tho change avvadu."
        }
      ]
    },
    {
      id: "income-expenditure",
      title: "Income, Expenditure and Savings",
      formulas: [
        {
          id: "RAP-F-044",
          name: "Savings Identity",
          formula: "Savings = Income − Expenditure",
          usage: "Income-expenditure ratio questions.",
          condition: "All values same period ki belong avvali."
        },
        {
          id: "RAP-F-045",
          name: "Savings from I:E Ratio",
          formula: "If I:E=a:b, then Savings:Income=(a−b):a",
          usage: "Savings as fraction or percentage of income find cheyyadaniki.",
          condition: "a>b."
        },
        {
          id: "RAP-F-046",
          name: "Savings-to-Expenditure Ratio",
          formula: "If I:E=a:b, then S:E=(a−b):b",
          usage: "Savings and expenditure compare cheyyadaniki.",
          condition: "a>b."
        },
        {
          id: "RAP-F-047",
          name: "Income from Savings",
          formula: "Income = Savings × a/(a−b)",
          usage: "I:E=a:b and savings given unnappudu.",
          condition: "a>b."
        }
      ]
    },
    {
      id: "partnership",
      title: "Investment Ratio Formulas",
      formulas: [
        {
          id: "RAP-F-048",
          name: "Same-Time Profit Ratio",
          formula: "Profit ratio = Capital ratio",
          usage: "Partners same duration invest chesinappudu.",
          condition: "Investment duration equal undali."
        },
        {
          id: "RAP-F-049",
          name: "Capital-Time Ratio",
          formula: "Profit ratio = C₁T₁:C₂T₂",
          usage: "Investment amounts or durations different unnappudu.",
          condition: "Time units same-ga undali."
        },
        {
          id: "RAP-F-050",
          name: "Individual Profit Share",
          formula: "Share = Total profit × individual capital-time/total capital-time",
          usage: "Total profit-ni partners madhya divide cheyyadaniki.",
          condition: "All partners capital-time values include cheyyali."
        }
      ]
    },
    {
      id: "transformations",
      title: "Ratio Transformations",
      formulas: [
        {
          id: "RAP-F-051",
          name: "Invertendo",
          formula: "If a/b=c/d, then b/a=d/c",
          usage: "Both ratios invert cheyyadaniki.",
          condition: "a,c ≠ 0."
        },
        {
          id: "RAP-F-052",
          name: "Alternendo",
          formula: "If a/b=c/d, then a/c=b/d",
          usage: "Alternate terms ratio form cheyyadaniki.",
          condition: "c,d ≠ 0."
        },
        {
          id: "RAP-F-053",
          name: "Componendo",
          formula: "If a/b=c/d, then (a+b)/b=(c+d)/d",
          usage: "Numerator and denominator sum expressions simplify cheyyadaniki.",
          condition: "b,d ≠ 0."
        },
        {
          id: "RAP-F-054",
          name: "Dividendo",
          formula: "If a/b=c/d, then (a−b)/b=(c−d)/d",
          usage: "Difference expressions simplify cheyyadaniki.",
          condition: "b,d ≠ 0."
        },
        {
          id: "RAP-F-055",
          name: "Componendo-Dividendo",
          formula: "If a/b=c/d, then (a+b)/(a−b)=(c+d)/(c−d)",
          usage: "Sum-over-difference ratio questions fast-ga solve cheyyadaniki.",
          condition: "a≠b and c≠d."
        }
      ]
    }
  ],
  quickRevision: [
    "a:b = a/b.",
    "Proportion lo extremes product = means product.",
    "Mean proportional = √(product of outer terms).",
    "Third proportional = second²/first.",
    "Fourth proportional = second×third/first.",
    "Compound ratio lo corresponding terms multiply cheyyali.",
    "Share = Total×required ratio part/total ratio parts.",
    "Direct proportion lo quotient constant.",
    "Inverse proportion lo product constant.",
    "Ratio quantities-ni ax, bx ani represent cheyyi.",
    "Difference given ayithe ratio difference use cheyyi.",
    "Age difference constant.",
    "Savings = Income−Expenditure.",
    "Profit share follows Capital×Time."
  ],
  masteryRequirements: {
    totalFormulas: 55,
    minimumRecallAccuracy: 85,
    recommendedRevisionMinutes: 35,
    nextModule: "shortcuts"
  }
};

export default formulas;