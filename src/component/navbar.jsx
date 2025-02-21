import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-gray-300 p-4 flex justify-between text-black">
      <h1 className="text-xl font-bold">navbar</h1>
      <button className="sm:hidden" onClick={toggleSidebar}>☰</button>
      <div>
      <Link to="/admin/dashboard" className="mr-4">Dashboard</Link>
      <button onClick={handleLogout} className="bg-blue-600 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
