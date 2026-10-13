
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Wallet
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

const getAmount = (item) => Number(item?.price) || 0;

const initialCard = {
  name: "",
  number: "",
  expiry: "",
  cvv: ""
};

function PaymentItem({ title, item, description }) {
  if (!item) return null;

  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 break-words text-sm text-slate-400">
          {item.name || item.airline || item.flightNumber || item.brand}
        </p>
        {description && (
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        )}
      </div>
      <p className="shrink-0 text-sm font-semibold text-sky-300">
        {formatPrice(getAmount(item))}
      </p>
    </div>
  );
}

export default function Payment() {
  const navigate = useNavigate();
  const {
    selectedFlight,
    selectedHotel,
    selectedCar,
    passengers,
    contactDetails,
    setBookingReference,
    setPaymentMethod,
    paymentMethod: savedPaymentMethod
  } = useBooking();

  const [method, setMethod] = useState(savedPaymentMethod || "card");
  const [card, setCard] = useState(initialCard);
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [notice, setNotice] = useState("");

  const total = useMemo(
    () =>
      getAmount(selectedFlight) +
      getAmount(selectedHotel) +
      getAmount(selectedCar),
    [selectedFlight, selectedHotel, selectedCar]
  );

  const hasBooking = Boolean(
    selectedFlight || selectedHotel || selectedCar
  );

  useEffect(() => {
    if (processing) return undefined;

    if (!hasBooking || !passengers.length) {
      navigate("/review-booking", { replace: true });
    }
  }, [hasBooking, passengers.length, navigate, processing]);

  const updateCard = (field, value) => {
    setCard((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setNotice("");
  };

  const changeMethod = (nextMethod) => {
    setMethod(nextMethod);
    setErrors({});
    setNotice("");
  };

  const validate = () => {
    const nextErrors = {};

    if (method === "card") {
      if (card.name.trim().length < 2) {
        nextErrors.name = "Enter the cardholder's name.";
      }

      const digits = card.number.replace(/\D/g, "");

      if (!/^\d{16}$/.test(digits)) {
        nextErrors.number = "Enter a 16-digit card number.";
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
        nextErrors.expiry = "Use MM/YY format.";
      } else {
        const [month, year] = card.expiry.split("/").map(Number);
        const expiryDate = new Date(2000 + year, month);
        const now = new Date();

        if (expiryDate <= new Date(now.getFullYear(), now.getMonth())) {
          nextErrors.expiry = "This card has expired.";
        }
      }

      if (!/^\d{3,4}$/.test(card.cvv)) {
        nextErrors.cvv = "Enter a valid 3 or 4-digit CVV.";
      }
    }

    if (method === "upi") {
      const normalizedUpi = upiId.trim();

      if (!/^[\w.-]{2,256}@[a-zA-Z][a-zA-Z0-9.-]{1,63}$/.test(normalizedUpi)) {
        nextErrors.upiId = "Enter a valid UPI ID, such as name@bank.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePayment = (event) => {
    event.preventDefault();
    setNotice("");

    if (!hasBooking || !passengers.length) {
      navigate("/review-booking");
      return;
    }

    if (total <= 0) {
      setNotice("The booking total is invalid. Please review your booking.");
      return;
    }

    if (!validate()) return;

    setProcessing(true);
    setPaymentMethod(method);

    window.setTimeout(() => {
      const reference = `DEMO-${Date.now().toString().slice(-8)}`;

      setBookingReference(reference);
      navigate("/booking-confirmation", {
        state: { demoPayment: true }
      });
    }, 1200);
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

  const labelClass = "text-sm font-medium text-slate-300";

  return (
    <section className="container-fluid section-spacing min-h-screen">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/review-booking"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-sky-300"
        >
          <ArrowLeft size={17} />
          Back to review
        </Link>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
            Secure checkout · Demo mode
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Complete your booking
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Choose a payment method and review your total before completing
            this demo checkout.
          </p>
        </div>

        <div className="mt-9 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-8">
          <form
            onSubmit={handlePayment}
            className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                <LockKeyhole size={21} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Payment method
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Select how you want to pay.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => changeMethod("card")}
                aria-pressed={method === "card"}
                className={`flex min-h-24 items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  method === "card"
                    ? "border-sky-400 bg-sky-400/10"
                    : "border-white/10 bg-slate-950/30 hover:border-white/25"
                }`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sky-300">
                  <CreditCard size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">
                    Credit / Debit Card
                  </span>
                  <span className="mt-1 block text-xs text-slate-400">
                    Visa, Mastercard, RuPay
                  </span>
                </span>
                {method === "card" && (
                  <Check size={18} className="text-sky-300" />
                )}
              </button>

              <button
                type="button"
                onClick={() => changeMethod("upi")}
                aria-pressed={method === "upi"}
                className={`flex min-h-24 items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  method === "upi"
                    ? "border-sky-400 bg-sky-400/10"
                    : "border-white/10 bg-slate-950/30 hover:border-white/25"
                }`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sky-300">
                  <Smartphone size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">UPI</span>
                  <span className="mt-1 block text-xs text-slate-400">
                    Enter a UPI ID
                  </span>
                </span>
                {method === "upi" && (
                  <Check size={18} className="text-sky-300" />
                )}
              </button>
            </div>

            {method === "card" && (
              <div className="mt-8 space-y-5">
                <div>
                  <label htmlFor="card-name" className={labelClass}>
                    Cardholder name
                  </label>
                  <input
                    id="card-name"
                    autoComplete="cc-name"
                    value={card.name}
                    onChange={(event) => updateCard("name", event.target.value)}
                    placeholder="Name on card"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-rose-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="card-number" className={labelClass}>
                    Card number
                  </label>
                  <input
                    id="card-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    maxLength={19}
                    value={card.number}
                    onChange={(event) =>
                      updateCard(
                        "number",
                        event.target.value.replace(/[^\d ]/g, "").slice(0, 19)
                      )
                    }
                    placeholder="1234 5678 9012 3456"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.number)}
                  />
                  {errors.number && (
                    <p className="mt-2 text-xs text-rose-400">
                      {errors.number}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="card-expiry" className={labelClass}>
                      Expiry date
                    </label>
                    <input
                      id="card-expiry"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      maxLength={5}
                      value={card.expiry}
                      onChange={(event) => {
                        const digits = event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        const formatted =
                          digits.length > 2
                            ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                            : digits;
                        updateCard("expiry", formatted);
                      }}
                      placeholder="MM/YY"
                      className={fieldClass}
                      aria-invalid={Boolean(errors.expiry)}
                    />
                    {errors.expiry && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.expiry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="card-cvv" className={labelClass}>
                      CVV
                    </label>
                    <input
                      id="card-cvv"
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(event) =>
                        updateCard(
                          "cvv",
                          event.target.value.replace(/\D/g, "").slice(0, 4)
                        )
                      }
                      placeholder="•••"
                      className={fieldClass}
                      aria-invalid={Boolean(errors.cvv)}
                    />
                    {errors.cvv && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {method === "upi" && (
              <div className="mt-8">
                <label htmlFor="upi-id" className={labelClass}>
                  UPI ID
                </label>
                <input
                  id="upi-id"
                  autoComplete="off"
                  value={upiId}
                  onChange={(event) => {
                    setUpiId(event.target.value);
                    setErrors((current) => ({ ...current, upiId: "" }));
                    setNotice("");
                  }}
                  placeholder="yourname@bank"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.upiId)}
                />
                {errors.upiId && (
                  <p className="mt-2 text-xs text-rose-400">{errors.upiId}</p>
                )}
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-sky-400/15 bg-sky-400/5 p-4">
                  <Wallet
                    size={20}
                    className="mt-0.5 shrink-0 text-sky-300"
                  />
                  <p className="text-sm leading-6 text-slate-400">
                    This demo validates the format of your UPI ID only. It
                    will not open a UPI app or initiate a payment.
                  </p>
                </div>
              </div>
            )}

            {notice && (
              <p
                role="alert"
                className="mt-6 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-300"
              >
                {notice}
              </p>
            )}

            <div className="mt-8 rounded-2xl border border-amber-300/15 bg-amber-300/5 p-4">
              <p className="text-sm font-semibold text-amber-200">
                Demo payment only
              </p>
              <p className="mt-1 text-xs leading-6 text-slate-400">
                Do not enter real card details or sensitive payment
                information. Use fictional details to test the form.
              </p>
            </div>

            <button
              type="submit"
              disabled={processing || !hasBooking || !passengers.length}
              className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 px-5 py-4 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {processing ? (
                <>
                  <span className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing demo payment...
                </>
              ) : (
                <>
                  <LockKeyhole size={18} />
                  Demo Pay {formatPrice(total)}
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              <ShieldCheck size={14} className="mr-1 inline-block" />
              No real payment is collected.
            </p>
          </form>

          <aside className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/70 p-5 sm:p-7 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-white">Booking summary</h2>
            <p className="mt-2 text-sm text-slate-400">
              Check your selected travel services.
            </p>

            <div className="mt-4">
              <PaymentItem
                title="Flight"
                item={selectedFlight}
                description={
                  selectedFlight
                    ? `${selectedFlight.from || ""} ${selectedFlight.fromCode ? `(${selectedFlight.fromCode})` : ""} → ${selectedFlight.to || ""} ${selectedFlight.toCode ? `(${selectedFlight.toCode})` : ""}`
                    : ""
                }
              />
              <PaymentItem
                title="Hotel"
                item={selectedHotel}
                description={
                  selectedHotel
                    ? [selectedHotel.city, selectedHotel.room]
                        .filter(Boolean)
                        .join(" · ")
                    : ""
                }
              />
              <PaymentItem
                title="Car rental"
                item={selectedCar}
                description={
                  selectedCar
                    ? [selectedCar.city, selectedCar.type]
                        .filter(Boolean)
                        .join(" · ")
                    : ""
                }
              />
            </div>

            <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
              <div className="flex justify-between gap-4 text-sm text-slate-400">
                <span>Services subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-sky-300">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-xs leading-5 text-slate-500">
                Demo estimate. Hotel nights, rental duration, taxes, and
                additional fees are not calculated in this example.
              </p>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white/[0.035] p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-emerald-300"
              />
              <div>
                <p className="text-sm font-medium text-white">
                  Your booking details
                </p>
                <p className="mt-1 break-words text-xs leading-5 text-slate-400">
                  {contactDetails.email || "No contact email provided"}
                </p>
                <p className="text-xs text-slate-400">
                  {contactDetails.phone || "No contact phone provided"}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
