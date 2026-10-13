import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CarFront,
  CheckCircle2,
  Plane,
  UserRound
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);

export default function ReviewBooking() {
  const navigate = useNavigate();

  const {
    selectedFlight,
    selectedHotel,
    selectedCar,
    passengers,
    contactDetails
  } = useBooking();

  const items = [
    selectedFlight
      ? {
          key: "flight",
          label: "Flight",
          name: `${selectedFlight.airline} · ${selectedFlight.flightNumber}`,
          detail: `${selectedFlight.from} → ${selectedFlight.to}`,
          price: selectedFlight.price,
          icon: Plane,
          rateLabel: "Sample fare"
        }
      : null,
    selectedHotel
      ? {
          key: "hotel",
          label: "Hotel",
          name: selectedHotel.name,
          detail: `${selectedHotel.city} · ${selectedHotel.room}`,
          price: selectedHotel.price,
          icon: BedDouble,
          rateLabel: "Per night"
        }
      : null,
    selectedCar
      ? {
          key: "car",
          label: "Car rental",
          name: selectedCar.name,
          detail: `${selectedCar.city} · ${selectedCar.seats} seats`,
          price: selectedCar.price,
          icon: CarFront,
          rateLabel: "Per day"
        }
      : null
  ].filter(Boolean);

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const leadPassenger = passengers[0];

  const continueToPayment = () => {
    if (!items.length || !leadPassenger) return;
    navigate("/payment");
  };

  return (
    <main className="min-h-screen w-full bg-slate-950 px-3 pb-16 pt-28 text-white sm:px-6 sm:pt-32 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
          Booking · Step 2 of 3
        </p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          Review Your Booking
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
          Check your selections and passenger details before proceeding.
        </p>

        {items.length === 0 || !leadPassenger ? (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="text-xl font-bold">Booking details not found</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Select a travel option and complete the passenger form before
              reviewing your booking.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950"
            >
              Browse options
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.8fr]">
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={22} className="text-emerald-300" />
                <h2 className="text-xl font-bold">Selected options</h2>
              </div>

              <div className="mt-5 space-y-3">
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.key}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                        <Icon size={21} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
                          {item.label}
                        </p>
                        <h3 className="mt-1 break-words font-bold">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {item.detail}
                        </p>
                        <p className="mt-2 text-sm font-semibold">
                          {formatPrice(item.price)}
                          <span className="ml-2 font-normal text-slate-400">
                            {item.rateLabel}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <UserRound size={21} className="text-sky-300" />
                  <h2 className="text-xl font-bold">Passenger details</h2>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 rounded-2xl bg-slate-900/70 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-400">Full name</p>
                    <p className="mt-1 break-words font-semibold">
                      {leadPassenger.firstName} {leadPassenger.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Age</p>
                    <p className="mt-1 font-semibold">{leadPassenger.age}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="mt-1 break-all font-semibold">
                      {contactDetails.email || leadPassenger.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="mt-1 break-words font-semibold">
                      {contactDetails.phone || leadPassenger.phone}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/passengers")}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200"
                >
                  <ArrowLeft size={16} />
                  Edit passenger details
                </button>
              </div>
            </section>

            <aside className="h-fit rounded-3xl border border-sky-400/20 bg-gradient-to-br from-slate-900 to-sky-950/60 p-5 sm:p-7">
              <h2 className="text-xl font-bold">Price summary</h2>

              <div className="mt-5 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <span className="text-slate-300">
                      {item.label}
                      <span className="mt-1 block text-xs text-slate-500">
                        {item.rateLabel}
                      </span>
                    </span>
                    <span className="shrink-0 font-semibold">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold">Sample total</span>
                  <span className="text-2xl font-extrabold text-sky-300">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-400">
                  This estimate adds the listed rates once each. Hotel nights,
                  rental duration, taxes, and additional fees are not yet
                  calculated.
                </p>
              </div>

              <button
                type="button"
                onClick={continueToPayment}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-sky-300"
              >
                Continue to Payment
                <ArrowRight size={18} />
              </button>

              <Link
                to="/"
                className="mt-4 block text-center text-sm font-semibold text-slate-400 transition hover:text-white"
              >
                Return to home
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}