const examples = {
  "id": "sci-examples",
  "title": "24 Fully Solved SSC-Pattern Examples",
  "visualPlacements": [
    {
      "afterExample": "E08",
      "src": "/images/quant/simple-compound-interest/compounding-map.webp",
      "alt": "Annual, half-yearly and quarterly compounding map"
    },
    {
      "afterExample": "E13",
      "src": "/images/quant/simple-compound-interest/si-ci-difference-derivation.webp",
      "alt": "SI and CI difference derivation"
    },
    {
      "afterExample": "E24",
      "src": "/images/quant/simple-compound-interest/installment-timeline.webp",
      "alt": "Present value installment timeline"
    }
  ],
  "items": [
    {
      "id": "E01",
      "question": "Find SI on ₹6,000 at 8% p.a. for 3 years.",
      "answer": "₹1,440",
      "standardMethod": [
        "SI=PRT/100",
        "=6000×8×3/100",
        "=₹1,440"
      ],
      "teacherShortcut": "Yearly interest ₹480; 3 years = ₹1,440.",
      "difficulty": "Foundation"
    },
    {
      "id": "E02",
      "question": "A sum earns ₹1,800 SI at 10% in 3 years. Find principal.",
      "answer": "₹6,000",
      "standardMethod": [
        "P=100SI/(RT)",
        "=100×1800/(10×3)",
        "=₹6,000"
      ],
      "teacherShortcut": "10% for 3 years = 30%; ₹1,800 is 30% of P.",
      "difficulty": "Foundation"
    },
    {
      "id": "E03",
      "question": "₹8,000 amounts to ₹9,920 under SI in 2 years. Find rate.",
      "answer": "12%",
      "standardMethod": [
        "SI=9920−8000=1920",
        "R=100×1920/(8000×2)",
        "=12%"
      ],
      "teacherShortcut": "Amount minus principal first.",
      "difficulty": "Foundation"
    },
    {
      "id": "E04",
      "question": "At 12% SI, in how many months will ₹5,000 earn ₹900?",
      "answer": "18 months",
      "standardMethod": [
        "T=100×900/(5000×12)=1.5 years",
        "1.5×12=18 months"
      ],
      "teacherShortcut": "Convert final time to asked unit.",
      "difficulty": "Foundation"
    },
    {
      "id": "E05",
      "question": "A sum doubles under SI in 8 years. Find rate.",
      "answer": "12.5%",
      "standardMethod": [
        "For doubling, SI=P",
        "R=100/T=100/8",
        "=12.5%"
      ],
      "teacherShortcut": "Direct doubling shortcut.",
      "difficulty": "Foundation"
    },
    {
      "id": "E06",
      "question": "A sum becomes 4 times under SI in 15 years. When will it double?",
      "answer": "5 years",
      "standardMethod": [
        "To become 4P, interest=3P in 15 years",
        "To earn P needs 15/3",
        "=5 years"
      ],
      "teacherShortcut": "SI growth linear.",
      "difficulty": "Foundation"
    },
    {
      "id": "E07",
      "question": "Find CI on ₹10,000 at 10% for 2 years.",
      "answer": "₹2,100",
      "standardMethod": [
        "A=10000×1.1²=12100",
        "CI=12100−10000",
        "=₹2,100"
      ],
      "teacherShortcut": "Second year earns interest on ₹11,000.",
      "difficulty": "Foundation"
    },
    {
      "id": "E08",
      "question": "Find amount on ₹8,000 at 25% CI for 2 years.",
      "answer": "₹12,500",
      "standardMethod": [
        "25%=1/4; multiplier=5/4",
        "A=8000×(5/4)²",
        "=₹12,500"
      ],
      "teacherShortcut": "Fraction method avoids decimals.",
      "difficulty": "Foundation"
    },
    {
      "id": "E09",
      "question": "₹20,000 at 12% p.a. compounded half-yearly for 1 year. Find CI.",
      "answer": "₹2,472",
      "standardMethod": [
        "Rate/half-year=6%; periods=2",
        "A=20000×1.06²=22472",
        "CI=₹2,472"
      ],
      "teacherShortcut": "Always convert both rate and periods.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E10",
      "question": "₹16,000 at 20% p.a. compounded quarterly for 6 months. Find amount.",
      "answer": "₹17,640",
      "standardMethod": [
        "Quarterly rate=5%; periods=2",
        "A=16000×1.05²",
        "=₹17,640"
      ],
      "teacherShortcut": "6 months equals two quarters.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E11",
      "question": "Find difference between CI and SI on ₹12,500 at 8% for 2 years.",
      "answer": "₹80",
      "standardMethod": [
        "D=P(R/100)²",
        "=12500×(8/100)²",
        "=₹80"
      ],
      "teacherShortcut": "Direct 2-year difference shortcut.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E12",
      "question": "CI−SI for 2 years at 10% is ₹90. Find principal.",
      "answer": "₹9,000",
      "standardMethod": [
        "D=P(10/100)²=P/100",
        "P=90×100",
        "=₹9,000"
      ],
      "teacherShortcut": "At 10%, 2-year difference is 1% of P.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E13",
      "question": "On ₹10,000, find CI−SI at 10% for 3 years.",
      "answer": "₹310",
      "standardMethod": [
        "D=P(0.1)²(3.1)",
        "=10000×0.01×3.1",
        "=₹310"
      ],
      "teacherShortcut": "Includes interest-on-interest from years 2 and 3.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E14",
      "question": "Rates are 10%, 20%, 10% in three successive years on ₹5,000. Find amount.",
      "answer": "₹7,260",
      "standardMethod": [
        "A=5000×1.1×1.2×1.1",
        "=₹7,260"
      ],
      "teacherShortcut": "Do not average the rates.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E15",
      "question": "A machine worth ₹50,000 depreciates 10% annually for 2 years. Find value.",
      "answer": "₹40,500",
      "standardMethod": [
        "Value=50000×0.9²",
        "=₹40,500"
      ],
      "teacherShortcut": "Use remaining 90% each year.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E16",
      "question": "Population is 48,400 after growing 10% annually for 2 years. Find original.",
      "answer": "40,000",
      "standardMethod": [
        "Original=48400/1.1²",
        "=48400/1.21",
        "=40,000"
      ],
      "teacherShortcut": "Reverse growth means divide.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E17",
      "question": "First-year CI interest is ₹1,200 and second-year interest is ₹1,344. Find rate.",
      "answer": "12%",
      "standardMethod": [
        "Increase=144",
        "Rate=144/1200×100",
        "=12%"
      ],
      "teacherShortcut": "Consecutive interest grows at same rate.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E18",
      "question": "First-year CI interest at 15% is ₹1,800. Find principal.",
      "answer": "₹12,000",
      "standardMethod": [
        "P=100×1800/15",
        "=₹12,000"
      ],
      "teacherShortcut": "First-year CI interest equals one-year SI.",
      "difficulty": "SSC Standard"
    },
    {
      "id": "E19",
      "question": "A sum at SI earns ₹600 in 2 years and ₹1,500 in 5 years. Verify yearly interest and principal at 10%.",
      "answer": "₹3,000",
      "standardMethod": [
        "Yearly interest=600/2=300",
        "P=300×100/10",
        "=₹3,000"
      ],
      "teacherShortcut": "SI interest is proportional to time.",
      "difficulty": "Advanced"
    },
    {
      "id": "E20",
      "question": "A sum amounts to ₹13,310 at 10% CI in 3 years. Find principal.",
      "answer": "₹10,000",
      "standardMethod": [
        "P=13310/1.1³",
        "=13310/1.331",
        "=₹10,000"
      ],
      "teacherShortcut": "Recognize 1.1³=1.331.",
      "difficulty": "Advanced"
    },
    {
      "id": "E21",
      "question": "At what annual CI rate will ₹8,000 become ₹12,500 in 2 years?",
      "answer": "25%",
      "standardMethod": [
        "A/P=12500/8000=25/16",
        "√(25/16)=5/4",
        "Rate=25%"
      ],
      "teacherShortcut": "Take square root of two-year multiplier.",
      "difficulty": "Advanced"
    },
    {
      "id": "E22",
      "question": "A town rises 20% then falls 20%. Find net change.",
      "answer": "4% decrease",
      "standardMethod": [
        "Equal rise/fall net loss=x²/100",
        "=400/100",
        "=4% loss"
      ],
      "teacherShortcut": "Same percentages do not cancel because bases differ.",
      "difficulty": "Advanced"
    },
    {
      "id": "E23",
      "question": "Nominal 20% compounded half-yearly: find effective annual rate.",
      "answer": "21%",
      "standardMethod": [
        "EAR=(1.10)²−1",
        "=0.21",
        "=21%"
      ],
      "teacherShortcut": "Two 10% increases produce 21%.",
      "difficulty": "Advanced"
    },
    {
      "id": "E24",
      "question": "₹11,000 is due after 1 year. Find present value at 10% CI.",
      "answer": "₹10,000",
      "standardMethod": [
        "PV=11000/1.10",
        "=₹10,000"
      ],
      "teacherShortcut": "Discount future payment to today.",
      "difficulty": "Advanced"
    }
  ],
  "completion": {
    "minimumSolved": 20,
    "minimumAccuracy": 85,
    "nextModule": "conceptCheck"
  }
};

export default examples;
