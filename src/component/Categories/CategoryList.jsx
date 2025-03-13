import { useEffect } from "react";
import { getCategories, deleteCategory } from "../../APIs/categoryApi";

const CategoryList = ({ categories, setCategories, onEdit }) => {

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

  return (<>
    <div className="bg-white  shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-lg font-bold mb-4">Category List</h2>

      {categories.length === 0 ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">NO.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category,index) => (
                <tr key={category._id} className="border-b border-gray-300">
                  <td className="py-2 px-4 ">{index + 1}</td>

                  <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => onEdit(category)}
                      className="border-2 border-yellow-500 text-black px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="border-2 border-orange-800 text-black px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default CategoryList;