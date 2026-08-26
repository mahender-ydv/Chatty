import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});
