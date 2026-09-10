import ExtractionCard from "./ExtractionCard";

const STATUS_ICONS = {
  pending: null,
  processing: null,
  completed: null,
  failed: null,
  paused: null,
};

export default function ExtractionQueue({
  items = [],
  selectedId,
  onPreview,
  onRetry,
  onRemove,
}) {
  if (!items.length) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-5 text-center">
        <p className="text-lg font-bold text-zinc-400">
          Extraction queue is empty
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          Add PDFs from the PDF Manager section.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ExtractionCard
          key={item.id}
          item={item}
          selected={selectedId === item.id}
          statusIcon={STATUS_ICONS[item.status]}
          actions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onPreview(item.id)}
                className="flex min-h-11 min-w-11 px-3 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition hover:border-cyan-300/40 hover:text-cyan-200"
                title="Preview"
              >
                {"Preview"}
              </button>

              {item.status === "failed" && (
                <button
                  type="button"
                  onClick={() => onRetry(item.id)}
                  className="flex min-h-11 min-w-11 px-3 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition hover:border-cyan-300/40 hover:text-cyan-200"
                  title="Retry"
                >
                  {"Retry"}
                </button>
              )}

              {item.status !== "processing" && (
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="flex min-h-11 min-w-11 px-3 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 transition hover:border-cyan-300/40 hover:text-cyan-200"
                  title="Remove"
                >
                  {"Remove"}
                </button>
              )}
            </div>
          }
        />
      ))}
    </div>
  );
}
