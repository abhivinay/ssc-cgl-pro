const learn = {
  title: "Ratio and Proportion",
  description: "Ratio and Proportion complete concepts with Roman Telugu explanations, rules, examples and exam shortcuts.",
  estimatedMinutes: 90,
  sections: [
    {
      id: "ratio-basics",
      title: "1. Ratio Basics",
      explanation: "Rendu quantities madhya comparison-ni Ratio antaru. a ni b tho compare chesthe a:b leka a/b ani rastam.",
      rules: [
        "Ratio a:b lo a antecedent, b consequent.",
        "Ratio ki units undavu.",
        "Compare chese quantities same units lo undali.",
        "b zero kakudadhu.",
        "Ratio order important: a:b mariyu b:a generally equal kaavu."
      ],
      examples: [
        {
          question: "20 boys and 30 girls ratio find cheyyi.",
          solution: "Boys:Girls = 20:30 = 2:3.",
          answer: "2:3"
        },
        {
          question: "500 g and 2 kg ratio find cheyyi.",
          solution: "2 kg = 2000 g. Ratio = 500:2000 = 1:4.",
          answer: "1:4"
        }
      ],
      teacherExplanation: "Ratio ante simple-ga oka quantity inkoka quantity kante enni parts undo cheppe comparison. Units same cheyyakunda ratio calculate cheyyakudadhu.",
      memoryTrick: "Same units first, simplify next."
    },
    {
      id: "simplification",
      title: "2. Simplification of Ratios",
      explanation: "Ratio terms-ni vaati HCF tho divide chesthe simplest ratio vastundi.",
      rules: [
        "All terms-ni common HCF tho divide cheyyali.",
        "Decimal terms unte first decimals remove cheyyali.",
        "Fraction terms unte denominators LCM tho multiply cheyyali."
      ],
      examples: [
        {
          question: "48:72 simplify cheyyi.",
          solution: "HCF of 48 and 72 = 24. Ratio = 48/24:72/24 = 2:3.",
          answer: "2:3"
        },
        {
          question: "0.6:1.5 simplify cheyyi.",
          solution: "10 tho multiply chesthe 6:15 = 2:5.",
          answer: "2:5"
        },
        {
          question: "1/2:3/4 simplify cheyyi.",
          solution: "Denominators LCM 4 tho multiply chesthe 2:3.",
          answer: "2:3"
        }
      ],
      teacherExplanation: "Ratio simplification fraction simplification laage. Common factor-ni cancel cheyyali.",
      memoryTrick: "Decimals remove, fractions clear, HCF divide."
    },
    {
      id: "equivalent-ratios",
      title: "3. Equivalent Ratios",
      explanation: "Ratio rendu terms-ni same non-zero number tho multiply leka divide chesthe equivalent ratio vastundi.",
      rules: [
        "a:b = ka:kb, where k is non-zero.",
        "Equivalent ratios numerical-ga same comparison-ni represent chestayi.",
        "Cross multiplication tho equality verify cheyyachu."
      ],
      examples: [
        {
          question: "3:5 ki equivalent ratio with first term 21 find cheyyi.",
          solution: "3×7=21 kabatti second term = 5×7=35.",
          answer: "21:35"
        },
        {
          question: "4:7 and 20:35 equivalent aa?",
          solution: "4×35=140 and 7×20=140. Cross products equal.",
          answer: "Yes"
        }
      ],
      teacherExplanation: "Ratio value maarakunda rendu sides-ni same number tho scale cheyyadam equivalent ratio.",
      memoryTrick: "Same multiplier on both terms."
    },
    {
      id: "comparison",
      title: "4. Comparison of Ratios",
      explanation: "Ratios-ni fractions laga compare cheyyachu. Cross multiplication fastest method.",
      rules: [
        "a:b and c:d compare cheyyadaniki ad and bc compare cheyyali.",
        "ad>bc ayithe a:b greater.",
        "ad<bc ayithe c:d greater.",
        "Multiple ratios unte common consequent or fraction method use cheyyachu."
      ],
      examples: [
        {
          question: "5:8 and 7:12 lo greater ratio edi?",
          solution: "5×12=60; 7×8=56. 60>56.",
          answer: "5:8"
        },
        {
          question: "3:4 and 8:11 compare cheyyi.",
          solution: "3×11=33; 8×4=32. 33>32.",
          answer: "3:4 is greater"
        }
      ],
      teacherExplanation: "Division cheyyalsina avasaram ledu. Cross products compare chesthe answer fast-ga vastundi.",
      memoryTrick: "Cross multiply, larger product wins."
    },
    {
      id: "proportion",
      title: "5. Proportion",
      explanation: "Rendu ratios equal ayithe avi proportion lo unnayi. a:b = c:d ni a:b::c:d ani kuda rastaru.",
      rules: [
        "a:b::c:d ayithe ad=bc.",
        "a and d extremes.",
        "b and c means.",
        "Missing term-ni cross multiplication tho find cheyyali."
      ],
      examples: [
        {
          question: "4:6::10:x lo x find cheyyi.",
          solution: "4x=6×10=60. x=15.",
          answer: "15"
        },
        {
          question: "8, 12, 18, 27 proportion lo unnaya?",
          solution: "8×27=216 and 12×18=216.",
          answer: "Yes"
        }
      ],
      teacherExplanation: "Proportion ante two ratios equal. Cross product equality main rule.",
      memoryTrick: "Extremes product = means product."
    },
    {
      id: "continued-proportion",
      title: "6. Continued Proportion",
      explanation: "a:b = b:c ayithe a, b, c continued proportion lo unnayi.",
      rules: [
        "a:b::b:c ayithe b²=ac.",
        "b is mean proportional between a and c.",
        "c is third proportional to a and b."
      ],
      examples: [
        {
          question: "4 and 25 madhya mean proportional find cheyyi.",
          solution: "Mean proportional = √(4×25) = √100 = 10.",
          answer: "10"
        },
        {
          question: "6 and 12 ki third proportional find cheyyi.",
          solution: "6:12=12:x. 6x=144. x=24.",
          answer: "24"
        }
      ],
      teacherExplanation: "Middle term repeat ayithe continued proportion. Middle term square = outer terms product.",
      memoryTrick: "Middle square equals outer pair."
    },
    {
      id: "fourth-proportional",
      title: "7. Fourth Proportional",
      explanation: "a:b = c:d lo d-ni a, b, c ki fourth proportional antaru.",
      rules: [
        "Fourth proportional d=bc/a.",
        "Order of given terms change cheyyakudadhu.",
        "Cross multiplication use cheyyali."
      ],
      examples: [
        {
          question: "4, 6 and 10 ki fourth proportional find cheyyi.",
          solution: "4:6=10:x. x=(6×10)/4=15.",
          answer: "15"
        },
        {
          question: "8, 12 and 18 ki fourth proportional find cheyyi.",
          solution: "x=(12×18)/8=27.",
          answer: "27"
        }
      ],
      teacherExplanation: "First:second = third:fourth ani direct-ga arrange chesi cross multiply cheyyi.",
      memoryTrick: "Fourth = second × third ÷ first."
    },
    {
      id: "compound-ratio",
      title: "8. Compound Ratio",
      explanation: "Two or more ratios corresponding terms-ni multiply chesthe compound ratio vastundi.",
      rules: [
        "a:b and c:d compound ratio = ac:bd.",
        "Duplicate ratio of a:b = a²:b².",
        "Triplicate ratio of a:b = a³:b³.",
        "Sub-duplicate ratio = √a:√b.",
        "Sub-triplicate ratio = ∛a:∛b."
      ],
      examples: [
        {
          question: "2:3 and 4:5 compound ratio find cheyyi.",
          solution: "(2×4):(3×5)=8:15.",
          answer: "8:15"
        },
        {
          question: "3:4 duplicate ratio find cheyyi.",
          solution: "3²:4²=9:16.",
          answer: "9:16"
        }
      ],
      teacherExplanation: "Compound ratio lo left terms anni multiply, right terms anni multiply.",
      memoryTrick: "Left with left, right with right."
    },
    {
      id: "division-in-ratio",
      title: "9. Division in a Given Ratio",
      explanation: "Total quantity-ni a:b ratio lo divide cheyyadaniki total parts a+b. Shares = Total×a/(a+b) and Total×b/(a+b).",
      rules: [
        "First ratio parts sum cheyyali.",
        "Each share = Total×required part/total parts.",
        "Shares sum original total ki equal undali."
      ],
      examples: [
        {
          question: "₹840 ni 3:4 ratio lo divide cheyyi.",
          solution: "Total parts=7. Shares=840×3/7=360 and 840×4/7=480.",
          answer: "₹360 and ₹480"
        },
        {
          question: "720 ni 2:3:4 ratio lo divide cheyyi.",
          solution: "Total parts=9. One part=720/9=80. Shares=160, 240, 320.",
          answer: "160, 240 and 320"
        }
      ],
      teacherExplanation: "Total amount-ni total ratio parts tho divide chesthe one part value vastundi.",
      memoryTrick: "Add parts, find one part, multiply."
    },
    {
      id: "combining-ratios",
      title: "10. Combining Two Ratios",
      explanation: "A:B and B:C ichinappudu common term B values equal chesi A:B:C form cheyyali.",
      rules: [
        "Common term coefficients LCM find cheyyali.",
        "First ratio-ni second B coefficient tho multiply cheyyachu.",
        "Second ratio-ni first B coefficient tho multiply cheyyachu.",
        "Final ratio simplify cheyyali."
      ],
      examples: [
        {
          question: "A:B=2:3 and B:C=4:5. A:B:C find cheyyi.",
          solution: "B coefficients 3 and 4. First ratio×4=8:12; second ratio×3=12:15.",
          answer: "8:12:15"
        },
        {
          question: "P:Q=5:7 and Q:R=3:4. P:Q:R find cheyyi.",
          solution: "First ratio×3=15:21; second ratio×7=21:28.",
          answer: "15:21:28"
        }
      ],
      teacherExplanation: "Common person/share same value-ni represent cheyyali. Kabatti middle terms equal chesi ratios join cheyyali.",
      memoryTrick: "Make the common term common."
    },
    {
      id: "direct-proportion",
      title: "11. Direct Proportion",
      explanation: "Oka quantity increase ayithe inkoka quantity same direction lo increase ayithe direct proportion.",
      rules: [
        "x∝y ayithe x/y constant.",
        "x₁/y₁=x₂/y₂.",
        "More–more or less–less relationship direct proportion.",
        "Rate constant undali."
      ],
      examples: [
        {
          question: "5 pens cost ₹60. 8 pens cost entha?",
          solution: "Cost directly proportional to pens. Cost=60×8/5=₹96.",
          answer: "₹96"
        },
        {
          question: "12 m cloth costs ₹900. 20 m cost entha?",
          solution: "900×20/12=₹1500.",
          answer: "₹1500"
        }
      ],
      teacherExplanation: "Quantity double ayithe cost kuda double ayye situations direct proportion.",
      memoryTrick: "Same direction = direct."
    },
    {
      id: "inverse-proportion",
      title: "12. Inverse Proportion",
      explanation: "Oka quantity increase ayithe inkoka quantity decrease ayithe inverse proportion.",
      rules: [
        "x∝1/y ayithe xy constant.",
        "x₁y₁=x₂y₂.",
        "More–less relationship inverse proportion.",
        "Total work or distance constant undali."
      ],
      examples: [
        {
          question: "12 workers work-ni 15 days lo complete chestaru. 20 workers enni days?",
          solution: "Workers×Days constant. 12×15=20×d. d=9.",
          answer: "9 days"
        },
        {
          question: "60 km/h speed tho journey 5 hours. 75 km/h tho time entha?",
          solution: "Speed×Time constant. 60×5=75×t. t=4.",
          answer: "4 hours"
        }
      ],
      teacherExplanation: "Workers ekkuva ayithe days takkuva; speed ekkuva ayithe time takkuva. Idi inverse proportion.",
      memoryTrick: "Opposite direction = inverse."
    },
    {
      id: "ratio-change",
      title: "13. Ratio After Addition or Subtraction",
      explanation: "Original quantities ax and bx ani assume chesi, addition/subtraction tarvata new ratio equation form cheyyali.",
      rules: [
        "A:B=a:b ayithe A=ax, B=bx.",
        "Same quantity add chesthe (ax+k)/(bx+k)=new ratio.",
        "Same quantity subtract chesthe (ax−k)/(bx−k)=new ratio.",
        "Equation solve chesi x find cheyyali."
      ],
      examples: [
        {
          question: "Two numbers ratio 3:5. Each ki 10 add chesthe ratio 5:7. Numbers find cheyyi.",
          solution: "(3x+10)/(5x+10)=5/7. 21x+70=25x+50. x=5.",
          answer: "15 and 25"
        },
        {
          question: "A:B=7:9. Each nunchi 8 subtract chesthe ratio 5:7. Values find cheyyi.",
          solution: "(7x−8)/(9x−8)=5/7. 49x−56=45x−40. x=4.",
          answer: "28 and 36"
        }
      ],
      teacherExplanation: "Ratio actual values kaadu; parts maatrame. Common multiplier x use chesi equation form cheyyali.",
      memoryTrick: "Ratio terms become ax and bx."
    },
    {
      id: "difference-given",
      title: "14. Ratio When Difference Is Given",
      explanation: "Quantities ratio a:b and difference D ayithe ratio difference |a−b| parts D ki equal.",
      rules: [
        "One part = Given difference/Ratio difference.",
        "Quantities = Ratio terms×one part.",
        "Sum given ayithe one part=Sum/(a+b)."
      ],
      examples: [
        {
          question: "Two numbers ratio 5:8 and difference 36. Numbers find cheyyi.",
          solution: "Ratio difference=3 parts. One part=36/3=12. Numbers=60 and 96.",
          answer: "60 and 96"
        },
        {
          question: "Two numbers ratio 7:11 and sum 216. Numbers find cheyyi.",
          solution: "Total parts=18. One part=216/18=12. Numbers=84 and 132.",
          answer: "84 and 132"
        }
      ],
      teacherExplanation: "Difference question lo ratio terms difference important; sum question lo ratio terms sum important.",
      memoryTrick: "Given difference ÷ ratio difference."
    },
    {
      id: "ages",
      title: "15. Age-Based Ratios",
      explanation: "Age questions lo present ages ax, bx ani assume chesi past/future changes rendu ages ki equal-ga apply cheyyali.",
      rules: [
        "Present age ratio a:b ayithe ages ax and bx.",
        "n years later ages ax+n and bx+n.",
        "n years ago ages ax−n and bx−n.",
        "Age difference always constant."
      ],
      examples: [
        {
          question: "A:B present ages=3:5. 10 years later ratio=5:7. Present ages find cheyyi.",
          solution: "(3x+10)/(5x+10)=5/7. x=5.",
          answer: "15 years and 25 years"
        },
        {
          question: "Father:son ages=7:2 and difference=35 years. Ages find cheyyi.",
          solution: "Ratio difference=5 parts=35. One part=7.",
          answer: "49 years and 14 years"
        }
      ],
      teacherExplanation: "Time add/subtract chesthe andariki same number years apply avutayi. Ratio maatram change avutundi.",
      memoryTrick: "Age difference never changes."
    },
    {
      id: "income-expenditure",
      title: "16. Income, Expenditure and Savings Ratios",
      explanation: "Income−Expenditure=Savings identity use chesi ratio parts or equations form cheyyali.",
      rules: [
        "Savings=Income−Expenditure.",
        "Income ratio and expenditure ratio ki separate multipliers avasaram undachu.",
        "Same savings condition unte differences equal cheyyali.",
        "Percentage data-ni ratio form-loki convert cheyyachu."
      ],
      examples: [
        {
          question: "Income:Expenditure=5:4. Income ₹25,000 ayithe savings entha?",
          solution: "One part=25000/5=5000. Expenditure=20000. Savings=5000.",
          answer: "₹5,000"
        },
        {
          question: "A and B incomes ratio 3:4, expenditures ratio 2:3. Each saves ₹6000. Incomes find cheyyi.",
          solution: "Incomes=3x,4x; expenditures=2y,3y. 3x−2y=6000 and 4x−3y=6000. Solving gives x=6000, y=6000.",
          answer: "₹18,000 and ₹24,000"
        }
      ],
      teacherExplanation: "Income motham; expenditure bayataki vellindi; migilindi savings. Ee relation miss avvakudadhu.",
      memoryTrick: "I − E = S."
    },
    {
      id: "partnership-link",
      title: "17. Ratio of Investments",
      explanation: "Same duration invest chesthe profit ratio investment ratio ki equal. Durations different ayithe capital×time compare cheyyali.",
      rules: [
        "Same time: Profit ratio=Capital ratio.",
        "Different time: Profit ratio=C₁T₁:C₂T₂.",
        "Time units same-ga convert cheyyali."
      ],
      examples: [
        {
          question: "A and B ₹20,000 and ₹30,000 same time invest chesaru. Profit ratio?",
          solution: "20000:30000=2:3.",
          answer: "2:3"
        },
        {
          question: "A ₹10,000 for 12 months, B ₹15,000 for 8 months. Profit ratio?",
          solution: "10000×12:15000×8=120000:120000.",
          answer: "1:1"
        }
      ],
      teacherExplanation: "Business lo money entha and entha time undi ane rendu profit share-ni decide chestayi.",
      memoryTrick: "Profit follows money × time."
    },
    {
      id: "special-transformations",
      title: "18. Special Ratio Transformations",
      explanation: "Given ratios meeda componendo, dividendo and componendo-dividendo rules use chesi equations fast-ga solve cheyyachu.",
      rules: [
        "If a/b=c/d, then (a+b)/b=(c+d)/d.",
        "If a/b=c/d, then (a−b)/b=(c−d)/d.",
        "If a/b=c/d, then (a+b)/(a−b)=(c+d)/(c−d).",
        "Denominators zero kakudadhu."
      ],
      examples: [
        {
          question: "x/y=3/2. (x+y)/(x−y) find cheyyi.",
          solution: "Componendo-dividendo: (3+2)/(3−2)=5.",
          answer: "5"
        },
        {
          question: "(x+y)/(x−y)=7/3. x:y find cheyyi.",
          solution: "3x+3y=7x−7y. 10y=4x. x:y=5:2.",
          answer: "5:2"
        }
      ],
      teacherExplanation: "Ratio equation lo sum and difference expressions unte componendo-dividendo calculation-ni short chestundi.",
      memoryTrick: "Add above, subtract below."
    }
  ],
  summary: [
    "Ratio rendu same-unit quantities madhya comparison.",
    "Proportion ante two ratios equality.",
    "a:b::c:d ayithe ad=bc.",
    "Mean proportional between a and c = √ac.",
    "Third proportional to a and b = b²/a.",
    "Fourth proportional to a, b, c = bc/a.",
    "Division in ratio: Total×required part/total parts.",
    "Direct proportion lo ratios constant.",
    "Inverse proportion lo products constant.",
    "Ratio change questions lo quantities ax, bx ani assume cheyyali.",
    "Difference given ayithe one part=difference/ratio difference.",
    "Age difference constant.",
    "Income−Expenditure=Savings.",
    "Investment profit ratio=Capital×Time ratio."
  ],
  conceptCheckPrompt: "Learn module complete chesaka Concept Check attempt cheyyi."
};

export default learn;