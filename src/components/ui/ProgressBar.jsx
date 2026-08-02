const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)
?Math.min(100,Math.max(0,number))
:0;
};

const SIZES={
sm:"h-2",
md:"h-3",
lg:"h-4"
};

const VARIANTS={
primary:"bg-violet-500",
success:"bg-emerald-500",
warning:"bg-amber-500",
danger:"bg-red-500",
info:"bg-sky-500"
};

export default function ProgressBar({
value=0,
label,
showValue=false,
size="md",
variant="primary",
className="",
trackClassName=""
}){
const progress=Math.round(clamp(value));

return(
<div className={className}>
{(label||showValue)&&(
<div className="mb-2 flex items-center justify-between gap-4">
{label&&(
<p className="text-sm font-medium text-zinc-400">
{label}
</p>
)}

{showValue&&(
<p className="text-sm font-semibold text-zinc-200">
{progress}%
</p>
)}
</div>
)}

<div className={`overflow-hidden rounded-full bg-zinc-800/90 ${
SIZES[size]||SIZES.md
} ${trackClassName}`}>
<div
className={`h-full rounded-full transition-all duration-700 ease-out ${
VARIANTS[variant]||VARIANTS.primary
}`}
style={{width:`${progress}%`}}
/>
</div>
</div>
);
}