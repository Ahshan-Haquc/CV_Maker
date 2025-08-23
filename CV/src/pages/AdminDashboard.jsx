import React from "react";

import AdminSideBar from "../components/layout/AdminSideBar";

const AdminDashboard = () => {
    return (
        <div className="flex h-screen w-screen bg-gray-100">
            <AdminSideBar />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Admin Dashboard
                </h1>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-gray-500">Total Users</h2>
                        <p className="text-3xl font-bold">1,250</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-gray-500">CVs Generated</h2>
                        <p className="text-3xl font-bold">3,450</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-gray-500">Templates</h2>
                        <p className="text-3xl font-bold">12</p>
                    </div>
                </div>

                {/* Recent Users Table - means who registered within last 30 days*/}
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Users</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2">Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="p-2">John Doe</td>
                                <td className="p-2">john@example.com</td>
                                <td className="p-2 text-green-600">Active</td>
                                <td className="p-2">
                                    <button className="text-blue-500 hover:underline">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-2">Jane Smith</td>
                                <td className="p-2">jane@example.com</td>
                                <td className="p-2 text-red-600">Inactive</td>
                                <td className="p-2">
                                    <button className="text-blue-500 hover:underline">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
