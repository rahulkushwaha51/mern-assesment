// const Imap = require('imap');
// const { simpleParser } = require('mailparser');
// const nodemailer = require('nodemailer');
// const { exportUsers } = require('../controller/exportController'); // Adjust path as needed

// // Define IMAP configuration
// const imapConfig = {
//   user: process.env.IMAP_USER,
//   password: process.env.IMAP_PASS,
//   host: 'imap.gmail.com',
//   port: 993,
//   tls: true,
//   authTimeout: 10000,
//     tlsOptions: {
//         rejectUnauthorized: false // Ignore self-signed certificate errors
//     }
// };

// // Define SMTP transport
// const smtpTransport = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Function to send email with attachment
// async function sendEmailWithAttachment(AUTHORIZED_EMAIL, buffer) {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: AUTHORIZED_EMAIL,
//       subject: 'User Data Export',
//       text: 'Please find attached the Excel file containing the user data.',
//       attachments: [
//         {
//           filename: 'users.xlsx',
//           content: buffer,
//         },
//       ],
//     };

//     await smtpTransport.sendMail(mailOptions);
//     console.log('Excel file sent successfully.');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

// // Define the checkEmails function
// async function checkEmails() {
//   try {
//     const imap = new Imap(imapConfig);

//     imap.once('ready', function () {
//       imap.openBox('INBOX', false, function (err, box) {
//         if (err) {
//           console.error('Error opening inbox:', err);
//           return;
//         }
//         imap.search(['UNSEEN'], function (err, results) {
//           if (err) {
//             console.error('Error searching for new emails:', err);
//             return;
//           }
//           if (results.length === 0) {
//             console.log('No new emails.');
//             imap.end();
//             return;
//           }

//           const fetch = imap.fetch(results, { bodies: '' });
//           fetch.on('message', function (msg) {
//             msg.on('body', function (stream) {
//               simpleParser(stream, async (err, mail) => {
//                 if (err) {
//                   console.error('Error parsing email:', err);
//                   return;
//                 }
//                 const subject = mail.subject;
//                 const sender = mail.from.text;
//                 console.log(`Received email from: ${sender}`);
//                 console.log(`Subject: ${subject}`);

//                 if (subject === 'Export User Data') {
//                   try {
//                     console.log('Notification: Received email with the subject line "Export User Data"!');

//                     // Call exportUsers function to get the buffer
//                     const excelBuffer = await exportUsers();

//                     // Send email with Excel attachment
//                     await sendEmailWithAttachment(sender, excelBuffer);

//                   } catch (error) {
//                     console.error('Error processing request:', error);
//                   }
//                 }
//               });
//             });
//           });

//           fetch.on('end', function () {
//             console.log('Done fetching new emails.');
//             imap.end();
//           });
//         });
//       });
//     });

//     imap.once('error', function (err) {
//       console.log('IMAP Error:', err);
//     });

//     imap.once('end', function () {
//       console.log('IMAP connection ended.');
//     });

//     imap.connect();
//   } catch (error) {
//     console.error('Error checking emails:', error);
//   }
// }

// // Export the checkEmails function
// module.exports = { checkEmails };



const Imap = require('imap');
const { simpleParser } = require('mailparser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { exportUsers } = require('../controller/exportController'); // Adjust path as needed

// Set up OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

// Function to get access token
async function getAccessToken() {
  const res = await oAuth2Client.getAccessToken();
  return res.token;
}

// Define SMTP transport using OAuth2
async function createSmtpTransport() {
  const accessToken = await getAccessToken();

  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
}

// Function to send email with attachment
async function sendEmailWithAttachment(AUTHORIZED_EMAIL, buffer) {
  try {
    const smtpTransport = await createSmtpTransport();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: AUTHORIZED_EMAIL,
      subject: 'User Data Export',
      text: 'Please find attached the Excel file containing the user data.',
      attachments: [
        {
          filename: 'users.xlsx',
          content: buffer,
        },
      ],
    };

    await smtpTransport.sendMail(mailOptions);
    console.log('Excel file sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Define the checkEmails function using OAuth2 for IMAP
async function checkEmails() {
  try {
    const accessToken = await getAccessToken();

    const imapConfig = {
      user: process.env.IMAP_USER,
      xoauth2: accessToken,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      authTimeout: 10000,
    };

    const imap = new Imap(imapConfig);

    imap.once('ready', function () {
      imap.openBox('INBOX', false, function (err, box) {
        if (err) {
          console.error('Error opening inbox:', err);
          return;
        }
        imap.search(['UNSEEN'], function (err, results) {
          if (err) {
            console.error('Error searching for new emails:', err);
            return;
          }
          if (results.length === 0) {
            console.log('No new emails.');
            imap.end();
            return;
          }

          const fetch = imap.fetch(results, { bodies: '' });
          fetch.on('message', function (msg) {
            msg.on('body', function (stream) {
              simpleParser(stream, async (err, mail) => {
                if (err) {
                  console.error('Error parsing email:', err);
                  return;
                }
                const subject = mail.subject;
                const sender = mail.from.text;
                console.log(`Received email from: ${sender}`);
                console.log(`Subject: ${subject}`);

                if (subject === 'Export User Data') {
                  try {
                    console.log('Notification: Received email with the subject line "Export User Data"!');

                    // Call exportUsers function to get the buffer
                    const excelBuffer = await exportUsers();

                    // Send email with Excel attachment
                    await sendEmailWithAttachment(sender, excelBuffer);

                  } catch (error) {
                    console.error('Error processing request:', error);
                  }
                }
              });
            });
          });

          fetch.on('end', function () {
            console.log('Done fetching new emails.');
            imap.end();
          });
        });
      });
    });

    imap.once('error', function (err) {
      console.log('IMAP Error:', err);
    });

    imap.once('end', function () {
      console.log('IMAP connection ended.');
    });

    imap.connect();
  } catch (error) {
    console.error('Error checking emails:', error);
  }
}

// Export the checkEmails function
module.exports = { checkEmails };
