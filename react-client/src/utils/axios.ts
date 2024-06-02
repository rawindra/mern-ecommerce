import axios from "axios";

export const httpClient = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        Accept: "application/json",
    },
});

httpClient.interceptors.request.use((config) => {
    const auth = localStorage.getItem("auth");
    if (!auth) return config
    const token = JSON.parse(auth).state.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
