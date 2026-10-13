
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "../common/PageTransition";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-slate-950 text-white">
      <Navbar />
      <main className="min-h-[60vh] w-full">
        <PageTransition />
      </main>
      <Footer />
    </div>
  );
}
