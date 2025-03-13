import axios from "axios";

const API_URL = "http://localhost:5000/api/logo";

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

// ✅ Upload Logo
export const uploadLogo = async (formData) => {
  try {
    return (await axios.post(`${API_URL}/upload`, formData, getAuthHeaders(true))).data;
  } catch (error) {
    console.error("Error uploading logo:", error);
    throw error;
  }
};

// ✅ Get All Logos
export const getAllLogos = async () => {
  try {
    return (await axios.get(`${API_URL}/all`, getAuthHeaders())).data;
  } catch (error) {
    console.error("Error fetching logos:", error);
    throw error;
  }
};

// ✅ Get Logo by ID
export const getLogoById = async (id) => {
  try {
    return (await axios.get(`${API_URL}/${id}`, getAuthHeaders())).data;
  } catch (error) {
    console.error("Error fetching logo by ID:", error);
    throw error;
  }
};

// ✅ Update Logo
export const updateLogo = async (id, formData) => {
  try {
    return (await axios.put(`${API_URL}/update-logo/${id}`, formData, getAuthHeaders(true))).data;
  } catch (error) {
    console.error("Error updating logo:", error);
    throw error;
  }
};

// ✅ Update Logo Status
export const toggleLogoStatus  = async (id, status) => {
  try {
    return (await axios.put(`${API_URL}/update-status/${id}`, { status }, getAuthHeaders())).data;
  } catch (error) {
    console.error("Error updating logo status:", error);
    throw error;
  }
};

// ✅ Delete Logo
export const deleteLogo = async (id) => {
  try {
    return (await axios.delete(`${API_URL}/delete/${id}`, getAuthHeaders())).data;
  } catch (error) {
    console.error("Error deleting logo:", error);
    throw error;
  }
};
