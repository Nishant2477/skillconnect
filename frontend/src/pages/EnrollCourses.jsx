import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

import { getCourses } from "../API/courseApi";
import {
    getMyEnrollments,
    enrollInCourse
} from "../API/enrollmentApi";

function EnrollCourses() {
    const { token } = useContext(AuthContext);

    const [courses, setCourses] = useState([]);
    const [enrolledIds, setEnrolledIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const courseData = await getCourses();
                setCourses(courseData);

                if (token) {
                    const enrollmentData =
                        await getMyEnrollments(token);

                    setEnrolledIds(
                        enrollmentData
                            .map((item) => item.course?._id)
                            .filter(Boolean)
                    );
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [token]);

    async function handleEnroll(courseId) {
        setError("");
        setMessage("");

        if (!token) {
            setError("Please log in to enroll in a course.");
            return;
        }

        try {
            await enrollInCourse(courseId, token);

            setEnrolledIds((current) => [
                ...current,
                courseId
            ]);

            setMessage("Successfully enrolled!");
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) {
        return <h2>Loading courses...</h2>;
    }

    return (
        <main className="enroll-courses-page">
            <h1>Explore Courses</h1>
            <p>Choose a course and start learning.</p>

            {error && <p role="alert">{error}</p>}
            {message && <p role="status">{message}</p>}

            {courses.length === 0 ? (
                <p>No courses are available yet.</p>
            ) : (
                <div className="courses-grid">
                    {courses.map((course) => {
                        const isEnrolled =
                            enrolledIds.includes(course._id);

                        return (
                            <article
                                className="course-card"
                                key={course._id}
                            >
                                <span className="course-category">
                                    {course.category}
                                </span>

                                <h2>{course.name}</h2>

                                <p>
                                    Instructor: {course.instructor}
                                </p>

                                <p>Price: ₹{course.price}</p>

                                <button
                                    type="button"
                                    disabled={isEnrolled}
                                    onClick={() =>
                                        handleEnroll(course._id)
                                    }
                                >
                                    {isEnrolled
                                        ? "Already Enrolled"
                                        : "Enroll Now"}
                                </button>
                            </article>
                        );
                    })}
                </div>
            )}
        </main>
    );
}

export default EnrollCourses;