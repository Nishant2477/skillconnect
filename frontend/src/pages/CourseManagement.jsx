import { useState } from "react";
import { BookOpen, LayoutDashboard, ShieldAlert } from "lucide-react";

import CourseForm from "../component/CourseForm";
import CourseList from "../component/CourseList";
import useCourses from "../hooks/useCourse";
import { useAuth } from "../context/authocontext";

function CourseManagement() {
    const { user, token } = useAuth();
    const {
        courses,
        loading,
        error,
        addCourse,
        editCourse,
        removeCourse
    } = useCourses(token);

    const [name, setName] = useState("");
    const [instructor, setInstructor] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [videoDuration, setVideoDuration] = useState("");
    const [editingId, setEditingId] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        if (
            !name.trim() ||
            !instructor.trim() ||
            !price ||
            !category.trim()
        ) {
            alert("Please fill all fields.");
            return;
        }

        const courseData = {
            name,
            instructor,
            price: Number(price),
            category,
            playlistUrl,
            videoDuration
        };

        if (editingId !== null) {
            await editCourse(editingId, courseData);
            setEditingId(null);
        } else {
            await addCourse(courseData);
        }

        clearForm();
    }

    function handleEdit(course) {
        setEditingId(course._id);
        setName(course.name);
        setInstructor(course.instructor);
        setPrice(course.price);
        setCategory(course.category);
        setPlaylistUrl(course.playlistUrl || "");
        setVideoDuration(course.videoDuration || "");
    }

    async function handleDelete(id) {
        await removeCourse(id);

        if (editingId === id) {
            clearForm();
            setEditingId(null);
        }
    }

    function clearForm() {
        setName("");
        setInstructor("");
        setPrice("");
        setCategory("");
        setPlaylistUrl("");
        setVideoDuration("");
    }

    if (!user || !["admin", "instructor"].includes(user.role)) {
        return (
            <main className="mx-auto max-w-3xl px-5 py-20 text-center md:px-10">
                <ShieldAlert className="mx-auto mb-5 text-red-700" size={44} />
                <h1 className="text-4xl font-bold text-emerald-950">Staff access required</h1>
                <p className="mt-4 text-emerald-950/60">Students cannot manage the course catalog.</p>
            </main>
        );
    }

    if (loading) {
        return <main className="mx-auto max-w-6xl px-5 py-20 text-center md:px-10"><p className="font-semibold text-emerald-950/60">Loading course catalog...</p></main>;
    }

    return (
        <main className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
            <header className="mb-10 flex flex-col justify-between gap-5 border-b border-emerald-950/10 pb-8 md:flex-row md:items-end">
                <div>
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-orange-700"><LayoutDashboard size={15} /> Admin workspace</p>
                    <h1 className="text-4xl font-bold tracking-tight text-emerald-950 md:text-5xl">Course management</h1>
                    <p className="mt-3 max-w-xl text-emerald-950/60">Shape the catalog, keep course details current, and make the next path easier to find.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-950/55"><BookOpen size={18} /> {courses.length} courses</div>
            </header>

            {error && <p className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700" role="alert">{error}</p>}

            <section className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
                <CourseForm
                    name={name}
                    instructor={instructor}
                    price={price}
                    category={category}
                    playlistUrl={playlistUrl}
                    videoDuration={videoDuration}
                    onNameChange={(event) => setName(event.target.value)}
                    onInstructorChange={(event) => setInstructor(event.target.value)}
                    onPriceChange={(event) => setPrice(event.target.value)}
                    onCategoryChange={(event) => setCategory(event.target.value)}
                    onPlaylistUrlChange={(event) => setPlaylistUrl(event.target.value)}
                    onVideoDurationChange={(event) => setVideoDuration(event.target.value)}
                    onSubmit={handleSubmit}
                    editingId={editingId}
                />
                <CourseList courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
            </section>
        </main>
    );
}

export default CourseManagement;