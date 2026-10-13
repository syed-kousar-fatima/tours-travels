
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  return (
    <div
      className={`mb-8 w-full sm:mb-12 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl 2xl:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
