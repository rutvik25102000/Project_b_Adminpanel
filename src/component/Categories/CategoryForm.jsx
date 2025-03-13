import { useState, useEffect } from "react";

const CategoryForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData?.name || "");

  useEffect(() => {
    setName(initialData?.name || "");
  }, [initialData?.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit(initialData?._id ? { _id: initialData._id, name } : { name });
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData?.name ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default CategoryForm;
