const express=require('express');
const { capturePayment, verifySignature } = require('../controllers/payment');
const { checkAuth, student } = require('../middleware/checkAuth');
const router=express.Router();

router.post("/capturePayment",checkAuth,student,capturePayment);
router.post("/verifySignature",checkAuth,student,verifySignature);

module.exports=router;