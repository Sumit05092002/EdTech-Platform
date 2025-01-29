const Course=require('../model/Course');
const User=require('../model/User');
const Category=require('../model/Category')
const {uploadFile}=require('../templates/uploadFile')
const Sections=require('../model/Sections')
const Subsections=require('../model/SubSections')
require('dotenv').config();
exports.createCourse=async(req,res)=>{
    try {
        //fetching the necessary details from the body of the request
        const {title,description,learning,category:categoryId,price}=req.body;
        //fetching the thumbnail
        const thumbnail=req.files.file;
        //fetching the Instructor Id
        const InstructorId=req.user.id;
        //looking for bad requests
        if(!title||!description||!learning||!categoryId|!price||!thumbnail){
            return res.status(400).json({
                success:false,
                message:"Bad Request"
            })
        }
        //fetching the instructor details
        const user= await User.findById(InstructorId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        //Fetching and validating the category deatails
        const categoryDetails=await Category.findById(categoryId)
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"No such category exists"
            })
        }
        //uploading the thumbnail on cloudinary
        const upload=await uploadFile(thumbnail,process.env.FOLDER_NAME);
        //creating the entry of the course in the db
        const response=await Course.create({title,description,learning,Instructor:InstructorId,thumbnail:upload.secure_url,category:categoryId,price})
        //updating the Instructor details
        const updateInstructor=await User.findByIdAndUpdate(InstructorId,{$push:{Courses:response._id}},{new:true});
        //update the Category
        const updateCategory=await Category.findByIdAndUpdate(categoryId,{$push:{courses:response._id}},{new:true});
        //send the successfull response
        res.status(200).json({
            success:true,
            data:response,
            message:"Course Created Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}

exports.fetchCoursesByCategory=async(req,res)=>{
    try {
        //fetching the category Id from the body of the request
        const {categoryId}=req.body;
        //looking for bad request
        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"Bad Request",
            })
        }
        //validating and fetching the category Details
        const response=await Category.findById(categoryId).populate("courses").exec();
        if(!response){
            return res.status(404).json({
                success:false,
                message:"Category Not found"
            })
        }
        //sending the successful response
        res.status(200).json({
            success:true,
            data:response,
            message:"Courses fetched successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}

exports.fetchAllCourses=async(req,res)=>{
    try {
        //fetching all the courses from the db
        const response=await Course.find({}).populate("Instructor");
        //sending the successful response
        res.status(200).json({
            success:true,
            data:response,
            message:"Courses fetched successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}

exports.getCourseDetails=async(req,res)=>{
    try {
        //fetch the id of the course
        const {courseId}=req.body;
        console.log(req.body);
        //validate the bad request
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Bad Request",
            })
        }
        //fetch the course details
        const details=await Course.findById(courseId).populate(
            {
            path:"Instructor",
            populate:{path:"additionalDetails"}
        }
    ).populate(
        {
            path:"Sections",
            populate:{
                path:"subsections"
            }
        }
    ).populate(
        {
            path:"reviews"
        }
    ).populate(
        {
            path:"category"
        }
    )

    res.status(200).json({
        success:true,
        data:details,
        message:"Course details fetched successfully"
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}

exports.getCourseByInstructor=async(req,res)=>{
    try {
        //fetch the id of the instructor
        const instructorId=req.user.id;
        console.log(instructorId);
        //look for bad request if any
        if(!instructorId){
            return res.status(400).json({
                success:false,
                message:"Bad Request"
            })
        }
        //fetch the details of the instructor
        const response=await User.findById(instructorId).populate("Courses");
        //if no such entry found then return the suitable response
        if(!response){
            return res.status(404).json({
                success:false,
                message:"Instructor not found"
            })
        }
        //return the successfull response
        res.status(200).json({
            success:true,
            data:response,
            message:"Courses fetched successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.updateCourse=async(req,res)=>{
    try {
        //fetch the course id of the course to be updated
        const {courseId}=req.body;
        //fetch the updates
        const updates=req.body;
        //fetch the course details
        const courseDetails=await Course.findById(courseId);
        //If the course is not found then send the appropriate response
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        //If the updated Field is thumbnail then update the thumbnail
        if(req.files){
            const thumbnail=req.files.file
            const upload=await uploadImage(thumbnail,process.env.FOLDER_NAME);
            courseDetails.thumbnail=upload.secure_url;
        }
        //If the course is found then update the received fields
        for( const key in updates){
            courseDetails[key]=updates[key]
        }
        //save the updates
        await courseDetails.save();
        //fetch the updated course
        const updatedCourse=await Course.findById(courseId);
        //send the successfull response with the updated course
        res.status(200).json({
            success:true,
            data:updatedCourse,
            message:"Course updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.deleteCourse=async(req,res)=>{
    try {
       //fetch the courseID to be deleted
       const {courseId}=req.body;
       //fetch the instructor Id of the course
       const courseDetails=await Course.findById(courseId);
       const instructorId=courseDetails.Instructor;
       //fetch the course details
       //remove the course from instructor's courses
       await User.findByIdAndUpdate(instructorId,{$pull:{Courses:courseId}},{new:true});
       //unenroll the students of the courses
       const studentsEnrolled=courseDetails.StudentsEnrolled
       for(const studentId of studentsEnrolled){
        await User.findByIdAndUpdate(studentId,{$pull:{Courses:courseId}},{new:true});
       }
       //delete the sections and subsections
       const content=courseDetails.Sections;
       for(const section of content){
        const sectionDetails=await Sections.findById(section);
        const subsection=await sectionDetails.subsections;
        for(const id of subsection){
            await Subsections.findByIdAndDelete(id);
        }
        await Sections.findByIdAndDelete(section);
       }
       //delete the courses
       await Course.findByIdAndDelete(courseId);
       //send the successfull response
       res.status(200).json({
        success:true,
        message:"Course deleted successfully"
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}