
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    error,
    id,
    type = "text",
    className = "",
    leftIcon,
    ...props
  },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className={`w-full min-w-0 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={Boolean(error)}
          className={`min-h-12 w-full min-w-0 rounded-xl border bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 ${leftIcon ? "pl-10" : ""} ${error ? "border-red-400" : "border-slate-700"}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
