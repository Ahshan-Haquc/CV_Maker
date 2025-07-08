const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const jwt= require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    tokens:[{                            
        token:{
            type: String
        }
    }],
    registrationDate:{
        type: Date,
        default: Date.now,
    }
});

// Method to generate JWT token
UserSchema.methods.generateToken = async function () {
  try {
    console.log("token generating");
    const userToken = jwt.sign(
      {
        _id: this._id.toString(),  
        email: this.email       
      },
      process.env.JWT_SECRET || 'ahsanSecretKey8765',
      {
        expiresIn: process.env.JWT_EXPIRATION || '1h'
      }
    );
    console.log(userToken)
    this.tokens.push({ token: userToken });
    await this.save();

    console.log("token generating 2");
    return userToken;
  } catch (error) {
    console.error("Error while generating token:", error);
    throw new Error("Token generation failed");
  }
};

const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;