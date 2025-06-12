import { axiosInstance } from "../apiConfig";

export async function getUserById(id) {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { error: "Thông tin đăng nhập không đúng!" };
    }
    return (error.message);
  }
}
