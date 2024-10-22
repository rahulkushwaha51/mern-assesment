const dotenv = require('dotenv');
dotenv.config();

const authorizedEmail = process.env.AUTHORIZED_EMAIL;
console.log(authorizedEmail);

// Store the authorized email in your environment variables

module.exports = (req, res, next) => {
    const senderEmail = req.headers['x-sender-email']; 
    console.log(senderEmail);
    // Custom header to identify sender email

    console.log(senderEmail==authorizedEmail);

    if (senderEmail === authorizedEmail) {
        next(); // Proceed to the controller if the email matches
    } else {
        res.status(403).json({ message: 'Unauthorized request.' });
    }
};
