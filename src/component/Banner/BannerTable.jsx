    import { useEffect, useState } from "react";
    import { getBanners, deleteBanner ,updateBannerStatus} from "../../APIs/bannerApi";
    import { useNavigate } from "react-router-dom";

    const BannerTable = () => {
        const [banners, setBanners] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            fetchBanners();
        }, []);

        const fetchBanners = async () => {
            const data = await getBanners();
            setBanners(data);
        };

        const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this banner?")) {
                await deleteBanner(id);
                fetchBanners();
            }
        };
        const handleStatusToggle = async (id, currentStatus) => {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            await updateBannerStatus(id, newStatus);
            fetchBanners();
        };


        return (
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Banner Dashboard</h2>
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
                                <th className="border px-2 py-2">Image</th>
                                <th className="border px-2 py-2">Title</th>
                                <th className="border px-2 py-2">Description</th>
                                <th className="border px-2 py-2">Status</th>
                                <th className="border px-2 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.length > 0 ? (
                                banners.map((banner) => (
                                    <tr key={banner._id} className="text-center">
                                        <td className="border px-2 py-2">
                                            <img
                                                src={`http://localhost:5000${banner.imageUrl}`}
                                                alt={banner.title}
                                                className="h-16 w-28 object-cover rounded"
                                            />
                                        </td>
                                        <td className="border px-2 py-2">{banner.title}</td>
                                        <td className="border px-2 py-2">{banner.description}</td>
                                        <td className="border px-2 py-2">
                                            <button
                                                onClick={() => handleStatusToggle(banner._id, banner.status)}
                                                className={`px-2 py-1 rounded text-white ${
                                                    banner.status === "active" ? "bg-green-500" : "bg-gray-500"
                                                }`}
                                            >
                                                {banner.status === "active" ? "Active" : "Inactive"}
                                            </button>
                                        </td>
                                        <td className="border px-2 py-2">
                                            <button
                                                onClick={() => navigate(`/admin/edit-banner/${banner._id}`)}
                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(banner._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
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

