const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.3'})
const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

const doc = {

    info: {
        version: "1.0.0",
        title: "Note-Taking API",
        description: "Documentation for Note-Taking App automatically generated </b> module."
    },
    servers: [
      // {
      //   url: "http://localhost:3000",
      //   description: "Testing on Local Machine"
      // },
      {
        url: "https://note-taking-app-api.onrender.com",
        description: "Confirmed working well"
      }
    ],
    // host: "",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Testing",
            "description": "Check if API is working"
        },
        {
            "name": "Auth",
            "description": "Authentication Endpoints"
        },
        {
          "name": "Notes",
          "description": "Notes Endpoints"
        },
        {
            "name": "Users",
            "description": "All route here are to be accessed by authorized users therefore no id is to be passed to these endpoints. user id is from the authorization header "
        },
      
    ],
     securityDefinitions: {
            JWT: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
    },
    definitions: {
        User: {
            name: "splash",
            email:"test@gmail.com",
            password:"2023"    
        },
        Email: {
          email:"test@gmail.com"
        },
        Note: {
          title: "ABC of Backend",
          content: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci",
         
        }
    }


  };


  swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    require('./index.js')
})