import CourseItem from "./CourseItem";

function CourseList({ courses, onEdit, onDelete }) {
    return (
        <section>
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-emerald-950">Catalog</h2>
                <span className="text-sm text-emerald-950/50">Edit or remove a listing</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => (
                <CourseItem
                    key={course._id}
                    course={course}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
            </div>
        </section>
    );
}

export default CourseList;