const mailSender = require("../templates/mailSender");
const User=require('../model/User')
const bcrypt=require('bcrypt')
const crypto=require('crypto');
exports.resetPasswordToken=async(req,res)=>{
    try {
        //fetch the email
        const {Email}=req.body;
        //fetch the user details
        const user=await User.findOne({Email:Email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"This user id is not registered"
            })
        }
        //If the user is found create a token
        const token=crypto.randomBytes(20).toString("hex");
        console.log(token);
        //Now insert the token in the user record with expiration time
        const updateUser=await User.findOneAndUpdate(
            {Email:Email},
            {token:token,
            resetPassword:Date.now()+3600000},
            {new:true}
        )
        //generate the link
        const link=`http://localhost:3000/update-password/${token}`
        //Now mail the link to the user
        const sendMail=await mailSender(
            Email,
            "Password Update",
            `The link to reset your password is ${link}`
        )
        res.status(200).json({
            success:true,
            message:'Link sent successfully"'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.resetPassword=async(req,res)=>{
    try {
        const {password,confirmPassword,token}=req.body;
        if(!password||!confirmPassword||!token){
            return res.status(400).json({
                success:false,
                message:"Bad Request"
            })
        }
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password and confirmPassword does not match"
            })
        }
        const user=await User.findOne({token:token});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Token is expired"
            })
        }
        if (!(user.resetPassword >Date.now())) {
            return res.status(403).json({
              success: false,
              message: `Token is Expired, Please Regenerate Your Token`,
            })
          }
          const encryptedPassword=await bcrypt.hash(password,10);
          const updatedUser=await User.findOneAndUpdate(
            {token:token},
            {Password:encryptedPassword,
            ConfirmPassword:encryptedPassword},
            {new:true}
          )
          res.status(200).json({
            success:true,
            message:"Password updated successfully"
          })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}