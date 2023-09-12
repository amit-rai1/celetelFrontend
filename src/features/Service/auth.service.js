
import axios from 'axios';

export const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:9800/api/admin/login', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

 export const createUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:9800/api/user/createUser', userData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};