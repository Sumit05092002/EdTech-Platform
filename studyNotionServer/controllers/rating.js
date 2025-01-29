const Review=require('../model/Review')
const User=require('../model/User')
const Course=require('../model/Course');
const mongoose=require('mongoose');
exports.createRating=async(req,res)=>{
    try {
        //fetching the required details
        const {courseId,userId,body,rating}=req.body;
        //looking for bad request
        if(!courseId||!userId||!body||!rating){
            return res.status(400).json({
                success:false,
                message:"Bad request"
            })
        }
        //fetching the course and user details
        const course=await Course.findById(courseId);
        const user=await User.findById(userId);
        //If course details are not found then return error 404
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        //If user details are not found then return 404
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        //check if the user is enrolled in this course or not
        const uid= new mongoose.Types.ObjectId(userId)
        const enroll=course.StudentsEnrolled.includes(uid)
        if(!enroll){
            return res.status(401).json({
                success:false,
                message:"You have not purchased this course so you cannot reveiw it"
            })
        }
        //checking if the user has already reviewed the course
        const alreadyReviewed=await Review.findOne({user:userId});
        if(alreadyReviewed){
            return res.status(401).json({
                success:false,
                message:"You have already reviewed this course"
            })
        }
        const response=await Review.create({userId,courseId,body,rating});
        const updateCourse=await Course.findByIdAndUpdate(courseId,{$push:{reviews:response._id}},{new:true});
        res.status(200).json({
            success:true,
            data:response,
            message:"Course Rated successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.getAverageRating=async(req,res)=>{
    try {
        //fetch the course Id from the body of the request
        const {courseId}=req.body;
        //fetch the average rating
        const averageRating=await Review.aggregate([
            {
                $match:{
                    Course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    average:{$avg:"$rating"},
                }
            },
        ])
        if(averageRating.length>0){
            return res.status(200).json({
                success:true,
                data:averageRating[0].average
            })
        }else{
            return res.status(200).json({
                success:true,
                data:0
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.getAllRating=async(req,res)=>{
    try {
        const {courseId}=req.body;
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        const response=await Review.findOne({
            Course:courseId
        }).populate({
            path:"user",
            select:"FirstName,LastName,Email,image"
        }).populate({
            path:"Course",
            select:"title"
        }).exec()
        res.status(200).json({
            success:true,
            message:"Reviews fetched successfully",
            data:response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}