import axios from "axios";

export interface ResponseAPI {
  ok: boolean;
  message: string;
  data?: any;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL,
});

// Intercepta a resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);
