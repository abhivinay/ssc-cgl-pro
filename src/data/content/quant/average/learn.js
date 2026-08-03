const learn = {
  title: "Average — Complete Learn Module",
  description: "SSC CGL Average topic-ni basics nunchi advanced applications varaku Roman Telugu explanation tho nerchukune module.",
  estimatedMinutes: 100,
  sections: [
    {
      id: "AVG-L-001",
      title: "Average Meaning",
      explanation: "Average ante total quantity-ni equal shares-ga distribute chesthe prathi share entha vastundo adi. Example: 10, 20, 30 total 60. Mugguriki equal-ga distribute chesthe 20 each; kabatti average 20.",
      rule: "Average = Sum of observations / Number of observations.",
      teacherNote: "Average oka balance point. Values anni average kante equal-ga undalsina avasaram ledu; vaati deviations total zero avutayi.",
      memoryTrick: "Total divide Count = Average.",
      examples: ["Average of 8, 12, 16 = 36/3 = 12.", "Average 25 of 4 values ante total 100."],
      commonTrap: "Largest and smallest values madhya midpoint prathi data set average kaadu. Symmetric or AP data lo maatrame ala work avutundi."
    },
    {
      id: "AVG-L-002",
      title: "Average–Total–Count Triangle",
      explanation: "Average questions lo three main quantities untayi: average, total, count. Rendu telisthe third easy-ga find cheyyachu.",
      rules: ["Total = Average × Count.", "Count = Total / Average.", "Average = Total / Count."],
      teacherNote: "Question lo average change ayithe first old total, tarvata new total calculate cheyyadam safest.",
      memoryTrick: "A×N=S; S/N=A; S/A=N.",
      example: "12 students average marks 48 ayithe total marks = 12×48 = 576."
    },
    {
      id: "AVG-L-003",
      title: "Missing Observation",
      explanation: "Average and migilina values ichinappudu, required total nunchi known values sum subtract chesthe missing value vastundi.",
      steps: ["Required total = average×count.", "Known observations sum calculate cheyyi.", "Missing value = required total−known sum."],
      example: "5 numbers average 24; four numbers sum 91. Required total 120; missing number 29.",
      teacherNote: "Count lo missing observation-ni include cheyyadam marchipovaddu."
    },
    {
      id: "AVG-L-004",
      title: "Deviation Method",
      explanation: "Numbers oka convenient base daggara unte direct sum badulu deviations use cheyyachu. Assumed average A ki prathi value difference-ni add cheyyi.",
      rule: "Actual average = Assumed average + Sum of deviations / Count.",
      example: "48, 49, 52, 51; assumed 50. Deviations −2,−1,+2,+1 total 0; average 50.",
      teacherNote: "Large close numbers unnappudu idi exam lo time save chestundi.",
      memoryTrick: "Base + net deviation/count."
    },
    {
      id: "AVG-L-005",
      title: "Consecutive Numbers and AP",
      explanation: "Equally spaced numbers lo values center chuttu balance avutayi. Kabatti average first and last midpoint.",
      rules: [
        "Arithmetic progression average = (first term + last term)/2.",
        "Odd count consecutive numbers average = middle number.",
        "Even count consecutive numbers average = two middle numbers average."
      ],
      examples: ["11,13,15,17,19 average=15.", "20 to 30 integers average=(20+30)/2=25."],
      exception: "Gaps equal kakapothe midpoint shortcut use cheyyakudadhu."
    },
    {
      id: "AVG-L-006",
      title: "Average Change in Every Observation",
      explanation: "Prathi observation same amount tho change ayithe average kuda exactly ade amount tho change avutundi.",
      rules: [
        "Every value ki k add chesthe new average = old average+k.",
        "Every value nunchi k subtract chesthe new average = old average−k.",
        "Every value-ni k tho multiply/divide chesthe average kuda k tho multiply/divide avutundi."
      ],
      example: "Class average 42. Prathi mark ki 3 grace marks add chesthe new average 45.",
      commonTrap: "Oka value maatrame change ayithe average full k tho change kaadu; k/count tho change."
    },
    {
      id: "AVG-L-007",
      title: "Adding or Removing One Observation",
      explanation: "New person/value add or remove ayinappudu old total and new total comparison use cheyyali.",
      rules: [
        "Added value = new average×(n+1) − old average×n.",
        "Removed value = old average×n − new average×(n−1)."
      ],
      examples: [
        "8 persons average 20; one joins, average 22. New value=22×9−20×8=38.",
        "10 persons average 30; one leaves, average 29. Left value=300−261=39."
      ],
      memoryTrick: "New total minus old total = joined value; old total minus new total = left value."
    },
    {
      id: "AVG-L-008",
      title: "Replacement and Wrong Entry",
      explanation: "Count same-ga undi oka value replace ayithe total difference = new value−old value. Average difference aa total difference-ni count tho divide chesina value.",
      rules: [
        "New average = old average + (new value−old value)/n.",
        "Correct average = wrong average + (correct entry−wrong entry)/n."
      ],
      example: "20 students average wrongly 36. 54 badulu 45 enter chesaru. Correct average=36+(45−54)/20=35.55.",
      teacherNote: "Wrong-entry correction lo correct minus wrong order maintain cheyyi."
    },
    {
      id: "AVG-L-009",
      title: "Combined Average",
      explanation: "Rendu groups averages direct-ga average cheyyakudadhu unless group sizes equal. Prathi group total calculate chesi combine cheyyali.",
      rule: "Combined average = (n1×a1+n2×a2)/(n1+n2).",
      examples: [
        "20 boys average 60, 30 girls average 70. Combined=(1200+2100)/50=66.",
        "Equal group sizes unte combined average=(a1+a2)/2."
      ],
      commonTrap: "60 and 70 direct average 65 kaadu when group sizes unequal."
    },
    {
      id: "AVG-L-010",
      title: "Weighted Average and Ratio of Groups",
      explanation: "Different values/averages ki importance or frequency different unte weight×value use cheyyali. Combined average groups madhya unte group-size ratio alligation/deviation tho find cheyyachu.",
      rules: [
        "Weighted average = Σ(wx)/Σw.",
        "If group averages a and b, combined c, then group ratio = (b−c):(c−a), where a<c<b."
      ],
      example: "Group averages 40 and 55; combined 46. Ratio=(55−46):(46−40)=9:6=3:2.",
      memoryTrick: "Opposite differences give weights."
    },
    {
      id: "AVG-L-011",
      title: "Average of Averages",
      explanation: "Subgroups sizes same ayithe subgroup averages average cheyyachu. Sizes different ayithe combined-average formula compulsory.",
      example: "Three equal teams averages 12,18,24; overall average=(12+18+24)/3=18.",
      exception: "Team sizes 5,10,15 ayithe simple 18 wrong avvachu; weighted average use cheyyali."
    },
    {
      id: "AVG-L-012",
      title: "Average Speed",
      explanation: "Average speed ordinary speeds average kaadu. Total distance-ni total time tho divide cheyyali. Conditions batti shortcuts marutayi.",
      rules: [
        "Average speed = Total distance / Total time.",
        "Equal distances at x and y speeds: average speed = 2xy/(x+y).",
        "Equal times at x and y speeds: average speed = (x+y)/2.",
        "Equal distances at speeds x1...xn: n/(1/x1+...+1/xn)."
      ],
      example: "Equal distance at 60 and 40 km/h: average=2×60×40/100=48 km/h.",
      commonTrap: "Equal distance case lo (60+40)/2=50 wrong."
    },
    {
      id: "AVG-L-013",
      title: "Ages, Marks, Runs and Money Applications",
      explanation: "Context emaina core method same: average×count=total. Ages lo years pass ayithe prathi person's age same amount increase kabatti group average kuda ade years increase avutundi.",
      rules: [
        "Same people unna group average age n years tarvata n years increase.",
        "Required score/run = target total−current total.",
        "Average expenditure/income = total expenditure/income divided by periods or persons."
      ],
      example: "Batsman 9 innings average 48. 10 innings average 50 kosam next score=500−432=68."
    },
    {
      id: "AVG-L-014",
      title: "Multi-step Average Questions",
      explanation: "Complex question-ni total changes sequence-ga break cheyyi. Old total start chesi additions, removals, corrections apply chesi final count tho divide cheyyi.",
      method: ["Old count and average nunchi total find cheyyi.", "Each change-ni signed total change-ga note cheyyi.", "Final total and final count calculate cheyyi.", "Asked value or average find cheyyi."],
      teacherNote: "Average equation kante total ledger method mistakes takkuva chestundi."
    }
  ],
  summary: [
    "Average=Sum/Count; Sum=Average×Count.",
    "Missing value=Required total−Known total.",
    "AP average=(first+last)/2.",
    "Every value same amount change ayithe average same amount change.",
    "One replacement average change=(new−old)/count.",
    "Combined average requires group totals.",
    "Weighted average=Σwx/Σw.",
    "Group ratio from averages uses opposite deviations.",
    "Average speed=Total distance/Total time.",
    "Equal distance speed=2xy/(x+y); equal time speed=(x+y)/2."
  ],
  conceptCheckPrompt: "Learn module complete chesaka Concept Check attempt cheyyi."
};

export default learn;
