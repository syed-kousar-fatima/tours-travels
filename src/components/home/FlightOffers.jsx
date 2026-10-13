import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, PlaneTakeoff, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const offers = [
  {
    id: "international",
    label: "International escape",
    title: "Your next adventure awaits",
    description:
      "Explore international destinations and compare available flight options for your next holiday.",
    destination: "Dubai",
    price: "Explore international fares",
    icon: PlaneTakeoff,
    style: "from-sky-500/20 via-blue-500/10 to-indigo-500/10",
    accent: "text-sky-300",
    tag: "GO FURTHER"
  },
  {
    id: "weekend",
    label: "Weekend getaway",
    title: "Make your weekend count",
    description:
      "Turn a few free days into a refreshing city break or a spontaneous trip.",
    destination: "Goa",
    price: "Discover getaway fares",
    icon: Sparkles,
    style: "from-fuchsia-500/20 via-pink-500/10 to-rose-500/10",
    accent: "text-pink-300",
    tag: "QUICK ESCAPE"
  },
  {
    id: "family",
    label: "Holiday planning",
    title: "More memories together",
    description:
      "Start planning your next family holiday by exploring routes and comparing fares.",
    destination: "Singapore",
    price: "Explore holiday fares",
    icon: BadgePercent,
    style: "from-emerald-500/20 via-teal-500/10 to-cyan-500/10",
    accent: "text-emerald-300",
    tag: "TRAVEL TOGETHER"
  }
];

export default function FlightOffers() {
  const navigate = useNavigate();

  const exploreOffer = (destination) => {
    navigate(`/flights?${new URLSearchParams({ to: destination })}`);
  };

  return (
    <section
      id="flight-offers"
      className="w-full border-y border-white/5 bg-slate-900/60 py-14 text-white sm:py-20 lg:py-24 2xl:py-28"
    >
      <div className="container-fluid">
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300 sm:text-sm">
            Offers and inspiration
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl 2xl:text-6xl">
            Flight packages & offers
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Discover trip ideas and explore flight options for your next
            adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 2xl:gap-7">
          {offers.map((offer, index) => {
            const Icon = offer.icon;

            return (
              <motion.article
                key={offer.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${offer.style} p-5 sm:p-7 lg:p-6 2xl:p-9`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-xs font-bold tracking-wide text-slate-200">
                    <span className={`size-2 shrink-0 rounded-full bg-current ${offer.accent}`} />
                    {offer.tag}
                  </span>

                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/30">
                    <Icon size={23} className={offer.accent} />
                  </span>
                </div>

                <p className={`mt-7 text-sm font-semibold ${offer.accent}`}>
                  {offer.label}
                </p>

                <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
                  {offer.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-slate-300 sm:text-base">
                  {offer.description}
                </p>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="mb-4 text-sm font-semibold text-white">
                    {offer.price}
                  </p>

                  <button
                    type="button"
                    onClick={() => exploreOffer(offer.destination)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Explore flights
                    <ArrowRight size={17} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}