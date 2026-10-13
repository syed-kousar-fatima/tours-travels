
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  MapPin,
  Minus,
  PlaneTakeoff,
  Plus,
  Search,
  Users,
} from "lucide-react";
import Button from "../components/common/Button";
import PopularDestinations from "../components/home/PopularDestinations";
import FlightOffers from "../components/home/FlightOffers";
import TravelServices from "../components/home/TravelServices";
import TestimonialsSlider from "../components/home/TestimonialsSlider";
import Newsletter from "../components/home/Newsletter";

const searchTypes = [
  { id: "flights", label: "Flights", icon: PlaneTakeoff },
  { id: "hotels", label: "Hotels", icon: MapPin },
  { id: "cars", label: "Cars", icon: CarFront },
];

const benefits = [
  {
    number: "01",
    title: "Best Travel Deals",
    description:
      "Discover great-value travel options for your next trip, from flights to memorable getaways.",
  },
  {
    number: "02",
    title: "Easy Booking",
    description:
      "Explore your options and plan your journey through a simple, convenient booking experience.",
  },
  {
    number: "03",
    title: "Travel Support",
    description:
      "Get help with planning and make your travel experience smoother from start to finish.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [activeType, setActiveType] = useState("flights");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [tripType, setTripType] = useState("round-trip");
  const [roomCount, setRoomCount] = useState(1);
  const [carPickupDate, setCarPickupDate] = useState("");
  const [carReturnDate, setCarReturnDate] = useState("");

  const today = new Date().toLocaleDateString("en-CA");

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (activeType === "flights") {
      if (
        !origin.trim() ||
        !destination.trim() ||
        !departureDate ||
        (tripType === "round-trip" &&
          (!returnDate || returnDate < departureDate))
      ) {
        return;
      }

      params.set("from", origin.trim());
      params.set("to", destination.trim());
      params.set("departure", departureDate);
      params.set("tripType", tripType);
      params.set("travelers", String(travelers));

      if (tripType === "round-trip") {
        params.set("return", returnDate);
      }
    }

    if (activeType === "hotels") {
      if (
        !destination.trim() ||
        !departureDate ||
        !returnDate ||
        returnDate <= departureDate
      ) {
        return;
      }

      params.set("destination", destination.trim());
      params.set("checkIn", departureDate);
      params.set("checkOut", returnDate);
      params.set("rooms", String(roomCount));
      params.set("guests", String(travelers));
    }

    if (activeType === "cars") {
      if (
        !destination.trim() ||
        !carPickupDate ||
        !carReturnDate ||
        carReturnDate < carPickupDate
      ) {
        return;
      }

      params.set("location", destination.trim());
      params.set("pickupDate", carPickupDate);
      params.set("returnDate", carReturnDate);
    }

    navigate(`/${activeType}?${params.toString()}`);
  };

  const updateTravelers = (change) => {
    setTravelers((current) => Math.max(1, Math.min(12, current + change)));
  };

  const updateRooms = (change) => {
    setRoomCount((current) => Math.max(1, Math.min(8, current + change)));
  };

  const inputClass =
    "w-full min-w-0 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500";

  const fieldClass =
    "flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20";

  const iconClass = "h-5 w-5 shrink-0 text-cyan-400";

  const counterButtonClass =
    "flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <main className="w-full overflow-hidden bg-slate-950 text-white">
      <section
        id="home"
        className="relative flex min-h-[680px] w-full items-center overflow-hidden bg-slate-950 pb-12 pt-16 sm:min-h-[720px] sm:pb-16 sm:pt-20 lg:min-h-[760px] lg:pb-20 lg:pt-24"
      >
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/736x/d4/12/6f/d4126fc5abc48b59247d48991e851929.jpg"
            alt="Airplane flying above the clouds"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
        </div>

        <div className="container-fluid relative z-10 w-full">
          <div className="grid w-full items-center gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-3xl"
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-900/60 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md sm:mb-5">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Your Journey, Our Passion
              </span>

              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl">
                Discover the
                <span className="mt-2 block bg-gradient-to-r from-sky-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  World Beyond
                </span>
                Boundaries
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8 lg:text-xl">
                Explore amazing destinations, find the right travel options,
                and turn your next holiday into an unforgettable adventure with
                Aeroplane Tours &amp; Travels.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 sm:mt-7">
                <Button
                  onClick={() =>
                    document
                      .getElementById("popular-destinations")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Destinations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("travel-services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-xl border border-slate-600 bg-slate-900/60 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:border-cyan-400/60 hover:bg-slate-800"
                >
                  Discover Our Services
                </button>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-300 sm:mt-8 sm:gap-x-10">
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">
                    50+
                  </p>
                  <p className="mt-1">Destinations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">
                    24/7
                  </p>
                  <p className="mt-1">Travel Assistance</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white sm:text-3xl">
                    Easy
                  </p>
                  <p className="mt-1">Trip Planning</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full xl:justify-self-end"
            >
              <div className="overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/95 p-4 text-slate-100 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6 lg:p-7">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Plan Your Journey
                  </h2>
                  <p className="mt-2 text-sm text-slate-400 sm:text-base">
                    Find travel options that fit your plans.
                  </p>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl border border-slate-700 bg-slate-950 p-2">
                  {searchTypes.map((type) => {
                    const Icon = type.icon;
                    const isActive = activeType === type.id;

                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setActiveType(type.id)}
                        className={`flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-sm font-semibold transition sm:px-4 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                            : "text-slate-400 hover:bg-slate-800 hover:text-cyan-300"
                        }`}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        {type.label}
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                  {activeType === "flights" && (
                    <>
                      <div className="flex flex-wrap gap-5 text-sm font-medium text-slate-300">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="radio"
                            name="tripType"
                            value="round-trip"
                            checked={tripType === "round-trip"}
                            onChange={(event) => {
                              setTripType(event.target.value);
                              setReturnDate("");
                            }}
                            className="accent-cyan-400"
                          />
                          Round trip
                        </label>

                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="radio"
                            name="tripType"
                            value="one-way"
                            checked={tripType === "one-way"}
                            onChange={(event) => setTripType(event.target.value)}
                            className="accent-cyan-400"
                          />
                          One way
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-slate-200">
                            From
                          </span>
                          <div className={fieldClass}>
                            <PlaneTakeoff className={iconClass} />
                            <input
                              type="text"
                              required
                              value={origin}
                              onChange={(event) => setOrigin(event.target.value)}
                              placeholder="Departure city"
                              className={inputClass}
                            />
                          </div>
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-slate-200">
                            To
                          </span>
                          <div className={fieldClass}>
                            <MapPin className={iconClass} />
                            <input
                              type="text"
                              required
                              value={destination}
                              onChange={(event) =>
                                setDestination(event.target.value)
                              }
                              placeholder="Arrival city"
                              className={inputClass}
                            />
                          </div>
                        </label>
                      </div>

                      <div
                        className={`grid gap-4 ${
                          tripType === "round-trip"
                            ? "sm:grid-cols-2"
                            : "grid-cols-1"
                        }`}
                      >
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-slate-200">
                            Departure
                          </span>
                          <div className={fieldClass}>
                            <CalendarDays className={iconClass} />
                            <input
                              type="date"
                              required
                              min={today}
                              value={departureDate}
                              onChange={(event) => {
                                setDepartureDate(event.target.value);
                                if (
                                  returnDate &&
                                  event.target.value > returnDate
                                ) {
                                  setReturnDate("");
                                }
                              }}
                              className={inputClass}
                            />
                          </div>
                        </label>

                        {tripType === "round-trip" && (
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-200">
                              Return
                            </span>
                            <div className={fieldClass}>
                              <CalendarDays className={iconClass} />
                              <input
                                type="date"
                                required
                                min={departureDate || today}
                                value={returnDate}
                                onChange={(event) =>
                                  setReturnDate(event.target.value)
                                }
                                className={inputClass}
                              />
                            </div>
                          </label>
                        )}
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Users className={iconClass} />
                          <div>
                            <p className="text-sm font-semibold text-slate-200">
                              Travelers
                            </p>
                            <p className="text-xs text-slate-500">
                              Number of passengers
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            aria-label="Remove traveler"
                            disabled={travelers <= 1}
                            onClick={() => updateTravelers(-1)}
                            className={counterButtonClass}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-5 text-center font-semibold text-white">
                            {travelers}
                          </span>
                          <button
                            type="button"
                            aria-label="Add traveler"
                            disabled={travelers >= 12}
                            onClick={() => updateTravelers(1)}
                            className={counterButtonClass}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {activeType === "hotels" && (
                    <>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-200">
                          Destination
                        </span>
                        <div className={fieldClass}>
                          <MapPin className={iconClass} />
                          <input
                            type="text"
                            required
                            value={destination}
                            onChange={(event) =>
                              setDestination(event.target.value)
                            }
                            placeholder="City or destination"
                            className={inputClass}
                          />
                        </div>
                      </label>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-slate-200">
                            Check-in
                          </span>
                          <div className={fieldClass}>
                            <CalendarDays className={iconClass} />
                            <input
                              type="date"
                              required
                              min={today}
                              value={departureDate}
                              onChange={(event) => {
                                setDepartureDate(event.target.value);
                                if (
                                  returnDate &&
                                  event.target.value >= returnDate
                                ) {
                                  setReturnDate("");
                                }
                              }}
                              className={inputClass}
                            />
                          </div>
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-slate-200">
                            Check-out
                          </span>
                          <div className={fieldClass}>
                            <CalendarDays className={iconClass} />
                            <input
                              type="date"
                              required
                              min={departureDate || today}
                              value={returnDate}
                              onChange={(event) =>
                                setReturnDate(event.target.value)
                              }
                              className={inputClass}
                            />
                          </div>
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-200">
                              Rooms
                            </p>
                            <p className="text-xs text-slate-500">
                              Number of rooms
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label="Remove room"
                              disabled={roomCount <= 1}
                              onClick={() => updateRooms(-1)}
                              className={counterButtonClass}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-4 text-center font-semibold text-white">
                              {roomCount}
                            </span>
                            <button
                              type="button"
                              aria-label="Add room"
                              disabled={roomCount >= 8}
                              onClick={() => updateRooms(1)}
                              className={counterButtonClass}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-200">
                              Guests
                            </p>
                            <p className="text-xs text-slate-500">
                              Number of guests
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label="Remove guest"
                              disabled={travelers <= 1}
                              onClick={() => updateTravelers(-1)}
                              className={counterButtonClass}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-4 text-center font-semibold text-white">
                              {travelers}
                            </span>
                            <button
                              type="button"
                              aria-label="Add guest"
                              disabled={travelers >= 12}
                              onClick={() => updateTravelers(1)}
                              className={counterButtonClass}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeType === "cars" && (
                    <>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-200">
                          Pickup location
                        </span>
                        <div className={fieldClass}>
                          <MapPin className={iconClass} />
                          <input
                            type="text"
                            required
                            value={destination}
                            onChange={(event) =>
                              setDestination(event.target.value)
                            }
                            placeholder="Enter city or pickup location"
                            className={inputClass}
                          />
                        </div>
                      </label>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-slate-200">
                            Pickup date
                          </span>
                          <div className={fieldClass}>
                            <CalendarDays className={iconClass} />
                            <input
                              type="date"
                              required
                              min={today}
                              value={carPickupDate}
                              onChange={(event) => {
                                setCarPickupDate(event.target.value);
                                if (
                                  carReturnDate &&
                                  event.target.value > carReturnDate
                                ) {
                                  setCarReturnDate("");
                                }
                              }}
                              className={inputClass}
                            />
                          </div>
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-slate-200">
                            Return date
                          </span>
                          <div className={fieldClass}>
                            <CalendarDays className={iconClass} />
                            <input
                              type="date"
                              required
                              min={carPickupDate || today}
                              value={carReturnDate}
                              onChange={(event) =>
                                setCarReturnDate(event.target.value)
                              }
                              className={inputClass}
                            />
                          </div>
                        </label>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-600 hover:shadow-cyan-500/20 focus:outline-none focus:ring-4 focus:ring-cyan-400/30"
                  >
                    <Search className="h-5 w-5" />
                    Search{" "}
                    {activeType === "flights"
                      ? "Flights"
                      : activeType === "hotels"
                        ? "Hotels"
                        : "Cars"}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Search results depend on the availability and functionality
                  configured on your destination pages.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PopularDestinations />
      <FlightOffers />
      <TravelServices />
      <TestimonialsSlider />

      <section
        id="travel-benefits"
        className="w-full border-t border-slate-800 bg-slate-950 py-16 sm:py-20 lg:py-24"
      >
        <div className="container-fluid w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              Why Travel With Us
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your Journey, Made Better
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
              Plan with confidence and discover a more convenient way to
              experience the world.
            </p>
          </motion.div>

          <div className="grid w-full gap-6 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/5 sm:p-8"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-lg font-bold text-cyan-300 transition group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white">
                  {benefit.number}
                </span>

                <h3 className="mt-6 text-xl font-bold text-white sm:text-2xl">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {benefit.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
};

export default Home;
