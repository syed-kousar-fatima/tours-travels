
import { Link } from "react-router-dom";
import { Plane, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-fluid flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-[#42d6ff]"><Plane size={32} /></span>
      <p className="mt-6 text-sm font-bold tracking-widest text-[#42d6ff]">404 · OFF COURSE</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold text-white">This page isn't on our map.</h1>
      <p className="mt-4 text-sm text-slate-400">The page may have moved or the address may be incorrect.</p>
      <Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#42d6ff] px-5 py-3.5 font-extrabold text-[#0b1220]"><ArrowLeft size={18} /> Return home</Link>
    </section>
  );
}
