const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },
    learning:{
        type:String,
        required:true,
    },

    Instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    thumbnail:{
        type:String,
        required:true,
    },
    StudentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    Sections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sections"
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reviews"
    }],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    price:{
        type:Number,
        required:true,
    },



})

module.exports=mongoose.model("Course",courseSchema)