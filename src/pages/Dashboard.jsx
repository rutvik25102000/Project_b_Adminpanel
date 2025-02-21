import { useEffect, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import ProductCard from "../component/productCard"; 
import ProductDetails from "../component/ProductTable"; 
import CategoriesPage from "../pages/CategoriesPage";


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
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4">
        <Routes>
          <Route path="add-product" element={<ProductCard />} />
          <Route path="/" element={<ProductCard />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/categories-page" element={<CategoriesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
