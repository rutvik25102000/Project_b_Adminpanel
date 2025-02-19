import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Get all food items
export const getAllFoodItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/fooditem/food`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Add more API calls here (e.g., addProduct, updateProduct, deleteProduct)
