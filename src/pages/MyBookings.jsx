
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleX,
  ClipboardList,
  Hotel,
  Plane,
  Search,
  ShieldCheck,
  Ticket,
  UserRound,
  X
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);

const formatDate = (value) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
};

function getServices(booking) {
  const services = [];

  if (booking.selectedFlight) {
    services.push({
      title: "Flight",
      name:
        booking.selectedFlight.airline ||
        booking.selectedFlight.flightNumber ||
        "Selected flight",
      details: [
        booking.selectedFlight.fromCode || booking.selectedFlight.from,
        booking.selectedFlight.toCode || booking.selectedFlight.to
      ]
        .filter(Boolean)
        .join(" → "),
      icon: Plane
    });
  }

  if (booking.selectedHotel) {
    services.push({
      title: "Hotel",
      name: booking.selectedHotel.name || "Selected hotel",
      details: [
        booking.selectedHotel.city,
        booking.selectedHotel.room
      ]
        .filter(Boolean)
        .join(" · "),
      icon: Hotel
    });
  }

  if (booking.selectedCar) {
    services.push({
      title: "Car rental",
      name:
        booking.selectedCar.name ||
        booking.selectedCar.brand ||
        "Selected car",
      details: [
        booking.selectedCar.city,
        booking.selectedCar.type
      ]
        .filter(Boolean)
        .join(" · "),
      icon: CarFront
    });
  }

  return services;
}

function StatusBadge({ status }) {
  const cancelled = status === "Cancelled";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        cancelled
          ? "border-rose-400/20 bg-rose-400/10 text-rose-300"
          : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      }`}
    >
      {cancelled ? <CircleX size={14} /> : <CheckCircle2 size={14} />}
      {status || "Confirmed"}
    </span>
  );
}

function ServiceRow({ service }) {
  const Icon = service.icon;

  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl bg-white/[0.025] p-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
        <Icon size={19} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{service.title}</p>
        <p className="mt-1 break-words text-sm font-semibold text-white">
          {service.name}
        </p>
        {service.details && (
          <p className="mt-1 break-words text-xs text-slate-400">
            {service.details}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MyBookings() {
  const { bookings, cancelBooking } = useBooking();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState("");
  const [pendingCancellation, setPendingCancellation] = useState("");

  const filteredBookings = useMemo(() => {
    const term = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesFilter =
        filter === "All" || booking.status === filter;

      const services = getServices(booking);
      const searchable = [
        booking.reference,
        booking.status,
        ...services.flatMap((service) => [
          service.title,
          service.name,
          service.details
        ])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesFilter && searchable.includes(term);
    });
  }, [bookings, filter, search]);

  const confirmedCount = bookings.filter(
    (booking) => booking.status !== "Cancelled"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  const completeCancellation = () => {
    if (!pendingCancellation) return;

    cancelBooking(pendingCancellation);
    setPendingCancellation("");
  };

  return (
    <section className="container-fluid section-spacing min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
              Your travel dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              My Bookings
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Review your demo reservations, check their details, and manage
              cancellation actions.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 md:self-auto"
          >
            Explore travel
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">Total bookings</p>
              <ClipboardList size={20} className="text-sky-300" />
            </div>
            <p className="mt-4 text-3xl font-bold text-white">
              {bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">Confirmed</p>
              <CheckCircle2 size={20} className="text-emerald-300" />
            </div>
            <p className="mt-4 text-3xl font-bold text-white">
              {confirmedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">Cancelled</p>
              <CircleX size={20} className="text-rose-300" />
            </div>
            <p className="mt-4 text-3xl font-bold text-white">
              {cancelledCount}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reference, flight, hotel, or car"
              aria-label="Search bookings"
              className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Confirmed", "Cancelled"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                aria-pressed={filter === status}
                className={`min-h-10 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  filter === status
                    ? "border-sky-400 bg-sky-400/10 text-sky-300"
                    : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {filteredBookings.map((booking) => {
            const services = getServices(booking);
            const isExpanded = expanded === booking.reference;
            const isCancelled = booking.status === "Cancelled";

            return (
              <article
                key={booking.reference}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
              >
                <div className="p-5 sm:p-7">
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                        <Ticket size={23} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="break-all text-lg font-bold text-white">
                            {booking.reference}
                          </h2>
                          <StatusBadge status={booking.status} />
                        </div>

                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                          <CalendarDays size={15} />
                          Booked on {formatDate(booking.createdAt)}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          {services.length}{" "}
                          {services.length === 1 ? "service" : "services"}
                          {" · "}Demo booking
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 lg:justify-end">
                      <div className="lg:text-right">
                        <p className="text-xs text-slate-500">Booking total</p>
                        <p className="mt-1 text-2xl font-bold text-white">
                          {formatPrice(booking.total)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setExpanded(isExpanded ? "" : booking.reference)
                        }
                        aria-expanded={isExpanded}
                        className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-sky-400/40 hover:text-sky-300"
                        aria-label={
                          isExpanded
                            ? "Hide booking details"
                            : "Show booking details"
                        }
                      >
                        {isExpanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                      <ServiceRow
                        key={`${booking.reference}-${service.title}`}
                        service={service}
                      />
                    ))}
                  </div>

                  {isExpanded && (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                      <h3 className="font-semibold text-white">
                        Booking details
                      </h3>

                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <div>
                          <p className="text-xs text-slate-500">
                            Lead passenger
                          </p>
                          <p className="mt-1 flex items-center gap-2 break-words text-sm text-slate-200">
                            <UserRound
                              size={15}
                              className="shrink-0 text-sky-300"
                            />
                            {booking.passengers?.[0]
                              ? [
                                  booking.passengers[0].firstName,
                                  booking.passengers[0].lastName
                                ]
                                  .filter(Boolean)
                                  .join(" ")
                              : "Not provided"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">
                            Contact email
                          </p>
                          <p className="mt-1 break-words text-sm text-slate-200">
                            {booking.contactDetails?.email ||
                              "Not provided"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">
                            Payment method
                          </p>
                          <p className="mt-1 text-sm text-slate-200">
                            {booking.paymentMethod === "upi"
                              ? "UPI · Demo"
                              : "Card · Demo"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">
                            Booking status
                          </p>
                          <div className="mt-2">
                            <StatusBadge status={booking.status} />
                          </div>
                        </div>

                        {booking.cancelledAt && (
                          <div>
                            <p className="text-xs text-slate-500">
                              Cancellation date
                            </p>
                            <p className="mt-1 text-sm text-rose-300">
                              {formatDate(booking.cancelledAt)}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-xl text-xs leading-5 text-slate-500">
                          Demo records are stored in application memory only.
                          Cancellation updates this interface and does not
                          contact a travel provider.
                        </p>

                        {!isCancelled && (
                          <button
                            type="button"
                            onClick={() =>
                              setPendingCancellation(booking.reference)
                            }
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-400/20 px-4 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-400/10"
                          >
                            <X size={16} />
                            Cancel demo booking
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredBookings.length === 0 && (
          <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-14 text-center sm:py-20">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
              <ClipboardList size={29} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-white">
              {bookings.length === 0
                ? "No bookings yet"
                : "No matching bookings"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              {bookings.length === 0
                ? "Once you complete a demo checkout, your booking will appear here."
                : "Try a different search term or select another status filter."}
            </p>

            {bookings.length === 0 ? (
              <Link
                to="/"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Explore travel options
                <ArrowRight size={17} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="mt-6 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-sky-400/15 bg-sky-400/5 p-4">
          <ShieldCheck size={19} className="mt-0.5 shrink-0 text-sky-300" />
          <p className="text-xs leading-6 text-slate-400">
            These are demo bookings, not verified reservations. Real booking
            history, cancellations, refunds, and payment status must be
            confirmed by your backend and connected travel or payment services.
          </p>
        </div>
      </div>

      {pendingCancellation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPendingCancellation("");
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-booking-title"
            className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-400/10 text-rose-300">
              <CircleX size={24} />
            </div>

            <h2
              id="cancel-booking-title"
              className="mt-5 text-xl font-bold text-white"
            >
              Cancel this demo booking?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              The booking status will change to Cancelled in this demo.
              No real reservation will be cancelled and no refund will be
              processed.
            </p>

            <p className="mt-4 break-all rounded-xl bg-slate-950/60 p-3 text-sm font-semibold text-slate-200">
              {pendingCancellation}
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setPendingCancellation("")}
                className="min-h-11 flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Keep booking
              </button>

              <button
                type="button"
                onClick={completeCancellation}
                className="min-h-11 flex-1 rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
              >
                Confirm cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
