const item = (id, question, options, answer, solution, concept) => ({ id, question, options, answer, solution, concept });

const level2 = {
  title: "Profit and Loss — Level 2",
  difficulty: "moderate",
  timeLimitMinutes: 28,
  passingPercentage: 75,
  questions: [
    item("PL-L2-001", "An article sold at 16% profit fetches ₹1740. CP?", ["₹1400", "₹1450", "₹1500", "₹1550"], "₹1500", "CP=1740×100/116.", "CP from profit"),
    item("PL-L2-002", "At 20% loss an article sells for ₹960. SP for 25% profit?", ["₹1350", "₹1440", "₹1500", "₹1560"], "₹1500", "CP=960/0.8=1200; target SP=1200×1.25.", "target price"),
    item("PL-L2-003", "SP must move from 25% loss to 20% profit. Required increase?", ["45%", "50%", "55%", "60%"], "60%", "Factors 75→120; increase=45/75×100=60%.", "SP change"),
    item("PL-L2-004", "After a 25% gain, what percentage fall returns to original price?", ["16%", "20%", "25%", "33 1/3%"], "20%", "Fall=25/125×100=20%.", "reverse percentage"),
    item("PL-L2-005", "Two articles sold at ₹1150 each gain and lose 15% respectively. Overall result?", ["2.25% profit", "2.25% loss", "1.5% loss", "No result"], "2.25% loss", "Same SP equal rate ⇒ 15²/100=2.25% loss.", "same SP"),
    item("PL-L2-006", "Two articles have equal CP. One gains 30%, the other loses 12%. Overall?", ["8% profit", "9% profit", "10% profit", "18% profit"], "9% profit", "(30−12)/2=9%.", "equal CP"),
    item("PL-L2-007", "An article is marked 50% above CP and discounted 20%. Profit%?", ["15%", "20%", "25%", "30%"], "20%", "1.5×0.8=1.2.", "markup-discount"),
    item("PL-L2-008", "An article marked ₹3600 gets successive discounts 25% and 10%. Final SP?", ["₹2380", "₹2430", "₹2520", "₹2700"], "₹2430", "3600×0.75×0.9=2430.", "successive discounts"),
    item("PL-L2-009", "An article costs ₹1200. MP needed for 20% profit after 10% discount?", ["₹1500", "₹1550", "₹1600", "₹1650"], "₹1600", "Required SP=1440; MP=1440/0.9=1600.", "required MP"),
    item("PL-L2-010", "Goods marked 60% above CP. Discount for 20% profit?", ["20%", "25%", "30%", "35%"], "25%", "Required SP/MP=120/160=75%; discount=25%.", "required discount"),
    item("PL-L2-011", "A 20% and a 15% discount together equal what single discount?", ["30%", "32%", "33%", "35%"], "32%", "20+15−3=32%.", "equivalent discount"),
    item("PL-L2-012", "A dealer uses 850 g for 1 kg and charges CP per kg. Gain%?", ["15%", "17 11/17%", "17 9/17%", "20%"], "17 11/17%", "Gain=150/850×100=300/17%=17 11/17%.", "false weight"),
    item("PL-L2-013", "Dealer sells at 5% loss but gives 10% less weight. Actual result?", ["5% profit", "5 5/9% profit", "4 4/9% loss", "No profit no loss"], "5 5/9% profit", "0.95/0.90=19/18 ⇒ gain=1/18=5 5/9%.", "price-weight combination"),
    item("PL-L2-014", "SP of 15 articles equals CP of 18 articles. Gain%?", ["15%", "18%", "20%", "25%"], "20%", "(18−15)/15×100=20%.", "article count"),
    item("PL-L2-015", "One-fourth goods sold at 20% loss; remaining at 20% profit. Same CP per unit. Overall?", ["5% profit", "10% profit", "10% loss", "No profit no loss"], "10% profit", "Signed rate=(1/4)(−20)+(3/4)(20)=10%.", "quantity weighted")
  ],
  unlockRequirement: { minimumScore: 75, nextLevel: "level3" }
};

export default level2;
