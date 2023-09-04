const express = require('express');
const {
    resetPasswordRequestController,
    resetPasswordController,
  } = require("./auth.controller");
  
const authRouter = express.Router();

authRouter.post('/requestResetPassword', resetPasswordRequestController);
authRouter.post('/resetPassword', resetPasswordController);

module.exports = {
  authRouter,
};