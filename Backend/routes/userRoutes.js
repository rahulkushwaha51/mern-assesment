const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Define route for user registration
router.post('/register', userController.registerUser);
router.post('/order', userController.createPaymentOrder);

// Define route for user login
router.post('/paymentverification', userController.validatePayment);

module.exports = router;
