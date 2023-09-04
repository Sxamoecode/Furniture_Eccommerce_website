const express = require('express');
const {login} = require('./login.controller');

const loginRouter = express.Router();

loginRouter.post('/', login);

module.exports = {
  loginRouter,
}
