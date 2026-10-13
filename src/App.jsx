
import AppRoutes from "./routes/AppRoutes";
import { BookingProvider } from "./context/BookingContext";
import { ToastProvider } from "./components/common/Toast";

export default function App() {
  return (
    <ToastProvider>
      <BookingProvider>
        <AppRoutes />
      </BookingProvider>
    </ToastProvider>
  );
}
