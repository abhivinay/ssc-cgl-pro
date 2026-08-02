export default function Card({
children,
className="",
hover=false,
padding="p-6",
as:Component="div"
}){
return(
<Component
className={`rounded-3xl border border-zinc-800/90 bg-zinc-900/90 shadow-[0_18px_60px_rgba(0,0,0,0.28)] ${
hover
?"transition duration-300 hover:-translate-y-1 hover:border-violet-500/35 hover:bg-zinc-900"
:""
} ${padding} ${className}`}
>
{children}
</Component>
);
}