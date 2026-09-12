export default function GlassCard({
  children,
  className = "",
  hover = false,
  padding = "p-5",
  as: Component = "div",
  ...props
}) {
  return (
    <Component
      {...props}
      className={[
        "surface-panel",
        hover ? "surface-interactive" : "",
        padding,
        className,
      ].join(" ")}
    >
      {children}
    </Component>
  );
}
