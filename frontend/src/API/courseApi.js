import API_BASE_URL from "../config/api";

export async function getCourses() {
    const response = await fetch(
        `${API_BASE_URL}/courses`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch courses");
    }

    return await response.json();
}

export async function getCourseById(id) {
    const response = await fetch(
        `${API_BASE_URL}/courses/${id}`
    );

    if (!response.ok) {
        throw new Error("Course not found");
    }

    return await response.json();
}

function authHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}

export async function createCourse(course, token) {
    const response = await fetch(
        `${API_BASE_URL}/courses`,
        {
            method: "POST",
            headers: authHeaders(token),
            body: JSON.stringify(course)
        }
    );

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to create course");
    }

    return await response.json();
}

export async function updateCourse(id, course, token) {
    const response = await fetch(
        `${API_BASE_URL}/courses/${id}`,
        {
            method: "PUT",
            headers: authHeaders(token),
            body: JSON.stringify(course)
        }
    );

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to update course");
    }

    return await response.json();
}

export async function deleteCourse(id, token) {
    const response = await fetch(
        `${API_BASE_URL}/courses/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete course");
    }

    return true;
}
