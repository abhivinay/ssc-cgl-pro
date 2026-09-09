import ExamSession from "../test/ExamSession";
export default function TopicTestStage({ config = {}, questions = [], onComplete, topicId, subject }) {
  return <ExamSession sessionKey={`topic:${topicId || config.id || questions[0]?.id || "unknown"}`} config={config} questions={questions} onComplete={onComplete} topicId={topicId} subject={subject} continueLabel="Continue to PYQs" />;
}
