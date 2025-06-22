import axios from "axios";

// Dữ liệu mẫu khi API không hoạt động
const sampleCountries = [
  { name: "Vietnam", flag: "https://flagcdn.com/vn.svg" },
  { name: "United States", flag: "https://flagcdn.com/us.svg" },
  { name: "Japan", flag: "https://flagcdn.com/jp.svg" },
  { name: "South Korea", flag: "https://flagcdn.com/kr.svg" },
  { name: "China", flag: "https://flagcdn.com/cn.svg" },
  { name: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
  { name: "France", flag: "https://flagcdn.com/fr.svg" },
  { name: "Germany", flag: "https://flagcdn.com/de.svg" },
  { name: "Italy", flag: "https://flagcdn.com/it.svg" },
  { name: "Spain", flag: "https://flagcdn.com/es.svg" },
  { name: "Thailand", flag: "https://flagcdn.com/th.svg" },
  { name: "Singapore", flag: "https://flagcdn.com/sg.svg" },
  { name: "Malaysia", flag: "https://flagcdn.com/my.svg" },
  { name: "Indonesia", flag: "https://flagcdn.com/id.svg" },
  { name: "Philippines", flag: "https://flagcdn.com/ph.svg" },
  { name: "Australia", flag: "https://flagcdn.com/au.svg" },
  { name: "Canada", flag: "https://flagcdn.com/ca.svg" },
  { name: "Brazil", flag: "https://flagcdn.com/br.svg" },
  { name: "India", flag: "https://flagcdn.com/in.svg" },
  { name: "Russia", flag: "https://flagcdn.com/ru.svg" },
];

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
    console.log("Using sample countries data");
    return sampleCountries;
  }
};
