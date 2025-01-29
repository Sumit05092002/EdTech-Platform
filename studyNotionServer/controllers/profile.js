const User=require('../model/User')
const Profile=require('../model/Profile')
const Course=require('../model/Course')
const {uploadFile}=require('../templates/uploadFile')
exports.fetchProfile=async(req,res)=>{
    try {
        //fetch the userId from the body of the request
        const userId=req.user.id;
        //look for bad request
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"BAD Request"
            })
        }
        //fetch the user details
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"USER not found"
            })
        }
        //If found then populate the additional details
        const response=await User.findById(userId).populate({
            path:"additionalDetails"
        })
        //send the successful response
        res.status(200).json({
            success:true,
            data:response,
            message:"Profile fetched Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


exports.updateProfile=async(req,res)=>{
    try {
        //fetching the userId from the body of the request
        const userId=req.user.id;
        //look for the bad request
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"BAD Request"
            })
        }
        const user=await User.findById(userId);
        //fetching the profile ID
        const profileID=user.additionalDetails;
        //fetching the profile details that is to be updated
        const {Gender,About,ContactInfo,DateOfBirth}=req.body;
        //fetching the profile
        const profile=await Profile.findById(profileID);
        if(!profile){
            return res.status(404).json({
                success:false,
                message:"Profile not found"
            })
        }
        profile.Gender=Gender;
        profile.About=About;
        profile.ContactInfo=ContactInfo;
        profile.DateOfBirth=DateOfBirth;
        await profile.save();
        //fetching the updated profile
        const updatedProfile=await Profile.findById(profileID);
        //send the successful response
        res.status(200).json({
            success:true,
            data:updatedProfile,
            message:"Profile updated Successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.deleteAccount=async(req,res)=>{
    try {
        //fetch the user id from the body of the request
        const id=req.user.id;
        //fetch the user details from the db
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        //fetch the profile from the db
        const profileId=user.additionalDetails;
        //Delete the associated profile
        await Profile.findByIdAndDelete(profileId);
        //Unenroll the user from the courses
        for(const courseId of user.Courses){
            const updateCourse=await Course.findByIdAndUpdate(courseId,{$pull:{StudentsEnrolled:id}},{new:true});
        }
        //Delete the account
        await User.findByIdAndDelete(id);
        //send the successful response
        res.status(200).json({
            success:true,
            message:"Account Deleted Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
      const id = req.user.id
      const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
      console.log(userDetails)
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

exports.updateDisplayPicture=async(req,res)=>{
    try {
        //fetch the id
        const id=req.user.id;
        //fetch the user details
        const user=await User.findById(id);
        //fetch the image
        const image=req.files.image;
        //upload the image to cloudinary
        const uploadImage=await uploadFile(image,process.env.FOLDER_NAME);
        //update the user
        user.image=uploadImage.secure_url;
        await user.save();
        //send the successful response
        res.status(200).json({
            success:true,
            message:"Image updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.instructorDashBoard=async(req,res)=>{
    try {
        //fetch the instructor id
        const id=req.user.id;
        //fetch the courses
        const courses=await Course.find({Instructor:id});
        var courseDataWithStats={}
        //create the courseData with stats
        const courseData=courses.map((course)=>{
            const studentEnrolled=course.StudentsEnrolled.length;
             const totalRevenue=studentEnrolled*course.price;
              courseDataWithStats={
                id:course._id,
                name:course.title,
                description:course.description,
                studentEnrolled,
                totalRevenue
             }
             return courseDataWithStats
        })
        //send the successful response
        res.status(200).json({
            success:true,
            data:courseDataWithStats
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.getEnrolledCourses=async(req,res)=>{
    try {
        //fetch the user ID
        const {userId}=req.user.id;
        //fetch the user Details
        const userDetails=await User.findById(userId).populate(
            {
                path:"Courses",
                populate:{
                    path:"Sections",
                    populate:{
                        path:"Subsections"
                    },
                },
            },
            
        )
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        res.status(200).json({
            success:true,
            data:userDetails.Courses,
            message:"Courses fetched successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}