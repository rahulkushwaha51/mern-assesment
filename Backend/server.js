// require('dotenv').config();
// const express = require('express');
// const { Sequelize } = require('sequelize');
// const userRoutes = require('./routes/userRoutes');
// const app = express();
// const port = process.env.PORT || 3000;
// const cors = require('cors');
// app.use(cors());
// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/users', userRoutes);

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// // Connect to Database
// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   dialect: 'postgres',
// });

// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// // Start the Server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });





// require('dotenv').config();
// const express = require('express');
// const { Sequelize } = require('sequelize');
// const userRoutes = require('./routes/userRoutes');
// const exportRoutes = require('./routes/exportRoutes'); 
// const app = express();
// const port = process.env.PORT || 3000;
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());

// app.use('/api/users', userRoutes);

// // New export routes
// app.use('/api/users', exportRoutes); 

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   dialect: 'postgres',
// });

// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection established successfully.');
//     sequelize.sync(); // Sync models with the database
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });





// -----New Approach -----//

require('dotenv').config();
const express = require('express');
// const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/userRoutes');
const exportRoutes = require('./routes/exportRoutes'); // Import export routes
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
// const {checkEmails} = require('./middlewares/emailListener');+

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes); // User routes

// Use a different path for export routes
app.use('/api/export', exportRoutes);

const connectDatabase = require("./database/db");

connectDatabase();
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   dialect: 'postgres',
// });

// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection established successfully.');
//     sequelize.sync(); // Sync models with the database
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // checkEmails();  //check emails in certain intervals
});
