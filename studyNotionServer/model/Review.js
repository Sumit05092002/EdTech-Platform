const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    Course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    body:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("Reviews",reviewSchema);