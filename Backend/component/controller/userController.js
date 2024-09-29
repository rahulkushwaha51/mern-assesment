import dotenv from "dotenv";
dotenv.config();
import userModel from "../models/userModel.js";
import ErrorHandler from "../utility/errorHandler.js";
import { sendToken } from "../utility/sendToken.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

// User registration
export const signup = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already exists", 409));
    }

    // Create new user
    const newUser = await userModel.create({ name, email, password });
    
    // Send success response
    res.status(201).json({
        success: true,
        message: "User registered successfully"
    });
});

// User login
export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    // Check user existence and password validity
    const user = await userModel.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    // Send token on successful login
    sendToken(res, user, `Welcome back, ${user.name}`, 200);
});


