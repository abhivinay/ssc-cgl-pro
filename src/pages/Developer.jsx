import DeveloperPanel from"../components/developer/DeveloperPanel";

export default function Developer(){
return(
<div className="mx-auto max-w-7xl pb-10">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-400">
Internal Tools
</p>

<h1 className="mt-2 text-4xl font-bold">
Developer Mode
</h1>

<p className="mt-2 max-w-3xl text-zinc-400">
Use these tools only for testing SSC Sentinel features, LocalStorage,
XP, achievements and Brain Trainer sessions.
</p>
</div>

<div className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-5">
<p className="font-semibold text-red-300">
Developer-only page
</p>

<p className="mt-2 text-sm leading-6 text-zinc-400">
Actions performed here can modify or permanently remove local project
data. Export a backup before using reset actions.
</p>
</div>

<div className="mt-8">
<DeveloperPanel/>
</div>
</div>
);
}