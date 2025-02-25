import axios from "axios";

const API_URL = "http://localhost:5000/api/categories"; 

// Fetch all categories
export const getCategories = async () => {
  return axios.get(`${API_URL}/getcategories`);
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
  return axios.delete(`${API_URL}/deletecategory/${id}`);
};
