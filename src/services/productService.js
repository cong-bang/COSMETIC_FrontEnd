import { axiosInstance } from "../apiConfig";
import qs from "qs";

export const get5Products = async (pageIndex = 1, pageSize = 5) => {
  try {
    const response = await axiosInstance.get(`product/`, {
      params: { "page-index": pageIndex, "page-size": pageSize },
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

export const get12Products = async (pageIndex = 1, pageSize = 12) => {
  try {
    const response = await axiosInstance.get(`product/`, {
      params: { "page-index": pageIndex, "page-size": pageSize },
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

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get(`/product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const createProduct = async (formData) => {
  try {
    // Để axios tự động xử lý Content-Type và boundary khi gửi FormData
    // KHÔNG thiết lập Content-Type header để tránh lỗi 415
    const response = await axiosInstance.post("/product", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (data) => {
  try {
    // Gửi dữ liệu dưới dạng JSON
    const response = await axiosInstance.put("/product", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

export const searchProducts = async (params) => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries({
        SearchTerm: params.searchTerm,
        BrandIds: params.brandIds,
        BrandName: params.brandName,
        CategoryId: params.categoryId,
        AmountPrice: params.amountPrice,
        MinRating: params.minRating,
        SortBy: params.sortBy,
        "page-index": params.pageIndex || 1,
        "page-size": params.pageSize || 12,
      }).filter(
        ([_, value]) => value !== null && value !== "" && value !== undefined
      )
    );

    const response = await axiosInstance.get("product/search", {
      params: filteredParams,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });

    return {
      data: response.data.data.data,
      pagination: response.data.data.metaData,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Không thể tìm sản phẩm!";
    throw new Error(message);
  }
};
