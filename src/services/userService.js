import { axiosInstance } from "../apiConfig";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/user");
    console.log("Raw API response from userService:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      statusCode: 500,
      message: "Failed to fetch users",
      data: {
        data: [],
      },
    };
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    return {
      statusCode: 500,
      message: `Failed to fetch user with id ${id}`,
      data: {
        data: null,
      },
    };
  }
};

export async function putUserProfile(data) {
  try {
    const response = await axiosInstance.put(`/user/profile`, data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Cập nhật thất bại!";
    throw new Error(message);
  }
}

export async function putUserAddress(data) {
  try {
    const response = await axiosInstance.put(`/user/address`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Cập nhật thất bại!";
    throw new Error(message);
  }
}

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/user", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      statusCode: 500,
      message: "Failed to create user",
      data: {
        data: null,
      },
    };
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put(`/user`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user:`, error);
    return {
      statusCode: 500,
      message: "Failed to update user",
      data: {
        data: null,
      },
    };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    return {
      statusCode: 500,
      message: `Failed to delete user with id ${id}`,
      data: {
        data: null,
      },
    };
  }
};

export const updateUserAvatar = async (formData) => {
  try {
    const response = await axiosInstance.post("/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user avatar:", error);
    return {
      statusCode: 500,
      message: "Failed to update user avatar",
      data: {
        data: null,
      },
    };
  }
};

export const updateUserAddress = async (addressData) => {
  try {
    const response = await axiosInstance.put("/user/address", addressData);
    return response.data;
  } catch (error) {
    console.error("Error updating user address:", error);
    return {
      statusCode: 500,
      message: "Failed to update user address",
      data: {
        data: null,
      },
    };
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put("/user/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      statusCode: 500,
      message: "Failed to update user profile",
      data: {
        data: null,
      },
    };
  }
};

export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axiosInstance.post("/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Upload Error!";
    throw new Error(message);
  }
};
