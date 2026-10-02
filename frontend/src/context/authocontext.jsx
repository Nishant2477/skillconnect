import { createContext, useContext, useState } from "react";
import API_BASE_URL from "../config/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("skillconnect_user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem("skillconnect_token"));

    async function login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("skillconnect_user", JSON.stringify(data.user));
        localStorage.setItem("skillconnect_token", data.token);
        return data.user;
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("skillconnect_user");
        localStorage.removeItem("skillconnect_token");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}