import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllFoodItems, deleteProduct } from "../../APIs/AllApis"; // Import API function
import { RiFileEditLine } from "react-icons/ri";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";


const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.updated) {
            getAllFoodItems().then(setProducts);
        }
    }, [location]);


    useEffect(() => {
        getAllFoodItems()

            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("Unexpected API response:", data);
                    setProducts([]); // Fallback to an empty array
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setProducts([]); // Ensure state is always an array
            });
    }, []);

    const handleEdit = (productId) => {
        navigate(`/admin/product-update/${productId}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;



        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((product) => product._id !== id)); // ✅ Remove product from state
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
    <div className="h-100vh"> 
        <div className="p-6 ">
            <div className="p-6 flex justify-between ">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <button
                onClick={() => navigate("/admin/add-product")} // Navigate to Add Product page
                className="flex items-center text-white gap-2 px-3 py-1 m-1 bg-blue-500 rounded"
            ><IoIosAddCircle className="text-lg"/>Add Product 
                {/* <AiFillFileAdd className="text-blue-500 h-8 w-8" /> */}
            </button>
        </div>
            <div className="overflow-x-auto">
                
                <table className="w-full  overflow-hidden  border ">
                    <thead className="bg-cyan-500 text-white  ">
                        <tr >
                            <th className="py-2 px-4 border border-gray-300 text-left ">No.</th>
                            <th className="py-2 px-4 border border-gray-300 text-left ">Name</th>
                            <th className="py-2 px-4 border border-gray-300 text-left ">Description</th>
                            <th className="py-2 px-4 border border-gray-300 text-left ">Price</th>
                            <th className="py-2 px-4 border border-gray-300 text-left ">Image</th>
                            <th className="py-2 px-4 border border-gray-300 text-left ">Available</th>
                            <th className="py-2 px-4 border border-gray-300 text-left ">Edit    </th>
                            <th className="py-2 px-4 border border-gray-300 text-left ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {Array.isArray(products) && products.map((product, index) => ( */}
                        {products.map((product, index) => (
                            <tr key={product._id} className="border border-gray-300">
                                <td className="py-2 px-4 border border-gray-300 ">{index + 1}</td>
                                <td className="py-2 px-4 border border-gray-300 ">{product.name}</td>
                                <td className="py-2 px-4 border border-gray-300  truncate max-w-xs">{product.description}</td>
                                <td className="py-2 px-4 border border-gray-300 ">₹{product.price}</td>
                                <td className="py-2 px-4 border border-gray-300 ">
                                    <img
                                        src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : "image.jpg"}
                                        onError={(e) => (e.target.src = "/default-image.jpg")}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover"
                                    />

                                </td>
                                <td className="py-2 px-4 border border-gray-300 border-b border-gray-300">
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${product.availability ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {product.availability ? "true" : "false"}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border border-gray-300 border-b border-gray-300">
                                    <button
                                        className="  px-3 py-1 m-1   rounded "
                                        onClick={() => handleEdit(product._id)}
                                    >
                                        <RiFileEditLine className="h-6 w-6 text-blue-500" />
                                    </button>
                                  
                                </td>
                                <td className="py-2 px-4 border border-gray-300 border-b border-gray-300">
                                   
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className=" px-3 py-1 m-1 rounded"
                                    >
                                        
                                        <FaDeleteLeft className="h-6 w-6 text-red-500" />

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default ProductTable;
