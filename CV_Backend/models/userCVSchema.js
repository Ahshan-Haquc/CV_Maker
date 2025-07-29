const mongoose = require('mongoose');

const otherSectionSchema = new mongoose.Schema({
    sectionName: String,
    sectionValues: [String]
}, { _id: false });

const UserCVSchema = mongoose.Schema({
    name: {type:String, default:"Enter Your Name"},
    profession: {type:String, default:"Enter Your profession"},
    images:{type:String},
    description: {type:String, default:"Enter Your description"},
    phoneNumber: {type:String, default:"Enter Your phoneNumber"},
    emailId: {type:String, default:"Enter Your emailId"},
    linkedInId: {type:String, default:"Enter Your linkedInId"},
    githubId: {type:String, default:"Enter Your githubId"},
    portfolioLink: {type:String, default:"Enter Your portfolioLink"},
    address: {type:String, default:"Enter Your address"},
    skills:{
        type: Object,
    },
    projects:[
        {
            type:Object,
        }
    ],
    experience:[
        {
            type:Object,
        }
    ],
    education:[
        {
            type:Object,
        }
    ],
    acheivement:[
        {
            type:String,
        }
    ],
    activities:[
        {
            type:String,
        }
    ],
    reference:[
        {
            type:Object
        }
    ],
    otherSection:[otherSectionSchema]
    ,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});



const UserCVModel = mongoose.model("CV",UserCVSchema);
module.exports=UserCVModel;