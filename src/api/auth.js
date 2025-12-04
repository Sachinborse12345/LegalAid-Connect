import axiosClient from "./axiosClient.js";

export const login = (credentials) => axiosClient.post("/auth/login", credentials);

export const register = (payload) => axiosClient.post("/auth/register", payload);

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const getProfile = () => axiosClient.get("/profile/me");
