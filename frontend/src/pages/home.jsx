import { ArrowUpRight, BookOpen, GraduationCap, LibraryBig } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authocontext";

function Home() {
    const { user } = useAuth();

    return (
        <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-10 md:py-12">
            <section className="relative overflow-hidden rounded-3xl bg-emerald-950 px-7 py-10 text-white shadow-xl md:px-12 md:py-14">
                <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[38px] border-orange-500/15" />
                <div className="relative max-w-2xl">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-orange-300">Student dashboard</p>
                    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">Good to see you, {user?.name || "learner"}.</h1>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">Learn deliberately. Build something real. Your next skill starts with one focused session.</p>
                    <Link className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 font-bold text-white transition hover:bg-orange-500" to="/courses">Explore courses <ArrowUpRight size={18} /></Link>
                </div>
            </section>
            <section className="grid gap-5 py-8 md:grid-cols-3">
                <Link className="group rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg" to="/courses">
                    <BookOpen className="mb-10 text-orange-700" size={25} />
                    <h2 className="text-xl font-bold text-emerald-950">Browse courses</h2>
                    <p className="mt-2 text-sm leading-6 text-emerald-950/55">Find a practical path and start learning today.</p>
                </Link>
                <Link className="group rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg" to="/my-courses">
                    <LibraryBig className="mb-10 text-orange-700" size={25} />
                    <h2 className="text-xl font-bold text-emerald-950">My courses</h2>
                    <p className="mt-2 text-sm leading-6 text-emerald-950/55">Return to your active learning queue.</p>
                </Link>
                <div className="rounded-2xl border border-emerald-950/10 bg-[#e5eee7] p-6">
                    <GraduationCap className="mb-10 text-emerald-800" size={25} />
                    <h2 className="text-xl font-bold text-emerald-950">Keep going</h2>
                    <p className="mt-2 text-sm leading-6 text-emerald-950/65">Small, consistent progress compounds quickly.</p>
                </div>
            </section>
        </main>
    );
}

export default Home;