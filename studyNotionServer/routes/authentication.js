//Importing the routes
const express=require('express');
const router=express.Router();
const { ChangePassword, login, sendOtp, signUp } =require( '../controllers/auth');
const { resetPassword, resetPasswordToken } = require( '../controllers/resetPassword');
const { checkAuth } =require('../middleware/checkAuth');

//creating the routes
router.post("/signup",signUp)
router.post("/login",login)
router.post("/changePassword",checkAuth,ChangePassword);
router.post("/sendOTP",sendOtp);
router.post("/resetPasswordToken",resetPasswordToken)
router.post("/resetPassword",resetPassword);

module.exports=router;