import axios from "axios";
import { API_BASE_URL } from "./config";
import { LoggerService } from "./LoggerService";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

axiosInstance.interceptors.response.use(
  (response) => {
    // We can process data here before taking final response.
    return response;
  },
  (error) => {
    LoggerService.error(error);
    return Promise.reject(error);
  })
