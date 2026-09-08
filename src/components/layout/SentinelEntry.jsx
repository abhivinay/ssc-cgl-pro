import { ArrowUpRight, ShieldCheck } from "lucide-react";
export default function SentinelEntry({ onEnter }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return <main className="sentinel-entry">
    <div className="sentinel-waves" aria-hidden="true"><i/><i/><i/></div>
    <header className="sentinel-brand"><ShieldCheck size={32}/><div><strong>SSC Sentinel</strong><p>Preparation command center</p></div></header>
    <section className="sentinel-greeting"><p className="eyebrow">A little focus. Every day.</p><h1>{greeting},<br/><span>Abhi.</span></h1><p>Your preparation is ready.<br/>Continue to begin.</p></section>
    <footer><span>01 / Focus → Train → Study</span><button className="sentinel-continue" onClick={onEnter}>Continue <ArrowUpRight size={22}/></button></footer>
  </main>;
}
