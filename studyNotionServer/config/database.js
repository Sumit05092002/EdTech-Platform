//importing the mongoose
const mongoose = require('mongoose');
//importing the dotenv
require('dotenv').config();

//connecting to database
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => { console.log("connected to database successfully") })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        })
}

module.exports=dbConnect;
