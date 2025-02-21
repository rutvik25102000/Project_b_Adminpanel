import { useState, useEffect } from "react";
import axios from "axios";
import { getCategories } from "../APIs/categoryApi";


const ProductCard = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        foodType: "",
        preparationTime: "",
        availability: true,
        ingredients: [],
        image: null,
    });

    const [ingredientInput, setIngredientInput] = useState("");

    const [categories, setCategories] = useState([]); // Store categories

    const foodTypes = ["Veg", "Non-Veg"];


    useEffect(() => {
       const fetchCategories = async () => {
           try {
             const data = await getCategories();
             console.log("Fetched Categories:", data); // Debugging
         
             if (data.success) {
               setCategories(Array.isArray(data.categories) ? data.categories : []);
             } else {
               setCategories([]); // Ensure state is always an array
             }
           } catch (error) {
             console.error("Error fetching categories:", error);
             setCategories([]);
           }
         };

        fetchCategories();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleAvailabilityChange = (e) => {
        setFormData({ ...formData, availability: e.target.checked });
    };

    const handleIngredientAdd = () => {
        if (ingredientInput.trim()) {
            setFormData({ ...formData, ingredients: [...formData.ingredients, ingredientInput] });
            setIngredientInput("");
        }
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
        formDataToSend.append("availability", JSON.stringify(formData.availability)); // Ensure Boolean conversion
        formDataToSend.append("image", formData.image); // Fix image field

        formData.ingredients.forEach((ingredient) => {
            formDataToSend.append("ingredients[]", ingredient); // Ensure array format
        });

        const storedToken = localStorage.getItem("token");
        const token = storedToken ? storedToken.replace("Bearer ", "") : null;

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/fooditem/food",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Food item added successfully!");

            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                foodType: "",
                preparationTime: "",
                availability: true,
                ingredients: [],
                image: null,
            });
        } catch (error) {
            console.error("Error adding food item:", error.response?.data || error.message);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-4  bg-white rounded-lg ">
            <h2 className="text-xl font-bold mb-4 text-center">Add Food Item</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Name */}
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Food Name"
                    className="p-2 border rounded col-span-1"
                    required
                />

                {/* Price */}
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price (₹)"
                    className="p-2 border rounded col-span-1"
                    required
                />

                {/* Description */}
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="p-2 border rounded col-span-2"
                    required
                />

                {/* Category */}
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-1"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

               
                 {/* Food Type */}
      <select
        name="foodType"
        value={formData.foodType}
        onChange={handleChange}
        className="p-2 border rounded col-span-1"
        required
      >
        <option value="">Select Food Type</option>
        {foodTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>


                {/* Preparation Time */}
                <input
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleChange}
                    placeholder="Preparation Time (minutes)"
                    className="p-2 border rounded col-span-1"
                    required
                />

                {/* Availability */}
                <div className="flex items-center space-x-2 col-span-1">
                    <input
                        type="checkbox"
                        checked={formData.availability}
                        onChange={handleAvailabilityChange}
                        className="h-5 w-5"
                    />
                    <label>Available</label>
                </div>

                {/* Ingredients */}
                <div className="border p-3 rounded col-span-2">
                    <label className="block mb-2">Ingredients</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={ingredientInput}
                            onChange={(e) => setIngredientInput(e.target.value)}
                            placeholder="Enter ingredient"
                            className="flex-1 p-2 border rounded"
                        />
                        <button type="button" onClick={handleIngredientAdd} className="px-3 bg-green-500 text-white rounded">
                            Add
                        </button>
                    </div>
                    <ul className="mt-2 grid grid-cols-2 gap-1">
                        {formData.ingredients.map((ing, index) => (
                            <li key={index} className="text-sm text-gray-700">
                                • {ing}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image Upload */}
                <div className="col-span-2">
                    <input type="file" onChange={handleFileChange} accept="image/*" className="w-full p-2 border rounded" required />
                </div>

                {/* Submit Button */}
                <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Add Food Item
                </button>
            </form>
        </div>

    );
};

export default ProductCard;




