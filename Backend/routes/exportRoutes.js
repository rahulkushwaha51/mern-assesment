const express = require('express');
const router = express.Router();
const authorizeEmail = require('../middlewares/authorizeEmail');
const { exportUsers } = require('../controller/exportController');

// Route to export users
router.post('/export', authorizeEmail, exportUsers);

module.exports = router;
