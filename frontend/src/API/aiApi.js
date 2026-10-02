import API_BASE_URL from "../config/api";

export async function askCourseQuestion(courseId, question, token) {
	const response = await fetch(
		`${API_BASE_URL}/ai/course/${encodeURIComponent(courseId)}/ask`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ question })
		}
	);

	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
		throw new Error(data.message || "Unable to get an AI answer");
	}

	return data;
}

export async function analyzeCourseVideo(courseId, token) {
	const response = await fetch(
		`${API_BASE_URL}/ai/course/${encodeURIComponent(courseId)}/analyze-video`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);

	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
		throw new Error(data.message || "Unable to analyze this video");
	}

	return data;
}
