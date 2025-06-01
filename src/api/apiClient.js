import axios from "axios";

const BASE_URL = "https://local-radar.onrender.com";

if (!BASE_URL) {
  console.error("Error: VITE_API_BASE_URL is not defined in environment variables.");
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || "Something went wrong");
  },
);

export const authAPI = {
  register: async (userData) => {
    try {
      const response = await apiClient.post("/api/users/register", userData);
      return response.data;
    } catch (error) {
      console.log(error.message);;
    }
  },

  login: async (credentials) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apiClient.post("/api/users/login", credentials);
      // Store tokens in localStorage
      if (response.data.access_token) {
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        localStorage.setItem("isLoggedIn", "true");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await apiClient.post("/api/auth/refresh", {
        refresh_token: refreshToken,
      });

      if (response.data.access_token) {
        localStorage.setItem("accessToken", response.data.access_token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
  },
};

export default apiClient;