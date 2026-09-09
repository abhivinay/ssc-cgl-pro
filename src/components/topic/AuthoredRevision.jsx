import {useState} from "react";
import AuthoredLesson from "./AuthoredLesson";
import Button from "../ui/Button";
export default function AuthoredRevision({content,onComplete}){
const items=content?.revisionChecklist||content?.lastMinuteChecklist||content?.examChecklist||[];
const checklist=Array.isArray(items)?items:[];
const[checked,setChecked]=useState([]);
return <div className="space-y-5"><AuthoredLesson content={content}/><section className="card p-6 space-y-4"><h2 className="text-xl font-bold">Active recall checklist</h2><p className="text-zinc-400">Recall each point before checking it. This is a self-assessment, not a scored test.</p>{checklist.map((item,index)=><label key={index} className="flex gap-3 items-start"><input type="checkbox" className="mt-2" checked={checked.includes(index)} onChange={()=>setChecked(previous=>previous.includes(index)?previous.filter(value=>value!==index):[...previous,index])}/><span>{typeof item==="string"?item:item.text||item.title||item.skill}</span></label>)}<Button disabled={!checklist.length||checked.length!==checklist.length} onClick={()=>onComplete?.({completed:true,overallProgress:100})}>Complete revision</Button></section></div>;
}
