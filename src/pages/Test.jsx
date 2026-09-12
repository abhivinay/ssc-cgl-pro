import { Link, useParams, useNavigate } from "react-router-dom";
import { getTestById } from "../data/testData";
import ExamSession from "../components/test/ExamSession";
export default function Test() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = getTestById(testId);
  if (!test)
    return (
      <section className="card p-5">
        <h1>Test not found</h1>
        <Link to="/mock-tests">Back to tests</Link>
      </section>
    );
  return (
    <ExamSession
      key={test.id}
      sessionKey={`catalog:${test.id}`}
      config={test}
      questions={test.questions}
      topicId="reasoning-2"
      subject={test.subject}
      onComplete={() => navigate(`/test/${test.id}/result`)}
      continueLabel="View result"
    />
  );
}
