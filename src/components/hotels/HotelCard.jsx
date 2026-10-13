
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftRight,
  ArrowRight,
  BedDouble,
  Check,
  MapPin,
  Star,
  Users,
  Wifi
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(price) || 0);

export default function HotelCard({ hotel }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const selectHotel = () => {
    if (!hotel?.id) return;
    navigate(`/passengers?hotelId=${encodeURIComponent(hotel.id)}`);
  };

  return (
    <article
      className={`travel-card h-full w-full min-w-0 ${isFlipped ? "is-flipped" : ""}`}
    >
      <div className="travel-card-inner h-full w-full">
        <div className="travel-card-front flex h-full min-w-0 flex-col overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
            <img
              src={hotel.image}
              alt={hotel.name || "Hotel"}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/images/hero/airplane-hero.webp";
              }}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/10" />

            <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-xs font-semibold backdrop-blur sm:left-4 sm:top-4">
              {hotel.stars}-Star Stay
            </span>

            <div className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-1 rounded-full bg-slate-950/75 px-3 py-1 text-sm backdrop-blur sm:left-4">
              <Star size={14} className="shrink-0 fill-amber-400 text-amber-400" />
              <span className="font-bold">
                {Number(hotel.rating || 0).toFixed(1)}
              </span>
              <span className="truncate text-slate-300">
                ({Number(hotel.reviews || 0).toLocaleString("en-IN")})
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <div className="mb-2 flex min-h-10 items-start gap-2">
              <MapPin size={17} className="mt-1 shrink-0 text-sky-400" />
              <p className="line-clamp-2 min-w-0 text-sm leading-5 text-slate-300">
                {hotel.area}, {hotel.city}
              </p>
            </div>

            <h3 className="line-clamp-2 min-h-12 text-lg font-bold leading-6 sm:text-xl">
              {hotel.name}
            </h3>

            <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-slate-400">
              {hotel.description}
            </p>

            <div className="mt-auto grid grid-cols-1 gap-3 border-t border-white/10 pt-4 min-[420px]:grid-cols-[minmax(0,1fr)_auto] min-[420px]:items-end">
              <div className="min-w-0">
                <p className="text-xs text-slate-400">Per room / night</p>
                <p className="break-words text-lg font-extrabold leading-tight text-sky-300 sm:text-xl">
                  {formatPrice(hotel.price)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 min-[420px]:w-auto"
                aria-label={`View details for ${hotel.name}`}
              >
                Details
                <ArrowLeftRight size={16} className="shrink-0" />
              </button>
            </div>
          </div>
        </div>

        <div className="travel-card-back flex h-full min-w-0 flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 p-4 text-white sm:p-5 lg:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-sky-300 sm:tracking-[0.2em]">
                Your stay
              </p>
              <h3 className="mt-2 line-clamp-2 break-words text-lg font-extrabold sm:text-xl">
                {hotel.name}
              </h3>
              <p className="mt-1 flex items-start gap-1 text-sm text-slate-300">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span className="min-w-0 break-words">
                  {hotel.city}, {hotel.country}
                </span>
              </p>
            </div>

            <span className="shrink-0 rounded-xl bg-amber-400/15 px-2 py-2 text-sm font-bold text-amber-300 sm:px-3">
              {Number(hotel.rating || 0).toFixed(1)} ★
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 sm:mt-5 sm:p-4">
            <div className="flex items-start gap-3">
              <BedDouble size={20} className="mt-0.5 shrink-0 text-sky-300" />
              <div className="min-w-0">
                <p className="break-words font-semibold">{hotel.room}</p>
                <p className="mt-1 break-words text-sm text-slate-400">
                  {hotel.beds}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-sm text-slate-300">
              <Users size={18} className="shrink-0 text-sky-300" />
              <span>Up to {hotel.guests} guests</span>
            </div>
          </div>

          <div className="mt-4 min-w-0">
            <p className="mb-3 text-sm font-bold text-slate-200">Amenities</p>
            <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto">
              {(hotel.amenities || []).map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex max-w-full items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-200 sm:px-3"
                >
                  {amenity === "Wi-Fi" ? (
                    <Wifi size={13} className="shrink-0" />
                  ) : (
                    <Check size={13} className="shrink-0 text-emerald-300" />
                  )}
                  <span className="break-words">{amenity}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <div className="mb-4 border-t border-white/10 pt-4">
              <p className="text-sm text-slate-400">Per night</p>
              <p className="mt-1 break-words text-xl font-extrabold text-sky-300 sm:text-2xl">
                {formatPrice(hotel.price)}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-3 text-sm font-semibold transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <ArrowLeftRight size={16} className="shrink-0" />
                Back
              </button>

              <button
                type="button"
                onClick={selectHotel}
                className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl bg-sky-400 px-3 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200"
              >
                <span>Select Hotel</span>
                <ArrowRight size={16} className="shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
