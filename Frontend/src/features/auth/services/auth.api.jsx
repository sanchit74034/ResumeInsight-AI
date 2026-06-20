import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
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
