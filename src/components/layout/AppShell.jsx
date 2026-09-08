import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useStudy } from "../../context/StudyContext";
import Sidebar from "./Sidebar";
import SentinelEntry from "./SentinelEntry";
import StorageNotice from "./StorageNotice";

export default function AppShell({ children }) {
  const { pathname } = useLocation();
  const { studyState } = useStudy();
  const [entered, setEntered] = useState(() => { try { return sessionStorage.getItem("ssc-sentinel-entered") === "1"; } catch { return false; } });
  const [menuOpen, setMenuOpen] = useState(false);
  const recovery = pathname === "/settings";
  if (!entered && !recovery) return <><StorageNotice/><SentinelEntry onEnter={() => { try { sessionStorage.setItem("ssc-sentinel-entered", "1"); } catch { /* The entry remains usable without session storage. */ } setEntered(true); }}/></>;
  if (!studyState.brainTrainerCompleted && pathname !== "/brain-trainer" && !recovery) return <Navigate to="/brain-trainer" replace/>;
  if (pathname === "/brain-trainer") return <div className="standalone-brain"><StorageNotice/><header className="standalone-header"><span><ShieldCheck size={22}/> SSC Sentinel</span><Link to="/settings">Data & recovery</Link></header><main id="main-content">{children}</main></div>;
  return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to content</a><StorageNotice/>
    <header className="mobile-header"><Link to="/dashboard">SSC Sentinel</Link><button aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="app-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></header>
    <div id="app-navigation" className={`app-navigation ${menuOpen ? "is-open" : ""}`}><Sidebar onNavigate={() => setMenuOpen(false)}/></div>
    <main id="main-content" className="app-content" tabIndex={-1}><div key={pathname} className="route-content">{children}</div></main>
  </div>;
}
