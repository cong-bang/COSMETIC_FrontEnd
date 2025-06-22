// apiConfig.js
import axios from "axios";

// Sử dụng URL cố định thay vì biến môi trường
const API_BASE_URL =
  process.env.REACT_APP_COSMETIC_API_BASE_URL || "http://localhost:8080/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
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

// Thêm interceptor để xử lý lỗi phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    if (error.response) {
      // Lỗi từ server với mã trạng thái
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      // Yêu cầu được gửi nhưng không nhận được phản hồi
      console.error("No response received:", error.request);
    } else {
      // Lỗi khi thiết lập yêu cầu
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);
