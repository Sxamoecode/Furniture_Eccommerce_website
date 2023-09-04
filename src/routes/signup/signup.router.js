const express = require('express');
const {
    signUp
}  = require('./signup.controller');

const signupRouter = express.Router()

signupRouter.post('/', signUp);

module.exports = {
    signupRouter,
}