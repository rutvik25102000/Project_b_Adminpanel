import { useState } from "react";
import axios from "axios";

const AdminRegistration = () => {
  const [name, setName] = useState(""); // Name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role set to admin
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send the registration request with the selected role
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role, // Send the selected role
      });

      setSuccess("Account created successfully! You can now log in.");
    } catch (err) {
      // Handling validation and server errors
      const errorMsg = err.response?.data?.msg || 
                       err.response?.data?.errors?.map(e => e.msg).join(', ') || 
                       "Registration failed. Try again.";
      setError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {/* Name field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Full Name</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Admin Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Email field */}
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

      {/* Password field */}
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

      {/* Confirm Password field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {/* Role Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Role</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin" className="bg-gray-500 text-gray-800">Admin</option>
          <option value="user" className="bg-gray-500 text-gray-800">User</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
      >
        Register
      </button>

      {/* Error and success messages */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </form>
  );
};

export default AdminRegistration;
