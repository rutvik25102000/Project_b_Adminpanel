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

export const getProductById = async (productId) => {
  if (!productId) {
    console.error("Error: Product ID is undefined.");
    return null;
  }
  try {
    const response = await axios.get(`http://localhost:5000/api/fooditem/food/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

export const updateProduct = async (id, formData, token) => {
  try {
      const response = await axios.put(`http://localhost:5000/api/fooditem/food/${id}`, formData, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
          },
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};


// Delete a category
export const deleteProduct = async (id) => {
   const Token = localStorage.getItem("token");
      if (!Token) {
        console.error("No token found. Please log in.");
        return;
      }
  return axios.delete(`${BASE_URL}/api/fooditem/food/${id}`,{
    headers: {
        "Authorization": `Bearer ${Token}`,
    },
  });
};