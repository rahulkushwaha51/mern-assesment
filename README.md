# Mern Assessment

## Description
This project is a full-stack web application built with React for the frontend and Node.js/Express for the backend. It features user authentication using JSON Web Tokens (JWT) stored in localStorage.

## Features
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users
- Responsive design

## Technologies Used
### Frontend
- React
- Redux for state management
- Axios for API requests
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd Backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd Frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root of the frontend directory with the following variable:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the React development server:
   ```
   npm start
   ```

## Usage
- Register a new account or log in with existing credentials
- Navigate through the application using the navbar
- Access protected routes (only available when logged in)
- Log out to clear the authentication token

## API Endpoints
- POST /api/signup: Register a new user
- POST /api/login: Authenticate a user and receive a JWT
- GET /api/protected: Access protected data (requires authentication)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.
