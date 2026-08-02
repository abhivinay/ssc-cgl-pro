import Button from"../ui/Button";

export default function LessonNavigation({
currentCard=1,
totalCards=1,
canGoPrevious=false,
canGoNext=true,
isLastCard=false,
nextLabel,
previousLabel="Previous",
onPrevious,
onNext
}){
const safeTotal=Math.max(
1,
Number(totalCards)||1
);

const safeCurrent=Math.min(
safeTotal,
Math.max(1,Number(currentCard)||1)
);

const resolvedNextLabel=
nextLabel||
(
isLastCard
?"Finish Lesson"
:"Next Card"
);

return(
<div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:p-6">
<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
<div>
<p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
Lesson Navigation
</p>

<p className="mt-2 text-sm font-semibold text-zinc-300">
Card {safeCurrent} of {safeTotal}
</p>
</div>

<div className="flex flex-col gap-3 sm:flex-row">
<Button
type="button"
variant="secondary"
size="lg"
disabled={!canGoPrevious}
onClick={onPrevious}
>
← {previousLabel}
</Button>

<Button
type="button"
size="lg"
disabled={!canGoNext}
onClick={onNext}
rightIcon={isLastCard?"✓":"→"}
>
{resolvedNextLabel}
</Button>
</div>
</div>

{!canGoNext&&(
<div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/[0.06] p-4">
<p className="text-sm font-semibold text-amber-300">
Complete the current checkpoint before continuing.
</p>
</div>
)}
</div>
);
}