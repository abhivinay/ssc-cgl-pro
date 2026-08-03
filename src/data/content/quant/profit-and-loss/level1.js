const item = (id, question, options, answer, solution, concept) => ({ id, question, options, answer, solution, concept });

const level1 = {
  title: "Profit and Loss — Level 1",
  difficulty: "basic",
  timeLimitMinutes: 22,
  passingPercentage: 80,
  questions: [
    item("PL-L1-001", "An article bought for ₹600 is sold for ₹690. Profit%?", ["10%", "12%", "15%", "18%"], "15%", "Profit=90; 90/600×100=15%.", "basic profit"),
    item("PL-L1-002", "An article bought for ₹1250 is sold for ₹1100. Loss%?", ["10%", "12%", "15%", "18%"], "12%", "Loss=150; 150/1250×100=12%.", "basic loss"),
    item("PL-L1-003", "CP ₹1600 and profit 18%. SP?", ["₹1840", "₹1888", "₹1900", "₹1920"], "₹1888", "SP=1600×118/100.", "SP at profit"),
    item("PL-L1-004", "CP ₹2400 and loss 15%. SP?", ["₹1960", "₹2040", "₹2100", "₹2160"], "₹2040", "SP=2400×85/100.", "SP at loss"),
    item("PL-L1-005", "SP ₹1500 at 25% profit. CP?", ["₹1125", "₹1200", "₹1250", "₹1300"], "₹1200", "CP=1500×100/125.", "CP from profit"),
    item("PL-L1-006", "SP ₹1530 at 10% loss. CP?", ["₹1650", "₹1700", "₹1750", "₹1800"], "₹1700", "CP=1530×100/90.", "CP from loss"),
    item("PL-L1-007", "MP ₹3200, discount 25%. SP?", ["₹2200", "₹2300", "₹2400", "₹2500"], "₹2400", "SP=3200×75/100.", "single discount"),
    item("PL-L1-008", "SP ₹2550 after 15% discount. MP?", ["₹2850", "₹3000", "₹3150", "₹3200"], "₹3000", "MP=2550×100/85.", "marked price"),
    item("PL-L1-009", "An item is marked 30% above CP and sold at MP. Profit%?", ["20%", "25%", "30%", "35%"], "30%", "No discount; SP=MP=130% CP.", "markup"),
    item("PL-L1-010", "Equivalent discount of 10% and 20%?", ["26%", "28%", "30%", "32%"], "28%", "10+20−2=28%.", "successive discounts"),
    item("PL-L1-011", "Equal-cost articles gain 12% and 8%. Overall profit%?", ["8%", "9%", "10%", "12%"], "10%", "Signed average=(12+8)/2.", "equal CP"),
    item("PL-L1-012", "Equal-cost articles gain 16% and lose 6%. Overall?", ["5% profit", "10% profit", "5% loss", "11% profit"], "5% profit", "(16−6)/2=5% profit.", "equal CP mixed"),
    item("PL-L1-013", "A 25% loss leaves ₹900. Original amount?", ["₹1125", "₹1200", "₹1250", "₹1350"], "₹1200", "900 is 75%; original=900/0.75.", "loss recovery base"),
    item("PL-L1-014", "Buy 5 get 1 free equivalent discount?", ["14 2/7%", "16 2/3%", "20%", "25%"], "16 2/3%", "One free out of six received=1/6×100.", "free-item offer"),
    item("PL-L1-015", "SP of 4 articles equals CP of 5 articles. Profit%?", ["20%", "25%", "30%", "40%"], "25%", "(5−4)/4×100=25%.", "article count")
  ],
  unlockRequirement: { minimumScore: 80, nextLevel: "level2" }
};

export default level1;
