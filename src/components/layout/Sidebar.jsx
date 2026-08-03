import{NavLink}from"react-router-dom";
import{
Home,
Target,
BookOpen,
Clock,
Award,
BarChart3,
Calendar,
StickyNote,
AlertTriangle,
Timer as TimerIcon,
Trophy,
Brain,
ShieldCheck,
FileSearch
}from"lucide-react";
import{useStudy}from"../../context/StudyContext";

const menuItems=[
{path:"/dashboard",label:"Dashboard",icon:Home},
{path:"/progress",label:"Progress",icon:Trophy},
{path:"/analytics",label:"Analytics",icon:BarChart3},
{path:"/brain-trainer",label:"Brain Trainer",icon:Brain},
{path:"/missions",label:"Missions",icon:Target},
{path:"/syllabus",label:"Syllabus",icon:BookOpen},
{path:"/revision",label:"Revision",icon:Clock},
{path:"/mock-tests",label:"Mock Tests",icon:Award},
{path:"/planner",label:"Planner",icon:Calendar},
{path:"/notes",label:"Notes Vault",icon:StickyNote},
{path:"/mistakes",label:"Mistake Notebook",icon:AlertTriangle},
{path:"/timer",label:"Study Timer",icon:TimerIcon},
{path:"/achievements",label:"Achievements",icon:Trophy},
{path:"/content-studio/extractor",label:"PDF Extractor",icon:FileSearch},
{path:"/content-studio/review",label:"Review Center",icon:ShieldCheck}
];

export default function Sidebar(){
const{studyState}=useStudy();

return(
<aside className="flex h-full w-72 flex-shrink-0 flex-col border-r border-zinc-800 bg-zinc-900">
<div className="border-b border-zinc-800 p-6">
<div className="flex items-center gap-3">
<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-3xl">
🛡️
</div>
<div>
<h1 className="text-2xl font-bold tracking-tight">SSC Sentinel</h1>
<p className="text-sm text-zinc-500">Your Personal Mentor</p>
</div>
</div>
</div>

<div className="border-b border-zinc-800 p-6">
<div className="flex items-center gap-3">
<div className="text-4xl">🔥</div>
<div>
<p className="text-sm text-zinc-400">Current Streak</p>
<p className="text-3xl font-semibold">{studyState?.streak||0} days</p>
</div>
</div>
</div>

<nav className="flex-1 space-y-1 overflow-y-auto p-4">
{menuItems.map(item=>{
const Icon=item.icon;

return(
<NavLink
key={item.path}
to={item.path}
className={({isActive})=>`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all ${
isActive
?"bg-violet-600 text-white"
:"text-zinc-400 hover:bg-zinc-800 hover:text-white"
}`}
>
<Icon size={20}/>
<span>{item.label}</span>
</NavLink>
);
})}
</nav>

<div className="mt-auto border-t border-zinc-800 p-6 text-xs text-zinc-500">
SSC CGL 2026 • Built with dedication
</div>
</aside>
);
}