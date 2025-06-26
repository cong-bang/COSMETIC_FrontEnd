import { axiosInstance } from "../apiConfig";

  export const get2Feedbacks = async (pageIndex = 1, pageSize = 5, productId) => {
    try {
      const response = await axiosInstance.get(`feedback/`, {
        params: { 'page-index': pageIndex, 'page-size': pageSize, 'productId': productId, 'newestFirst': true },
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

 export const postFeedback = async (data) => {
    try {
      const response = await axiosInstance.post(`feedback/`, data, {
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

  export const deleteFeedback = async (id) => {
  try {
    const response = await axiosInstance.delete(`/feedback/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
};

export const updateFeedback = async (data) => {
  try {
    const response = await axiosInstance.put(`feedback`, data, {
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

