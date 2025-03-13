import { Link, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { getAllLogos } from "../APIs/logoApi";
import { useEffect, useState } from "react";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null); // Store logo data

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const logos = await getAllLogos();
        if (logos.length > 0) {
          // Assuming you want to use the first active logo
          const activeLogo = logos.find((logo) => logo.status === "active") || logos[0];
          setLogo(activeLogo);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className=" p-4 flex justify-between text-black"
      style={{ backgroundColor: '#F0EBE3' }}
    >
      <Link to="/admin/dashboard">
        {logo && (logo.usageType === "website-admin" || logo.status === "active") ? (
          <img
            src={`http://localhost:5000${logo.logoUrl}`}
            alt="Logo"
            className="h-10 w-auto"
          />
        ) : (
          <h1 className="text-xl font-bold">Admin Panel</h1>
        )}

      </Link>
      <button className="sm:hidden" onClick={toggleSidebar}>☰</button>
      <div>
        <button onClick={handleLogout} className=" px-3 py-1 rounded"><TbLogout className="h-6 w-6 " />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
