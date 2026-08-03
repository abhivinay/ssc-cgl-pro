import numberSystem from "./number-system";

const quantTopics = [numberSystem];

export const quantTopicMap = Object.fromEntries(
  quantTopics.map((topic) => [topic.slug, topic])
);

export const getQuantTopic = (slug) => quantTopicMap[slug] || null;

export { numberSystem };

export default quantTopics;