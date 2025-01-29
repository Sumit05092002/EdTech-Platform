const User=require('../model/User')
const OTP=require('../model/Otp')
const bcrypt=require('bcrypt');
const Profile=require('../model/Profile')
const imageUpload=require('../templates/uploadFile')
require('dotenv').config();
const otpgenerator=require('otp-generator');
const jwt = require('jsonwebtoken');
const mailSender=require('../templates/mailSender')
const {passwordUpdated}=require('../templates/passwordUpdated');


exports.signUp=async(req,res)=>{
    try {
        //fetch the necessary details from the body of the request
        const{FirstName,LastName,Email,Password,ConfirmPassword,accountType,otp}=req.body;
        console.log(req.body);
        //verify the bad request
        if(!FirstName||!LastName||!Email||!Password||!ConfirmPassword||!accountType||!otp){
            return res.status(400).json({
                success:false,
                message:"Bad Request"
            })
        }
        
        
        //check if the password and confirm password match
        if(Password!==ConfirmPassword){
            console.log("password not matching");
            return res.status(401).json({
                success:false,
                message:"Password and Confirm Password does not match"
            })
        }
        //check if the user is already registered
        const user=await User.findOne({Email});
        if(user){
            return res.status(403).json({
                success:false,
                message:"User already exists",
            })
        }
        //If not then verify the email
         const Otp=await OTP.findOne({Email}).sort({createdAt:-1}).limit(1);
         if(Otp.length===0){
            return res.status(401).json({
                success:false,
                message:"Invalid OTP"
            })
         }
         console.log(Otp.OTP);
         if(otp!==Otp.OTP){
            console.log("otp did not match");
            return res.status(401).json({
                success:false,
                message:"OTP is invalid! Please try again later"
            })
         }
        //Hash the password
        const hashedPassword=await bcrypt.hash(Password,10);
        //Initalising an empty profile
        const createProfile=await Profile.create({Gender:null,About:null,ContactInfo:null,DateOfBirth:null});
        //Save the entry into db
        const response=await User.create({FirstName,LastName,Email,Password:hashedPassword,ConfirmPassword:hashedPassword,additionalDetails:createProfile._id,accountType})
        //send the successful response
        res.status(200).json({
            success:true,
            data:response,
            message:"USER Registered successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}


exports.login=async(req,res)=>{
    try{
        //fetching the email and password from the body of the request
        const{Email,Password}=req.body;
        //checking for bad requests
        if(!Email||!Password){
            return res.status(400).json({
                success:false,
                message:"Bad Request",
            })
        }
        //Checking if the user is registered or not
        const user=await User.findOne({Email});
         if(!user){
            return res.status(404).json({
                success:false,
                message:"USER not found",
            })
         }

         //If the user exists then we will verify the password
         const result=await bcrypt.compare(Password,user.Password);
         if(result){
            //create a jwt token
            const payload={
                Email:user.Email,
                id:user._id,
                accountType:user.accountType,
            }

            user.Password=undefined;
            user.ConfirmPassword=undefined;

            const token=await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            });
            
            //send the successfull response by attaching the token
            res.status(200).json({
                success:true,
                data:token,
                user,
                message:"Logged In Successfully",
            })
         }else{
            res.status(401).json({
                success:false,
                message:"Password Incorrect",
            })
         }
         
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}


exports.ChangePassword=async(req,res)=>{
    try {
        //fetch the userId from the body of the request
        const userID=req.user.id;
        const {Password,NewPassword}=req.body;
        //verifying if the user is registered or not
        const user=await User.findById(userID);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }
        console.log(user.Password)
        //fetching the old password and new password
        console.log(req.body);
        //comparing the passwords
        const match=await bcrypt.compare(Password,user.Password);
        if(match){
            //Hashing the new password
            const hashedPassword = await bcrypt.hash(NewPassword,10);
            //Updating the user
            const response = await User.findByIdAndUpdate(userID,{Password:hashedPassword});
            
            //sending the email for password change
            try {
                console.log(typeof(passwordUpdated))
                const emailResponse = await mailSender(
                    user.Email,
                    "Password for your account has been updated",
                    passwordUpdated(
                      user.Email,
                      `Password updated successfully for ${user.FirstName} ${user.LastName}`
                    )
                  )
                  console.log("Email sent successfully:", emailResponse)
            } catch (error) {
                console.error("Error occurred while sending email:", error)
                return res.status(500).json({
                  success: false,
                  message: "Error occurred while sending email",
                  error: error.message,
                })
            }
            //sending the successful response
            res.status(200).json({
                success:true,
                data:response,
                message:"Password updated successfully",
            })

        }else{
            res.status(401).json({
                success:false,
                message:"Password Incorrect"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}


exports.sendOtp=async(req,res)=>{
    try {
        //fetching the email where otp is to be sent
        const {Email}=req.body;
        //verifying for the bad request
        if(!Email){
            return res.status(400).json({
                success:false,
                message:"Bad Request"
            })
        }
        //verifying if the user is already registered or not
        const user=await User.findOne({Email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already registered! Please Signin to continue!"
            })
        }
        //If user is not registered then generate otp
        var otp=otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          //checking if the otp generated is unique or not
          const OtpCheck=await OTP.findOne({otp});
          while(OtpCheck){
            var otp=otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
              });
              const OtpCheck=await OTP.findOne({otp});
          }
          console.log(otp);
          //creating entry in the db
          const response=await OTP.create({OTP:otp,Email:Email});
          //sending the successful response
          res.status(200).json({
            success:true,
            data:response,
            message:"OTP generated successfully"
          })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}