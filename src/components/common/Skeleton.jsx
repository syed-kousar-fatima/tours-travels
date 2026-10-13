
export default function Skeleton({ count = 3, variant = "card" }) {
  return (
    <div
      className={variant === "card" ? "travel-grid" : "flex flex-col gap-3"}
      aria-label="Loading content"
      aria-busy="true"
    >
      {Array.from({ length: Math.max(1, count) }, (_, index) => (
        <div
          key={index}
          className={`animate-pulse overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 ${variant === "card" ? "min-w-0 p-3" : "p-4"}`}
        >
          {variant === "card" && (
            <div className="mb-4 aspect-[16/10] rounded-xl bg-slate-800" />
          )}
          <div className="mb-3 h-4 w-3/4 rounded bg-slate-800" />
          <div className="mb-5 h-3 w-1/2 rounded bg-slate-800" />
          <div className="h-10 rounded-lg bg-slate-800" />
        </div>
      ))}
    </div>
  );
}
