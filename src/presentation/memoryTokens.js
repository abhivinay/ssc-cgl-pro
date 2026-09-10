// Display aliases only. Original engine tokens remain the submitted answers.
const labels = {
  "🔴": "Red",
  "🟢": "Green",
  "🔵": "Blue",
  "🟡": "Yellow",
  "🟣": "Violet",
  "🟠": "Orange",
  "⚫": "Black",
  "⚪": "White",
  "▲": "Triangle",
  "■": "Square",
  "●": "Circle",
  "◆": "Diamond",
  "★": "Aster",
  "♥": "Cedar",
  "⬢": "Hexagon",
  "⬟": "Pentagon",
  "☀": "Amber",
  "☂": "Birch",
  "☁": "Cloud",
  "⚡": "Delta",
  "❄": "Frost",
  "🔥": "Ember",
  "🌙": "Lunar",
  "⭐": "Nova",
  "☘": "Elm",
  "☯": "Orbit",
  "♠": "Pine",
  "♣": "Reed",
  "♦": "Quartz",
  up: "North",
  down: "South",
  left: "West",
  right: "East",
};
export function memoryToken(value) {
  return labels[String(value).replace(/\uFE0F/g, "")] || String(value);
}
export function memorySequence(values) {
  return values.map(memoryToken).join(" / ");
}
