import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudy } from "../context/StudyContext";
import Page from "../components/ui/Page";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import StageRenderer from "../components/topic/StageRenderer";
import { loadTopicContent } from "../services/contentRegistry";
const STAGE_LABELS = {
  learn: "Learn",
  conceptCheck: "Concept Check",
  level1: "Level 1",
  level2: "Level 2",
  level3: "Level 3",
  topicTest: "Topic Test",
  pyq: "PYQ Practice",
  revision: "Revision",
};

const STAGE_DESCRIPTIONS = {
  learn:
    "Understand the complete concept, formulas, rules, shortcuts and SSC applications.",
  conceptCheck:
    "Verify that the fundamentals are clear before moving to practice.",
  level1: "Solve easy SSC-pattern questions and strengthen the basic concepts.",
  level2:
    "Practice standard SSC-level questions with controlled speed and accuracy.",
  level3: "Attempt advanced SSC questions and mixed real-exam applications.",
  topicTest:
    "Complete the timed topic test and evaluate accuracy, speed and readiness.",
  pyq: "Solve verified SSC previous-year questions related to this topic.",
  revision:
    "Review formulas, conversions, mistakes, flashcards and rapid questions.",
};

const STAGE_ICONS = {
  learn: "",
  conceptCheck: "",
  level1: "",
  level2: "",
  level3: "",
  topicTest: "",
  pyq: "",
  revision: "",
};

const ROUTE_TO_STAGE = {
  learn: "learn",
  conceptcheck: "conceptCheck",
  conceptCheck: "conceptCheck",
  "concept-check": "conceptCheck",
  level1: "level1",
  "level-1": "level1",
  level2: "level2",
  "level-2": "level2",
  level3: "level3",
  "level-3": "level3",
  topictest: "topicTest",
  topicTest: "topicTest",
  "topic-test": "topicTest",
  pyq: "pyq",
  revision: "revision",
};

const STAGE_TO_ROUTE = {
  learn: "learn",
  conceptCheck: "concept-check",
  level1: "level-1",
  level2: "level-2",
  level3: "level-3",
  topicTest: "topic-test",
  pyq: "pyq",
  revision: "revision",
};

const SUBJECT_NAMES = {
  quant: "Quantitative Aptitude",
  reasoning: "General Intelligence & Reasoning",
  english: "English Comprehension",
  gk: "General Awareness",
};

export default function TopicStage() {
  const navigate = useNavigate();
  const { topicId, stageId } = useParams();

  const { studyState, stages, completeStage } = useStudy();

  const stageList = Array.isArray(stages) ? stages : Object.keys(STAGE_LABELS);

  const rawStage = String(stageId || "");

  const normalizedStage =
    ROUTE_TO_STAGE[rawStage] ||
    ROUTE_TO_STAGE[rawStage.toLowerCase()] ||
    rawStage;

  const topic = useMemo(() => {
    const requestedId = String(topicId || "").toLowerCase();

    return (
      studyState.topics.find(
        (item) => String(item.id).toLowerCase() === requestedId,
      ) ||
      (requestedId === "quant-percentage"
        ? studyState.topics.find(
            (item) =>
              item.subject === "quant" &&
              String(item.name || item.topic || "").toLowerCase() ===
                "percentage",
          )
        : null)
    );
  }, [studyState.topics, topicId]);

  const [loaded, setLoaded] = useState({
    id: null,
    content: null,
    error: null,
  });
  const loadCurrentTopic = useEffectEvent(() => loadTopicContent(topic));
  const contentTopicId = topic?.id;
  useEffect(() => {
    let cancelled = false;
    loadCurrentTopic()
      .then((content) => {
        if (!cancelled) setLoaded({ id: contentTopicId, content, error: null });
      })
      .catch(() => {
        if (!cancelled)
          setLoaded({
            id: contentTopicId,
            content: null,
            error: "Content could not load. Reload to retry.",
          });
      });
    return () => {
      cancelled = true;
    };
  }, [contentTopicId]);
  const topicContent = loaded.id === topic?.id ? loaded.content : null;

  const stageIndex = stageList.indexOf(normalizedStage);

  const completedStages = topic
    ? stageList.filter((stage) => Boolean(topic.stages?.[stage])).length
    : 0;

  const progress =
    topic && stageList.length
      ? Math.round((completedStages / stageList.length) * 100)
      : 0;

  const currentCompleted = Boolean(topic?.stages?.[normalizedStage]);

  const previousStage = stageIndex > 0 ? stageList[stageIndex - 1] : null;

  const previousComplete =
    stageIndex === 0 ||
    stageList.slice(0, stageIndex).every((stage) => topic?.stages?.[stage]);

  const stageAvailable = Boolean(
    topic && topic.unlocked && stageIndex >= 0 && previousComplete,
  );
  const canComplete = Boolean(stageAvailable && !currentCompleted);

  const nextStage = stageIndex >= 0 ? stageList[stageIndex + 1] || null : null;

  const goToStage = (stage) => {
    if (!topic || !stage) return;

    navigate(`/topic/${topic.id}/${STAGE_TO_ROUTE[stage] || stage}`);
  };

  const moveForward = () => {
    if (nextStage) {
      goToStage(nextStage);
      return;
    }

    navigate("/dashboard");
  };

  const handleStageComplete = () => {
    if (!canComplete) return;

    completeStage(topic.id, normalizedStage);

    moveForward();
  };

  const handleRendererComplete = (result) => {
    if (!result || !canComplete) return;

    completeStage(topic.id, normalizedStage, result);

    moveForward();
  };

  if (!topic) {
    return (
      <Page>
        <GlassCard className="p-5 text-center">
          <h1 className="mt-5 text-3xl font-semibold text-white">
            Topic not found
          </h1>

          <p className="mt-3 text-zinc-400">
            The requested topic is unavailable or may have been removed.
          </p>

          <Button className="mt-6" onClick={() => navigate("/syllabus")}>
            Open Syllabus
          </Button>
        </GlassCard>
      </Page>
    );
  }

  if (stageIndex === -1) {
    return (
      <Page>
        <GlassCard className="p-5 text-center">
          <h1 className="mt-5 text-3xl font-semibold text-white">
            Invalid study stage
          </h1>

          <Button className="mt-6" onClick={() => goToStage("learn")}>
            Open First Stage
          </Button>
        </GlassCard>
      </Page>
    );
  }

  return (
    <div className="relative min-h-full overflow-hidden">
      <Page className="relative py-2">
        <header className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-6   md:p-5">
          <div className="relative flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary">Study Mission</Badge>

                <Badge variant="info">
                  {SUBJECT_NAMES[topic.subject] || topic.subject}
                </Badge>

                <Badge
                  variant={
                    currentCompleted
                      ? "success"
                      : stageAvailable
                        ? "warning"
                        : "default"
                  }
                >
                  {currentCompleted
                    ? "Completed"
                    : stageAvailable
                      ? "Active"
                      : "Locked"}
                </Badge>

                {topicContent && (
                  <Badge variant="success">SSC Content Connected</Badge>
                )}
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                {topic.name}
              </h1>

              <p className="mt-4 text-lg font-semibold text-cyan-200">
                {STAGE_ICONS[normalizedStage]} {STAGE_LABELS[normalizedStage]}
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                {STAGE_DESCRIPTIONS[normalizedStage]}
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Topic Progress
              </p>

              <p className="mt-2 text-3xl font-semibold text-cyan-200">
                {progress}%
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {completedStages}/{stageList.length} stages completed
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ProgressBar value={progress} size="lg" variant="success" />
          </div>
        </header>

        <section className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            {!stageAvailable ? (
              <GlassCard padding="p-0" className="relative overflow-hidden">
                <div className="relative p-5 text-center md:p-5">
                  <h2 className="mt-6 text-3xl font-semibold text-white">
                    Stage Locked
                  </h2>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
                    Complete the previous stage before opening{" "}
                    {STAGE_LABELS[normalizedStage]}.
                  </p>

                  {previousStage && (
                    <Button
                      className="mt-7"
                      size="lg"
                      onClick={() => goToStage(previousStage)}
                    >
                      Open Previous Stage
                    </Button>
                  )}
                </div>
              </GlassCard>
            ) : !topicContent ? (
              <GlassCard padding="p-0" className="relative overflow-hidden">
                <div className="relative p-5 text-center md:p-5">
                  <h2 className="mt-6 text-3xl font-semibold text-white">
                    Topic content not connected
                  </h2>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
                    {loaded.id !== topic.id
                      ? "Loading topic content…"
                      : loaded.error ||
                        "This topic's authored content is not in the connected repository yet. It cannot be marked complete until content is supplied."}
                  </p>
                </div>
              </GlassCard>
            ) : (
              <>
                <StageRenderer
                  key={`${topic.id}:${normalizedStage}`}
                  stage={normalizedStage}
                  content={topicContent}
                  onStageComplete={handleRendererComplete}
                />

                {normalizedStage === "learn" && (
                  <GlassCard
                    padding="p-0"
                    className="mt-6 relative overflow-hidden"
                  >
                    <div className="relative p-6 md:p-5">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                            Learn Stage Completion
                          </p>

                          <p className="mt-2 text-lg font-semibold text-white">
                            Complete the full explanation before continuing.
                          </p>
                        </div>

                        <p
                          className={`text-sm font-semibold ${
                            currentCompleted ? "text-cyan-200" : "text-cyan-200"
                          }`}
                        >
                          {currentCompleted ? "Completed" : "Ready to complete"}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                        <Button
                          variant="secondary"
                          size="lg"
                          onClick={() => navigate("/dashboard")}
                          className="sm:flex-1"
                        >
                          Back to Dashboard
                        </Button>

                        {currentCompleted ? (
                          <Button
                            size="lg"
                            onClick={moveForward}
                            className="sm:flex-[2]"
                          >
                            Continue to Concept Check
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            disabled={!canComplete}
                            onClick={handleStageComplete}
                            className="sm:flex-[2]"
                          >
                            Complete Learn Stage
                          </Button>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                )}
              </>
            )}
          </div>

          <aside className="xl:sticky xl:top-6">
            <GlassCard padding="p-0" className="relative overflow-hidden">
              <div className="relative p-6">
                <Badge variant="info">Learning Path</Badge>

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Topic Stages
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Complete every stage in order.
                </p>

                <div className="mt-6 space-y-3">
                  {stageList.map((stage, index) => {
                    const completed = Boolean(topic.stages?.[stage]);

                    const active = stage === normalizedStage;

                    const available =
                      Boolean(topic.unlocked) &&
                      (index === 0 ||
                        stageList
                          .slice(0, index)
                          .every((previous) => topic.stages?.[previous]));

                    return (
                      <button
                        key={stage}
                        type="button"
                        disabled={!available && !completed}
                        onClick={() => goToStage(stage)}
                        className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition ${
                          completed
                            ? "border-cyan-300/20 bg-cyan-300/10"
                            : active
                              ? "border-cyan-300/30 bg-cyan-300/10"
                              : available
                                ? "border-white/10 bg-white/[0.03] hover:border-white/20"
                                : "cursor-not-allowed border-zinc-800 bg-zinc-950/50 opacity-50"
                        }`}
                      >
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                            completed
                              ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-200"
                              : active
                                ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-200"
                                : "border-white/10 bg-white/[0.04]"
                          }`}
                        >
                          {completed ? "" : available ? STAGE_ICONS[stage] : ""}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white">
                            {STAGE_LABELS[stage]}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            Stage {index + 1} of {stageList.length}
                          </p>
                        </div>

                        {active && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="secondary"
                  fullWidth
                  className="mt-6"
                  onClick={() => navigate("/dashboard")}
                >
                  Back to Dashboard
                </Button>
              </div>
            </GlassCard>
          </aside>
        </section>
      </Page>
    </div>
  );
}
