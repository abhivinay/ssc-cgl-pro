import {Link} from 'react-router-dom';
import {ArrowUpRight,Target,Clock,BookOpen,RotateCcw,Brain,Flame,CheckCircle2} from 'lucide-react';
import {useStudy} from '../context/StudyContext';
import useXP from '../hooks/useXP';
import SyncIndicator from '../components/layout/SyncIndicator';
export default function Dashboard(){
 const {studyState,dashboard,dailyMission,dueRevisions}=useStudy();
 const {totalXP,level,xpToNextLevel}=useXP();
 const missions=Array.isArray(dailyMission)?dailyMission:[];
 const topics=Array.isArray(studyState.topics)?studyState.topics:[];
 const complete=missions.filter(m=>m.completed).length;
 const hour=new Date().getHours();
 const subjects=[['quant','Quantitative Aptitude'],['reasoning','Reasoning'],['english','English'],['gk','General Awareness']];
 return <div className="command-dashboard">
  <header className="command-title"><div><p className="eyebrow">YOUR DAILY BRIEFING</p><h1>{hour<12?'Good morning':hour<17?'Good afternoon':'Good evening'}, {studyState.name||'Abhi'}<span>.</span></h1><p>One focused session at a time. Make today count.</p></div><SyncIndicator/></header>
  <section className="command-metrics" aria-label="Your progress">
   {[[Clock,'Study today',`${Math.max(0,Number(dashboard.studyMinutes)||0)} min`,'Focused time recorded'],[Target,'Mission progress',`${complete} / ${missions.length}`,'Topics completed today'],[Flame,'Current streak',`${dashboard.streak||0} days`,'Build your consistency'],[RotateCcw,'Revision queue',dueRevisions?.length||0,'Ready for recall']].map(([Icon,label,value,detail])=><div className="command-metric" key={label}><span><Icon size={17}/>{label}</span><strong>{value}</strong><small>{detail}</small></div>)}
  </section>
  <div className="command-columns">
   <section className="command-panel mission-panel"><div className="panel-heading"><span className="eyebrow">01 / NEXT ACTION</span><span className="status-pill">{studyState.brainTrainerCompleted?'Study unlocked':'Warm-up pending'}</span></div><div className="mission-orbit" aria-hidden="true"><Target size={78}/></div><h2>{studyState.brainTrainerCompleted?'Your next focused session.':'Prepare your mind.'}</h2><p>{studyState.brainTrainerCompleted?'Follow your daily mission, learn one topic and check what you remember.':'Complete your five-game warm-up to open today’s study workspace.'}</p><Link className="primary-btn" to={studyState.brainTrainerCompleted?'/missions':'/brain-trainer'}>{studyState.brainTrainerCompleted?'Open today’s mission':'Start brain training'}<ArrowUpRight size={18}/></Link><div className="mission-foot"><CheckCircle2 size={16}/><span>{complete} completed · {Math.max(0,missions.length-complete)} remaining today</span></div></section>
   <section className="command-panel"><div className="panel-heading"><h2>Subject readiness</h2><Link to="/syllabus" aria-label="Open syllabus"><ArrowUpRight size={19}/></Link></div><p className="panel-description">Completed topics in your current syllabus.</p><div className="subject-rows">{subjects.map(([id,label])=>{const list=topics.filter(t=>String(t.subject).toLowerCase()===id||(id==='gk'&&['ga','general awareness'].includes(String(t.subject).toLowerCase())));const done=list.filter(t=>t.completed).length;const pct=list.length?Math.round(done/list.length*100):0;return <Link to="/syllabus" className="subject-row" key={id}><div><span>{label}</span><small>{done} / {list.length} topics</small></div><div className="command-track"><i style={{width:`${pct}%`}}/></div></Link>;})}</div><div className="rank-row"><span>LEVEL <strong>{level}</strong></span><div><strong>{totalXP.toLocaleString()} XP</strong><small>{xpToNextLevel} XP to next level</small></div></div></section>
  </div>
  <section className="command-panel"><div className="panel-heading"><div><p className="eyebrow">02 / YOUR TOOLS</p><h2>Choose your next move</h2></div><span className="muted">Study with intention</span></div><div className="command-tools">{[[BookOpen,'PYQ Practice','Explore the 2019–2025 question bank.','/pyq-practice'],[RotateCcw,'Revision','Bring earlier learning back to mind.','/revision'],[Clock,'Focus timer','Protect a distraction-free session.','/focus-timer'],[Brain,'Brain trainer','Train attention and recall.','/brain-trainer']].map(([Icon,title,description,path])=><Link to={path} className="command-tool" key={path}><Icon size={23}/><strong>{title}</strong><p>{description}</p><ArrowUpRight size={17}/></Link>)}</div></section>
 </div>;
}
