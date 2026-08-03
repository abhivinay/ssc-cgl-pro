const item = (id, question, options, answer, solution, concept) => ({ id, question, options, answer, solution, concept });

const level3 = {
  title: "Average — Level 3",
  difficulty: "advanced",
  timeLimitMinutes: 32,
  passingPercentage: 70,
  questions: [
    item("AVG-L3-001", "20 values average 45. Five values averaging 30 are replaced by five averaging 50. New average?", ["47.5", "50", "52.5", "55"], "50", "New total=900−150+250=1000; 1000/20=50.", "group replacement"),
    item("AVG-L3-002", "30 students average 52. Ten students averaging 46 leave. Remaining average?", ["54", "55", "56", "58"], "55", "Remaining total=1560−460=1100; 1100/20=55.", "group removal"),
    item("AVG-L3-003", "Class average 48; boys average 52 and girls 42. Boys:girls?", ["2:3", "3:2", "3:4", "4:3"], "3:2", "Boys:girls=(48−42):(52−48)=6:4.", "group ratio"),
    item("AVG-L3-004", "24 students average 65. How many students averaging 75 join to make average 69?", ["12", "14", "16", "18"], "16", "(1560+75n)/(24+n)=69 ⇒ 6n=96.", "group addition"),
    item("AVG-L3-005", "Six consecutive multiples of 5 have average 37.5. Largest?", ["45", "50", "55", "60"], "50", "Terms are 25,30,35,40,45,50.", "consecutive multiples"),
    item("AVG-L3-006", "15 values average 28. First 8 average 25; last 8 average 32. Eighth value?", ["32", "34", "36", "38"], "36", "First and last sums total 456; overall sum 420; overlap=36.", "overlapping average"),
    item("AVG-L3-007", "25 entries average 64. Entries 48 and 72 should be 84 and 36. Correct average?", ["62.56", "64", "65.44", "66.88"], "64", "Net correction=(84−48)+(36−72)=0.", "multiple correction"),
    item("AVG-L3-008", "11 innings average 50. First 6 average 48. Sixth score is 60. Last 6 average?", ["52 2/3", "53", "53 2/3", "54"], "53 2/3", "Last-six sum=550−288+60=322; 322/6=53 2/3.", "overlapping innings"),
    item("AVG-L3-009", "Average age of 5 family members is 24. After 4 years a child joins and 6-member average becomes 25. Child's age?", ["8", "10", "12", "14"], "10", "Existing five after 4 years total=5×28=140; new total=150; child=10.", "age with addition"),
    item("AVG-L3-010", "A car covers equal distances at 72 and 48 km/h. Average speed?", ["54", "56", "57.6", "60"], "57.6", "2×72×48/(72+48)=6912/120=57.6.", "equal-distance speed"),
    item("AVG-L3-011", "A vehicle covers one-third distance at 30 km/h and remaining at 60 km/h. Average speed?", ["40", "42", "45", "50"], "45", "Let distance=3d. Time=d/30+2d/60=2d/30; speed=3d÷(2d/30)=45.", "unequal-distance speed"),
    item("AVG-L3-012", "A vehicle travels equal time at 40, 50 and 60 km/h. Average speed?", ["48", "50", "52", "54"], "50", "Equal-time weighted average=(40+50+60)/3.", "equal-time speed"),
    item("AVG-L3-013", "Average of A,B is 30; B,C is 36; A,C is 34. Largest value?", ["32", "36", "40", "44"], "40", "A+B=60, B+C=72, A+C=68 ⇒ C=(72+68−60)/2=40.", "pair averages"),
    item("AVG-L3-014", "11 numbers average 50. First 6 average 49 and last 6 average 52. Sixth number?", ["52", "54", "56", "58"], "56", "294+312−550=56.", "overlapping average"),
    item("AVG-L3-015", "Average salary of 50 employees is ₹30,000. Ten managers average ₹50,000. Remaining average salary?", ["₹20,000", "₹22,500", "₹25,000", "₹27,500"], "₹25,000", "Total=15,00,000; managers=5,00,000; remainder 10,00,000/40.", "subgroup average")
  ],
  unlockRequirement: { minimumScore: 70, nextModule: "topicTest" }
};

export default level3;
