import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`w-64 h-screen bg-blue-900 text-white p-4 transition-all ${
        isOpen ? "block" : "hidden"
      } sm:block`}
    >
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <nav className="mt-4">
        <Link
          to="/admin/dashboard"
          className="block py-2 px-4 hover:bg-blue-700"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/add-product"
          className="block py-2 px-4 hover:bg-blue-700"
        >
          Add-Product
        </Link>
        <Link
          to="/admin/product-details"
          className="block py-2 px-4 hover:bg-blue-700"
        >
          product-Table
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
