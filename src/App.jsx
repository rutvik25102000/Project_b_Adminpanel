import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/AdminpannelLayout"; // Ensure correct import path
import Login from "./pages/LoginPage"; // Ensure correct import path
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer autoClose={2000} position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
