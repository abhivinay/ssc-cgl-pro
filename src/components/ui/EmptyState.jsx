import Button from "./Button";
export default function EmptyState({
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div className={"state-panel " + className}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
