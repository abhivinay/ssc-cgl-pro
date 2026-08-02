export default function GlassCard({
children,
className="",
hover=false,
padding="p-6",
as:Component="div"
}){
return(
<Component
className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition duration-300 ${
hover
?"hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.065] hover:shadow-[0_28px_100px_rgba(0,0,0,0.45)]"
:""
} ${padding} ${className}`}
>
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_38%)]"/>

<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"/>

<div className="relative">
{children}
</div>
</Component>
);
}