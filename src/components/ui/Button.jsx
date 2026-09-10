const variants = {
  primary: "button-primary",
  secondary: "button-secondary",
  ghost: "button-ghost",
  success: "button-primary",
  danger: "button-secondary",
  outline: "button-secondary",
};
export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        "button",
        variants[variant] || variants.primary,
        "button-" + size,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? "Loading…" : children}
    </button>
  );
}
