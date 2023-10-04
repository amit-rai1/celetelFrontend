
import axios from 'axios';
import { API_BASEURL } from '../../environment';
export const loginAuth = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASEURL}/api/admin/authLogin`, { email, password });
    // const response = await axios.post('https://ibizoserver.onrender.com/api/admin/authLogin', { email, password });

    console.log(response,"res")
    return response.data;
  } catch (error) {
    throw error;
  }
};

 export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASEURL}/api/user/createUser`, userData);
    console.log("response",response.data)
    return response.data;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Create a file named apiService.js

const getUserList = (searchTerm) => {
  let url = `${API_BASEURL}/api/user/getUserList`;
  if (searchTerm) {
    url += `?name=${searchTerm}`;
  }
  
  return axios.get(url);
};

export default getUserList;

// const getUserList = (token) => {
//   axios.interceptors.request.use((config) => {
//     console.log(config.headers); // Log request headers
//     return config;
//   }, (error) => {
//     return Promise.reject(error);
//   });

//   return axios.get('http://localhost:9800/api/user/getUserList', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
// export default getUserList;


export const deleteUser = async (ids) => {
  try {
    const response = await axios.post(`${API_BASEURL}/api/user/deleteUsers`, { ids });
    console.log(response.data,"API service res")

    return response.data; // Make sure you return response.data
  } catch (error) {
    throw error;
  }
};