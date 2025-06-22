import { axiosInstance } from "../apiConfig";

export async function createOrder(data) {
  try {
    const response = await axiosInstance.post("/order", data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

//Get order by id
export async function getOrderByUserId() {
  try {
    const response = await axiosInstance.get(`/order/userId?newestFirst=true`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

// Xử lý lỗi
function handleError(error) {
  if (error.response && error.response.status === 401) {
    return { error: "Thông tin đăng nhập không đúng!" };
  }
  return { error: error.message };
}