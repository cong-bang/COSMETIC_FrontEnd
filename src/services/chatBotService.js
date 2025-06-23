import { axiosInstance } from "../apiConfig";

export async function sendToChatbot(sqlText, token) {
  try {
    const encodedQuery = encodeURIComponent(sqlText);

    const headers = {
      Accept: "*/*",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axiosInstance.post(
      `/DatabaseAnalyzer/ExecuteSqlCommand?sqlCommand=${encodedQuery}`,
      null,
      { headers }
    );

    const contentType = response.headers["content-type"];

    if (contentType && contentType.includes("application/json")) {
      return { data: response.data };
    } else {
      return { text: response.data };
    }
  } catch (error) {
    return {
      message:
        "Hệ thông đang bảo trì nâng cấp xin quý khách vui lòng đợi trong giây lát xin cảm ơn.",
    };
  }
}
