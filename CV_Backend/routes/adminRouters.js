const express = require('express')
const adminRouter = express.Router();
const {fetchAdminDashboard} = require('../controller/adminControllers')


adminRouter.get('/dashboard',fetchAdminDashboard);

module.exports = adminRouter;