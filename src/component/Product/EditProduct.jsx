import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getProductById } from "../../APIs/AllApis";
import { getCategories } from "../../APIs/categoryApi";

const UpdateformData = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ingredients: "",
    availability: true,
    preparationTime: "",
    foodType: "Veg",
  });

  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // Image preview URL

  useEffect(() => {
    getProductById(id)
      .then((response) => {
        setformData({
          ...response,
          ingredients: response.ingredients.join(", "),
        });

        if (response.imageUrl) {
          setImagePreview(`http://localhost:5000${response.imageUrl}`);
        }
      })
      .catch((error) => console.error("Error fetching food item:", error));

    getCategories()
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview image before upload
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("foodType", formData.foodType);
    formDataToSend.append("preparationTime", formData.preparationTime);
    formDataToSend.append("availability", JSON.stringify(formData.availability));
    formDataToSend.append(
      "ingredients",
      JSON.stringify(formData.ingredients.split(",").map((i) => i.trim()))
    );

    if (selectedImage) {
      formDataToSend.append("image", selectedImage); // Add image only if updated
    }

    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/fooditem/food/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );


      setformData({
        name: "",
        description: "",
        price: "",
        category: "",
        foodType: "Veg",
        preparationTime: "",
        availability: true,
        ingredients: "",
      });

      setSelectedImage(null);
      setImagePreview("");

      navigate("/admin/product-details");
    } catch (error) {
      console.error("Error updating food item:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Food Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Food Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter food name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter food description"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
        </div>

        {/* Image Upload & Preview */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src={imagePreview || "/default-image.jpg"}
            alt="Food Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <input
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingredients (comma separated)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Availability Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="w-5 h-5 text-blue-500"
          />
          <label className="text-gray-700 font-medium">Available</label>
        </div>

        {/* Preparation Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Preparation Time (mins)</label>
          <input
            type="number"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleChange}
            placeholder="Enter preparation time"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Food Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Food Type</label>
          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Update Food Item
        </button>
      </form>
    </div>
  );
};


export default UpdateformData;
