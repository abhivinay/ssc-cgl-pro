import{useEffect}from"react";

export default function Modal({
open=false,
onClose,
title,
description,
children,
footer,
size="md",
closeOnBackdrop=true,
className=""
}){
const sizes={
sm:"max-w-md",
md:"max-w-xl",
lg:"max-w-3xl",
xl:"max-w-5xl"
};

useEffect(()=>{
if(!open)return;

const handleKeyDown=event=>{
if(event.key==="Escape"){
onClose?.();
}
};

document.addEventListener("keydown",handleKeyDown);
document.body.style.overflow="hidden";

return()=>{
document.removeEventListener("keydown",handleKeyDown);
document.body.style.overflow="";
};
},[open,onClose]);

if(!open)return null;

return(
<div
className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
onMouseDown={event=>{
if(
closeOnBackdrop&&
event.target===event.currentTarget
){
onClose?.();
}
}}
>
<div
role="dialog"
aria-modal="true"
className={`w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/95 shadow-[0_30px_120px_rgba(0,0,0,0.65)] ${
sizes[size]||sizes.md
} ${className}`}
>
<div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
<div>
{title&&(
<h2 className="text-2xl font-black text-white">
{title}
</h2>
)}

{description&&(
<p className="mt-2 text-sm leading-6 text-zinc-400">
{description}
</p>
)}
</div>

<button
type="button"
onClick={onClose}
aria-label="Close modal"
className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
>
✕
</button>
</div>

<div className="max-h-[70vh] overflow-y-auto p-6">
{children}
</div>

{footer&&(
<div className="border-t border-white/10 p-6">
{footer}
</div>
)}
</div>
</div>
);
}