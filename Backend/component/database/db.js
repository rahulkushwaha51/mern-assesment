import mongoose from 'mongoose';
import catchAsyncError from '../middlewares/catchAsyncError.js';

const connectDatabase = catchAsyncError(async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database");
});

export default connectDatabase;