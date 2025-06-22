import { axiosInstance } from "../apiConfig";

  export const get5Blogs = async (pageIndex = 1, pageSize = 5) => {
    try {
      const response = await axiosInstance.get(`blog/`, {
        params: { 'page-index': pageIndex, 'page-size': pageSize },
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


  export const createBlog = async (formData) => {
  try {
    const response = await axiosInstance.post("/blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
};

export const updateBlog = async (formData) => {
  try {
    const response = await axiosInstance.put("/blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axiosInstance.delete(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with id ${id}:`, error);
    throw error;
  }
};


