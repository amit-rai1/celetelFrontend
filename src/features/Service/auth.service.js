
import axios from 'axios';
import { API_BASEURL } from '../../environment';
export const loginAuth = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASEURL}/api/admin/authLogin`, {username, password });

    console.log(response,"res")
    return response;
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


// export const deleteUser = async (ids) => {
//   console.log(ids,"ids")
//   try {
//     const response = await axios.post(`${API_BASEURL}/api/addData/deleteData`, { ids });
//     console.log(response,"respoid")
//     console.log(response.data,"API service res")

//     return response.data; // Make sure you return response.data
//   } catch (error) {
//     throw error;
//   }
// };

export const deleteUser = async (ids) => {
  console.log(ids,"ids")
  try {
    const response = await axios.delete(`${API_BASEURL}/api/addData/deleteData`, { data: { ids } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllData = async () => {
  try {
    const response = await axios.get(`${API_BASEURL}/api/addData/getAllData`); // Assuming the API endpoint is at /api/addData/getAllData
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};


export const addSimData = async (simData) => {
  try {
    const response = await axios.post(`${API_BASEURL}/api/addData/addData`, simData);
    console.log(response,"response81")
    return response.data;
  } catch (error) {

    throw new Error('Error adding sim data');
  }
};

export const updateData = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASEURL}/api/updateData/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSimStatistics = async () => {
  try {
    const response = await axios.get(`${API_BASEURL}/api/addData/getSimStatistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

 export const addSenderID = async (SenderID) => {
  try {
    const response = await axios.post(`${API_BASEURL}/api/addSenderId`, { SenderID });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSenderId = async (page, limit) => {
  try {
    const response = await axios.get(`${API_BASEURL}/api/getSenderId`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
