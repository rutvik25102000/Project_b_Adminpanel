// import { useEffect, useState } from "react";
// import { getBanners, deleteBanner } from "../../APIs/bannerApi";
// import { Link } from "react-router-dom";

// const BannerList = () => {
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     fetchBanners();
//   }, []);
//   const fetchBanner = async () => {
//     try {
//       const data = await getBannerById(id);
//       setFormData({
//         title: data.title || "",
//         description: data.description || "",
//         status: data.status || "active",
//         displayOrder: data.displayOrder || 0,
//         startDate: data.startDate ? data.startDate.slice(0, 10) : "",
//         endDate: data.endDate ? data.endDate.slice(0, 10) : "",
//         createdBy: data.createdBy || "Admin",
//       });
//     } catch (error) {
//       console.error("Error fetching banner:", error);
//     }
//   };
  

//   const handleDelete = async (id) => {
//     await deleteBanner(id);
//     fetchBanners();
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-xl font-bold mb-4">Banner List</h2>
//       <Link to="/add-banner" className="bg-blue-500 text-white px-4 py-2 rounded">
//         + Add Banner
//       </Link>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         {banners.map((banner) => (
//           <div key={banner._id} className="border p-4 rounded-lg shadow">
//             <img src={`http://localhost:5000${banner.imageUrl}`} alt={banner.title} className="w-full h-40 object-cover rounded"/>
//             <h3 className="text-lg font-semibold mt-2">{banner.title}</h3>
//             <p>{banner.description}</p>
//             <button className="bg-red-500 text-white px-3 py-1 mt-2 rounded" onClick={() => handleDelete(banner._id)}>
//               Delete
//             </button>
//             <Link to={`/edit-banner/${banner._id}`} className="bg-green-500 text-white px-3 py-1 ml-2 rounded">
//               Edit
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BannerList;
