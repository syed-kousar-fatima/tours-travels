
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowDownUp,
  Check,
  Filter,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X
} from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import HotelCard from "../components/hotels/HotelCard";
import hotels from "../data/hotels";

const amenitiesList = [
  "Wi-Fi",
  "Pool",
  "Breakfast",
  "Gym",
  "Spa",
  "Beach",
  "Restaurant"
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);

export default function HotelResults() {
  const [searchParams] = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("to") || searchParams.get("destination") || ""
  );
  const [maxPrice, setMaxPrice] = useState(30000);
  const [minimumRating, setMinimumRating] = useState("0");
  const [minimumStars, setMinimumStars] = useState("0");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  };

  const filteredHotels = useMemo(() => {
    const query = destination.trim().toLowerCase();

    const result = hotels.filter((hotel) => {
      const matchesDestination =
        !query ||
        `${hotel.city} ${hotel.country} ${hotel.area} ${hotel.name}`
          .toLowerCase()
          .includes(query);

      const matchesPrice = hotel.price <= maxPrice;
      const matchesRating = hotel.rating >= Number(minimumRating);
      const matchesStars = hotel.stars >= Number(minimumStars);
      const matchesAmenities = selectedAmenities.every((amenity) =>
        hotel.amenities.includes(amenity)
      );

      return (
        matchesDestination &&
        matchesPrice &&
        matchesRating &&
        matchesStars &&
        matchesAmenities
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "stars") {
      result.sort((a, b) => b.stars - a.stars || b.rating - a.rating);
    }

    return result;
  }, [
    destination,
    maxPrice,
    minimumRating,
    minimumStars,
    selectedAmenities,
    sortBy
  ]);

  const resetFilters = () => {
    setDestination("");
    setMaxPrice(30000);
    setMinimumRating("0");
    setMinimumStars("0");
    setSelectedAmenities([]);
    setSortBy("recommended");
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-slate-950 pb-16 pt-28 text-white sm:pt-32">
      <section className="container-fluid">
        <SectionHeading
          title="Find Your Perfect Stay"
          subtitle="HOTELS & RESORTS"
          description="Discover stays that match your destination, budget, and travel style."
        />

        <div className="mx-auto mb-8 grid w-full max-w-5xl gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl sm:grid-cols-[1fr_auto] sm:items-end sm:p-5">
          <label className="block min-w-0">
            <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
              <MapPin size={16} className="text-sky-400" />
              Destination or hotel
            </span>
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-3 focus-within:border-sky-400">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                type="search"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Try Dubai, Paris, Maldives..."
                className="w-full min-w-0 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
              {destination && (
                <button
                  type="button"
                  onClick={() => setDestination("")}
                  className="shrink-0 rounded-md p-1 text-slate-400 hover:text-white"
                  aria-label="Clear destination"
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
                htmlFor="hotel-price"
                className="flex items-center justify-between gap-2 text-sm font-semibold"
              >
                Maximum nightly price
                <span className="text-sky-300">{formatPrice(maxPrice)}</span>
              </label>
              <input
                id="hotel-price"
                type="range"
                min="5000"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="mt-5 w-full accent-sky-400"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>₹5,000</span>
                <span>₹30,000+</span>
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Guest rating
              </span>
              <select
                value={minimumRating}
                onChange={(event) => setMinimumRating(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-sky-400"
              >
                <option value="0">Any rating</option>
                <option value="4">4.0+ rating</option>
                <option value="4.5">4.5+ rating</option>
                <option value="4.8">4.8+ rating</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Hotel category
              </span>
              <select
                value={minimumStars}
                onChange={(event) => setMinimumStars(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-sky-400"
              >
                <option value="0">All categories</option>
                <option value="3">3 stars and above</option>
                <option value="4">4 stars and above</option>
                <option value="5">5 stars only</option>
              </select>
            </label>

            <div>
              <p className="mb-3 text-sm font-semibold">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map((amenity) => {
                  const selected = selectedAmenities.includes(amenity);

                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      aria-pressed={selected}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition ${
                        selected
                          ? "border-sky-300 bg-sky-400/15 text-sky-200"
                          : "border-white/10 bg-slate-950 text-slate-300 hover:border-sky-400/40"
                      }`}
                    >
                      {selected && <Check size={13} />}
                      {amenity}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold">
              {filteredHotels.length}{" "}
              {filteredHotels.length === 1 ? "stay" : "stays"} found
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {destination.trim()
                ? `Matching "${destination.trim()}"`
                : "Explore stays across popular destinations"}
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-300">
            <ArrowDownUp size={17} className="text-sky-300" />
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
              <option value="stars">Hotel category</option>
            </select>
          </label>
        </div>

        {filteredHotels.length > 0 ? (
          <div className="travel-grid">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
              <Filter size={25} />
            </div>
            <h2 className="mt-5 text-xl font-bold">No matching hotels</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              Try another destination, increase your nightly budget, or remove
              one or more filters.
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
