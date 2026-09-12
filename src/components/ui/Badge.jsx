export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}) {
  return (
    <span
      className={[
        "text-label",
        "text-label-" + variant,
        size === "sm" ? "text-xs" : "text-sm",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
