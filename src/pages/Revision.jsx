import useRevisions from "../hooks/useRevisions";

export default function Revision(){
const{
due,
upcoming,
completed,
completeTask
}=useRevisions();

return(
<div className="space-y-8">
<div>
<p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
Spaced Repetition
</p>

<h1 className="mt-2 text-3xl font-bold">
Revision Center
</h1>

<p className="mt-2 text-zinc-400">
Complete due revisions to automatically schedule the next review.
</p>
</div>

<Section
title={`Due (${due.length})`}
tasks={due}
buttonLabel="Complete Revision"
buttonAction={completeTask}
/>

<Section
title={`Upcoming (${upcoming.length})`}
tasks={upcoming}
/>

<Section
title={`Completed (${completed.length})`}
tasks={completed}
/>
</div>
);
}

function Section({
title,
tasks,
buttonLabel,
buttonAction
}){
return(
<section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
<h2 className="text-xl font-bold">
{title}
</h2>

{tasks.length===0?(
<p className="mt-4 text-zinc-500">
Nothing here.
</p>
):(
<div className="mt-5 space-y-4">
{tasks.map(task=>(
<div
key={task.id}
className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
>
<div>
<h3 className="font-semibold">
{task.title}
</h3>

<p className="mt-1 text-sm text-zinc-500">
{task.subject}
</p>

<p className="mt-2 text-xs text-zinc-400">
Priority: {task.priority}
</p>

<p className="text-xs text-zinc-400">
Revision #{task.revisionCount}
</p>
</div>

{buttonAction&&(
<button
type="button"
onClick={()=>buttonAction(task)}
className="rounded-xl bg-violet-600 px-4 py-2 font-semibold hover:bg-violet-500"
>
{buttonLabel}
</button>
)}
</div>
))}
</div>
)}
</section>
);
}