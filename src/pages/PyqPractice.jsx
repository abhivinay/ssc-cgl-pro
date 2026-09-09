import {useEffect,useMemo,useState} from 'react';
const base=`${import.meta.env.BASE_URL}pyq-master/`;
export default function PyqPractice(){
 const [rows,setRows]=useState([]),[error,setError]=useState(''),[subject,setSubject]=useState(''),[year,setYear]=useState(''),[topic,setTopic]=useState(''),[index,setIndex]=useState(0),[choice,setChoice]=useState(''),[reveal,setReveal]=useState(false),[imageFailed,setImageFailed]=useState(false);
 useEffect(()=>{const controller=new AbortController();fetch(`${base}questions.json`,{signal:controller.signal}).then(r=>{if(!r.ok)throw Error('Question bank could not load. Please reload.');return r.json();}).then(setRows).catch(e=>{if(e.name!=='AbortError')setError(e.message);});return()=>controller.abort();},[]);
 const subjects=useMemo(()=>[...new Set(rows.map(q=>q.subject))].sort(),[rows]);
 const topics=useMemo(()=>[...new Set(rows.filter(q=>!subject||q.subject===subject).map(q=>q.topic))].sort(),[rows,subject]);
 const filtered=useMemo(()=>rows.filter(q=>!q.hold&&(!subject||q.subject===subject)&&(!year||String(q.source.year)===year)&&(!topic||q.topic===topic)),[rows,subject,year,topic]);
 const q=filtered[index];
 function reset(){setIndex(0);setChoice('');setReveal(false);setImageFailed(false);}
 function move(delta){setIndex(i=>i+delta);setChoice('');setReveal(false);setImageFailed(false);}
 const blocked=q?.visualUnavailable||imageFailed;
 return <div className="mx-auto max-w-4xl space-y-6 pb-10"><header><h1 className="text-3xl font-bold">Previous year questions</h1><p className="mt-2 text-zinc-400">2019–2025 · 20,600 questions · 248 HOLD questions excluded from practice.</p><p className="text-sm text-zinc-400">Source verification is incomplete. Questions requiring unavailable visuals cannot be answered here.</p></header>
 <div className="grid gap-3 sm:grid-cols-3">{[['Subject',subject,subjects,v=>{setSubject(v);setTopic('');reset();}],['Year',year,['2019','2020','2021','2022','2023','2024','2025'],v=>{setYear(v);reset();}],['Topic',topic,topics,v=>{setTopic(v);reset();}]].map(([label,value,options,change])=><label key={label}>{label}<select className="mt-1 w-full rounded-xl bg-zinc-900 p-3" value={value} onChange={e=>change(e.target.value)}><option value="">All {label.toLowerCase()}s</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>)}</div>
 {error?<p role="alert">{error}</p>:!rows.length?<p role="status">Loading question bank…</p>:!q?<p>No questions match these filters.</p>:<article className="space-y-5 rounded-2xl border border-zinc-700 bg-zinc-900 p-5 sm:p-8">
 <p className="text-sm text-cyan-200">{index+1} / {filtered.length.toLocaleString()} · {q.source.date} · {q.source.shift} · Question {q.source.questionNumber}</p>
 <h2 className="whitespace-pre-wrap text-xl">{q.question}</h2>
 {q.images.filter(p=>!Object.values(q.optionImages).includes(p)).map(p=><img className="max-h-80 max-w-full rounded bg-white object-contain" key={p} src={base+p} alt="Question figure" onError={()=>setImageFailed(true)}/>)}
 {blocked&&<p role="status" className="text-amber-200">Required visual content is unavailable or needs review. Skip this question until its assets are recovered.</p>}
 <fieldset disabled={blocked||reveal} className="space-y-3"><legend className="sr-only">Choose your answer</legend>{q.options.map((o,i)=>{const letter='ABCD'[i];return <label className={`flex items-start gap-3 rounded-xl border p-4 ${choice===letter?'border-cyan-300':'border-zinc-700'}`} key={letter}><input type="radio" name={q.id} checked={choice===letter} onChange={()=>setChoice(letter)}/><span>{letter}. {q.optionImages[letter]?<img className="max-h-40 max-w-full bg-white" src={base+q.optionImages[letter]} alt={`Option ${letter}`} onError={()=>setImageFailed(true)}/>:o}</span></label>;})}</fieldset>
 {!reveal?<button className="rounded-xl bg-cyan-300 px-5 py-3 text-black disabled:opacity-40" disabled={!choice||blocked} onClick={()=>setReveal(true)}>Check answer</button>:<p role="status" className="text-cyan-200">{choice===q.answer?'Correct.':'Incorrect.'} Answer: {q.answer}. {q.options['ABCD'.indexOf(q.answer)]}</p>}
 <div className="flex justify-between"><button disabled={index===0} className="p-3 disabled:opacity-40" onClick={()=>move(-1)}>Previous</button><button disabled={index+1>=filtered.length} className="p-3 disabled:opacity-40" onClick={()=>move(1)}>Next question</button></div>
 </article>}</div>;
}
