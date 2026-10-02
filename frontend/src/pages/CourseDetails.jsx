import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, CircleAlert, ExternalLink, GraduationCap, LockKeyhole } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { useAuth } from "../context/authocontext";
import AIDoubtChat from "../components/AIDoubtChat";

function getPlaylistEmbedUrl(playlistUrl) {
    if (!playlistUrl) return "";
    try {
        const videoId = new URL(playlistUrl).searchParams.get("v");
        const playlistId = new URL(playlistUrl).searchParams.get("list");
        const startTime = Number.parseInt(new URL(playlistUrl).searchParams.get("t"), 10);
        if (videoId) {
            const params = new URLSearchParams({ rel: "0" });
            if (playlistId) params.set("list", playlistId);
            if (Number.isFinite(startTime)) params.set("start", String(startTime));
            return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
        }
        return playlistId ? `https://www.youtube.com/embed/videoseries?list=${playlistId}` : "";
    } catch {
        return "";
    }
}

function CourseDetails() {
    const { courseId } = useParams();
    const { token, user } = useAuth();
    const [course, setCourse] = useState(null);
    const [enrolled, setEnrolled] = useState(false);
    const [message, setMessage] = useState("");
    const playlistEmbedUrl = getPlaylistEmbedUrl(course?.playlistUrl);

    useEffect(() => {
        fetch(`${API_BASE_URL}/courses/${courseId}`)
            .then((response) => response.json())
            .then(setCourse)
            .catch(() => setMessage("Failed to load course"));
    }, [courseId]);

    useEffect(() => {
        if (!token) return;
        fetch(`${API_BASE_URL}/enrollments/my`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => setEnrolled(data.enrollments?.some((item) => item.course?._id === courseId)))
            .catch(() => setMessage("Failed to load enrollment status"));
    }, [courseId, token]);

    useEffect(() => {
        if (!token || !enrolled || !playlistEmbedUrl) return;

        fetch(`${API_BASE_URL}/watch-history/${courseId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        }).catch(() => setMessage("Course loaded, but watch history could not be saved"));
    }, [courseId, enrolled, playlistEmbedUrl, token]);

    async function enroll() {
        if (!token) {
            setMessage("Please log in as a student first");
            return;
        }
        const response = await fetch(`${API_BASE_URL}/enrollments/${courseId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setMessage(data.message);
        if (response.ok || response.status === 409) setEnrolled(true);
    }

    if (!course) {
        return <main className="mx-auto max-w-6xl px-5 py-16 md:px-10"><h1 className="text-3xl font-bold text-emerald-950">{message || "Loading course..."}</h1></main>;
    }

    return (
        <main className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
            <Link className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-emerald-950/60 hover:text-orange-700" to="/courses"><ArrowLeft size={17} /> Back to courses</Link>
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)]">
                <div className="min-w-0 space-y-8">
                    <section className="max-w-3xl rounded-3xl bg-emerald-950 p-7 text-white shadow-xl md:p-12">
                <GraduationCap className="mb-10 text-orange-300" size={42} strokeWidth={1.5} />
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{course.name}</h1>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-white/65">
                    <p>Instructor: SkillConnect Faculty</p>
                </div>
                <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-emerald-800" onClick={enroll} disabled={enrolled}>
                    {enrolled && <CheckCircle2 size={18} />}
                    {enrolled ? "Already Enrolled" : "Enroll Now"}
                </button>
                {message && <p className="mt-5 flex items-center gap-2 text-sm text-orange-200" role="status">{enrolled ? <CheckCircle2 size={16} /> : <CircleAlert size={16} />}{message}</p>}
            </section>
                    {playlistEmbedUrl && <section className="max-w-3xl overflow-hidden rounded-3xl border border-emerald-950/10 bg-white p-4 shadow-sm md:p-6"><div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-2xl font-bold text-emerald-950">Course playlist</h2>{enrolled && <a className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-700 hover:text-orange-800" href={course.playlistUrl} target="_blank" rel="noreferrer">Open on YouTube <ExternalLink size={15} /></a>}</div>{enrolled ? <div className="aspect-video overflow-hidden rounded-2xl bg-emerald-950"><iframe className="h-full w-full" src={playlistEmbedUrl} title={`${course.name} YouTube playlist`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div> : <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl bg-emerald-50 px-6 text-center text-emerald-950/60"><LockKeyhole className="mb-3 text-emerald-800" size={28} /><p className="font-semibold">Enroll in this course to unlock the playlist.</p></div>}</section>}
                </div>
                {enrolled && user?.role === "student" && <aside className="w-full lg:sticky lg:top-6"><AIDoubtChat courseId={courseId} courseName={course.name} token={token} /></aside>}
            </div>
        </main>
    );
}

export default CourseDetails;