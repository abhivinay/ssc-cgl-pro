import{useState}from"react";

export default function Tooltip({
content,
children,
position="top",
delay=120,
className=""
}){
const[visible,setVisible]=useState(false);
const[timer,setTimer]=useState(null);

const positions={
top:"bottom-full left-1/2 mb-3 -translate-x-1/2",
bottom:"top-full left-1/2 mt-3 -translate-x-1/2",
left:"right-full top-1/2 mr-3 -translate-y-1/2",
right:"left-full top-1/2 ml-3 -translate-y-1/2"
};

const show=()=>{
const timeout=setTimeout(()=>{
setVisible(true);
},Math.max(0,Number(delay)||0));

setTimer(timeout);
};

const hide=()=>{
if(timer){
clearTimeout(timer);
}

setVisible(false);
setTimer(null);
};

return(
<span
className={`relative inline-flex ${className}`}
onMouseEnter={show}
onMouseLeave={hide}
onFocus={show}
onBlur={hide}
>
{children}

{visible&&content&&(
<span
role="tooltip"
className={`pointer-events-none absolute z-[150] whitespace-nowrap rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-200 shadow-[0_16px_50px_rgba(0,0,0,0.5)] ${
positions[position]||positions.top
}`}
>
{content}
</span>
)}
</span>
);
}