const mongoose=require('mongoose');

const subSectionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("Subsections",subSectionSchema);