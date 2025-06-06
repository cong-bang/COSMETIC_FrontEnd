import { axiosInstance } from "../apiConfig";

export async function login(data) {
    try {
        const response = await axiosInstance.post("/api/authen/login", data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { error: "Thông tin đăng nhập không đúng!" };
        }
        return (error.message);
    }
}

export async function logout() {
    try {
        const response = await axiosInstance.post("/api/authen/logout");
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function registerUser(data) {
    try {
        const response = await axiosInstance.post("/api/authen/register", data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { error: error.response.data.message };
        }
        return { error: "Có lỗi xảy ra, vui lòng thử lại!" };
    }
}

export const changePassword = async (data) => {
    try {
        const response = await axiosInstance.put(
            "/api/authen/change-password",
            data
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thay đổi mật khẩu:", error);
        throw error;
    }
};

export async function sendOtpForgotPassword(email) {
    try {
        const response = await axiosInstance.post(
            "/api/authen/send-otp-forgot-password",
            { email },
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gửi OTP:", error);
        throw error;
    }
}

export async function verifyOtp({ email, otpCode, otpTime }) {
    try {
        const response = await axiosInstance.post(
            "/api/authen/verify-otp",
            {
                email,
                otpCode,
                otpTime,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xác thực OTP:", error);
        throw error;
    }
}

export async function forgotPassword({ email, password, confirmPassword }) {
    try {
        const response = await axiosInstance.post(
            "/api/authen/forgot-password",
            {
                email,
                password,
                confirmPassword,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đặt lại mật khẩu:", error);
        throw error;
    }
}

export async function sendConfirmEmail(token) {
    try {
        const response = await axiosInstance.post(
            "/api/authen/confirm-email",
            { token },
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi xác thực email:", error);
        throw error;
    }
}