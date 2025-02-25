import { useState, useEffect } from "react";
import { getCategories, addCategory, updateCategory } from "../APIs/categoryApi";
import CategoryForm from "../component/Categories/CategoryForm";
import CategoryList from "../component/Categories/CategoryList";

const CategoriesPage = () => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddOrUpdateCategory = async (data) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, data);
        setEditingCategory(null); // Reset after update
      } else {
        await addCategory(data);
      }
       fetchCategories(); // Refresh categories after add/update
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Manage Categories</h1>
      <CategoryForm onSubmit={handleAddOrUpdateCategory} initialData={editingCategory} />
      <CategoryList categories={categories} setCategories={setCategories} onEdit={setEditingCategory} />
    </div>
  );
};

export default CategoriesPage;
