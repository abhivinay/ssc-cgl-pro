import { useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { useStudy } from "../../context/StudyContext";
import Sidebar from "./Sidebar";
import SentinelEntry from "./SentinelEntry";
import StorageNotice from "./StorageNotice";
export default function AppShell({ children }) {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const { studyState } = useStudy();
  const [entered, setEntered] = useState(() => {
    try {
      return sessionStorage.getItem("ssc-sentinel-entered") === "1";
    } catch {
      return false;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef(null),
    menuRef = useRef(null);
  const recovery = pathname === "/settings";
  useEffect(() => {
    mainRef.current?.scrollIntoView?.({ block: "start", behavior: "instant" });
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menuOpen]);
  if (!entered && !recovery)
    return (
      <>
        <StorageNotice />
        <SentinelEntry
          onEnter={() => {
            try {
              sessionStorage.setItem("ssc-sentinel-entered", "1");
            } catch {
              /* Session storage is optional. */
            }
            setEntered(true);
          }}
        />
      </>
    );
  if (
    !studyState.brainTrainerCompleted &&
    pathname !== "/brain-trainer" &&
    !recovery
  )
    return <Navigate to="/brain-trainer" replace />;
  if (pathname === "/brain-trainer")
    return (
      <div className="standalone-brain">
        <StorageNotice />
        <header className="standalone-header">
          <Link to="/dashboard">SSC Sentinel</Link>
          <Link to="/settings">Data & recovery</Link>
        </header>
        <main id="main-content" ref={mainRef} tabIndex={-1}>
          {children}
        </main>
      </div>
    );
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <StorageNotice />
      <header className="mobile-header">
        <Link to="/dashboard">SSC Sentinel</Link>
        <button
          ref={menuRef}
          aria-expanded={menuOpen}
          aria-controls="app-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close navigation" : "Navigation"}
        </button>
      </header>
      <div
        id="app-navigation"
        className={"app-navigation " + (menuOpen ? "is-open" : "")}
      >
        <Sidebar
          onNavigate={() => {
            setMenuOpen(false);
            mainRef.current?.focus({ preventScroll: true });
          }}
        />
      </div>
      <main
        id="main-content"
        className="app-content"
        ref={mainRef}
        tabIndex={-1}
      >
        <div className="workspace-bar">
          <span>Preparation workspace</span>
          <Link to="/pyq-practice">Open PYQ practice</Link>
        </div>
        <div
          key={pathname}
          className="route-content"
          data-direction={navigationType === "POP" ? "back" : "forward"}
        >
          {children}
        </div>
        <footer className="workspace-footer">
          <span>SSC Sentinel</span>
          <Link to="/settings">Data & recovery</Link>
        </footer>
      </main>
    </div>
  );
}
