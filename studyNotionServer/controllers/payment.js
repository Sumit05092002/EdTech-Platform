const {instance}=require('../config/razorpay');
const {mailSender}=require('../templates/mailSender')
const Course=require('../model/Course');
const User=require('../model/User');
const {enrollmentMail}=require('../templates/enrollmentMail')
const mongoose=require('mongoose');
exports.capturePayment=async(req,res)=>{
    try {
        //Get the courseID and the UserId from the body of the request
        const {courseId}=req.body;
        const {userId}=req.user.id;
        //validate both the ids
        if(!courseId||!userId){
            return res.status(400).json({
                success:false,
                message:"Bad Request"
            })
        }
        const course=await Course.findById(courseId);
        const user=await User.findById(userId);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        //Now check if the user is already enrolled in  this course or not
        const uid=new mongoose.Types.ObjectId(userId)
        const check=course.StudentsEnrolled.includes(uid);
        if(check){
            return res.status(401).json({
                success:false,
                message:"You already purchased this course"
            })
        }
        //If both are correct then proceed further for order creation
        const amount=course.price;
        const currency="INR";
        const options={
            amount:amount*100,
            currency,
            notes:{
                courseID:courseId,
                userId
            }
        }

        const paymentResponse=await instance.orders.create(options);
        res.status(200).json({
            success:true,
            message:"payment captured successfully",
            title:course.title,
            description:course.description,
            thumbnail:course.thumbnail,
            order_id:paymentResponse.id,
            receipt_no:Math.random(Date.now()).toString()
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.verifySignature=async(req,res)=>{
    try {
        const {courseId,userId}=req.body.payload.payment.entity.notes;
        const webhookSecret='123456'
        const signature=req.headers["x-razorpay-signature"];
        const shasum=crypto.hmac("sha256",webhookSecret);
        shasum.update(json.stringify(req.body));
        const digest=shasum.digest("hex");
        if(signature===digest){
            console.log('payment is authorized');
            const course=await Course.findByIdAndUpdate(courseId,{$push:{StudentsEnrolled:userId}},{new:true});
            const user=await User.findByIdAndUpdate(userId,{$push:{Courses:courseId}},{new:true});
            const sendMail=await mailSender(user.Email,"Enrollment successful",enrollmentMail(course.title,user.FirstName));
            res.status(200).json({
                success:true,
                message:"Student Enrolled Successfully"
            })
        }else{
            return res.status(401).json({
                success:false,
                message:"Payment not successful"
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