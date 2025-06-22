import { axiosInstance } from "../apiConfig";

// Lấy giỏ hàng
export async function getCart() {
  try {
    const response = await axiosInstance.get("/cart/get");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

// Thêm sản phẩm vào giỏ
export async function addToCart(productId) {
  try {
    const response = await axiosInstance.post("/cart/add", { productId });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

// Xóa toàn bộ giỏ hàng
export async function clearCart() {
  try {
    const response = await axiosInstance.delete("/cart/clear");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

// Xóa sản phẩm theo id trong giỏ
export async function removeFromCart(id) {
  try {
    const response = await axiosInstance.delete(`/cart/remove/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
}

// Cập nhật số lượng sản phẩm trong giỏ
export async function updateCartItem(productId, quantity) {
  try {
    const response = await axiosInstance.put("/cart", { productId, quantity });
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
