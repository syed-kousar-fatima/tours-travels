
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftRight,
  ArrowRight,
  CalendarCheck,
  Clock3,
  Luggage,
  Plane,
  RotateCcw,
  Star
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(price) || 0);

const formatDuration = (minutes) => {
  const total = Number(minutes) || 0;
  return `${Math.floor(total / 60)}h ${total % 60}m`;
};

export default function FlightCard({ flight }) {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleBooking = () => {
    if (!flight?.id) return;
    navigate(`/passengers?flightId=${encodeURIComponent(flight.id)}`);
  };

  return (
    <article
      className={`travel-card w-full min-w-0 ${flipped ? "is-flipped" : ""}`}
    >
      <div className="travel-card-inner">
        <div className="travel-card-front flex min-w-0 flex-col overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl sm:rounded-3xl">
          <div className="relative h-32 shrink-0 overflow-hidden min-[400px]:h-36 sm:h-40 lg:h-44">
            <img
              src={flight.image}
              alt={`${flight.airline} aircraft`}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/15" />

            <span className="absolute left-2 top-2 max-w-[65%] truncate rounded-full border border-white/15 bg-slate-950/75 px-2 py-1 text-[10px] font-semibold backdrop-blur-md min-[400px]:left-3 min-[400px]:top-3 sm:text-xs">
              {flight.airline}
            </span>

            <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-slate-950/75 px-2 py-1 text-[10px] text-amber-300 backdrop-blur-md min-[400px]:right-3 min-[400px]:top-3 sm:text-xs">
              <Star size={11} fill="currentColor" />
              {flight.rating}
            </span>

            <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] text-slate-300 sm:text-xs">Flight number</p>
                <p className="mt-0.5 truncate text-xs font-semibold sm:text-sm">
                  {flight.flightNumber}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-sky-400/15 px-2 py-1 text-[9px] font-semibold text-sky-200 sm:text-xs">
                {flight.stops === 0
                  ? "Non-stop"
                  : `${flight.stops} stop${flight.stops === 1 ? "" : "s"}`}
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-3 min-[400px]:p-4 sm:p-5">
            <div className="flex min-w-0 items-center justify-between gap-1.5">
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold min-[400px]:text-xl sm:text-2xl">
                  {flight.fromCode}
                </p>
                <p className="truncate text-[10px] text-slate-400 sm:text-xs">
                  {flight.from}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-200 sm:text-sm">
                  {flight.depart}
                </p>
              </div>

              <div className="flex min-w-0 flex-1 flex-col items-center px-0.5">
                <span className="mb-1 text-center text-[9px] text-slate-400 sm:text-[10px]">
                  {formatDuration(flight.durationMins)}
                </span>
                <div className="flex w-full items-center gap-1 text-sky-300">
                  <span className="h-px flex-1 bg-slate-600" />
                  <Plane size={14} className="shrink-0 sm:size-[17px]" />
                  <span className="h-px flex-1 bg-slate-600" />
                </div>
                <span className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
                  Flight
                </span>
              </div>

              <div className="min-w-0 flex-1 text-right">
                <p className="text-lg font-bold min-[400px]:text-xl sm:text-2xl">
                  {flight.toCode}
                </p>
                <p className="truncate text-[10px] text-slate-400 sm:text-xs">
                  {flight.to}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-200 sm:text-sm">
                  {flight.arrive}
                </p>
              </div>
            </div>

            <div className="my-3 border-t border-dashed border-slate-700 sm:my-4" />

            <div className="mt-auto">
              <p className="text-[10px] text-slate-400 sm:text-xs">
                Price per person
              </p>
              <p className="mt-1 break-words text-lg font-extrabold text-sky-300 min-[400px]:text-xl sm:text-2xl">
                {formatPrice(flight.price)}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setFlipped(true)}
                  aria-label={`View details for ${flight.airline} flight`}
                  className="flex min-h-10 min-w-0 items-center justify-center gap-1 rounded-lg border border-sky-400/30 bg-sky-400/10 px-1.5 py-2 text-[11px] font-semibold text-sky-200 transition hover:bg-sky-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 min-[400px]:gap-1.5 min-[400px]:px-2 sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:text-sm"
                >
                  <span>Details</span>
                  <ArrowLeftRight size={13} className="shrink-0 sm:size-4" />
                </button>

                <button
                  type="button"
                  onClick={handleBooking}
                  disabled={!flight?.id}
                  className="flex min-h-10 min-w-0 items-center justify-center gap-1 rounded-lg bg-sky-400 px-1.5 py-2 text-[11px] font-bold text-slate-950 shadow-lg shadow-sky-500/10 transition hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-50 min-[400px]:gap-1.5 min-[400px]:px-2 sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:text-sm"
                >
                  <CalendarCheck size={13} className="shrink-0 sm:size-4" />
                  <span>Book Now</span>
                  <ArrowRight size={13} className="shrink-0 sm:size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="travel-card-back flex min-w-0 flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 p-3 text-white sm:rounded-3xl sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-300 sm:text-xs sm:tracking-[0.15em]">
                Flight details
              </span>
              <h3 className="mt-1 break-words text-base font-bold sm:mt-2 sm:text-xl">
                {flight.airline}
              </h3>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                {flight.flightNumber}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFlipped(false)}
              aria-label="Return to flight image"
              className="shrink-0 rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <RotateCcw size={15} />
            </button>
          </div>

          <div className="my-3 rounded-xl border border-white/10 bg-white/[0.04] p-2.5 sm:my-5 sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between gap-1.5">
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold sm:text-2xl">{flight.fromCode}</p>
                <p className="truncate text-[10px] text-slate-400 sm:text-xs">
                  {flight.from}
                </p>
                <p className="mt-1.5 text-xs font-semibold sm:mt-2 sm:text-sm">
                  {flight.depart}
                </p>
              </div>

              <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-sky-300">
                <Clock3 size={16} />
                <span className="text-center text-[9px] text-slate-400 sm:text-[10px]">
                  {formatDuration(flight.durationMins)}
                </span>
                <ArrowRight size={13} />
              </div>

              <div className="min-w-0 flex-1 text-right">
                <p className="text-lg font-bold sm:text-2xl">{flight.toCode}</p>
                <p className="truncate text-[10px] text-slate-400 sm:text-xs">
                  {flight.to}
                </p>
                <p className="mt-1.5 text-xs font-semibold sm:mt-2 sm:text-sm">
                  {flight.arrive}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:space-y-3 sm:text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Stops</span>
              <span className="text-right font-medium">
                {flight.stops === 0
                  ? "Non-stop"
                  : `${flight.stops} stop${flight.stops === 1 ? "" : "s"}`}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-slate-400 sm:gap-2">
                <Luggage size={14} className="shrink-0 sm:size-4" />
                Checked baggage
              </span>
              <span className="max-w-[55%] break-words text-right font-medium">
                {flight.baggage}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Cabin</span>
              <span className="text-right font-medium">{flight.cabin}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Rating</span>
              <span className="flex items-center gap-1 font-medium text-amber-300">
                <Star size={13} fill="currentColor" />
                {flight.rating}/5
              </span>
            </div>
          </div>

          <div className="mt-auto pt-4 sm:pt-5">
            <p className="text-[10px] text-slate-400 sm:text-xs">
              Price per person
            </p>
            <p className="mt-1 break-words text-lg font-extrabold text-sky-300 sm:text-xl">
              {formatPrice(flight.price)}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
              <button
                type="button"
                onClick={() => setFlipped(false)}
                className="flex min-h-10 min-w-0 items-center justify-center gap-1 rounded-lg border border-white/15 px-1.5 py-2 text-[11px] font-semibold transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:text-sm"
              >
                <RotateCcw size={13} className="shrink-0 sm:size-4" />
                Back
              </button>

              <button
                type="button"
                onClick={handleBooking}
                disabled={!flight?.id}
                className="flex min-h-10 min-w-0 items-center justify-center gap-1 rounded-lg bg-sky-400 px-1.5 py-2 text-[11px] font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:text-sm"
              >
                <CalendarCheck size={13} className="shrink-0 sm:size-4" />
                <span>Book Now</span>
                <ArrowRight size={13} className="shrink-0 sm:size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
