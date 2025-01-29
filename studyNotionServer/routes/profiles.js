const express=require('express')
const { updateProfile, fetchProfile, deleteAccount, updateDisplayPicture, instructorDashBoard, getEnrolledCourses } = require('../controllers/profile');
const { student, instructor, checkAuth } = require('../middleware/checkAuth');
const router=express.Router()

router.post("/updateProfile",checkAuth,updateProfile);
router.get("/fetchProfile",checkAuth,fetchProfile);
router.delete("/deleteAccount",checkAuth,student,deleteAccount);

router.put("/updateProfilePicture",checkAuth,updateDisplayPicture);
router.get("/instructorDashBoard",checkAuth,instructor,instructorDashBoard);
router.get("/getEnrolledCourses",checkAuth,getEnrolledCourses);

module.exports=router;