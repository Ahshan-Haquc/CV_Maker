const mongoose = require('mongoose')
const UserModel = require('../models/userSchema')

const adminSignup = async (req,res)=>{
    console.log("Admin signup request received");
    try {
        console.log("working 1")
        const {email, password} = req.body;
        const role="admin";
        console.log(email, password, role)
        console.log("working 2")
    if(!email || !password || !role){
        console.log("working 3")
        res.status(400);
        throw new Error();
    }
    const user = await UserModel.findOne({email});
    if(user){
        res.status(400).json({success:false, message:"Try with another email account."});
    }else{
        console.log("working 4")
        const Admin = new UserModel({
            email, password, role
        })
        const data= await Admin.save();
        console.log(data);
        console.log("working 5")
        res.status(201).json({success:true, message:"Admin created succesfully"});
    }
    } catch (error) {
        res.status(500).json({message:"server error",error})
    }
}

module.exports = {
    adminSignup
}