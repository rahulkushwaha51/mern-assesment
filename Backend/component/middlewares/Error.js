
//  Global error handling middleware for Express applications.
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
  
    // Log the error 
    console.error(`[Error] ${statusCode} - ${message}`);
  
    // Send the error response
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  export default errorMiddleware;