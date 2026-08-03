const q = (id, question, options, answer, explanation, concept) => ({ id, question, options, answer, explanation, concept });

const conceptCheck = {
  title: "Average Concept Check",
  description: "Average core concepts clear unnayo verify chese quick diagnostic.",
  timeLimitMinutes: 15,
  passingPercentage: 80,
  questions: [
    q("AVG-CC-001", "Average of 12, 18, 24 and 30?", ["18", "20", "21", "24"], "21", "Sum 84; 84/4=21.", "basic average"),
    q("AVG-CC-002", "Average 14 unna 8 values total?", ["22", "56", "112", "128"], "112", "Total=14×8.", "total"),
    q("AVG-CC-003", "5 numbers average 20; four numbers sum 82. Missing number?", ["16", "18", "20", "22"], "18", "Required total 100; 100−82=18.", "missing value"),
    q("AVG-CC-004", "Equally spaced series 7, 11, ..., 31 average?", ["17", "18", "19", "20"], "19", "AP average=(7+31)/2.", "AP"),
    q("AVG-CC-005", "Every value ki 6 add chesthe average 31 nunchi?", ["31", "34", "37", "186"], "37", "Uniform addition gives same average increase.", "uniform change"),
    q("AVG-CC-006", "7 persons average 18. One joins; average 20. New person's value?", ["28", "32", "34", "38"], "34", "8×20−7×18=34.", "addition"),
    q("AVG-CC-007", "10 values average 25. One leaves; remaining average 24. Removed value?", ["24", "30", "34", "40"], "34", "10×25−9×24=34.", "removal"),
    q("AVG-CC-008", "20 values lo one replacement valla average 1.5 rises. Replacement difference?", ["15", "20", "30", "40"], "30", "Difference=20×1.5.", "replacement"),
    q("AVG-CC-009", "10 students average 40 and 20 students average 55. Combined average?", ["45", "47.5", "50", "52.5"], "50", "(400+1100)/30=50.", "combined average"),
    q("AVG-CC-010", "Group averages 30 and 50; combined average 38. Size ratio lower:upper?", ["2:3", "3:2", "3:5", "5:3"], "3:2", "Opposite deviations=(50−38):(38−30)=12:8.", "group ratio"),
    q("AVG-CC-011", "Equal distances at 30 and 60 km/h. Average speed?", ["40", "45", "48", "50"], "40", "2×30×60/(30+60)=40.", "equal-distance speed"),
    q("AVG-CC-012", "Equal times at 30 and 60 km/h. Average speed?", ["40", "45", "48", "50"], "45", "Equal-time average=(30+60)/2.", "equal-time speed")
  ],
  resultBands: [
    { min: 80, label: "Ready", action: "Level 1 start cheyyi." },
    { min: 60, label: "Revise", action: "Learn + formulas quick revision cheyyi." },
    { min: 0, label: "Relearn", action: "Core concepts examples tho malli complete cheyyi." }
  ]
};

export default conceptCheck;
