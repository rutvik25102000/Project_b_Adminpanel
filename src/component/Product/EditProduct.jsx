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
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Food Name"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
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

        {/* Image Preview */}
        <img
          src={imagePreview || "/default-image.jpg"}
          alt="Food Preview"
          className="w-24 h-24 object-cover rounded"
        />

        <input
          type="file"
          name="imageUrl"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
          <span>Available</span>
        </label>
        <input
          type="number"
          name="preparationTime"
          value={formData.preparationTime}
          onChange={handleChange}
          placeholder="Preparation Time (mins)"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Update Food Item
        </button>
      </form>
    </div>
  );
};

export default UpdateformData;
