import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.20:3000'
//const API_BASE_URL = "http://localhost:3000"

export const loginUser = async ({correo, password_hash}) => {
    try{
        const response = await axios.post
        (`${API_BASE_URL}/user/login`,
            {correo, password_hash}
        );
        return response.data;
    } catch (error) {
        console.error('Error en LoginUser', error);
        throw error;
    }
};  