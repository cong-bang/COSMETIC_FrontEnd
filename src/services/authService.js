import { axiosInstance } from "../apiConfig";

export async function login(data) {
  try {
    const response = await axiosInstance.post("/authen/login", data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { error: "Thông tin đăng nhập không đúng!" };
    }
    return error.message;
  }
}

export async function logout() {
  try {
    const response = await axiosInstance.post("/authen/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function registerUser(data) {
  try {
    const response = await axiosInstance.post("/authen/register", data);
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
    const response = await axiosInstance.post("/authen/change-password", data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Cập nhật thất bại!";
    throw new Error(message);
  }
};

export async function sendOtpForgotPassword(email) {
  try {
    const response = await axiosInstance.post(
      "/authen/request-password-reset",
      { email }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
}

export async function sendResetForgotPassword(data) {
  try {
    const response = await axiosInstance.post("/authen/reset-password", data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
}

export async function verifyOtp({ email, otpCode, otpTime }) {
  try {
    const response = await axiosInstance.post("/authen/verify-otp", {
      email,
      otpCode,
      otpTime,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xác thực OTP:", error);
    throw error;
  }
}

// export async function forgotPassword({ email, password, confirmPassword }) {
//   try {
//     const response = await axiosInstance.post(
//       "/authen/forgot-password",
//       {
//         email,
//         password,
//         confirmPassword,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi đặt lại mật khẩu:", error);
//     throw error;
//   }
// }

export async function sendConfirmEmail(token) {
  try {
    const response = await axiosInstance.get(
      `/authen/confirm-token?token=${token}`
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi xác thực email:", error);
    throw error;
  }
}

// export const googleAuth = async (idToken) => {
//   try {
//     const response = await axiosInstance.get(`/GoogleAuth/login`, null, {
//       params: {
//         idToken,
//       },
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error google auth:", error);
//     throw error;
//   }
// };

export const handleGoogleLogin = () => {
  const API_BASE_URL = process.env.REACT_APP_COSMETIC_API_BASE_URL;
  const loginUrl = `${API_BASE_URL}/GoogleAuth/login`;
  window.location.href = loginUrl;
};
