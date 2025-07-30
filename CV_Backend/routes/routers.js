const express = require('express');
const cvRouter = express.Router();
const UserModel = require('../models/userSchema');
const CVmodel = require('../models/userCVSchema');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userAccessPermission = require("../middleware/authUserPermision");
const multer = require("multer");
const path = require("path");


const {addNewSection} = require('../controller/addContent')

cvRouter.get("/",(req,res,next)=>{
    try {
        console.log(" to home page.");
        res.status(200).json({message:"wel to ho me page."});
    } catch (error) {
        next(error);
    }
})

cvRouter.post("/userSignup",async(req,res,next)=>{
    console.log("working on singup router 1")
    try {
        console.log("working on singup router 1")
        const {email, password} = req.body;
        if(!email || !password){
           return res.status(401).json({message:"Please enter email or password."})
        }

        console.log(email, password);
        const encryptedPassword = await bcrypt.hash(password,10);
        console.log(encryptedPassword);
        const NewUser = new UserModel({
            email:email, password:encryptedPassword
        })
        const userInfo = await NewUser.save();

        //initially making an empty cv collection only using this user id
        const NewUserCV = new CVmodel({
            userId: userInfo._id
        });
        await NewUserCV.save();
        
        res.status(200).json({message:"Signup succesfull."});
    } catch (error) {
        next(error);
    }
})



cvRouter.post("/userLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT token (assumes generateToken includes role info)
    const token = await user.generateToken();

    // Set token in HTTP-only cookie
    res.cookie("userCookie", token, {
      httpOnly: true,
      secure: false, 
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });

    // Final response with role
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


cvRouter.get("/userLogout", userAccessPermission, async (req, res, next) => {
    console.log(req.userInfo.email);
  try {
    const user = await UserModel.findOne({ _id: req.userInfo._id });
    console.log(user);
    if (user) {
      user.tokens = [];
      await user.save();
    }

    res.clearCookie("userCookie", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout router");
    next(error);
  }
});


cvRouter.get("/me",userAccessPermission,  async (req, res) => {
    console.log("working on me router")
  res.status(200).json({ userInfo: req.userInfo });
});

//for fetch user cv
cvRouter.post("/viewCV",async(req,res,next)=>{
    try {
        const userCV = await CVmodel.findOne({userId:req.body.userId});
        if(!userCV){
            res.status(400).json({message:"User CV not found"});
        }
       res.status(200).json({userCV});
    } catch (error) {
        console.log("Error in server : ",error);
        next(error);
    }
})


// -------------user dashboard activities---------------
//update user profile info including image

// configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // upload directory (create if not exists)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

// route to update profile with image
cvRouter.post("/updateUserProfile", upload.single("photo"), async (req, res) => {
    console.log("working 1")
  try {
    console.log("working 2")
    const { userId, name, profession } = req.body;
    console.log(userId,name,profession);
    console.log("working 3")

    if (!userId || !name || !profession || !req.file) {
        console.log("working 4")
      return res.status(400).json({ message: "All fields required" });
    }

    const imagePath = req.file.filename; // only store file name
    console.log(imagePath)
    console.log("working 5")

    await CVmodel.updateOne(
      { userId: userId },
      {
        $set: {
          name,
          profession,
          images: imagePath,
        }
      },
      { upsert: true }
    );
console.log("working 6")
    res.status(200).json({ message: "Profile updated with image succesfully" });
  } catch (error) {
    console.log("working in error");
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


//update user description
cvRouter.post("/updateUserDescription",async(req,res,next)=>{
    
    try {
        const {userId, userDescription}= req.body;
        if(!userId || !userDescription){
            return res.status(400).json({message:"Input field not filled"});
        }
        await CVmodel.updateOne(
            {userId:userId},
            {
                $set:{
                    description:userDescription
                }
            }
        )
        res.status(200).json({message:"Your description updated succesfully."});
    } catch (error) {
        next(error);
    }
})
//update user contact
cvRouter.post("/updateUserContact", async (req, res, next) => {
    try {
        const {
            userId,
            phoneNumber,
            emailId,
            linkedInId,
            githubId,
            portfolioLink,
            address
        } = req.body;

        if (
            !userId ||
            !phoneNumber ||
            !emailId ||
            !linkedInId ||
            !githubId ||
            !portfolioLink ||
            !address
        ) {
            return res.status(401).json({ message: "Input field not filled" });
        }

        await CVmodel.updateOne(
            { userId: userId },
            {
                $set: {
                    phoneNumber,
                    emailId,
                    linkedInId,
                    githubId,
                    portfolioLink,
                    address
                }
            }
        );
        res.status(200).json({ message: "Your contact updated succesfully." });
    } catch (error) {
        next(error);
    }
});
//update user skills
cvRouter.post("/updateUserSkills", async (req, res) => {
  const { userId, skills } = req.body;

  try {
    const userCV = await CVmodel.findOne({ userId });

    if (!userCV) {
      return res.status(404).json({ message: "User CV not found" });
    }

    userCV.skills = skills;

    await userCV.save();

    return res.status(200).json({ message: "Skills updated", updatedCV: userCV });
  } catch (error) {
    console.error("Error updating skills:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


//update or delete user projects
cvRouter.post("/updateUserProjects",async(req,res,next)=>{
    try {
        const {userId, projectName, projectDescription, projectToolsAndTechnologies}= req.body;
        if(!userId || !projectName || !projectDescription || !projectToolsAndTechnologies){
            return res.status(401).json({message:"Input field not filled"});
        }
        const userCV = await CVmodel.findOne({userId});
        if(!userCV){
            return res.status(401).json({message:"User cv not found"});
        }
        userCV.projects.push({projectName,projectDescription,projectToolsAndTechnologies});
        await userCV.save();
        res.status(200).json({updatedCV:userCV,message:"Your project updated succesfully."});
    } catch (error) {
        next(error);
    }
})

//update user experience
cvRouter.post("/updateUserExperience",async(req,res,next)=>{
    try {
        const {userId, organizationName,organizationAddress, joiningDate,endingDate,position,jobDescription }= req.body;
        if(!userId || !organizationName || !organizationAddress || !joiningDate || !endingDate || !position || !jobDescription){

            return res.status(401).json({message:"Input field not filled"});
        }

        //finding this user cv
        const userCV = await CVmodel.findOne({userId}); 
        if(!userCV){
            return res.status(401).json({message:"User cv not found"});
        }

        userCV.experience.push({organizationName,organizationAddress, joiningDate,endingDate,position,jobDescription});
        await userCV.save();

        res.status(200).json({updatedCV:userCV,message:"Your experience added succesfully."});
    } catch (error) {
        next(error);
    }
})
//update user education
cvRouter.post("/updateUserEducation",async(req,res,next)=>{
    console.log("Working 1")
    try {
        const {userId, educationQualification, educationInstitutionName, startingDate, endingDate}= req.body;
        console.log(userId, educationQualification, educationInstitutionName, startingDate, endingDate)
        if(!userId || !educationQualification || !educationInstitutionName || !startingDate || !endingDate){
            console.log("Working 1")
            return res.status(401).json({message:"Input field not filled"});
        }
        const userCV = await CVmodel.findOne({userId});
        console.log("Working 1")
        if(!userCV){
            console.log("Working 1")
            return res.status(401).json({message:"User cv not found"});
        }
        userCV.education.push({educationQualification, educationInstitutionName, startingDate, endingDate});
        await userCV.save();
        res.status(200).json({updatedCV:userCV,message:"Your education added succesfully."});
    } catch (error) {
        next(error);
    }
})
//update user acheivement
cvRouter.post("/updateUserAcheivement",async(req,res,next)=>{
    try {
        const {userId, acheivement}= req.body;
        if(!userId || !acheivement){
            return res.status(401).json({message:"Input field not filled"});
        }
        const userCV = await CVmodel.findOne({userId});
        if(!userCV){
            return res.status(401).json({message:"User cv not found"});
        }
        userCV.acheivement.push(acheivement);
        await userCV.save();
        res.status(200).json({updatedCV:userCV,message:"Your acheivement added succesfully."});
    } catch (error) {
        next(error);
    }
})
//update user activities
cvRouter.post("/updateUserActivities",async(req,res,next)=>{
    try {
        const {userId, activities}= req.body;
        if(!userId || !activities){
            return res.status(401).json({message:"Input field not filled"});
        }
        const userCV = await CVmodel.findOne({userId});
        if(!userCV){
            return res.status(401).json({message:"User cv not found"});
        }
        userCV.activities.push(activities);
        await userCV.save();
        res.status(200).json({updatedCV:userCV,message:"Your activities added succesfully."});
    } catch (error) {
        next(error);
    }
})

// Update user references (Add a new reference)
cvRouter.post("/updateUserReference", async (req, res) => {
  const { userId, referenceName, referenceCompany, referenceEmail, referencePhone } = req.body;

  try {
    const userCV = await CVmodel.findOne({ userId });

    if (!userCV) {
      return res.status(404).json({ message: "User CV not found" });
    }

    const newReference = {
      referenceName,
      referenceCompany,
      referenceEmail,
      referencePhone,
    };

    // Initialize reference array if undefined
    if (!userCV.reference) {
      userCV.reference = [];
    }

    // Push new reference
    userCV.reference.push(newReference);

    // Save the updated CV
    const updatedCV = await userCV.save();

    res.status(200).json({
      message: "Reference added successfully!",
      updatedCV,
    });
  } catch (error) {
    console.error("Error updating reference:", error);
    res.status(500).json({ message: "Server error while adding reference" });
  }
});

cvRouter.post("/addNewSectionAgain", async (req, res) => {
  const { userId, sectionName } = req.body; 
  try {
    const userCV = await CVmodel.findOne({ userId });

    if (!userCV) {
      return res.status(404).json({ message: "User CV not found" });
    }

    // Add new section to otherSection array
    userCV.otherSection.push({ sectionName });

    // Save the updated CV
    const updatedCV = await userCV.save();

    res.status(200).json({
      message: "New section added successfully!",
      updatedCV,
    });
  } catch (error) {
    console.error("Error adding new section:", error);
    res.status(500).json({ message: "Server error while adding new section" });
  }
});

//delete from cv
cvRouter.post("/deleteItems", async(req,res,next)=>{
    try {
        const {userId, pageName, indexToDelete} = req.body;
        const CV = await CVmodel.findOne({userId}); 
        if(!CV){
            return res.status(400).json({message:"Not deleted"});
        }

        if(pageName==="projects"){
            CV.projects.splice(indexToDelete, 1); // 1 item will be deleted from that index     
        }else if(pageName==="experience"){
            CV.experience.splice(indexToDelete, 1); // 1 item will be deleted from that index       
        }else if(pageName==="education"){
            CV.education.splice(indexToDelete, 1); // 1 item will be deleted from that index       
        }else if(pageName==="acheivement"){
            CV.acheivement.splice(indexToDelete, 1); // 1 item will be deleted from that index       
        }else if(pageName==="activities"){
            CV.activities.splice(indexToDelete, 1); // 1 item will be deleted from that index       
        }else if(pageName==="reference"){
            CV.reference.splice(indexToDelete, 1); // 1 item will be deleted from that index       
        }

        
        
        await CV.save();

        res.status(200).json({updatedCV:CV,message:"Deleted succesfully"});
    } catch (error) {
        console.log("server error during delete : ",error);
        next(error);
    }
})

//add new section
cvRouter.post("/addNewSection",userAccessPermission,async (req,res,next)=>{
  console.log("working now")
    try {
        console.log("working now")
        const userCV = await CVmodel.findOne({userId : req.userInfo._id})
        if(!userCV) return res.status(400).json({message:"New section not added!"})
        
        userCV.otherSection.push({sectionName: req.body.sectionName});
        const updatedCV = await userCV.save();

        res.status(200).json({updatedCV, message:"New section added!"})
    } catch (error) {
        console.log("catch is catching error : ",error);
        next(error);
    }
});

module.exports = cvRouter;