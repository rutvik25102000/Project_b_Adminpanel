import axios from "axios";

const API_URL = "http://localhost:5000/api/categories"; 

// Fetch all categories
export const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/getcategories`);
      return response.data; // Return actual data
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { success: false, categories: [] }; // Handle error gracefully
    }
  };
// Add a new category
export const addCategory = async (categoryData) => {
  return axios.post(`${API_URL}/create`, categoryData);
};

// Update a category
export const updateCategory = async (id, categoryData) => {
  return axios.put(`${API_URL}/${id}`, categoryData);
};

// Delete a category
export const deleteCategory = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
