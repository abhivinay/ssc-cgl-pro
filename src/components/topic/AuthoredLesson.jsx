const label = key => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, value => value.toUpperCase());
function Value({ value, depth = 0 }) {
  if (value == null || typeof value === "boolean" || depth > 6) return null;
  if (typeof value !== "object") return <p className="leading-8 text-zinc-300 whitespace-pre-line">{String(value)}</p>;
  if (Array.isArray(value)) return <div className="space-y-3">{value.map((item, i) => <Value key={item?.id || i} value={item} depth={depth + 1}/>)}</div>;
  return <div className="space-y-3">{Object.entries(value).filter(([key]) => !["id", "type", "image", "imagePath", "visuals", "status", "completion"].includes(key)).map(([key, item]) => <div key={key}>{key === "title" ? <h3 className="text-xl font-semibold text-cyan-200">{item}</h3> : <><p className="text-sm font-semibold text-zinc-400">{label(key)}</p><Value value={item} depth={depth + 1}/></>}</div>)}</div>;
}
export default function AuthoredLesson({ content }) {
  if (!content) return <p>Content is not available yet.</p>;
  return <article className="card p-6 md:p-8 space-y-8"><Value value={content}/></article>;
}
