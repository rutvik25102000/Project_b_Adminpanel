import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/authgmail/all"); // Adjust the API route as needed
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-cyan-500">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-cyan-500 text-white">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Verified</th>
              <th className="py-2 px-4 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center border-t">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{user.name || "N/A"}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">
                  {user.isVerified ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
                <td className="py-2 px-4 border">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
