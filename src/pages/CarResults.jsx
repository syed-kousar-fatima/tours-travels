import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowDownUp,
  CarFront,
  Check,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X
} from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import CarCard from "../components/cars/CarCard";
import cars from "../data/cars";

const vehicleTypes = ["Hatchback", "Sedan", "SUV", "MUV", "Luxury", "Electric"];
const transmissionTypes = ["Automatic", "Manual"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

const getCurrency = (city) => {
  if (city === "Dubai") return "AED";
  if (city === "London") return "GBP";
  if (city === "Singapore") return "SGD";
  return "INR";
};

const formatPrice = (price, city) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: getCurrency(city),
    maximumFractionDigits: 0
  }).format(price);

export default function CarResults() {
  const [searchParams] = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("to") ||
      searchParams.get("destination") ||
      searchParams.get("pickup") ||
      ""
  );
  const [maxPrice, setMaxPrice] = useState(30000);
  const [vehicleType, setVehicleType] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [minimumSeats, setMinimumSeats] = useState("0");
  const [minimumRating, setMinimumRating] = useState("0");
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const matchingCars = useMemo(() => {
    const query = destination.trim().toLowerCase();

    const result = cars.filter((car) => {
      const matchesDestination =
        !query ||
        `${car.city} ${car.name} ${car.brand} ${car.type}`
          .toLowerCase()
          .includes(query);

      const matchesPrice = car.price <= maxPrice;
      const matchesType = vehicleType === "All" || car.type === vehicleType;
      const matchesTransmission =
        transmission === "All" || car.transmission === transmission;
      const matchesFuel = fuel === "All" || car.fuel === fuel;
      const matchesSeats = car.seats >= Number(minimumSeats);
      const matchesRating = car.rating >= Number(minimumRating);

      return (
        matchesDestination &&
        matchesPrice &&
        matchesType &&
        matchesTransmission &&
        matchesFuel &&
        matchesSeats &&
        matchesRating
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "seats") {
      result.sort((a, b) => b.seats - a.seats);
    }

    return result;
  }, [
    destination,
    maxPrice,
    vehicleType,
    transmission,
    fuel,
    minimumSeats,
    minimumRating,
    sortBy
  ]);

  const resetFilters = () => {
    setDestination("");
    setMaxPrice(30000);
    setVehicleType("All");
    setTransmission("All");
    setFuel("All");
    setMinimumSeats("0");
    setMinimumRating("0");
    setSortBy("recommended");
  };

  const currencyCity = matchingCars[0]?.city || destination || "Bengaluru";

  return (
    <main className="min-h-screen w-full overflow-hidden bg-slate-950 pb-16 pt-28 text-white sm:pt-32">
      <section className="container-fluid">
        <SectionHeading
          title="Find Your Perfect Ride"
          subtitle="CAR RENTALS"
          description="Choose a vehicle that fits your destination, group size, and travel style."
        />

        <div className="mx-auto mb-8 grid w-full max-w-5xl gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl sm:grid-cols-[1fr_auto] sm:items-end sm:p-5">
          <label className="block min-w-0">
            <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
              <MapPin size={16} className="text-sky-400" />
              Pickup city or vehicle
            </span>
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-3 focus-within:border-sky-400">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                type="search"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Try Bengaluru, Dubai, SUV..."
                className="w-full min-w-0 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
              {destination && (
                <button
                  type="button"
                  onClick={() => setDestination("")}
                  className="shrink-0 rounded-md p-1 text-slate-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </label>

          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/10 px-5 py-3 font-semibold text-sky-200 transition hover:bg-sky-400/20"
          >
            <SlidersHorizontal size={18} />
            {showFilters ? "Hide Filters" : "Filters"}
          </button>
        </div>

        {showFilters && (
          <div className="mb-8 grid grid-cols-1 gap-5 rounded-3xl border border-white/10 bg-slate-900/80 p-5 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <label
                htmlFor="car-price"
                className="flex items-center justify-between gap-2 text-sm font-semibold"
              >
                Maximum daily rate
                <span className="text-right text-sky-300">
                  {formatPrice(maxPrice, currencyCity)}
                </span>
              </label>
              <input
                id="car-price"
                type="range"
                min="500"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="mt-5 w-full accent-sky-400"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>500</span>
                <span>30,000+</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Rates use the sample listing currency for each city.
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Vehicle type
              </span>
              <select
                value={vehicleType}
                onChange={(event) => setVehicleType(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-sky-400"
              >
                <option value="All">All vehicle types</option>
                {vehicleTypes.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block min-w-0">
                <span className="mb-2 block text-sm font-semibold">
                  Transmission
                </span>
                <select
                  value={transmission}
                  onChange={(event) => setTransmission(event.target.value)}
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-slate-950 px-2 py-3 text-sm text-white outline-none focus:border-sky-400"
                >
                  <option value="All">All</option>
                  {transmissionTypes.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-sm font-semibold">Fuel</span>
                <select
                  value={fuel}
                  onChange={(event) => setFuel(event.target.value)}
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-slate-950 px-2 py-3 text-sm text-white outline-none focus:border-sky-400"
                >
                  <option value="All">All</option>
                  {fuelTypes.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block min-w-0">
                <span className="mb-2 block text-sm font-semibold">
                  Minimum seats
                </span>
                <select
                  value={minimumSeats}
                  onChange={(event) => setMinimumSeats(event.target.value)}
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-slate-950 px-2 py-3 text-sm text-white outline-none focus:border-sky-400"
                >
                  <option value="0">Any</option>
                  <option value="5">5+</option>
                  <option value="7">7+</option>
                </select>
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-sm font-semibold">
                  Guest rating
                </span>
                <select
                  value={minimumRating}
                  onChange={(event) => setMinimumRating(event.target.value)}
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-slate-950 px-2 py-3 text-sm text-white outline-none focus:border-sky-400"
                >
                  <option value="0">Any</option>
                  <option value="4">4.0+</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.8">4.8+</option>
                </select>
              </label>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold">
              {matchingCars.length}{" "}
              {matchingCars.length === 1 ? "vehicle" : "vehicles"} found
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {destination.trim()
                ? `Matching "${destination.trim()}"`
                : "Explore our available sample listings"}
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-300">
            <ArrowDownUp size={17} className="shrink-0 text-sky-300" />
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="min-w-0 rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-white outline-none focus:border-sky-400"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Top rated</option>
              <option value="seats">Most seats</option>
            </select>
          </label>
        </div>

        {matchingCars.length > 0 ? (
          <div className="travel-grid">
            {matchingCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
              <CarFront size={26} />
            </div>
            <h2 className="mt-5 text-xl font-bold">No matching vehicles</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              Try a different city or vehicle category, increase your budget,
              or remove some filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-sky-300"
            >
              <RotateCcw size={17} />
              Reset all filters
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-sky-300 transition hover:text-sky-200"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}