const clamp=value=>{
const number=Number(value);
return Number.isFinite(number)
?Math.min(100,Math.max(0,number))
:0;
};

const SIZES={
sm:{
wrapper:"h-20 w-20",
stroke:7,
radius:30,
text:"text-base"
},
md:{
wrapper:"h-28 w-28",
stroke:8,
radius:42,
text:"text-xl"
},
lg:{
wrapper:"h-36 w-36",
stroke:10,
radius:54,
text:"text-3xl"
}
};

const VARIANTS={
primary:"stroke-violet-500",
success:"stroke-emerald-500",
warning:"stroke-amber-500",
danger:"stroke-red-500",
info:"stroke-sky-500"
};

export default function ProgressRing({
value=0,
size="md",
variant="primary",
label,
showValue=true,
className=""
}){
const progress=Math.round(clamp(value));
const config=SIZES[size]||SIZES.md;
const circumference=2*Math.PI*config.radius;
const offset=circumference-(progress/100)*circumference;
const dimension=config.radius*2+config.stroke*2;
const center=dimension/2;

return(
<div className={`inline-flex flex-col items-center gap-3 ${className}`}>
<div className={`relative ${config.wrapper}`}>
<svg
viewBox={`0 0 ${dimension} ${dimension}`}
className="h-full w-full -rotate-90"
>
<circle
cx={center}
cy={center}
r={config.radius}
fill="none"
strokeWidth={config.stroke}
className="stroke-zinc-800"
/>

<circle
cx={center}
cy={center}
r={config.radius}
fill="none"
strokeWidth={config.stroke}
strokeLinecap="round"
strokeDasharray={circumference}
strokeDashoffset={offset}
className={`transition-all duration-700 ease-out ${
VARIANTS[variant]||VARIANTS.primary
}`}
/>
</svg>

{showValue&&(
<div className="absolute inset-0 flex items-center justify-center">
<span className={`font-bold text-white ${config.text}`}>
{progress}%
</span>
</div>
)}
</div>

{label&&(
<p className="text-center text-sm font-medium text-zinc-400">
{label}
</p>
)}
</div>
);
}