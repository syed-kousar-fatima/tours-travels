
import { motion, useReducedMotion } from "framer-motion";
import { Plane } from "lucide-react";

export default function Loader({
  label = "Preparing your journey...",
  fullScreen = false
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex w-full flex-col items-center justify-center gap-5 bg-slate-950 px-4 ${
        fullScreen ? "fixed inset-0 z-[100] min-h-screen" : "min-h-[280px] py-16"
      }`}
    >
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-sky-400/20 bg-sky-400/10">
        {!reduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-3xl border border-sky-400/50"
            animate={{ scale: [1, 1.25], opacity: [0.7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-sky-300"
        >
          <Plane size={34} />
        </motion.div>
      </div>

      <div className="text-center">
        <p className="font-semibold text-white">{label}</p>
        <p className="mt-2 text-sm text-slate-400">
          Great journeys begin with a plan.
        </p>
      </div>

      <span className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-800">
        <motion.span
          className="block h-full rounded-full bg-sky-400"
          animate={reduceMotion ? undefined : { x: ["-100%", "150%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "45%" }}
        />
      </span>
    </div>
  );
}
