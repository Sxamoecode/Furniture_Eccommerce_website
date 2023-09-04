const express = require('express');
const {
    createProduct,
    findAllProducts,
    findProduct,
    delProduct,
    editProduct,
} = require('./product.controller');
const {authenticateUser, adminMiddleware} = require('../../services/authUser')


productRouter = express.Router();

productRouter.post('/postProduct', authenticateUser, adminMiddleware, createProduct);
productRouter.get('/getProducts', authenticateUser, findAllProducts);
productRouter.get('/getProduct', authenticateUser, findProduct);
productRouter.delete('/deleteProduct', authenticateUser, adminMiddleware, delProduct);
productRouter.put('/updateProduct', authenticateUser, adminMiddleware, editProduct);

module.exports = {
    productRouter,
};
