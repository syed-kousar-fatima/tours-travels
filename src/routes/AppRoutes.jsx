
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import FlightResults from "../pages/FlightResults";
import HotelResults from "../pages/HotelResults";
import CarResults from "../pages/CarResults";
import PassengerDetails from "../pages/PassengerDetails";
import ReviewBooking from "../pages/ReviewBooking";
import Payment from "../pages/Payment";
import BookingConfirmation from "../pages/BookingConfimation";
import MyBookings from "../pages/MyBookings";
import About from "../pages/About";
import Contact from "../pages/Contact";
import BookingStepGuard from "../components/common/BookingStepGuard";

function PlaceholderPage({ title }) {
  const location = useLocation();
  const params = [...new URLSearchParams(location.search).entries()];

  return (
    <section className="container-fluid section-spacing min-h-[60vh]">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
          Aeroplane Tours & Travels
        </p>

        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          This page is connected to the application. Its remaining features will
          be added in the next development step.
        </p>

        {params.length > 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h2 className="mb-3 font-semibold text-white">Your search</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {params.map(([key, value]) => (
                <div key={key} className="min-w-0">
                  <dt className="text-xs capitalize text-slate-500">
                    {key.replace(/([A-Z])/g, " $1")}
                  </dt>
                  <dd className="mt-1 break-words text-sm text-slate-200">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <Link
          to="/"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="container-fluid flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
        404 Error
      </p>
      <h1 className="mt-4 text-4xl font-bold text-white">Page not found</h1>
      <p className="mt-3 text-slate-400">
        The page you requested does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400"
      >
        Return Home
      </Link>
    </section>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/flights" element={<FlightResults />} />
        <Route path="/hotels" element={<HotelResults />} />
        <Route path="/cars" element={<CarResults />} />

        <Route path="/passengers" element={<PassengerDetails />} />

        <Route
          path="/review-booking"
          element={
            <BookingStepGuard step="review">
              <ReviewBooking />
            </BookingStepGuard>
          }
        />

        <Route
          path="/payment"
          element={
            <BookingStepGuard step="payment">
              <Payment />
            </BookingStepGuard>
          }
        />

        <Route
          path="/booking-confirmation"
          element={
            <BookingStepGuard step="confirmation">
              <BookingConfirmation />
            </BookingStepGuard>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route
          path="/flight-details"
          element={<PlaceholderPage title="Flight Details" />}
        />

        <Route
          path="/hotel-details"
          element={<PlaceholderPage title="Hotel Details" />}
        />

        <Route
          path="/seats"
          element={<PlaceholderPage title="Seat Selection" />}
        />

        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
