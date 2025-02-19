import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/AdminpannelLayout"; // Ensure correct import path
import Login from "./pages/LoginPage"; // Ensure correct import path

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  </Router>
  );
}

export default App;
