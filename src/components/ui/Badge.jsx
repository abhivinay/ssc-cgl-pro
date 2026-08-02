const VARIANTS={
default:"border-zinc-700 bg-zinc-800/80 text-zinc-300",
primary:"border-violet-500/30 bg-violet-500/10 text-violet-300",
success:"border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
warning:"border-amber-500/30 bg-amber-500/10 text-amber-300",
danger:"border-red-500/30 bg-red-500/10 text-red-300",
info:"border-sky-500/30 bg-sky-500/10 text-sky-300"
};

const SIZES={
sm:"px-2.5 py-1 text-xs",
md:"px-3 py-1.5 text-sm"
};

export default function Badge({
children,
variant="default",
size="sm",
dot=false,
className=""
}){
return(
<span
className={`inline-flex items-center gap-2 rounded-full border font-semibold ${
VARIANTS[variant]||VARIANTS.default
} ${
SIZES[size]||SIZES.sm
} ${className}`}
>
{dot&&(
<span className="h-2 w-2 rounded-full bg-current"/>
)}

{children}
</span>
);
}