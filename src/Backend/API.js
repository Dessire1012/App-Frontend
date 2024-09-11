import axios from "axios";

const API_URL =
  "https://app-ffb84f79-a617-43e4-b3ef-d4e15dbc138f.cleverapps.io/user";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/viewUser?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
