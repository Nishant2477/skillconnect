import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, CircleAlert, Clock3, X } from "lucide-react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { useAuth } from "../context/authocontext";

function MyCourses() {
    const { token } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [history, setHistory] = useState([]);

    async function loadEnrollments() {
        if (!token) return;
        const response = await fetch(`${API_BASE_URL}/enrollments/my`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setEnrollments(data.enrollments || []);
    }

    useEffect(() => {
        loadEnrollments().catch(() => setMessage("Failed to load enrollments"));
    }, [token]);

    useEffect(() => {
        if (!token) return;
        fetch(`${API_BASE_URL}/watch-history`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Failed to load watch history");
                setHistory(data.history || []);
            })
            .catch(() => setMessage("Failed to load watch history"));
    }, [token]);

    async function cancelEnrollment(courseId) {
        const response = await fetch(`${API_BASE_URL}/enrollments/${courseId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setMessage(data.message);
        if (response.ok) loadEnrollments();
    }

    return (
        <main className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-16">
            <div className="mb-10">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-700">Your learning path</p>
                <h1 className="text-4xl font-bold tracking-tight text-emerald-950 md:text-6xl">My courses</h1>
                <p className="mt-4 text-lg text-emerald-950/60">Pick up where your curiosity left off.</p>
            </div>
            {!token && <p className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-orange-800">Please log in as a student to view your courses.</p>}
            {error && <p className="mb-6 flex items-center gap-2 text-red-700" role="alert"><CircleAlert size={18} />{error}</p>}
            {token && enrollments.length === 0 && !error && (
                <div className="rounded-2xl border border-emerald-950/10 bg-white p-7 shadow-sm">
                    <p className="text-emerald-950/60">You haven&apos;t enrolled in any courses yet.</p>
                    <Link className="mt-5 inline-flex rounded-full bg-orange-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-800" to="/courses">Browse courses</Link>
                </div>
            )}
            {token && history.length > 0 && <section className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-6"><div className="mb-4 flex items-center gap-2 text-orange-800"><Clock3 size={19} /><h2 className="text-xl font-bold">Recently watched</h2></div><div className="grid gap-3 sm:grid-cols-2">{history.slice(0, 4).map((item) => <Link className="rounded-xl border border-orange-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm" key={item._id} to={`/courses/${item.course._id}`}><p className="font-bold text-emerald-950">{item.course.name}</p><p className="mt-1 text-xs text-emerald-950/55">Watched {new Date(item.lastWatchedAt).toLocaleString()}</p></Link>)}</div></section>}
            <div className="grid gap-5 md:grid-cols-2">
            {enrollments.map((enrollment) => (
                <article className="rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm" key={enrollment._id}>
                    <div className="mb-8 flex items-start justify-between">
                        <span className="rounded-full bg-emerald-50 p-3 text-emerald-800"><BookOpen size={20} /></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">{enrollment.status}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-950">{enrollment.course.name}</h2>
                    <p className="mt-2 text-emerald-950/55">Instructor: {enrollment.course.instructor}</p>
                    <p className="mt-4 flex items-center gap-2 text-sm text-emerald-950/55"><CalendarDays size={16} /> Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                    <button className="mt-8 inline-flex items-center gap-2 rounded-full border border-red-700/20 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50" onClick={() => cancelEnrollment(enrollment.course._id)}>
                        <X size={16} />
                        Cancel enrollment
                    </button>
                </article>
            ))}
            </div>
            {message && <p className="mt-6 text-sm font-semibold text-emerald-800" role="status">{message}</p>}
        </main>
    );
}

export default MyCourses;
