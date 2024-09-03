const {check, body} = require('express-validator');

const validateLogin = 
[
    check("email").trim().isEmail().withMessage("Please enter a valid email!").normalizeEmail().toLowerCase(),
    check("password").trim().not().isEmpty()
]

const validateSignUp =  
    [
        check("email").trim().isEmail().toLowerCase(),
        check("password").trim().not().isEmpty()
    ]

module.exports = {
    validateLogin,
    validateSignUp
}