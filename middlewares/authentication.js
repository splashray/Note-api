const User = require("../models/userModel");
const config = require('./../utils/config')
const jwt = require("jsonwebtoken");

// Generate access token with 24h expiration
const generateTokens = async (user) => {
    try {
    const payload = { userId: user._id }  // Fetch user id
    const accessToken = jwt.sign(   // JWT sign for authentication flow
    payload,
    config.JWT_SECRET, // Secure key
    { expiresIn: "24h" } // Specify token expiration duration
    );
    return Promise.resolve({ accessToken }); // Resolve promise  
  } catch (err) {
      return Promise.reject(err); // Reject promise if any error occurred
  }
}

//verify auth
const VerifyAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;  // Get authHeader from req object
  try {
    // Check if authHeader exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "authentication invalid", success: false });
    }

    // Get token from authHeader if it exists and starts with 'Bearer'
    const token = authHeader.split(" ")[1];

    // Check if token is present
    if (!token) return res.status(401).json({success: false, msg: "Token not authorized"});

    // Verify token using jwt and config.JWT_SECRET
    const payload = jwt.verify(token, config.JWT_SECRET);

    // Get userId from the token
    const { userId } = payload;

    const user = await User.findById(userId);
    // Check if user account exists
    if (!user)
      res.status(401).json({
        success: false,
        msg: "Token not authorized",
      });

    // Set user on req object
    req.user = user;

    // Then go to the next middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      msg: "Session Expired",
    });

  }
};


module.exports = {generateTokens, VerifyAuthentication}

