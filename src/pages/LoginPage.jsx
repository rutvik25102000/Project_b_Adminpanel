import { useState } from "react";
import AdminLogin from "../component/AdminLogin";
import AdminRegistration from "../component/AdminRegistration";

const AdminAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration forms

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          {isLogin ? "Admin Login" : "Admin Registration"}
        </h2>

        {/* Display the appropriate form based on the isLogin state */}
        {isLogin ? <AdminLogin /> : <AdminRegistration />}

        <div className="text-center mt-4">
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Register here"
              : "Already have an account? Login here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthPage;
