import axios from 'axios';

const API_BASE_URL = "http://192.168.1.20:3000";
//const API_BASE_URL = "http://localhost:3000"

export const getInventario = async () => {
    const response = await axios.get(`${API_BASE_URL}/stock/get/`);
    return response.data;
};