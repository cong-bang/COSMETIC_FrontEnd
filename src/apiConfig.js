// apiConfig.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_COSMETIC_API_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


