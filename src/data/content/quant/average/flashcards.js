const rawCards = [
  ["Basic average", "Average=Sum of observations/Count."],
  ["Total from average", "Sum=Average×Count."],
  ["Missing observation", "Required total−Known observations sum."],
  ["Assumed-average formula", "Actual average=Assumed average+Σdeviations/n."],
  ["AP average", "(First term+Last term)/2."],
  ["Odd-count AP", "Average is middle term."],
  ["First n natural numbers", "Average=(n+1)/2."],
  ["First n even numbers", "Average=n+1."],
  ["First n odd numbers", "Average=n."],
  ["Uniform addition", "Every value +k ⇒ average +k."],
  ["Uniform multiplication", "Every value ×k ⇒ average ×k."],
  ["One value added", "Added value=(n+1)A₂−nA₁."],
  ["One value removed", "Removed value=nA₁−(n−1)A₂."],
  ["Replacement effect", "A₂=A₁+(new−old)/n."],
  ["Replacement difference", "new−old=n(A₂−A₁)."],
  ["Wrong entry correction", "Correct average=Wrong average+(correct−wrong)/n."],
  ["Two-group combined average", "(n₁A₁+n₂A₂)/(n₁+n₂)."],
  ["Weighted average", "Σwx/Σw."],
  ["Equal-size groups", "Overall average=average of subgroup averages."],
  ["Group-size ratio", "Lower:upper=(upper avg−combined):(combined−lower avg)."],
  ["Target score", "Target average×new count−current total."],
  ["Same group age", "After k years average age rises by k."],
  ["General average speed", "Total distance/Total time."],
  ["Two equal distances", "Average speed=2xy/(x+y)."],
  ["Two equal times", "Average speed=(x+y)/2."],
  ["n equal distances", "Average speed=n/(1/x₁+...+1/xₙ)."],
  ["Add above average", "Group average rises."],
  ["Remove above average", "Group average falls."],
  ["Combined-average range", "Positive weights unte subgroup averages madhya untundi."],
  ["Majority pull", "Combined average larger group's average daggara untundi."]
];

const flashcards = {
  title: "Average Flashcards",
  cards: rawCards.map((card, index) => ({
    id: `AVG-FC-${String(index + 1).padStart(3, "0")}`,
    front: card[0],
    back: card[1],
    tags: ["average", index >= 22 && index <= 25 ? "average-speed" : "formula-recall"]
  })),
  studyModes: ["recognition", "recall", "reverse-recall"],
  masteryRule: "Card-ni 3 separate revision sessions lo correct-ga recall chesthe mastered."
};

export default flashcards;
