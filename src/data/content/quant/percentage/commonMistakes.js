const commonMistakes = {
  title: "Percentage Common Mistakes",
  description: "Percentage questions lo frequently jarige mistakes, correct rules mariyu prevention tips.",
  estimatedMinutes: 20,
  mistakes: [
    {
      id: "PER-CM-001",
      concept: "Percentage Base",
      mistake: "Percentage calculate chestunnappudu wrong value-ni denominator-ga use cheyyadam.",
      correctRule: "Percentage change always original/reference value meeda calculate cheyyali.",
      example: "80 nunchi 100 ki increase: 20/80×100=25%.",
      prevention: "Question lo original value edi ani first identify cheyyi."
    },
    {
      id: "PER-CM-002",
      concept: "Percentage Meaning",
      mistake: "20% ni 20 laga use cheyyadam.",
      correctRule: "20%=20/100=1/5.",
      example: "20% of 250=(20/100)×250=50.",
      prevention: "Percentage symbol remove chesinappudu 100 tho divide cheyyi."
    },
    {
      id: "PER-CM-003",
      concept: "Fraction Conversion",
      mistake: "Fraction ni percentage-ga convert chestunnappudu 100 tho divide cheyyadam.",
      correctRule: "Fraction ni percentage-ga convert cheyyadaniki 100 tho multiply cheyyali.",
      example: "3/5×100=60%.",
      prevention: "Fraction → percentage means ×100."
    },
    {
      id: "PER-CM-004",
      concept: "Decimal Conversion",
      mistake: "0.25 ni 0.25% ani rayadam.",
      correctRule: "Decimal ni percentage-ga convert cheyyadaniki 100 tho multiply cheyyali.",
      example: "0.25×100=25%.",
      prevention: "Decimal point-ni two places right shift cheyyi."
    },
    {
      id: "PER-CM-005",
      concept: "Percentage to Decimal",
      mistake: "35% ni 3.5 ani convert cheyyadam.",
      correctRule: "Percentage ni decimal-ga convert cheyyadaniki 100 tho divide cheyyali.",
      example: "35%=0.35.",
      prevention: "Percentage → decimal means point two places left."
    },
    {
      id: "PER-CM-006",
      concept: "Increase and Decrease",
      mistake: "Increase amount-ni final value tho divide cheyyadam.",
      correctRule: "Increase%=Increase/Original×100.",
      example: "₹200 nunchi ₹250: increase%=50/200×100=25%.",
      prevention: "Change percentage denominator always original."
    },
    {
      id: "PER-CM-007",
      concept: "Decrease Percentage",
      mistake: "Decrease percentage denominator-ga reduced value use cheyyadam.",
      correctRule: "Decrease%=Decrease/Original×100.",
      example: "₹500 nunchi ₹400: decrease%=100/500×100=20%.",
      prevention: "Before-change value-ni base-ga teesuko."
    },
    {
      id: "PER-CM-008",
      concept: "Reverse Comparison",
      mistake: "A, B kante 25% ekkuva ayithe B, A kante 25% takkuva ani assume cheyyadam.",
      correctRule: "Reverse percentage different base meeda calculate avutundi.",
      example: "B=100, A=125; B is 25/125×100=20% less than A.",
      prevention: "Direction maarithe base kuda maarutundi."
    },
    {
      id: "PER-CM-009",
      concept: "Successive Increase",
      mistake: "Successive percentage increases-ni direct-ga add cheyyadam.",
      correctRule: "Net change=a+b+ab/100.",
      example: "10% and 20% increases: 10+20+2=32% increase.",
      prevention: "Successive changes lo product term include cheyyi."
    },
    {
      id: "PER-CM-010",
      concept: "Successive Decrease",
      mistake: "Two decreases-ni direct-ga add cheyyadam.",
      correctRule: "Equivalent decrease=a+b−ab/100.",
      example: "20% and 10% decreases: 20+10−2=28% decrease.",
      prevention: "Two discounts/decreases lo product term subtract cheyyi."
    },
    {
      id: "PER-CM-011",
      concept: "Equal Increase and Decrease",
      mistake: "x% increase and x% decrease cancel avutayi ani assume cheyyadam.",
      correctRule: "Net result=x²/100% decrease.",
      example: "20% increase, 20% decrease → 4% decrease.",
      prevention: "Equal percentages, unequal bases ani remember cheyyi."
    },
    {
      id: "PER-CM-012",
      concept: "Signed Changes",
      mistake: "Increase and decrease rendu positive-ga formula lo use cheyyadam.",
      correctRule: "Successive-change formula lo decrease-ni negative value-ga use cheyyali.",
      example: "+20% and −10%: 20−10−2=8% increase.",
      prevention: "Increase plus; decrease minus."
    },
    {
      id: "PER-CM-013",
      concept: "Reverse Percentage",
      mistake: "Final value nunchi same percentage subtract chesi original find cheyyadam.",
      correctRule: "x% increase tarvata original=Final×100/(100+x).",
      example: "20% increase tarvata value 600; original=600×100/120=500.",
      prevention: "Original kosam multiplier-ni reverse cheyyi."
    },
    {
      id: "PER-CM-014",
      concept: "Reverse Decrease",
      mistake: "Final value ki decreased percentage add chesi original find cheyyadam.",
      correctRule: "x% decrease tarvata original=Final×100/(100−x).",
      example: "20% decrease tarvata value 400; original=400×100/80=500.",
      prevention: "Reduced value represents (100−x)%."
    },
    {
      id: "PER-CM-015",
      concept: "Price and Consumption",
      mistake: "Price increase percentage equal-ga consumption decrease cheyyadam.",
      correctRule: "Expenditure constant unte required decrease=100x/(100+x)%.",
      example: "Price 25% increase ayithe consumption 20% decrease cheyyali.",
      prevention: "Price–consumption changes reciprocal bases meeda untayi."
    },
    {
      id: "PER-CM-016",
      concept: "Price Decrease",
      mistake: "Price decrease ayithe consumption same percentage increase cheyyadam.",
      correctRule: "Required increase=100x/(100−x)%.",
      example: "Price 20% decrease ayithe consumption 25% increase cheyyachu.",
      prevention: "Decrease denominator lo 100−x use cheyyi."
    },
    {
      id: "PER-CM-017",
      concept: "Population Growth",
      mistake: "Multiple years growth-ni rate×years laga calculate cheyyadam.",
      correctRule: "Population growth compound-ga calculate cheyyali.",
      example: "10% yearly growth for 2 years: multiplier=1.1²=1.21.",
      prevention: "Each year updated population meeda rate apply avutundi."
    },
    {
      id: "PER-CM-018",
      concept: "Population Decline",
      mistake: "Yearly decrease-ni original population meeda prathi year subtract cheyyadam.",
      correctRule: "n years final population=P(1−r/100)ⁿ.",
      example: "1000 lo 10% yearly decline for 2 years: 1000×0.9²=810.",
      prevention: "Repeated percentage change means compound multiplier."
    },
    {
      id: "PER-CM-019",
      concept: "Marks Percentage",
      mistake: "Obtained marks-ni denominator-ga use cheyyadam.",
      correctRule: "Marks percentage=Obtained marks/Maximum marks×100.",
      example: "360 out of 450 =360/450×100=80%.",
      prevention: "Out of value denominator."
    },
    {
      id: "PER-CM-020",
      concept: "Pass Marks",
      mistake: "Failed-by marks-ni total marks tho direct-ga compare cheyyadam.",
      correctRule: "First candidate marks and required pass marks equations form cheyyali.",
      example: "30% marks vachayi, 12 marks fail; pass mark=30% of total+12.",
      prevention: "Percentage marks-ni actual marks-ga convert chesi equation rayi."
    },
    {
      id: "PER-CM-021",
      concept: "Election Questions",
      mistake: "Valid votes and total votes same ani assume cheyyadam.",
      correctRule: "Invalid votes unte valid votes first calculate cheyyali.",
      example: "10,000 votes lo 5% invalid ayithe valid votes=9,500.",
      prevention: "Percentage base total votes aa valid votes aa check cheyyi."
    },
    {
      id: "PER-CM-022",
      concept: "Income and Expenditure",
      mistake: "Savings percentage base-ni identify cheyyakunda calculate cheyyadam.",
      correctRule: "Savings as percentage of income=(Savings/Income)×100.",
      example: "Income ₹5000, expenditure ₹4000; savings%=1000/5000×100=20%.",
      prevention: "'Of income' ante income denominator."
    },
    {
      id: "PER-CM-023",
      concept: "Income Comparison",
      mistake: "Income expenditure kante 25% ekkuva ayithe savings income lo 25% ani assume cheyyadam.",
      correctRule: "Expenditure=100 ayithe income=125; savings=25, so savings/income=20%.",
      example: "Savings%=100×25/125=20%.",
      prevention: "Comparison base and required base separate-ga check cheyyi."
    },
    {
      id: "PER-CM-024",
      concept: "Percentage Points",
      mistake: "Percentage-point change and percentage change same ani treat cheyyadam.",
      correctRule: "Rates difference percentage points; relative change original rate meeda calculate cheyyali.",
      example: "40% nunchi 50%: 10 percentage points, but 25% relative increase.",
      prevention: "Direct rate difference ki percentage points ani rayi."
    },
    {
      id: "PER-CM-025",
      concept: "Ratio to Percentage",
      mistake: "Ratio a:b lo a/b×100 badulu a/(a+b)×100 use cheyyalsina context miss cheyyadam.",
      correctRule: "A as percentage of B=a/b×100; A as percentage of total=a/(a+b)×100.",
      example: "Boys:girls=3:2; boys are 150% of girls, but 60% of total.",
      prevention: "Question B-ni adiginda leka total-ni adiginda check cheyyi."
    },
    {
      id: "PER-CM-026",
      concept: "Percentage of Percentage",
      mistake: "Percentages-ni add cheyyadam.",
      correctRule: "x% of y%=xy/100 percent of original quantity.",
      example: "20% of 30% of 500=0.2×0.3×500=30.",
      prevention: "'Of' kanipisthe multiplication."
    },
    {
      id: "PER-CM-027",
      concept: "Numerator Change",
      mistake: "Fraction numerator percentage change ni whole fraction denominator meeda apply cheyyadam.",
      correctRule: "Numerator x% increase ayithe fraction kuda x% increase, denominator unchanged unte.",
      example: "3/5 numerator 20% increase ayithe fraction=3.6/5, which is 20% higher.",
      prevention: "Only changed component multiplier apply cheyyi."
    },
    {
      id: "PER-CM-028",
      concept: "Denominator Change",
      mistake: "Denominator x% increase ayithe fraction x% decrease ani assume cheyyadam.",
      correctRule: "New fraction multiplier=100/(100+x).",
      example: "Denominator 25% increase ayithe fraction 100/125=80%, so 20% decrease.",
      prevention: "Denominator change inverse effect istundi."
    },
    {
      id: "PER-CM-029",
      concept: "Units",
      mistake: "Different units unna values-ni direct-ga percentage compare cheyyadam.",
      correctRule: "Values-ni same units-loki convert chesi compare cheyyali.",
      example: "500 g as percentage of 2 kg: 500/2000×100=25%.",
      prevention: "Percentage calculation mundu units match cheyyi."
    },
    {
      id: "PER-CM-030",
      concept: "Approximation",
      mistake: "Intermediate steps lo aggressive rounding chesi final answer wrong cheyyadam.",
      correctRule: "Exact fraction or sufficient decimals final step varaku maintain cheyyali.",
      example: "1/6=16⅔%; 16% ani approximate chesthe repeated calculations wrong avutayi.",
      prevention: "Standard fractional percentages-ni exact-ga use cheyyi."
    }
  ],
  finalChecklist: [
    "Original/reference value-ni correct denominator-ga use chesana?",
    "Percentage-ni fraction or decimal-ga correct-ga convert chesana?",
    "Increase/decrease amount-ni correct-ga calculate chesana?",
    "Successive changes lo product term include chesana?",
    "Decrease-ni negative sign tho treat chesana?",
    "Reverse percentage lo division multiplier use chesana?",
    "Equal increase and decrease cancel avvavu ani remember chesana?",
    "Price-consumption question lo expenditure constant condition check chesana?",
    "Population change ki compound multiplier use chesana?",
    "Marks question lo maximum marks denominator-ga use chesana?",
    "Valid votes and total votes difference check chesana?",
    "Income, expenditure, savings lo required base identify chesana?",
    "Ratio question lo comparison value aa total aa verify chesana?",
    "Calculation mundu units same-ga convert chesana?"
  ],
  masteryRequirements: {
    totalMistakes: 30,
    requiredChecklistReview: true,
    recommendedReviewMinutes: 20,
    repeatBeforeTopicTest: true,
    nextModule: "mastery"
  }
};

export default commonMistakes;