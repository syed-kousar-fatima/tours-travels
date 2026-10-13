
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Plane, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

const links = [
  { label: "Home", to: "/" },
  { label: "Flights", to: "/flights" },
  { label: "Hotels", to: "/hotels" },
  { label: "Cars", to: "/cars" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 text-white backdrop-blur-xl">
        <div className="container-fluid mx-auto flex min-h-[72px] w-full items-center justify-between gap-3 2xl:min-h-20">
          <Link
            to="/"
            aria-label="Aeroplane Tours and Travels home"
            onClick={closeMenu}
            className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20 sm:size-10">
              <Plane size={21} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold tracking-tight sm:text-base">
                Aeroplane
              </span>
              <span className="block truncate text-[9px] font-medium uppercase tracking-[0.12em] text-sky-300 sm:text-[10px] 2xl:text-xs">
                Tours & Travels
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1 2xl:gap-2"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-2 py-2 text-xs font-semibold transition-colors duration-200 xl:px-2.5 xl:text-sm 2xl:px-4 ${
                    isActive
                      ? "bg-sky-400/10 text-sky-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-sky-300"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/flights"
              className="hidden min-h-10 items-center justify-center whitespace-nowrap rounded-xl bg-sky-500 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-sky-500/15 transition hover:-translate-y-0.5 hover:bg-sky-400 sm:inline-flex xl:px-4 xl:text-sm 2xl:px-5"
            >
              Book a Trip
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white transition hover:border-sky-400/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400 lg:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
