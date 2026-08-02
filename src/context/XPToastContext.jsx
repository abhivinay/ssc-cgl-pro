import{createContext,useCallback,useContext,useRef,useState}from"react";

const XPToastContext=createContext(null);

export function XPToastProvider({children}){
const[toast,setToast]=useState(null);
const timerRef=useRef(null);

const showXPToast=useCallback(({amount,levelUpLevel=null})=>{
if(timerRef.current){
clearTimeout(timerRef.current);
}

setToast({
id:Date.now(),
amount,
levelUpLevel
});

timerRef.current=setTimeout(()=>{
setToast(null);
},2500);
},[]);

return(
<XPToastContext.Provider value={{showXPToast}}>
{children}

{toast&&(
<div className="fixed right-5 top-5 z-[100] min-w-56 animate-pulse rounded-2xl border border-emerald-400/30 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur">
<p className="text-lg font-bold text-emerald-400">
⚡ +{toast.amount} XP
</p>

{toast.levelUpLevel&&(
<p className="mt-1 text-sm font-semibold text-amber-300">
🎉 Level {toast.levelUpLevel} reached!
</p>
)}
</div>
)}
</XPToastContext.Provider>
);
}

export function useXPToast(){
const context=useContext(XPToastContext);

if(!context){
throw new Error("useXPToast must be used inside XPToastProvider");
}

return context;
}