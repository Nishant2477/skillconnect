import { useState } from "react";
import { ArrowRight, BookOpen, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authocontext";

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await login(email, password);
            navigate("/courses");
        } catch (loginError) {
            setError(loginError.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="mx-auto grid min-h-[calc(100svh-73px)] w-full max-w-6xl items-stretch px-5 py-6 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-10">
            <section className="relative hidden overflow-hidden rounded-l-3xl bg-emerald-950 p-10 text-white md:flex md:flex-col md:justify-between lg:p-14">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[32px] border-orange-500/20" />
                <div className="relative">
                    <BookOpen size={34} className="mb-12 text-orange-300" strokeWidth={1.5} />
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-orange-300">Welcome back</p>
                    <h1 className="max-w-sm text-5xl font-bold leading-[0.98] tracking-tight">Keep your momentum.</h1>
                    <p className="mt-6 max-w-sm text-lg leading-8 text-white/65">Return to the ideas, courses, and skills you are building into something useful.</p>
                </div>
                <div className="relative flex items-center gap-3 text-sm text-white/60">
                    <ShieldCheck size={18} className="text-orange-300" />
                    Your learning space, kept simple.
                </div>
            </section>
            <section className="rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-xl md:rounded-l-none md:rounded-r-3xl md:p-12 lg:p-16">
                <div className="mx-auto max-w-md">
                    <div className="mb-10 md:hidden">
                        <BookOpen size={30} className="mb-6 text-orange-700" />
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-700">SkillConnect</p>
                    </div>
                    <p className="mb-3 text-sm font-semibold text-orange-700">Student access</p>
                    <h1 className="text-4xl font-bold tracking-tight text-emerald-950">Log in to continue</h1>
                    <p className="mt-3 text-emerald-950/55">Your next course is closer than it looks.</p>
                    <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                        <label className="block text-sm font-bold text-emerald-950">
                            Email address
                            <span className="mt-2 flex items-center gap-3 rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 transition focus-within:border-orange-700 focus-within:ring-2 focus-within:ring-orange-700/15">
                                <Mail size={18} className="text-emerald-950/45" />
                                <input className="min-w-0 flex-1 bg-transparent text-emerald-950 outline-none placeholder:text-emerald-950/35" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
                            </span>
                        </label>
                        <label className="block text-sm font-bold text-emerald-950">
                            Password
                            <span className="mt-2 flex items-center gap-3 rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 transition focus-within:border-orange-700 focus-within:ring-2 focus-within:ring-orange-700/15">
                                <LockKeyhole size={18} className="text-emerald-950/45" />
                                <input className="min-w-0 flex-1 bg-transparent text-emerald-950 outline-none placeholder:text-emerald-950/35" type="password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                            </span>
                        </label>
                        {error && <p className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert"><KeyRound size={16} />{error}</p>}
                        <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-700 px-5 py-3.5 font-bold text-white transition hover:bg-orange-800 disabled:cursor-wait disabled:opacity-60" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Signing in..." : "Log in"}
                            {!isSubmitting && <ArrowRight size={18} />}
                        </button>
                    </form>
                    <p className="mt-8 text-center text-sm text-emerald-950/55">New to SkillConnect? <Link className="font-bold text-orange-700 hover:text-orange-800" to="/register">Create an account</Link></p>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;