import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  withCredentials: true, // This ensures cookies are sent with requests
});

export const registerUser = async ({username, email, password}) => {
  try {
    const response = await api.post(`/register`, {username, email, password});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async ({email, password}) => {
  try {
    const response = await api.post(`/login`, {email, password});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const logoutUser = async () => {
  try {
    const response = await api.post(`/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get(`/profile`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
