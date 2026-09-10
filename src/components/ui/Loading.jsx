export default function Loading({ label = "Loading…", className = "" }) {
  return (
    <div role="status" className={"state-panel " + className}>
      <span className="loading-line" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
