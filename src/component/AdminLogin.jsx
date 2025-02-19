// AdminLogin Component
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        setError("Access Denied: Admins Only");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Password</label>
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
      >
        Login
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default AdminLogin;
