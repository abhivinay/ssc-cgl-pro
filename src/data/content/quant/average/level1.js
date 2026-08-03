const item = (id, question, options, answer, solution, concept) => ({ id, question, options, answer, solution, concept });

const level1 = {
  title: "Average — Level 1",
  difficulty: "basic",
  timeLimitMinutes: 22,
  passingPercentage: 80,
  questions: [
    item("AVG-L1-001", "Average of 14, 18, 22 and 26?", ["18", "19", "20", "21"], "20", "Sum=80; divide by 4.", "basic average"),
    item("AVG-L1-002", "Average of 13 numbers is 24. Their sum?", ["288", "300", "312", "324"], "312", "13×24=312.", "total"),
    item("AVG-L1-003", "6 numbers average 17; five numbers sum 87. Sixth number?", ["13", "15", "17", "19"], "15", "Required total=102; 102−87=15.", "missing value"),
    item("AVG-L1-004", "Average of first 20 natural numbers?", ["10", "10.5", "11", "20.5"], "10.5", "(20+1)/2=10.5.", "natural numbers"),
    item("AVG-L1-005", "Average of first 15 odd numbers?", ["7.5", "15", "16", "30"], "15", "First n odd numbers average=n.", "odd numbers"),
    item("AVG-L1-006", "Average of 12, 18, 24, ..., 48?", ["27", "30", "33", "36"], "30", "AP average=(12+48)/2=30.", "AP"),
    item("AVG-L1-007", "8 values average 25. Each value rises by 5. New average?", ["25", "28", "30", "40"], "30", "Uniform rise gives same rise in average.", "uniform change"),
    item("AVG-L1-008", "7 persons average 28. A person aged 42 leaves. New average?", ["25", "25 2/3", "26", "26 1/3"], "25 2/3", "Old total=196; new total=154; 154/6=25 2/3.", "removal"),
    item("AVG-L1-009", "5 persons average 22. One joins and average becomes 25. New person's value?", ["35", "38", "40", "42"], "40", "6×25−5×22=40.", "addition"),
    item("AVG-L1-010", "10 values average rises by 2.5 when 35 is replaced. New value?", ["50", "55", "60", "65"], "60", "Replacement difference=10×2.5=25; 35+25=60.", "replacement"),
    item("AVG-L1-011", "25 values average was 40. Entry 72 should be 27. Correct average?", ["38.2", "39.2", "40.8", "41.8"], "38.2", "40+(27−72)/25=38.2.", "wrong entry"),
    item("AVG-L1-012", "12 students average 45 and 8 students average 60. Combined average?", ["49", "50", "51", "52"], "51", "(12×45+8×60)/20=1020/20=51.", "combined average"),
    item("AVG-L1-013", "Batsman average 35 after 7 innings. Score needed for average 38 after 8?", ["52", "56", "59", "62"], "59", "8×38−7×35=304−245=59.", "target average"),
    item("AVG-L1-014", "Same group average age is 32. After 6 years average age?", ["32", "35", "38", "192"], "38", "Every member ages by 6.", "ages"),
    item("AVG-L1-015", "A vehicle travels equal time at 48 and 72 km/h. Average speed?", ["56", "58", "60", "62"], "60", "Equal-time average=(48+72)/2.", "average speed")
  ],
  unlockRequirement: { minimumScore: 80, nextLevel: "level2" }
};

export default level1;
