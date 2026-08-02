export default function Loading({
label="Loading...",
size="md",
className=""
}){
const sizes={
sm:"h-6 w-6 border-2",
md:"h-10 w-10 border-[3px]",
lg:"h-14 w-14 border-4"
};

return(
<div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
<div
className={`animate-spin rounded-full border-violet-500 border-r-transparent ${
sizes[size]||sizes.md
}`}
/>

{label&&(
<p className="text-sm font-medium text-zinc-400">
{label}
</p>
)}
</div>
);
}