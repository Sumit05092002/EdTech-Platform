//Import express and create the server
const express =require('express');
const app=express();
const fileUpload = require("express-fileupload");


//Instantiate the server

app.listen(4000,()=>{
    console.log("This is the server of studynotion");
})

//creating the default route
app.get("/",(req,res)=>{
    res.send("This is the default route for StudyNotion Server");
})

//Establishing connection with Database
const dbConnect=require('./config/database');
dbConnect();

//Establishing Connection with Cloudinary
const cloudinaryConnect=require('./config/cloudinary');
cloudinaryConnect();
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

const cors = require("cors");
app.use(
	cors({
		origin: 3000,
		credentials: true,
	})
);


//integrating the body parser
app.use(express.json());

//mounting the routes
const authentication=require('./routes/authentication')
const courses=require('./routes/courses')
const payments=require('./routes/payments')
const profiles=require('./routes/profiles')
app.use("/api/v1",authentication);
app.use("/api/v1/course",courses);
app.use("/api/v1",payments);
app.use("/api/v1",profiles);
