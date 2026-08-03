const e = (id, difficulty, question, solution, answer, concept, shortcut = "") => ({ id, difficulty, question, solution, answer, concept, shortcut });

const examples = {
  title: "Average Solved Examples",
  description: "SSC CGL-oriented Average examples from basic calculation to advanced applications.",
  estimatedMinutes: 85,
  examples: [
    e("AVG-E-001", "basic", "Find average of 18, 24, 30, 36, 42.", "Sum=150; count=5; average=150/5.", "30", "basic average"),
    e("AVG-E-002", "basic", "Average of 16 values is 27. Find total.", "Total=average×count=27×16.", "432", "total from average"),
    e("AVG-E-003", "basic", "Average of 6 numbers is 21. Five numbers sum to 113. Find sixth.", "Required total=6×21=126; sixth=126−113.", "13", "missing value"),
    e("AVG-E-004", "basic", "Find average of integers 31 to 49.", "Consecutive series average=(31+49)/2.", "40", "consecutive numbers", "Use endpoints."),
    e("AVG-E-005", "basic", "Average marks are 54. Four grace marks are added to every student. New average?", "Every observation rises by 4, so average also rises by 4.", "58", "uniform change"),
    e("AVG-E-006", "basic", "Average of 9 numbers is 32. If one number 44 is removed, find new average.", "Old total=288; new total=244; new count=8; average=244/8.", "30.5", "removal"),
    e("AVG-E-007", "moderate", "Average of 12 students is 35. Teacher joins and average becomes 37. Find teacher's age.", "New total=13×37=481; old total=12×35=420; teacher=61.", "61 years", "addition"),
    e("AVG-E-008", "moderate", "Average of 15 values increases from 24 to 26 when one value is replaced. New value is 52. Find old value.", "Total increase=15×2=30; new−old=30; old=52−30.", "22", "replacement"),
    e("AVG-E-009", "moderate", "Average of 20 numbers was calculated as 31. A value 48 was entered instead of 84. Find correct average.", "Correct average=31+(84−48)/20=31+1.8.", "32.8", "wrong entry"),
    e("AVG-E-010", "moderate", "25 boys average 62 and 15 girls average 70. Find class average.", "Combined=(25×62+15×70)/40=(1550+1050)/40.", "65", "combined average"),
    e("AVG-E-011", "moderate", "Two groups average 40 and 55; combined average 46. Find group-size ratio.", "Lower:upper=(55−46):(46−40)=9:6.", "3:2", "group ratio", "Use opposite deviations."),
    e("AVG-E-012", "moderate", "A batsman averages 48 after 9 innings. What must he score next to average 50 after 10 innings?", "Target total=500; current total=432; required=68.", "68 runs", "target average"),
    e("AVG-E-013", "moderate", "Average age of 8 persons is 26. After 4 years, same persons' average age?", "Every age increases by 4; average increases by 4.", "30 years", "ages"),
    e("AVG-E-014", "moderate", "Average of 5 consecutive odd numbers is 37. Find largest.", "Middle number=37; numbers differ by 2; largest=37+4.", "41", "consecutive odd numbers"),
    e("AVG-E-015", "advanced", "Average of 30 students is 52. Top 10 average 68. Find remaining 20 average.", "Overall total=1560; top total=680; remaining total=880; average=880/20.", "44", "subgroup average"),
    e("AVG-E-016", "advanced", "Average age of 24 students and a teacher is 16. Teacher leaves; students' average becomes 15.5. Find teacher's age.", "Old total=25×16=400; students total=24×15.5=372; teacher=28.", "28 years", "removal"),
    e("AVG-E-017", "advanced", "A vehicle covers equal distances at 36 and 54 km/h. Find average speed.", "Equal-distance average=2×36×54/(36+54)=3888/90.", "43.2 km/h", "average speed"),
    e("AVG-E-018", "advanced", "A vehicle travels 2 hours at 40 km/h and 3 hours at 60 km/h. Find average speed.", "Distance=80+180=260 km; time=5 h; average=52.", "52 km/h", "time-weighted speed"),
    e("AVG-E-019", "advanced", "Average of 11 results is 50. Average of first 6 is 49 and last 6 is 52. Find sixth result.", "First-six sum=294; last-six sum=312. Their sum 606 counts sixth twice. Total of 11=550; sixth=606−550.", "56", "overlapping averages"),
    e("AVG-E-020", "advanced", "Average monthly expense for first 4 months is ₹24,000 and next 8 months ₹30,000. Find annual monthly average.", "Annual total=4×24000+8×30000=336000; divide by 12.", "₹28,000", "weighted monthly average"),
    e("AVG-E-021", "advanced", "Average of 10 numbers is 42. Two values 38 and 46 are replaced by 50 and 54. New average?", "Old total=420; net change=(50+54)−(38+46)=20; new total=440; average=44.", "44", "multiple replacement"),
    e("AVG-E-022", "advanced", "Average weight of 40 students is 50 kg. 10 students averaging 45 kg leave and 10 averaging 55 kg join. New average?", "Old total=2000; remove 450 and add 550 ⇒ new total=2100; count remains 40.", "52.5 kg", "group replacement")
  ],
  examStrategy: [
    "Question chadivina ventane average-ni total-ga convert cheyyala ani decide cheyyi.",
    "Count changes-ni separate-ga track cheyyi.",
    "Replacement/correction lo signed total difference use cheyyi.",
    "Combined groups lo counts weights.",
    "Average speed lo total distance and total time first identify cheyyi."
  ],
  masteryRequirements: { totalExamples: 22, minimumAccuracy: 85, nextModule: "conceptCheck" }
};

export default examples;
