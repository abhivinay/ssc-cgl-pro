const commonMistakes = {
  title: "Ratio and Proportion Common Mistakes",
  description: "SSC CGL Ratio and Proportion lo frequently jarige errors, correct methods and prevention checklist.",
  estimatedMinutes: 20,
  categories: [
    "units-and-simplification",
    "ratio-basics",
    "proportion",
    "division",
    "linked-ratios",
    "direct-inverse-proportion",
    "ratio-change",
    "ages",
    "income-expenditure",
    "percentage-ratios",
    "partnership",
    "exam-strategy"
  ],
  mistakes: [
    {
      id: "RAP-CM-001",
      category: "units-and-simplification",
      title: "Different units-ni direct-ga compare cheyyadam",
      mistake: "2 kg:500 g-ni 2:500 ani rayadam.",
      whyWrong: "Ratio form cheyyadaniki rendu quantities same unit lo undali.",
      correctMethod: "2 kg=2000 g; 2000:500=4:1.",
      prevention: "Ratio mundu units check cheyyi."
    },
    {
      id: "RAP-CM-002",
      category: "units-and-simplification",
      title: "Final ratio simplify cheyyakapovadam",
      mistake: "20:30-ni final answer-ga ivvadam.",
      whyWrong: "SSC options usually simplest form lo untayi.",
      correctMethod: "20:30-ni HCF 10 tho divide chesi 2:3 cheyyali.",
      prevention: "Last step lo common factor check cheyyi."
    },
    {
      id: "RAP-CM-003",
      category: "units-and-simplification",
      title: "Decimals-ni unequal multipliers tho remove cheyyadam",
      mistake: "0.4:1.2 lo oka term-ni 10, inkoka term-ni 100 tho multiply cheyyadam.",
      whyWrong: "Equivalent ratio kosam all terms same non-zero number tho change avvali.",
      correctMethod: "0.4:1.2=4:12=1:3.",
      prevention: "All ratio terms ki same multiplier."
    },
    {
      id: "RAP-CM-004",
      category: "ratio-basics",
      title: "Ratio terms-ni actual values anukovadam",
      mistake: "A:B=3:5 ante A=3, B=5 only ani assume cheyyadam.",
      whyWrong: "3 and 5 proportional parts maatrame.",
      correctMethod: "A=3x and B=5x ani represent cheyyali.",
      prevention: "Unknown values unte common multiplier x use cheyyi."
    },
    {
      id: "RAP-CM-005",
      category: "ratio-basics",
      title: "Ratio order reverse cheyyadam",
      mistake: "A:B adigithe B:A answer ivvadam.",
      whyWrong: "3:5 and 5:3 different comparisons.",
      correctMethod: "Question lo quantities order-ni final answer varaku preserve cheyyali.",
      prevention: "Required order-ni underline cheyyi."
    },
    {
      id: "RAP-CM-006",
      category: "ratio-basics",
      title: "Ratio-ni subtraction laga treat cheyyadam",
      mistake: "8:5 difference 3 kabatti ratio 3 ani anukovadam.",
      whyWrong: "Ratio is division/comparison, not difference.",
      correctMethod: "8:5 means 8/5.",
      prevention: "Colon-ni fraction bar laga read cheyyi."
    },
    {
      id: "RAP-CM-007",
      category: "proportion",
      title: "Cross multiplication pairs wrong-ga use cheyyadam",
      mistake: "a:b=c:d lo ab=cd ani rayadam.",
      whyWrong: "Proportion identity extremes product=means product.",
      correctMethod: "ad=bc.",
      prevention: "First×last = middle×middle."
    },
    {
      id: "RAP-CM-008",
      category: "proportion",
      title: "Mean proportional-ni arithmetic mean tho confuse cheyyadam",
      mistake: "a and c madhya mean proportional=(a+c)/2 ani use cheyyadam.",
      whyWrong: "Continued proportion lo b²=ac.",
      correctMethod: "Mean proportional=√(ac).",
      prevention: "Proportional mean = geometric mean."
    },
    {
      id: "RAP-CM-009",
      category: "proportion",
      title: "Third proportional formula reverse cheyyadam",
      mistake: "a, b ki third proportional=a²/b ani use cheyyadam.",
      whyWrong: "a:b=b:c kabatti ac=b².",
      correctMethod: "c=b²/a.",
      prevention: "Repeated middle term-ni square cheyyi."
    },
    {
      id: "RAP-CM-010",
      category: "proportion",
      title: "Fourth proportional order marchadam",
      mistake: "a, b, c ki fourth proportional=ab/c ani use cheyyadam.",
      whyWrong: "Required relation a:b=c:d.",
      correctMethod: "d=bc/a.",
      prevention: "Given order lo proportion write chesi cross multiply cheyyi."
    },
    {
      id: "RAP-CM-011",
      category: "division",
      title: "Total question lo ratio difference use cheyyadam",
      mistake: "A+B=S given unna S÷|a−b| cheyyadam.",
      whyWrong: "Total quantity all ratio parts sum-ni represent chestundi.",
      correctMethod: "One part=S/(a+b).",
      prevention: "Total means add parts."
    },
    {
      id: "RAP-CM-012",
      category: "division",
      title: "Difference question lo ratio sum use cheyyadam",
      mistake: "|A−B|=D given unna D÷(a+b) cheyyadam.",
      whyWrong: "Actual difference ratio-term difference-ni represent chestundi.",
      correctMethod: "One part=D/|a−b|.",
      prevention: "Difference means subtract parts."
    },
    {
      id: "RAP-CM-013",
      category: "division",
      title: "Required share numerator wrong-ga select cheyyadam",
      mistake: "First share adigithe second ratio part use cheyyadam.",
      whyWrong: "Each share corresponding ratio term-ni follow avutundi.",
      correctMethod: "First share=Total×first part/sum of parts.",
      prevention: "Person/quantity name ki ratio term map cheyyi."
    },
    {
      id: "RAP-CM-014",
      category: "linked-ratios",
      title: "Linked ratios-ni direct-ga join cheyyadam",
      mistake: "A:B=2:3 and B:C=4:5 ⇒ A:B:C=2:3:5 ani rayadam.",
      whyWrong: "Two ratios lo B values 3 and 4 equal kaavu.",
      correctMethod: "B-ni 12 ga equal chesi A:B:C=8:12:15.",
      prevention: "Common term common value cheyyi."
    },
    {
      id: "RAP-CM-015",
      category: "linked-ratios",
      title: "Wrong common quantity-ni align cheyyadam",
      mistake: "A:B and B:C lo A and C terms equal cheyyadam.",
      whyWrong: "Repeated quantity B maatrame link.",
      correctMethod: "First ratio second term and second ratio first term equal cheyyali.",
      prevention: "Repeated letter-ni circle cheyyi."
    },
    {
      id: "RAP-CM-016",
      category: "direct-inverse-proportion",
      title: "Direct and inverse proportion confuse avvadam",
      mistake: "More workers unte more days ani direct proportion use cheyyadam.",
      whyWrong: "Same work lo workers increase ayithe days decrease.",
      correctMethod: "Workers×days constant; inverse proportion.",
      prevention: "More–more direct; more–less inverse."
    },
    {
      id: "RAP-CM-017",
      category: "direct-inverse-proportion",
      title: "Constant condition verify cheyyakapovadam",
      mistake: "Work amount change ayina workers×days constant ani assume cheyyadam.",
      whyWrong: "Inverse formula total work same unnappude valid.",
      correctMethod: "Work, distance or output constant aa first check cheyyali.",
      prevention: "Formula mundu constant quantity identify cheyyi."
    },
    {
      id: "RAP-CM-018",
      category: "direct-inverse-proportion",
      title: "Compound proportion lo oka factor ignore cheyyadam",
      mistake: "Machines and hours rendu change ayina machines maatrame compare cheyyadam.",
      whyWrong: "Output machines×hours rendu meeda depend avutundi.",
      correctMethod: "Output ∝ machines×hours.",
      prevention: "Changing factors anni table lo rayi."
    },
    {
      id: "RAP-CM-019",
      category: "ratio-change",
      title: "Same addition-ni ratio terms ki apply cheyyadam",
      mistake: "A:B=3:5; 10 add ayithe 13:15 ani direct-ga rayadam.",
      whyWrong: "3 and 5 parts; actual values 3x and 5x.",
      correctMethod: "New ratio=(3x+10):(5x+10).",
      prevention: "Addition actual quantities ki, parts ki kaadu."
    },
    {
      id: "RAP-CM-020",
      category: "ratio-change",
      title: "Subtraction tarvata validity check cheyyakapovadam",
      mistake: "Quantity kante ekkuva value subtract chesi negative answer accept cheyyadam.",
      whyWrong: "Physical quantities/ages usually positive undali.",
      correctMethod: "Solved x values original and changed quantities lo substitute chesi verify cheyyali.",
      prevention: "Final positivity and condition check compulsory."
    },
    {
      id: "RAP-CM-021",
      category: "ratio-change",
      title: "Same addition direction rule wrong-ga use cheyyadam",
      mistake: "Positive smaller:larger ratio same addition tarvata 1 nunchi dooram avutundi ani anukovadam.",
      whyWrong: "Same positive addition relative gap-ni reduce chestundi.",
      correctMethod: "Ratio 1 ki closer avutundi.",
      prevention: "Add → together; subtract → apart, valid positive case lo."
    },
    {
      id: "RAP-CM-022",
      category: "ages",
      title: "Years-ni ratio terms ki add cheyyadam",
      mistake: "Present ratio 3:5; after 4 years ratio 7:9 ani direct-ga rayadam.",
      whyWrong: "Ratio parts years kaavu.",
      correctMethod: "Present ages 3x,5x; future ages 3x+4,5x+4.",
      prevention: "Time actual ages ki apply cheyyi."
    },
    {
      id: "RAP-CM-023",
      category: "ages",
      title: "Age ratio constant ani assume cheyyadam",
      mistake: "Present ratio future lo kuda same untundi ani anukovadam.",
      whyWrong: "Both ages same amount increase ayina their ratio generally changes.",
      correctMethod: "Age difference constant; ratio constant kaadu.",
      prevention: "Age gap stays, age ratio changes."
    },
    {
      id: "RAP-CM-024",
      category: "income-expenditure",
      title: "Savings identity reverse cheyyadam",
      mistake: "Savings=Expenditure−Income ani rayadam.",
      whyWrong: "Savings is remaining income.",
      correctMethod: "Savings=Income−Expenditure.",
      prevention: "I−E=S memory rule."
    },
    {
      id: "RAP-CM-025",
      category: "income-expenditure",
      title: "Separate ratios ki same multiplier use cheyyadam",
      mistake: "Income ratio and expenditure ratio different data ayina both ki same x assume cheyyadam.",
      whyWrong: "Ratio scales independent undachu.",
      correctMethod: "Incomes=ax,bx; expenditures=cy,dy ani separate multipliers use cheyyali.",
      prevention: "Different ratio sets → different variables."
    },
    {
      id: "RAP-CM-026",
      category: "percentage-ratios",
      title: "Percentage base reverse cheyyadam",
      mistake: "A is 25% more than B kabatti B is 25% less than A ani anukovadam.",
      whyWrong: "Percentage bases B and A different.",
      correctMethod: "A:B=125:100=5:4; B is 1/5=20% less than A.",
      prevention: "Required comparison base denominator."
    },
    {
      id: "RAP-CM-027",
      category: "percentage-ratios",
      title: "More/less ratio order wrong-ga rayadam",
      mistake: "A is 20% less than B ⇒ A:B=100:80 ani rayadam.",
      whyWrong: "B is base 100; A is 80.",
      correctMethod: "A:B=80:100=4:5.",
      prevention: "Base quantity-ni 100 ga set cheyyi."
    },
    {
      id: "RAP-CM-028",
      category: "partnership",
      title: "Investment duration ignore cheyyadam",
      mistake: "Different durations unna profit ratio=capital ratio ani use cheyyadam.",
      whyWrong: "Profit money entha time business lo undo danipai depend avutundi.",
      correctMethod: "Profit ratio=Capital×Time ratio.",
      prevention: "Capital pakkana months column rayi."
    },
    {
      id: "RAP-CM-029",
      category: "partnership",
      title: "Time units mix cheyyadam",
      mistake: "Oka investment months lo, inkokati years lo direct multiply cheyyadam.",
      whyWrong: "Capital-time values comparable units lo undali.",
      correctMethod: "All durations-ni months or years lo same unit-ki convert cheyyali.",
      prevention: "Capital mundu kaadu, time units mundu normalize cheyyi."
    },
    {
      id: "RAP-CM-030",
      category: "exam-strategy",
      title: "Answer-ni original conditions tho verify cheyyakapovadam",
      mistake: "Equation solve chesina value-ni direct mark cheyyadam.",
      whyWrong: "Arithmetic, order or invalid-value error undachu.",
      correctMethod: "Values-ni original ratio, sum/difference and change condition lo substitute cheyyali.",
      prevention: "Final 10-second substitution check."
    }
  ],
  examChecklist: [
    "Rendu quantities same units lo unnaya?",
    "Required ratio order correct-ga unda?",
    "Ratio simplest form lo unda?",
    "Total ki sum, difference ki ratio difference use chesana?",
    "Linked ratios lo common term equal chesana?",
    "Direct or inverse relationship correct-ga identify chesana?",
    "Actual quantities-ni ax, bx ani represent chesana?",
    "Age question lo years actual ages ki apply chesana?",
    "Percentage comparison lo correct base use chesana?",
    "Partnership lo capital and time rendu include chesana?",
    "Answer-ni original condition lo verify chesana?"
  ],
  errorLogTemplate: {
    fields: [
      "date",
      "questionId",
      "category",
      "wrongMethod",
      "correctRule",
      "retryDate",
      "resolved"
    ],
    retryIntervalsDays: [1, 3, 7, 15]
  },
  masteryRequirements: {
    totalMistakes: 30,
    requiredChecklistReview: true,
    recommendedReviewMinutes: 20,
    repeatBeforeTopicTest: true,
    nextModule: "mastery"
  }
};

export default commonMistakes;
