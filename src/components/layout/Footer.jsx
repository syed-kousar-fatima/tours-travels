
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Plane,
  ShieldCheck,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Flights", to: "/flights" },
  { label: "Hotels", to: "/hotels" },
  { label: "Car Rentals", to: "/cars" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const serviceLinks = [
  { label: "Find Flights", to: "/flights" },
  { label: "Explore Hotels", to: "/hotels" },
  { label: "Rent a Car", to: "/cars" },
  { label: "My Bookings", to: "/my-bookings" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: FaYoutube,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full min-w-0 border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 min-[1920px]:px-20 min-[2560px]:px-24">
        <div className="grid w-full grid-cols-1 gap-10 py-12 min-[480px]:grid-cols-2 min-[480px]:gap-x-6 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12 lg:py-16 2xl:gap-x-12 2xl:py-20">
          <div className="min-w-0 min-[480px]:col-span-2 lg:col-span-1">
            <Link
              to="/"
              aria-label="Aeroplane Tours and Travels home"
              className="inline-flex max-w-full items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-4 focus:ring-offset-slate-950"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20 transition duration-300 hover:rotate-[-6deg] hover:scale-105 sm:size-12 2xl:size-14">
                <Plane size={25} />
              </span>

              <span className="min-w-0">
                <span className="block truncate text-lg font-extrabold tracking-tight text-white sm:text-xl 2xl:text-2xl">
                  Aeroplane
                </span>
                <span className="block break-words text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300 sm:text-xs sm:tracking-[0.18em]">
                  Tours & Travels
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 2xl:text-base 2xl:leading-8">
              Discover new destinations, compare travel options, and plan your
              next journey with confidence.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${label}`}
                  title={label}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 2xl:size-11"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-bold text-white 2xl:text-lg">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex max-w-full items-center gap-2 text-sm text-slate-400 transition duration-200 hover:text-sky-300 focus:outline-none focus:text-sky-300 2xl:text-base"
                  >
                    <ArrowRight
                      size={14}
                      className="shrink-0 opacity-60 transition duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-bold text-white 2xl:text-lg">
              Our Services
            </h3>

            <ul className="mt-5 space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex max-w-full items-center gap-2 text-sm text-slate-400 transition duration-200 hover:text-sky-300 focus:outline-none focus:text-sky-300 2xl:text-base"
                  >
                    <ArrowRight
                      size={14}
                      className="shrink-0 opacity-60 transition duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex min-w-0 items-start gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-3 sm:p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-emerald-300"
              />
              <p className="min-w-0 text-xs leading-5 text-slate-400 sm:text-sm">
                Review your trip details carefully before confirming a demo
                booking.
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-bold text-white 2xl:text-lg">
              Get in Touch
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-400 2xl:text-base">
              Have a question about planning your trip? Visit our contact page
              and send us a message.
            </p>

            <Link
              to="/contact"
              className="mt-5 inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-semibold text-sky-300 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-400/20 focus:outline-none focus:ring-2 focus:ring-sky-400 2xl:px-5 2xl:text-base"
            >
              Contact Us
              <ArrowUpRight size={17} className="shrink-0" />
            </Link>

            <div className="mt-6 space-y-4 text-sm text-slate-400 2xl:text-base">
              <Link
                to="/contact"
                className="flex min-w-0 items-start gap-3 transition hover:text-sky-300 focus:outline-none focus:text-sky-300"
              >
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-sky-300"
                />
                <span>Contact form</span>
              </Link>

              <div className="flex min-w-0 items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-sky-300"
                />
                <span className="min-w-0 leading-6">
                  Travel services for your next destination
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 border-t border-white/10 py-6 text-xs sm:text-sm md:flex-row md:items-center md:justify-between md:gap-6 2xl:py-8">
          <p className="leading-6 text-slate-500">
            © {year} Aeroplane Tours & Travels. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              to="/my-bookings"
              className="text-slate-400 transition hover:text-sky-300 focus:outline-none focus:text-sky-300"
            >
              My Bookings
            </Link>

            <Link
              to="/contact"
              className="text-slate-400 transition hover:text-sky-300 focus:outline-none focus:text-sky-300"
            >
              Support
            </Link>

            <Link
              to="/about"
              className="text-slate-400 transition hover:text-sky-300 focus:outline-none focus:text-sky-300"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
