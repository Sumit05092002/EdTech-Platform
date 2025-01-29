const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.checkAuth = async (req, res, next) => {
    try {
        //fetch the token from the body of the request
        const token = req.body.token||req.token;
        console.log(token);
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
        //Decode the token
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        if (!payload) {
            return res.status(404).json({
                success: false,
                message: "Token not found or Invalid Token"
            })
        }
        //attach the payload to the body of the request
        req.user = payload;
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

exports.student = async (req, res, next) => {
    try {
        //fetch the account type from the payload attached in the body of the request
        const account_Type = req.user.accountType;
        if (account_Type === "Student") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access this route"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}


exports.instructor = async (req, res, next) => {
    try {
        //fetch the account type from the payload attached in the body of the request
        const account_Type = req.user.accountType;
        if (account_Type === "Instructor") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access this route"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}



exports.admin = async (req, res, next) => {
    try {
        //fetch the account type from the payload attached in the body of the request
        const account_Type = req.user.accountType;
        if (account_Type === "Admin") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access this route"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

