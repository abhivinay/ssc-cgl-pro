import {ArrowUpRight,ShieldCheck,Brain,BookOpen,Target} from 'lucide-react';
import {useStudy} from '../../context/StudyContext';
import SyncIndicator from './SyncIndicator';
export default function SentinelEntry({onEnter}){
 const {studyState}=useStudy();
 const hour=new Date().getHours();
 return <main className="sentinel-entry command-entry">
  <header className="entry-header"><div className="sentinel-brand"><ShieldCheck size={30}/><div><strong>SSC SENTINEL</strong><p>Preparation command center</p></div></div><SyncIndicator/></header>
  <div className="entry-layout"><section className="entry-copy"><p className="eyebrow">FOCUS IS YOUR ADVANTAGE</p><h1>{hour<12?'Good morning':hour<17?'Good afternoon':'Good evening'},<br/><span>{studyState.name||'Abhi'}.</span></h1><p>Your preparation is ready. Continue to begin.</p><button className="primary-btn" onClick={onEnter}>Continue <ArrowUpRight size={19}/></button><span className="entry-caption">A clear mind. A focused plan. Consistent progress.</span></section>
  <section className="entry-console" aria-label="Your preparation flow"><div className="console-heading"><span>SESSION SEQUENCE</span><span>01 — 03</span></div><div className="entry-emblem" aria-hidden="true"><div/><ShieldCheck size={74} strokeWidth={1}/></div>{[[Brain,'01','Train your attention','Five short games to get ready.'],[BookOpen,'02','Learn with purpose','Follow your topic-by-topic study plan.'],[Target,'03','Turn practice into progress','Test, review and return stronger.']].map(([Icon,n,title,detail])=><div className="entry-step" key={n}><span>{n}</span><Icon size={21}/><div><h2>{title}</h2><p>{detail}</p></div></div>)}</section></div>
  <footer><span>SSC CGL · Your personal preparation space</span><span>FOCUS / TRAIN / STUDY</span></footer>
 </main>;
}
