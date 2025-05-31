import apiClient from "./apiClient";

export const fetchSchools = async (location) => {
  try {
    const response = await apiClient.get(`/school/${location}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error || "Failed to fetch schools");
  }
};
