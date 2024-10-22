const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
    
const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection error:", error.message);
        // Optionally, you can re-throw the error or handle it as needed
        // throw error;
    }
};

module.exports = connectDatabase;