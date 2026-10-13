
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftRight,
  ArrowRight,
  CalendarCheck,
  Fuel,
  Luggage,
  Settings2,
  Star,
  Users,
  Wind,
  X
} from "lucide-react";

const formatPrice = (price, city) => {
  const currency = ["Dubai"].includes(city)
    ? "AED"
    : ["London"].includes(city)
      ? "GBP"
      : ["Singapore"].includes(city)
        ? "SGD"
        : "INR";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(Number(price) || 0);
};

export default function CarCard({ car }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const bookCar = () => {
    if (!car?.id) return;
    navigate(`/passengers?carId=${encodeURIComponent(car.id)}`);
  };

  return (
    <article
      className={`travel-card h-full w-full min-w-0 ${isFlipped ? "is-flipped" : ""}`}
    >
      <div className="travel-card-inner h-full">
        <div className="travel-card-front flex h-full flex-col overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900 sm:aspect-[16/9]">
            <img
              src={car.image}
              alt={car.name || "Rental car"}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/images/hero/airplane-hero.webp";
              }}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/10" />

            <span className="absolute left-4 top-4 max-w-[calc(100%-2rem)] truncate rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-xs font-semibold backdrop-blur">
              {car.type}
            </span>

            <div className="absolute bottom-3 left-4 flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1 text-sm backdrop-blur">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="font-bold">
                {Number(car.rating || 0).toFixed(1)}
              </span>
              <span className="text-slate-300">
                ({Number(car.reviews || 0).toLocaleString("en-IN")})
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
              {car.brand} · {car.city}
            </p>

            <h3 className="line-clamp-2 min-h-[3rem] text-lg font-bold leading-tight sm:text-xl">
              {car.name}
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-xs text-slate-300 sm:text-sm">
              <span className="flex min-w-0 items-center gap-2">
                <Users size={16} className="shrink-0 text-sky-300" />
                <span>{car.seats} seats</span>
              </span>

              <span className="flex min-w-0 items-center gap-2">
                <Settings2 size={16} className="shrink-0 text-sky-300" />
                <span className="truncate">{car.transmission}</span>
              </span>

              <span className="flex min-w-0 items-center gap-2">
                <Fuel size={16} className="shrink-0 text-sky-300" />
                <span className="truncate">{car.fuel}</span>
              </span>

              <span className="flex min-w-0 items-center gap-2">
                <Wind size={16} className="shrink-0 text-sky-300" />
                <span className="truncate">Air conditioning</span>
              </span>
            </div>

            <div className="mt-auto pt-5">
              <div className="mb-4">
                <p className="text-xs text-slate-400">Sample rate / day</p>
                <p className="break-words text-xl font-extrabold text-sky-300 sm:text-2xl">
                  {formatPrice(car.price, car.city)}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-3 text-sm font-semibold text-sky-200 transition hover:bg-sky-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  aria-label={`View details for ${car.name}`}
                >
                  Details
                  <ArrowLeftRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={bookCar}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-400 px-3 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  aria-label={`Book ${car.name}`}
                >
                  <CalendarCheck size={17} />
                  Book Now
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="travel-card-back flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 p-4 text-white sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                Vehicle details
              </p>
              <h3 className="mt-2 break-words text-xl font-extrabold">
                {car.name}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {car.brand} · {car.city}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              aria-label="Close vehicle details"
              className="shrink-0 rounded-full border border-white/15 p-2 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <Users size={19} className="mb-2 text-sky-300" />
              <p className="text-xs text-slate-400">Passengers</p>
              <p className="mt-1 font-bold">{car.seats} seats</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <Luggage size={19} className="mb-2 text-sky-300" />
              <p className="text-xs text-slate-400">Luggage</p>
              <p className="mt-1 break-words text-sm font-bold">
                {car.luggage}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <Settings2 size={19} className="mb-2 text-sky-300" />
              <p className="text-xs text-slate-400">Transmission</p>
              <p className="mt-1 break-words text-sm font-bold">
                {car.transmission}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <Fuel size={19} className="mb-2 text-sky-300" />
              <p className="text-xs text-slate-400">Fuel type</p>
              <p className="mt-1 break-words text-sm font-bold">{car.fuel}</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            {car.description}
          </p>

          <div className="mt-auto pt-5">
            <div className="mb-4">
              <p className="text-sm text-slate-400">Sample daily rate</p>
              <p className="text-xs text-slate-500">Rental terms may vary</p>
              <p className="mt-1 break-words text-xl font-extrabold text-sky-300">
                {formatPrice(car.price, car.city)}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-3 text-sm font-semibold transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <ArrowLeftRight size={16} />
                Back
              </button>

              <button
                type="button"
                onClick={bookCar}
                className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-400 px-3 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200"
              >
                <CalendarCheck size={17} />
                Book Now
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}