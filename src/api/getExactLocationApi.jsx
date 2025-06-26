import axios from 'axios'

const API_BASE_URL = "http://192.168.1.20:3000"
//const API_BASE_URL = "http://localhost:3000"

export const exactLocation = async ({itemUbication}) => {
    try {
        const response = await axios.get (
        `${API_BASE_URL}/location/get/${itemUbication}`
    );
    return response.data
    } catch (error) {
        console.error('Error al obtener la ubicacion exacta', error);
        return null;
    }
}