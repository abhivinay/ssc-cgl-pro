import{forwardRef}from"react";

const Input=forwardRef(function Input({
label,
error,
hint,
leftIcon,
rightIcon,
className="",
containerClassName="",
...props
},ref){
return(
<div className={containerClassName}>
{label&&(
<label className="mb-2 block text-sm font-semibold text-zinc-300">
{label}
</label>
)}

<div className="relative">
{leftIcon&&(
<div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-zinc-500">
{leftIcon}
</div>
)}

<input
ref={ref}
className={`min-h-12 w-full rounded-2xl border bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-600 ${
leftIcon?"pl-11":""
} ${
rightIcon?"pr-11":""
} ${
error
?"border-red-500/60 focus:border-red-400 focus:ring-4 focus:ring-red-500/10"
:"border-zinc-700/90 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
} ${className}`}
{...props}
/>

{rightIcon&&(
<div className="absolute inset-y-0 right-4 flex items-center text-zinc-500">
{rightIcon}
</div>
)}
</div>

{error?(
<p className="mt-2 text-sm text-red-400">
{error}
</p>
):hint?(
<p className="mt-2 text-sm text-zinc-500">
{hint}
</p>
):null}
</div>
);
});

export default Input;