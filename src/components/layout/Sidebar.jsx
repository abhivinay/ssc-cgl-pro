import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
const sections = [
  [
    "Workspace",
    [
      ["/dashboard", "Overview"],
      ["/missions", "Daily missions"],
      ["/brain-trainer", "Brain Trainer"],
    ],
  ],
  [
    "Study",
    [
      ["/syllabus", "Syllabus & learning"],
      ["/pyq-practice", "PYQ practice"],
      ["/mock-tests", "Mock tests"],
      ["/revision", "Revision"],
      ["/notes", "Notes"],
      ["/mistakes", "Mistakes"],
    ],
  ],
  [
    "Planning",
    [
      ["/planner", "Study planner"],
      ["/timer", "Study timer"],
      ["/focus-timer", "Focus session"],
    ],
  ],
  [
    "Insights",
    [
      ["/progress", "Progress"],
      ["/analytics", "Analytics"],
      ["/achievements", "Achievements"],
    ],
  ],
  [
    "Content Studio",
    [
      ["/content-studio/extractor", "PDF extraction"],
      ["/content-studio/review", "Review center"],
      ["/pyq-review", "PYQ review"],
    ],
  ],
  [
    "System",
    [
      ["/settings", "Data & recovery"],
      ...(import.meta.env.DEV ? [["/developer", "Developer tools"]] : []),
    ],
  ],
];

export default function Sidebar({ onNavigate }) {
  const navRef = useRef(null),
    indicatorRef = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const nav = navRef.current;
    const measure = () => {
      const active = nav.querySelector("a[aria-current=page]");
      if (!active || !active.offsetHeight) {
        indicatorRef.current.style.opacity = "0";
        return;
      }
      indicatorRef.current.style.opacity = "1";
      indicatorRef.current.style.height = active.offsetHeight + "px";
      indicatorRef.current.style.transform =
        "translateY(" + active.offsetTop + "px)";
    };
    measure();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    observer?.observe(nav);
    return () => observer?.disconnect();
  }, [pathname]);
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" onClick={onNavigate} className="sidebar-brand">
        <strong>SSC Sentinel</strong>
        <span>Preparation workspace</span>
      </NavLink>
      <nav ref={navRef} aria-label="Platform navigation">
        <span
          ref={indicatorRef}
          className="nav-active-indicator"
          aria-hidden="true"
        />
        {sections.map(([title, links]) => (
          <section className="nav-section" key={title}>
            <h2>{title}</h2>
            {links.map(([path, label]) => (
              <NavLink key={path} to={path} onClick={onNavigate}>
                {label}
              </NavLink>
            ))}
          </section>
        ))}
      </nav>
      <div className="sidebar-footer">SSC CGL preparation</div>
    </aside>
  );
}
