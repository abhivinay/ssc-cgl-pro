const s = (id, title, rule, example, useWhen, caution = "") => ({ id, title, rule, example, useWhen, caution });

const shortcuts = {
  title: "Average Shortcuts",
  description: "SSC CGL Average questions-ni fast and accurate-ga solve cheyyadaniki shortcuts.",
  estimatedMinutes: 35,
  shortcuts: [
    s("AVG-SC-001", "Average Triangle", "A×N=S relation-ni immediate-ga use cheyyi.", "Average 18, count 25 ⇒ sum 450.", "Any basic average question."),
    s("AVG-SC-002", "Assumed Average", "Convenient central value-ni base-ga teesukoni net deviation/count add cheyyi.", "98,101,99,102 around 100; net deviation 0 ⇒ average 100.", "Close large values."),
    s("AVG-SC-003", "Balanced Pairing", "Equidistant pairs average center value.", "41+59, 44+56, 47+53 each pair average 50.", "Symmetric values."),
    s("AVG-SC-004", "AP Endpoint", "Equal-gap series average=(first+last)/2.", "17,22,...,52 average=34.5.", "Arithmetic progression."),
    s("AVG-SC-005", "Consecutive Middle", "Odd count consecutive series average middle term.", "31 to 41: middle 36.", "Odd number of consecutive values."),
    s("AVG-SC-006", "Target Total", "Target average×final count calculate chesi current total subtract cheyyi.", "9 innings at 40; target 42 after 10 ⇒ 420−360=60.", "Next marks/runs/sales required."),
    s("AVG-SC-007", "Joined Person Difference", "Joined value=new total−old total.", "6 at 20, 7 at 23 ⇒ 161−120=41.", "One observation added."),
    s("AVG-SC-008", "Left Person Difference", "Left value=old total−new total.", "8 at 25, 7 at 24 ⇒ 200−168=32.", "One observation removed."),
    s("AVG-SC-009", "Replacement Jump", "Replacement difference=count×average change.", "25 students average rises 0.8 ⇒ new−old=20.", "One value replaced."),
    s("AVG-SC-010", "Wrong Entry Sign", "Correction adjustment=correct−wrong; count tho divide cheyyi.", "65 badulu 56 ⇒ adjustment −9/n.", "Wrong data correction."),
    s("AVG-SC-011", "Uniform Grace Marks", "All values ki same marks add ayithe average direct-ga same marks increase.", "Average 54; +4 to everyone ⇒ 58.", "Scaling every observation."),
    s("AVG-SC-012", "Unequal Groups Warning", "Group averages-ni totals-ga convert cheyyi; simple midpoint avoid cheyyi.", "10 at 40 and 30 at 60 ⇒ 55, not 50.", "Combined average with unequal counts."),
    s("AVG-SC-013", "Equal Groups Shortcut", "Group sizes equal ayithe averages-ni direct-ga average cheyyi.", "Equal teams averages 22,28,34 ⇒ 28.", "Equal-size subgroups."),
    s("AVG-SC-014", "Opposite Deviation Ratio", "Lower:upper group counts=(upper−combined):(combined−lower).", "40,55 combined 46 ⇒ 9:6=3:2.", "Group-size ratio from averages."),
    s("AVG-SC-015", "Combined Average Range", "Positive group sizes unte combined average group averages madhya undali.", "40 and 70 combine ayithe answer 40–70 madhya.", "Option elimination."),
    s("AVG-SC-016", "Majority Pull", "Combined average larger group average daggara untundi.", "Many students average 60, few average 80 ⇒ combined 60 ki closer.", "Options quickly eliminate cheyyadaniki."),
    s("AVG-SC-017", "Same People Age", "n years tarvata same group average age exactly n increase.", "Average age 24 now; after 5 years 29.", "No member change age questions."),
    s("AVG-SC-018", "Birth or Replacement Alert", "Group members change ayithe direct age addition shortcut use cheyyaku.", "Baby joins family ⇒ totals/count recalculate.", "Changing group age questions."),
    s("AVG-SC-019", "Equal Distance Speed", "Two speeds equal distance ayithe 2xy/(x+y).", "30 and 60 ⇒ 40 km/h.", "Return journey or equal legs."),
    s("AVG-SC-020", "Equal Time Speed", "Two speeds equal time ayithe arithmetic mean.", "30 and 60 equal time ⇒ 45 km/h.", "Same-duration travel."),
    s("AVG-SC-021", "Speed Sanity Check", "Average speed min and max madhya undali; equal distance case slower speed daggara untundi.", "40 and 60 equal distance ⇒ 48, not 50+.", "Answer verification."),
    s("AVG-SC-022", "Ratio Values Weighted Average", "Value ratio/count ratio ni weights laga use cheyyi.", "2 items at 10, 3 at 20 ⇒ (20+60)/5=16.", "Frequencies or quantities given."),
    s("AVG-SC-023", "Average Difference to Total Difference", "Average difference×count=total difference.", "Average error 1.2 in 15 values ⇒ total error 18.", "Correction and replacement."),
    s("AVG-SC-024", "Unknown Subgroup", "Overall total−known subgroup total=unknown subgroup total.", "30 at 50; 10 at 44 ⇒ remaining 20 sum=1500−440.", "Group split."),
    s("AVG-SC-025", "Monthly Average Ledger", "Months with different expenses-ni total ledger-ga handle cheyyi.", "First 4 months + next 8 months totals combine.", "Income/expenditure averages."),
    s("AVG-SC-026", "Option Back-substitution", "Answer option-ni total condition lo substitute chesi verify cheyyi.", "Missing score options ni target total equation lo test cheyyi.", "Lengthy MCQ calculation."),
    s("AVG-SC-027", "Zero Deviation", "Positive and negative deviations cancel ayithe assumed value actual average.", "−7,−3,+2,+8 net 0.", "Deviation method."),
    s("AVG-SC-028", "One Extreme Effect", "Oka value d tho change ayithe average d/n tho maatrame change.", "One score +30 in 10 scores ⇒ average +3.", "Single observation change."),
    s("AVG-SC-029", "Remove Above/Below Average", "Above-average value remove ayithe average falls; below-average remove ayithe rises.", "Average 50 nunchi 70 remove ⇒ new average lower.", "Direction-based option elimination."),
    s("AVG-SC-030", "Add Above/Below Average", "Above-average value add ayithe average rises; below-average add ayithe falls.", "Average 40 group lo 55 add ⇒ new average >40.", "Direction check.")
  ],
  speedChecklist: [
    "Count correct-ga identify chesava?", "Average nunchi total convert cheyyala?", "Every value change aa one value change aa?",
    "Group sizes equal aa unequal aa?", "Replacement lo count same aa?", "Correct−wrong sign correct aa?",
    "AP gap equal aa?", "Average speed lo distances equal aa times equal aa?", "Final answer reasonable range lo unda?"
  ],
  masteryRequirements: { totalShortcuts: 30, minimumRecallAccuracy: 85, recommendedPracticeMinutes: 35, nextModule: "examples" }
};

export default shortcuts;
