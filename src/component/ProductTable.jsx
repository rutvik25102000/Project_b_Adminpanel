import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllFoodItems } from "../APIs/AllApis"; // Import API function


const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllFoodItems()
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleEdit = (productId) => {
        console.log("Edit product:", productId);
        // Navigate to edit form or open a modal
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-cyan-500 text-white">
                        <tr>
                            <th className="py-2 px-4 text-left">No.</th>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Description</th>
                            <th className="py-2 px-4 text-left">Price</th>
                            <th className="py-2 px-4 text-left">Image</th>
                            <th className="py-2 px-4 text-left">Available</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className="border-b">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{product.name}</td>
                                <td className="py-2 px-4 truncate max-w-xs">{product.description}</td>
                                <td className="py-2 px-4">₹{product.price}</td>
                                <td className="py-2 px-4">
                                    <img
                                        src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : "image.jpg"}
                                        onError={(e) => (e.target.src = "/default-image.jpg")}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover"
                                    />

                                </td>
                                <td className="py-2 px-4">
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${product.availability ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {product.availability ? "true" : "false"}
                                    </span>
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() => handleEdit(product._id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
