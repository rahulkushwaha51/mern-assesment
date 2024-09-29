
//   Wraps an async route handler to catch and forward any errors to the error handling middleware.

const catchAsyncError = (handler) => (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch(next);

export default catchAsyncError;