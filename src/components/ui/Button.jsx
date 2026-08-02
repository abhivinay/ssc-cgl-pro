const VARIANTS={
primary:"bg-violet-600 text-white shadow-[0_12px_35px_rgba(124,58,237,0.35)] hover:bg-violet-500 hover:shadow-[0_16px_45px_rgba(124,58,237,0.45)]",
secondary:"border border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800",
ghost:"bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
success:"bg-emerald-600 text-white shadow-[0_12px_35px_rgba(5,150,105,0.3)] hover:bg-emerald-500",
danger:"bg-red-600 text-white shadow-[0_12px_35px_rgba(220,38,38,0.3)] hover:bg-red-500",
outline:"border border-violet-500/50 bg-violet-500/5 text-violet-300 hover:bg-violet-500/15"
};

const SIZES={
sm:"min-h-10 px-4 py-2 text-sm",
md:"min-h-12 px-5 py-3 text-sm",
lg:"min-h-14 px-7 py-4 text-base",
xl:"min-h-16 px-9 py-5 text-lg"
};

export default function Button({
children,
type="button",
variant="primary",
size="md",
loading=false,
disabled=false,
fullWidth=false,
className="",
leftIcon,
rightIcon,
...props
}){
const isDisabled=disabled||loading;

return(
<button
type={type}
disabled={isDisabled}
className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 ${
VARIANTS[variant]||VARIANTS.primary
} ${
SIZES[size]||SIZES.md
} ${
fullWidth?"w-full":""
} ${className}`}
{...props}
>
{loading?(
<>
<span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"/>
<span>Loading...</span>
</>
):(
<>
{leftIcon&&(
<span className="text-lg leading-none">
{leftIcon}
</span>
)}

<span>{children}</span>

{rightIcon&&(
<span className="text-lg leading-none">
{rightIcon}
</span>
)}
</>
)}
</button>
);
}