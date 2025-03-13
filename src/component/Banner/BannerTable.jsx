import { useEffect, useState } from "react";
import { getBanners, deleteBanner, toggleBannerStatus } from "../../APIs/bannerApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

const BannerTable = () => {
    const [banners, setBanners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const data = await getBanners();
            setBanners(data);
        } catch (error) {
            toast.error("Failed to load banners!", { position: "top-right" });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await deleteBanner(id);
                fetchBanners();
                toast.success("Banner deleted successfully!", { position: "top-right" });
            } catch (error) {
                toast.error("Failed to delete banner!", { position: "top-right" });
            }
        }
    };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      await toggleBannerStatus(id, currentStatus === "active" ? "inactive" : "active");
      fetchBanners();
      toast.success("banner status updated!");
    } catch (error) {
      console.error("Toggle status error:", error);
      toast.error("Failed to update banner status!");
    }
  };
  

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Banner Dashboard</h2>
                <button
                    onClick={() => navigate("/admin/add-banner")}
                    className="bg-blue-500 text-white px-2 py-2 rounded"
                >
                    + Add Banner
                </button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 w-50 px-2 py-2">Image</th>
                            <th className="border border-gray-300 w-auto px-2 py-2">Title</th>
                            <th className="border border-gray-300 px-2 py-2">Description</th>
                            <th className="border border-gray-300 w-10 px-2 py-2">Status</th>
                            <th className="border border-gray-300 px-2 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.length > 0 ? (
                            banners.map((banner) => (
                                <tr key={banner._id} className="text-center align-item-center">
                                    <td className="border border-gray-300 px-2 py-2 flex justify-center items-center">
                                        <img
                                            src={`http://localhost:5000${banner.imageUrl}`}
                                            alt={banner.title}
                                            className="h-16 w-40 object-fit rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-300  px-2 py-2">{banner.title}</td>
                                    <td className="border border-gray-300 px-2 py-2">{banner.description}</td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        <button onClick={() => handleStatusToggle(banner._id, banner.status)}>
                                                             {banner.status === "active" ? <FaToggleOn className="text-green-500 text-2xl" /> : <FaToggleOff className="text-red-500 text-2xl" />}
                                                           </button>
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        <button
                                            onClick={() => navigate(`/admin/edit-banner/${banner._id}`)}
                                            className=" border-2 border-green-700 hover:bg-green-700 transition-all duration-300 text-black px-3 py-1 rounded mr-2"
                                            
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(banner._id)}
                                            className="border-2 border-orange-700 hover:bg-red-700 text-black  transition-all duration-300 px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                        
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No banners found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BannerTable;
