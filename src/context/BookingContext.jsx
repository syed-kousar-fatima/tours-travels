
import { createContext, useContext, useMemo, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [contactDetails, setContactDetails] = useState({
    email: "",
    phone: ""
  });
  const [bookingReference, setBookingReference] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings((current) => [
      booking,
      ...current.filter((item) => item.reference !== booking.reference)
    ]);
  };

  const cancelBooking = (reference) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.reference === reference
          ? {
              ...booking,
              status: "Cancelled",
              cancelledAt: new Date().toISOString()
            }
          : booking
      )
    );
  };

  const clearSelection = () => {
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedCar(null);
    setPassengers([]);
    setContactDetails({
      email: "",
      phone: ""
    });
    setBookingReference("");
    setPaymentMethod("");
  };

  const value = useMemo(
    () => ({
      selectedFlight,
      setSelectedFlight,
      selectedHotel,
      setSelectedHotel,
      selectedCar,
      setSelectedCar,
      passengers,
      setPassengers,
      contactDetails,
      setContactDetails,
      bookingReference,
      setBookingReference,
      paymentMethod,
      setPaymentMethod,
      bookings,
      addBooking,
      cancelBooking,
      clearSelection
    }),
    [
      selectedFlight,
      selectedHotel,
      selectedCar,
      passengers,
      contactDetails,
      bookingReference,
      paymentMethod,
      bookings
    ]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}
