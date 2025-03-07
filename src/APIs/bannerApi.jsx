import axios from "axios";

const API_URL = "http://localhost:5000/api/banners";

// Function to get auth headers
const getAuthHeaders = (isMultipart = false) => {
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? storedToken.replace("Bearer ", "") : null;

  if (!token) {
    throw new Error("No token found, please log in.");
  }
  
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
    },
  };
};


// Get all banners
export const getBanners = async () => {
  try {
    return (await axios.get(`${API_URL}/all`)).data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

// Get a banner by ID
export const getBannerById = async (id) => {
  try {
    return (await axios.get(`${API_URL}/${id}`, getAuthHeaders(true))).data;

  } catch (error) {
    console.error("Error fetching banner:", error);
    throw error;
  }
};

// Upload a new banner
export const uploadBanner = async (formData) => {
  try {
    return (await axios.post(`${API_URL}/upload`, formData, getAuthHeaders(true))).data;
  } catch (error) {
    console.error("Error uploading banner:", error);
    throw error;
  }
};

// Update a banner
export const updateBanner = async (id, formData) => {
  try {
    return (await axios.put(`${API_URL}/${id}`, formData, getAuthHeaders(true))).data;
  } catch (error) {
    console.error("Error updating banner:", error);
    throw error;
  }
};

// Update banner status
export const updateBannerStatus = async (id, status) => {
  try {
    await axios.put(`${API_URL}/status/${id}`, { status }, getAuthHeaders());
  } catch (error) {
    console.error("Error updating banner status:", error);
  }
};

// Delete a banner
export const deleteBanner = async (id) => {
  try {
    return (await axios.delete(`${API_URL}/delete/${id}`, getAuthHeaders())).data;
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw error;
  }
};
