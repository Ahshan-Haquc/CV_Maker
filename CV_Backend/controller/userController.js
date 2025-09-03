const UserModel = require('../models/userSchema')
const CVmodel = require('../models/userCVSchema')
const fetchUserDashboardData = async (req, res)=>{
    try {
        const userCVs = await CVmodel.find({userId: req.userInfo._id});

        res.status(200).json({
            success: true,
            userCVs: userCVs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const createNewCv = async (req, res) => {
    try {
        const userNewCV = new CVmodel({
            userId: req.userInfo._id
        })
        await userNewCV.save();
        res.status(201).json({success: true, message:"Your CV file created. Now you can add info."});
    } catch (error) {
        res.status(500);
        throw new Error();
    }
}

const deleteUserCv = (req, res) => {
    try {

    } catch (error) {

    }
}

const addToFavorite = (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = {fetchUserDashboardData, createNewCv, deleteUserCv, addToFavorite};