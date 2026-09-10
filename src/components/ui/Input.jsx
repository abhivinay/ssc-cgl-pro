import { forwardRef, useId } from "react";
const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    className = "",
    containerClassName = "",
    id: providedId,
    ...props
  },
  ref,
) {
  const generatedId = useId(),
    id = providedId || generatedId,
    descriptionId = id + "-description";
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error || hint ? descriptionId : props["aria-describedby"]
        }
        className={
          "min-h-11 w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 " +
          className
        }
      />
      {(error || hint) && (
        <p
          id={descriptionId}
          role={error ? "alert" : undefined}
          className="mt-2 text-sm text-zinc-400"
        >
          {error || hint}
        </p>
      )}
    </div>
  );
});
export default Input;
