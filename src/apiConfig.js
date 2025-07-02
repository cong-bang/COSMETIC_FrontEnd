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

    // Quan trọng: Khi gửi FormData, không thiết lập Content-Type
    // Để axios tự động thiết lập Content-Type và boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
      console.log(
        "FormData detected: Content-Type header removed to let axios handle it"
      );
    }

    // Log request details
    console.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
    console.log("Headers:", JSON.stringify(config.headers));

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
      console.error("Headers:", error.response.headers);

      // Xử lý riêng cho lỗi 415 Unsupported Media Type
      if (error.response.status === 415) {
        console.error(
          "Unsupported Media Type error. Check Content-Type header and request format."
        );
        console.error("Request headers:", error.config.headers);
        console.error("Request method:", error.config.method);
        console.error("Request URL:", error.config.url);
      }
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
