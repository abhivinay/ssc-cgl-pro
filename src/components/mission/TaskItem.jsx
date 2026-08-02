export default function TaskItem({
title,
completed,
locked,
active,
onClick
}){
const clickable=Boolean(active&&!locked);

const handleKeyDown=event=>{
if(!clickable)return;
if(event.key==="Enter"||event.key===" "){
event.preventDefault();
onClick?.();
}
};

return(
<div
className={`task-item ${locked?"locked":""} ${active?"active":""} ${completed?"completed":""}`}
onClick={clickable?onClick:undefined}
onKeyDown={handleKeyDown}
role={clickable?"button":undefined}
tabIndex={clickable?0:-1}
aria-disabled={locked}
>
<div className="task-left">
{completed?"✅":locked?"🔒":active?"🟢":"⬜"}
<span>{title}</span>
</div>
</div>
);
}