const configuredApiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, "");
const API_BASE_URL = normalizedApiUrl.endsWith("/api")
	? normalizedApiUrl
	: `${normalizedApiUrl}/api`;

export default API_BASE_URL;