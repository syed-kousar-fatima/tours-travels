
export function calculateBookingTotal(booking) {
  const passengerCount = Math.max(1, Number(booking.passengers) || 1);
  const flight = Number(booking.selectedFlight?.price || 0) * passengerCount;
  const hotel = Number(booking.selectedHotel?.totalPrice || 0);
  const car = Number(booking.selectedCar?.totalPrice || 0);

  const extras = (booking.addOns || []).reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const seats = (booking.selectedSeats || []).reduce(
    (sum, seat) => sum + Number(seat.price || 0),
    0
  );

  const subtotal = flight + hotel + car + extras + seats;
  const taxes = Math.round(subtotal * 0.05);

  return {
    flight,
    hotel,
    car,
    extras,
    seats,
    subtotal,
    taxes,
    total: subtotal + taxes
  };
}
