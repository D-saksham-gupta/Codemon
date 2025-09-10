const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

//auth middleware

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies.token ||
      req.body.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    // Added 'error' parameter here
    console.log("Auth middleware error:", error); // Added logging for debugging
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//is Student

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(400).json({
        success: false,
        message: "This is a protected route for students",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role can not be verified please try again",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "This is a protected route for instructor",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Instructor role can not be verified please try again",
    });
  }
};

//isadmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(400).json({
        success: false,
        message: "This is a protected route for Admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admin role can not be verified please try again",
    });
  }
};
