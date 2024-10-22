// const User  = require('../models/userModel'); // Ensure this path is correct
// const ExcelJS = require('exceljs');
// const nodemailer = require('nodemailer');
// const stream = require('stream');
// // const { promisify } = require('util');




// // Create a transporter for sending emails
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // Utility function to convert a buffer to a readable stream
// const bufferToStream = buffer => {
//     const readable = new stream.Readable();
//     readable._read = () => {}; // _read is required but you can noop it
//     readable.push(buffer);
//     readable.push(null);
//     return readable;
// };

// exports.exportUsers = async (req, res) => {
//     try {
//         // Fetch all users from the database
//         const users = await User.findAll(); // Ensure User is correctly defined

//         if (users.length === 0) {
//             return res.status(404).json({ message: 'No users found.' });
//         }

//         // Create a new workbook and add a worksheet
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('Users');

//         // Define columns
//         worksheet.columns = [
//             { header: 'ID', key: 'id', width: 10 },
//             { header: 'Name', key: 'name', width: 30 },
//             { header: 'Email', key: 'email', width: 30 },
//             { header: 'Phone', key: 'phone', width: 15 },
//             { header: 'Category', key: 'category', width: 15 },
//             { header: 'Gender', key: 'gender', width: 10 },
//             { header: 'Code', key: 'code', width: 15 },
//         ];

//         // Add rows
//         users.forEach(user => {
//             worksheet.addRow(user.toJSON()); // Convert sequelize instance to JSON
//         });

//         // Write to buffer
//         const buffer = await workbook.xlsx.writeBuffer();

//         // Set the buffer in the response object
//         res.excelBuffer = buffer; // Store buffer in response object

//         // Email options
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER,
//             subject: 'User Data Export',
//             text: 'Please find attached the Excel file containing the user data.',
//             attachments: [
//                 {
//                     filename: 'users.xlsx',
//                     content: buffer,
//                 },
//             ],
//         };

//         // Send email
//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: 'Excel file sent successfully.' });
//     } catch (error) {
//         console.error('Error exporting users:', error);
//         res.status(500).json({ message: 'Server error. Please try again later.' });
//     }
// };






// // exports.exportUsers = async (req, res) => {
// //     try {
// //         // Fetch all users from the database
// //         const users = await User.findAll(); // Ensure User is correctly defined

// //         if (users.length === 0) {
// //             return res.status(404).json({ message: 'No users found.' });
// //         }

// //         // Create a new workbook and add a worksheet
// //         const workbook = new ExcelJS.Workbook();
// //         const worksheet = workbook.addWorksheet('Users');

// //         // Define columns
// //         worksheet.columns = [
// //             { header: 'ID', key: 'id', width: 10 },
// //             { header: 'Name', key: 'name', width: 30 },
// //             { header: 'Email', key: 'email', width: 30 },
// //             { header: 'Phone', key: 'phone', width: 15 },
// //             { header: 'Category', key: 'category', width: 15 },
// //             { header: 'Gender', key: 'gender', width: 10 },
// //             { header: 'Code', key: 'code', width: 15 },
// //         ];

// //         // Add rows
// //         users.forEach(user => {
// //             worksheet.addRow(user.toJSON()); // Convert sequelize instance to JSON
// //         });

// //         // Write to buffer
// //         const buffer = await workbook.xlsx.writeBuffer();

// //         // Convert buffer to readable stream
// //         const fileStream = bufferToStream(buffer);

// //         // Email options
// //         const mailOptions = {
// //             from: process.env.EMAIL_USER,
// //             to: process.env.EMAIL_USER,
// //             subject: 'User Data Export',
// //             text: 'Please find attached the Excel file containing the user data.',
// //             attachments: [
// //                 {
// //                     filename: 'users.xlsx',
// //                     content: fileStream,
// //                 },
// //             ],
// //         };

// //         // Send email
// //         await transporter.sendMail(mailOptions);

// //         res.status(200).json({ message: 'Excel file sent successfully.' });
// //     } catch (error) {
// //         console.error('Error exporting users:', error);
// //         res.status(500).json({ message: 'Server error. Please try again later.' });
// //     }
// // };



// -------

const User = require('../models/userModel_M'); // Assuming this is your MongoDB model
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**
 * Export users to CSV file
 * @returns {Promise<Buffer>} CSV file buffer
 * @throws {Error} If no users found or server error occurs
 */
exports.exportUsers = async () => {
    try {
        // Fetch all users from MongoDB
        const users = await User.find();

        if (!users || users.length === 0) {
            throw new Error('No users found.');
        }

        // Define CSV writer
        const csvWriter = createCsvWriter({
            path: 'users.csv', // Path to save the CSV file
            header: [
                { id: '_id', title: 'ID' },
                { id: 'name', title: 'Name' },
                { id: 'email', title: 'Email' },
                { id: 'phone', title: 'Phone' },
                { id: 'category', title: 'Category' },
                { id: 'gender', title: 'Gender' },
                { id: 'code', title: 'Code' },
            ]
        });

        // Prepare data for CSV
        const records = users.map(user => ({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            category: user.category,
            gender: user.gender,
            code: user.code,
        }));

        // Write records to CSV
        await csvWriter.writeRecords(records);
        console.log('CSV file created successfully.');

    } catch (error) {
        console.error('Error exporting users:', error);
        
        // More specific error handling
        if (error.message === 'No users found.') {
            throw error;
        }
        
        if (error.name === 'MongoError') {
            throw new Error('Database error occurred. Please try again later.');
        }

        throw new Error('Server error. Please try again later.');
    }
};


