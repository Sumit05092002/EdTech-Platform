const mongoose=require('mongoose');

const courseProgressSchema=new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    completedVideos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubSection",
        },
      ],
})

modul.exports=mongoose.model("CourseProgress",courseProgressSchema);

