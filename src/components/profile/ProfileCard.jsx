export default function ProfileCard({profile}) {
return(
<div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<div className="flex flex-col items-center text-center">
<div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-violet-500/30 bg-violet-500/10 text-6xl">
{profile.avatar||"👨‍🎓"}
</div>
<h2 className="mt-5 text-2xl font-bold text-white">{profile.name}</h2>
<p className="mt-1 text-zinc-400">{profile.exam}</p>

<div className="mt-6 grid w-full grid-cols-2 gap-3">
<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs uppercase tracking-wide text-zinc-500">Target</p>
<p className="mt-2 text-2xl font-bold text-emerald-400">{profile.targetScore}</p>
</div>

<div className="rounded-2xl bg-zinc-950 p-4">
<p className="text-xs uppercase tracking-wide text-zinc-500">Hours</p>
<p className="mt-2 text-2xl font-bold text-violet-400">{profile.dailyStudyHours}h</p>
</div>
</div>
</div>
</div>
);
}