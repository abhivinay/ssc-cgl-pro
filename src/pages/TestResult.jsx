import { Link, useParams } from "react-router-dom";
import { getTestById } from "../data/testData";
import { readJSON } from "../services/safeStorage";
import ExamSession from "../components/test/ExamSession";
export default function TestResult() {
  const { testId } = useParams();
  const test = getTestById(testId);
  const attempt = readJSON(`ssc-exam:catalog:${testId}`);
  if (!test || !attempt?.finished) return <section className="card p-8"><h1>Result not available</h1><Link to={`/test/${testId}`}>Open test</Link></section>;
  return <ExamSession key={test.id} sessionKey={`catalog:${test.id}`} config={test} questions={test.questions}/>;
}
