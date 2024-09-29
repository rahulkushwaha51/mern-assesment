// send token to user   

export const sendToken = (res, user, message, statusCode = 200) => {
    // Generate JWT token for the user
    const token = user.getJWTToken();

    res.status(statusCode).json({
        success: true,
        message,
        user,
        token
    });

};