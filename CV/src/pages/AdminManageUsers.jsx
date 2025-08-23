import React, { useState } from "react";
import { Search, Edit, Trash2, Ban } from "lucide-react";
import AdminSideBar from "../components/layout/AdminSideBar";

const ManageUsers = () => {
    const [search, setSearch] = useState("");

    // Example users data
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Blocked" },
        { id: 3, name: "Mike Ross", email: "mike@example.com", role: "User", status: "Active" },
    ];

    // Filter users by search text
    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-screen w-screen bg-gray-100">
            <AdminSideBar />
            <div className="flex-1 p-6 overflow-y-auto">
                {/* Header */}
                <h2 className="text-2xl font-bold text-[#4F1C51] mb-6">Manage Users</h2>

                {/* Search Bar */}
                <div className="flex items-center bg-white rounded-lg shadow-md p-3 mb-6 w-full max-w-md">
                    <Search className="text-gray-500 mr-2" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#4F1C51] text-white text-left">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-100">
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.role}</td>
                                    <td
                                        className={`p-3 font-medium ${user.status === "Active" ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {user.status}
                                    </td>
                                    <td className="p-3 flex justify-center gap-3">
                                        <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg">
                                            <Edit className="text-blue-600" size={18} />
                                        </button>
                                        <button className="p-2 bg-red-100 hover:bg-red-200 rounded-lg">
                                            <Trash2 className="text-red-600" size={18} />
                                        </button>
                                        <button className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg">
                                            <Ban className="text-yellow-600" size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-gray-500">
                                        No users
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
