
import { LoaderCircle } from "lucide-react";

const variants = {
  primary: "bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/20",
  secondary: "bg-white/10 text-white hover:bg-white/15",
  outline: "border border-slate-600 text-white hover:border-sky-400 hover:text-sky-300",
  danger: "bg-red-500 text-white hover:bg-red-400",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] || variants.primary} ${className}`}
    >
      {loading && <LoaderCircle size={18} className="animate-spin" />}
      {children}
    </button>
  );
}
