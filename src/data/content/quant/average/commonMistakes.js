const m = (id, category, title, mistake, whyWrong, correctMethod, prevention) => ({ id, category, title, mistake, whyWrong, correctMethod, prevention });

const commonMistakes = {
  title: "Average Common Mistakes",
  description: "SSC CGL Average lo frequently jarige errors, correct methods and prevention rules.",
  estimatedMinutes: 25,
  categories: [
    "basics", "count", "series", "uniform-change", "inclusion-exclusion", "replacement",
    "wrong-entry", "combined-average", "ages", "target", "average-speed", "exam-strategy"
  ],
  mistakes: [
    m("AVG-CM-001", "basics", "Sum-ni count tho divide cheyyakapovadam", "Numbers sum-ne average ani answer ivvadam.", "Average equal share; sum kaadu.", "Average=Sum/Count.", "A×N=S triangle remember cheyyi."),
    m("AVG-CM-002", "basics", "Midpoint-ni universal average anukovadam", "Any list average=(smallest+largest)/2 ani use cheyyadam.", "Adi symmetric/equally spaced data ki maatrame.", "General data lo actual sum/count use cheyyi.", "Gap equal aa first check cheyyi."),
    m("AVG-CM-003", "basics", "Average must be an observation ani assume cheyyadam", "Average list lo undakapothe answer wrong ani anukovadam.", "Average balance point; data value kaavalsina avasaram ledu.", "Decimal/fraction average valid ani accept cheyyi.", "Range check maatrame cheyyi."),
    m("AVG-CM-004", "count", "Count wrong-ga teesukovadam", "1 to 20 lo 19 numbers ani anukovadam.", "Inclusive count=b−a+1.", "1 to 20 has 20 values.", "Endpoints included aa check cheyyi."),
    m("AVG-CM-005", "count", "Joined person-ni old count lone unchadam", "New average total kosam n use cheyyadam.", "Joining tarvata count n+1.", "New total=(n+1)×new average.", "Count ledger maintain cheyyi."),
    m("AVG-CM-006", "count", "Removed person tarvata count change marchipovadam", "New total=n×new average ani rayadam.", "One leaves kabatti n−1 observations.", "New total=(n−1)A₂.", "Each event tarvata count update cheyyi."),
    m("AVG-CM-007", "series", "Unequal gaps ki AP shortcut", "2,4,8,10 average endpoints midpoint 6 ani use cheyyadam.", "Gaps 2,4,2; AP kaadu.", "Sum/count=24/4=6 coincidentally same ayina shortcut proof kaadu.", "All adjacent differences verify cheyyi."),
    m("AVG-CM-008", "series", "Even-count series middle number search", "Even count ki single middle term undi ani anukovadam.", "Two central values untayi.", "Their average or endpoints midpoint use cheyyi.", "Odd/even count identify cheyyi."),
    m("AVG-CM-009", "series", "First n odd/even formulas swap", "First n odd average=n+1 ani use cheyyadam.", "Odd and even sequences start differently.", "Odd average=n; even average=n+1.", "Odd→n, Even→next n memory rule."),
    m("AVG-CM-010", "uniform-change", "One value change-ni all-values rule laga use", "Oka score +5 ayithe average +5 ani cheppadam.", "Total only 5 rises; average 5/n rises.", "Average change=single-value change/count.", "Every value aa single value aa underline cheyyi."),
    m("AVG-CM-011", "uniform-change", "All values scale ayina old average unchanged ani anukovadam", "Each value double ayina average same ani cheppadam.", "Sum doubles while count same.", "New average=2×old average.", "Linear change average-ni same way affect chestundi."),
    m("AVG-CM-012", "inclusion-exclusion", "Joined value and average compare wrong", "Above-average person joins ayina new average falls ani accept cheyyadam.", "Above-average addition total proportion-ni raise chestundi.", "Direction check: added value>A₁ ⇒ A₂>A₁.", "Final sanity check cheyyi."),
    m("AVG-CM-013", "inclusion-exclusion", "Removed value formula reverse", "Removed value=new total−old total ani use cheyyadam.", "Removal lo old total larger.", "Removed value=old total−new total.", "Join subtract old from new; leave subtract new from old."),
    m("AVG-CM-014", "inclusion-exclusion", "Several people average-ni one value laga treat", "5 newcomers average 20 ante added total 20 ani use cheyyadam.", "20 is per-person average.", "Added total=5×20=100.", "Group average always count tho multiply cheyyi."),
    m("AVG-CM-015", "replacement", "Replacement lo count change cheyyadam", "One replaces another kabatti n+1 or n−1 use cheyyadam.", "One leaves and one joins; count same.", "Net total change=new−old; divide by n.", "Replacement means same count."),
    m("AVG-CM-016", "replacement", "Average jump-ni replacement value anukovadam", "Average +2 ante new value old kante 2 ekkuva ani cheppadam.", "Average change group count across spread avutundi.", "Replacement difference=n×2.", "Average jump × count."),
    m("AVG-CM-017", "wrong-entry", "Correction sign reverse", "Correct 40, wrong 70 ayithe +30/n cheyyadam.", "Wrong total excess 30 undi.", "Adjustment=(40−70)/n=−30/n.", "Always correct minus wrong."),
    m("AVG-CM-018", "wrong-entry", "Wrong total already corrected ani assume", "Given wrong average nunchi wrong entry remove cheyyakunda correct add cheyyadam.", "Wrong total contains wrong entry.", "Wrong total−wrong entry+correct entry.", "Replace, don't merely add."),
    m("AVG-CM-019", "combined-average", "Unequal group averages simple average", "10 at 40 and 30 at 60 ⇒ 50 ani cheppadam.", "Group sizes different weights.", "(10×40+30×60)/40=55.", "Counts are weights."),
    m("AVG-CM-020", "combined-average", "Group ratio formula same-side differences", "Lower:upper=(combined−lower):(upper−combined) ani rayadam.", "Weights are opposite deviations.", "Lower:upper=(upper−combined):(combined−lower).", "Cross/opposite gaps remember cheyyi."),
    m("AVG-CM-021", "combined-average", "Combined average range outside accept", "Groups 40 and 60, combined 65 ani accept cheyyadam.", "Positive weights weighted average endpoints madhya untundi.", "Answer 40 to 60 madhya undali.", "Range check compulsory."),
    m("AVG-CM-022", "ages", "Age average unchanged ani anukovadam", "Same people 5 years tarvata same average ani cheppadam.", "Prathi age +5; average +5.", "New average=old average+5.", "Same group condition check cheyyi."),
    m("AVG-CM-023", "ages", "Member change ayina direct elapsed-years shortcut", "Baby/person joins ayina average direct +years cheyyadam.", "Count and total both change.", "Old group age first update chesi new member include cheyyi.", "Same people aa changing group aa identify cheyyi."),
    m("AVG-CM-024", "target", "Target average difference-ne required score", "Average 40 nunchi 42 kosam next score 2 ani cheppadam.", "Next score full target total-ni achieve cheyyali.", "Required=42(n+1)−40n.", "Target total minus current total."),
    m("AVG-CM-025", "target", "New count old count-ga use", "Next innings target total=target average×old innings ani use cheyyadam.", "Next innings included.", "Final count=n+1.", "Timeline/count write cheyyi."),
    m("AVG-CM-026", "average-speed", "Speeds simple average always", "Equal distance 40,60 ⇒ 50 ani answer.", "Times unequal; slower speed lo ekkuva time spend avutundi.", "Equal distance=2xy/(x+y)=48.", "Distance condition underline cheyyi."),
    m("AVG-CM-027", "average-speed", "Equal-time formula equal-distance case lo use", "Return journey ki arithmetic mean use cheyyadam.", "Return journey usually distances equal, times kaavu.", "2xy/(x+y) use cheyyi.", "Equal time explicitly stated aa check cheyyi."),
    m("AVG-CM-028", "average-speed", "Average speed=average of segment speeds", "Different distance/time segments speeds direct average cheyyadam.", "Weights travel time/distance conditions batti vary.", "Total distance/total time always safe.", "Shortcut doubt unte base formula use cheyyi."),
    m("AVG-CM-029", "exam-strategy", "Units mismatch", "Minutes and hours mix chesi speed average calculate cheyyadam.", "Time units consistent kaavu.", "All distances/times same units-loki convert cheyyi.", "Formula mundu units check."),
    m("AVG-CM-030", "exam-strategy", "Reasonableness check skip", "Group averages 45,55 ayina combined 60 accept cheyyadam.", "Weighted average valid range violate chestundi.", "Min≤average≤max verify cheyyi.", "Last 5 seconds sanity check use cheyyi.")
  ],
  preventionChecklist: [
    "Average-to-total conversion first consider cheyyi.", "Count changes separate-ga track cheyyi.",
    "Every value vs one value distinguish cheyyi.", "Correction lo correct−wrong use cheyyi.",
    "Combined groups lo counts weights.", "Average speed condition identify cheyyi.",
    "Final range, direction and units verify cheyyi."
  ]
};

export default commonMistakes;
