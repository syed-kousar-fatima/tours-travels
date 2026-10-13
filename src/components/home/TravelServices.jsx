import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CarFront,
  Headset,
  Hotel,
  PlaneTakeoff,
  ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Flight booking",
    description:
      "Explore routes, compare available fares, and find flights for your journey.",
    path: "/flights",
    icon: PlaneTakeoff,
    number: "01"
  },
  {
    title: "Hotel reservations",
    description:
      "Browse accommodation options for city breaks, family holidays, and business trips.",
    path: "/hotels",
    icon: Hotel,
    number: "02"
  },
  {
    title: "Car rentals",
    description:
      "Find rental options for airport transfers, local travel, and road adventures.",
    path: "/cars",
    icon: CarFront,
    number: "03"
  }
];

const benefits = [
  {
    title: "Simple planning",
    description: "Explore essential travel options in one place.",
    icon: ShieldCheck
  },
  {
    title: "Flexible choices",
    description: "Compare options and choose what suits your plans.",
    icon: PlaneTakeoff
  },
  {
    title: "Travel assistance",
    description: "Find the contact and support details available on our site.",
    icon: Headset
  }
];

export default function TravelServices() {
  const navigate = useNavigate();

  return (
    <section
      id="travel-services"
      className="w-full bg-slate-950 py-14 text-white sm:py-20 lg:py-24 2xl:py-28"
    >
      <div className="container-fluid">
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300 sm:text-sm">
            Everything for your journey
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl 2xl:text-6xl">
            Travel services
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Plan the important parts of your trip with travel options designed
            to make your next journey easier to organize.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6 2xl:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-300/35 hover:bg-sky-300/[0.04] sm:p-7 2xl:p-9"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-sky-300/15 bg-sky-300/10 text-sky-300 transition group-hover:bg-sky-300 group-hover:text-slate-950">
                    <Icon size={27} />
                  </span>

                  <span className="text-sm font-bold tracking-widest text-slate-600">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold sm:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-400 sm:text-base">
                  {service.description}
                </p>

                <button
                  type="button"
                  onClick={() => navigate(service.path)}
                  className="mt-6 inline-flex w-fit max-w-full items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-sky-200 transition hover:border-sky-300/40 hover:bg-sky-300/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  Explore service
                  <ArrowUpRight size={17} />
                </button>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-10">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-4 sm:p-5"
              >
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300">
                  <Icon size={20} />
                </span>

                <div className="min-w-0">
                  <h4 className="font-semibold">{benefit.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById("travel-benefits")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-white"
        >
          Why travel with us
          <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
}