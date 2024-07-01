import axios from 'axios';
import { getAuthToken ,getUserInfo} from '../localStorage/userLocalStorage';
const apiBaseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
     // Retrieve user information
     const userInfo = getUserInfo();
     // Check if user information is available and update headers
     if (userInfo) {
       config.headers['userInfo'] = JSON.stringify(userInfo);
       // Add other headers as needed based on your user information
     }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance; // Export the axiosInstance