import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { uploadLogo, getAllLogos, toggleLogoStatus, updateLogo, deleteLogo } from "../../APIs/logoApi";
import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

const LogoUpload = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null); // Track which logo is being edited
  const [fileName, setFileName] = useState("No file chosen");

  const fetchLogos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllLogos();
      setLogos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching logos:", error);
      setError("Failed to fetch logos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("usageType", data.usageType);
    formData.append("status", data.status);

    if (data.logo && data.logo.length > 0) {
      formData.append("image", data.logo[0]); // Ensure new image is sent if selected
    }

    try {
      if (editId) {
        await updateLogo(editId, formData); // Send updated data
        toast.success("Logo updated successfully!");
        setEditId(null);
      } else {
        await uploadLogo(formData);
        toast.success("Logo uploaded successfully!");
      }

      fetchLogos(); // Refresh the list after updating
      reset();
      setPreview(null);
    } catch (error) {
      console.error("Upload/Update error:", error);
      toast.error("Failed to upload/update logo!");
    }
  };




  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);

    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this logo?")) {
      try {
        await deleteLogo(id);
        fetchLogos();
        toast.success("Logo deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete logo!");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleLogoStatus(id, currentStatus === "active" ? "inactive" : "active");
      fetchLogos();
      toast.success("Logo status updated!");
    } catch (error) {
      console.error("Toggle status error:", error);
      toast.error("Failed to update logo status!");
    }
  };


  const handleUpdate = (id) => {
    const selectedLogo = logos.find((logo) => logo._id === id);
    if (selectedLogo) {
      reset({
        usageType: selectedLogo.usageType,
        status: selectedLogo.status,
      });
      setPreview(`http://localhost:5000${selectedLogo.logoUrl}`);
      setEditId(id); // Set the ID to indicate edit mode
    }
  };


  return (
    <div >
      <h2 className="text-2xl font-bold mb-4">Upload Logo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-wrap gap-4 items-center">
  {/* File Upload */}
  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-1/4">
    <label className="bg-gray-800 text-white font-semibold px-4 py-2 cursor-pointer relative">
      Choose File
      <input
        type="file"
        accept="image/*"
        {...register("logo", { required: "Logo is required" })}
        className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleImagePreview}
      />
    </label>
    <span className="px-4 py-2 text-gray-500 bg-gray-100 flex-1 truncate">
      {fileName}
    </span>
  </div>
  {preview && <img src={preview} alt="Preview" className="h-16 w-16 object-cover mt-2" />}
  {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}

  {/* Usage Type */}
  <div className="w-1/4">
    <select {...register("usageType", { required: "Usage Type is required" })} className="border border-gray-300 p-2 w-full">
      <option value="">Select Usage Type</option>
      <option value="website-admin">Website-admin</option>
      <option value="website">Website</option>
      <option value="mobile">Mobile</option>
      <option value="invoice">Invoice</option>
      <option value="email">Email</option>
      <option value="other">Other</option>
    </select>
    {errors.usageType && <p className="text-red-500">{errors.usageType.message}</p>}
  </div>

  {/* Status */}
  <div className="w-1/4">
    <select {...register("status")} className="border border-gray-300 p-2 w-full">
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>

  {/* Submit Button */}
  <div className="w-1/4">
    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded w-full">
      {editId ? "Update" : "Upload"}
    </button>
  </div>
</form>


      <h2 className="text-2xl font-bold mb-4">Logo List</h2>
      {loading && <p>Loading logos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && logos.length === 0 && <p>No logos found.</p>}
      {!loading && logos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border  border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Logo</th>
                <th className="border border-gray-300 p-2">Usage Type</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logos.map((logo) => (
                <tr key={logo._id} className="text-center">
                  <td className="border border-gray-300 p-2">
                    <img src={`http://localhost:5000${logo.logoUrl}`} alt="Logo" className="h-12 w-12 mx-auto object-cover" />
                  </td>
                  <td className="border border-gray-300 p-2">{logo.usageType}</td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={() => handleToggleStatus(logo._id, logo.status)}>
                      {logo.status === "active" ? <FaToggleOn className="text-green-500 text-2xl" /> : <FaToggleOff className="text-red-500 text-2xl" />}
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={(e) =>{e.preventDefault(); handleUpdate(logo._id)}} className="bg-green-600 text-white m-1 px-3 py-1 rounded">Update</button>
                    <button onClick={(e) => {e.preventDefault();handleDelete(logo._id)}} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogoUpload;
