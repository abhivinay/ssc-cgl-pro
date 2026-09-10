const SIZES = {
  sm: "h-9 w-9 text-sm",
  md: "h-11 w-11 text-base",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
};

export default function Avatar({
  src,
  alt = "User",
  name = "",
  size = "md",
  status,
  className = "",
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`flex items-center justify-center overflow-hidden rounded-lg border border-white/10    font-bold text-cyan-200  ${
          SIZES[size] || SIZES.md
        }`}
      >
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <span>{initials || "U"}</span>
        )}
      </div>

      {status && null}
    </div>
  );
}
