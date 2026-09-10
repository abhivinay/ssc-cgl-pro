import useGameViewport from "../hooks/useGameViewport";
import { useCallback, useEffect, useRef, useState } from "react";
import ProgressBar from "../components/ui/ProgressBar";
import Button from "../components/ui/Button";

const DIFFICULTY_SETTINGS = {
  easy: {
    operations: ["add", "subtract"],
    min: 5,
    max: 50,
  },
  medium: {
    operations: ["add", "subtract", "multiply", "divide"],
    min: 10,
    max: 100,
  },
  hard: {
    operations: ["add", "subtract", "multiply", "divide", "percentage"],

    min: 20,
    max: 250,
  },
};

const randomInteger = (minimum, maximum) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

const randomItem = (items) => items[randomInteger(0, items.length - 1)];

const createQuestion = (difficulty) => {
  const settings = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.easy;

  const operation = randomItem(settings.operations);

  let first;
  let second;
  let answer;
  let text;

  switch (operation) {
    case "subtract": {
      first = randomInteger(settings.min, settings.max);

      second = randomInteger(settings.min, first);

      answer = first - second;
      text = `${first} − ${second}`;
      break;
    }

    case "multiply": {
      const multiplierMax = difficulty === "hard" ? 25 : 12;

      first = randomInteger(2, multiplierMax);

      second = randomInteger(2, multiplierMax);

      answer = first * second;
      text = `${first} × ${second}`;
      break;
    }

    case "divide": {
      second = randomInteger(2, difficulty === "hard" ? 20 : 12);

      answer = randomInteger(2, difficulty === "hard" ? 30 : 15);

      first = second * answer;
      text = `${first} ÷ ${second}`;
      break;
    }

    case "percentage": {
      const percentage = randomItem([10, 20, 25, 40, 50, 75]);

      const baseMultiplier = randomInteger(2, 20);

      first = baseMultiplier * 20;
      answer = (first * percentage) / 100;
      text = `${percentage}% of ${first}`;
      break;
    }

    case "add":
    default: {
      first = randomInteger(settings.min, settings.max);

      second = randomInteger(settings.min, settings.max);

      answer = first + second;
      text = `${first} + ${second}`;
      break;
    }
  }

  return {
    id:
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `mental-${Date.now()}-${Math.random()}`,
    text,
    answer,
  };
};

export default function MentalMath({
  difficulty = "easy",
  duration = 60,
  onComplete,
  onProgress,
}) {
  const safeDuration = Math.max(10, Math.min(300, Number(duration) || 60));

  const [question, setQuestion] = useState(() => createQuestion(difficulty));

  const viewportRef = useGameViewport(question.id);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(safeDuration);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);

  const [startedAt] = useState(() => Date.now());
  const startedAtRef = useRef(startedAt);
  const questionStartedAtRef = useRef(startedAt);
  const reactionTimesRef = useRef([]);
  const completedRef = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const attempts = correctAnswers + wrongAnswers;

    const accuracy = attempts
      ? Math.round((correctAnswers / attempts) * 100)
      : 0;

    onProgress?.({
      score: correctAnswers * 100 - wrongAnswers * 25,
      correctAnswers,
      wrongAnswers,
      totalAttempts: attempts,
      accuracy,
    });
  }, [correctAnswers, wrongAnswers, onProgress]);

  const finishGame = useCallback(() => {
    if (completedRef.current) return;

    completedRef.current = true;
    setFinished(true);

    const reactionTimes = reactionTimesRef.current;

    const averageReactionTime = reactionTimes.length
      ? Math.round(
          reactionTimes.reduce((total, value) => total + value, 0) /
            reactionTimes.length,
        )
      : 0;

    const attempts = correctAnswers + wrongAnswers;

    const accuracy = attempts
      ? Math.round((correctAnswers / attempts) * 100)
      : 0;

    onComplete?.({
      correctAnswers,
      wrongAnswers,
      totalAttempts: attempts,
      accuracy,
      score: correctAnswers * 100 - wrongAnswers * 25,
      reactionTime: averageReactionTime,
      duration: Math.max(
        1,
        Math.round((Date.now() - startedAtRef.current) / 1000),
      ),
    });
  }, [correctAnswers, wrongAnswers, onComplete]);

  useEffect(() => {
    if (finished) return;

    if (timeLeft <= 0) {
      finishGame();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, finished, finishGame]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [question]);

  const nextQuestion = () => {
    setQuestion(createQuestion(difficulty));

    setAnswer("");
    setFeedback(null);
    questionStartedAtRef.current = Date.now();
  };

  const submitAnswer = (event) => {
    event.preventDefault();

    if (finished || answer.trim() === "") {
      return;
    }

    const numericAnswer = Number(answer);

    if (!Number.isFinite(numericAnswer)) {
      setFeedback({
        correct: false,
        message: "Enter a valid number.",
      });
      return;
    }

    reactionTimesRef.current.push(Date.now() - questionStartedAtRef.current);

    if (numericAnswer === question.answer) {
      setCorrectAnswers((previous) => previous + 1);

      setFeedback({
        correct: true,
        message: "Correct answer",
      });
    } else {
      setWrongAnswers((previous) => previous + 1);

      setFeedback({
        correct: false,
        message: `Correct answer: ${question.answer}`,
      });
    }

    setTimeout(() => {
      nextQuestion();
      inputRef.current?.focus();
    }, 300);
  };

  const attempts = correctAnswers + wrongAnswers;

  const accuracy = attempts ? Math.round((correctAnswers / attempts) * 100) : 0;

  const score = correctAnswers * 100 - wrongAnswers * 25;

  const timeProgress = Math.max(
    0,
    Math.min(100, Math.round((timeLeft / safeDuration) * 100)),
  );

  return (
    <section
      ref={viewportRef}
      tabIndex={-1}
      data-game="MentalMath"
      className="surface-panel"
    >
      <header className="game-heading">
        <div>
          <h2>Mental Math</h2>
          <p>Solve as many calculations as possible before time runs out.</p>
        </div>
        <div className="game-clock">
          <span>Time remaining</span>
          <strong>{timeLeft}s</strong>
        </div>
      </header>
      <ProgressBar value={timeProgress} label="Time remaining" />
      <div className="game-metrics">
        <span>
          Score <strong>{Math.max(0, score)}</strong>
        </span>
        <span>
          Correct <strong>{correctAnswers}</strong>
        </span>
        <span>
          Wrong <strong>{wrongAnswers}</strong>
        </span>
        <span>
          Accuracy <strong>{accuracy}%</strong>
        </span>
      </div>
      {finished ? (
        <p role="status" className="game-feedback">
          Mental Math complete. {correctAnswers} correct from {attempts}{" "}
          attempts.
        </p>
      ) : (
        <form onSubmit={submitAnswer} className="math-form">
          <p className="math-question">{question.text}</p>
          <label htmlFor="mental-answer">Your answer</label>
          <div className="math-answer">
            <input
              id="mental-answer"
              aria-label="Your answer"
              ref={inputRef}
              type="number"
              step="any"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Enter a number"
            />
            <Button type="submit" disabled={answer.trim() === ""}>
              Submit answer
            </Button>
          </div>
          <p role="status" className="game-feedback">
            {feedback?.message || ""}
          </p>
        </form>
      )}
    </section>
  );
}
