import { Link } from "react-router-dom";
import {  MdCategory } from "react-icons/md";
import { FaUsers,FaTachometerAlt ,FaBoxOpen,FaRegImage  } from "react-icons/fa";
import { MdOutlineWallpaper } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`w-64 h-screen text-center text-lg font-semibold   text-black p-4 transition-all ${isOpen ? "block" : "hidden"
        } sm:block`}
        style={{ backgroundColor: '#F6F5F2' }}
    >
      <nav className="mt-4">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 py-2 px-4 m-2 hover:bg-gray-500 hover:text-white"
        ><FaTachometerAlt  className="text-lg"/>
          Dashboard
        </Link>

        <Link
          to="/admin/product-details"
          className="flex items-center gap-2 py-2 px-4 m-2 hover:bg-gray-500 hover:text-white"
        ><FaBoxOpen className="text-lg"/>

          product-Table
        </Link>
        <Link
          to="/admin/categories-page"
          className="flex items-center gap-2 py-2 px-4 m-2 hover:bg-gray-500 hover:text-white"
        >
          <MdCategory className="text-lg"/>
          categories-page
        </Link>
        <Link
          to="/admin/banner-dashboard"
          className="flex items-center gap-2 py-2 px-4 m-2 hover:bg-gray-500 hover:text-white"
        >
          <MdOutlineWallpaper className="text-lg" />
          <span>Banners</span>
        </Link>
        <Link
          to="/admin/logo-dashboard"
          className="flex items-center gap-2 py-2 px-4 m-2 hover:bg-gray-500 hover:text-white"
        >
          <FaRegImage  className="text-lg" />
          <span>Logo</span>
        </Link>
        <Link
          to="/admin/users-dashboard"
          className="flex items-center gap-2 py-2 px-4 m-2 hover:bg-gray-500 hover:text-white"
        >
          <FaUsers className="text-lg" />
          <span>UserDetails</span>
        </Link>
        <Link
          to="/admin/users-dashboard"
          className="flex items-center gap-2 py-2 px-4 m-2 hover:bg-gray-500 hover:text-white"
        >
          <TbListDetails className="text-lg" />
          <span>Orders Details</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
