const rawCards = [
  ["Profit", "SP−CP."],
  ["Loss", "CP−SP."],
  ["Profit percentage", "Profit/CP×100."],
  ["Loss percentage", "Loss/CP×100."],
  ["SP at p% profit", "CP(100+p)/100."],
  ["SP at p% loss", "CP(100−p)/100."],
  ["CP from profit SP", "SP×100/(100+p)."],
  ["CP from loss SP", "SP×100/(100−p)."],
  ["Profit ratio", "CP:SP=100:(100+p)."],
  ["Loss ratio", "CP:SP=100:(100−p)."],
  ["Overall multiple-sales rate", "Net profit or loss/Total CP×100."],
  ["Equal CP articles", "Use CP-weighted signed average of rates."],
  ["Same SP equal gain-loss", "Overall loss=x²/100%."],
  ["Loss recovery", "Required gain=p/(100−p)×100%."],
  ["Gain reversal", "Required fall=p/(100+p)×100%."],
  ["Discount amount", "MP−SP."],
  ["Discount percentage", "Discount/MP×100."],
  ["SP after discount", "MP(100−d)/100."],
  ["Markup", "MP=CP(100+m)/100."],
  ["Markup-discount factor", "SP/CP=(1+m/100)(1−d/100)."],
  ["Two successive discounts", "a+b−ab/100."],
  ["Target MP", "CP(100+p)/(100−d)."],
  ["Buy x get y free", "Discount=y/(x+y)×100%."],
  ["x% extra quantity", "Discount=x/(100+x)×100%."],
  ["Short weight gain", "x/(100−x)×100%."],
  ["Exact false-weight gain", "(stated−actual)/actual×100%."],
  ["Price-weight combined", "Revenue factor/actual quantity-cost factor."],
  ["Article count relation", "SP of x=CP of y ⇒ result=(y−x)/x×100%."],
  ["Profit base", "CP, unless question explicitly changes base."],
  ["Discount base", "MP."]
];

const flashcards = {
  title: "Profit and Loss Flashcards",
  cards: rawCards.map((card, index) => ({
    id: `PL-FC-${String(index + 1).padStart(3, "0")}`,
    front: card[0],
    back: card[1],
    tags: ["profit-and-loss", index >= 15 && index <= 24 ? "discount-and-dealer" : "formula-recall"]
  })),
  studyModes: ["recognition", "recall", "reverse-recall"],
  masteryRule: "Card-ni 3 separate revision sessions lo correct-ga recall chesthe mastered."
};

export default flashcards;
