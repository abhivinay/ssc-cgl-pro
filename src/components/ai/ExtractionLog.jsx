export default function ExtractionLog({ logs = [] }) {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="text-lg font-bold text-white">Extraction Log</h2>

      <div className="mt-4 h-64 overflow-y-auto rounded-xl bg-zinc-950 p-3">
        {logs.length === 0 ? (
          <p className="text-sm text-zinc-500">No extraction activity yet.</p>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {log.message}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">{log.time}</p>
                </div>

                <span
                  className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                    log.type === "success"
                      ? "bg-cyan-300/10 text-cyan-200"
                      : log.type === "error"
                        ? "bg-cyan-300/10 text-cyan-200"
                        : "bg-cyan-300/10 text-cyan-200"
                  }`}
                >
                  {log.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
