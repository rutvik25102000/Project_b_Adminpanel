import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuFileInput } from "react-icons/lu";
import { uploadBanner, getBannerById, updateBanner } from "../../APIs/bannerApi";

const AddBanner = () => {
    const { id } = useParams();
    const [bannerData, setBannerData] = useState({
        title: "",
        description: "",
        status: "active",
        displayOrder: 1,
        startDate: "",
        endDate: "",
        image: null,
        imageUrl: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (id) {
            fetchBannerDetails();
        }
    }, [id]);

    const fetchBannerDetails = async () => {
        try {
            const data = await getBannerById(id); // Fetch banner data
            const formatDate = (isoDate) => isoDate ? isoDate.split("T")[0] : "";

            setBannerData({
                title: data.title,
                description: data.description,
                image: null, // Keep image null to prevent overriding file input
                status: data.status,
                displayOrder: data.displayOrder,
                startDate: formatDate(data.startDate),
                endDate: formatDate(data.endDate),
            });
        } catch (error) {
            console.error("Error fetching banner:", error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerData({ ...bannerData, [name]: value });
    };

    const handleFileChange = (e) => {
        setBannerData({ ...bannerData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", bannerData.title);
        formData.append("description", bannerData.description);
        formData.append("status", bannerData.status);
        formData.append("displayOrder", bannerData.displayOrder);
        formData.append("startDate", bannerData.startDate);
        formData.append("endDate", bannerData.endDate);
        if (bannerData.image) formData.append("image", bannerData.image);

        try {
            if (id) {
                await updateBanner(id, formData);
                alert("Banner updated successfully!");
            } else {
                await uploadBanner(formData);
                alert("Banner added successfully!");
            }
            navigate("/admin/banner-dashboard");
        } catch (error) {
            console.error("Error submitting banner:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                {id ? "Update Banner" : "Add Banner"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">Title</label>
                        <input type="text" name="title" value={bannerData.title} onChange={handleChange} required className="w-full p-3 border rounded" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Description</label>
                        <textarea name="description" value={bannerData.description} onChange={handleChange} className="w-full p-3 border rounded"></textarea>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Status</label>
                        <select name="status" value={bannerData.status} onChange={handleChange} className="w-full p-3 border rounded">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Display Order</label>
                        <input type="number" name="displayOrder" value={bannerData.displayOrder} onChange={handleChange} className="w-full p-3 border rounded" />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">Start Date</label>
                        <input type="date" name="startDate" value={bannerData.startDate} onChange={handleChange} className="w-full p-3 border rounded" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">End Date</label>
                        <input type="date" name="endDate" value={bannerData.endDate} onChange={handleChange} className="w-full p-3 border rounded" />
                    </div>
                    <div>
                        {id && bannerData.imageUrl && (
                            <img src={bannerData.imageUrl} alt="Current Banner" className="w-full h-32 object-cover rounded mt-2" />
                        )}
                        <label className="block font-medium text-gray-700">Image</label>
                        <div className="flex items-center gap-3 border rounded p-2">
                            <LuFileInput className="text-gray-600 text-xl" />
                            <input type="file" onChange={handleFileChange} accept="image/*" className="w-full p-2" />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded shadow-md hover:bg-blue-700">
                        {loading ? "Uploading..." : id ? "Update Banner" : "Upload Banner"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBanner;
