import API_BASE_URL from "../config/api";

// Get logged-in student's enrollments
export async function getMyEnrollments(token) {
    const response = await fetch(
        `${API_BASE_URL}/enrollments/my`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch enrollments"
        );
    }

    return data.enrollments;
}

// Enroll in a course
export async function enrollInCourse(courseId, token) {
    const response = await fetch(
        `${API_BASE_URL}/enrollments/${courseId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Enrollment failed"
        );
    }

    return data;
}

// Cancel enrollment
export async function cancelEnrollment(courseId, token) {
    const response = await fetch(
        `${API_BASE_URL}/enrollments/${courseId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to cancel enrollment"
        );
    }

    return data;
}