// src/api/getOperatorsApi.js
import axios from 'axios';

const API_BASE_URL = "http://localhost:3000";

export const getAllOperators = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/get_operators`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener operadores:", error);
    return [];
  }
};

export const activateOperator = async (nomina, operadorActualizado) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/get_operators/${nomina}`,
      operadorActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Error al activar el operador:", error);
    return null;
  }
};
