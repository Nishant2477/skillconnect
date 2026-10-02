import { Pencil, Tag, Trash2, UserRound } from "lucide-react";

function CourseItem({ course, onEdit, onDelete }) {
    return (
        <article className="flex min-h-52 flex-col justify-between rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div>
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-emerald-950">{course.name}</h3>
                    <span className="rounded-full bg-emerald-50 p-2 text-emerald-800"><Tag size={15} /></span>
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm text-emerald-950/55"><UserRound size={15} />{course.instructor}</p>
                <p className="mt-2 text-sm font-semibold text-emerald-950">₹{course.price} <span className="font-normal text-emerald-950/45">/ {course.category}</span></p>
            </div>
            <div className="mt-6 flex items-center justify-end gap-2">
                <button className="rounded-lg p-2 text-emerald-950/55 transition hover:bg-emerald-50 hover:text-emerald-900" title="Edit course" aria-label={`Edit ${course.name}`} onClick={() => onEdit(course)}>
                    <Pencil size={17} />
            </button>
                <button className="rounded-lg p-2 text-red-700/70 transition hover:bg-red-50 hover:text-red-700" title="Delete course" aria-label={`Delete ${course.name}`} onClick={() => onDelete(course._id)}>
                    <Trash2 size={17} />
                </button>
            </div>
        </article>
    );
}

export default CourseItem;