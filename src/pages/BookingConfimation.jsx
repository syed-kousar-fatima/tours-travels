
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Hotel,
  Mail,
  Plane,
  ShieldCheck,
  UserRound,
  CarFront
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);

function ConfirmedItem({ icon: Icon, title, item, details }) {
  if (!item) return null;

  return (
    <div className="flex items-start gap-4 border-b border-white/10 py-5 last:border-0">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
        <Icon size={21} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        <p className="mt-1 break-words font-semibold text-white">
          {item.name || item.airline || item.flightNumber || item.brand}
        </p>
        {details && (
          <p className="mt-1 break-words text-sm text-slate-400">{details}</p>
        )}
      </div>
      <p className="shrink-0 text-sm font-semibold text-sky-300">
        {formatPrice(item.price)}
      </p>
    </div>
  );
}

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const {
    selectedFlight,
    selectedHotel,
    selectedCar,
    passengers,
    contactDetails,
    bookingReference,
    paymentMethod,
    clearSelection
  } = useBooking();

  const total =
    (Number(selectedFlight?.price) || 0) +
    (Number(selectedHotel?.price) || 0) +
    (Number(selectedCar?.price) || 0);

  const hasBooking = Boolean(
    selectedFlight || selectedHotel || selectedCar
  );

  useEffect(() => {
    if (!bookingReference || !hasBooking) {
      navigate("/review-booking", { replace: true });
    }
  }, [bookingReference, hasBooking, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleNewBooking = () => {
    clearSelection();
    navigate("/");
  };

  if (!bookingReference || !hasBooking) return null;

  return (
    <section className="container-fluid section-spacing min-h-screen">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
          <div className="relative overflow-hidden bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-transparent px-5 py-10 text-center sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="relative mx-auto flex size-20 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/10 text-emerald-300">
              <CheckCircle2 size={43} strokeWidth={1.7} />
            </div>

            <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
              Demo checkout complete
            </p>
            <h1 className="relative mt-3 text-3xl font-bold text-white sm:text-4xl">
              Your booking is confirmed
            </h1>
            <p className="relative mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Your demo booking details are ready. This confirmation does not
              represent a real reservation or a successful bank payment.
            </p>

            <div className="relative mx-auto mt-7 max-w-md rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Demo booking reference
              </p>
              <p className="mt-2 break-all text-2xl font-bold tracking-wider text-white sm:text-3xl">
                {bookingReference}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard?.writeText) {
                    navigator.clipboard.writeText(bookingReference);
                  }
                }}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition hover:text-sky-200"
              >
                <ClipboardCheck size={16} />
                Copy reference
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Booking details
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Keep this reference for your demo.
                </p>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-sky-400/40 hover:bg-sky-400/5"
              >
                <Download size={17} />
                Print confirmation
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 px-4 sm:px-5">
              <ConfirmedItem
                icon={Plane}
                title="Flight"
                item={selectedFlight}
                details={
                  selectedFlight
                    ? `${selectedFlight.from || ""} ${selectedFlight.fromCode ? `(${selectedFlight.fromCode})` : ""} → ${selectedFlight.to || ""} ${selectedFlight.toCode ? `(${selectedFlight.toCode})` : ""}`
                    : ""
                }
              />
              <ConfirmedItem
                icon={Hotel}
                title="Hotel"
                item={selectedHotel}
                details={
                  selectedHotel
                    ? [selectedHotel.city, selectedHotel.room]
                        .filter(Boolean)
                        .join(" · ")
                    : ""
                }
              />
              <ConfirmedItem
                icon={CarFront}
                title="Car rental"
                item={selectedCar}
                details={
                  selectedCar
                    ? [selectedCar.city, selectedCar.type]
                        .filter(Boolean)
                        .join(" · ")
                    : ""
                }
              />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <UserRound size={19} className="text-sky-300" />
                  <h3 className="font-semibold text-white">
                    Passenger details
                  </h3>
                </div>

                <div className="mt-4 space-y-3">
                  {passengers.map((passenger, index) => (
                    <div key={`${passenger.firstName}-${index}`}>
                      <p className="text-sm font-medium text-white">
                        {[passenger.firstName, passenger.lastName]
                          .filter(Boolean)
                          .join(" ") || `Passenger ${index + 1}`}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {passenger.age ? `Age ${passenger.age}` : ""}
                        {passenger.gender ? ` · ${passenger.gender}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <Mail size={19} className="text-sky-300" />
                  <h3 className="font-semibold text-white">
                    Contact and payment
                  </h3>
                </div>

                <p className="mt-4 break-words text-sm text-slate-300">
                  {contactDetails.email || "No email provided"}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {contactDetails.phone || "No phone provided"}
                </p>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-xs text-slate-500">Selected method</p>
                  <p className="mt-1 font-medium text-white">
                    {paymentMethod === "upi"
                      ? "UPI · Demo"
                      : paymentMethod === "card"
                        ? "Card · Demo"
                        : "Demo payment"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-sky-400/20 bg-sky-400/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Demo booking total</p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    {formatPrice(total)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-sky-300">
                  <ShieldCheck size={17} />
                  No real payment collected
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                This total adds the selected items' sample prices. It does not
                include calculated hotel nights, car rental duration, taxes,
                or other additional fees.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleNewBooking}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400"
              >
                Start a new booking
                <ArrowRight size={18} />
              </button>
              <Link
                to="/"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-5 flex max-w-2xl items-start justify-center gap-2 text-center text-xs leading-6 text-slate-500">
          <ShieldCheck size={15} className="mt-0.5 shrink-0" />
          This is a demonstration of the booking interface. Real reservations
          require a booking service, and real payments require a secure payment
          gateway.
        </p>
      </div>
    </section>
  );
}
