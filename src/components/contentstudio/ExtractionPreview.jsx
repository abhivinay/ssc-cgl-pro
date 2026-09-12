export default function ExtractionPreview({ item, onClose }) {
  const handleCopy = async () => {
    if (!item?.text) return;
    await navigator.clipboard.writeText(item.text);
  };
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold text-white">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-500">Extraction Preview</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!item.text}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            Copy Text
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 px-3 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
      {item.status !== "completed" ? (
        <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950/50 p-5 text-center text-sm text-zinc-500">
          Extraction complete ayyaka text ikkada kanipistundi.
        </div>
      ) : (
        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <textarea
              readOnly
              value={item.text || ""}
              className="min-h-[520px] w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950/70 p-5 text-sm leading-7 text-zinc-300 outline-none"
              aria-label="Extracted text"
            />
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Characters
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {(item.text || "").length}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Pages
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {Array.isArray(item.pages) ? item.pages.length : 0}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Status
              </p>
              <p className="mt-2 text-sm font-semibold text-cyan-200">
                Ready for AI Parser
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
