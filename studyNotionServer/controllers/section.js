const Sections = require("../model/Sections");
const Course=require('../model/Course');
const SubSections = require("../model/SubSections");
exports.createSection=async(req,res)=>{
    try {
        //fetch the title of the section and the courseId of the course to which the section belongs from the body of the request
        const {title,courseId}=req.body;
        //look for bad request
        if(!title||!courseId){
            return res.status(400).json({
                success:false,
                message:"Bad Request"
            })
        }
        //fetching the courseDetails
        const courseDetails=await Course.findById(courseId);
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        //create entry into the db
        const response=await Sections.create({title});
        //push the sectionID into the sections of course
        const updateCourse=await Course.findByIdAndUpdate(courseId,{$push:{Sections:response._id}},{new:true}).populate({
            path:"Sections",
            populate:{
                path:"subsections"
            }
    }).exec();
        //send the successful response
        res.status(200).json({
            success:true,
            data:response,
            message:"Section created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}

exports.updateSections=async(req,res)=>{
    try {
        //fetch the sectionID from the body of the request
        const {title,sectionId}=req.body;
        console.log("hello");
        //look for bad request
        if(!title||!sectionId){
            return res.status(400).json({
                success:false,
                message:"Bad Request"
            })
        }
        //If not found then return the appropriate response
        const sectionDetails=await Sections.findById(sectionId);
        if(!sectionDetails){
            return res.status(404).json({
                success:false,
                message:"Section not found"
            })
        }
        //update the section
        sectionDetails.title=title;
        await sectionDetails.save();
        const updatedSection=await Sections.findById(sectionId);
        //Return the successful response
        res.status(200).json({
            success:true,
            data:updatedSection,
            message:"Sections updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try {
        //fetch the section Id and the courseID of the course to which the section belongs to be deleted
        const {sectionId,courseId}=req.body;
        console.log(req.body);
        console.log("hello");
        //fetch the section details
        const sectionDetails=await Sections.findOne({_id:sectionId});
        console.log(sectionDetails);
        //If sectionDetails not found then return the appropriate response
        if(!sectionDetails){
            return res.status(404).json({
                success:false,
                message:"Section not found"
            })
        }
        //fetching the courseDetails
        const courseDetails=await Course.findById(courseId);
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        //If found then pull the section from section of course
        const updateCourse=await Course.findByIdAndUpdate(courseId,{$pull:{Sections:sectionId}},{new:true}).populate({
            path:"Sections",
            populate:{
                path:"subsections"
            }
    });
    //Delete all the subsections associated with the section to be deleted
    await SubSections.deleteMany({_id:{$in:sectionDetails.subsections}})
        //Now deleting the section entry
        await Sections.findByIdAndDelete(sectionId);
        //send the successful response
        res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}