import React from "react";

import AdminSideBar from "../components/layout/AdminSideBar";
import { useEffect } from "react";
import { use } from "react";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({});
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axiosInstance.get("/admin/dashboard");
                if (response.data.success) {
                    console.log("Dashboard data:", response.data);
                    setDashboardData(response.data)
                } else {
                    alert("failed to fetch data");
                }
            } catch (error) {
                console.log("Error in fetching dashboard data:", error);
                alert("Error fetching dashboard");
            }
        };

        fetchDashboard();
    }, []);
    return (
        <main className="flex-1 p-6 overflow-y-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Admin Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">Total Users</h2>
                    <p className="text-3xl font-bold">{dashboardData.usersCount}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">CVs Generated</h2>
                    <p className="text-3xl font-bold">{dashboardData.totalCVs}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-gray-500">Templates</h2>
                    <p className="text-3xl font-bold">03</p>
                </div>
            </div>

            {/* Recent Users Table - means who registered within last 30 days*/}
            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 ">Recent Users <span>(30 days)</span></h2>
                <table className="w-full text-left border-collapse border border-gray-100">
                    <thead>
                        <tr className="bg-gray-100 ">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardData.recentUsers?.map((user, index) => {
                            return (
                                user.role === "user" && (
                                    <tr className="border-t border-gray-100" key={index}>
                                        <td className="p-2">John Doe</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2 text-green-600">{user.status}</td>
                                        <td className="p-2">
                                            <button className="text-blue-500 hover:underline">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                )
                            );
                        })}



                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default AdminDashboard;
