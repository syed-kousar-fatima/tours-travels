import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    location: "Bengaluru, India",
    trip: "Dubai holiday",
    rating: 5,
    text: "The website made it easy to explore my travel options. I could check destinations, compare available flights, and organize the details of my trip in one place.",
    initials: "AS"
  },
  {
    name: "Priya Reddy",
    location: "Hyderabad, India",
    trip: "Bali getaway",
    rating: 5,
    text: "I liked having flights, stays, and car rentals together. The layout was easy to understand on my phone and helped me plan the different parts of my holiday.",
    initials: "PR"
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai, India",
    trip: "Singapore trip",
    rating: 5,
    text: "The destination ideas gave me a great starting point for my trip. I could move from exploring a destination to checking the travel options without any confusion.",
    initials: "RM"
  },
  {
    name: "Ananya Kapoor",
    location: "New Delhi, India",
    trip: "Paris vacation",
    rating: 5,
    text: "I appreciate the clean design and straightforward booking search. It made comparing different travel choices feel more manageable.",
    initials: "AK"
  }
];

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return undefined;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const testimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden border-y border-white/5 bg-slate-900/60 py-14 text-white sm:py-20 lg:py-24 2xl:py-28"
    >
      <div className="container-fluid">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300 sm:text-sm">
            Stories from travellers
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl 2xl:text-6xl">
            What travellers say
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
            Discover what travellers appreciate about having their travel
            planning options together.
          </p>
        </div>

        <div
          className="mx-auto w-full max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Traveller testimonials"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-black/10 sm:p-8 lg:p-12">
            <Quote
              size={46}
              className="absolute right-5 top-5 text-sky-300/15 sm:right-8 sm:top-8 sm:size-16"
            />

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="relative z-10"
              aria-live="polite"
            >
              <div className="flex flex-wrap items-center gap-1.5">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill="currentColor"
                    className="text-amber-300"
                  />
                ))}

                <span className="ml-2 text-xs font-medium text-slate-400 sm:text-sm">
                  {testimonial.rating}.0 traveller rating
                </span>
              </div>

              <blockquote className="mt-6 max-w-4xl text-lg font-medium leading-8 text-slate-100 sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.5]">
                “{testimonial.text}”
              </blockquote>

              <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-sm font-extrabold text-sky-200 sm:size-14">
                    {testimonial.initials}
                  </div>

                  <div className="min-w-0">
                    <p className="break-words font-bold text-white">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 break-words text-sm text-slate-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="w-fit max-w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
                  <p className="text-xs text-slate-400">Trip inspiration</p>
                  <p className="mt-1 break-words text-sm font-semibold text-sky-200">
                    {testimonial.trip}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2" aria-label="Choose testimonial">
              {testimonials.map((item, index) => (
                <button
                  key={item.initials}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-pressed={activeIndex === index}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    activeIndex === index
                      ? "w-8 bg-sky-300"
                      : "w-2.5 bg-slate-600 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-2 text-xs font-medium tabular-nums text-slate-400 sm:text-sm">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
                className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:border-sky-300/40 hover:bg-sky-300/10 focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <ArrowLeft size={19} />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next testimonial"
                className="flex size-11 items-center justify-center rounded-xl bg-sky-300 text-slate-950 transition hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Sample testimonial content for layout demonstration.
          </p>
        </div>
      </div>
    </section>
  );
}