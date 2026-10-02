import { useState } from "react";

import {
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} from "../API/courseApi";

function CrudDemo() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleGet() {
        try {
            setLoading(true);
            setError("");

            const data = await getCourseById(1);

            setResult(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate() {
        try {
            setLoading(true);
            setError("");

            const newCourse = {
                title: "React.js",
                body: "Learn React",
                userId: 1
            };

            const data = await createCourse(newCourse);

            setResult(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdate() {
        try {
            setLoading(true);
            setError("");

            const updatedCourse = {
                title: "Advanced React.js",
                body: "Learn Advanced React",
                userId: 1
            };

            const data = await updateCourse(
                1,
                updatedCourse
            );

            setResult(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        try {
            setLoading(true);
            setError("");

            await deleteCourse(1);

            setResult({
                message: "Course deleted successfully"
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>CRUD Demo</h1>

            <button onClick={handleGet}>
                GET Course
            </button>

            <button onClick={handleCreate}>
                POST Course
            </button>

            <button onClick={handleUpdate}>
                PUT Course
            </button>

            <button onClick={handleDelete}>
                DELETE Course
            </button>

            {loading && <p>Loading...</p>}

            {error && (
                <p>Error: {error}</p>
            )}

            {result && (
                <pre>
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default CrudDemo;