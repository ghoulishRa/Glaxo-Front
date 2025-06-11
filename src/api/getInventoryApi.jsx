import axios from 'axios';

const API_BASE_URL = "http://localhost:3000";

export const getInventario = async () => {
    const response = await axios.get(`${API_BASE_URL}/stock/get/`);
    return response.data;
};