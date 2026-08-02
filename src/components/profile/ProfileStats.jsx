export default function ProfileStats({profile}){
const stats=[
{label:"Target Score",value:profile.targetScore,color:"text-emerald-400"},
{label:"Daily Hours",value:`${profile.dailyStudyHours}h`,color:"text-violet-400"},
{label:"Exam",value:profile.exam,color:"text-sky-400"},
{label:"Language",value:profile.language==="te-en"?"Telugu (English Script)":profile.language==="hi"?"Hindi":"English",color:"text-amber-400"},
];

return(
<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
{stats.map(stat=>(
<div key={stat.label} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
<p className="text-xs uppercase tracking-wide text-zinc-500">{stat.label}</p>
<p className={`mt-3 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
</div>
))}
</div>
);
}