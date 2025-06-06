import axios from 'axios';

export async function getAllProvinces() {
  try {
    const response = await axios.get('https://provinces.open-api.vn/api/p/');
    return response.data;
  } catch (error) {
    console.log('Error fetching provinces:', error);
    return null;
  }
}
