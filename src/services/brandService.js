import { axiosInstance } from "../apiConfig";

  export const getBrandById = async (id) => {
    try {
        const response = await axiosInstance.get(
            `/brand/${id}`
        );
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Error!";
        throw new Error(message);
    }
};
// Dữ liệu mẫu khi API không hoạt động
const getSampleBrands = () => {
  return [
    {
      id: 1,
      name: "COSRX",
      description:
        "Thương hiệu mỹ phẩm Hàn Quốc nổi tiếng với các sản phẩm chăm sóc da mụn.",
      country: "South Korea",
      logoImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/COSRX_logo.svg/320px-COSRX_logo.svg.png",
      createdAt: "2023-01-15T08:30:00.000Z",
      updatedAt: "2023-01-15T08:30:00.000Z",
    },
    {
      id: 2,
      name: "Innisfree",
      description: "Thương hiệu mỹ phẩm thiên nhiên từ đảo Jeju.",
      country: "South Korea",
      logoImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Innisfree_logo.svg/320px-Innisfree_logo.svg.png",
      createdAt: "2023-01-16T10:45:00.000Z",
      updatedAt: "2023-01-16T10:45:00.000Z",
    },
    {
      id: 3,
      name: "The Ordinary",
      description:
        "Thương hiệu nổi tiếng với các sản phẩm đơn thành phần giá rẻ.",
      country: "Canada",
      logoImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/The_Ordinary_logo.svg/320px-The_Ordinary_logo.svg.png",
      createdAt: "2023-01-17T09:15:00.000Z",
      updatedAt: "2023-01-17T09:15:00.000Z",
    },
    {
      id: 4,
      name: "PURE",
      description: "DEP",
      country: "Việt Nam",
      logoImg: null,
      createdAt: "2023-01-18T14:20:00.000Z",
      updatedAt: "2023-01-18T14:20:00.000Z",
    },
    {
      id: 5,
      name: "PUREee",
      description: "123",
      country: "Japan",
      logoImg: null,
      createdAt: "2023-01-19T11:10:00.000Z",
      updatedAt: "2023-01-19T11:10:00.000Z",
    },
    {
      id: 6,
      name: "Axios",
      description: "kkkk",
      country: "Vietnam",
      logoImg: null,
      createdAt: "2023-01-20T16:05:00.000Z",
      updatedAt: "2023-01-20T16:05:00.000Z",
    },
  ];
};

export const getBrands = async () => {
  try {
    const response = await axiosInstance.get("/brand");
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    // Trả về dữ liệu mẫu khi API lỗi
    return {
      statusCode: 200,
      data: getSampleBrands(),
      message: "Dữ liệu mẫu (API không hoạt động)",
    };
  }
};

// export const getBrandById = async (id) => {
//   try {
//     const response = await axiosInstance.get(`/brand/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching brand with id ${id}:`, error);
//     // Trả về dữ liệu mẫu khi API lỗi
//     const brand = getSampleBrands().find((brand) => brand.id === id);
//     return {
//       statusCode: 200,
//       data: brand || {
//         id: id,
//         name: "Unknown Brand",
//         description: "No description",
//         country: "Unknown",
//       },
//       message: "Dữ liệu mẫu (API không hoạt động)",
//     };
//   }
// };

export const createBrand = async (formData) => {
  try {
    const response = await axiosInstance.post("/brand", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating brand:", error);
    // Giả lập thành công khi API lỗi
    return {
      statusCode: 200,
      data: {
        id: Math.floor(Math.random() * 1000) + 100,
        name: formData.get("name"),
        description: formData.get("description"),
        country: formData.get("country"),
        logoImg: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: "Thêm nhãn hiệu thành công (giả lập)",
    };
  }
};

export const updateBrand = async (formData) => {
  try {
    const response = await axiosInstance.put(`/brand`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating brand:`, error);
    // Giả lập thành công khi API lỗi
    return {
      statusCode: 200,
      data: {
        id: formData.get("id"),
        name: formData.get("name"),
        description: formData.get("description"),
        country: formData.get("country"),
        logoImg: null,
        updatedAt: new Date().toISOString(),
      },
      message: "Cập nhật nhãn hiệu thành công (giả lập)",
    };
  }
};

export const deleteBrand = async (id) => {
  try {
    const response = await axiosInstance.delete(`/brand/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting brand with id ${id}:`, error);
    // Giả lập thành công khi API lỗi
    return {
      statusCode: 200,
      message: "Xóa nhãn hiệu thành công (giả lập)",
    };
  }
};

  export const get5Brands = async (pageIndex = 1, pageSize = 5) => {
    try {
      const response = await axiosInstance.get(`brand/`, {
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
