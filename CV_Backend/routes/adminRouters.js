const express = require('express')
const adminRouter = express.Router();
const {fetchAdminDashboard, fetchManageUsersData, deleteUser, blockUser, unblockUser } = require('../controller/adminControllers')


adminRouter.get('/dashboard',fetchAdminDashboard);
adminRouter.get('/manageUsers',fetchManageUsersData);
adminRouter.delete('/deleteUser/:id',deleteUser);
adminRouter.patch('/blockUser/:id',blockUser);
adminRouter.patch('/unblockUser/:id',unblockUser);

module.exports = adminRouter;