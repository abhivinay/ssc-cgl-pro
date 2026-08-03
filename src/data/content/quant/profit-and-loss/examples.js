const e = (id, difficulty, question, solution, answer, concept, shortcut = "") => ({ id, difficulty, question, solution, answer, concept, shortcut });

const examples = {
  title: "Profit and Loss Solved Examples",
  description: "SSC CGL-oriented Profit, Loss and Discount examples from fundamentals to advanced dealer patterns.",
  estimatedMinutes: 100,
  examples: [
    e("PL-E-001", "basic", "An article costs ₹800 and sells for ₹920. Find profit and profit%.", "Profit=920−800=₹120; profit%=120/800×100.", "₹120; 15%", "basic profit"),
    e("PL-E-002", "basic", "An article costs ₹1500 and sells for ₹1320. Find loss%.", "Loss=1500−1320=₹180; loss%=180/1500×100.", "12%", "basic loss"),
    e("PL-E-003", "basic", "Find SP of an article costing ₹2400 at 25% profit.", "SP=2400×125/100.", "₹3000", "SP at profit"),
    e("PL-E-004", "basic", "An article sells for ₹1360 at 15% loss. Find CP.", "CP=1360×100/85=₹1600.", "₹1600", "CP from loss"),
    e("PL-E-005", "basic", "MP is ₹2500 and discount is 12%. Find SP.", "SP=2500×88/100.", "₹2200", "single discount"),
    e("PL-E-006", "basic", "A ₹1800 article is marked 20% above CP and sold without discount. Find profit.", "MP=SP=1800×1.2=₹2160; profit=2160−1800.", "₹360", "markup"),
    e("PL-E-007", "moderate", "An article is sold at 10% loss for ₹1080. At what price should it be sold for 20% profit?", "CP=1080/0.9=₹1200; target SP=1200×1.2.", "₹1440", "target SP"),
    e("PL-E-008", "moderate", "Selling price rises from a 20% loss position to a 20% profit position. Find percentage increase in SP.", "Take CP=100; old SP=80, new SP=120; increase=40/80×100.", "50%", "required price change"),
    e("PL-E-009", "moderate", "An article sold for ₹1260 gives 5% profit. Find CP.", "CP=1260×100/105.", "₹1200", "reverse profit"),
    e("PL-E-010", "moderate", "Two equal-cost articles are sold at 18% profit and 8% loss. Find overall result.", "Equal CP gives signed average=(18−8)/2.", "5% profit", "equal CP articles"),
    e("PL-E-011", "moderate", "Two articles are sold for ₹960 each, one at 20% gain and the other at 20% loss. Find overall result.", "Same SP and equal rate ⇒ loss%=20²/100.", "4% loss", "same SP square loss"),
    e("PL-E-012", "moderate", "A shopkeeper marks an item 40% above CP and gives 10% discount. Find profit%.", "Final factor=1.4×0.9=1.26.", "26% profit", "markup and discount"),
    e("PL-E-013", "moderate", "Find equivalent discount of 20% and 15% successive discounts.", "Equivalent=20+15−20×15/100=35−3.", "32%", "successive discounts"),
    e("PL-E-014", "moderate", "After 20% discount an article sells for ₹1600. Find MP.", "MP=1600×100/80.", "₹2000", "MP from discount"),
    e("PL-E-015", "moderate", "An article costs ₹800. Find MP needed for 25% profit after 20% discount.", "Required SP=800×1.25=1000; MP=1000/0.8.", "₹1250", "required marked price"),
    e("PL-E-016", "moderate", "A person loses 20% of capital. What gain% on the remaining capital restores the original amount?", "Take 100→80; gain needed 20 on 80=25%.", "25%", "loss recovery"),
    e("PL-E-017", "advanced", "An article is sold at 12% loss. If sold for ₹270 more, it gives 6% profit. Find CP.", "SP-factor difference=18%; CP=270×100/18.", "₹1500", "SP difference"),
    e("PL-E-018", "advanced", "A dealer sells goods at 10% loss on stated price but gives 20% less weight. Find actual gain%.", "Revenue factor=0.9; delivered cost factor=0.8; 0.9/0.8=1.125.", "12.5% gain", "price-weight combination"),
    e("PL-E-019", "advanced", "A dealer uses 900 g as 1 kg and charges the cost price per kg. Find gain%.", "Gain=(1000−900)/900×100.", "11 1/9%", "false weight"),
    e("PL-E-020", "advanced", "A shop offers buy 4 get 1 free. Find equivalent discount.", "Customer pays for 4 and gets 5; discount=1/5×100.", "20%", "free-item offer"),
    e("PL-E-021", "advanced", "A merchant marks goods 50% above CP. What discount gives 20% profit?", "MP factor=150; required SP factor=120; customer pays 120/150=80% of MP.", "20% discount", "target discount"),
    e("PL-E-022", "advanced", "SP of 12 articles equals CP of 15 articles. Find gain%.", "For x=12,y=15, gain=(15−12)/12×100.", "25%", "article-count relation"),
    e("PL-E-023", "advanced", "One-third of goods are sold at 10% loss and the rest at 20% profit. All units have same CP. Find overall result.", "Signed weighted rate=(1/3)(−10)+(2/3)(20)=10.", "10% profit", "quantity-weighted result"),
    e("PL-E-024", "advanced", "A shopkeeper marks an article 60% above CP and gives successive discounts of 20% and 10%. Find result.", "Final factor=1.6×0.8×0.9=1.152.", "15.2% profit", "multi-step multiplier")
  ],
  examStrategy: [
    "CP, SP, MP labels first rayi.",
    "Only percentages unte CP=100 or convenient LCM assume cheyyi.",
    "Percentage base correct-ga identify cheyyi.",
    "Successive markup/discount changes-ni multipliers-ga apply cheyyi.",
    "Same CP and same SP patterns-ni confuse cheyyaku.",
    "False weight lo revenue-ni actual delivered cost tho compare cheyyi."
  ],
  masteryRequirements: { totalExamples: 24, minimumAccuracy: 85, nextModule: "conceptCheck" }
};

export default examples;
