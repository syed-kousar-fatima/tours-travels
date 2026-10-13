
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair, ArrowRight } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { formatINR } from "../utils/formatters";

const occupied = ["1A", "1F", "2C", "3B", "3E", "4A", "4D", "5C", "6F"];

export default function SeatSelection() {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [selected, setSelected] = useState(
    booking.selectedSeats.map((seat) => seat.id)
  );

  const rows = Array.from({ length: 8 }, (_, index) => index + 1);
  const columns = ["A", "B", "C", "D", "E", "F"];

  function toggleSeat(id) {
    if (occupied.includes(id)) return;

    setSelected((current) => current.includes(id)
      ? current.filter((seat) => seat !== id)
      : current.length >= (booking.passengers || 1)
        ? current
        : [...current, id]
    );
  }

  function continueBooking() {
    updateBooking({
      selectedSeats: selected.map((id) => ({
        id,
        price: 450
      }))
    });
    navigate("/review");
  }

  if (!booking.selectedFlight) {
    return (
      <section className="container-fluid py-14">
        <h1 className="text-2xl font-bold">Choose a flight first</h1>
        <button onClick={() => navigate("/flights")} className="mt-5 rounded-xl bg-[#42d6ff] px-5 py-3 font-bold text-[#0b1220]">Find flights</button>
      </section>
    );
  }

  return (
    <section className="container-fluid py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-[#42d6ff]">Step 3 · Seats</p>
        <h1 className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl">Choose your seats</h1>
        <p className="mt-3 text-sm text-slate-400">Select up to {booking.passengers} seat(s). These seats are for the demo interface only.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="surface rounded-2xl p-4 sm:p-8">
            <div className="mx-auto mb-8 flex max-w-sm flex-col items-center rounded-t-[50%] border-x border-t border-slate-700 py-5">
              <Armchair size={32} className="text-[#42d6ff]" />
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">Front of aircraft</p>
            </div>

            <div className="mx-auto grid max-w-md grid-cols-[repeat(3,minmax(0,1fr))_18px_repeat(3,minmax(0,1fr))] gap-2 sm:gap-3">
              {rows.flatMap((row) => columns.map((column, index) => {
                const id = `${row}${column}`;
                const unavailable = occupied.includes(id);
                const isSelected = selected.includes(id);

                return (
                  <button
                    key={id}
                    type="button"
                    disabled={unavailable}
                    onClick={() => toggleSeat(id)}
                    aria-label={`Seat ${id}${unavailable ? ", unavailable" : isSelected ? ", selected" : ", available"}`}
                    className={`${index === 3 ? "col-start-5" : ""} rounded-lg py-3 text-xs font-bold transition sm:py-3.5 ${
                      unavailable
                        ? "cursor-not-allowed bg-slate-700 text-slate-500"
                        : isSelected
                          ? "bg-[#42d6ff] text-[#0b1220] ring-2 ring-white/30"
                          : "bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/30"
                    }`}
                  >
                    {id}
                  </button>
                );
              }))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-2"><span className="size-3 rounded bg-emerald-400/50" /> Available</span>
              <span className="flex items-center gap-2"><span className="size-3 rounded bg-[#42d6ff]" /> Selected</span>
              <span className="flex items-center gap-2"><span className="size-3 rounded bg-slate-600" /> Occupied</span>
            </div>
          </div>

          <aside className="surface h-fit rounded-2xl p-5">
            <h2 className="text-lg font-bold text-white">Seat summary</h2>
            <p className="mt-2 text-sm text-slate-400">Selected: {selected.length} / {booking.passengers}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.length ? selected.map((seat) => <span key={seat} className="rounded-lg bg-cyan-400/10 px-3 py-2 text-sm font-bold text-[#42d6ff]">{seat}</span>) : <span className="text-sm text-slate-500">No seats selected</span>}
            </div>
            <div className="mt-6 border-t border-slate-700 pt-4">
              <p className="text-sm text-slate-400">Seat fees</p>
              <p className="mt-1 text-2xl font-extrabold text-white">{formatINR(selected.length * 450)}</p>
            </div>
            <button onClick={continueBooking} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#42d6ff] px-4 py-4 font-extrabold text-[#0b1220] transition hover:bg-white">Review booking <ArrowRight size={17} /></button>
          </aside>
        </div>
      </div>
    </section>
  );
}
