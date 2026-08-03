import metadata from "./metadata";
import learn from "./learn";
import formulas from "./formulas";
import shortcuts from "./shortcuts";
import examples from "./examples";
import conceptCheck from "./conceptCheck";
import level1 from "./level1";
import level2 from "./level2";
import level3 from "./level3";
import topicTest from "./topicTest";
import revision from "./revision";
import flashcards from "./flashcards";
import commonMistakes from "./commonMistakes";
import mastery from "./mastery";

const numberSystem = {
  id: "number-system",
  slug: "number-system",
  subject: "quant",
  metadata,
  modules: {
    learn,
    formulas,
    shortcuts,
    examples,
    conceptCheck,
    level1,
    level2,
    level3,
    topicTest,
    revision,
    flashcards,
    commonMistakes,
    mastery
  },
  pyqs: null,
  moduleOrder: [
    "learn",
    "formulas",
    "shortcuts",
    "examples",
    "conceptCheck",
    "level1",
    "level2",
    "level3",
    "topicTest",
    "revision",
    "flashcards",
    "commonMistakes",
    "mastery"
  ],
  status: {
    contentComplete: true,
    pyqsComplete: false,
    pyqsStatus: "pending-verified-extraction"
  }
};

export {
  metadata,
  learn,
  formulas,
  shortcuts,
  examples,
  conceptCheck,
  level1,
  level2,
  level3,
  topicTest,
  revision,
  flashcards,
  commonMistakes,
  mastery
};

export default numberSystem;