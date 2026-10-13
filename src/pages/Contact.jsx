
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  ShieldCheck,
  UserRound,
  Plane,
  Hotel,
  CarFront,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  subject: "General enquiry",
  message: ""
};

const subjects = [
  "General enquiry",
  "Flight booking",
  "Hotel booking",
  "Car rental",
  "Existing booking",
  "Website feedback"
];

const contactOptions = [
  {
    icon: Mail,
    title: "Email enquiries",
    description: "For travel questions and general enquiries",
    detail: "Configure your support email",
    href: null,
    number: "01"
  },
  {
    icon: Clock3,
    title: "Support hours",
    description: "Set your team's availability",
    detail: "Add your business hours",
    href: null,
    number: "02"
  },
  {
    icon: MapPin,
    title: "Travel assistance",
    description: "Questions about flights, stays, and rentals",
    detail: "Explore our travel services",
    href: "/",
    number: "03"
  }
];

const travelLinks = [
  {
    icon: Plane,
    title: "Flight bookings",
    description: "Explore routes and sample fares",
    to: "/flights"
  },
  {
    icon: Hotel,
    title: "Hotel stays",
    description: "Discover accommodation options",
    to: "/hotels"
  },
  {
    icon: CarFront,
    title: "Car rentals",
    description: "Find vehicles for your journey",
    to: "/cars"
  }
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 28
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={reveal}
      transition={{ delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

function ContactBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#071a30] to-slate-950" />
      <div className="absolute -left-32 top-0 size-72 animate-pulse rounded-full bg-sky-500/10 blur-3xl sm:size-[28rem]" />
      <div className="absolute -right-32 bottom-0 size-80 rounded-full bg-blue-500/[0.09] blur-3xl sm:size-[32rem]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:56px_56px]" />
    </div>
  );
}

function validateForm(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Your name must contain at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Your name must be 100 characters or fewer.";
  } else if (!/^[\p{L}\p{M}][\p{L}\p{M}\s'.-]*$/u.test(name)) {
    errors.name = "Please enter a valid name.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!subjects.includes(form.subject)) {
    errors.subject = "Please select a valid enquiry topic.";
  }

  if (!message) {
    errors.message = "Please enter your message.";
  } else if (message.length < 10) {
    errors.message = "Please enter at least 10 characters.";
  } else if (message.length > 2000) {
    errors.message = "Your message must be 2000 characters or fewer.";
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const reduceMotion = useReducedMotion();

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));

    setErrors((current) => ({
      ...current,
      [field]: ""
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttempted(true);

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setSubmitted(false);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitted(true);
  };

  const inputClass =
    "mt-2 block min-h-12 w-full min-w-0 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

  const labelClass = "text-sm font-semibold text-slate-300";

  return (
    <main className="relative isolate min-h-screen w-full min-w-0 overflow-clip bg-slate-950 text-white">
      <ContactBackground />

      <section className="relative w-full px-4 pb-12 pt-12 min-[480px]:px-6 sm:pb-16 sm:pt-16 md:px-8 lg:px-10 lg:pb-20 lg:pt-20 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <motion.div
          className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 px-5 py-10 backdrop-blur-sm min-[480px]:px-7 sm:px-10 sm:py-14 lg:px-14 lg:py-20 2xl:px-20"
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7 }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/[0.12] via-blue-500/[0.04] to-transparent" />
          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? {}
                : {
                    x: [0, 15, 0],
                    y: [0, -12, 0],
                    scale: [1, 1.08, 1]
                  }
            }
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="pointer-events-none absolute -right-16 -top-24 -z-10 size-64 rounded-full bg-sky-400/10 blur-3xl sm:size-96"
          />

          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 2xl:gap-20">
            <div className="min-w-0">
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.15, duration: 0.5 }}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-sky-300 min-[480px]:px-4 sm:text-xs sm:tracking-[0.18em]"
              >
                <MessageSquare size={15} className="shrink-0" />
                We're here to help
              </motion.span>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.25, duration: 0.65 }}
                className="mt-6 text-[clamp(2.25rem,5.4vw,6rem)] font-extrabold leading-[1.08] tracking-[-0.045em] text-white"
              >
                Let's talk about your{" "}
                <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  next journey.
                </span>
              </motion.h1>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.35, duration: 0.65 }}
                className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8 lg:text-lg"
              >
                Have a question about a flight, hotel, rental car, or your
                booking experience? Send us a message using the form below.
                We have made it simple to tell us what you need.
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.45, duration: 0.6 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <a
                  href="#contact-form"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-1 hover:bg-sky-400 min-[420px]:w-auto sm:px-6"
                >
                  Send an enquiry
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <Link
                  to="/"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/[0.06] min-[420px]:w-auto sm:px-6"
                >
                  Explore travel
                  <ArrowUpRight size={17} />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.3, duration: 0.7 }}
              className="relative mx-auto w-full min-w-0 max-w-2xl lg:max-w-none"
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-sky-400/[0.08] blur-2xl sm:-inset-5" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-2xl backdrop-blur-xl sm:p-7 lg:p-8">
                <div className="absolute right-0 top-0 size-40 rounded-full bg-sky-400/[0.08] blur-3xl" />

                <div className="relative flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-sky-400/15 bg-sky-400/10 text-sky-300 sm:size-14">
                    <MessageSquare size={25} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
                      How can we help?
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                      Your journey matters to us.
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      Select a topic and share the details of your enquiry.
                    </p>
                  </div>
                </div>

                <div className="relative mt-7 space-y-3">
                  {[
                    {
                      icon: Plane,
                      title: "Flight questions",
                      detail: "Routes and booking options"
                    },
                    {
                      icon: Hotel,
                      title: "Stay enquiries",
                      detail: "Hotels and accommodation"
                    },
                    {
                      icon: CarFront,
                      title: "Rental assistance",
                      detail: "Vehicles and travel plans"
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.title}
                        initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: reduceMotion ? 0 : 0.45 + index * 0.12
                        }}
                        whileHover={reduceMotion ? {} : { x: 4 }}
                        className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 sm:gap-4 sm:p-4"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                            {item.detail}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-slate-600">
                          0{index + 1}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="relative mt-5 flex items-start gap-3 rounded-2xl border border-sky-400/15 bg-sky-400/[0.05] p-4">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-sky-300"
                  />
                  <p className="text-xs leading-6 text-slate-300 sm:text-sm">
                    Please do not include card numbers, CVVs, passwords, or
                    other sensitive payment information in your enquiry.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="w-full px-4 pb-16 min-[480px]:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:gap-7">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;

            const content = (
              <>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-sky-400/10 bg-sky-400/10 text-sky-300 transition duration-300 group-hover:bg-sky-400 group-hover:text-slate-950 sm:size-14">
                  <Icon size={24} />
                </div>
                <span className="absolute right-5 top-5 text-xs font-bold text-slate-700">
                  {option.number}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-white sm:text-lg">
                    {option.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {option.description}
                  </p>
                  <p className="mt-3 break-words text-sm font-semibold text-sky-300">
                    {option.detail}
                  </p>
                </div>
                {option.href && (
                  <ArrowRight
                    size={18}
                    className="mt-1 shrink-0 text-sky-300 transition-transform group-hover:translate-x-1"
                  />
                )}
              </>
            );

            return (
              <Reveal key={option.title} delay={index * 0.08}>
                {option.href ? (
                  <Link
                    to={option.href}
                    className="group relative flex h-full min-w-0 items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-sky-400/[0.04] sm:p-6"
                  >
                    {content}
                  </Link>
                ) : (
                  <article className="relative flex h-full min-w-0 items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
                    {content}
                  </article>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="w-full px-4 pb-16 min-[480px]:px-6 md:px-8 lg:px-10 lg:pb-24 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8 2xl:gap-10">
          <aside className="min-w-0 space-y-5">
            <Reveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                  Contact information
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                  Let's find the right direction.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                  Choose the travel topic that best matches your question.
                  You can also browse our available travel categories below.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-sky-400/15 bg-sky-400/[0.05] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-sky-300"
                  />
                  <div>
                    <h3 className="font-bold text-white">
                      Your information matters
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      Share only the details needed to explain your enquiry.
                      Never submit passwords or payment card information
                      through this form.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white">
                  Explore our services
                </h3>
                <div className="mt-4 space-y-2">
                  {travelLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="group flex min-w-0 items-center gap-3 rounded-xl p-3 transition hover:bg-white/[0.04]"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                          <Icon size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-sky-300"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <Sparkles
                  size={20}
                  className="mt-0.5 shrink-0 text-sky-300"
                />
                <div>
                  <h3 className="font-bold text-white">
                    Need help choosing?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Start with our travel options and return here if you have
                    a question.
                  </p>
                  <Link
                    to="/"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-sky-300 hover:text-sky-200"
                  >
                    Start exploring
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>

          <Reveal>
            <div
              id="contact-form"
              className="scroll-mt-28 min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7 lg:p-8 2xl:p-10"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                  <Send size={23} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                    Send us a message
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Complete the fields below. All fields are required.
                  </p>
                </div>
              </div>

              {submitted && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] p-4"
                >
                  <CheckCircle2
                    size={22}
                    className="mt-0.5 shrink-0 text-emerald-300"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-emerald-200">
                      Your message passed validation
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      This is a frontend demo. Your message has not been sent.
                      Connect a backend or email service to deliver enquiries.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(initialForm);
                        setErrors({});
                        setSubmitted(false);
                        setAttempted(false);
                      }}
                      className="mt-3 text-sm font-bold text-emerald-200 underline decoration-emerald-200/40 underline-offset-4 hover:text-white"
                    >
                      Send another enquiry
                    </button>
                  </div>
                </motion.div>
              )}

              {attempted && Object.keys(errors).length > 0 && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-rose-400/20 bg-rose-400/[0.06] p-4 text-sm text-rose-200"
                >
                  Please correct the highlighted fields before continuing.
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-7 space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label htmlFor="contact-name" className={labelClass}>
                      Full name
                    </label>
                    <div className="relative">
                      <UserRound
                        size={17}
                        className="pointer-events-none absolute left-4 top-[1.65rem] text-slate-500"
                      />
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        maxLength={100}
                        value={form.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        placeholder="Your full name"
                        className={`${inputClass} pl-11`}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? "contact-name-error" : undefined
                        }
                        required
                      />
                    </div>
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-2 text-xs leading-5 text-rose-400"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="contact-email" className={labelClass}>
                      Email address
                    </label>
                    <div className="relative">
                      <Mail
                        size={17}
                        className="pointer-events-none absolute left-4 top-[1.65rem] text-slate-500"
                      />
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        maxLength={254}
                        value={form.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        placeholder="you@example.com"
                        className={`${inputClass} pl-11`}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "contact-email-error" : undefined
                        }
                        required
                      />
                    </div>
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-2 text-xs leading-5 text-rose-400"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="min-w-0">
                  <label htmlFor="contact-subject" className={labelClass}>
                    What is your enquiry about?
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={(event) =>
                      updateField("subject", event.target.value)
                    }
                    className={`${inputClass} cursor-pointer`}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? "contact-subject-error" : undefined
                    }
                    required
                  >
                    {subjects.map((subject) => (
                      <option
                        key={subject}
                        value={subject}
                        className="bg-slate-900 text-white"
                      >
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p
                      id="contact-subject-error"
                      className="mt-2 text-xs leading-5 text-rose-400"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor="contact-message" className={labelClass}>
                      Your message
                    </label>
                    <span className="shrink-0 text-xs text-slate-500">
                      {form.message.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    maxLength={2000}
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    placeholder="Tell us how we can help..."
                    className={`${inputClass} min-h-40 resize-y leading-7`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message
                        ? "contact-message-error"
                        : "contact-message-help"
                    }
                    required
                  />
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      className="mt-2 text-xs leading-5 text-rose-400"
                    >
                      {errors.message}
                    </p>
                  ) : (
                    <p
                      id="contact-message-help"
                      className="mt-2 text-xs leading-5 text-slate-500"
                    >
                      Please enter at least 10 characters.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/15 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-400 hover:shadow-sky-400/20 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto"
                >
                  <Send
                    size={17}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  Validate message
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <p className="text-xs leading-6 text-slate-500">
                  Your message is validated in this browser only. This demo
                  does not transmit or persist submitted information.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="w-full px-4 pb-16 min-[480px]:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 min-[1920px]:px-24 min-[2560px]:px-32">
        <Reveal>
          <div className="relative w-full overflow-hidden rounded-3xl border border-sky-400/15 bg-gradient-to-r from-sky-500/[0.1] via-blue-500/[0.05] to-transparent p-5 sm:p-8 lg:p-10 2xl:p-14">
            <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-sky-400/[0.08] blur-3xl" />

            <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center lg:gap-10">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
                  Ready for your next trip?
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                  Let's make it happen.
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                  Browse flights, discover accommodation, or explore rental
                  cars for your next journey.
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-3 min-[420px]:flex-row lg:w-auto">
                <Link
                  to="/"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-sky-400 min-[420px]:w-auto"
                >
                  Explore now
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/my-bookings"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-bold text-white transition hover:border-sky-400/30 hover:bg-white/[0.04] min-[420px]:w-auto"
                >
                  My bookings
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
