import axios from "axios";

// Dữ liệu mẫu khi API không hoạt động


export const getCountries = async () => {
  try {
    // Sử dụng API miễn phí để lấy danh sách quốc gia
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );

    // Chuyển đổi dữ liệu trả về thành định dạng phù hợp
    const countries = response.data.map((country) => ({
      name: country.name.common,
      flag: country.flags.svg || country.flags.png,
    }));

    // Sắp xếp theo tên quốc gia
    countries.sort((a, b) => a.name.localeCompare(b.name));

    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
   
    
  }
};
