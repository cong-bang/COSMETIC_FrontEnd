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
export const getOrderByUserId = async (
  pageIndex = 1,
  pageSize = 3,
  newestFirst = true
) => {
  try {
    const response = await axiosInstance.get(`order/userId`, {
      params: {
        "page-index": pageIndex,
        "page-size": pageSize,
        newestFirst: newestFirst,
      },
    });

    return {
      data: response.data.data.data,
      pagination: response.data.data.metaData,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
};

// Get all orders for admin
export async function getAllOrders() {
  try {
    const response = await axiosInstance.get("/order");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

// Get order by orderId
export async function getOrderById(orderId) {
  try {
    const response = await axiosInstance.get(
      `/order/orderId?orderId=${orderId}`
    );
    console.log(`Calling API: /order/orderId?orderId=${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getOrderById(${orderId}):`, error);
    return handleError(error);
  }
}

// Update order status
export async function updateOrder(orderData) {
  try {
    // Đảm bảo dữ liệu gửi đi có đúng cấu trúc API yêu cầu
    const updateData = {
      ...orderData,
    };

    // Xóa id nếu có để đảm bảo chỉ sử dụng orderId
    if (updateData.id) {
      delete updateData.id;
    }

    // Đảm bảo có orderId
    if (!updateData.orderId && updateData.code) {
      updateData.orderId = updateData.code;
      delete updateData.code;
    }

    console.log("Sending update data:", updateData);
    const response = await axiosInstance.put("/order", updateData);
    return response.data;
  } catch (error) {
    console.error("Error in updateOrder:", error);
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

// Order status constants
export const OrderStatus = {
  Processing: 0, // Đang xử lý
  Shipped: 1, // Đã giao hàng cho đơn vị vận chuyển
  Delivered: 2, // Đã giao thành công
  Cancelled: 3, // Đã hủy
  Returned: 4, // Đã trả hàng
};
