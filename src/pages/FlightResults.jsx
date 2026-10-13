
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowDownUp,
  PlaneTakeoff,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import FlightCard from "../components/flights/FlightCard";
import flights from "../data/flights";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function FlightResults() {
  const [searchParams] = useSearchParams();

  const fromQuery = searchParams.get("from") || "";
  const toQuery = searchParams.get("to") || "";

  const [airline, setAirline] = useState("all");
  const [stops, setStops] = useState("all");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [sortBy, setSortBy] = useState("price-low");
  const [showFilters, setShowFilters] = useState(false);

  const airlines = useMemo(
    () => [...new Set(flights.map((flight) => flight.airline))].sort(),
    []
  );

  const filteredFlights = useMemo(() => {
    const normalize = (value) => value.trim().toLowerCase();

    const matchesPlace = (value, city, code) => {
      if (!value) return true;
      const query = normalize(value);
      return normalize(city).includes(query) || normalize(code).includes(query);
    };

    const results = flights.filter((flight) => {
      const matchesFrom = matchesPlace(
        fromQuery,
        flight.from,
        flight.fromCode
      );
      const matchesTo = matchesPlace(toQuery, flight.to, flight.toCode);
      const matchesAirline = airline === "all" || flight.airline === airline;
      const matchesStops =
        stops === "all" || flight.stops === Number(stops);
      const matchesPrice = flight.price <= maxPrice;

      return (
        matchesFrom &&
        matchesTo &&
        matchesAirline &&
        matchesStops &&
        matchesPrice
      );
    });

    return results.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "duration") return a.durationMins - b.durationMins;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [fromQuery, toQuery, airline, stops, maxPrice, sortBy]);

  const resetFilters = () => {
    setAirline("all");
    setStops("all");
    setMaxPrice(60000);
    setSortBy("price-low");
  };

  return (
    <div className="min-h-screen w-full bg-slate-950">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-sky-950 via-slate-950 to-slate-950">
        <div className="container-fluid py-12 sm:py-16 lg:py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-2 text-xs font-semibold text-sky-200">
            <PlaneTakeoff size={15} />
            Explore flight options
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find your next flight
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Compare sample flights by route, airline, stops, duration, and
            price. Hover over a card or tap Details to explore more.
          </p>

          {(fromQuery || toQuery) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {fromQuery && (
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  From: {fromQuery}
                </span>
              )}
              {toQuery && (
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  To: {toQuery}
                </span>
              )}
              <Link
                to="/flights"
                className="text-sm font-semibold text-sky-300 hover:text-sky-200"
              >
                View all routes
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="container-fluid section-spacing">
        <SectionHeading
          eyebrow="Flight listings"
          title="Choose the right flight"
          description="Compare fares and flight details before selecting an option."
          align="left"
          className="mb-7"
        />

        <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              aria-expanded={showFilters}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-white transition hover:border-sky-400"
            >
              <SlidersHorizontal size={17} />
              {showFilters ? "Hide filters" : "Filters"}
            </button>

            <div className="flex min-h-11 items-center gap-2 rounded-xl bg-sky-400/10 px-4 py-3 text-sm text-sky-200">
              <PlaneTakeoff size={17} />
              <span>{filteredFlights.length} flights found</span>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:text-white"
            >
              <RotateCcw size={15} />
              Reset filters
            </button>
          </div>

          <label className="flex min-w-0 flex-col gap-2 text-xs font-medium text-slate-400 sm:max-w-xs">
            <span className="flex items-center gap-2">
              <ArrowDownUp size={15} />
              Sort results
            </span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
            >
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="duration">Shortest duration</option>
              <option value="rating">Highest rating</option>
            </select>
          </label>
        </div>

        {showFilters && (
          <div className="mb-7 grid gap-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
            <label className="flex min-w-0 flex-col gap-2 text-sm text-slate-300">
              Airline
              <select
                value={airline}
                onChange={(event) => setAirline(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none focus:border-sky-400"
              >
                <option value="all">All airlines</option>
                {airlines.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-w-0 flex-col gap-2 text-sm text-slate-300">
              Stops
              <select
                value={stops}
                onChange={(event) => setStops(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none focus:border-sky-400"
              >
                <option value="all">Any number of stops</option>
                <option value="0">Non-stop only</option>
                <option value="1">1 stop</option>
              </select>
            </label>

            <label className="flex min-w-0 flex-col gap-3 text-sm text-slate-300 sm:col-span-2 xl:col-span-1">
              <span className="flex items-center justify-between gap-2">
                <span>Maximum price</span>
                <span className="font-semibold text-sky-300">
                  {money(maxPrice)}
                </span>
              </span>
              <input
                type="range"
                min="5000"
                max="60000"
                step="1000"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="w-full accent-sky-400"
              />
              <span className="flex justify-between text-xs text-slate-500">
                <span>{money(5000)}</span>
                <span>{money(60000)}</span>
              </span>
            </label>
          </div>
        )}

        {filteredFlights.length > 0 ? (
          <div className="travel-grid">
            {filteredFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-white/[0.02] px-5 py-12 text-center">
            <PlaneTakeoff size={38} className="text-slate-500" />
            <h3 className="mt-5 text-xl font-bold text-white">
              No matching flights
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Try another route or relax your airline, stop-count, and price
              filters to see more options.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-sky-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-300"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
