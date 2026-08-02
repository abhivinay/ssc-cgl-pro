const modules = {
  reasoning: import.meta.glob("../../data/questionBank/reasoning/**/*.{js,jsx}", {
    eager: true,
  }),
  quant: import.meta.glob("../../data/questionBank/quant/**/*.{js,jsx}", {
    eager: true,
  }),
  english: import.meta.glob("../../data/questionBank/english/**/*.{js,jsx}", {
    eager: true,
  }),
  generalAwareness: import.meta.glob(
    "../../data/questionBank/generalAwareness/**/*.{js,jsx}",
    {
      eager: true,
    }
  ),
};

const extract = (collection) =>
  Object.values(collection).flatMap((module) => {
    const value = module.default;
    if (Array.isArray(value)) return value;
    if (value) return [value];
    return [];
  });

export const getReasoningQuestions = () => extract(modules.reasoning);

export const getQuantQuestions = () => extract(modules.quant);

export const getEnglishQuestions = () => extract(modules.english);

export const getGeneralAwarenessQuestions = () =>
  extract(modules.generalAwareness);

export const getAllQuestions = () => [
  ...getReasoningQuestions(),
  ...getQuantQuestions(),
  ...getEnglishQuestions(),
  ...getGeneralAwarenessQuestions(),
];

export const getQuestionsBySubject = (subject) => {
  switch (subject) {
    case "reasoning":
      return getReasoningQuestions();
    case "quant":
      return getQuantQuestions();
    case "english":
      return getEnglishQuestions();
    case "generalAwareness":
      return getGeneralAwarenessQuestions();
    default:
      return [];
  }
};

export const getQuestionsByTopic = (topic) =>
  getAllQuestions().filter(
    (q) => q.topic?.toLowerCase() === topic.toLowerCase()
  );

export const getQuestionById = (id) =>
  getAllQuestions().find((q) => q.id === id);

export default {
  getAllQuestions,
  getReasoningQuestions,
  getQuantQuestions,
  getEnglishQuestions,
  getGeneralAwarenessQuestions,
  getQuestionsBySubject,
  getQuestionsByTopic,
  getQuestionById,
};