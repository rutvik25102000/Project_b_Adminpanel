import { useState, useEffect } from "react";

const CategoryForm = ({ onSubmit, initialData = {} }) => {
  // Ensure initialData is always an object
  const safeInitialData = initialData || {}; 
  const [name, setName] = useState(safeInitialData.name || "");

  useEffect(() => {
    setName(safeInitialData.name || "");
  }, [safeInitialData]); // Update state when initialData changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg flex gap-2">
      <input
        type="text"
        placeholder="Enter category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded">
        {safeInitialData.name ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default CategoryForm;
