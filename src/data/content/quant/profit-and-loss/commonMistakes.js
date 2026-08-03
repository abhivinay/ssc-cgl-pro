const m = (id, category, title, mistake, whyWrong, correctMethod, prevention) => ({ id, category, title, mistake, whyWrong, correctMethod, prevention });

const commonMistakes = {
  title: "Profit and Loss Common Mistakes",
  description: "SSC CGL Profit, Loss and Discount lo frequently jarige errors, correct methods and prevention rules.",
  estimatedMinutes: 30,
  categories: [
    "terminology", "percentage-base", "reverse-percentage", "multiple-articles", "same-selling-price",
    "marked-price", "successive-change", "recovery", "false-weight", "quantity-offers", "exam-strategy"
  ],
  mistakes: [
    m("PL-CM-001", "terminology", "CP and SP reverse cheyyadam", "Konna price-ni SP, ammina price-ni CP ani rayadam.", "Profit/loss direction reverse avutundi.", "Buy price=CP; sale price=SP.", "Question start lo CP/SP labels rayi."),
    m("PL-CM-002", "terminology", "MP-ni CP anukovadam", "Label price-ni investment price laga use cheyyadam.", "MP markup tarvata price; CP actual cost.", "MP, CP, SP separate columns use cheyyi.", "Buy-Bill-Tag memory trick."),
    m("PL-CM-003", "terminology", "Profit amount and profit percent mix", "₹120 profit-ni 120% ani answer cheyyadam.", "Amount and rate different quantities.", "Profit amount first; then /CP×100.", "Answer unit check cheyyi."),
    m("PL-CM-004", "percentage-base", "Profit% SP meeda calculate", "Profit/SP×100 use cheyyadam.", "Standard investment base CP.", "Profit%=Profit/CP×100.", "P/L lives on CP."),
    m("PL-CM-005", "percentage-base", "Discount% CP meeda calculate", "Discount/CP×100 use cheyyadam.", "Discount label price reduction.", "Discount%=Discount/MP×100.", "Discount lives on MP."),
    m("PL-CM-006", "percentage-base", "Profit and discount percentages direct compare", "20% markup and 20% discount cancel ani assume cheyyadam.", "Bases sequential and different.", "1.2×0.8=0.96 ⇒ 4% loss.", "Multiplier method use cheyyi."),
    m("PL-CM-007", "reverse-percentage", "SP nunchi profit% subtract", "20% profit tho SP ₹1200 ayithe CP=₹960 ani cheppadam.", "20% CP meeda; SP meeda kaadu.", "CP=1200×100/120=₹1000.", "Reverse formula/ratio use cheyyi."),
    m("PL-CM-008", "reverse-percentage", "Equal rise and fall cancel ani assume", "20% loss tarvata 20% gain original amount vastundi ani anukovadam.", "Second change reduced base meeda.", "100→80→96; net 4% loss.", "Sequential factors multiply."),
    m("PL-CM-009", "reverse-percentage", "Loss-to-profit percentage-point gap answer", "20% loss nunchi 20% profit ki 40% SP rise ani cheppadam.", "Rise current SP 80 meeda.", "(120−80)/80×100=50%.", "Old SP factor denominator."),
    m("PL-CM-010", "multiple-articles", "Rates direct average without equal CP", "Different CP articles profit rates simple average cheyyadam.", "Rates need CP weights.", "Net amount/total CP×100 use cheyyi.", "CPs equal aa check cheyyi."),
    m("PL-CM-011", "multiple-articles", "Net amount denominator total SP", "Overall profit/total SP×100 use cheyyadam.", "Standard overall rate total investment meeda.", "Net profit/total CP×100.", "Base rule maintain cheyyi."),
    m("PL-CM-012", "multiple-articles", "Profit and loss amounts cancel from equal rates", "Equal 20% gain/loss ante no result ani assume cheyyadam.", "CPs or SPs condition matters.", "Equal CP ⇒ cancel; same SP ⇒ loss.", "Same CP vs same SP underline cheyyi."),
    m("PL-CM-013", "same-selling-price", "Same SP square-loss formula everywhere", "Unequal gain/loss rates ki x²/100 use cheyyadam.", "Formula equal magnitudes ki maatrame.", "CPs separately calculate cheyyi.", "Rates exactly equal aa check cheyyi."),
    m("PL-CM-014", "same-selling-price", "Square-loss sign profit", "Same SP equal rates result gain ani rayadam.", "Higher CP of losing article dominates.", "Always x²/100 loss.", "Square-loss word 'loss' lock cheyyi."),
    m("PL-CM-015", "marked-price", "Discount amount-ni SP nunchi subtract", "d% of SP calculate cheyyadam.", "Discount MP base.", "SP=MP(100−d)/100.", "MP first locate cheyyi."),
    m("PL-CM-016", "marked-price", "Markup rate-ne profit rate", "Markup tarvata discount unna kuda markup=profit ani answer.", "Discount final SP-ni reduce chestundi.", "SP/CP=(1+m)(1−d).", "All steps apply cheyyi."),
    m("PL-CM-017", "marked-price", "Target MP formula lo denominator wrong", "MP=CP(100+p)/(100+d) use cheyyadam.", "Discount factor is 100−d.", "MP=CP(100+p)/(100−d).", "Discount means remaining percent."),
    m("PL-CM-018", "successive-change", "Successive discounts add", "20%+10%=30% ani answer.", "Second discount reduced price meeda.", "20+10−2=28%.", "Subtract product/100."),
    m("PL-CM-019", "successive-change", "Markup and discount subtract", "40% markup−20% discount=20% profit ani answer.", "Sequential bases differ.", "1.4×0.8=1.12 ⇒ 12% profit.", "Factor chain use cheyyi."),
    m("PL-CM-020", "successive-change", "Order changes result ani assume", "20% then 10% discount and reverse order different ani anukovadam.", "Multiplication commutative.", "Both final factor 0.8×0.9=0.72.", "Same base-chain factors product."),
    m("PL-CM-021", "recovery", "Loss recovery same rate", "25% loss tarvata 25% gain enough ani answer.", "Gain smaller remaining base meeda.", "25/75×100=33 1/3%.", "Loss denominator 100−p."),
    m("PL-CM-022", "recovery", "Original capital badulu lost amount denominator", "Recovery rate=loss/original×100 malli use cheyyadam.", "Recovery remaining capital meeda earned avvali.", "Loss/remaining×100.", "New base identify cheyyi."),
    m("PL-CM-023", "false-weight", "Shortage percentage-ne gain", "10% less weight ⇒ 10% gain ani answer.", "Revenue full unit; cost 90% unit.", "10/90×100=11 1/9%.", "Actual delivered quantity denominator."),
    m("PL-CM-024", "false-weight", "Stated weight denominator", "200 g shortage on 1 kg ki gain 200/1000 ani use.", "Cost only 800 g incurred.", "Gain=200/800×100=25%.", "Gain/cost rule apply cheyyi."),
    m("PL-CM-025", "false-weight", "Price loss and weight gain add", "10% price loss +20% weight shortage ⇒ 10% gain ani subtract cheyyadam.", "Effects multiply/divide.", "0.9/0.8=1.125 ⇒ 12.5% gain.", "Revenue factor/weight factor."),
    m("PL-CM-026", "quantity-offers", "Free items/paid items as discount", "Buy 4 get 1 ⇒ 1/4=25% discount ani answer.", "Discount comparison total received value meeda.", "1/(4+1)=20%.", "Free/total received."),
    m("PL-CM-027", "quantity-offers", "Extra quantity percentage-ne discount", "25% extra ⇒ 25% discount ani answer.", "Customer gets 125 units for 100-unit price.", "25/125=20%.", "x/(100+x) formula."),
    m("PL-CM-028", "exam-strategy", "Rupees and percentages mix", "₹200 difference-ni 20 percentage points ani use cheyyadam.", "Units unrelated until CP scale known.", "Equation or ratio scale establish cheyyi.", "Every value ki unit note cheyyi."),
    m("PL-CM-029", "exam-strategy", "Quantity ignored", "Per-item profit-ni total profit ani answer.", "Multiple items scale amount.", "Per-item result×quantity.", "Asked per item aa total aa check."),
    m("PL-CM-030", "exam-strategy", "Sanity check skip", "Discounted SP>MP or profit case SP<CP accept cheyyadam.", "Price direction definitions violate chestundi.", "Discount: SP≤MP; profit: SP>CP; loss: SP<CP.", "Final 5-second direction check.")
  ],
  preventionChecklist: [
    "CP, SP, MP labels first rayi.", "Profit/loss and discount bases separate-ga remember cheyyi.",
    "Reverse percentage ki ratio/factor use cheyyi.", "Same CP and same SP patterns distinguish cheyyi.",
    "Successive changes multiply cheyyi.", "False weight lo actual delivered cost denominator.",
    "Overall result total CP meeda calculate cheyyi.", "Final sign, range and units verify cheyyi."
  ]
};

export default commonMistakes;
