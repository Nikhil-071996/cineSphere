import axios from "axios";
import queryString from "query-string";

const baseURL = import.meta.env.VITE_APP_BASE_URL;
const apiKey = import.meta.env.VITE_APP_API_KEY;

export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// ✅ Automatically attach API key to every request
axiosClient.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["api_key"] = apiKey;
  return config;
});
