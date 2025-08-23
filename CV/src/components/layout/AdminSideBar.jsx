import React from 'react';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
} from "lucide-react";

const AdminSideBar = () => {
    return (
        <aside className="w-64 bg-[#4F1C51] text-white flex flex-col">
            <div className="p-6 text-2xl font-bold ">
                Admin Panel
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <a
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-purple-700"
                >
                    <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
                </a>
                <a
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-purple-700"
                >
                    <Users className="mr-2 h-5 w-5" /> Manage Users
                </a>
                <a
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-purple-700"
                >
                    <FileText className="mr-2 h-5 w-5" /> CV Templates
                </a>
                <a
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-purple-700"
                >
                    <Settings className="mr-2 h-5 w-5" /> Settings
                </a>
            </nav>
            <div className="p-4">
                <button className="flex items-center w-full p-2 rounded-lg hover:bg-purple-700">
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSideBar;