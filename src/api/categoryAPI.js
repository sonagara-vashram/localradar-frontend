import apiClient from "./apiClient";
import CryptoJS from "crypto-js";

const API_KEY = "secure_api_key";
const API_SECRET = "A9x2GzQ7mS4pL1r0";

// Generate API Signature
const getSignature = (method, path, timestamp) =>
  CryptoJS.HmacSHA256(method + path + timestamp, API_SECRET).toString();

// Get API Headers
const getHeaders = (timestamp, signature) => ({
  "Content-Type": "application/json",
  "X-API-KEY": API_KEY,
  "X-Timestamp": timestamp,
  "X-Signature": signature,
});

export const fetchCategoryData = async (category, location) => {
  try {
    // console.log("Fetching data for:", { category, location });

    const formattedCategory = formatCategoryForAPI(category);
    // console.log(`Making API request for category: ${formattedCategory}`);

    const method = "POST",
      path = "/api/scrape";
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = getSignature(method, path, timestamp);

    // API Request
    const response = await apiClient.post(
      path,
      { category: formattedCategory, location },
      { headers: getHeaders(timestamp, signature) },
    );

    // console.log("API response data:", response.data);
    return response.data;
  } catch (error) {
      let message = "Failed to load data. Please try again later.";
      if (error.code === "ECONNABORTED") {
        message = "Request timed out. Please check your internet connection.";
      } else if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      console.error("Error fetching category data:", message);
      throw new Error(message);
    }
};

// Category Mapping
const categoryMapping = {
  weather: ["weather", "🌤️"],
  amusementparks: ["amusementparks", "🎢"],
  bakeries: ["Bakeries", "🥐"],
  bars: ["Bars", "🍻"],
  beaches: ["Beaches", "🏖️"],
  bookstores: ["Bookstores", "📖"],
  carrepairservices: ["Carrepairservices", "🛠️"],
  cinemas: ["Cinemas", "🎬"],
  clinics: ["Clinics", "🏥"],
  clothingstores: ["Clothingstores", "👕"],
  coachingcenters: ["coachingcenters", "📚"],
  coffeeshops: ["Coffeeshops", "☕"],
  colleges: ["Colleges", "🎓"],
  dentists: ["Dentists", "🦷"],
  electronicstores: ["Electronicstores", "🔌"],
  eyecarecenters: ["eyecarecenters", "👓"],
  fastfood: ["Fastfood", "🍔"],
  firestation: ["firestation", "🚒"],
  furniturestores: ["Furniturestores", "🛋️"],
  grocerystore: ["Grocerystore", "🛒"],
  gym: ["Gyms", "💪"],
  hospitals: ["Hospitals", "🏥"],
  hostels: ["Hostels", "🛏️"],
  hotels: ["Hotels", "🏨"],
  jewelryshops: ["Jewelryshops", "💍"],
  jobs: ["Jobs", "💼"],
  libraries: ["Libraries", "📚"],
  museums: ["Museums", "🏛️"],
  musicdanceacademies: ["musicdanceacademies", "🎵"],
  news: ["News", "📰"],
  nightclubs: ["Nightclubs", "🎶"],
  parks: ["Parks", "🌳"],
  policestations: ["Policestations", "👮"],
  publictransport: ["Publictransport", "🚌"],
  restaurant: ["Restaurants", "🍽️"],
  salons: ["Salons", "💇"],
  schools: ["Schools", "🏫"],
  shoppingmalls: ["Shoppingmalls", "🛍️"],
  sportsclubs: ["Sportsclubs", "⚽"],
  supermarkets: ["Supermarkets", "🏪"],
  temples: ["Temples", "🛕"],
  yogacenters: ["Yogacenters", "🧘"],
};

// Format Category for API
const formatCategoryForAPI = (category) =>
  categoryMapping[category]?.[0]?.toLowerCase() || category;

// Get Category Icon
export const getCategoryIcon = (category) =>
  categoryMapping[category]?.[1] || "📍";

// Get Category Name
export const getCategoryName = (category) =>
  categoryMapping[category]?.[0] ||
  category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, " ");
