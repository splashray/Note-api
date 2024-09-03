const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { generateTokens } = require('./../middlewares/authentication')
const { validationResult } = require('express-validator')
const { handleAsync,
     handleResponse,  
} = require("../utils/helper")

//function to check if user already exists
const userExists = async _email => {
    const user = await User.findOne({ email: _email });
    if (user) {
        return true;
    }
    return false;
};

const userSignup = handleAsync(async (req, res, next) => {
    try{
    // Extract user data from request body
    let { name, email, password } = req.body;

    // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({
            success: false,
            msg: `user input validation failed`,
          });

    // Check if user with same email exists
        if (await userExists(email))
        return res.status(401).json({
            success: false,
            msg: `email already in use`,
          });

    // Hash the password for security
        const hash = bcrypt.hashSync(password, 10);

    // Create new user object
        const newUser = new User({
            email: email,
            name: name,
            password: hash
        });

    // Save new user in database
        const createdUser = await newUser.save();
        if(!createdUser)  return res.status(400).json({
            success: false,
            msg: `Can't Save a User`,
          });

    // Send response to user
        return res.status(201).json(handleResponse({
                id: createdUser._id,
                email: createdUser.email,
                name: createdUser.name,
            },"New User has been created."
        ));

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
          success: false,
          msg: `Error in Creating User`,
        });
  
    }
  
})

const userLogin = handleAsync(async (req, res, next) => {

    try{
    // Extract user data from request body
    var { email, password } = req.body;

    // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({
            success: false,
            msg: `user input validation failed`,
          });
    
    //Check if both email and password were provided
        if (!email || !password) return res.status(400).json({
            success: false,
            msg: `Please provide email and password`,
          });
          
    //Find a user with a matching email
        const user = await User.findOne({ email });
    
    //If no user was found, throw an error
        if (!user) return res.status(400).json({
            success: false,
            msg: `A user for this email could not be found!`,
          });
    
    //Compare hashed passwords
        const isEqual = bcrypt.compareSync(
            password,
            user.password
        );
    
    //If password does not match, throw an error
        if (!isEqual) return res.status(401).json({
            success: false,
            msg: `Wrong password!`,
          });

    //Generate and return access token
        const { accessToken } = await generateTokens(user);
    
        return res.status(201).json(
            handleResponse(
                {
                    token: accessToken,
                    name: user.name,
                    email: user.email,
                    userId: user._id.toString(),
                },
                "user logged in successfully"
            ));
    
    }catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        msg: `Error in Signing User in`,
      });

    }
});


module.exports = {
    userSignup,
    userLogin,
}