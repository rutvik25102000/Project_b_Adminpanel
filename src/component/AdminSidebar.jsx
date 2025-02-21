import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`w-64 h-screen text-center text-lg font-semibold  bg-gray-200 text-black p-4 transition-all ${
        isOpen ? "block" : "hidden"
      } sm:block`}
    >
      <nav className="mt-4">
        <Link
          to="/admin/dashboard"
          className="block py-2 px-4 m-2   border-solid rounded-sm bg-gray-300 hover:bg-gray-500  hover:text-white"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/add-product"
          className="block py-2 px-4 m-2 border-solid rounded-sm bg-gray-300  hover:bg-gray-500 hover:text-white"
        >
          Add-Product
        </Link>
        <Link
          to="/admin/product-details"
          className="block py-2 px-4 m-2 border-solid rounded-sm bg-gray-300  hover:bg-gray-500 hover:text-white"
        >
          product-Table
        </Link><Link
          to="/admin/categories-page"
          className="block py-2 px-4 m-2 border-solid rounded-sm bg-gray-300  hover:bg-gray-500 hover:text-white"
        >
          categories-page
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
