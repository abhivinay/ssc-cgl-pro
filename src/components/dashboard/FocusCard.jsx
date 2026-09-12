import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStudy } from "../../context/StudyContext";
import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";

const subjectNames = {
  quant: "Quant",
  reasoning: "Reasoning",
  english: "English",
  gk: "General Awareness",
};

export default function FocusCard() {
  const navigate = useNavigate();

  const { studyState } = useStudy();

  const topic = useMemo(
    () => studyState.topics.find((item) => item.unlocked && !item.completed),
    [studyState.topics],
  );

  const revisionDue = (studyState.revisions || []).filter(
    (item) => !item.completed,
  ).length;

  const progress = topic
    ? Math.max(0, Math.min(100, Number(topic.progress) || 0))
    : 100;

  const notes = topic?.notes?.length || 0;
  const mistakes = topic?.mistakes?.length || 0;

  return (
    <GlassCard hover padding="p-0" className="relative overflow-hidden">
      <div className="relative p-6 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="primary">Today's Focus</Badge>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              {topic ? topic.name : "All Topics Completed "}
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              {topic
                ? `${subjectNames[topic.subject] || topic.subject} • ${topic.estimatedHours}h Estimated`
                : "Outstanding work. Review or attempt a mock test."}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar
            value={progress}
            size="lg"
            variant="primary"
            showValue
            label="Topic Completion"
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <MiniCard
            title="Difficulty"
            value={topic?.difficulty || "-"}
            accent="amber"
          />

          <MiniCard title="Revision Due" value={revisionDue} accent="emerald" />

          <MiniCard title="Notes" value={notes} accent="sky" />

          <MiniCard title="Mistakes" value={mistakes} accent="rose" />
        </div>

        <div className="mt-6">
          <Button
            size="lg"
            disabled={!topic}
            onClick={() => navigate(topic ? `/topic/${topic.id}` : "/syllabus")}
            className="w-full"
          >
            {topic ? "Continue Current Topic" : "Open Syllabus"}
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}

function MiniCard({
  title,
  value,

  accent,
}) {
  const colors = {
    amber: "text-cyan-200",
    emerald: "text-cyan-200",
    sky: "text-cyan-200",
    rose: "text-cyan-200",
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
          {title}
        </p>

        <span className="text-xl"></span>
      </div>

      <h3 className={`mt-4 text-2xl font-semibold ${colors[accent]}`}>
        {value}
      </h3>
    </div>
  );
}
