const { Router } = require("express");
const express = require("express");
const router = express.Router();

const { VerifyAuthentication } = require('./../middlewares/authentication')

const {
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

//All route here are to be accessed by authorized users therefore no id is to be passed to these endpoints.
//user id is from the authorization header 

router.delete("/",VerifyAuthentication, deleteUser
 // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete a user'
  // #swagger.description = 'Endpoint to delete a user.'

  /* #swagger.responses[500] = { 
      description: "User deletion failed" } */
  /* #swagger.responses[400] = { 
      description: "User ID required" } */
  /* #swagger.responses[204] = {
      description: "User ID not found" } */
  /* #swagger.responses[200] = {
      description: "User deleted successfully" } */
  /* #swagger.security = [{
        "JWT": []
        }] */
);

router.get("/", VerifyAuthentication, getUser
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get a user'
  // #swagger.description = 'Endpoint to get a user.'

  /* #swagger.responses[500] = { 
      description: "User gotten failed" } */
  /* #swagger.responses[400] = { 
      description: "User ID required" } */
  /* #swagger.responses[204] = {
      description: "User ID not found" } */
  /* #swagger.responses[200] = {
      description: "User gotten successfully" } */
  /* #swagger.security = [{
        "JWT": []
        }] */
);

router.put("/",VerifyAuthentication,  updateUser
// #swagger.tags = ['Users']
  // #swagger.summary = 'Update a user'
  // #swagger.description = 'Endpoint to update a user.'

/* #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
        schema: { "$ref": "#/definitions/User" },
        }
    }
    } */

  /* #swagger.responses[500] = { 
      description: "User updated failed" } */
  /* #swagger.responses[400] = { 
      description: "User ID required" } */
  /* #swagger.responses[204] = {
      description: "User ID not found" } */
  /* #swagger.responses[200] = {
      description: "User updated successfully" } */
  /* #swagger.security = [{
        "JWT": []
        }] */
);

module.exports = router;
