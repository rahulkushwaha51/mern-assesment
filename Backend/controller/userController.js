// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const User = require('../models/userModel'); // Ensure this path is correct

// // Function to generate a unique code
// function generateUniqueCode(name, category) {
//   // Extract the first two letters from the name
//   const namePrefix = name.substring(0, 2).toUpperCase();

//   // Generate random alphanumeric characters
//   const randomString = crypto.randomBytes(1).toString('hex').toUpperCase();

//   // Construct the unique code
//   const uniqueCode = `${category}${namePrefix}${randomString}`;

//   console.log(`Generated unique code: ${uniqueCode}`);
//   return uniqueCode;
// }

// exports.registerUser = async (req, res) => {
//   const { name, email, phone, category } = req.body;

//   // Define valid categories
//   const validCategories = ['5', '10', '15'];

//   try {
//     // Validate inputs
//     if (!name || !email || !phone || !category) {
//       console.log('Validation failed: Missing fields');
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Validate category
//     if (!validCategories.includes(category)) {
//       console.log(`Invalid category: ${category}`);
//       return res.status(400).json({ message: 'Invalid category. Please select 5, 10, or 15 km.' });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       console.log(`User already exists: ${email}`);
//       return res.status(400).json({ message: 'User already registered.' });
//     }

//     // Generate a unique code
//     const uniqueCode = generateUniqueCode(name, category);

//     // Create a new user in the database
//     const newUser = await User.create({
//       name,
//       email,
//       phone,
//       category,
//       code: uniqueCode,
//     });

//     console.log(`User added to database: ${newUser.email}`);

//     // Send an email with the unique code to the user and the sender
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const userMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Cycling Event Registration',
//       text: `Thank you for registering!\n\nDetails:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${category} km\nUnique Code: ${uniqueCode}`,
//     };

//     const senderMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER, // Add the sender's email address here
//       subject: 'New Cycling Event Registration',
//       text: `A new user has registered.\n\nDetails:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${category} km\nUnique Code: ${uniqueCode}`,
//     };

//     // Sending email to the user
//     transporter.sendMail(userMailOptions, (err, info) => {
//       if (err) {
//         console.error(`Error sending email to ${email}:`, err);
//         return res.status(500).json({ message: 'Failed to send email. Please try again.' });
//       }
//       console.log(`Email sent to ${email}: ${info.response}`);

//       // Sending email to the sender
//       transporter.sendMail(senderMailOptions, (err, info) => {
//         if (err) {
//           console.error(`Error sending email to sender:`, err);
//           return res.status(500).json({ message: 'Failed to notify the sender. Please try again.' });
//         }
//         console.log(`Email sent to sender: ${info.response}`);

//         res.status(201).json({
//           message: 'User registered successfully.',
//           code: uniqueCode,
//           user: newUser,
//         });
//       });
//     });
//   } catch (error) {
//     console.error('Error during user registration:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };






require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userModel_M'); // Ensure this path is correct
const Razorpay = require('razorpay');
const paymentModel = require('../models/paymentModel');

let uniqueNumberCounter = 0; // Initialize a counter

// Function to generate a unique code
function generateUniqueCode(name, category) {
  // Extract the first two letters from the name
  const namePrefix = name.substring(0, 2).toUpperCase();

  // Increment the counter to ensure uniqueness
  uniqueNumberCounter++;

  // Construct the unique code with a padded unique number
  const uniqueCode = `${category}${namePrefix}${uniqueNumberCounter.toString().padStart(2, '0')}`;

  console.log(`Generated unique code: ${uniqueCode}`);
  return uniqueCode;
}


exports.registerUser = async (req, res) => {
  const { name, email, phone, category, gender } = req.body;

  // Define valid categories and genders
  const validCategories = ['5 km', '10 km', '15 km']
  const validGenders = ['male', 'female', 'other'];

  try {
    // Validate inputs
    if (!name || !email || !phone || !category || !gender) {
      console.log('Validation failed: Missing fields');
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate category
    if (!validCategories.includes(category)) {
      console.log(`Invalid category: ${category}`);
      return res.status(400).json({ message: 'Invalid category. Please select 5, 10, or 15 km.' });
    }

    // Validate gender
    if (!validGenders.includes(gender.toLowerCase())) {
      console.log(`Invalid gender: ${gender}`);
      return res.status(400).json({ message: 'Invalid gender. Please select Male, Female, or Other.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(`User already exists: ${email}`);
      return res.status(400).json({ message: 'User already registered.' });
    }

    // Generate a unique code
    const uniqueCode = generateUniqueCode(name, category);

    // Create a new user in the database
    const newUser = await User.create({   
      name,
      email,
      phone,
      category,
      gender,
      code: uniqueCode,
    });

    console.log(`User added to database: ${newUser.email}`);

    // Send an email with the unique code to the user and the sender
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Cycling Event Registration',
      text: `Thank you for registering!\n\nDetails:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${category} km\nGender: ${gender}\nUnique Code: ${uniqueCode}`,
    };

    const senderMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Add the sender's email address here
      subject: 'New Cycling Event Registration',
      text: `A new user has registered.\n\nDetails:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${category} km\nGender: ${gender}\nUnique Code: ${uniqueCode}`,
    };

    // Sending email to the user
    transporter.sendMail(userMailOptions, (err, info) => {
      if (err) {
        console.error(`Error sending email to ${email}:`, err);
        return res.status(500).json({ message: 'Failed to send email. Please try again.' });
      }
      console.log(`Email sent to ${email}: ${info.response}`);

      // Sending email to the sender
      transporter.sendMail(senderMailOptions, (err, info) => {
        if (err) {
          console.error(`Error sending email to sender:`, err);
          return res.status(500).json({ message: 'Failed to notify the sender. Please try again.' });
        }
        console.log(`Email sent to sender: ${info.response}`);

        res.status(201).json({
          message: 'User registered successfully.',
          code: uniqueCode,
          user: newUser,
        });
      });
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};




const instance = new Razorpay({
  key_id: process.env.RAZ_KEY,
  key_secret: process.env.RAZ_SECRET
});

// Create payment order
exports.createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: Number(amount * 100), // amount in paise
      currency: "INR",
    }

    const order = await instance.orders.create(options);

    if (!order) {
      return res.status(400).json({ success: false, message: "Order not created" });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Validate payment
exports.validatePayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;


    // Razorpay signature validation
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZ_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    console.log(isAuthentic);

    if (!isAuthentic) {
      return res.redirect(`${process.env.FRONTEND_URL}/index-6.html`);
    }

    await paymentModel.create({
      razorpay_signature,
      razorpay_payment_id,
      razorpay_order_id,
    });

    

   res.redirect(`${process.env.FRONTEND_URL}/index-7.html`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};