import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2, Ban, Users } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import { deleteUser, blockUser, unblockUser } from "../api/adminActions";

const ManageUsers = () => {
    const [search, setSearch] = useState("");
    const [fetchedCountData, setFetchedCountData] = useState({
        totalUsers: 0,
        totalActiveUsers: 0,
        totalInactiveUsers: 0,
        totalBlockedUsers: 0,
    });
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        const fetchDataFromDB = async () => {
            try {
                const response = await axiosInstance.get("/admin/manageUsers");
                if (response.data.success) {
                    setFetchedCountData({
                        totalUsers: response.data.totalUsers,
                        totalActiveUsers: response.data.totalActiveUsers,
                        totalInactiveUsers: response.data.totalInactiveUsers,
                        totalBlockedUsers: response.data.totalBlockedUsers,
                    });
                    setFetchedData(response.data.userData);
                }
            } catch (error) {
                console.log("error in frontend : ", error);
            }
        };
        fetchDataFromDB();
    }, []);

    // Filter users by search text
    const filteredUsers = fetchedData.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.role.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-screen w-screen bg-gray-50">
            <div className="flex-1 p-6 overflow-y-auto">
                {/* Header */}
                <h2 className="text-3xl font-bold text-[#4F1C51] mb-8 flex items-center gap-2">
                    <Users className="text-[#4F1C51]" /> Manage Users
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Total Users", value: fetchedCountData.totalUsers, color: "from-indigo-500 to-purple-500" },
                        { label: "Active Users", value: fetchedCountData.totalActiveUsers, color: "from-green-500 to-emerald-500" },
                        { label: "Inactive Users", value: fetchedCountData.totalInactiveUsers, color: "from-yellow-500 to-orange-500" },
                        { label: "Blocked Users", value: fetchedCountData.totalBlockedUsers, color: "from-red-500 to-pink-500" },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className={`bg-gradient-to-r ${stat.color} rounded-2xl shadow p-6 text-white`}
                        >
                            <h2 className="opacity-80 text-sm">{stat.label}</h2>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="w-full flex items-center bg-white rounded-2xl shadow p-3 mb-6  border border-gray-200 focus-within:ring-2 focus-within:ring-purple-400">
                    <Search className="text-gray-500 mr-3" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email, status or role..."
                        className="w-full outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto bg-white rounded-2xl shadow">
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-[#4F1C51] text-white text-left">
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                                >
                                    <td className="p-4 font-medium">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full ${user.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : user.status === "inactive"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-center gap-3">
                                        <button
                                            className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg"
                                            title="Edit User"
                                        >
                                            <Edit className="text-blue-600" size={18} />
                                        </button>
                                        <button
                                            className="p-2 bg-red-50 hover:bg-red-100 rounded-lg"
                                            title="Delete User"
                                            onClick={() => (deleteUser(user.id))}
                                        >
                                            <Trash2 className="text-red-600" size={18} />
                                        </button>
                                        <button
                                            className="p-2 bg-yellow-50 hover:bg-yellow-100 rounded-lg"
                                            title="Block User"
                                            onClick={() => { user.status === "active" ? blockUser(user.id) : unblockUser(user.id) }}
                                        >
                                            <Ban className="text-yellow-600" size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <Users size={40} className="mb-2 text-gray-300" />
                                            <p>No users found</p>
                                        </div>
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
