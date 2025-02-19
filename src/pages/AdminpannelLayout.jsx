import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../component/AdminSidebar";
import Navbar from "../component/navbar";
import Dashboard from "./Dashboard";

function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
    return (
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Sticky Navbar */}
        <div className="fixed top-0 w-full z-50 bg-white shadow-md">
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
  
        {/* Main Layout (Sidebar + Content) */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar (Full Height) */}
        <div
          className={`fixed top-16 left-0  bg-white shadow-md transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-16"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        {/* Main Content Area */}
        <div
          className={`flex-1 overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          } p-6`}
        >
          <main className="bg-white h-full shadow-md rounded-lg ">
            <Routes>
              <Route path="/*" element={<Dashboard />} />
              {/* Add more admin routes here */}
            </Routes>
          </main>
        </div>
      </div>
      </div>
    );
  }
  
  export default AdminLayout;