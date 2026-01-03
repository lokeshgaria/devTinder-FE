import axios from "axios";
import { showError } from "./notifications";

const AXIOS_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
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

      showError("Unauthorized — redirect to login");

      setTimeout(() => {
        window.location.replace("/login");
      }, 1800);
    }
    return Promise.reject(err?.response?.data || err);
  }
);

export default AXIOS_API;
