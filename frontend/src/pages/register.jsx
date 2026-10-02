import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setError("");
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            setMessage(data.message);
            setForm({ name: "", email: "", password: "" });
        } catch (registrationError) {
            setError(registrationError.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="mx-auto grid min-h-[calc(100svh-73px)] w-full max-w-6xl items-stretch px-5 py-6 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-10">
            <section className="order-2 rounded-b-3xl border border-emerald-950/10 bg-white p-7 shadow-xl md:order-1 md:rounded-b-none md:rounded-l-3xl md:p-12 lg:p-16">
                <div className="mx-auto max-w-md">
                    <div className="mb-10 md:hidden">
                        <BookOpen size={30} className="mb-6 text-orange-700" />
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-700">SkillConnect</p>
                    </div>
                    <p className="mb-3 text-sm font-semibold text-orange-700">Start learning</p>
                    <h1 className="text-4xl font-bold tracking-tight text-emerald-950">Create your account</h1>
                    <p className="mt-3 text-emerald-950/55">Build a learning queue that belongs to you.</p>
                    <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                        <label className="block text-sm font-bold text-emerald-950">
                            Full name
                            <span className="mt-2 flex items-center gap-3 rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 transition focus-within:border-orange-700 focus-within:ring-2 focus-within:ring-orange-700/15">
                                <UserRound size={18} className="text-emerald-950/45" />
                                <input className="min-w-0 flex-1 bg-transparent text-emerald-950 outline-none placeholder:text-emerald-950/35" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                            </span>
                        </label>
                        <label className="block text-sm font-bold text-emerald-950">
                            Email address
                            <span className="mt-2 flex items-center gap-3 rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 transition focus-within:border-orange-700 focus-within:ring-2 focus-within:ring-orange-700/15">
                                <Mail size={18} className="text-emerald-950/45" />
                                <input className="min-w-0 flex-1 bg-transparent text-emerald-950 outline-none placeholder:text-emerald-950/35" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                            </span>
                        </label>
                        <label className="block text-sm font-bold text-emerald-950">
                            Password
                            <span className="mt-2 flex items-center gap-3 rounded-xl border border-emerald-950/15 bg-[#f5f7f4] px-4 py-3 transition focus-within:border-orange-700 focus-within:ring-2 focus-within:ring-orange-700/15">
                                <LockKeyhole size={18} className="text-emerald-950/45" />
                                <input className="min-w-0 flex-1 bg-transparent text-emerald-950 outline-none placeholder:text-emerald-950/35" name="password" type="password" minLength={8} placeholder="At least 8 characters" value={form.password} onChange={handleChange} required />
                            </span>
                        </label>
                        {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{error}</p>}
                        {message && <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800"><CheckCircle2 size={17} />{message}</p>}
                        <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-700 px-5 py-3.5 font-bold text-white transition hover:bg-orange-800 disabled:cursor-wait disabled:opacity-60" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating account..." : "Create account"}
                            {!isSubmitting && <ArrowRight size={18} />}
                        </button>
                    </form>
                    <p className="mt-8 text-center text-sm text-emerald-950/55">Already have an account? <Link className="font-bold text-orange-700 hover:text-orange-800" to="/login">Log in</Link></p>
                </div>
            </section>
            <section className="relative order-1 overflow-hidden rounded-t-3xl bg-emerald-950 p-10 text-white md:order-2 md:rounded-l-none md:rounded-r-3xl md:p-14">
                <div className="absolute -bottom-16 -right-10 h-64 w-64 rounded-full border-[32px] border-orange-500/20" />
                <div className="relative flex h-full flex-col justify-between">
                    <div>
                        <BookOpen size={34} className="mb-12 text-orange-300" strokeWidth={1.5} />
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-orange-300">Make room to grow</p>
                        <h2 className="max-w-sm text-5xl font-bold leading-[0.98] tracking-tight">A better skill starts here.</h2>
                        <p className="mt-6 max-w-sm text-lg leading-8 text-white/65">Keep your courses, progress, and next questions in one calm place.</p>
                    </div>
                    <div className="relative mt-12 grid grid-cols-2 gap-3 text-sm text-white/70">
                        <span className="rounded-xl border border-white/10 bg-white/5 p-4">Learn with intention</span>
                        <span className="rounded-xl border border-white/10 bg-white/5 p-4">Track your progress</span>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Register;