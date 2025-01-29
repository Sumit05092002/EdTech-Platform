const express=require('express');
const { createCourse, fetchCoursesByCategory, fetchAllCourses, getCourseDetails, getCourseByInstructor, updateCourse, deleteCourse } = require('../controllers/course');
const {createSection, updateSections, deleteSection}=require('../controllers/section');
const { createSubsection,updateSubsections,DeleteSubsection } = require('../controllers/subsections');
const { createCategory, fetchCategory,showCategoryPageDetails} = require('../controllers/category');
const { createRating, getAverageRating, getAllRating } = require('../controllers/rating');
const { checkAuth, instructor, admin, student } = require('../middleware/checkAuth');
const router=express.Router();

router.post("/createCourse",checkAuth,instructor,createCourse);
router.post("/fetchCourseByCategory",checkAuth,fetchCoursesByCategory);
router.get("/getAllCourses",checkAuth,fetchAllCourses)
router.post("/CourseFullDetails",checkAuth,getCourseDetails);
router.get("/getCourseByInstructor",checkAuth,instructor,getCourseByInstructor);
router.post("/updateCourse",checkAuth,instructor,updateCourse);
router.delete("/deleteCourse",checkAuth,instructor,deleteCourse);

router.post("/createSection",checkAuth,instructor,createSection)
router.post("/updateSection",checkAuth,instructor,updateSections)
router.delete("/deleteSection",checkAuth,instructor,deleteSection)

router.post("/createSubsection",checkAuth,instructor,createSubsection)
router.post("/updateSubsection",checkAuth,instructor,updateSubsections)
router.delete("/deleteSubsection",checkAuth,instructor,DeleteSubsection)

router.post("/createCategory",checkAuth,admin,createCategory);
router.post("/getCategoryPageDetails",checkAuth,showCategoryPageDetails)
router.get("/fetchCategory",fetchCategory);

router.post("/giveReview",checkAuth,student,createRating);
router.get("/getAverageRating",checkAuth,getAverageRating);
router.post("/getAllReview",checkAuth,getAllRating);

module.exports=router;


