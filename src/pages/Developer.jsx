import DeveloperPanel from "../components/developer/DeveloperPanel";

export default function Developer() {
  return (
    <div className="mx-auto max-w-7xl pb-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
          Internal Tools
        </p>

        <h1 className="mt-2 text-3xl font-bold">Developer Mode</h1>

        <p className="mt-2 max-w-3xl text-zinc-400">
          Use these tools only for testing SSC Sentinel features, LocalStorage,
          XP, achievements and Brain Trainer sessions.
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
        <p className="font-semibold text-cyan-200">Developer-only page</p>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Actions performed here can modify or permanently remove local project
          data. Export a backup before using reset actions.
        </p>
      </div>

      <div className="mt-6">
        <DeveloperPanel />
      </div>
    </div>
  );
}
