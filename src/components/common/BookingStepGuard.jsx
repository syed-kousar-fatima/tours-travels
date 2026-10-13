
import { Navigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

export default function BookingStepGuard({ step, children }) {
  const {
    selectedFlight,
    selectedHotel,
    selectedCar,
    passengers,
    contactDetails,
    bookingReference
  } = useBooking();

  const hasSelection = Boolean(
    selectedFlight || selectedHotel || selectedCar
  );

  const hasPassengers =
    Array.isArray(passengers) && passengers.length > 0;

  const hasContactDetails = Boolean(
    contactDetails?.email?.trim() &&
    contactDetails?.phone?.trim()
  );

  if (step === "review") {
    if (!hasSelection) {
      return <Navigate to="/flights" replace />;
    }

    if (!hasPassengers || !hasContactDetails) {
      return <Navigate to="/passengers" replace />;
    }
  }

  if (step === "payment") {
    if (!hasSelection) {
      return <Navigate to="/flights" replace />;
    }

    if (!hasPassengers || !hasContactDetails) {
      return <Navigate to="/passengers" replace />;
    }
  }

  if (step === "confirmation" && !bookingReference) {
    return <Navigate to="/my-bookings" replace />;
  }

  return children;
}
