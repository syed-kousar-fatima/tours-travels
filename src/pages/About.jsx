
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Compass,
  Plane,
  Hotel,
  CarFront,
  MapPin,
  Users,
  Award,
  MoveUpRight,
  CheckCircle2,
  Star,
  Route,
  Luggage,
  Clock3
} from "lucide-react";

const values = [
  {
    icon: HeartHandshake,
    title: "Travel with care",
    description:
      "We put travelers first by making trip planning clear, welcoming, and convenient.",
    number: "01"
  },
  {
    icon: ShieldCheck,
    title: "Trust and transparency",
    description:
      "Clear booking information helps travelers understand their choices before proceeding.",
    number: "02"
  },
  {
    icon: Compass,
    title: "Explore with confidence",
    description:
      "Discover destinations, compare travel options, and plan your next adventure in one place.",
    number: "03"
  },
  {
    icon: Sparkles,
    title: "A better experience",
    description:
      "We aim to make every step, from searching to reviewing a booking, feel straightforward.",
    number: "04"
  }
];

const services = [
  {
    icon: Plane,
    title: "Flight bookings",
    description:
      "Explore flight options and compare airlines, routes, schedules, and sample fares.",
    link: "/flights",
    number: "01",
    image: ""
  },
  {
    icon: Hotel,
    title: "Hotel stays",
    description:
      "Browse accommodation options to find a comfortable stay for your next adventure.",
    link: "/hotels",
    number: "02",
    image: ""
  },
  {
    icon: CarFront,
    title: "Car rentals",
    description:
      "Discover rental vehicles for city journeys, road trips, and business travel.",
    link: "/cars",
    number: "03",
    image: ""
  }
];

const journeySteps = [
  {
    icon: Plane,
    title: "Find your route",
    detail: "Explore available flight options",
    number: "01",
    link: "/flights"
  },
  {
    icon: Hotel,
    title: "Choose your stay",
    detail: "Discover hotels and rooms",
    number: "02",
    link: "/hotels"
  },
  {
    icon: CarFront,
    title: "Keep moving",
    detail: "Explore rental vehicles",
    number: "03",
    link: "/cars"
  }
];

const containerMotion = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const revealMotion = {
  hidden: {
    opacity: 0,
    y: 35
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

function BackgroundImagePlaceholder({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-20 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#071a30] to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(37,99,235,0.15),transparent_40%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:56px_56px]" />
    </div>
  );
}

function AnimatedCounter({ value, suffix = "", label, icon: Icon }) {
  const [count, setCount] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setCount(value);
      return undefined;
    }

    let frame;
    let startTime;
    const duration = 1400;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [value, reduceMotion]);

  return (
    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/15 bg-sky-400/10 text-sky-300 sm:size-12">
        <Icon size={21} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {count}
          {suffix}
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="w-full min-w-0 overflow-clip bg-slate-950 text-white">
      <section className="relative isolate flex min-h-[640px] w-full items-center overflow-hidden px-4 py-16 sm:min-h-[680px] sm:px-6 sm:py-20 md:px-8 lg:min-h-[740px] lg:px-10 lg:py-24 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <BackgroundImagePlaceholder />

        <div className="pointer-events-none absolute -right-24 top-10 -z-10 size-64 animate-pulse rounded-full bg-sky-400/10 blur-3xl sm:size-96" />
        <div className="pointer-events-none absolute -bottom-32 left-[20%] -z-10 size-80 rounded-full bg-blue-500/10 blur-3xl sm:size-[30rem]" />

        <motion.div
          className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16 2xl:gap-24"
          variants={containerMotion}
          initial="hidden"
          animate="visible"
        >
          <div className="min-w-0">
            <motion.div variants={revealMotion}>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[0.08] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
                <Globe2 size={15} className="shrink-0" />
                About our journey
              </span>
            </motion.div>

            <motion.h1
              variants={revealMotion}
              className="mt-6 text-[clamp(2.35rem,5.2vw,6.5rem)] font-extrabold leading-[1.08] tracking-[-0.045em] text-white"
            >
              Every journey starts with{" "}
              <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                a great plan.
              </span>
            </motion.h1>

            <motion.p
              variants={revealMotion}
              className="mt-6 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8 lg:text-lg"
            >
              Aeroplane Tours & Travels brings flights, hotels, and car rental
              discovery together in one place, helping you plan your next
              journey with greater clarity and convenience.
            </motion.p>

            <motion.div
              variants={revealMotion}
              className="mt-8 flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row"
            >
              <Link
                to="/"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-1 hover:bg-sky-400 hover:shadow-sky-400/30 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950 min-[480px]:w-auto sm:px-6"
              >
                Start exploring
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-sky-400/[0.06] focus:outline-none focus:ring-2 focus:ring-sky-300 min-[480px]:w-auto sm:px-6"
              >
                Contact our team
                <MoveUpRight size={17} />
              </Link>
            </motion.div>

            <motion.div
              variants={revealMotion}
              className="mt-10 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 min-[420px]:grid-cols-2 sm:gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Simple discovery</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Travel options in one place
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                  <Globe2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Made for every screen</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Responsive travel planning
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={revealMotion}
            className="relative mx-auto w-full min-w-0 max-w-2xl lg:max-w-none"
          >
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, -12, 0],
                      rotate: [0, 2, 0]
                    }
              }
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="pointer-events-none absolute -right-3 -top-5 z-10 flex size-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-slate-900/90 text-sky-300 shadow-xl shadow-sky-500/10 sm:-right-5 sm:size-16"
            >
              <Plane size={27} />
            </motion.div>

            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-400/15 to-blue-500/5 blur-2xl sm:-inset-5" />

            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/85 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[2rem] sm:p-6 lg:p-7 xl:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
              <div className="absolute -right-16 -top-16 size-52 rounded-full bg-sky-400/[0.08] blur-3xl" />

              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300 sm:text-xs sm:tracking-[0.2em]">
                    Your journey, your way
                  </p>
                  <h2 className="mt-3 text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
                    One place to plan more.
                  </h2>
                  <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
                    Start with an idea. Explore the possibilities.
                  </p>
                </div>

                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/15 bg-sky-400/10 text-sky-300 sm:size-12 sm:rounded-2xl">
                  <Sparkles size={23} />
                </div>
              </div>

              <div className="relative mt-6 space-y-3 sm:mt-8">
                {journeySteps.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={reduceMotion ? false : { opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: reduceMotion ? 0 : 0.4 + index * 0.15
                      }}
                      whileHover={reduceMotion ? {} : { x: 5, scale: 1.01 }}
                    >
                      <Link
                        to={item.link}
                        className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 transition-colors duration-300 hover:border-sky-400/30 hover:bg-sky-400/[0.05] sm:gap-4 sm:p-4"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300 transition duration-300 group-hover:bg-sky-400 group-hover:text-slate-950 sm:size-12">
                          <Icon size={21} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-white sm:text-base">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                            {item.detail}
                          </p>
                        </div>

                        <span className="hidden text-xs font-bold text-slate-600 min-[380px]:block">
                          {item.number}
                        </span>

                        <ArrowRight
                          size={17}
                          className="shrink-0 text-slate-500 transition duration-300 group-hover:translate-x-1 group-hover:text-sky-300"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                whileHover={reduceMotion ? {} : { scale: 1.015 }}
                className="relative mt-4 flex items-start gap-3 rounded-2xl border border-sky-400/15 bg-sky-400/[0.05] p-3 sm:mt-5 sm:items-center sm:p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                  <Sparkles size={19} />
                </div>
                <p className="text-xs leading-6 text-slate-300 sm:text-sm">
                  Your next adventure begins with exploring the possibilities.
                </p>
              </motion.div>
            </div>

            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, 9, 0]
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-xl sm:flex lg:-left-7"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <CheckCircle2 size={21} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Plan with clarity</p>
                <p className="mt-1 text-xs text-slate-400">
                  Explore at your own pace
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden border-y border-white/[0.06] bg-slate-900/50 px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-10 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <motion.div
          className="grid grid-cols-1 gap-7 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-6 2xl:gap-12"
          variants={containerMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={revealMotion}>
            <AnimatedCounter
              value={3}
              suffix="+"
              label="Travel categories"
              icon={Globe2}
            />
          </motion.div>
          <motion.div variants={revealMotion}>
            <AnimatedCounter
              value={4}
              suffix=""
              label="Guiding values"
              icon={HeartHandshake}
            />
          </motion.div>
          <motion.div variants={revealMotion}>
            <AnimatedCounter
              value={100}
              suffix="%"
              label="Responsive design goal"
              icon={Award}
            />
          </motion.div>
          <motion.div variants={revealMotion}>
            <AnimatedCounter
              value={1}
              suffix=" place"
              label="For exploring travel options"
              icon={Route}
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative w-full px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-24 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <div className="pointer-events-none absolute left-0 top-1/4 -z-10 size-72 rounded-full bg-blue-500/[0.07] blur-3xl sm:size-96" />

        <Reveal className="mx-auto w-full text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
            Who we are
          </p>
          <h2 className="mx-auto mt-4 max-w-5xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl 2xl:text-6xl">
            Making travel planning feel{" "}
            <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
              simpler.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-5xl text-sm leading-8 text-slate-400 sm:text-base lg:text-lg">
            Planning a trip can involve many decisions. Our goal is to bring
            essential travel discovery tools into a consistent experience so
            you can explore options, review sample prices, and move through
            the booking process with less friction.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-7 2xl:gap-10">
          <Reveal>
            <motion.article
              whileHover={reduceMotion ? {} : { y: -5 }}
              className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-900/60 p-6 sm:p-8 lg:p-10"
            >
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-sky-400/[0.08] blur-2xl transition duration-500 group-hover:bg-sky-400/15" />
              <div className="relative">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                  <Compass size={25} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white sm:text-2xl">
                  Explore with freedom
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-400 sm:text-base">
                  Every trip is different. We bring flight, accommodation, and
                  vehicle discovery into one experience so you can explore
                  the options that fit your plans.
                </p>
              </div>
            </motion.article>
          </Reveal>

          <Reveal delay={0.12}>
            <motion.article
              whileHover={reduceMotion ? {} : { y: -5 }}
              className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-900/60 p-6 sm:p-8 lg:p-10"
            >
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-blue-400/[0.08] blur-2xl transition duration-500 group-hover:bg-blue-400/15" />
              <div className="relative">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-300">
                  <ShieldCheck size={25} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white sm:text-2xl">
                  Know what comes next
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-400 sm:text-base">
                  Clear navigation and a structured booking interface help
                  you move from exploring travel options to reviewing your
                  details in a more understandable way.
                </p>
              </div>
            </motion.article>
          </Reveal>
        </div>

        <Reveal className="mt-7">
          <div className="relative overflow-hidden rounded-3xl border border-sky-400/15 bg-gradient-to-r from-sky-500/[0.08] via-blue-500/[0.04] to-transparent p-6 sm:p-8 lg:p-10">
            <div className="absolute -right-12 -top-20 size-56 rounded-full bg-sky-400/[0.07] blur-3xl" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                <Sparkles size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Designed for your devices
                </h3>
                <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-400 sm:text-base">
                  Aeroplane Tours & Travels is designed around accessible
                  information, clear navigation, and a responsive experience
                  across mobile phones, tablets, laptops, desktop displays,
                  and ultrawide screens. The current website demonstrates its
                  booking interface using sample data.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-24 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <BackgroundImagePlaceholder />

        <div className="pointer-events-none absolute right-0 top-0 -z-10 size-80 rounded-full bg-sky-400/[0.06] blur-3xl" />

        <Reveal className="w-full text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
            What guides us
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl 2xl:text-6xl">
            Values behind every journey
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
            The principles shaping the experience we want to provide.
          </p>
        </Reveal>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:mt-14 lg:grid-cols-4 lg:gap-5 2xl:gap-7"
          variants={containerMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <motion.article
                key={value.title}
                variants={revealMotion}
                whileHover={reduceMotion ? {} : { y: -8, scale: 1.015 }}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-sky-400/30 hover:bg-sky-400/[0.04] sm:p-6 lg:p-7 2xl:p-9"
              >
                <span className="absolute right-5 top-5 text-xs font-bold tracking-widest text-slate-700 transition-colors group-hover:text-sky-400/50">
                  {value.number}
                </span>

                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-sky-400/10 bg-sky-400/10 text-sky-300 transition duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-sky-400 group-hover:text-slate-950">
                  <Icon size={23} />
                </div>

                <h3 className="mt-6 text-lg font-bold leading-snug text-white sm:text-xl">
                  {value.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
                  {value.description}
                </p>

                <div className="mt-6 h-1 w-10 rounded-full bg-sky-400/40 transition-all duration-500 group-hover:w-20 group-hover:bg-sky-300" />
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      <section className="relative w-full px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-24 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end lg:gap-10">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                What you can explore
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl 2xl:text-6xl">
                Travel essentials in one place
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base lg:pb-1">
              Explore the available sections and discover options for your
              next trip.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="mt-9 grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 lg:grid-cols-3 lg:gap-6 2xl:gap-8"
          variants={containerMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={revealMotion}
                whileHover={reduceMotion ? {} : { y: -8 }}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 transition duration-300 hover:border-sky-400/30 hover:shadow-2xl hover:shadow-sky-950/30"
              >
                <div className="relative flex min-h-36 items-center justify-between overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-sky-500/[0.12] via-blue-500/[0.06] to-transparent p-6 sm:min-h-44 sm:p-8">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={`${service.title} background`}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover opacity-35 transition duration-700 group-hover:scale-110 group-hover:opacity-50"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(56,189,248,0.16),transparent_50%)]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 to-slate-950/20" />

                  <div className="relative flex size-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/10 text-sky-300 backdrop-blur-md transition duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-sky-400 group-hover:text-slate-950 sm:size-16">
                    <Icon size={28} />
                  </div>

                  <span className="relative self-start rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-md">
                    {service.number}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-400 sm:text-base">
                    {service.description}
                  </p>

                  <Link
                    to={service.link}
                    className="group/link mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm font-bold text-sky-300 transition-colors hover:text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-4 focus:ring-offset-slate-900"
                  >
                    Explore options
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      <section className="relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-24 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-sky-500/[0.035] to-transparent" />

        <Reveal>
          <div className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-black/10 sm:p-8 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-12 2xl:gap-20 2xl:p-16">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-sky-400/[0.08] blur-3xl" />

            <div className="relative flex min-w-0 flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                Your travel checklist
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl 2xl:text-5xl">
                A smoother start to your next adventure.
              </h2>
              <p className="mt-5 text-sm leading-8 text-slate-400 sm:text-base">
                Explore travel options, review your details, and follow the
                booking flow at your own pace.
              </p>

              <Link
                to="/"
                className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 self-start rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-sky-400 min-[420px]:w-auto"
              >
                Plan a trip
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="relative grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4">
              {[
                {
                  icon: Route,
                  title: "Choose your route",
                  description: "Compare flight options"
                },
                {
                  icon: Hotel,
                  title: "Find your stay",
                  description: "Explore accommodation"
                },
                {
                  icon: Luggage,
                  title: "Prepare your trip",
                  description: "Review your travel details"
                },
                {
                  icon: Clock3,
                  title: "Take your time",
                  description: "Explore at your own pace"
                }
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: reduceMotion ? 0 : index * 0.1
                    }}
                    whileHover={reduceMotion ? {} : { y: -4 }}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors hover:border-sky-400/25 hover:bg-sky-400/[0.035] sm:p-5"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300 sm:size-11">
                      <Icon size={21} />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-white sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative w-full overflow-hidden border-t border-white/[0.06] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-24 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/[0.08] via-blue-500/[0.04] to-transparent" />
        <div className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-sky-400/[0.08] blur-3xl" />

        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sky-300">
                <MapPin size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Let's plan your next trip
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl 2xl:text-6xl">
                Have a destination in mind?
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                Start exploring available travel options or get in touch
                through our contact page.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 min-[420px]:flex-row lg:w-auto">
              <Link
                to="/"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-sky-400 min-[420px]:w-auto"
              >
                Plan a trip
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950/30 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.04] min-[420px]:w-auto"
              >
                Get in touch
                <MoveUpRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="w-full border-t border-white/[0.06] px-4 py-5 text-center sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <div className="flex flex-col items-center justify-center gap-2 text-xs text-slate-500 sm:flex-row sm:gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Star size={13} className="text-sky-400" />
            Travel planning made simpler
          </span>
          <span className="hidden text-slate-700 sm:inline">•</span>
          <span>Aeroplane Tours & Travels</span>
        </div>
      </section>
    </main>
  );
}
