
import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";

const STORAGE_KEY = "aeroplane-newsletter-emails-v1";

function getSubscriptions() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    const subscriptions = getSubscriptions();

    if (subscriptions.includes(normalizedEmail)) {
      setStatus("error");
      setMessage("This email is already subscribed.");
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...subscriptions, normalizedEmail])
      );

      setStatus("success");
      setMessage("You're on the list! Watch this space for travel inspiration.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("We couldn't save your subscription. Please try again.");
    }
  };

  return (
    <section className="w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-10 xl:px-16">
      <div className="relative mx-auto w-full max-w-[1800px] overflow-hidden rounded-[28px] border border-sky-400/20 bg-gradient-to-br from-sky-500/15 via-slate-900 to-blue-950 p-6 shadow-2xl shadow-sky-950/20 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm font-semibold text-sky-300">
              <Sparkles size={16} />
              Travel inspiration, delivered
            </span>

            <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your next adventure starts in your inbox.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Get travel ideas, destination highlights, and special offer
              updates from Aeroplane Tours & Travels.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:p-6">
            <form onSubmit={handleSubmit} noValidate>
              <label
                htmlFor="newsletter-email"
                className="mb-3 block text-sm font-semibold text-white"
              >
                Email address
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-600 bg-slate-900 px-4 transition focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/20">
                  <Mail size={19} className="shrink-0 text-sky-300" />
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setStatus("idle");
                      setMessage("");
                    }}
                    placeholder="you@example.com"
                    aria-describedby="newsletter-message"
                    className="min-w-0 w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-400 px-5 py-4 font-bold text-slate-950 transition hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </div>

              <p
                id="newsletter-message"
                aria-live="polite"
                className={`mt-4 flex items-start gap-2 text-sm leading-6 ${
                  status === "success"
                    ? "text-emerald-300"
                    : status === "error"
                      ? "text-rose-300"
                      : "text-slate-400"
                }`}
              >
                {status === "success" && (
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                )}
                {message ||
                  "Subscribe for updates. You can change your preferences at any time."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
