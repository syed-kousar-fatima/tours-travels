
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CarFront,
  Check,
  MapPin,
  PlaneTakeoff,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Dubai",
    country: "United Arab Emirates",
    code: "DXB",
    price: "From ₹14,200",
    image:
      "https://i.pinimg.com/1200x/59/03/58/590358c06c4150f9b18ce0cf5c8d1092.jpg",
    description:
      "Discover futuristic skyscrapers, luxury shopping, and desert adventures.",
    places: [
      {
        name: "Burj Khalifa",
        description:
          "Experience spectacular skyline views from the world's tallest building.",
        image:
          "https://i.pinimg.com/736x/db/6c/c8/db6cc819afcf43ac579bd3ab916020c4.jpg"
      },
      {
        name: "Dubai Marina",
        description:
          "Explore waterfront promenades, restaurants, and stunning skyscrapers.",
        image:
          "https://i.pinimg.com/1200x/eb/95/28/eb9528a0572332822a6d5a03bf1d9a2d.jpg"
      },
      {
        name: "Palm Jumeirah",
        description:
          "Discover the famous palm-shaped island and beachfront attractions.",
        image:
          "https://i.pinimg.com/736x/62/4a/12/624a12496ef60c0a181396cbbe64809b.jpg"
      },
      {
        name: "Dubai Mall",
        description:
          "Enjoy shopping, dining, entertainment, and the Dubai Fountain area.",
        image:
          "https://i.pinimg.com/736x/8b/05/79/8b0579099b2a8fc97586eb317d01d44f.jpg"
      }
    ]
  },
  {
    name: "London",
    country: "United Kingdom",
    code: "LHR",
    price: "From ₹44,200",
    image:
      "https://i.pinimg.com/1200x/f4/22/ac/f422ac2b9f86a6d1de32cf5b01703b75.jpg",
    description:
      "Discover royal landmarks, historic streets, museums, and iconic city views.",
    places: [
      {
        name: "Big Ben",
        description:
          "See London's famous clock tower beside the Houses of Parliament.",
        image:
          "https://i.pinimg.com/736x/cd/2d/cf/cd2dcf5d05d298548db59eeb6905a00f.jpg"
      },
      {
        name: "Tower Bridge",
        description:
          "Walk beside the iconic bridge spanning the River Thames.",
        image:
          "https://i.pinimg.com/1200x/6d/87/70/6d87709f08390de731fa4a8d9b164348.jpg"
      },
      {
        name: "Buckingham Palace",
        description:
          "Explore the famous royal residence and surrounding landmarks.",
        image:
          "https://i.pinimg.com/1200x/b7/b4/ef/b7b4efecfba75877396809ff03d8144b.jpg"
      },
      {
        name: "London Eye",
        description:
          "Enjoy panoramic views of London's skyline from the riverside wheel.",
        image:
          "https://i.pinimg.com/736x/96/c1/fb/96c1fb47f0b2989df6e3afc8aa327f08.jpg"
      }
    ]
  },
  {
    name: "Singapore",
    country: "Singapore",
    code: "SIN",
    price: "From ₹19,800",
    image:
      "https://i.pinimg.com/1200x/cb/6b/10/cb6b10b3e8337f9f55de6ab8e8061ac7.jpg",
    description:
      "Explore futuristic gardens, waterfront attractions, and vibrant city life.",
    places: [
      {
        name: "Gardens by the Bay",
        description:
          "Discover the iconic Supertrees and extraordinary indoor gardens.",
        image:
          "https://i.pinimg.com/736x/1e/99/13/1e99139da3405502e3a30b32e660f62d.jpg"
      },
      {
        name: "Marina Bay Sands",
        description:
          "Experience Singapore's famous waterfront skyline and entertainment.",
        image:
          "https://i.pinimg.com/1200x/d7/16/c7/d716c72852bd02dfdbe54d97c78ae335.jpg"
      },
      {
        name: "Sentosa Island",
        description:
          "Enjoy beaches, attractions, and family-friendly adventures.",
        image:
          "https://i.pinimg.com/736x/e3/c0/e2/e3c0e2524456caa21514d6d339d583c5.jpg"
      },
      {
        name: "Merlion Park",
        description:
          "Visit Singapore's iconic Merlion statue overlooking Marina Bay.",
        image:
          "https://i.pinimg.com/736x/8d/27/5f/8d275f28a90577aec26c62f19c93490c.jpg"
      }
    ]
  },
  {
    name: "Mumbai",
    country: "India",
    code: "BOM",
    price: "From ₹6,200",
    image:
      "https://i.pinimg.com/736x/2c/54/3d/2c543d337100766bef06aa6440263fc4.jpg",
    description:
      "Experience India's energetic financial capital, coastal views, and heritage.",
    places: [
      {
        name: "Gateway of India",
        description:
          "Visit Mumbai's famous waterfront monument and harbour.",
        image:
          "https://i.pinimg.com/736x/e4/4a/38/e44a38db64cfcbcf513295174da760cf.jpg"
      },
      {
        name: "Marine Drive",
        description:
          "Enjoy a relaxing coastal walk and the celebrated Queen's Necklace.",
        image:
          "https://i.pinimg.com/736x/90/89/4f/90894f8d546b271f866bc6eb8465a612.jpg"
      },
      {
        name: "Chhatrapati Shivaji Maharaj Terminus",
        description:
          "Admire the historic railway station's remarkable architecture.",
        image:
          "https://i.pinimg.com/736x/cf/0d/f1/cf0df1855bc86b02a0a1575e0012fd90.jpg"
      },
      {
        name: "Juhu Beach",
        description:
          "Enjoy a seaside stroll and Mumbai's popular street-food culture.",
        image:
          "https://i.pinimg.com/736x/6d/93/f0/6d93f0d6dad17b262fb42eec38e515d2.jpg"
      }
    ]
  },
  {
    name: "Delhi",
    country: "India",
    code: "DEL",
    price: "From ₹8,900",
    image:
      "https://i.pinimg.com/1200x/11/66/e8/1166e8f62f1b25cef42c9e74fad9b188.jpg",
    description:
      "Explore historic monuments, bustling markets, and India's capital city.",
    places: [
      {
        name: "India Gate",
        description:
          "Visit the prominent war memorial along New Delhi's ceremonial avenue.",
        image:
          "https://i.pinimg.com/736x/b0/41/ed/b041ed57bee04e2964f58ef739b4be92.jpg"
      },
      {
        name: "Red Fort",
        description:
          "Discover the impressive Mughal-era fort and its historic grounds.",
        image:
          "https://i.pinimg.com/1200x/d6/66/63/d66663365dbd599635aff490b1f2b48a.jpg"
      },
      {
        name: "Qutub Minar",
        description:
          "Explore the towering minaret and surrounding historic complex.",
        image:
          "https://i.pinimg.com/736x/52/c3/ee/52c3ee3527614464af94212c318de0c3.jpg"
      },
      {
        name: "Lotus Temple",
        description:
          "Experience the striking lotus-shaped architecture and peaceful gardens.",
        image:
          "https://i.pinimg.com/1200x/1b/b8/51/1bb851a0af9b48202c6b70e29cdf04c5.jpg"
      }
    ]
  }
];

const bookingOptions = [
  {
    title: "Book Flights",
    description: "Find flights to your destination",
    icon: PlaneTakeoff,
    path: "/flights",
    color: "text-sky-300",
    background: "bg-sky-400/10",
    parameter: "to"
  },
  {
    title: "Book Hotels",
    description: "Find a comfortable place to stay",
    icon: Building2,
    path: "/hotels",
    color: "text-cyan-300",
    background: "bg-cyan-400/10",
    parameter: "destination"
  },
  {
    title: "Book Cars",
    description: "Arrange transport for your trip",
    icon: CarFront,
    path: "/cars",
    color: "text-blue-300",
    background: "bg-blue-400/10",
    parameter: "location"
  }
];

export default function PopularDestinations() {
  const navigate = useNavigate();
  const [activeDestination, setActiveDestination] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const openDestination = (destination) => {
    setActiveDestination(destination);
    setSelectedPlace(null);
  };

  const closeDestination = () => {
    setActiveDestination(null);
    setSelectedPlace(null);
  };

  const bookTrip = (option) => {
    if (!activeDestination || !selectedPlace) return;

    const params = new URLSearchParams({
      [option.parameter]: activeDestination.name,
      place: selectedPlace.name,
      destinationCode: activeDestination.code
    });

    navigate(`${option.path}?${params.toString()}`);
    closeDestination();
  };

  return (
    <>
      <section
        id="popular-destinations"
        className="w-full overflow-hidden bg-slate-950 py-14 text-white sm:py-20 lg:py-24 2xl:py-28"
      >
        <div className="container-fluid">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300 sm:text-sm">
                Explore the world
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl 2xl:text-6xl">
                Find your next adventure
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Discover incredible destinations, explore their famous
                attractions, and arrange your trip in one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/flights")}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:border-sky-300/60 hover:bg-sky-300/10"
            >
              Explore flights
              <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 2xl:gap-5">
            {destinations.map((destination, index) => (
              <motion.article
                key={destination.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                className="group relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
              >
                <div className="relative h-72 overflow-hidden sm:h-80 lg:h-72 2xl:h-[360px]">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      <MapPin size={13} className="text-sky-300" />
                      {destination.country}
                    </div>

                    <h3 className="text-2xl font-extrabold sm:text-3xl">
                      {destination.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      {destination.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm font-bold text-sky-200">
                        {destination.price}
                      </span>

                      <button
                        type="button"
                        onClick={() => openDestination(destination)}
                        aria-label={`Explore places in ${destination.name}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-sky-300 sm:text-sm"
                      >
                        Explore
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeDestination && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDestination}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="destination-modal-title"
              initial={{ opacity: 0, y: 35, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-white/10 bg-slate-950 text-white shadow-2xl sm:rounded-3xl"
            >
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl sm:px-7">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedPlace) {
                      setSelectedPlace(null);
                    } else {
                      closeDestination();
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft size={17} />
                  {selectedPlace ? "All places" : "Destinations"}
                </button>

                <button
                  type="button"
                  onClick={closeDestination}
                  aria-label="Close destination details"
                  className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 sm:p-7 lg:p-8">
                <div className="relative mb-8 h-48 overflow-hidden rounded-2xl sm:h-64 lg:h-72">
                  <img
                    src={selectedPlace?.image || activeDestination.image}
                    alt={selectedPlace?.name || activeDestination.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                      <MapPin size={14} />
                      {activeDestination.country}
                    </span>

                    <h2
                      id="destination-modal-title"
                      className="mt-2 text-3xl font-black sm:text-4xl lg:text-5xl"
                    >
                      {selectedPlace?.name || activeDestination.name}
                    </h2>

                    <p className="mt-2 text-sm text-slate-200 sm:text-base">
                      {selectedPlace
                        ? selectedPlace.description
                        : activeDestination.description}
                    </p>
                  </div>
                </div>

                {!selectedPlace ? (
                  <>
                    <div className="mb-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                        Must-see attractions
                      </p>

                      <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                        Places to explore
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Choose a place to continue to your flight, hotel, or
                        car booking options.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {activeDestination.places.map((place, index) => (
                        <motion.button
                          key={place.name}
                          type="button"
                          onClick={() => setSelectedPlace(place)}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-left transition hover:border-sky-300/50"
                        >
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={place.image}
                              alt={place.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />

                            <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-sm font-bold text-sky-200 backdrop-blur">
                              {index + 1}
                            </span>
                          </div>

                          <div className="p-4">
                            <h4 className="text-lg font-bold">
                              {place.name}
                            </h4>

                            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                              {place.description}
                            </p>

                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-300">
                              Select this place
                              <ArrowRight size={16} />
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div
                    key="booking-options"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="mb-6">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                        Your trip starts here
                      </span>

                      <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                        How would you like to travel?
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {selectedPlace.name}, {activeDestination.name},{" "}
                        {activeDestination.country}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {bookingOptions.map((option) => {
                        const Icon = option.icon;

                        return (
                          <button
                            key={option.title}
                            type="button"
                            onClick={() => bookTrip(option)}
                            className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900 p-5 text-left transition hover:-translate-y-1 hover:border-sky-300/50 hover:bg-slate-900/80"
                          >
                            <span
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${option.background} ${option.color}`}
                            >
                              <Icon size={23} />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block text-lg font-bold">
                                {option.title}
                              </span>

                              <span className="mt-1 block text-sm leading-6 text-slate-400">
                                {option.description}
                              </span>

                              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-300">
                                Continue
                                <ArrowRight
                                  size={16}
                                  className="transition group-hover:translate-x-1"
                                />
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sky-300/15 bg-sky-300/5 p-4">
                      <Check
                        size={19}
                        className="mt-0.5 shrink-0 text-sky-300"
                      />

                      <p className="text-sm leading-6 text-slate-300">
                        Your selected destination, airport code, and attraction
                        will be passed to the booking page. Review your dates
                        and booking details before continuing.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
