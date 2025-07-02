import { axiosInstance } from "../apiConfig";

export const getVoucherApply = async (data) => {
  try {
    const response = await axiosInstance.get(`/voucher/apply`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error!";
    throw new Error(message);
  }
};
export const getVouchers = async () => {
  try {
    const response = await axiosInstance.get("voucher");
    console.log("Raw API response from voucherService:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    return {
      statusCode: 500,
      message: "Failed to fetch vouchers",
      data: {
        data: [],
      },
    };
  }
};

export const getVoucherById = async (id) => {
  try {
    const response = await axiosInstance.get(`voucher/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching voucher with id ${id}:`, error);
    return {
      statusCode: 500,
      message: `Failed to fetch voucher with id ${id}`,
      data: {
        data: null,
      },
    };
  }
};

export const createVoucher = async (voucherData) => {
  try {
    const response = await axiosInstance.post("voucher", voucherData);
    return response.data;
  } catch (error) {
    console.error("Error creating voucher:", error);
    return {
      statusCode: 500,
      message: "Failed to create voucher",
      data: {
        data: null,
      },
    };
  }
};

export const updateVoucher = async (id, voucherData) => {
  try {
    const response = await axiosInstance.put(`voucher`, voucherData);
    return response.data;
  } catch (error) {
    console.error(`Error updating voucher with id ${id}:`, error);
    return {
      statusCode: 500,
      message: "Failed to update voucher",
      data: {
        data: null,
      },
    };
  }
};

export const deleteVoucher = async (id) => {
  try {
    const response = await axiosInstance.delete(`voucher/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting voucher with id ${id}:`, error);
    return {
      statusCode: 500,
      message: `Failed to delete voucher with id ${id}`,
      data: {
        data: null,
      },
    };
  }
};

export const applyVoucher = async (voucherCode) => {
  try {
    const response = await axiosInstance.get(`voucher/apply`, {
      params: { code: voucherCode },
    });
    return response.data;
  } catch (error) {
    console.error("Error applying voucher:", error);
    return {
      statusCode: 500,
      message: "Failed to apply voucher",
      data: {
        data: null,
      },
    };
  }
};

const voucherService = {
  getVouchers,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  applyVoucher,
};

export default voucherService;
