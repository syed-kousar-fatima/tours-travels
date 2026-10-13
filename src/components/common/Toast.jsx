
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X
} from "lucide-react";

const ToastContext = createContext(null);

const toastStyles = {
  success: {
    icon: CheckCircle2,
    color: "border-emerald-400/30 text-emerald-300"
  },
  error: {
    icon: AlertCircle,
    color: "border-rose-400/30 text-rose-300"
  },
  warning: {
    icon: TriangleAlert,
    color: "border-amber-400/30 text-amber-300"
  },
  info: {
    icon: Info,
    color: "border-sky-400/30 text-sky-300"
  }
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = "info", duration = 3500) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    setToasts((current) => [
      ...current.slice(-3),
      { id, message, type, duration }
    ]);

    return id;
  }, []);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      window.setTimeout(() => dismissToast(toast.id), toast.duration)
    );

    return () => timers.forEach(window.clearTimeout);
  }, [toasts, dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      <div
        className="pointer-events-none fixed right-4 top-4 z-[200] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6"
        aria-label="Notifications"
      >
        {toasts.map((toast) => {
          const style = toastStyles[toast.type] || toastStyles.info;
          const Icon = style.icon;

          return (
            <div
              key={toast.id}
              role={toast.type === "error" ? "alert" : "status"}
              aria-live={toast.type === "error" ? "assertive" : "polite"}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border bg-slate-900/95 p-4 text-sm shadow-2xl shadow-black/30 backdrop-blur-xl ${style.color}`}
            >
              <Icon size={21} className="mt-0.5 shrink-0" />

              <p className="min-w-0 flex-1 break-words leading-6 text-slate-100">
                {toast.message}
              </p>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="rounded-lg p-1 text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <X size={17} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
