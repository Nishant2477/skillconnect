const defaultApiUrl = import.meta.env.MODE === "production"
	? "https://skillconnect-etp2.onrender.com/api"
	: "http://localhost:5000/api";
const configuredApiUrl = import.meta.env.VITE_API_BASE_URL || defaultApiUrl;
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, "");
const API_BASE_URL = normalizedApiUrl.endsWith("/api")
	? normalizedApiUrl
	: `${normalizedApiUrl}/api`;

export default API_BASE_URL;