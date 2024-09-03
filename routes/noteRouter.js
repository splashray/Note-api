const express = require('express');
const { createNote, getAllNotes, getNote, deleteAllNotes, deleteNote, updateNote } = require('../controllers/noteController');

const { VerifyAuthentication } = require('./../middlewares/authentication')
const router = express.Router()


// route to create a new note with authentication token
router.post("/",VerifyAuthentication, createNote
  // #swagger.tags = ['Notes']
  // #swagger.summary = 'Create Note'
  // #swagger.description = 'Endpoint to create Note.'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { "$ref": "#/definitions/Note" },
        }
      }
    } */

  /* #swagger.responses[500] = { 
      description: "New Note created failed" } */
  /* #swagger.responses[400] = { 
      description: "Bad request" } */
  /* #swagger.responses[401] = { 
      description: "Unauthorized" } */
  /* #swagger.responses[201] = { 
      description: "New Note created" } */
  /* #swagger.security = [{
      "JWT": []
    }] */
);

// route to get all notes with authentication token
router.get("/",VerifyAuthentication,getAllNotes
 // #swagger.tags = ['Notes']
  // #swagger.summary = 'Get All User Note'
  // #swagger.description = 'Endpoint to get All User Note.'
  // # #swagger.parameters['limit'] = { description: 'Limit of notes to be returned', type: 'integer' }

   /* #swagger.responses[500] = { 
      description: "Notes gotten failed" } */
  /* #swagger.responses[200] = {
      description: "Notes gotten successfully" } */
   /* #swagger.security = [{
      "JWT": []
    }] */
);

// route to get a single note with authentication token
router.get("/:id",VerifyAuthentication, getNote
  // #swagger.tags = ['Notes']
  // #swagger.summary = 'Get A Note'
  // #swagger.description = 'Endpoint to get a Note.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the Note'
    } */

   /* #swagger.responses[500] = { 
      description: "Note gotten failed" } */
  /* #swagger.responses[400] = { 
      description: "Note ID required" } */
  /* #swagger.responses[204] = {
      description: "Note ID not found" } */
  /* #swagger.responses[200] = {
      description: "Note gotten successfully" } */
  /* #swagger.security = [{
      "JWT": []
    }] */
);

// route to delete all notes authenticated
router.delete("/",VerifyAuthentication, deleteAllNotes
  // #swagger.tags = ['Notes']
  // #swagger.summary = 'Delete Notes'
  // #swagger.description = 'Endpoint to delete Notes.'

  /* #swagger.responses[500] = { 
      description: "Note deletion failed" } */
  /* #swagger.responses[400] = { 
      description: "Note ID required" } */
  /* #swagger.responses[204] = {
      description: "Note ID not found" } */
  /* #swagger.responses[200] = {
      description: "Note deleted successfully" } */
  /* #swagger.security = [{
      "JWT": []
    }] */
);

// route to delete a single note with authentication token
router.delete("/:id", VerifyAuthentication, deleteNote
  // #swagger.tags = ['Notes']
  // #swagger.summary = 'Delete Note'
  // #swagger.description = 'Endpoint to delete Note.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the Note'
    } */

  /* #swagger.responses[500] = { 
      description: "Note deletion failed" } */
  /* #swagger.responses[400] = { 
      description: "Note ID required" } */
  /* #swagger.responses[204] = {
      description: "Note ID not found" } */
  /* #swagger.responses[200] = {
      description: "Note deleted successfully" } */
  /* #swagger.security = [{
      "JWT": []
    }] */
);

// route to update a single note with authentication token
router.put("/:id",VerifyAuthentication, updateNote
    // #swagger.tags = ['Notes']
    // #swagger.summary = 'Update A Note'
    // #swagger.description = 'Endpoint to update a Note.'
    /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID of the Note',
            required: true
        } */
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
            schema: { "$ref": "#/definitions/Note" },
            }
        }
        } */

     /* #swagger.responses[500] = { 
      description: "Note update failed" } */
    /* #swagger.responses[400] = { 
        description: "Note ID required" } */
    /* #swagger.responses[204] = {
        description: "Note ID not found" } */
    /* #swagger.responses[200] = {
        description: "Note updated successfully" } */
    /* #swagger.security = [{
        "JWT": []
        }] */
);

module.exports = router