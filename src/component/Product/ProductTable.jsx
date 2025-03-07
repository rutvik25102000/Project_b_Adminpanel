import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllFoodItems, deleteProduct } from "../../APIs/AllApis"; // Import API function
import { RiFileEditLine } from "react-icons/ri";
import { FaDeleteLeft } from "react-icons/fa6";
import { AiFillFileAdd } from "react-icons/ai";


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

    return (<>
      <div className="p-6 shadow-lg">
            <button
                onClick={() => navigate("/admin/add-product")} // Navigate to Add Product page
                className="px-3 py-1 m-1 bg-blue-300 rounded"
            > Add Product
                {/* <AiFillFileAdd className="text-blue-500 h-8 w-8" /> */}
            </button>
        </div>
        <div className="p-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <div className="overflow-x-auto">
                
                <table className="min-w-full bg-white shadow-md  overflow-hidden  border rounded-sm border-black">
                    <thead className="bg-cyan-500 text-white  ">
                        <tr >
                            <th className="py-2 px-4 text-left ">No.</th>
                            <th className="py-2 px-4 text-left ">Name</th>
                            <th className="py-2 px-4 text-left ">Description</th>
                            <th className="py-2 px-4 text-left ">Price</th>
                            <th className="py-2 px-4 text-left ">Image</th>
                            <th className="py-2 px-4 text-left ">Available</th>
                            <th className="py-2 px-4 text-left ">Edit    </th>
                            <th className="py-2 px-4 text-left ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {Array.isArray(products) && products.map((product, index) => ( */}
                        {products.map((product, index) => (
                            <tr key={product._id} className="border-b">
                                <td className="py-2 px-4 ">{index + 1}</td>
                                <td className="py-2 px-4 ">{product.name}</td>
                                <td className="py-2 px-4  truncate max-w-xs">{product.description}</td>
                                <td className="py-2 px-4 ">₹{product.price}</td>
                                <td className="py-2 px-4 ">
                                    <img
                                        src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : "image.jpg"}
                                        onError={(e) => (e.target.src = "/default-image.jpg")}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover"
                                    />

                                </td>
                                <td className="py-2 px-4 border-b">
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${product.availability ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {product.availability ? "true" : "false"}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="  px-3 py-1 m-1   rounded "
                                        onClick={() => handleEdit(product._id)}
                                    >
                                        <RiFileEditLine className="h-6 w-6 text-blue-500" />
                                    </button>
                                  
                                </td>
                                <td className="py-2 px-4 border-b">
                                   
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
    </>
    );
};

export default ProductTable;
