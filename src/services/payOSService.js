import { axiosInstance } from "../apiConfig";

export async function createPayOSUrl(orderId) {
  try {
    const response = await axiosInstance.post(
      `/payos/create-payment-url/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error creating payment URL:", error);
  }
}
