const learn = {
  title: "Profit and Loss — Complete Learn Module",
  description: "SSC CGL Profit, Loss and Discount topic-ni basics nunchi advanced dealer problems varaku Roman Telugu explanation tho nerchukune module.",
  estimatedMinutes: 125,
  sections: [
    {
      id: "PL-L-001",
      title: "Core Terms: CP, SP and MP",
      explanation: "Cost Price (CP) ante article-ni konna total cost. Selling Price (SP) ante customer ki ammina price. Marked Price (MP) ante label/list price. Discount usually MP meeda untundi; profit or loss CP and SP comparison meeda untundi.",
      rules: ["SP>CP ayithe profit.", "SP<CP ayithe loss.", "SP=CP ayithe no profit, no loss."],
      teacherNote: "Question start chesina ventane CP, SP, MP values-ni separate-ga mark cheyyi. Veetini mix chesthe almost every formula wrong avutundi.",
      memoryTrick: "Buy=CP, Bill=SP, Tag=MP.",
      example: "Shopkeeper ₹800 ki koni ₹920 ki ammithe CP=800, SP=920, profit=₹120."
    },
    {
      id: "PL-L-002",
      title: "Profit, Loss and Their Percentages",
      explanation: "Profit=SP−CP; Loss=CP−SP. Profit% and Loss% ki standard base CP. Endukante gain or loss manam invest chesina amount tho compare chestam.",
      rules: ["Profit%=Profit/CP×100.", "Loss%=Loss/CP×100."],
      teacherNote: "SP denominator-ga use cheyyadam most common mistake. Question specifically 'profit as percentage of SP' ani chepthe maatrame SP base.",
      example: "CP ₹500, SP ₹575 ⇒ profit ₹75; profit%=75/500×100=15%."
    },
    {
      id: "PL-L-003",
      title: "SP from CP and Percentage",
      explanation: "CP-ni 100 parts ani assume chesthe p% profit daggara SP=(100+p) parts; p% loss daggara SP=(100−p) parts. Ee ratio approach equations kante fast.",
      rules: ["p% profit: SP=CP×(100+p)/100.", "p% loss: SP=CP×(100−p)/100."],
      examples: ["CP ₹1200, 25% profit ⇒ SP=1200×125/100=₹1500.", "CP ₹900, 12% loss ⇒ SP=900×88/100=₹792."],
      memoryTrick: "Profit add to 100; loss subtract from 100."
    },
    {
      id: "PL-L-004",
      title: "CP from SP and Percentage",
      explanation: "SP given ayithe multiplier-ni reverse divide cheyyali. Profit 20% ante CP:SP=100:120=5:6; loss 20% ante CP:SP=100:80=5:4.",
      rules: ["p% profit: CP=SP×100/(100+p).", "p% loss: CP=SP×100/(100−p)."],
      example: "20% profit tho SP ₹1440 ayithe CP=1440×100/120=₹1200.",
      commonTrap: "SP nunchi profit percentage direct subtract cheyyakudadhu, because percentage CP meeda calculate ayyindi."
    },
    {
      id: "PL-L-005",
      title: "Profit and Loss as Ratios",
      explanation: "Percentage-ni ratio-ga convert chesthe mental calculation easy. p% profit lo CP:SP=100:(100+p); p% loss lo CP:SP=100:(100−p). Ratio simplify chesi actual price fit cheyyi.",
      examples: ["25% profit ⇒ CP:SP=100:125=4:5.", "20% loss ⇒ CP:SP=100:80=5:4."],
      teacherNote: "Options unnappudu ratio method usually fastest."
    },
    {
      id: "PL-L-006",
      title: "Required Price Change",
      explanation: "Current selling condition nunchi new target profit/loss ki vellalante rendu selling-price factors compare cheyyali. CP cancel avutundi.",
      rule: "Required SP change% = (New SP factor−Old SP factor)/Old SP factor×100.",
      example: "20% loss nunchi 20% profit ki SP factor 80 nunchi 120. Increase=40/80×100=50%.",
      commonTrap: "20% loss to 20% profit difference 40% ani direct answer ivvakudadhu; change current SP meeda."
    },
    {
      id: "PL-L-007",
      title: "Same Cost Price Articles",
      explanation: "Articles CP same ayithe profit/loss percentages-ni direct average cheyyachu only quantities equal unte. Different quantities unte CP-weighted average use cheyyali.",
      rules: ["Equal CP and equal quantity: overall%=average of signed percentages.", "Different CP totals: net profit/net total CP×100."],
      example: "Equal CP unna two articles: one 20% gain, one 10% loss ⇒ overall 5% gain.",
      exception: "Only selling prices same unte ee average rule work avvadu."
    },
    {
      id: "PL-L-008",
      title: "Same Selling Price, Equal Gain and Loss",
      explanation: "Rendu articles same SP ki ammabaddayi; oka article meeda x% gain, inkoka article meeda x% loss ayithe always overall loss. Profit amount and loss amount equal kaavu because CPs different.",
      rule: "Overall loss%=x²/100.",
      example: "Each sold ₹960; one 20% gain, other 20% loss ⇒ overall loss=20²/100=4%.",
      memoryTrick: "Same SP + same gain/loss percent = square loss."
    },
    {
      id: "PL-L-009",
      title: "Same Selling Price, Different Percentages",
      explanation: "Same SP unna articles ki CPs separately reverse formula tho find cheyyali. Tarvata total SP and total CP compare cheyyali.",
      method: ["Common SP convenient value assume cheyyi.", "Each article CP=SP×100/SP-factor.", "Net result=(total SP−total CP)/total CP×100."],
      example: "Same SP ₹1200; first 20% gain ⇒ CP ₹1000; second 20% loss ⇒ CP ₹1500. Total SP ₹2400, total CP ₹2500 ⇒ 4% loss."
    },
    {
      id: "PL-L-010",
      title: "Marked Price and Single Discount",
      explanation: "Marked price label price. Discount MP meeda calculate avutundi. Discount ichina tarvata customer pay chesedi SP. Profit determine cheyyadaniki aa SP-ni CP tho compare cheyyali.",
      rules: ["Discount=MP−SP.", "Discount%=Discount/MP×100.", "SP=MP×(100−d)/100."],
      example: "MP ₹2000, discount 15% ⇒ SP=₹1700.",
      memoryTrick: "Discount base MP; profit base CP."
    },
    {
      id: "PL-L-011",
      title: "Markup, Discount and Final Profit",
      explanation: "Shopkeeper CP meeda markup chesi MP fix chestadu; tarvata MP meeda discount istadu. Rendu percentage multipliers sequential-ga apply cheyyali.",
      rule: "SP/CP=(1+markup/100)(1−discount/100).",
      example: "CP ₹1000, markup 40%, discount 10% ⇒ SP=1000×1.4×0.9=₹1260 ⇒ 26% profit.",
      commonTrap: "40% markup−10% discount=30% profit ani direct subtract cheyyakudadhu. Bases different."
    },
    {
      id: "PL-L-012",
      title: "Successive Discounts",
      explanation: "Two discounts MP original amount meeda rendu saarlu kaavu. Second discount first discount tarvata reduced price meeda.",
      rules: ["Equivalent discount=a+b−ab/100.", "Final SP=MP(1−a/100)(1−b/100)."],
      example: "20% and 10% discounts ⇒ equivalent=20+10−2=28%.",
      exception: "Discounts simple-ga add cheyyadam only one discount zero unte or approximation lo maatrame."
    },
    {
      id: "PL-L-013",
      title: "Required Marked Price or Discount",
      explanation: "Target profit and offered discount both given unte CP→required SP and MP→discounted SP equations equal cheyyali.",
      rule: "MP=CP×(100+profit%)/(100−discount%).",
      example: "CP ₹800, 25% profit after 20% discount kavali ⇒ MP=800×125/80=₹1250.",
      teacherNote: "Percentage symbols cancel avvadam valla 100 factors carefully handle cheyyi."
    },
    {
      id: "PL-L-014",
      title: "False Weight and Dishonest Dealer",
      explanation: "Dealer 1 kg ani cheppi takkuva weight isthe, customer nunchi full kg price teesukuntadu kani actual cost takkuva quantity ki maatrame. Gain denominator actual delivered quantity cost.",
      rule: "If x% less weight and sold at CP per stated unit, gain%=x/(100−x)×100.",
      example: "1 kg badulu 900 g isthe shortage 10%; gain=10/90×100=11 1/9%.",
      teacherNote: "Dealer price meeda additional profit/discount unte price factor and weight factor combine cheyyali."
    },
    {
      id: "PL-L-015",
      title: "Free Items, Quantity Deals and Recovery",
      explanation: "Buy x get y free ante customer x items price pay chesi x+y items pondutadu. Equivalent discount free items/total received meeda calculate cheyyali. Loss recover cheyyadaniki required gain current reduced capital meeda higher untundi.",
      rules: ["Buy x get y free equivalent discount=y/(x+y)×100.", "p% loss recover cheyyadaniki required gain=p/(100−p)×100."],
      examples: ["Buy 4 get 1 free ⇒ 1/5×100=20% discount.", "20% loss recover cheyyadaniki 20/80×100=25% gain required."]
    },
    {
      id: "PL-L-016",
      title: "Multi-step Exam Method",
      explanation: "Complex question lo CP-ni 100 or convenient LCM value assume chesi every event-ni multiplier-ga apply cheyyi. Final SP/CP ratio nunchi result derive cheyyi.",
      method: ["Base identify: CP, MP or current SP.", "Every profit, markup, discount, weight change ki factor rayi.", "Factors sequence lo multiply cheyyi.", "Final ratio-ni asked percentage or value-ga convert cheyyi."],
      teacherNote: "Percentages-ni amounts laga add cheyyakunda factor chain use chesthe multi-step questions reliable-ga solve avutayi."
    }
  ],
  summary: [
    "Profit=SP−CP; Loss=CP−SP.",
    "Profit/Loss percentage standard base CP.",
    "Profit p%: CP:SP=100:(100+p); loss p%: 100:(100−p).",
    "Discount base MP; profit base CP.",
    "Successive discount=a+b−ab/100.",
    "Markup-discount final factor=(1+m/100)(1−d/100).",
    "Same SP and equal x% gain/loss gives x²/100 loss.",
    "x% less weight at CP rate gives x/(100−x)×100 gain.",
    "p% loss recovery requires p/(100−p)×100 gain.",
    "Multi-step questions lo percentage factors use cheyyi."
  ],
  conceptCheckPrompt: "Learn module complete chesaka Concept Check attempt cheyyi."
};

export default learn;
