const shortcuts = {
  title: "Ratio and Proportion Shortcuts",
  description: "SSC CGL Ratio and Proportion questions-ni fast-ga solve cheyyadaniki exam shortcuts.",
  estimatedMinutes: 35,
  shortcuts: [
    {
      id: "RAP-SC-001",
      title: "Same Units First",
      rule: "Ratio calculate cheyyakamundu quantities-ni same units-loki convert cheyyi.",
      example: "750 g:3 kg = 750:3000 = 1:4.",
      useWhen: "Different units unna ratio questions.",
      caution: "Units cancel avutayi ani direct-ga compare cheyyaku."
    },
    {
      id: "RAP-SC-002",
      title: "Decimal Removal",
      rule: "Maximum decimal places count batti 10, 100, 1000 tho all terms-ni multiply cheyyi.",
      example: "0.24:0.6 = 24:60 = 2:5.",
      useWhen: "Decimal ratios.",
      caution: "All terms-ni same multiplier tho multiply cheyyali."
    },
    {
      id: "RAP-SC-003",
      title: "Fraction Ratio Shortcut",
      rule: "Fractions ratio lo denominators LCM tho all terms-ni multiply cheyyi.",
      example: "1/3:1/4:1/6; LCM 12 ⇒ 4:3:2.",
      useWhen: "Fractional ratio terms.",
      caution: "Fraction values-ni denominators maatrame compare cheyyaku."
    },
    {
      id: "RAP-SC-004",
      title: "Cross Product Comparison",
      rule: "a:b and c:d compare cheyyadaniki ad and bc compare cheyyi.",
      example: "7:9 vs 11:15; 7×15=105, 11×9=99 ⇒ 7:9 greater.",
      useWhen: "Two ratios comparison.",
      caution: "Cross products correct pairs tho calculate cheyyi."
    },
    {
      id: "RAP-SC-005",
      title: "Proportion Cross Multiplication",
      rule: "a:b::c:d ayithe ad=bc.",
      example: "6:15::14:x ⇒ 6x=210 ⇒ x=35.",
      useWhen: "Missing proportional term.",
      caution: "Terms order change cheyyaku."
    },
    {
      id: "RAP-SC-006",
      title: "Mean Proportional",
      rule: "Two numbers madhya mean proportional = square root of their product.",
      example: "9 and 16 ⇒ √144=12.",
      useWhen: "Mean proportional questions.",
      caution: "Arithmetic mean (a+b)/2 tho confuse avvaku."
    },
    {
      id: "RAP-SC-007",
      title: "Third Proportional",
      rule: "a and b ki third proportional = b²/a.",
      example: "8 and 12 ⇒ 144/8=18.",
      useWhen: "a:b=b:x form.",
      caution: "First number-ni square cheyyaku."
    },
    {
      id: "RAP-SC-008",
      title: "Fourth Proportional",
      rule: "a, b, c ki fourth proportional = bc/a.",
      example: "6, 9, 14 ⇒ 9×14/6=21.",
      useWhen: "a:b=c:x form.",
      caution: "Given order preserve cheyyi."
    },
    {
      id: "RAP-SC-009",
      title: "Compound Ratio Cancellation",
      rule: "Corresponding terms multiply cheyyakamunde cross factors cancel cheyyi.",
      example: "4:9 and 15:8 ⇒ (4×15):(9×8); cancel chesi 5:6.",
      useWhen: "Large-number compound ratios.",
      caution: "Final left product:right product format maintain cheyyi."
    },
    {
      id: "RAP-SC-010",
      title: "One-Part Method from Total",
      rule: "One part = Total÷sum of ratio terms.",
      example: "₹1260 in 2:3:4; one part=1260/9=140 ⇒ ₹280, ₹420, ₹560.",
      useWhen: "Total division questions.",
      caution: "Ratio terms sum miss cheyyaku."
    },
    {
      id: "RAP-SC-011",
      title: "One-Part Method from Difference",
      rule: "One part = Actual difference÷ratio-term difference.",
      example: "Numbers ratio 5:9, difference 44 ⇒ one part=44/4=11 ⇒ 55, 99.",
      useWhen: "Ratio and difference given.",
      caution: "Sum badulu ratio difference use cheyyali."
    },
    {
      id: "RAP-SC-012",
      title: "Direct Share Formula",
      rule: "Required share = Total×required ratio term/sum of terms.",
      example: "₹960 lo 5:7 ratio first share=960×5/12=₹400.",
      useWhen: "Only one share required.",
      caution: "Unnecessary-ga all shares calculate cheyyalsina avasaram ledu."
    },
    {
      id: "RAP-SC-013",
      title: "Combine Common Middle Term",
      rule: "A:B=a:b and B:C=c:d ayithe A:B:C=ac:bc:bd.",
      example: "A:B=2:5, B:C=3:4 ⇒ A:B:C=6:15:20.",
      useWhen: "Two linked ratios.",
      caution: "Common B value same scale lo undali."
    },
    {
      id: "RAP-SC-014",
      title: "Three-Ratio Chain",
      rule: "Ratios-ni pairwise combine chesi common terms equal cheyyi.",
      example: "A:B=2:3, B:C=4:5, C:D=10:7 ⇒ A:B:C:D=16:24:30:21.",
      useWhen: "Three linked ratios.",
      caution: "Prathi common term alignment verify cheyyi."
    },
    {
      id: "RAP-SC-015",
      title: "Direct Proportion Arrow Check",
      rule: "More–more or less–less ayithe direct proportion; same-side ratio use cheyyi.",
      example: "6 books ₹270 ayithe 10 books=270×10/6=₹450.",
      useWhen: "Quantity and cost lanti constant-rate questions.",
      caution: "Rate constant condition undali."
    },
    {
      id: "RAP-SC-016",
      title: "Inverse Proportion Product",
      rule: "More–less ayithe old first×old second = new first×new second.",
      example: "18 workers×20 days=24 workers×d ⇒ d=15 days.",
      useWhen: "Workers-days, speed-time questions.",
      caution: "Total work or distance same undali."
    },
    {
      id: "RAP-SC-017",
      title: "Ratio Values as Parts",
      rule: "A:B=a:b ayithe actual values-ni ax and bx ani assume cheyyi.",
      example: "A:B=4:7; both ki 9 add chesthe 5:8 ⇒ (4x+9)/(7x+9)=5/8.",
      useWhen: "Addition, subtraction or age-ratio changes.",
      caution: "a and b actual values ani assume cheyyaku."
    },
    {
      id: "RAP-SC-018",
      title: "Same Addition Direction Check",
      rule: "Smaller and larger positive quantities ki same positive number add chesthe ratio 1 ki closer avutundi.",
      example: "3:5 ki same number add chesthe new ratio 3/5 kante greater but 1 kante less.",
      useWhen: "Options eliminate cheyyadaniki.",
      caution: "Negative values or subtraction cases ki blindly apply cheyyaku."
    },
    {
      id: "RAP-SC-019",
      title: "Same Subtraction Direction Check",
      rule: "Smaller and larger positive quantities nunchi same number subtract chesthe ratio 1 nunchi farther avutundi.",
      example: "5:8 nunchi same valid amount subtract chesthe new ratio 5/8 kante smaller.",
      useWhen: "New-ratio option elimination.",
      caution: "Subtract chesina tarvata quantities positive undali."
    },
    {
      id: "RAP-SC-020",
      title: "Age Difference Shortcut",
      rule: "Age ratio and age difference given ayithe one part directly find cheyyi.",
      example: "Father:son=8:3, difference=35 ⇒ 5 parts=35 ⇒ ages 56, 21.",
      useWhen: "Present-age ratio with difference.",
      caution: "Age difference years pass ayina constant."
    },
    {
      id: "RAP-SC-021",
      title: "Future Age Equation",
      rule: "Present ages ax, bx; n years later both ki n add cheyyi.",
      example: "A:B=2:3, 8 years later=4:5 ⇒ (2x+8)/(3x+8)=4/5 ⇒ x=4.",
      useWhen: "Future-age ratio.",
      caution: "Ratio terms ki years add cheyyaku; actual ages ki add cheyyi."
    },
    {
      id: "RAP-SC-022",
      title: "Income–Expenditure Parts",
      rule: "I:E=a:b ayithe savings=(a−b) parts.",
      example: "I:E=7:5 and income ₹28,000 ⇒ one part ₹4,000; savings=2 parts=₹8,000.",
      useWhen: "Income, expenditure and savings questions.",
      caution: "Income ratio term expenditure kante greater undali for positive savings."
    },
    {
      id: "RAP-SC-023",
      title: "Savings Percentage Shortcut",
      rule: "I:E=a:b ayithe savings as percentage of income=(a−b)/a×100.",
      example: "I:E=5:4 ⇒ savings%=1/5×100=20%.",
      useWhen: "Savings percentage of income.",
      caution: "Expenditure denominator-ga use cheyyaku."
    },
    {
      id: "RAP-SC-024",
      title: "Capital-Time Profit Ratio",
      rule: "Profit ratio kosam capital×investment months calculate cheyyi.",
      example: "₹12,000 for 10 months and ₹15,000 for 8 months ⇒ 120000:120000=1:1.",
      useWhen: "Partnership-linked ratio questions.",
      caution: "Time units same-ga convert cheyyi."
    },
    {
      id: "RAP-SC-025",
      title: "Componendo-Dividendo",
      rule: "x/y=a/b ayithe (x+y)/(x−y)=(a+b)/(a−b).",
      example: "x:y=7:4 ⇒ (x+y):(x−y)=11:3.",
      useWhen: "Sum and difference expressions.",
      caution: "Denominator difference zero kakudadhu."
    },
    {
      id: "RAP-SC-026",
      title: "Reverse Componendo-Dividendo",
      rule: "(x+y)/(x−y)=m/n ayithe x:y=(m+n):(m−n).",
      example: "(x+y)/(x−y)=9/5 ⇒ x:y=14:4=7:2.",
      useWhen: "Sum-difference ratio nunchi original ratio.",
      caution: "Equation signs carefully read cheyyi."
    },
    {
      id: "RAP-SC-027",
      title: "Percentage to Ratio",
      rule: "A, B kante p% ekkuva ayithe A:B=(100+p):100.",
      example: "A is 25% more than B ⇒ A:B=125:100=5:4.",
      useWhen: "Percentage comparison-ni ratio-ga convert cheyyadaniki.",
      caution: "Base B ani remember cheyyi."
    },
    {
      id: "RAP-SC-028",
      title: "Less-Than Percentage to Ratio",
      rule: "A, B kante p% takkuva ayithe A:B=(100−p):100.",
      example: "A is 20% less than B ⇒ A:B=80:100=4:5.",
      useWhen: "Less-than percentage comparison.",
      caution: "Reverse percentage same kaadu."
    },
    {
      id: "RAP-SC-029",
      title: "Reverse Percentage from Ratio",
      rule: "A:B=a:b ayithe B, A kante percentage difference=(b−a)/a×100.",
      example: "A:B=4:5 ⇒ B is 1/4×100=25% more than A.",
      useWhen: "Reverse comparison asked.",
      caution: "Required comparison base denominator-ga use cheyyi."
    },
    {
      id: "RAP-SC-030",
      title: "Option Substitution",
      rule: "Complex ratio equation lo options-ni common multiplier or required value-ga substitute chesi verify cheyyi.",
      example: "Actual values options lo unte ratio, sum and change conditions quickly check cheyyi.",
      useWhen: "MCQ equations lengthy-ga unnappudu.",
      caution: "All given conditions satisfy ayye option maatrame select cheyyi."
    }
  ],
  speedChecklist: [
    "Quantities same units lo unnaya?",
    "Ratio simplest form lo unda?",
    "Question total ichinda leka difference ichinda?",
    "Direct proportion aa inverse proportion aa?",
    "Common ratio term equal chesana?",
    "Age question lo years actual ages ki apply chesana?",
    "Income−Expenditure=Savings use chesana?",
    "Percentage comparison lo correct base identify chesana?",
    "Final answer required order lo unda?"
  ],
  masteryRequirements: {
    totalShortcuts: 30,
    minimumRecallAccuracy: 85,
    recommendedPracticeMinutes: 35,
    nextModule: "examples"
  }
};

export default shortcuts;