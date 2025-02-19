import { useEffect, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import ProductCard from "../component/productCard"; // Import the ProductCard component
import ProductDeatails from "../component/ProductTable"; 
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  return (
    <div>
      <h1 className="text-xl font-bold text-center my-4">Dashboard</h1>
      <Routes>
        <Route path="add-product" element={<ProductCard />} />
        <Route path="/" element={<ProductCard />} />
        <Route path="/product-details" element={<ProductDeatails />} />

      </Routes>
    </div>
  );
};

export default Dashboard;
