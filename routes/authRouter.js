const express = require('express')
const router = express.Router()
const { userSignup, userLogin } = require("../controllers/authController");

const { validateLogin, validateSignUp } = require('./../middlewares/auth-validators');

router.post("/signup", validateSignUp, userSignup
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Sign Up with Form'
  // #swagger.description = 'Endpoint to sign up with form.'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { "$ref": "#/definitions/User" },
        }
      }
    } */
  /* #swagger.responses[422] = { 
      description: "user input validation failed" } */
  /* #swagger.responses[401] = { 
      description: "email already in use" } */
  /* #swagger.responses[201] = { 
      description: "New User has been created." } */
);

router.post("/login", validateLogin, userLogin
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Sign In with Form'
  // #swagger.description = 'Endpoint to sign in with form.'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { "$ref": "#/definitions/User" },
        }
      }
    } */
  /* #swagger.responses[422] = { 
      description: "user validation failed" } */
  /* #swagger.responses[400] = { 
      description: "Please provide email and password" } */
  /* #swagger.responses[400] = { 
      description: "A user for this email could not be found!" } */
  /* #swagger.responses[401] = { 
      description: "Wrong password!" } */
  /* #swagger.responses[201] = { 
      description: "user logged in successfully" } */
);

module.exports = router