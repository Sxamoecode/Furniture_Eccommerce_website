const express = require('express');
const {addToCart, getCart, removeCart} = require('./Cart.controller');
const { authenticateUser } = require('../../services/authUser');

const cartRouter = express.Router();

cartRouter.post('/cart/add', authenticateUser, addToCart);
cartRouter.get('/cart', authenticateUser, getCart);
cartRouter.delete('/delcart', authenticateUser, removeCart)

module.exports = {
    cartRouter,
}
