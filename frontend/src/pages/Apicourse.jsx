import { useEffect, useState } from "react";


function ApiCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadCourses() {
        try {
            setLoading(true);
            setError("");

            const data = await getCourses();

            setCourses(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCourses();
    }, []);

    if (loading) {
        return <h2>Loading courses...</h2>;
    }

    if (error) {
        return (
            <div>
                <h2>Error: {error}</h2>

                <button onClick={loadCourses}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Courses from API</h1>

            <button onClick={loadCourses}>
                Refresh Courses
            </button>

            {courses.map((course) => (
                <div key={course.id}>
                    <h3>{course.title}</h3>
                    <p>{course.body}</p>
                </div>
            ))}
        </div>
    );
}

export default ApiCourses;