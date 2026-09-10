import {useEffect,useMemo,useState} from 'react';
import usePersistentState from '../hooks/usePersistentState';
const initAttempts=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
const initPosition=value=>({subject:typeof value?.subject==='string'?value.subject:'',year:typeof value?.year==='string'?value.year:'',topic:typeof value?.topic==='string'?value.topic:'',index:Number.isSafeInteger(value?.index)&&value.index>=0?value.index:0});
const base=`${import.meta.env.BASE_URL}pyq-master/`;
export default function PyqPractice(){
 const [position,setPosition]=usePersistentState('ssc-pyq-position',initPosition);
 const [attempts,setAttempts]=usePersistentState('ssc-pyq-attempts',initAttempts);
 const {subject,year,topic,index}=position;
 const [rows,setRows]=useState([]),[error,setError]=useState(''),[choice,setChoice]=useState(''),[reveal,setReveal]=useState(false),[imageFailed,setImageFailed]=useState(false),[retry,setRetry]=useState(0);
 const setSubject=v=>setPosition(p=>({...p,subject:v})),setYear=v=>setPosition(p=>({...p,year:v})),setTopic=v=>setPosition(p=>({...p,topic:v})),setIndex=v=>setPosition(p=>({...p,index:typeof v==='function'?v(p.index):v}));
 useEffect(()=>{const controller=new AbortController();fetch(`${base}questions.json`,{signal:controller.signal}).then(r=>{if(!r.ok)throw Error('Question bank could not load. Please retry.');return r.json();}).then(setRows).catch(e=>{if(e.name!=='AbortError')setError(e.message);});return()=>controller.abort();},[retry]);
 const subjects=useMemo(()=>[...new Set(rows.map(q=>q.subject))].sort(),[rows]);
 const topics=useMemo(()=>[...new Set(rows.filter(q=>!subject||q.subject===subject).map(q=>q.topic))].sort(),[rows,subject]);
 const filtered=useMemo(()=>rows.filter(q=>!q.hold&&(!subject||q.subject===subject)&&(!year||String(q.source.year)===year)&&(!topic||q.topic===topic)),[rows,subject,year,topic]);
 const safeIndex=Math.min(Math.max(0,Number(index)||0),Math.max(0,filtered.length-1));
 const q=filtered[safeIndex];
 const [previousQuestionId,setPreviousQuestionId]=useState(q?.id);
 if(previousQuestionId!==q?.id){setPreviousQuestionId(q?.id);setChoice('');setReveal(false);setImageFailed(false);}
 const previous=q?attempts[q.id]:null;
 const shown=Boolean(previous)||reveal;
 const selected=previous?.choice||choice;
 function reset(){setIndex(0);setChoice('');setReveal(false);setImageFailed(false);}
 function move(delta){setIndex(safeIndex+delta);setChoice('');setReveal(false);setImageFailed(false);}
 const blocked=q?.visualUnavailable||imageFailed;
 return <div className="mx-auto max-w-4xl space-y-6 pb-10"><header><h1 className="text-3xl font-bold">Previous year questions</h1><p className="mt-2 text-zinc-400">2019–2025 · 20,600 questions · 248 HOLD questions excluded from practice.</p><p className="text-sm text-zinc-400">Source verification is incomplete. Questions requiring unavailable visuals cannot be answered here.</p></header>
 <div className="grid gap-3 sm:grid-cols-3">{[['Subject',subject,subjects,v=>{setSubject(v);setTopic('');reset();}],['Year',year,['2019','2020','2021','2022','2023','2024','2025'],v=>{setYear(v);reset();}],['Topic',topic,topics,v=>{setTopic(v);reset();}]].map(([label,value,options,change])=><label key={label}>{label}<select className="mt-1 w-full rounded-xl bg-zinc-900 p-3" value={value} onChange={e=>change(e.target.value)}><option value="">All {label.toLowerCase()}s</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>)}</div>
 <p className="pyq-summary">{Object.keys(attempts).length} answered · {Object.values(attempts).filter(a=>a.correct).length} correct · Answers and position saved on this device</p>
 {error?<div role="alert">{error}<button className="primary-btn" onClick={()=>{setError('');setRetry(v=>v+1);}}>Retry loading</button></div>:!rows.length?<p role="status">Loading question bank…</p>:!q?<p>No questions match these filters.</p>:<article className="space-y-5 rounded-2xl border border-zinc-700 bg-zinc-900 p-5 sm:p-8">
 <p className="text-sm text-cyan-200">{safeIndex+1} / {filtered.length.toLocaleString()} · {q.source.date} · {q.source.shift} · Question {q.source.questionNumber}</p>
 <h2 className="whitespace-pre-wrap text-xl">{q.question}</h2>
 {q.images.filter(p=>!Object.values(q.optionImages).includes(p)).map(p=><img className="max-h-80 max-w-full rounded bg-white object-contain" key={p} src={base+p} alt="Question figure" onError={()=>setImageFailed(true)}/>)}
 {blocked&&<p role="status" className="text-amber-200">Required visual content is unavailable or needs review. Skip this question until its assets are recovered.</p>}
 <fieldset disabled={blocked||shown} className="space-y-3"><legend className="sr-only">Choose your answer</legend>{q.options.map((o,i)=>{const letter='ABCD'[i];return <label className={`flex items-start gap-3 rounded-xl border p-4 ${selected===letter?'border-cyan-300':'border-zinc-700'}`} key={letter}><input type="radio" name={q.id} checked={selected===letter} onChange={()=>setChoice(letter)}/><span>{letter}. {q.optionImages[letter]?<img className="max-h-40 max-w-full bg-white" src={base+q.optionImages[letter]} alt={`Option ${letter}`} onError={()=>setImageFailed(true)}/>:o}</span></label>;})}</fieldset>
 {!shown?<button className="rounded-xl bg-cyan-300 px-5 py-3 text-black disabled:opacity-40" disabled={!choice||blocked} onClick={()=>{try{setAttempts(a=>({...a,[q.id]:{choice,correct:choice===q.answer,answeredAt:new Date().toISOString()}}));setReveal(true);}catch{setError('Unable to save your answer. Open Data & recovery to check storage.');}}}>Check answer</button>:<p role="status" className="text-cyan-200">{selected===q.answer?'Correct.':'Incorrect.'} Answer: {q.answer}. {q.options['ABCD'.indexOf(q.answer)]}</p>}
 <div className="flex justify-between"><button disabled={safeIndex===0} className="p-3 disabled:opacity-40" onClick={()=>move(-1)}>Previous</button><button disabled={safeIndex+1>=filtered.length} className="p-3 disabled:opacity-40" onClick={()=>move(1)}>Next question</button></div>
 </article>}</div>;
}
