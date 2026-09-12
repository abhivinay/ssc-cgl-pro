import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";

const toArray = (value) => (Array.isArray(value) ? value : []);

const TYPE_CONFIG = {
  story: {
    label: "Story",

    variant: "primary",
  },
  concept: {
    label: "Concept",

    variant: "info",
  },
  visual: {
    label: "Visual",

    variant: "success",
  },
  example: {
    label: "Example",

    variant: "warning",
  },
  summary: {
    label: "Quick Summary",

    variant: "success",
  },
};

export default function LessonCard({ card, onOpenVisual }) {
  if (!card) {
    return (
      <GlassCard className="p-5 text-center">
        <h2 className="mt-4 text-2xl font-semibold text-white">
          Lesson card unavailable
        </h2>
      </GlassCard>
    );
  }

  const config = TYPE_CONFIG[card.type] || TYPE_CONFIG.concept;

  const content = toArray(card.content);
  const keyPoints = toArray(card.keyPoints);
  const examFocus = toArray(card.examFocus);
  const commonMistakes = toArray(card.commonMistakes);
  const memoryTips = toArray(card.memoryTips);

  return (
    <GlassCard padding="p-0" className="relative overflow-hidden">
      <div className="relative p-6 md:p-5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={config.variant}>{config.label}</Badge>

              {card.section && <Badge variant="default">{card.section}</Badge>}
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-3xl">
              {card.title || "Lesson Card"}
            </h2>

            {card.subtitle && (
              <p className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">
                {card.subtitle}
              </p>
            )}
          </div>
        </div>

        {card.story && (
          <div className="mt-6 rounded-lg border border-cyan-400/15 bg-cyan-500/[0.04] p-6 md:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Imagine
            </p>

            <p className="mt-4 whitespace-pre-line text-base leading-8 text-zinc-200">
              {card.story}
            </p>
          </div>
        )}

        {content.length > 0 && (
          <div className="mt-6 space-y-4">
            {content.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-start gap-4 rounded-lg border border-white/10 bg-black/20 p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
                  {index + 1}
                </div>

                <p className="text-sm leading-7 text-zinc-300 md:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}

        {card.visual && (
          <VisualBlock
            visual={card.visual}
            onOpen={() => onOpenVisual?.(card.visual)}
          />
        )}

        {keyPoints.length > 0 && (
          <SectionList title="Key Points" items={keyPoints} accent="emerald" />
        )}

        {examFocus.length > 0 && (
          <SectionList
            title="SSC Examiner's View"
            items={examFocus}
            accent="amber"
          />
        )}

        {memoryTips.length > 0 && (
          <SectionList title="Memory Tips" items={memoryTips} accent="violet" />
        )}

        {commonMistakes.length > 0 && (
          <SectionList
            title="Common Mistakes"
            items={commonMistakes}
            accent="rose"
          />
        )}

        {card.quickSummary && (
          <div className="mt-6 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              Quick Summary
            </p>

            <p className="mt-3 text-sm leading-7 text-zinc-300">
              {card.quickSummary}
            </p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

function VisualBlock({ visual, onOpen }) {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-cyan-400/15 bg-cyan-500/[0.035]">
      <div className="relative min-h-56 bg-zinc-950">
        <img
          src={visual.image}
          alt={visual.alt || visual.title || "Lesson visual"}
          loading="lazy"
          className="h-auto min-h-56 w-full object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
        />

        <div className="hidden min-h-56 items-center justify-center p-5 text-center">
          <div>
            <p className="mt-4 font-semibold text-white">
              Visual file not added yet
            </p>

            <p className="mt-2 break-all text-xs text-zinc-500">
              {visual.image}
            </p>
          </div>
        </div>

        {onOpen && (
          <button
            type="button"
            onClick={onOpen}
            className="absolute right-4 top-4 rounded-xl border border-white/10 bg-black/70 px-4 py-2 text-xs font-semibold text-white  transition hover:bg-black"
          >
            Full Screen
          </button>
        )}
      </div>

      <div className="p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
          Visual Explanation
        </p>

        <h3 className="mt-2 text-xl font-semibold text-white">
          {visual.title}
        </h3>

        {visual.caption && (
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            {visual.caption}
          </p>
        )}

        {toArray(visual.labels).length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {visual.labels.map((label) => (
              <span
                key={label}
                className="rounded-lg border border-cyan-400/15 bg-cyan-500/[0.07] px-3 py-1 text-xs font-bold text-cyan-200"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionList({ title, items, accent }) {
  const styles = {
    emerald: "border-cyan-300/15 bg-cyan-300/10 text-cyan-200",
    amber: "border-cyan-300/15 bg-cyan-300/10 text-cyan-200",
    violet: "border-cyan-300/15 bg-cyan-300/10 text-cyan-200",
    rose: "border-cyan-300/15 bg-cyan-300/10 text-cyan-200",
  };

  return (
    <div className="mt-6">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          styles[accent]?.split(" ").at(-1) || "text-zinc-500"
        }`}
      >
        {title}
      </p>

      <div className="mt-3 space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={`flex items-start gap-3 rounded-lg border p-4 ${
              styles[accent] || styles.violet
            }`}
          >
            <span></span>

            <p className="text-sm leading-7 text-zinc-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
