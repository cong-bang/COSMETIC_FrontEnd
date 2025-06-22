import { axiosInstance } from "../apiConfig";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post("/category", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axiosInstance.put(`/category`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
};
