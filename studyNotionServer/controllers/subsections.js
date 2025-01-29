const Sections = require("../model/Sections");
const Subsections = require("../model/SubSections");
const {uploadFile}=require('../templates/uploadFile')
require('dotenv').config();
exports.createSubsection=async(req,res)=>{
    try {
        //fetching the title and sectionId from the body of the request
        const {title,sectionId}=req.body;
        //fetching the thumbnail
        const thumbnail=req.files.thumbnail;
        //fetching the video from the request
        const video=req.files.video;
        //looking for bad request if any
        if(!title||!sectionId||!thumbnail||!video){
            return res.status(400).json({
                success:false,
                message:"BAD Request"
            })
        }
        //Fetching the section Details
        const sectionDetails=await Sections.findById(sectionId);
        //If Section Details are not found then send the appropriate response
        if(!sectionDetails){
            return res.status(404).json({
                success:false,
                message:"Section not found"
            })
        }
        //upload the thumbnail
        const uploadThumbnail=await uploadFile(thumbnail,process.env.FOLDER_NAME);
        //upload the video as well
        const uploadVideo=await uploadFile(video,process.env.FOLDER_NAME)
        //If section details are found then create the subsection entry in the database
        const response=await Subsections.create({title,thumbnail:uploadThumbnail.secure_url,url:uploadVideo.secure_url});
        //push the created subsection Id into the section
        const updateSection=await Sections.findByIdAndUpdate(sectionId,{$push:{subsections:response._id}},{new:true});
        //send the successful response
        res.status(200).json({
            success:true,
            data:response,
            message:"Subsection created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.updateSubsections=async(req,res)=>{
    try {
         //Fetch the title and the id of the subsection to be updated
         const {title,subsectionId}=req.body;
         //fetching the thumbnail
         const thumbnail=req.files.thumbnail;
         //fetching the video
         const video=req.files.video;
         //fetching the subsection
         const subsection=await Subsections.findById(subsectionId);
         //if subsection is not found then return 404 response
         if(!subsection){
            return res.status(404).json({
                success:false,
                message:"Subsection not found"
            })
         }
         //Now update the subsection
         if(thumbnail){
            const uploadThumbnail=await uploadImage(thumbnail,process.env.FOLDER_NAME)
            subsection.thumbnail=uploadThumbnail.secure_url
         }
         if(video){
            const uploadVideo=await uploadFile(video,process.env.FOLDER_NAME)
            subsection.url=uploadVideo.secure_url
         }
         if(title){
            subsection.title=title;
         }
        await subsection.save();
        //fetch the updated subsection
        const updatedSubsection=await Subsections.findById(subsectionId);
        //send the successful response
        res.status(200).json({
            success:true,
            data:updatedSubsection,
            message:"Subsection updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.DeleteSubsection=async(req,res)=>{
    try {
        //fetch the id of the subsection and the section to be deleted
        const {subsectionId,sectionId}=req.body;
        //fetch the subsection
        const subsection=await Subsections.findById(subsectionId);
        if(!subsection){
            return res.status(404).json({
                success:false,
                message:"Subsection not found"
            })
        }
        //fetch the section
        const section=await Sections.findById(sectionId);
        if(!section){
            return res.status(404).json({
                success:false,
                message:"section not found"
            })
        }
        //pull the subsection id from the section
        const updateSection=await Sections.findByIdAndUpdate(sectionId,{$pull:{subsections:subsectionId}},{new:true});
        //delete the subsection
        await Subsections.findByIdAndDelete(subsectionId);
        //send the successful response
        res.status(200).json({
            success:true,
            message:"Subsection deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}