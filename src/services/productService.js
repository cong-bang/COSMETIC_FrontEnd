import { axiosInstance } from "../apiConfig";

  export const get5Products = async (pageIndex = 1, pageSize = 5) => {
    try {
      const response = await axiosInstance.get(`product/`, {
        params: { 'page-index': pageIndex, 'page-size': pageSize },
      });
      const paginationHeader = response.headers?.["x-pagination"];
      const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
  
      return {
        data: response.data.data.data,
        pagination: pagination, 
      };
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
  };

  export const getProductById = async (id) => {
    try {
        const response = await axiosInstance.get(
            `/product/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};