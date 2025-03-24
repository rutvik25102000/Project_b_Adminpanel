import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    setError("");
    try {
      await axios.post("http://localhost:5000/api/authgmail/send-otp", { email });
      setOtpSent(true); // Enable OTP input field after sending OTP
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send OTP. Try again.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/authgmail/verify-otp", {
        email,
        otp,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.isVerified) {
        navigate("/admin");
      } else {
        setError("Account not verified. Please verify your email.");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "OTP verification failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleVerifyOtp} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Enter name</label>
        <input
          type="name"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div> */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {!otpSent ? (
        <button
          type="button"
          onClick={handleSendOtp}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg"
        >
          Send OTP
        </button>
      ) : (
        <>
          <div className="mb-4 mt-4">
            <label className="block text-sm font-medium text-gray-600">OTP</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
          >
            Verify & Login
          </button>
        </>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default UserLogin;
