
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, UserRound, X } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { useToast } from "../components/common/Toast";
import { validatePassenger } from "../utils/validation";
import flights from "../data/flights";
import hotels from "../data/hotels";
import cars from "../data/cars";

const initialPassenger = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  email: "",
  phone: ""
};

const fieldClass =
  "w-full min-w-0 rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 sm:px-4 sm:text-base";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export default function PassengerDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    selectedFlight,
    setSelectedFlight,
    selectedHotel,
    setSelectedHotel,
    selectedCar,
    setSelectedCar,
    setPassengers,
    contactDetails,
    setContactDetails
  } = useBooking();

  const flightId = searchParams.get("flightId");
  const hotelId = searchParams.get("hotelId");
  const carId = searchParams.get("carId");

  const [passenger, setPassenger] = useState(() => ({
    ...initialPassenger,
    email: contactDetails?.email || "",
    phone: contactDetails?.phone || ""
  }));

  const [errors, setErrors] = useState({});

  const foundFlight = useMemo(
    () => (flightId ? flights.find((item) => item.id === flightId) : null),
    [flightId]
  );

  const foundHotel = useMemo(
    () => (hotelId ? hotels.find((item) => item.id === hotelId) : null),
    [hotelId]
  );

  const foundCar = useMemo(
    () => (carId ? cars.find((item) => item.id === carId) : null),
    [carId]
  );

  useEffect(() => {
    if (foundFlight) setSelectedFlight(foundFlight);
    if (foundHotel) setSelectedHotel(foundHotel);
    if (foundCar) setSelectedCar(foundCar);
  }, [
    foundFlight,
    foundHotel,
    foundCar,
    setSelectedFlight,
    setSelectedHotel,
    setSelectedCar
  ]);

  useEffect(() => {
    setContactDetails({
      email: passenger.email,
      phone: passenger.phone
    });
  }, [passenger.email, passenger.phone, setContactDetails]);

  const hasSelection = Boolean(
    foundFlight ||
      foundHotel ||
      foundCar ||
      selectedFlight ||
      selectedHotel ||
      selectedCar
  );

  const updatePassenger = (event) => {
    const { name, value } = event.target;

    setPassenger((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
      selection: ""
    }));
  };

  const handleRemoveSelection = (label) => {
    const parameterByLabel = {
      Flight: "flightId",
      Hotel: "hotelId",
      "Car rental": "carId"
    };

    const parameter = parameterByLabel[label];

    if (!parameter) return;

    if (label === "Flight") {
      setSelectedFlight(null);
    }

    if (label === "Hotel") {
      setSelectedHotel(null);
    }

    if (label === "Car rental") {
      setSelectedCar(null);
    }

    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete(parameter);
        return nextParams;
      },
      { replace: true }
    );

    setErrors((current) => ({
      ...current,
      selection: ""
    }));

    showToast(`${label} removed from your selection.`, "success");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validatePassenger(passenger, hasSelection);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.selection) {
        showToast(nextErrors.selection, "error");
      } else {
        const firstError = Object.values(nextErrors)[0];

        showToast(
          firstError || "Please correct the highlighted fields.",
          "warning"
        );
      }

      return;
    }

    try {
      setPassengers([
        {
          ...passenger,
          firstName: passenger.firstName.trim(),
          lastName: passenger.lastName.trim(),
          age: Number(passenger.age),
          email: passenger.email.trim(),
          phone: passenger.phone.trim()
        }
      ]);

      setContactDetails({
        email: passenger.email.trim(),
        phone: passenger.phone.trim()
      });

      showToast("Passenger details saved successfully.", "success");
      navigate("/review-booking");
    } catch {
      showToast(
        "Unable to save passenger details. Please try again.",
        "error"
      );
    }
  };

  const activeFlight = foundFlight || selectedFlight;
  const activeHotel = foundHotel || selectedHotel;
  const activeCar = foundCar || selectedCar;

  const selectionItems = [
    activeFlight
      ? {
          label: "Flight",
          name: `${activeFlight.airline} · ${activeFlight.flightNumber}`,
          detail: `${activeFlight.from} → ${activeFlight.to}`,
          price: activeFlight.price
        }
      : null,
    activeHotel
      ? {
          label: "Hotel",
          name: activeHotel.name,
          detail: `${activeHotel.city} · ${activeHotel.room}`,
          price: activeHotel.price
        }
      : null,
    activeCar
      ? {
          label: "Car rental",
          name: activeCar.name,
          detail: `${activeCar.city} · ${activeCar.seats} seats`,
          price: activeCar.price
        }
      : null
  ].filter(Boolean);

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-slate-950 px-3 pb-16 pt-28 text-white sm:px-6 sm:pt-32 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300 sm:tracking-[0.25em]">
            Booking · Step 1 of 3
          </p>

          <h1 className="mt-3 text-2xl font-extrabold sm:text-4xl">
            Passenger Details
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Enter your details carefully so we can prepare your booking summary.
          </p>
        </div>

        {!hasSelection && (
          <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
            Choose an item before continuing.

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-semibold text-sky-300">
              <Link to="/flights" className="transition hover:text-white">
                Browse flights
              </Link>
              <Link to="/hotels" className="transition hover:text-white">
                Browse hotels
              </Link>
              <Link to="/cars" className="transition hover:text-white">
                Browse cars
              </Link>
            </div>
          </div>
        )}

        {errors.selection && (
          <p className="mb-4 text-sm text-rose-300" role="alert">
            {errors.selection}
          </p>
        )}

        <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[1.5fr_0.8fr] lg:gap-6">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300 sm:h-11 sm:w-11">
                <UserRound size={22} />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-bold sm:text-xl">
                  Lead passenger
                </h2>
                <p className="text-xs text-slate-400 sm:text-sm">
                  All fields are required
                </p>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <label className="block min-w-0">
                <span className="mb-2 block text-sm font-semibold">
                  First name
                </span>
                <input
                  name="firstName"
                  value={passenger.firstName}
                  onChange={updatePassenger}
                  autoComplete="given-name"
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                  className={fieldClass}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <span
                    id="firstName-error"
                    className="mt-1 block text-xs text-rose-300"
                  >
                    {errors.firstName}
                  </span>
                )}
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-sm font-semibold">
                  Last name
                </span>
                <input
                  name="lastName"
                  value={passenger.lastName}
                  onChange={updatePassenger}
                  autoComplete="family-name"
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                  className={fieldClass}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <span
                    id="lastName-error"
                    className="mt-1 block text-xs text-rose-300"
                  >
                    {errors.lastName}
                  </span>
                )}
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-sm font-semibold">Age</span>
                <input
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  step="1"
                  value={passenger.age}
                  onChange={updatePassenger}
                  aria-invalid={Boolean(errors.age)}
                  aria-describedby={errors.age ? "age-error" : undefined}
                  className={fieldClass}
                  placeholder="Enter age"
                />
                {errors.age && (
                  <span
                    id="age-error"
                    className="mt-1 block text-xs text-rose-300"
                  >
                    {errors.age}
                  </span>
                )}
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-sm font-semibold">Gender</span>
                <select
                  name="gender"
                  value={passenger.gender}
                  onChange={updatePassenger}
                  aria-invalid={Boolean(errors.gender)}
                  aria-describedby={
                    errors.gender ? "gender-error" : undefined
                  }
                  className={fieldClass}
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <span
                    id="gender-error"
                    className="mt-1 block text-xs text-rose-300"
                  >
                    {errors.gender}
                  </span>
                )}
              </label>

              <label className="block min-w-0 sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold">
                  Email address
                </span>
                <input
                  name="email"
                  type="email"
                  value={passenger.email}
                  onChange={updatePassenger}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <span
                    id="email-error"
                    className="mt-1 block text-xs text-rose-300"
                  >
                    {errors.email}
                  </span>
                )}
              </label>

              <label className="block min-w-0 sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold">
                  Phone number
                </span>
                <input
                  name="phone"
                  type="tel"
                  value={passenger.phone}
                  onChange={updatePassenger}
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={fieldClass}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && (
                  <span
                    id="phone-error"
                    className="mt-1 block text-xs text-rose-300"
                  >
                    {errors.phone}
                  </span>
                )}
              </label>
            </div>

            <button
              type="submit"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-4 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:text-base"
            >
              Continue to Review
              <ArrowRight size={18} />
            </button>
          </form>

          <aside className="h-fit min-w-0 rounded-3xl border border-white/10 bg-slate-900/80 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-lg font-bold sm:text-xl">
                  Your selection
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Review or remove selected items.
                </p>
              </div>

              {selectionItems.length > 0 && (
                <span className="shrink-0 rounded-full bg-sky-400/10 px-2.5 py-1 text-xs font-semibold text-sky-300">
                  {selectionItems.length}{" "}
                  {selectionItems.length === 1 ? "item" : "items"}
                </span>
              )}
            </div>

            {selectionItems.length > 0 ? (
              <div className="mt-5 space-y-3">
                {selectionItems.map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4"
                  >
                    <div className="flex min-w-0 items-start gap-2 sm:gap-3">
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-300"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
                          {item.label}
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold sm:text-base">
                          {item.name}
                        </p>

                        <p className="mt-1 break-words text-xs leading-5 text-slate-400 sm:text-sm">
                          {item.detail}
                        </p>

                        <p className="mt-2 break-words text-sm font-bold text-white sm:text-base">
                          {Number.isFinite(Number(item.price))
                            ? currencyFormatter.format(Number(item.price))
                            : "Price unavailable"}

                          <span className="ml-1 text-xs font-normal text-slate-400">
                            {item.label === "Flight"
                              ? "sample fare"
                              : item.label === "Hotel"
                                ? "per night"
                                : "per day"}
                          </span>
                        </p>

                        <button
                          type="button"
                          onClick={() => handleRemoveSelection(item.label)}
                          aria-label={`Remove ${item.label} from your selection`}
                          className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-400/25 bg-rose-400/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:border-rose-400/50 hover:bg-rose-400/20 hover:text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 sm:text-sm"
                        >
                          <X size={15} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-5 text-center">
                <p className="text-sm text-slate-400">
                  No items selected. Browse flights, hotels, or cars to add an
                  item to your booking.
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-semibold text-sky-300">
                  <Link to="/flights" className="hover:text-white">
                    Flights
                  </Link>
                  <Link to="/hotels" className="hover:text-white">
                    Hotels
                  </Link>
                  <Link to="/cars" className="hover:text-white">
                    Cars
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
