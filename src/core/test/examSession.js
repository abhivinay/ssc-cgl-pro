export function normalizeQuestion(question, index = 0) {
  const options = (Array.isArray(question.options) ? question.options : []).map(option => String(option?.text ?? option));
  const raw = question.correctAnswer ?? question.answer;
  // Authored modules use zero-based numeric indexes; letter-key banks use A–D.
  const answer = typeof raw === "number" ? raw
    : /^[A-D]$/.test(String(raw)) ? String(raw).charCodeAt(0) - 65
    : options.indexOf(String(raw));
  return { ...question, id: String(question.id ?? `question-${index}`), question: String(question.question ?? question.questionText ?? ""), options, answer };
}

export function validQuestion(question) {
  const count=question.type==="true-false"?2:4;
  return Boolean(question.question.trim() && question.options.length === count && question.options.every(option => option.trim()) && Number.isInteger(question.answer) && question.answer >= 0 && question.answer < count);
}

export function questionSignature(questions){
  const text=JSON.stringify(questions.map(q=>[q.id,q.question,q.options,q.answer]));
  let hash=2166136261;
  for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
  return (hash>>>0).toString(16);
}

export const remainingSeconds = (deadline, now = Date.now()) => Math.max(0, Math.ceil((deadline - now) / 1000));

export function createExam(questions, durationMinutes, now = Date.now()) {
  return { id: crypto.randomUUID(), startedAt: now, deadline: now + durationMinutes * 60000, currentIndex: 0, answers: {}, marked: [], finished: false, result: null, questionIds: questions.map(q => q.id), signature:questionSignature(questions) };
}

export function scoreExam(questions, answers, config = {}) {
  const marks = Number(config.marksPerCorrect ?? 2);
  const penalty = Number(config.negativeMarksPerWrong ?? 0.5);
  const correctAnswers = questions.filter(q => answers[q.id] === q.answer).length;
  const attempted = questions.filter(q => Number.isInteger(answers[q.id]) && answers[q.id] >= 0 && answers[q.id] < 4).length;
  const wrongAnswers = attempted - correctAnswers;
  const totalMarks = questions.length * marks;
  const score = Number((correctAnswers * marks - wrongAnswers * penalty).toFixed(2));
  const percentage = totalMarks ? Math.max(0, score / totalMarks * 100) : 0;
  return { correctAnswers, wrongAnswers, unanswered: questions.length - attempted, totalAttempts: attempted, totalQuestions: questions.length, accuracy: attempted ? correctAnswers / attempted * 100 : 0, score, totalMarks, percentage, passed: questions.length > 0 && percentage >= Number(config.passingPercentage ?? 70), answers };
}
