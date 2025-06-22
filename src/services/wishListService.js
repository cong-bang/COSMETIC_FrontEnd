import { axiosInstance } from "../apiConfig";

  export const get8WishList = async (pageIndex = 1, pageSize = 8) => {
    try {
      const response = await axiosInstance.get(`wishlist/`, {
        params: { 'page-index': pageIndex, 'page-size': pageSize },
      });
      
      return {
        data: response.data.data,
        pagination: response.data.data.metaData, 
      };
    } catch (error) {
        const message = error.response?.data?.message || "Error!";
        throw new Error(message);
    }
  };

export async function addWishList(data) {
  try {
    const response = await axiosInstance.post(`/wishlist`, data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
}

export const deleteWishListById = async (id) => {
    try {
        const response = await axiosInstance.delete(
            `/wishlist/${id}`
        );
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Error!";
        throw new Error(message);
    }
};

export async function addWishListToCart() {
  try {
    const response = await axiosInstance.post(`/wishlist/add/cart`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
}

