const STATUS_STYLES = {
  pending: "border-zinc-800 bg-zinc-950/50",
  processing: "border-cyan-300/30 bg-cyan-300/10",
  completed: "border-cyan-300/30 bg-cyan-300/10",
  failed: "border-cyan-300/30 bg-cyan-300/10",
  paused: "border-cyan-300/30 bg-cyan-300/10",
};
const STATUS_LABELS = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
  paused: "Paused",
};
const formatBytes = (bytes) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
};
export default function ExtractionCard({
  item,
  selected = false,
  statusIcon,
  actions,
}) {
  return (
    <div
      className={`rounded-lg border p-4 transition ${STATUS_STYLES[item.status] || STATUS_STYLES.pending} ${selected ? "ring-2 ring-cyan-300/50" : ""}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-white">
              {item.name}
            </p>
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              {statusIcon}
              {STATUS_LABELS[item.status] || item.status}
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-zinc-500">{item.path}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span>{formatBytes(item.size)}</span>
            {Array.isArray(item.pages) && item.pages.length > 0 && (
              <span>{item.pages.length} pages</span>
            )}
            {item.completedAt && (
              <span>
                Completed {new Date(item.completedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="w-32">
            <div className="mb-1 flex items-center justify-between text-[10px] font-bold text-zinc-500">
              <span>Progress</span>
              <span>{Number(item.progress) || 0}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-lg bg-zinc-800">
              <div
                className={`h-full rounded-lg transition-all ${item.status === "failed" ? "bg-cyan-900" : item.status === "completed" ? "bg-cyan-900" : "bg-cyan-900"}`}
                style={{ width: `${Number(item.progress) || 0}%` }}
              />
            </div>
          </div>
          {actions}
        </div>
      </div>
      {item.error && (
        <div className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-xs font-bold leading-5 text-cyan-200">
          {item.error}
        </div>
      )}
    </div>
  );
}
