import axios from "axios";

const AXIOS_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

AXIOS_API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.warn("Unauthorized — redirect to login");
    }
    return Promise.reject(err?.response?.data || err);
  }
);

export default AXIOS_API;
