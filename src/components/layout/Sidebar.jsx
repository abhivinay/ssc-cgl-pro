import { NavLink } from "react-router-dom";
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
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" onClick={onNavigate} className="sidebar-brand">
        <strong>SSC Sentinel</strong>
        <span>Preparation workspace</span>
      </NavLink>
      <nav aria-label="Platform navigation">
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
