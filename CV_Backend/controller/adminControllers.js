const UserModel = require('../models/userSchema')
const UserCVModel = require('../models/userCVSchema')
const fetchAdminDashboard = async (req, res)=>{
    try {
        // Fetch data for the admin dashboard
        const dashboardData = {
            usersCount: await UserModel.countDocuments(),
            totalCVs: await UserCVModel.countDocuments()
        };
        //now i want to fetch users who are registered within recent 30 days
        const recentUsers = await UserModel.find({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });
        res.status(200).json({ ...dashboardData, recentUsers, success:true });
    } catch (error) {
        console.error("Error fetching admin dashboard:", error);
        res.status(500);
        throw new Error("Internal server error");
    }
}

module.exports = { fetchAdminDashboard };