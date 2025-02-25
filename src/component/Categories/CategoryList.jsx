import {  useEffect } from "react";
import { getCategories,deleteCategory } from "../../APIs/categoryApi";

const CategoryList = ({ categories, setCategories, onEdit  }) => {

  // ✅ Fetch Categories from Backend
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response?.data?.categories) {
        setCategories(response.data.categories);
      } else {
        setCategories([]); 
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);



  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category._id !== id)); // ✅ Remove category from state
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-lg font-bold mb-2">Category List</h2>
      
    
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="flex justify-between items-center border-b p-2">
              <span>{category.name}</span>
              <div>
                <button
                  onClick={() => onEdit(category)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
