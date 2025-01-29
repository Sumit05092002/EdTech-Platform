const Category = require("../model/Category");

exports.createCategory=async(req,res)=>{
    try {
        //fetch the necessary details
        const {name,description}=req.body;
        //look for the bad request
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:"Bad request"
            })
        }
        //create entry into the db
        const response=await Category.create({name,description});
        //send the successful response
        res.status(200).json({
            success:true,
            data:response,
            message:"Category created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

// exports.updateCategory=async(req,res)=>{
//     try {
//         //fetch the category Id to be updated
//         const {categoryId}=req.body;
//         //look for the bad reqest if any
//         if(!categoryId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Bad request"
//             })
//         }
//         //fetch the category details
//         const categoryDetails=await Category.findById(categoryId);
//         //If the category does not exist then send the appropriate response
//         if(!categoryDetails){
//             return res.status(404).json({
//                 success:false,
//                 message:"Category not found"
//             })
//         }
//         //If exists then fetch the fields to be  updated
//         const updates=req.body;
//         //update the category
//         for(const key in updates){
//             categoryDetails[key]=updates[key];
//         }
//         await categoryDetails.save()
//         const updatedCategory=await Category.findById(categoryId);
//         //send the successfull response
//         res.status(200).json({
//             success:true,
//             data:updatedCategory,
//             message:"Category Updated Successfully"
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             message:"Internal server error"
//         })
//     }
// }

exports.fetchCategory=async(req,res)=>{
    try {
        //fetch all the categories
        console.log("hello")
        const response=await Category.find();
        //send the successful response
        res.status(200).json({
            success:true,
            data:response,
            message:"Categories fetched successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.showCategoryPageDetails=async(req,res)=>{
    try {
        //fetch the categoryID
        const {categoryId}=req.body;
        //fetch the category Details
        const categoryDetails=await Category.findById(categoryId).populate(
            {
                path:"courses",
                populate:{
                    path:"Instructor"
                },
                populate:{
                    path:"reviews"
                }
            }
        )
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
        //return the category details in the response
        res.status(200).json({
            success:true,
            data:categoryDetails,
            message:"Category details fetched successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}