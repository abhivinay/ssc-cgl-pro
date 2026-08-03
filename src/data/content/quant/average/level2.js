const item = (id, question, options, answer, solution, concept) => ({ id, question, options, answer, solution, concept });

const level2 = {
  title: "Average — Level 2",
  difficulty: "moderate",
  timeLimitMinutes: 28,
  passingPercentage: 75,
  questions: [
    item("AVG-L2-001", "Average of 96, 98, 101, 103 and 102?", ["99", "100", "101", "102"], "100", "Around 100 deviations are −4,−2,+1,+3,+2; net 0.", "assumed average"),
    item("AVG-L2-002", "16 numbers average 32. Two numbers averaging 25 are removed. Remaining average?", ["32", "33", "34", "35"], "33", "Old sum=512; removed sum=50; 462/14=33.", "group removal"),
    item("AVG-L2-003", "20 students average 48. Five students join and class average becomes 50. New students' average?", ["56", "57", "58", "60"], "58", "New group total=1250−960=290; 290/5=58.", "addition group"),
    item("AVG-L2-004", "18 values average rises by 2 when an old value is replaced by 69. Old value?", ["31", "33", "35", "37"], "33", "Replacement difference=18×2=36; old=69−36=33.", "replacement"),
    item("AVG-L2-005", "30 values average was 42. Entry 64 should be 46. Correct average?", ["40.8", "41.2", "41.4", "42.6"], "41.4", "42+(46−64)/30=41.4.", "wrong entry"),
    item("AVG-L2-006", "40 persons average score 56. 25 persons average 60. Remaining 15 average?", ["48", "49 1/3", "50", "50 2/3"], "49 1/3", "Remaining sum=2240−1500=740; 740/15=49 1/3.", "subgroup"),
    item("AVG-L2-007", "Two groups average 35 and 50; combined average 44. Size ratio?", ["2:3", "3:2", "3:5", "5:3"], "2:3", "Lower:upper=(50−44):(44−35)=6:9=2:3.", "group ratio"),
    item("AVG-L2-008", "Average of first n natural numbers is 20.5. Find n.", ["39", "40", "41", "42"], "40", "(n+1)/2=20.5 ⇒ n=40.", "natural numbers"),
    item("AVG-L2-009", "Average of 7 consecutive even numbers is 46. Largest number?", ["50", "52", "54", "58"], "52", "Middle=46; largest=46+6=52.", "consecutive even"),
    item("AVG-L2-010", "Batsman average 44 after 9 innings. He scores 80 next. New average?", ["46.6", "47", "47.6", "48"], "47.6", "(9×44+80)/10=476/10.", "new score"),
    item("AVG-L2-011", "First 5 months average expense ₹18,000; next 7 months ₹24,000. Annual monthly average?", ["₹20,500", "₹21,000", "₹21,500", "₹22,000"], "₹21,500", "(5×18000+7×24000)/12=258000/12.", "weighted average"),
    item("AVG-L2-012", "Equal distances at 45 and 60 km/h. Average speed?", ["50", "51 3/7", "52.5", "54"], "51 3/7", "2×45×60/105=360/7=51 3/7.", "equal-distance speed"),
    item("AVG-L2-013", "Vehicle travels 3 h at 50 km/h and 2 h at 75 km/h. Average speed?", ["55", "60", "62.5", "65"], "60", "Total distance=150+150=300; time=5.", "time-weighted speed"),
    item("AVG-L2-014", "15 students average 40. One leaves and remaining average 38. Leaving student's score?", ["62", "66", "68", "70"], "68", "15×40−14×38=600−532=68.", "removal"),
    item("AVG-L2-015", "9 results average 40. First 5 average 38; last 5 average 44. Fifth result?", ["45", "48", "50", "52"], "50", "190+220−360=50; middle result counted twice.", "overlapping average")
  ],
  unlockRequirement: { minimumScore: 75, nextLevel: "level3" }
};

export default level2;
