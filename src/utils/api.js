import { toast } from "react-toastify";

const API = {
  /**
   * Base URL for API calls
   */
  baseURL: "/api",

  /**
   * Makes an authenticated API request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @param {boolean} requiresAuth - Whether the endpoint requires authentication
   * @returns {Promise<any>} Response data
   */
  async fetch(endpoint, options = {}, requiresAuth = true) {
    const url = `${this.baseURL}${endpoint}`;

    // Add authentication headers if required
    if (requiresAuth) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, options);

      // Handle different response statuses
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.setItem("isLoggedIn", "false");
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
        throw new Error("Unauthorized: Please log in again");
      }

      if (response.status === 429) {
        toast.error(
          "Too many requests. Please wait a moment before trying again.",
        );
        throw new Error("Rate limit exceeded: Please try again later");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || "Something went wrong";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      // Log the error for debugging
      console.error("API request failed:", error);

      // Re-throw the error to be handled by the caller
      throw error;
    }
  },

  /**
   * Makes a POST request to the scrape API endpoint
   * @param {string} category - Category to scrape
   * @param {string} location - Location to scrape for
   * @returns {Promise<any>} Scrape results
   */
  async scrapeData(category, location) {
    try {
      return await this.fetch(
        `/scrape?category=${encodeURIComponent(category)}&location=${encodeURIComponent(location)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
        true, // Requires authentication
      );
    } catch (error) {
      if (error.message.includes("Rate limit exceeded")) {
        toast.error(
          "You have sent too many requests. Please wait a moment before trying again.",
          {
            autoClose: 5000,
          },
        );
      }
      throw error;
    }
  },

  /**
   * Logs the user in
   * @param {Object} credentials - User credentials
   * @returns {Promise<any>} Login result
   */
  async login(credentials) {
    const result = await this.fetch(
      "/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
      false,
    );

    // Store tokens
    if (result.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("isLoggedIn", "true");
    }

    return result;
  },

  /**
   * Refreshes the access token
   * @returns {Promise<any>} Refresh result
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const result = await this.fetch(
      "/users/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      },
      false,
    );

    if (result.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
    }

    return result;
  },

  /**
   * Checks if the user's session is valid
   * @returns {boolean} Whether the session is valid
   */
  isSessionValid() {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;

    try {
      // Parse the JWT token
      const payload = JSON.parse(atob(token.split(".")[1]));
      // Check if token has expired
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  },
};

export default API;
