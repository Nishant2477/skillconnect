import { useEffect, useState } from "react";

import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
} from "../API/courseApi";

function getCourseId(course) {
    return course?._id ?? course?.id;
}

function useCourses(token) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadCourses() {
        try {
            setLoading(true);
            setError("");

            const data = await getCourses();
            setCourses(Array.isArray(data) ? data : []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function addCourse(course) {
        try {
            const response = await createCourse(course, token);
            const newCourse = response?.course ?? response;

            if (!newCourse) {
                return;
            }

            setCourses((currentCourses) => [
                ...currentCourses,
                newCourse
            ]);
        } catch (error) {
            setError(error.message);
        }
    }

    async function editCourse(id, course) {
        try {
            const response = await updateCourse(id, course, token);
            const updatedCourse = response?.course ?? response;

            if (!updatedCourse) {
                return;
            }

            setCourses((currentCourses) =>
                currentCourses.map((item) =>
                    getCourseId(item) === id
                        ? updatedCourse
                        : item
                )
            );
        } catch (error) {
            setError(error.message);
        }
    }

    async function removeCourse(id) {
        try {
            await deleteCourse(id, token);

            setCourses((currentCourses) =>
                currentCourses.filter(
                    (course) => getCourseId(course) !== id
                )
            );
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return {
        courses,
        loading,
        error,
        addCourse,
        editCourse,
        removeCourse
    };
}

export default useCourses;