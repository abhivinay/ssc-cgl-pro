const f = (id, name, formula, usage, condition = "") => ({ id, name, formula, usage, condition });

const formulas = {
  title: "Profit and Loss Formulas",
  description: "SSC CGL Profit, Loss and Discount complete formula bank with correct bases and conditions.",
  estimatedMinutes: 50,
  sections: [
    {
      id: "core",
      title: "Core Relations",
      formulas: [
        f("PL-F-001", "Profit", "Profit = SP − CP", "SP>CP unnappudu gain amount."),
        f("PL-F-002", "Loss", "Loss = CP − SP", "SP<CP unnappudu loss amount."),
        f("PL-F-003", "Profit Percentage", "Profit% = Profit/CP × 100", "Profit rate find cheyyadaniki.", "Standard base CP."),
        f("PL-F-004", "Loss Percentage", "Loss% = Loss/CP × 100", "Loss rate find cheyyadaniki.", "Standard base CP."),
        f("PL-F-005", "No Profit No Loss", "SP = CP", "Break-even condition.")
      ]
    },
    {
      id: "price-from-rate",
      title: "CP, SP and Percentage",
      formulas: [
        f("PL-F-006", "SP at Profit", "SP = CP(100+p)/100", "p% profit selling price."),
        f("PL-F-007", "SP at Loss", "SP = CP(100−p)/100", "p% loss selling price."),
        f("PL-F-008", "CP from Profit SP", "CP = SP×100/(100+p)", "SP and profit% given unnappudu."),
        f("PL-F-009", "CP from Loss SP", "CP = SP×100/(100−p)", "SP and loss% given unnappudu.", "p<100."),
        f("PL-F-010", "Profit Ratio", "CP:SP = 100:(100+p)", "Profit percentage-ni ratio-ga use cheyyadaniki."),
        f("PL-F-011", "Loss Ratio", "CP:SP = 100:(100−p)", "Loss percentage-ni ratio-ga use cheyyadaniki.", "p<100.")
      ]
    },
    {
      id: "price-change",
      title: "Required Change and Recovery",
      formulas: [
        f("PL-F-012", "SP Change Between Rates", "Change% = (new SP factor−old SP factor)/old SP factor×100", "Current rate nunchi target rate ki price change."),
        f("PL-F-013", "Loss Recovery Gain", "Required gain% = p/(100−p)×100", "p% loss tarvata original capital recover cheyyadaniki.", "p<100."),
        f("PL-F-014", "Gain Offset Loss", "Required loss% = p/(100+p)×100", "p% gain tarvata original value ki return avvadaniki."),
        f("PL-F-015", "Profit from SP Difference", "CP = Difference in SP ×100/(difference in percentage points)", "Same article two profit/loss conditions and SP difference given unnappudu."),
        f("PL-F-016", "Target SP", "Target SP = CP×target SP factor/100", "Required profit/loss target price.")
      ]
    },
    {
      id: "multiple-articles",
      title: "Multiple Articles",
      formulas: [
        f("PL-F-017", "Overall Result", "Overall%=Net profit or loss/Total CP×100", "Multiple transactions combine cheyyadaniki."),
        f("PL-F-018", "Equal CP Average", "Overall signed%=Σ(signed percentages)/n", "Equal CP articles with equal quantities."),
        f("PL-F-019", "Weighted Overall Rate", "Overall%=Σ(CPᵢ×signed rateᵢ)/ΣCPᵢ", "Different cost prices."),
        f("PL-F-020", "Same SP Equal Gain-Loss", "Overall loss%=x²/100", "Same SP; one x% gain and one x% loss."),
        f("PL-F-021", "Same SP Total CP", "Total CP = SP×100/(100+a) + SP×100/(100−b)", "Same SP, a% gain and b% loss articles.", "b<100."),
        f("PL-F-022", "Quantity from Total Result", "Net result=Σ(quantity×profit/loss per item)", "Different quantities sold at different rates.")
      ]
    },
    {
      id: "discount",
      title: "Marked Price and Discount",
      formulas: [
        f("PL-F-023", "Discount", "Discount = MP − SP", "Discount amount."),
        f("PL-F-024", "Discount Percentage", "Discount% = Discount/MP×100", "Discount rate.", "Base MP."),
        f("PL-F-025", "SP after Discount", "SP = MP(100−d)/100", "d% discount final price."),
        f("PL-F-026", "MP from Discounted SP", "MP = SP×100/(100−d)", "SP and discount% nunchi marked price.", "d<100."),
        f("PL-F-027", "Required Discount", "d% = (MP−required SP)/MP×100", "Target SP achieve cheyyadaniki discount."),
        f("PL-F-028", "Discount Ratio", "MP:SP = 100:(100−d)", "Discount problems ratio method.")
      ]
    },
    {
      id: "markup-discount",
      title: "Markup and Profit after Discount",
      formulas: [
        f("PL-F-029", "Marked Price after Markup", "MP = CP(100+m)/100", "CP meeda m% markup."),
        f("PL-F-030", "Final SP Factor", "SP = CP(100+m)(100−d)/10000", "m% markup and d% discount."),
        f("PL-F-031", "Final Profit Percentage", "Profit% = [(100+m)(100−d)/100]−100", "Markup-discount final gain."),
        f("PL-F-032", "MP for Target Profit", "MP = CP(100+p)/(100−d)", "d% discount tarvata p% profit kavali."),
        f("PL-F-033", "Discount for Target Profit", "d% = [1−(100+p)/(100+m)]×100", "m% markup nunchi target p% profit.", "m≥p for non-negative discount."),
        f("PL-F-034", "Markup for Target Profit", "m% = [(100+p)100/(100−d)]−100", "d% discount with target p% profit.")
      ]
    },
    {
      id: "successive-discount",
      title: "Successive Discounts and Offers",
      formulas: [
        f("PL-F-035", "Two Successive Discounts", "Equivalent discount = a+b−ab/100", "a% and b% successive discounts."),
        f("PL-F-036", "Final Price after Two Discounts", "SP = MP(100−a)(100−b)/10000", "Successive discount price."),
        f("PL-F-037", "Three Successive Discounts", "Final factor=(1−a/100)(1−b/100)(1−c/100)", "Three discounts combine cheyyadaniki."),
        f("PL-F-038", "Buy x Get y Free", "Equivalent discount%=y/(x+y)×100", "Free-item offer.", "All items same unit price."),
        f("PL-F-039", "More Quantity Offer", "Equivalent discount%=extra quantity/(normal+extra quantity)×100", "Same price ki extra quantity offer.")
      ]
    },
    {
      id: "false-weight",
      title: "False Weight and Dishonest Dealer",
      formulas: [
        f("PL-F-040", "Less Weight at CP Rate", "Gain%=shortage/(100−shortage)×100", "x% less weight, stated-unit rate equals CP."),
        f("PL-F-041", "Delivered Weight Method", "Gain%=(stated weight−actual weight)/actual weight×100", "Exact weights given unnappudu."),
        f("PL-F-042", "Price and Weight Combined", "SP/actual CP = price factor/weight factor", "Price profit/loss plus false weight combine cheyyadaniki."),
        f("PL-F-043", "Combined Gain", "Gain%=[(selling-price factor)/(delivered-quantity factor)−1]×100", "Dealer price and quantity rendu manipulate chesinappudu."),
        f("PL-F-044", "Adulteration at Zero Cost", "Gain%=free quantity/paid quantity×100", "Free adulterant mix chesi mixture-ni pure-item CP rate ki sell chesinappudu."),
        f("PL-F-045", "Article Count Equivalence", "If SP of x articles=CP of y articles, gain/loss%=(y−x)/x×100", "Article-count price relations.", "Positive means gain; negative means loss.")
      ]
    }
  ],
  quickRevision: [
    "Profit=SP−CP; loss=CP−SP.", "Profit/loss percentage base CP.",
    "Profit p% ⇒ SP factor 100+p; loss p% ⇒ 100−p.", "Discount base MP.",
    "Markup and discount factors multiply.", "Successive discount=a+b−ab/100.",
    "Same SP equal x% gain/loss ⇒ x²/100 loss.", "Loss recovery gain=p/(100−p)×100.",
    "False weight gain uses actual delivered quantity cost.", "Multiple transactions overall rate uses total CP."
  ],
  masteryRequirements: { totalFormulas: 45, minimumRecallAccuracy: 85, recommendedRevisionMinutes: 50, nextModule: "shortcuts" }
};

export default formulas;
