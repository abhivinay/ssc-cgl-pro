const revision = {
  title: "Average Revision",
  estimatedMinutes: 25,
  onePageNotes: [
    "Average=Sum/Count; Sum=Average×Count.",
    "Missing value=Required total−Known values sum.",
    "Assumed-average method: Actual average=Base+Net deviation/count.",
    "Arithmetic progression average=(first+last)/2.",
    "Odd-count AP average=middle term.",
    "First n natural numbers average=(n+1)/2.",
    "First n even numbers average=n+1; first n odd numbers average=n.",
    "Every value ki k add/subtract ayithe average k add/subtract.",
    "Added value=(n+1)new average−n old average.",
    "Removed value=n old average−(n−1)new average.",
    "Replacement difference=n×change in average.",
    "Correct average=Wrong average+(Correct entry−Wrong entry)/n.",
    "Combined average=Σ(group count×group average)/total count.",
    "Equal-size groups ayithe subgroup averages direct average cheyyachu.",
    "Group ratio=(upper average−combined):(combined−lower average).",
    "Target score=Target total−Current total.",
    "Same persons group average age elapsed years tho same amount increase.",
    "Average speed=Total distance/Total time.",
    "Two equal distances average speed=2xy/(x+y).",
    "Two equal times average speed=(x+y)/2."
  ],
  lastMinuteChecklist: [
    "Count lo joined/left observations correct-ga adjust chesava?",
    "Average-ni total-ga convert chesava?",
    "All observations change aa one observation change aa?",
    "Wrong-entry correction lo correct−wrong sign use chesava?",
    "Combined groups sizes equal aa unequal aa?",
    "AP lo gaps equal aa?",
    "Average speed lo equal distance aa equal time aa?",
    "Answer group averages/min-max madhya reasonable-ga unda?"
  ],
  memoryTricks: [
    "A×N=S.",
    "Join: new total−old total.",
    "Leave: old total−new total.",
    "Replace: total jump/count.",
    "Correct minus wrong.",
    "Groups need weights.",
    "Opposite gaps give group ratio.",
    "Speed means total distance over total time."
  ],
  rapidDrill: [
    { question: "Average of 12,18,24?", answer: "18" },
    { question: "Average 25, count 16; total?", answer: "400" },
    { question: "1 to 49 average?", answer: "25" },
    { question: "First 20 odd numbers average?", answer: "20" },
    { question: "10 values average 30; each +4. New average?", answer: "34" },
    { question: "8 at 20; ninth makes average 22. Ninth value?", answer: "38" },
    { question: "20 values average rises 1.2 after replacement. Difference?", answer: "24" },
    { question: "Groups average 40,60; combined 48. Size ratio?", answer: "3:2" },
    { question: "Equal distance speeds 40,60. Average speed?", answer: "48 km/h" },
    { question: "Equal time speeds 40,60. Average speed?", answer: "50 km/h" }
  ],
  revisionPlan: [
    { when: "Same day", task: "Formula recall + incorrect examples reattempt." },
    { when: "After 1 day", task: "Flashcards + 10-question rapid drill." },
    { when: "After 3 days", task: "Level 2 timed practice and error analysis." },
    { when: "After 7 days", task: "Topic Test retry without notes." },
    { when: "After 15 days", task: "Mixed arithmetic revision; verified PYQs available ayithe attempt." },
    { when: "After 30 days", task: "Mastery retest and weak-pattern repair." }
  ]
};

export default revision;
