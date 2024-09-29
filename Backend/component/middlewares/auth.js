// verify user is authenticated or not

import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import catchAsyncError from './catchAsyncError';
import ErrorHandler from '../utility/errorHandler';
import userModel from '../models/userModel';


const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        throw new ErrorHandler("Not Logged In", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await userModel.findById(decoded._id).select('-password');

    if (!req.user) {
        throw new ErrorHandler("User not found", 401);
    }

    next();
});

export default isAuthenticated;