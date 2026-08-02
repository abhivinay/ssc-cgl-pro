const SIZES={
sm:"h-9 w-9 text-sm",
md:"h-11 w-11 text-base",
lg:"h-14 w-14 text-lg",
xl:"h-20 w-20 text-2xl"
};

export default function Avatar({
src,
alt="User",
name="",
size="md",
status,
className=""
}){
const initials=name
.trim()
.split(/\s+/)
.slice(0,2)
.map(part=>part[0]?.toUpperCase())
.join("");

return(
<div className={`relative inline-flex shrink-0 ${className}`}>
<div
className={`flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 font-bold text-violet-200 shadow-[0_12px_35px_rgba(0,0,0,0.3)] ${
SIZES[size]||SIZES.md
}`}
>
{src?(
<img
src={src}
alt={alt}
className="h-full w-full object-cover"
/>
):(
<span>
{initials||"U"}
</span>
)}
</div>

{status&&(
<span
className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 ${
status==="online"
?"bg-emerald-500"
:status==="busy"
?"bg-red-500"
:status==="away"
?"bg-amber-500"
:"bg-zinc-500"
}`}
/>
)}
</div>
);
}