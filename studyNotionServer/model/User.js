//importing the mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    ConfirmPassword: {
        type: String,
        required: true,
    },
    Courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    accountType: {
        type: String,
        enum: ["Student", "Instructor", "Admin"],
        required: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    image: {
        type:String
    },
    courseProgress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    },
    token: {
        type: String,
    },
    resetPassword: {
        type: Date,
    },
})

module.exports = new mongoose.model("User", userSchema)