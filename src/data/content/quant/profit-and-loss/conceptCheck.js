const q = (id, question, options, answer, explanation, concept) => ({ id, question, options, answer, explanation, concept });

const conceptCheck = {
  title: "Profit and Loss Concept Check",
  description: "Profit, Loss and Discount core concepts clear unnayo verify chese quick diagnostic.",
  timeLimitMinutes: 15,
  passingPercentage: 80,
  questions: [
    q("PL-CC-001", "CP ₹800 and SP ₹920. Profit%?", ["12%", "15%", "18%", "20%"], "15%", "Profit=120; 120/800×100=15%.", "profit percentage"),
    q("PL-CC-002", "CP ₹1500, loss 12%. SP?", ["₹1280", "₹1300", "₹1320", "₹1380"], "₹1320", "SP=1500×88/100.", "SP at loss"),
    q("PL-CC-003", "SP ₹1380 at 15% profit. CP?", ["₹1150", "₹1200", "₹1250", "₹1300"], "₹1200", "CP=1380×100/115.", "CP from profit"),
    q("PL-CC-004", "MP ₹2000, discount 15%. SP?", ["₹1600", "₹1650", "₹1700", "₹1750"], "₹1700", "Customer pays 85% of MP.", "discount"),
    q("PL-CC-005", "An item is marked 25% above CP and discounted 20%. Result?", ["5% profit", "No profit no loss", "5% loss", "10% profit"], "No profit no loss", "1.25×0.80=1.", "markup-discount"),
    q("PL-CC-006", "Equivalent discount of 30% and 10%?", ["33%", "35%", "37%", "40%"], "37%", "30+10−3=37%.", "successive discount"),
    q("PL-CC-007", "Equal-cost articles sold at 25% profit and 15% loss. Overall?", ["5% profit", "10% profit", "5% loss", "10% loss"], "5% profit", "Signed average=(25−15)/2=5%.", "equal CP"),
    q("PL-CC-008", "Two articles have same SP; one gains 10%, other loses 10%. Overall?", ["No profit no loss", "1% profit", "1% loss", "2% loss"], "1% loss", "Same SP equal rates ⇒ x²/100=1% loss.", "same SP"),
    q("PL-CC-009", "After 20% loss, required gain on remaining amount to recover original?", ["20%", "22.5%", "25%", "40%"], "25%", "20/80×100=25%.", "recovery"),
    q("PL-CC-010", "Dealer charges 1 kg CP but gives 800 g. Gain%?", ["20%", "25%", "30%", "33 1/3%"], "25%", "Gain=200/800×100=25%.", "false weight"),
    q("PL-CC-011", "Buy 3 get 1 free equivalent discount?", ["20%", "25%", "30%", "33 1/3%"], "25%", "One free out of four received.", "quantity offer"),
    q("PL-CC-012", "SP of 8 articles equals CP of 10 articles. Gain%?", ["20%", "25%", "30%", "40%"], "25%", "(10−8)/8×100=25%.", "article count")
  ],
  resultBands: [
    { min: 80, label: "Ready", action: "Level 1 start cheyyi." },
    { min: 60, label: "Revise", action: "Learn + formulas quick revision cheyyi." },
    { min: 0, label: "Relearn", action: "CP-SP-MP and percentage bases malli complete cheyyi." }
  ]
};

export default conceptCheck;
