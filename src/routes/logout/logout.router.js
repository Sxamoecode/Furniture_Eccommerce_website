const express = require('express');
const {logout}= require('./logout.controller');

const logoutRouter = express.Router();

logoutRouter.delete('/logout', logout);

module.exports = {
    logoutRouter,
};