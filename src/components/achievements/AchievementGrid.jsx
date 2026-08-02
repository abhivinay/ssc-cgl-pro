import AchievementCard from "./AchievementCard";

const CATEGORY_ORDER=[
"study",
"xp",
"level",
"streak",
"revision",
"mistakes",
"brain",
"mock"
];

const CATEGORY_LABELS={
study:"Study",
xp:"XP",
level:"Level",
streak:"Streak",
revision:"Revision",
mistakes:"Mistakes",
brain:"Brain Trainer",
mock:"Mock Tests"
};

export default function AchievementGrid({
achievements=[],
activeCategory="all"
}){
const safeAchievements=Array.isArray(achievements)
?achievements
:[];

const filtered=activeCategory==="all"
?safeAchievements
:safeAchievements.filter(
achievement=>achievement.category===activeCategory
);

if(!filtered.length){
return(
<div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/50 p-10 text-center">
<p className="text-4xl">
🏆
</p>

<h2 className="mt-3 text-xl font-bold">
No achievements found
</h2>

<p className="mt-2 text-sm text-zinc-500">
No achievements are available in this category yet.
</p>
</div>
);
}

const grouped=CATEGORY_ORDER.reduce((result,category)=>{
const items=filtered.filter(
achievement=>achievement.category===category
);

if(items.length){
result.push({
category,
label:CATEGORY_LABELS[category]||category,
items
});
}

return result;
},[]);

return(
<div className="space-y-8">
{grouped.map(group=>(
<section key={group.category}>
<div className="mb-4 flex items-center justify-between gap-4">
<div>
<h2 className="text-2xl font-bold">
{group.label}
</h2>

<p className="mt-1 text-sm text-zinc-500">
{group.items.filter(item=>item.completed).length}/{group.items.length} unlocked
</p>
</div>
</div>

<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
{group.items.map(achievement=>(
<AchievementCard
key={achievement.id}
achievement={achievement}
/>
))}
</div>
</section>
))}
</div>
);
}