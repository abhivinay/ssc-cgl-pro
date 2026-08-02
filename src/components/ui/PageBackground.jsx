export default function PageBackground(){
return(
<>
<div className="fixed inset-0 -z-50 overflow-hidden bg-[#07090f]">
<div className="absolute -left-44 top-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse"/>
<div className="absolute right-[-150px] top-[180px] h-[480px] w-[480px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse"/>
<div className="absolute bottom-[-180px] left-[30%] h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[170px] animate-pulse"/>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.04),transparent_45%),linear-gradient(to_bottom,#05070c,#090b13,#05070c)]"/>
<div className="absolute inset-0 opacity-[0.035]" style={{
backgroundImage:`linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)`,
backgroundSize:"40px 40px"
}}/>
</div>
</>
);
}