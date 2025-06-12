import { axiosInstance } from "../apiConfig";


export async function getAllBlogs() {
    try {
      const response = await axiosInstance.get("/blog");
      return response.data;
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  }

  export async function getBlogById(id) {
    try {
      const response = await axiosInstance.get(`/blog/${id}`);
      return response.data;
    } catch (error) {
        console.log("Error fetching blog:", error);
    }
  }
  
  export async function createBlog(blogData) {
    try {
      const response = await axiosInstance.post("/blog", blogData);
      return response.data;
    } catch (error) {
        console.log("Error creating blog:", error);
    }
  }
  
  export async function updateBlog(blogData) {
    try {
      const response = await axiosInstance.put(
        `blog/`,
        blogData
      );
      return response.data;
    } catch (error) {
      console.log("Error updating Blog:", error);
    }
  }
  
  export async function deleteBlog(blogId) {
    try {
      const response = await axiosInstance.delete(
        `/blog/${blogId}`
      );
      return response.data;
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  }


  export const get6Blogs = async (pageIndex = 1, pageSize = 6) => {
    try {
      const response = await axiosInstance.get(`blog/`, {
        params: { PageIndex: pageIndex, PageSize: pageSize },
      });
      const paginationHeader = response.headers?.["x-pagination"];
      const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
  
      return {
        data: response.data,
        pagination: pagination, 
      };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
    }
  };

