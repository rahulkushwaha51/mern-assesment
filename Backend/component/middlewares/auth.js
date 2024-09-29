import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import catchAsyncError from './catchAsyncError';
import ErrorHandler from '../utility/errorHandler';
import userModel from '../models/userModel';

const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ErrorHandler("Not Logged In", 401));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next(new ErrorHandler("Not Logged In", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = await userModel.findById(decoded._id).select('-password');

        if (!req.user) {
            return next(new ErrorHandler("User not found", 401));
        }

        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid Token", 401));
    }
});

export default isAuthenticated;