const item = (id, question, options, answer, solution, concept) => ({ id, question, options, answer, solution, concept });

const level3 = {
  title: "Profit and Loss — Level 3",
  difficulty: "advanced",
  timeLimitMinutes: 34,
  passingPercentage: 70,
  questions: [
    item("PL-L3-001", "An article is sold at 8% loss. If SP were ₹252 more, profit would be 13%. Find CP.", ["₹1000", "₹1100", "₹1200", "₹1400"], "₹1200", "Rate difference=21%; CP=252×100/21=1200.", "SP difference"),
    item("PL-L3-002", "Two articles sold at same SP; first gains 25%, second loses 20%. Overall result?", ["2 18/41% profit", "2 18/41% loss", "2% loss", "No profit no loss"], "2 18/41% loss", "Take each SP=100. CPs=80 and 125; total CP=205, total SP=200; loss=5/205×100=100/41%=2 18/41%.", "same SP unequal rates"),
    item("PL-L3-003", "A trader marks goods 80% above CP and gives successive discounts of 20% and 15%. Profit%?", ["20.4%", "22.4%", "24%", "26.4%"], "22.4%", "1.8×0.8×0.85=1.224.", "multi-step discount"),
    item("PL-L3-004", "A shopkeeper wants 35% profit after allowing 10% discount. Required markup on CP?", ["40%", "45%", "50%", "55%"], "50%", "MP/CP=135/90=1.5.", "required markup"),
    item("PL-L3-005", "An article marked 33 1/3% above CP is sold after two equal successive discounts and gives 8% profit. Each discount?", ["8%", "10%", "12%", "15%"], "10%", "MP factor=4/3. (4/3)(1−d)²=1.08 ⇒ (1−d)²=0.81 ⇒ d=10%.", "equal successive discounts"),
    item("PL-L3-006", "A dealer claims 20% discount on CP rate but uses 750 g as 1 kg. Actual result?", ["5% profit", "6 2/3% profit", "10% profit", "20% profit"], "6 2/3% profit", "Revenue factor=0.8, cost factor=0.75; 0.8/0.75=16/15.", "discount plus false weight"),
    item("PL-L3-007", "A trader buys 20 articles for ₹1800 and sells 15 articles for ₹1800. Gain%?", ["25%", "30%", "33 1/3%", "40%"], "33 1/3%", "CP/article=90; SP/article=120; gain=30/90.", "article count"),
    item("PL-L3-008", "By selling 45 articles, a trader loses SP of 5 articles. Loss%?", ["10%", "11 1/9%", "12.5%", "15%"], "10%", "Let SP/item=s. Total SP=45s; loss=5s; CP=50s; loss%=5/50=10%.", "loss as SP count"),
    item("PL-L3-009", "By selling 40 articles, profit equals SP of 8 articles. Profit%?", ["20%", "25%", "30%", "32%"], "25%", "Total SP=40s; profit=8s; CP=32s; profit%=8/32=25%.", "profit as SP count"),
    item("PL-L3-010", "A shopkeeper marks 40% above CP. He gives 10% discount and uses 900 g as 1 kg. Actual gain%?", ["35%", "40%", "42%", "45%"], "40%", "Revenue factor=1.4×0.9=1.26; delivered cost factor=0.9; ratio=1.4.", "combined dealer gain"),
    item("PL-L3-011", "A merchant mixes 20 kg rice at ₹30/kg with 10 kg free material and sells mixture at ₹24/kg. Profit%?", ["10%", "15%", "20%", "25%"], "20%", "Total cost=600; SP=30×24=720; profit=120/600=20%.", "adulteration"),
    item("PL-L3-012", "Half goods sold at 20% gain, one-fourth at 10% loss and rest at 40% gain. Same CP per unit. Overall?", ["15%", "17.5%", "20%", "22.5%"], "17.5%", "0.5×20+0.25×(−10)+0.25×40=17.5%.", "weighted result"),
    item("PL-L3-013", "After discounts 20% and x%, total discount is 36%. Find x.", ["15%", "18%", "20%", "22%"], "20%", "20+x−0.2x=36 ⇒ 0.8x=16.", "unknown successive discount"),
    item("PL-L3-014", "A trader gains 25% even after giving 20% discount. MP is what percent above CP?", ["50%", "56.25%", "60%", "62.5%"], "56.25%", "MP/CP=125/80=1.5625.", "markup"),
    item("PL-L3-015", "A 20% discount reduces profit from 50% to what percent? MP was the original selling price.", ["10%", "15%", "20%", "25%"], "20%", "Original MP=150% CP; after discount SP=150×0.8=120% CP.", "discount on profitable price")
  ],
  unlockRequirement: { minimumScore: 70, nextModule: "topicTest" }
};

export default level3;
