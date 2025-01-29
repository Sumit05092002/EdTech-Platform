const mongoose=require('mongoose');

const profileSchema=new mongoose.Schema({
    Gender:{
        type:String,
        
    },
    About:{
        type:String,
        
    },
    ContactInfo:{
        type:Number,
       
    },
    DateOfBirth:{
        type:Date,
        
    }
})

module.exports=mongoose.model("Profile",profileSchema);