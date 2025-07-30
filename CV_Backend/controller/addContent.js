const UserCV = require('../models/userCVSchema')

const addNewSection=async (req,res,next)=>{
    try {
        console.log("working now")
        const userCV = await UserCV.findOne({userId : req.userInfo._id})
        if(!userCV) return res.status(400).json({message:"New section not added!"})
        
        userCV.otherSection.push({sectionName: req.body.sectionName});
        const updatedCV = await userCV.save();

        res.status(200).json({updatedCV, message:"New section added!"})
    } catch (error) {
        console.log("catch is catching error : ",error);
        next(error);
    }
}

module.exports ={addNewSection};