import axios from 'axios';

// Lấy danh sách tỉnh/thành phố
export async function getAllProvinces() {
  try {
    const response = await axios.get('https://provinces.open-api.vn/api/p/');
    return response.data;
  } catch (error) {
    console.log('Error fetching provinces:', error);
    return null;
  }
}

// Lấy danh sách quận/huyện theo mã tỉnh
export async function getDistrictsByProvinceCode(provinceCode) {
  try {
    const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
    return response.data.districts; 
  } catch (error) {
    console.log('Error fetching districts:', error);
    return null;
  }
}

// Lấy danh sách phường/xã theo mã quận
export async function getWardsByDistrictCode(districtCode) {
  try {
    const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    return response.data.wards;  
  } catch (error) {
    console.log('Error fetching wards:', error);
    return null;
  }
}

