import { Link } from "react-router-dom";
import { MdDashboard, MdCategory } from "react-icons/md";
import { GrTasks } from "react-icons/gr";
import { FaCanadianMapleLeaf } from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`w-64 h-screen text-center text-lg font-semibold  bg-gray-200 text-black p-4 transition-all ${isOpen ? "block" : "hidden"
        } sm:block`}
    >
      <nav className="mt-4">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 py-2 px-4 m-2 hover:bg-gray-500 hover:text-white"
        ><MdDashboard className="text-lg"/>
          Dashboard
        </Link>

        <Link
          to="/admin/product-details"
          className="flex items-center gap-2 py-2 px-4 m-2 hover:bg-gray-500 hover:text-white"
        ><GrTasks className="text-lg"/>

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
          <FaCanadianMapleLeaf className="text-lg" />
          <span>Banners</span>
        </Link>

      </nav>
    </aside>
  );
};

export default Sidebar;
