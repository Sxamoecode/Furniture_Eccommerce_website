const express = require('express');
const {signupRouter} = require('./signup/signup.router');
const {loginRouter} = require('./login/login.router');
const {authRouter} = require('../services/auth/auth.router');
const {productRouter} = require('./Product/product.router');
const {logoutRouter} = require('../routes/logout/logout.router');
const {cartRouter} = require('../routes/cart/Cart.router');
const api = express.Router()

api.use('/signup', signupRouter);
api.use('/login', loginRouter);
api.use('/auth', authRouter);
api.use('/', productRouter);
api.use('/', logoutRouter)
api.use('/', cartRouter);

module.exports = api;
