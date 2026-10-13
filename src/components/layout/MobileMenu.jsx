
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "Flights", to: "/flights" },
  { label: "Hotels", to: "/hotels" },
  { label: "Cars", to: "/cars" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-sm lg:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="relative ml-auto flex h-full w-[min(88%,380px)] flex-col border-l border-white/10 bg-slate-950 p-5 shadow-2xl"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-lg font-bold text-white">Explore Travel</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-xl border border-white/10 p-2 text-white hover:bg-white/10"
          >
            <X size={21} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-300 transition hover:bg-sky-400/10 hover:text-sky-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/flights"
          onClick={onClose}
          className="mt-auto rounded-xl bg-sky-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-sky-400"
        >
          Book Your Trip
        </Link>
      </nav>
    </div>
  );
}
