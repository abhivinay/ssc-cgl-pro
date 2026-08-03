const s = (id, title, rule, example, useWhen, caution = "") => ({ id, title, rule, example, useWhen, caution });

const shortcuts = {
  title: "Profit and Loss Shortcuts",
  description: "SSC CGL Profit, Loss and Discount questions-ni fast and accurate-ga solve cheyyadaniki shortcuts.",
  estimatedMinutes: 40,
  shortcuts: [
    s("PL-SC-001", "Take CP as 100", "Only percentages given unte CP=100 assume cheyyi.", "20% profit ⇒ SP=120.", "Basic percentage relations."),
    s("PL-SC-002", "Profit Ratio", "p% profit-ni CP:SP=100:(100+p) ratio-ga convert cheyyi.", "25% profit ⇒ 4:5.", "CP or SP quickly find cheyyadaniki."),
    s("PL-SC-003", "Loss Ratio", "p% loss-ni CP:SP=100:(100−p) ratio-ga convert cheyyi.", "20% loss ⇒ 5:4.", "Loss-based price questions."),
    s("PL-SC-004", "Correct Base Check", "Profit/loss denominator CP; discount denominator MP.", "Profit ₹100 on CP ₹500 ⇒ 20%.", "Every percentage question.", "Question special base specify chesthe danini follow cheyyi."),
    s("PL-SC-005", "SP Difference Gives CP", "Same article SP conditions percentage-point difference ki proportional.", "10% loss vs 20% profit SP gap ₹300 ⇒ CP=300×100/30=₹1000.", "Two selling conditions."),
    s("PL-SC-006", "Loss-to-Profit Jump", "Old and new SP factors compare cheyyi; difference percentages direct add cheyyaku.", "20% loss to 20% profit: 80→120, increase 50%.", "Required SP increase."),
    s("PL-SC-007", "Profit-to-Loss Drop", "Price decrease current higher SP factor meeda calculate cheyyi.", "25% profit to 10% loss: 125→90; drop=35/125=28%.", "Required price reduction."),
    s("PL-SC-008", "Loss Recovery", "p% loss tarvata required gain=p/(100−p)×100.", "20% loss ⇒ 25% gain.", "Original capital restore cheyyadaniki."),
    s("PL-SC-009", "Gain Reversal", "p% gain tarvata original value ki drop=p/(100+p)×100.", "25% gain ⇒ 20% fall.", "Reverse percentage."),
    s("PL-SC-010", "Equal CP Signed Average", "Equal-cost articles overall rate=signed percentages average.", "+20% and −10% ⇒ +5%.", "Equal CP and equal quantities.", "Same SP case ki use cheyyaku."),
    s("PL-SC-011", "Same SP Square Loss", "Same SP, equal x% gain and loss ⇒ x²/100 loss.", "20% each ⇒ 4% loss.", "Classic two-article pattern."),
    s("PL-SC-012", "Same SP Convenient Value", "Percent denominators LCM-ni common SP-ga assume cheyyi.", "20% gain/loss ki SP=120 convenient.", "Different gain/loss rates with same SP."),
    s("PL-SC-013", "Net Amount First", "Multiple articles lo individual profit/loss amounts add chesi total CP meeda divide cheyyi.", "₹80 gain−₹30 loss=₹50 net gain.", "Mixed transactions."),
    s("PL-SC-014", "Discount Factor", "d% discount ante customer (100−d)% MP pay chestadu.", "15% discount ⇒ SP=85% MP.", "Single discount."),
    s("PL-SC-015", "Two Discounts", "Equivalent discount=a+b−ab/100.", "20%,10% ⇒ 28%.", "Successive discounts."),
    s("PL-SC-016", "Multiplier Chain", "Markup and discounts-ni decimal/fraction factors-ga multiply cheyyi.", "+40%, −10% ⇒ 1.4×0.9=1.26 ⇒ 26% gain.", "Multi-step price questions."),
    s("PL-SC-017", "Markup for Discount", "Target SP factor-ni discount balance factor tho divide cheyyi.", "20% profit after 25% discount ⇒ MP/CP=120/75=1.6 ⇒ 60% markup.", "Required markup."),
    s("PL-SC-018", "Discount for Target Profit", "Required SP/MP ratio find chesi discount=100−ratio%.", "MP=150% CP, target SP=120% CP ⇒ SP/MP=80%, discount=20%.", "Target profit after markup."),
    s("PL-SC-019", "Buy-Get-Free", "Equivalent discount=free items/total items received.", "Buy 3 get 1 ⇒ 1/4=25%.", "Quantity offers."),
    s("PL-SC-020", "Extra Quantity", "x% extra quantity equivalent discount=x/(100+x)×100.", "25% extra ⇒ 25/125=20%.", "Same-price extra quantity."),
    s("PL-SC-021", "False Weight Exact", "Gain=(stated−actual)/actual×100 when price per stated unit equals CP.", "1000 g price, 800 g delivered ⇒ 200/800=25%.", "Dishonest weights."),
    s("PL-SC-022", "Short Weight Percentage", "x% shortage gain=x/(100−x)×100.", "10% short ⇒ 11 1/9% gain.", "Shortage stated in percent."),
    s("PL-SC-023", "Price-Weight Combined", "Price factor-ni delivered-weight factor tho divide cheyyi.", "10% loss price, 20% short weight ⇒ 0.9/0.8=1.125 ⇒ 12.5% gain.", "Dealer manipulates price and weight."),
    s("PL-SC-024", "Free Adulterant", "Zero-cost adulterant gain=free quantity/paid quantity×100 at pure CP selling rate.", "4 L milk+1 L free water ⇒ 25% gain.", "Adulteration basic case."),
    s("PL-SC-025", "Article Count Relation", "SP of x=CP of y ⇒ result=(y−x)/x×100.", "SP of 8=CP of 10 ⇒ 25% gain.", "Count-equivalence questions."),
    s("PL-SC-026", "Profit on SP Conversion", "Profit is p% of SP ⇒ profit% on CP=p/(100−p)×100.", "20% of SP ⇒ 25% of CP.", "Non-standard profit base.", "p<100."),
    s("PL-SC-027", "Profit on CP to SP", "Profit p% of CP ⇒ profit as % of SP=p/(100+p)×100.", "25% of CP ⇒ 20% of SP.", "Base conversion."),
    s("PL-SC-028", "Option Substitution", "Options lo CP/SP values unte formula solve cheyyakunda conditions verify cheyyi.", "CP option×1.2 required SP ki equal aa check.", "Lengthy MCQ equations."),
    s("PL-SC-029", "Range Sanity", "Discount tarvata SP≤MP; profit unte SP>CP; loss unte SP<CP.", "MP ₹1000, 20% discount ⇒ SP cannot be ₹850? Actually ₹800 only.", "Final validation."),
    s("PL-SC-030", "Unit Profit Scaling", "Oka item profit/loss telisthe quantity tho multiply; percentage base total CP.", "₹12 profit each on 25 items ⇒ ₹300 profit.", "Bulk sales.")
  ],
  speedChecklist: [
    "CP, SP, MP separate-ga identify chesava?", "Percentage base CP aa MP aa?", "Profit/loss sign correct aa?",
    "Same CP aa same SP aa?", "Successive changes-ni factors-ga multiply chesava?", "Discount MP meeda apply chesava?",
    "False weight lo actual delivered quantity use chesava?", "Multiple deals total CP meeda result calculate chesava?",
    "Final price direction and range reasonable-ga unnaya?"
  ],
  masteryRequirements: { totalShortcuts: 30, minimumRecallAccuracy: 85, recommendedPracticeMinutes: 40, nextModule: "examples" }
};

export default shortcuts;
