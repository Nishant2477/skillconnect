import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/courses`)
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Failed to fetch courses");
                setCourses(data);
            })
            .catch((fetchError) => setError(fetchError.message));
    }, []);

    return (
        <main className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-16">
            <div className="mb-10 max-w-2xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-700">The learning shelf</p>
                <h1 className="text-4xl font-bold tracking-tight text-emerald-950 md:text-6xl">Available courses</h1>
                <p className="mt-4 text-lg leading-8 text-emerald-950/60">Practical paths for building the skills your next chapter needs.</p>
            </div>
            {error && <p className="mb-6 flex items-center gap-2 text-red-700" role="alert"><CircleAlert size={18} />{error}</p>}
            <div className="grid gap-5 md:grid-cols-2">
                {courses.map((course) => (
                <article className="group flex min-h-52 flex-col justify-between rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl" key={course._id}>
                    <div>
                        <div className="mb-8 flex items-start justify-between">
                            <span className="rounded-full bg-emerald-50 p-3 text-emerald-800"><BookOpen size={20} /></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-950/40">{course.category}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-emerald-950">{course.name}</h2>
                        <p className="mt-2 text-emerald-950/55">Instructor: {course.instructor}</p>
                    </div>
                    <Link className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-orange-700 transition group-hover:gap-3" to={`/courses/${course._id}`}>
                        View course <ArrowUpRight size={17} />
                    </Link>
                    </article>
            ))}
            </div>
        </main>
    );
}

export default Courses;