import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

const axiosClient = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config;
        if (err.response && err.response.status === 401 && !original._retry) {
            original._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    localStorage.clear();
                    window.location.href = "/login";
                    return Promise.reject(err);
                }
                const resp = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
                const { accessToken, refreshToken: newRefresh } = resp.data;
                localStorage.setItem("accessToken", accessToken);
                if (newRefresh) localStorage.setItem("refreshToken", newRefresh);
                original.headers.Authorization = `Bearer ${accessToken}`;
                return axios(original);
            } catch (refreshErr) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(err);
    }
);

export default axiosClient;
