const mongoose=require('mongoose');
const mailSender=require('../templates/mailSender')
const emailverificationTemplate=require('../templates/emailverificationTemplate')
const OTPSchema=new mongoose.Schema({
    OTP:{
        type:Number,
        required:true
    },
    Email:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*5
    }
})

async function sendVerificationEmail(email,otp){
    try {
        const response=await mailSender(
            email,
            "Verification Email",
            emailverificationTemplate(otp)
        )
        console.log(response);
    } catch (error) {
        console.log(error);
        throw error
    }
}

OTPSchema.pre("save",async function(next){
    if(this.isNew){
        await sendVerificationEmail(this.Email,this.OTP);
    }
    next();
})

module.exports=mongoose.model("OTP",OTPSchema);